<template>
    <div class="layout" :class="{mobile:mobile, 'view-only':viewOnly}">
        <div class="left-nav-cover" v-if="showController" @click="toggleShowController"></div>
        <div class="left-nav" :class="{collapse:collapseController, show:showController}" v-if="!viewOnly">
            <logo-img :small="collapseController"></logo-img>

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

        <tag-nav v-if="tagNav"></tag-nav>
    </div>
    <div class="view" :class="{collapse:collapseController,'with-tag-nav':tagNav}" id="view-content">
        <router-view :key="$route.fullPath" />
    </div>
</div>
</template>

<script>
import MyBreadcrumb from './components/breadcrumb'
import UserInfo from './components/user-info'
import LogoImg from './components/logo-img'
import TagNav from './components/tag-nav'

import lessVars from '@/css/var.scss'

import NAV_DATA from '@config/nav'

export default {
    components: {MyBreadcrumb, UserInfo, LogoImg, TagNav},
    data () {
        return {
            collapseController: false,
            showController: false,

            menuList: NAV_DATA,

            mobile: false,
            viewOnly: false,
            tagNav: true,

            colors: lessVars
        }
    },
    methods: {
        queryMenu() {
            this.$get(this.getGetters('sysUrl') + '/menu/list', function (data) {
                // this.menuList = data;
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
        }
    },
    created() {
        this.resizeHandler();
        window.addEventListener('resize', this.resizeHandler);

        this.checkFrameChild();
    },
    mounted: function() {
        // this.queryMenu();
        // 
        this.$store.dispatch('queryUserInfo');
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@css/var.scss';

$leftWidth: 200px;
$colLeftWidth: 64px;
$topNavHeight: 50px;
$topNavWithTagNavHeight: 80px;

.layout{position:relative; width:100%; height:100%;
    .left-nav{width:$leftWidth; height:100%; position:absolute; left:0; top:0; background:$navBgColor; transition:all .3s; overflow-x:hidden;
        &.collapse{width:$colLeftWidth;
            /deep/ .el-menu .infinite-sub-menu .el-menu-item span{display:none;}
        }
        .el-menu{border:none;}
        /deep/ .el-menu--collapse .el-submenu>.el-submenu__title {
            span{ height: 0; width: 0; overflow: hidden; visibility: hidden; display: inline-block;}
            .el-submenu__icon-arrow{display:none;}
        }


    }
    .top-nav{height:$topNavHeight; position:absolute; left:$leftWidth; top:0; right:0; box-shadow:0 1px 4px rgba(0,21,41,.08); transition:all .3s; overflow:hidden;
        &.collapse{left:$colLeftWidth;}

        &.with-tag-nav{height:$topNavWithTagNavHeight;}

        .btn_top-nav{cursor:pointer; height:100%; display:inline-block; line-height:$topNavHeight; padding:0 1em; float:left; transition:.2s all;
            &:hover{background:#efefef;}
            i{font-size:22px;}
            &.circle{border-radius:50%; width:2em; height:2em; line-height:2em; text-align:center; padding:0; margin-top:9px;}
        }
    }
    .view{position:absolute; left:$leftWidth; top:$topNavHeight; right:0; bottom:0; padding:10px; overflow:auto; transition:all .3s;
        &.collapse{left:$colLeftWidth;}
        &.with-tag-nav{top:$topNavWithTagNavHeight;}
    }
}

.layout.mobile{
    .left-nav-cover{position:absolute; left:0; right:0; top:0; bottom:0; background:rgba(0,0,0,.3); z-index:998;}
    .left-nav{transform:translateX(-$leftWidth); z-index:999;
        &.show{transform:translateX(0);}
    }
    .top-nav{left:0;}
    .view{left:0;}
}

.layout.view-only{
    .view{left:0; top:0;}
}
</style>
