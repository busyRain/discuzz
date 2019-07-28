<template>
    <div>
       <div>
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
                           
                                <el-checkbox v-for="(value,index) in  content.topicvotelist" :label="value.votename"  name="votevals" @change="chooseItem(value.id)"></el-checkbox>
                           

                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存投票</el-button>
                        
                    </el-form-item>

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

            },
            rules:{}
        }
    },
    computed:{
        
    },
    props:['content'],
    methods:{
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let data = {
                  topicid:this.content.id,
                  votevals:this.ruleForm.votevals.toString()
              }
              console.log(data)
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
                    this.$emit("getDetail")
                }
            })
        },
       chooseItem(data){
           console.log(data)
       }


    }
}
</script>

