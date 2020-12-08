<template>
    <div class="tag-nav">
        <div 
        class="tag-nav_item"
        :class="{'item-active': $route.fullPath === item.fullPath}"
        v-for="(item, index) in list"
        :key="index"
        @click="clickHandler(item)"
        >
            {{item.meta.title}}

            <i 
                v-if="list.length > 1"
                class="icon-close" 
                @click.stop="closeHandler(item, index)"
            ></i>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        
    },
    data() {
        return {
            
        }
    },
    computed: {
        list() {
            return this.$store.getters.tagNavList;
        }
    },
    methods: {
        clickHandler(item) {
            if(this.$route.fullPath === item.fullPath) return;

            this.goto(item.fullPath);
        },
        closeHandler(item, index) {
            this.$store.commit('popTagNav', index);

            this.goto(this.list[this.list.length - 1].fullPath);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@css/var.scss';

.tag-nav{width:100%; height:30px; position:absolute; top:50px; background:white; border-top:1px solid #efefef;
    .tag-nav_item{height:20px; float:left; margin:5px 1em; margin-right:0; padding:0 .5em; color:#303133; font-size:12px; box-sizing:border-box; border:1px solid #DCDFE6; cursor:pointer;
        &.item-active{background:$successColor; color:white; border-color:$successColor; cursor:default;}

        .icon-close{font-family:element-icons!important; speak:none; font-style:normal; font-weight:400; font-variant:normal; text-transform:none; line-height:1; vertical-align:baseline; display:inline-block; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; cursor:pointer;
            &:before{content: "\e6db";}
            &:hover:before{content: "\e79d";}
        }

    }
}
</style>