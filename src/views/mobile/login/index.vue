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
        loginname: '13473768822',
        pwd: '123456'
    }),
    methods: {
        /*登录函数*/
        login: function () {
            console.log(this.$store)
            if (this.loginname == '' || this.loginname == undefined) {
                ShowMsg('请输入账号', 'error')
            } else if (this.pwd == '' || this.pwd == undefined) {
                ShowMsg('请输入密码', 'error')
            } else {
                this.$post('/pms/login', {
                    loginname: this.loginname,
                    pwd: this.pwd
                }, function (data, res) {
                    data.user.avatar = data.avatar || '';
                    data.user.maxnum = data.maxnum || '';
                    data.user.biglogo = data.biglogo || '';
                    data.user.smalllogo = data.smalllogo || '';

                    this.$store.commit('setUser', data.user);

                    this.goto('/pc/teamwork/project/list')
                });

                // this.$ajax({
                //     type: 'post',
                //     url: '/pms/login',
                //     data: {
                //         loginname: this.loginname,
                //         pwd: this.pwd
                //     },
                //     callback: (data, res) => {
                //         data.user.avatar = data.avatar || '';
                //         data.user.maxnum = data.maxnum || '';
                //         data.user.biglogo = data.biglogo || '';
                //         data.user.smalllogo = data.smalllogo || '';
                //
                //         this.$store.commit('setUser', data.user);
                //
                //         this.goto('/pc/teamwork/project/list')
                //     }
                // })
            }
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
