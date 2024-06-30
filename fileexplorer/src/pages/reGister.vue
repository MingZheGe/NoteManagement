<template>
    <div class="login">
        <div class="logo">

            <span>注册</span>
        </div>
        <p>better late than never</p>
        <div class="login-input">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="" prop="email">
                    <el-input v-model="ruleForm.email" clearable placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码"
                        clearable></el-input>
                </el-form-item>
                <el-form-item label="" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"
                        clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        <loading v-if="load"></loading>
                        <span v-else>注册</span>
                    </el-button>
                </el-form-item>
            </el-form>
            <div style=" width: 100%;">
                <p class='register'><router-link to='/login'>已有账号,去登录</router-link></p>
            </div>
        </div>

    </div>
</template>
 
<script>

export default {
    data() {
        var checkEmail = (rule, value, callback) => {
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if (!value) {
                return callback(new Error('邮箱不能为空'));
            }
            setTimeout(() => {
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!reg.test(value)) {
                callback(new Error('密码长度需6-16位，且包含字母和字符'))
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                checkPass: '',
                pass: '',
                email: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                email: [
                    { validator: checkEmail, trigger: 'blur' }
                ]
            },
            load: false
        }
    },
    methods: {
        submitForm(formName) {
            this.load = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post("/eroll", {
                            username: this.ruleForm.email,
                            password: this.ruleForm.pass
                        }) //event_id是envent_id
                        .then((response) => {
                            this.$message({
                                message: "邮箱或密码错误",
                                type: "success",
                            });
                            if (response.data.message == 'success')
                                this.$router.push('/login')
                            else {
                                this.$message({
                                    message: "邮箱或密码错误",
                                    type: "error",
                                });
                            }

                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
 
<style lang='scss'>
@import url('../css/login.css');
</style>
