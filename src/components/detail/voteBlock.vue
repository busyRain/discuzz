<template>
    <div>
       <div v-if="!!content.isvote">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <div v-if="content.votetype==1">
                        <el-form-item label="单选投票" prop="votevals">
                            <el-radio-group v-model="ruleForm.votevals">
                                <el-radio :label="item.id" :key="item.id" v-for="item in content.topicvotelist" >{{item.votename}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                </div>
                    <div v-else>
                        <el-form-item label="多选投票" prop="votevals">
                           <el-checkbox-group  v-model="ruleForm.votevalsChk">
                                <el-checkbox v-for="(value,index) in  content.topicvotelist" :label="value.votename"  name="votevals" @change="chooseItem(value.id)"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                    
                        <el-button @click="submitForm('ruleForm')">保存投票</el-button>
                   

            </el-form>

       </div>
    </div>
</template>
<script>
import * as api from "@/api/detail"
export default {
    name:"voteBlock",
    data(){
        return {
            val:[],
            form:{},
            ruleForm:{
                votevalsChk:[]
            },
            rules:{}
        }
    },
    computed:{
        islogin: {
            get:function (){
                return !!this.$store.state.token;
            },
        },
    },
    props:['content'],
    methods:{
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let data={}
              if(this.content.votetype==1){
                data = {
                  topicid:this.content.id,
                  votevals:this.ruleForm.votevals.toString()
                }
              }else {
                  data = {
                      topicid:this.content.id,
                      votevals:this.ruleForm.votevalsChk.join(',')
                  }
              }
            if(this.islogin){
                 this.add(data)
            }else {
                this.$message({
                    message:"用户未登录",
                    type:'error'
                })
            }
            this.add(data)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        async add(data){
            await api.addVoteTop(data).then(res=>{
                if(res.code ==0){
                    this.$emit("getDetailNew")
                }
            })
        },
       chooseItem(data){
           console.log(data)
       }


    }
}
</script>
<style lang="scss" scoped>
.demo-ruleForm{
    border-top:2px solid #E6E6E6;
    margin-top: 20px;
}
</style>


