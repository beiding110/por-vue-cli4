<template>
    <div class="login-page">
        <div class="logo-corner">
            <img :src="logoSrc">
        </div>
        <div class="login-con">
            <div class="logo">
                <img :src="logoSrc">
            </div>
            <el-card class="login-box">
                <div slot="header" class="clearfix">
                    <h1>登录</h1>
                </div>
                <my-form 
                v-model="form"
                autocomplete="off" 
                label-width="0"
                @submit="login"
                >
                    <el-form-item 
                    prop="loginname"
                    :rules="newRule('用户名', 'required')"
                    >
                        <el-input v-model="form.loginname" clearable autocomplete="off" :placeholder="`用户名`"></el-input>
                    </el-form-item>
                    <el-form-item
                    prop="pwd"
                    :rules="newRule('密码', 'required')"
                    >
                        <el-input v-model="form.pwd" clearable type="password" autocomplete="off" :placeholder="`密码`"></el-input>
                    </el-form-item>

                    <template slot="btn" slot-scope="scope">
                        <el-button 
                        type="primary" 
                        class="btn-login" 
                        @click="scope.submitHandler"
                        >
                            登录
                        </el-button>
                    </template>
                </my-form>
            </el-card>
        </div>
    </div>
</template>

<script>
import logo from '@assets/logo.png';

export default {
    data: () => ({
        form: {
            loginname: '',
            pwd: '',
        },

        logoSrc: logo,
    }),
    methods: {
        /*登录函数*/
        login: function () {
            this.$store.dispatch('login', this.form);
        }
    },
    mounted() {

    }
}
</script>

<style scoped lang="scss">
@import '@css/var.scss';
.login-page{width:100%; height:100%; background:url(./images/bg.jpg) no-repeat $primaryColor; background-size:cover;}
.logo-corner{position:absolute; left:100px; top:50px;
    img{height:30px;}
}
.login-con{width:400px; position:absolute; left:50%; top:calc(50% - 40px); transform:translate(-50%, -50%);
    .logo{text-align:center; margin-bottom:60px;
        img{height:60px;}
    };

    .login-box{border-radius:0;
        h1{ text-align: center; font-size:16px;}
        .btn-login{width:100%;}
    };
};
</style>
