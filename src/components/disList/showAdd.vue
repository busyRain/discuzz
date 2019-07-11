<template>
    <div class="addTop">
        <div class="editor-container">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="title"></el-input>
                </el-form-item>
            </el-form>
            <ueditor 
                :defaultMsg=defaultMsg
                :config=config 
                ref="ue">
            </ueditor>
            <el-button class="add" @click="save('form')" type="primary" size="medium">发表贴子</el-button>
        </div>
    </div>
</template>
<script>
import ueditor from '@/components/common/ueditor';
import * as api from "@/api/detail"
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
            form:{},
            defaultMsg: '',
            title:'',
            config: {
               toolbars:[[
                'undo', 'redo', 'removeformat', 'formatmatch', '|',
                'paragraph',  'fontfamily','fontsize', 'forecolor','|',
                'bold', 'italic', 'underline','|',
               'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                'simpleupload', 'insertvideo','horizontal','|',
                'emotion',
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
            }
        }
    },
    methods:{
        cancel(){
            this.$emit('cancel',false)   
        },
        save(formName){
            this.$refs[formName].validate((valid) =>{
                if (valid) {
                    let data={
                        sid:parseInt(this.$route.params.id),
                        title:this.title,
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

