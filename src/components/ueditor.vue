<template>
    <div>
        <script 
            v-if="!readonly"
            id="" 
            name="_UEditor" 
            type="text/plain" 
            class="my-ueditor" 
            style="height:300px;" 
            ref="_UEditor"
        ></script>
        <div
            v-if="readonly"
            v-html="value"
            class="ueditor-readonly"
        ></div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        config: {
            type: Object,
            default: () => ({
                toolbars: [
                    [
                        'fullscreen', 'source', 'undo', 'redo', 'fontfamily', 'fontsize', 'forecolor', 'bold', 'italic', 'underline', 'justifyleft', 'justifycenter',
                        'justifyright', 'justifyjustify', 'backcolor', 'inserttable', 'inserttable', 'link', 'preview', 'unlink', 'inserttitle', 'date', 'time', 'formatmatch',
                        'simpleupload'
                    ]
                ],
                wordCount: false,
                elementPathEnabled: false,
            })
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            ue: null,

            content_inner: ''
        }
    },
    watch: {
        value(n, o) {
            if(n !== this.content_inner && this.ue && n) {
                try{
                    this.ue.setContent(n);
                } catch(e) {}
            };
        }
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.content_inner = val;
                this.$emit("input", val);
            }
        },
        ueconfig() {
            var url = '/pms';
            return [
                `${url}/uedtior/ueditor.config.js`,
                `${url}/uedtior/ueditor.all.js`,
            ];
        }
    },
    methods: {
        getUEContent: function () {
            //return this.ue.getContent()
            return $(this.$refs.editor.$el).find('iframe[id^="ueditor_"]')[0].contentDocument.body.innerHTML;
        },
        setUEContent: function (content) {
            $(this.$refs.editor.$el).find('iframe[id^="ueditor_"]')[0].contentDocument.body.innerHTML = content;
        },
        resetUEContent: function () {
            if (this.ue.hasContents()) {
                this.ue.setContent("");
            }
        },
        loadFile(cb) {
            if(this.ueconfig) {
                var scripts = document.querySelectorAll('script');
                var scriptArr = [];
                scriptArr.push.apply(scriptArr, scripts);

                if(scriptArr.some(item => item.src.indexOf(this.ueconfig[0]) > -1)) {
                    this.fileLoadedCheck(cb);

                    return;
                };

                var scriptConfig = document.createElement('script');
                scriptConfig.src = this.ueconfig[0];
                scriptConfig.charset = 'utf-8';
                scriptConfig.type = 'text/javascript';

                var scriptAll = document.createElement('script');
                scriptAll.src = this.ueconfig[1];
                scriptAll.charset = 'utf-8';
                scriptAll.type = 'text/javascript';

                scriptConfig.addEventListener('load', () => {
                    document.body.appendChild(scriptAll);
                });

                scriptAll.addEventListener('load', () => {
                    cb && cb();
                });

                document.body.appendChild(scriptConfig);
            };
        },
        fileLoadedCheck(cb) {
            var scripts = document.querySelectorAll('script');
            var scriptArr = [];
            scriptArr.push.apply(scriptArr, scripts);

            var scriptConfig = scriptArr.filter(item => ~item.src.indexOf(this.ueconfig[0]))[0],
                scriptAll = scriptArr.filter(item => ~item.src.indexOf(this.ueconfig[1]))[0];
            
            if(window.UE && window.UE.getEditor) {
                cb();
            } else if(scriptConfig && !scriptAll) {
                scriptConfig.addEventListener('load', () => {
                    this.fileLoadedCheck(cb);
                });
            } else if(scriptConfig && scriptAll) {
                scriptAll.addEventListener('load', () => {
                    cb();
                });
            } else {
                cb();
            }
            
        }
    },
    mounted: function () {
        if(this.readonly) return;

        this.loadFile(() => {
            var config = this.config;

            var dom = this.$refs["_UEditor"];
            var randomID = '_UEditor-' + Math.floor(Math.random() * 10000);
            dom.setAttribute('id', randomID);

            this.ue = window.UE.getEditor(randomID, config);

            this.ue.addListener("ready", () => {
                this.ue.setContent(this.model || ""); // 确保UE加载完成后，放入内容。

                this.ue.addListener("contentChange", () => {
                    var htmlContent = this.ue.getContent();
                    this.model = htmlContent;
                });

                this.ue.addListener("blur", () => {
                    var htmlContent = this.ue.getContent();
                    this.model = htmlContent;
                });
            });
        });
    },
    beforeDestroy() {
        this.ue && this.ue.destroy();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .my-ueditor .edui-toolbar{line-height:1em;}
    .ueditor-readonly{
        *{max-width:100%;}
    }
</style>
