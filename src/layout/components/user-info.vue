<template>
    <div class="userinfo">
        <el-dropdown
            class="user-info-dropdown"
            @command="handleCommand"
        >
            <div class="user-info">
                <span class="user-header">
                    {{userHeaderText}}
                </span>
                <span class="user-name">
                    {{dwname}}
                    <i class="el-icon-caret-bottom"></i>
                </span>
            </div>

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="(item, index) in navDeopDownList"
                    :key="index"
                    :icon="item.icon"
                    :command="item.command"
                >
                    {{item.text}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {},
    data() {
        return {
            
        };
    },
    computed: {
        ...mapState({
            navDeopDownList: (state) => state.layout.navDropDown,
            user: (state) => state.userinfo.user,
        }),
        dwname() {
            return this.user.dwname || '游客';
        },
        userHeaderText() {
            return this.dwname.slice(0, 1);
        },
    },
    methods: {
        handleCommand(command) {
            this.$store.dispatch(command);
        },
    },
    mounted: function () {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../css/common.scss';

$headerSize: 1.5em;

.userinfo{
    height: $topNavHeight;
    float: right;
}

.user-info-dropdown {
    display: block;
    float: right;

    .user-info {
        font-size: 16px;
        padding: 0 1em;
        margin-top: 15px;
        cursor: pointer;

        .user-header {
            display: inline-block;
            color: white;
            background: #304156;
            border-radius: 50%;
            width: $headerSize;
            height: $headerSize;
            line-height: $headerSize;
            text-align: center;
        }

        .user-name {
            font-size: 14px;
            margin-left: 0.5em;
        }
    }
}
</style>
