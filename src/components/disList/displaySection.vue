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
        padding: 20px 30px;
        position: relative;
        label {
            font-size:20px;
            padding-bottom:10px;
            display: block;
            padding-left: 5px;
            span {
                font-weight: bold;
                margin-left:10px;
                font-size: 16px;
            }
        }
        .childUL {
           
            text-align: left;
            a {
                margin: 9px 8px 9px 0px;
                display: inline-block;
                padding: 5px;
                border-radius: 2px;
                font-size: 16px;
            } 
        }
    }
    .listLi:first-child {
        width: 276px;
    }
    .listLi:nth-child(2) {
        width: 276px;
        label {
            margin-left: 23px;
        }
        .childUL {
            margin-left: 25px;
        }
    }
    .listLi:nth-child(3) {
        label {
            margin-left: 23px;
        }
        .childUL {
            margin-left: 25px;
        }
    }
    .listLi:last-child {
         label {
            margin-left: 11px;
        }
        .childUL {
            margin-left: 12px;
        }
    }
    .childUL::after {
        content: "";
        border-right: 1px solid #c0c0c3;
        height: 80px;
        display: block;
        position: absolute;
        right: 0;
        bottom: 45px;
    }
    .listLi:last-child >.childUL::after{
        border-right:0px;
    }
}
.is-active{
    border:1px solid #409eff;
    color:#409eff;
    background: #d7eafe;
}
</style>