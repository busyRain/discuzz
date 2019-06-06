<template>
    <div class="board-box">
        <div class="board-bg" style="background: url(http://img.javaex.cn/FsjZILLbMNWFO_iFJNNneW-cmE0G) no-repeat;background-size: cover;"></div>
        <div class="team-desc clearfix">
            <div class="desc-left fl">
                <div class="circle-img fl">
                    <img class="board-icon" src="http://img.javaex.cn/Fnol7Gy7_ztiulsQLGpJDSQUzshj"/>
                    <a href="javascrip:;" class="join-circle">板块统计</a>
                </div>
                <div class="circle-name fl">
                    <div class="club-name">游戏讨论/综合讨论</div>
                    <div class="club-desc">新鲜资讯一手掌握！</div>
                    <div class="club-desc-line"></div>
                    <div class="club-fan">
                        <p class="fan-numb">
                            <span class="fan-text">主题</span>
                            <b>3</b>
                        </p>
                        <p class="fan-numb">
                            <span class="fan-text">贴数</span>
                            <b>4</b>
                        </p>
                        <p class="fan-numb">
                            <span class="fan-text">今日</span>
                            <b>1</b>
                        </p>
                    </div>
                </div>
            </div>
            <div class="desc-right fr">
                <a href="javascript:;" @click="openDialog" class="send-post">发新贴</a>
            </div>
        </div>
        <!--版主信息-->
        <div class="master-header clearfix">
            <div class="master-intro clearfix">
                <h4 class="title clearfix">版主</h4>
                <p class="m-list fl">
                    <a href="" target="_black">123456</a>
                </p>
                <p class="m-list fl">
                    <a href="" target="_black">张三张三</a>
                </p>
                <p class="m-list fl">
                    <a href="" target="_black">李四李四</a>
                </p>
                <p class="m-list fl">
                    <a href="" target="_black">w35343243</a>
                </p>
            </div>
        </div>
        <!--筛选-->
        <div class="classify-list " style="margin-left:20px;">
            <div class="classify-item">
                <span class="classify-title">看贴：</span>
                <div class="classify-list-out">
                    <ul class="classify-ul">
                        <li :class="['classify-li',isessence == false ?'on':'']" @click="toggleTab(false)">
                            <a href="javascript:;" class="classify-letter">普通贴</a>
                        </li>
                        <li :class="['classify-li',isessence == true ?'on':'']" @click="toggleTab(true)">
                            <a href="javascript:;" class="classify-letter">精华贴</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="classify-item">
                <span class="classify-title">排序：</span>
                <div class="classify-list-out">
                    <ul class="classify-ul">
                        <li :class="['classify-li',orderbytype == 4?'on':'']" @click="toggleSort(4)">
                            <a href="javascript:;" class="classify-letter">回复时间</a>
                        </li>
                        <li :class="['classify-li',orderbytype == 3?'on':'']" @click="toggleSort(3)">
                            <a href="javascript:;" class="classify-letter">发布时间</a>
                        </li>
                        <li :class="['classify-li',orderbytype == 1?'on':'']" @click="toggleSort(1)">
                            <a href="javascript:;" class="classify-letter">浏览次数</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as api from "@/api/list"
export default {
    name:"displayBlock",
    data(){
        return{
            isessence:false,
            orderbytype:4,
            id:"112",
            page:1,
            limit:10,
            sectionid:2,
            blockList:{}
        }
    },
    methods:{
        toggleTab(type){
            this.isessence = type
            this.getBlock()
        },  
        toggleSort(sort){
            this.orderbytype = sort 
            this.getBlock()
        },
        openDialog(){

        },
        async getBlock(){
            await api.getBlockTop({
                id:this.id,
                page:1,
                limit:10,
                orderbytype:this.orderbytype,
                isessence:this.isessence,
                sectionid:this.sectionid
            }).then(res=>{
                const { data } =res
                if(res.code == 0){
                    this.blockList = data
                }
            })
        }
    },
    created(){
        let id = this.$route.params.id
        this.getBlock()
    }
}
</script>
<style lang="scss" scoped>
.board-box{
    font-size:14px;
}
.board-bg{
    width:100%;
    height: 150px;
    background-color: #fbfbfb;
    background-size: cover;
    background-position: center;
    border-bottom: 1px solid #f0f1f2;
}
.team-desc{
    height: 110px;
    .desc-left{
        width:75%;
        .circle-img{
            position: relative;
            margin-left:20px;
            width:100px;
            .board-icon{
                position: absolute;
                top: -50px;
                left: 0;
                width: 100px;
                height: 100px;
                border: 3px solid #fff;
                border-radius: 50%;
                background: #fff;
            }
            .join-circle{
                display: block;
                margin: 66px 0 0 10px;
                width: 80px;
                height: 28px;
                border-radius: 5px;
                color: #1C8CE9;
                border: 1px solid #1C8CE9;
                text-align: center;
                font-size: 13px;
                line-height: 28px;
                cursor: pointer;
            }
        }
        .circle-name{
            overflow: hidden;
            margin: 12px 0 0 20px;
            width: 70%;
            text-overflow: ellipsis;
            white-space: nowrap;
            .club-name{
                overflow: hidden;
                width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 16px;
                line-height: 22px;
            }
            .club-desc{
                overflow: hidden;
                margin-top: 2px;
                width: 100%;
                height: 17px;
                color: #a8abb3;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                line-height: 17px;
            }
            .club-desc-line{
                margin-top: 10px;
                width: 100%;
                height: 1px;
                background: #f0f1f2;
            }
            .club-fan{
                margin-top:10px;
                font-size:14px;
                .fan-numb{
                    display: inline-block;
                    margin-right:10px;
                    .fan-text{
                        margin-right: 7px;
                        color: #a8abb3;
                        font-size: 14px;
                    }
                    b{
                        color: #F26C4F;
                        font-weight: 600;
                    }
                }
            }
        }
    }
    .desc-right{
        width:20%;
        .send-post{
            float: right;
            display: block;
            margin: 41px auto 0;
            margin-right: 20px;
            width: 100px;
            height: 38px;
            border: 1px solid #1C8CE9;
            border-radius: 5px;
            color: #1C8CE9;
            text-align: center;
            font-size: 14px;
            line-height: 36px;
            cursor: pointer;
        }
    }
    
}
.master-header{
    padding:5px 30px;
}
.master-intro{
    .title{
        margin: -5px 10px 0 0;
        height: auto;
        float: left;
        width: 80px;
        height: 28px;
        border-radius: 5px;
        color: #1C8CE9;
        border: 1px solid #1C8CE9;
        text-align: center;
        font-size: 13px;
        line-height: 28px;
    }
    .m-list{
        margin-top: 2px;
        margin-left: 20px;
        a{
            color: #369;
        }
    }
}
.classify-list{
    line-height: 1;
    margin-top: 10px;
    .classify-item{
        margin-bottom:10px;
    }
    .classify-title{
        padding: 7px 0;
        color: #999;
        min-width: 50px;
        display: inline-block;
        vertical-align: top;
        padding: 4px 0;
    }
    .classify-list-out{
        display: inline-block;
        width: calc(100% - 100px);
    }
    .classify-ul{
        height:100%;
    }
    .classify-li{
        margin-right: 5px;
        position: relative;
        display: inline-block;
        cursor: pointer;
        .classify-letter{
            padding:4px 8px;
            display: inline-block;
            border-radius: 2px
        }
    }
    .classify-li.on .classify-letter{
        background: #555;
        color:#fff;
    }
}
</style>
