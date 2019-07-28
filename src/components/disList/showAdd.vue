<template>
    <div class="addTop">
        <div class="editor-container">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="80px">
                <el-form-item label="板块切换" prop="sectionid">
                  <el-select v-model="sectionid" placeholder="请选择">
                        <el-option
                        v-for="item in section"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
            </el-form>
            <ueditor 
                :defaultMsg=defaultMsg
                :config=config 
                ref="ue">
            </ueditor>
            <el-button class="add" @click="save('ruleForm')" type="primary" size="medium">发表贴子</el-button>
        </div>
    </div>
</template>
<script>
import ueditor from '@/components/common/ueditor';
import * as api from "@/api/detail"
import * as apiSec from '@/api/home'
import { mapGetters } from 'vuex';
export default {
    // name:"showAdd",
    props:['show'],
    components:{
        ueditor,
    },
    computed:{
       ...mapGetters({
            isShowAdd:'isShowAdd'
        })
    },
     data(){
        return {
            ruleForm: {
                title: '',      
            },
            defaultMsg: '',
            sectionid:0,
            section:[],
            config: {
               toolbars:[[
                'undo', 'redo', 'removeformat', 'formatmatch', '|',
                'paragraph',  'fontfamily','fontsize', 'forecolor','|',
                'bold', 'italic', 'underline','|',
               'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                'simpleupload', 'insertvideo','horizontal','|',
                'emotion','hide'
                ]],
                'insertorderedlist':{
                        decimal: "1,2,3...",
                    "lower-alpha": "a,b,c...",
                    "lower-roman": "i,ii,iii...",
                    "upper-alpha": "A,B,C...",
                    "upper-roman": "I,II,III..."
                },
                'insertunorderedlist':{
                    circle: "○ 大圓圈",
                    disc: "● 小黑點",
                    square: "■ 小方塊 ",
                    dash: "— 破折號"
                },
                'paragraph':{ 'h2':'标题 1', 'h3':'标题 2', 'h4':'标题 3', },
                'fontsize':[14, 16, 18, 20, 24],
                 zIndex:2000
            },
            rules:{
                title:[
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ]
            },
            props: {
                label: "name",
                children: "childList"
            },
        }
    },
    created(){
        this.sectionid = parseInt(this.$route.query.id)
        this.getSection()
    },
    methods:{
        async getSection () {
            await apiSec.getAllSection().then(res=>{
                const { data} = res
                if(res.code == 0){
                    this.section = data
                }
            })
        },
        cancel(){
            this.$emit('cancel',false)   
        },
        save(formName){
            this.$refs[formName].validate((valid) =>{
                if (valid) {
                    let data={
                        sid:parseInt(this.sectionid),
                        title:this.ruleForm.title,
                        content:encodeURIComponent(this.$refs.ue.getUEContent()),
                    }
                    this.add(data)
                }
            })
        },
        async add (data){
            await api.addDis(data).then(res=>{
                console.log(res)
                if(res.code==0){
                    this.$emit('cancel',false)
                    this.title=''
                    this.defaultMsg = ''
                    this.$refs.ue.clearContent()
                    this.$message({
                        message:'发贴成功',
                        type:'success'
                    })
                    this.$router.push(`/disDetail/${res.data}`)
                } else if(res.status==403){
                        this.$message({
                        message:"用户未登录",
                        type:'error'
                    })
                } 
            })
        }
    },

}
</script>
<style lang="scss" scoped>
.addTop {
    margin-top: 40px;
}
.add{
    margin-top:30px;
}
</style>

