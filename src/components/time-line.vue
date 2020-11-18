<template>
    <div ref="_visualization" style="position:relative;" class="my__timeline" v-loading="loadingController" element-loading-background="rgba(0, 0, 0, 0)"></div>
</template>

<script>
import vis from 'vis'
import 'vis/dist/vis.css'
export default {
    props: ["data", "groups"],
    data () {
        return {
            timeline: null,
            loadingController: false
        }
    },
    watch: {
        data: function (curVal, oldVal) {
            this.vis_timeLineInit();
        }
    },
    mounted: function () {
        this.vis_timeLineInit();
    },
    methods: {
        vis_timeLineInit: function () {
            var that = this;
            this.loadingController = true;
            try {
                this.timeline.destroy();
            } catch (e) {}

            // DOM element where the Timeline will be attached
            if (!!this.data && this.data.length == 0) {
                this.loadingController = false;
                this.$refs._visualization.innerHTML = "<div style='position:absolute; left:50%; top:50%; margin-left:-48px; margin-top:-10px; font-size:14px;'>无时间轴数据<div>";
            } else {
                this.$refs._visualization.innerText = "";
            }

            // Create a DataSet (allows two way data-binding)
            var items = new vis.DataSet(this.data);
            if (this.groups) {
                var groups = new vis.DataSet(this.groups);
            }

            // Configuration for the Timeline
            var options = {
                zoomMin: 1000 * 60 * 60 * 24 * 31 * 2,
                // zoomMax: 1000 * 60 * 60 * 24 * 31 * 3,
                onInitialDrawComplete: function () {
                    that.loadingController = false;
                },
                visibleFrameTemplate: function(item) {
                    if (item.visibleFrameTemplate) {
                        return item.visibleFrameTemplate;
                    };
                    if(!item.value){return ''}

                    var percentage = (Number(item.value)*100).toFixed(0) + '%';
                    var extraClassName = '';
                    if(Number(item.value)===1){
                        extraClassName = ' warning'
                    }else{
                        if(item.state==='0') extraClassName = ' error'
                    }
                    return '<div class="progress-wrapper"><div class="progress' + extraClassName + '" style="width:' + percentage + '"><label class="progress-label">' + percentage + '<label></div></div>';
                }
            };

            // Create a Timeline
            this.timeline = new vis.Timeline(this.$refs._visualization, items, groups, options);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .my__timeline{padding:1em;}
</style>
<style>
.my__timeline .progress-wrapper {width:100%; height:18px; text-align:center; position:relative; overflow:hidden;}
.my__timeline .progress {height:100%; width:60%; position:absolute; left:0px; top:0px; background:#79E1AC; border-radius: 2px;}
.my__timeline .progress.error{background:#ed6565;}
.my__timeline .progress.warning{background:#FFCC55;}
.my__timeline .progress-label {position:absolute; z-index:1; color:white;}

.my__timeline .vis-time-axis .vis-text{color:white;}
.my__timeline .vis-timeline{border: none;}
.my__timeline .vis-current-time{background-color: red; z-index:2;}

.my__timeline .vis-panel.vis-center, .my__timeline .vis-panel.vis-left, .my__timeline .vis-panel.vis-right, .my__timeline .vis-panel.vis-top, .my__timeline .vis-panel.vis-bottom, .my__timeline .vis-time-axis .vis-grid.vis-minor{border-color:#5f5f5f;}
.my__timeline .vis-item{background-color: inherit; border: 1px solid rgba(0,0,0,0);}
.my__timeline .vis-item .vis-item-overflow{background-color: #33CCFF; border-radius: 2px; margin:10px 0 5px;}
.my__timeline .vis-item-visible-frame{ margin:5px 0 10px;}
.my__timeline .vis-item.vis-selected{border: 1px solid #FFCC55;}

.my__timeline .vis-labelset .vis-label{color:white;}
</style>
