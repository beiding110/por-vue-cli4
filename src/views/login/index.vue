<template>
    <el-card class="login-box">
        <el-form autocomplete="off">
            <h1 style="text-align:center; color:#8A2A94; font-size:25px; margin:0.3em 0;">惠咨询登录</h1>
            <el-form-item label="手机号" label-width="60px">
                <el-input v-model="loginname" clearable autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="60px">
                <el-input v-model="pwd" clearable type="password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" class="btn-login" @click="login">登录</el-button>

        {{$store.getters.user.dwname}}
    </el-card>
</template>

<script>
export default {
    data: () => ({
        loginname: '',
        pwd: ''
    }),
    methods: {
        /*登录函数*/
        login: function () {
            this.$store.dispatch('login', {
                loginname: this.loginname,
                pwd: this.pwd
            });
        },

        getDicitonary() {
            this.$store.dispatch('getDictionary', {
                key: 'xmlxlist',
                url: `${this.$store.getters.sysUrl}/dictionary/select/hylx`
            }).then(() => {
                console.log(this.$store.getters.dictionary)
            });
        }
    },
    mounted() {

    }
}
</script>

<style scoped lang="scss">
    .login-box{width:400px; position:absolute; left:50%; top:50%; transform:translate(-50%, -50%);
        .btn-login{width:100%;}
    }
</style>
