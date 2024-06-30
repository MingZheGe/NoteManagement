<template>
    <div class="login">
        <div class="logo">
            <span>笔记管理应用</span>
        </div>
        <p>stay foolish,stay hungry</p>
        <div class="login-input">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="" prop="email">
                    <el-input v-model="ruleForm.email" clearable placeholder="登录功能暂未开发"></el-input>
                </el-form-item>
                <el-form-item label="" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请直接登录"
                        clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="go" style="  background-color: rgb(3, 174, 189);">
                        <span>登录</span>
                    </el-button>
                </el-form-item>
            </el-form>
            <div style=" width: 100%;">
                <p class="register">
                    <router-link to="/test">游客登录</router-link>
                </p>

            </div>

        </div>

    </div>
</template>
   
<script>

export default {
    data() {
        var checkEmail = (rule, value, callback) => {
            var reg = new RegExp(
                "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
            );
            if (!value) {
                return callback(new Error("邮箱不能为空"));
            }
            setTimeout(() => {
                if (!reg.test(value)) {
                    callback(new Error("请输入正确的邮箱"));
                } else {
                    callback();
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };
        return {
            load: false,
            ruleForm: {
                pass: "",
                email: "",
            },
            rules: {
                pass: [{ validator: '', trigger: "blur" }],
                email: [{ validator: '', trigger: "blur" }],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.load = true;
            this.$refs[formName].validate((valid) => {
                axios
                    .post("/login", {
                        username: this.ruleForm.email,
                        password: this.ruleForm.pass
                    }) //event_id是envent_id
                    .then((response) => {
                        if (response.data.message == 'success')
                            this.$router.push('/bill')
                        else {
                            this.$message({
                                message: "邮箱或密码错误",
                                type: "error",
                            });
                        }

                    });


            });
        },
        go() {
            this.$router.push('/test')
        },
    },
};
</script>
   
<style >
@import url('../css/login.css');
</style>