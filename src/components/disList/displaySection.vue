<template>
    
        <div class="board-box sectionList">
            <div  v-for="(item,index) in section" :key="index" class="listLi">
                <label>
                    <i class="el-icon-document" ></i>
                    <span>{{item.name}}</span>
                    
                    </label>
                <div class="childUL" v-if="item.childList.length>0">
                    <router-link 
                    v-for="(childItem,childIndex) in item.childList" 
                    :key="childIndex"
                    :to="{path:`/disList/${childItem.id}`}" 
                    tag="a" target="_blank" 
                    :class="{ 'is-active': selectId == childItem.id }"
                    >{{childItem.name}}</router-link>
                </div>
            </div>
        </div>
    
</template>
<script>
import * as apiSec from '@/api/home'
export default {
    name:"section",
    data(){
        return{
            section:{},
        }
    },
    computed: {
		
		selectId() {
			return this.$route.params.id||'';
		}
	},
    methods:{
        async getSection () {
            await apiSec.getSection().then(res=>{
                const { data} = res
                if(res.code == 0){
                    this.section = data
                }
            })
        },
    },
    created(){
        this.getSection() 
    }
}
</script>
<style lang="scss" scoped>
.sectionList {
    // width:100%;
    display: flex;
    .listLi {
        padding: 25px 30px;
        // flex: 1;
        label {
            
            font-size:20px;
            padding-bottom:10px;
            display: block;
            span {
                font-weight: bold;
                margin-left:10px;
            }
        }
        .childUL {
            font-size: 18px;
            text-align: left;
            a {
                margin: 10px 9px 10px 0;
                display: inline-block;
                padding: 5px;
                border-radius: 2px;
            } 
        }
    }
    .listLi:first-child {
        width: 276px;
    }
    .listLi:nth-child(2) {
        width: 276px;
    }
    .listLi::after {
        // content:"";
        // display:inline-block;
        // border-right:1px solid #a0a0a0;
    }
}
.is-active{
    border:1px solid #409eff;
    color:#409eff;
    background: #d7eafe;
}
</style>