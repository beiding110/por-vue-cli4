<template>
    <div class="top-right-nav">
        <div 
        class="nav-item"
        v-for="(item, index) in subLayout.topNav"
        :key="index"
        @click="clickHandler(item)"
        >
            <i 
                class="iconfont"
                v-html="item.icon"
            ></i>
            {{item.name}}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['subLayout']),
    },
    methods: {
        clickHandler(item) {
            this.goto(item.path);
        },
    },
};
</script>

<style lang="scss" scoped>
    @import '../css/common.scss';

    .top-right-nav{
        height: $topNavHeight;
        overflow: hidden;
        float: left;

        .nav-item{
            float: left;
            padding: 0 .5em;
            height: 100%;
            line-height: $topNavHeight;

            &:hover{
                background: #efefef;
                cursor: pointer;
            }
        }
    }
</style>