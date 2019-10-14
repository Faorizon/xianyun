<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                v-model="form.username"
                placeholder="用户名手机">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input
                v-model="form.captcha" 
                placeholder="验证码" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input
                v-model="form.nickname" 
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                v-model="form.password"
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input 
                v-model="form.checkPassword"
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        var validatePass=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('请再次输入密码'))
            }else if(value !==this.form.password){
                callback(new Error('两次密码不一致'))
            }else{
                //验证通过
                callback();
            }
        }
        return {
            // 表单数据
            form: {
                username:"",
                captcha:"",
                nickname:"",
                password:"",                           
                checkPassword:""    
            },
            // 表单规则
            rules: {
                username: [
                    { required: true, message: '请输入用户手机', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                checkPassword: [
                    { validator:validatePass, trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        // 发送验证码
        async handleSendCaptcha(){
            if(!this.form.username){
                this.$message.error("手机号不能为空");
                return;
            }
            const res=await this.$store.dispatch("user/sendCaptcha",this.form.username)
            const {code}=res.data;
            //打印出手机的验证码
            this.$message.success(`当前手机验证码是：${code}`)
        },


        // 注册
        handleRegSubmit(){
           this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const {checkPassword,...props}=this.form
                    const res=await this.$store.dispatch("user/register",props)
                    console.log(res)
                    if(res.status===200){
                        this.$message.success("注册成功")
                        this.$router.push("/")
                    }
                } 
            });
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>