<template>
<div class="moderator">
    <h3>版主</h3>
    <ul>
        <li v-for="(item,index) in infoData" :key="index">
           <el-image :src="$IMG_URL+item.imgurl">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <label>{{item.nickname}}</label>
            <span class="lvicon">
                <img src="@/assets/images/lvicon.png" />
                Lv{{item.userlvl}}
            </span>
        </li>
    </ul>
</div>
    
</template>
<script>
import * as api from '@/api/list'
export default {
    name:"moderatorInfo",
    data(){
        return {
            infoData:[] 
        }
    },
    methods:{
        async getModerator(id){
            await api.getModeratorInfo(id).then(res=>{
                if(res.code==0){
                    this.infoData = res.data.slice(0,4)
                }
            })
        }
    },
    created(){
        this.getModerator(this.$route.params.id)
    }
}
</script>
<style lang="scss" scoped>
.moderator {
    h3 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom:20px;
    }
    li {
        padding:5px 0;
        position: relative;
    }
    .el-image {
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    label {
        position: relative;
        bottom: 18px;
        left: 15px;
        display: inline-block;
        width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        -webkit-text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
        white-space: nowrap;
    }
    .lvicon {
        background: #ffbe24;
        border-radius: 3px;
        padding: 1px 9px;
        color: #fff;
        position: absolute;
        bottom: 26px;
        right: 0;
        img {
            width:17px;
            height:15px;
        }
        color:#fff;
    }
    
}
</style>

