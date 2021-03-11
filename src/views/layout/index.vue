<template>
    <div class="layout" :class="{mobile:mobile, 'view-only':viewOnly}">
        <div class="left-nav-cover" v-if="showController" @click="toggleShowController"></div>
        <div class="left-nav" :class="{collapse:collapseController, show:showController}" v-if="!viewOnly">
            <logo-img :small="collapseController"></logo-img>

            <div class="menu-con">
                <el-menu
                router
                :collapse="collapseController"
                :background-color="colors.navBgColor"
                :text-color="colors.navTextColor"
                :active-text-color="colors.navTextActiveColor"
                default-active="2">
                    <my-nav-menu :list="menuList"></my-nav-menu>
                </el-menu>
            </div>
        </div>
        <div class="top-nav" :class="{collapse:collapseController,'with-tag-nav':tagNav}" v-if="!viewOnly">
            <div class="btn-coll btn_top-nav" @click="toggleCollapse" v-if="!mobile">
                <i :class="{'el-icon-s-fold':!collapseController,'el-icon-s-unfold':collapseController}"></i>
            </div>
            <div class="btn-coll btn_top-nav" @click="toggleCollapse" v-else>
                <i class="el-icon-s-unfold"></i>
            </div>
            <div class="btn-back btn_top-nav circle" @click="goBack">
                <i class="el-icon-back"></i>
            </div>

            <my-breadcrumb></my-breadcrumb>

            <user-info></user-info>

            <top-nav-right-btns></top-nav-right-btns>

            <tag-nav v-if="tagNav"></tag-nav>
        </div>
        <div class="view" :class="{collapse:collapseController,'with-tag-nav':tagNav}" id="view-content">
            <router-view :key="$route.fullPath" />
        </div>
    </div>
</template>

<script>
import '../css/common.scss'

import MyBreadcrumb from './components/breadcrumb'
import UserInfo from './components/user-info'
import LogoImg from './components/logo-img'
import TopNavRightBtns from './components/top-nav-right-btns'
import TagNav from './components/tag-nav'

import lessVars from '@/css/var.scss'

export default {
    components: {MyBreadcrumb, UserInfo, LogoImg, TopNavRightBtns, TagNav},
    data () {
        return {
            collapseController: false,
            showController: false,

            mobile: false,
            viewOnly: false,
            tagNav: false,

            colors: lessVars
        }
    },
    computed: {
        menuList() {
            var type = this.$store.state.system.system.type,
                sysStore = this.$store.state[type] || {};
            return sysStore.navList || [];
        }
    },
    methods: {
        queryMenu() {
            this.$get(this.getGetters('sysUrl') + '/menu/list', function (data) {
                this.menuList = data;
            })
        },
        toggleCollapse() {
            if(this.mobile) {
                this.toggleShowController();
                return;
            };
            this.collapseController = !this.collapseController;
        },
        toggleShowController() {
            this.showController = !this.showController;
        },
        goBack() {
            this.$router.go(-1);
        },
        resizeHandler() {
            if(window.innerWidth < 1000) {
                this.mobile = true;
            } else {
                this.mobile = false;
            };
        },
        checkFrameChild() {
            if(window !== window.top) {
                this.viewOnly = true;
            };
        },
    },
    created() {
        this.resizeHandler();
        window.addEventListener('resize', this.resizeHandler);

        this.checkFrameChild();
    },
    mounted: function() {
        // this.$store.dispatch('queryUserInfo');
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './css/pop.scss';
</style>
