<template>
    <div class="board-box main">
        <div class="tab">
            <div class="tab-title">
                <ul class="fr">
                    <li :class="tabIndex == 1? 'current':''" @click="exchange(1)">热门贴</li>
                    <li :class="tabIndex == 2? 'current':''" @click="exchange(2)">新主题</li>
                </ul>
            </div>
            <div class="tabList"  v-show="tabIndex==1">
                <ul >
                    <li v-for="(item,index) in hotList.slice(0,6)" :key="index">
                        <i v-text="index"></i>
                        <span>[{{item.sectionName}}]</span>
                        <router-link :to="{path:`/disDetail/${item.id}`}" tag="a" target="_blank">{{item.title}}</router-link>
                        <em class="time">{{$formatDate(item.lasttime,"yyyy-MM-dd")}}</em>
                    </li>  
                </ul>       
            </div>
            <div class="tabList" v-show="tabIndex==2">
                <ul>
                    <li v-for="(item,index) in newList.slice(0,6)" :key="index">
                        <i v-text="index"></i>
                        <span>[{{item.sectionName}}]</span>
                        <router-link :to="{path:`/disDetail/${item.id}`}" tag="a" target="_blank">{{item.title}}</router-link>
                        <em class="time">{{$formatDate(item.lasttime,"yyyy-MM-dd")}}</em>
                    </li>  
                </ul> 
            </div>   
                <!-- <div v-show="tabIndex==1" class="tabList">
                    <div class="main animated fadeInDown">
                        <div class="right-list">
                            <div class="index_img" style="background:url(http://img.javaex.cn/72419aa803684ae59d1bfa28c67ee71d) no-repeat;background-size:100% 100%;">
                            </div>
                            <div class="index_title">
                                <b>
                                    <a href="">虫林大作战</a>
                                </b>
                                <span>2019-04-15</span>
                            </div>
                                <a href="" class="index_summary">导演: Arnaud Bouron / Antoon Krings编剧: Antoon Krings</a> 
                                <hr class="index_hr">
                            <ul>
                                <li>
                                    <a href="" target="_blank">知道人是怎么做出来的么</a>
                                    <span>2018-02-15</span>
                                </li>
                                    <li>
                                    <a href="" target="_blank">知道人是怎么做出来的么</a>
                                    <span>2018-02-15</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> -->
           
        </div>  
    </div>
</template>
<script>
import * as api from '@/api/home'
export default {
    name:"newsList",
    data(){
        return{
            tabIndex:1,
            hotList:[],
            newList:[]
        }
    },
    methods:{
        exchange(tab) {
            this.tabIndex=tab
            if(this.tabIndex == 2){
                this.getNewTopicList()
            }else{
                this.getTopiclist()
            }
        },
        async getTopiclist(){
            await api.getTopiclist().then(res=>{
                const { data } = res
                if ( res.code ==0 ){
                    this.hotList = data
                }
            })
        },
        async getNewTopicList(){
            await api.getNewTopicList().then(res=>{
                const { data } =res
                if ( res.code === 0 ){
                    this.newList = data 
                }
            })
        }
    },
    created(){
        this.getTopiclist()
        this.getNewTopicList()
    }
}
</script>
<style lang="scss" scoped>
@mixin text_no_wrap {
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tabList{
    width: 100%;
    overflow: hidden;
    display: block;
    margin-top:10px;
    text-align: left;
   
}
.main{
    height: 320px;
    margin: 0;
    text-align: left;
    padding: 20px;
}
.tab{
    background: #fff;
    .tab-title{
        height: 24px;
        border-bottom: none;
        em{
            color: #333;
            line-height: 24px;
            font-size: 16px;
            float: left;
            margin-right: 20px;
            font-style: normal;
        }
        li{
            text-align: center;
            float: left;
            font-size: 16px;
            display: block;
            text-decoration: none;
            height: 24px;
            line-height: 24px;
            margin-right: 15px;
            color: #6d757a;
            cursor: pointer;
        }
        .current{
            color: #23b8ff;
        }
    }
}   
.tabList ul{
    li{
        float: left;
        width: 100%;
        overflow: hidden;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        line-height: 34px;
        padding-left: 50px;
        background-repeat: no-repeat;
        color: #212121;
        position: relative;
        background-position:8px;
        background-image: url("../../assets/images/rect_triangle_gray.png");
        @for $var from 0 to 4 {
            &:nth-of-type(#{$var}) {
            background-image: url("../../assets/images/rect_triangle.png");
            }
        }
        i{
            position: absolute;
            left: 8px;
            width: 24px;
            color: #fff;
            top: 0;
            text-align: center;
            z-index: 2;
            font-size: 12px;
        }
        span{
            color: #0077ff;
            float: left;
            width: 68px;
            @include text_no_wrap;
        }
        a{
            margin: 0 5px;
            color: #777;
            width: 325px;
            display: block;
            float: left;
            @include text_no_wrap;    
        }
        .time{
            float: right;
            color: #999;
            font-size: 14px;
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
