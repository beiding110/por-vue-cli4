<template>
    <el-dropdown class="user-info-dropdown" @command="handleCommand">
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
            :command="item.command">
                {{item.text}}
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    props: {

    },
    data () {
        return {

        }
    },
    computed: {
        userInfo() {
            return this.$store.getters.user;
        },
        dwname() {
            return this.userInfo.dwname || '游客';
        },
        userHeaderText() {
            return this.dwname.slice(0, 1);
        },
        navDeopDownList() {
            return this.getGetters(`${this.getGetters('system').type}_navDropDown`)
        }
    },
    methods: {
        handleCommand(command) {
            command && command();
        }
    },
    mounted: function() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$headerSize:1.5em;

.user-info-dropdown{display:block; float:right;
    .user-info{font-size:16px; padding:0 1em; margin-top:15px; cursor:pointer;
        .user-header{display:inline-block; color:white; background:#304156; border-radius:50%; width:$headerSize; height:$headerSize; line-height:$headerSize; text-align:center;;}
        .user-name{font-size:14px; margin-left:.5em;}
    }
}
</style>
