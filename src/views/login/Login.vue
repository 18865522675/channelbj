<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 请填写用户名和密码再登陆。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                ruleForm: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try{
                            // this.ruleForm.password=md5(this.ruleForm.password);
                            const res= await this.$api.auth.login(this.ruleForm);
                            this.$toolkit.setCookie('user',JSON.stringify(res.data));
                            this.$store.dispatch('setUSER', res.data)

                            this.$message.success("登陆成功");
                            this.$router.push("/channel/channelList")
                        }catch(e){
                            this.$message.error("登陆失败")
                            console.log(e)
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/background.png);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.1);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
    .hk_logo_wrap .hk_logo_img{
    	width:200px;
    }
    .hk_logo_wrap{
    	padding: 50px;
    }
</style>
