<template>
    <div class="post-list">
        <ul>
            <li>
                <el-row type="flex">
                    <div class="post-left">
                        <a href="#">
                            <img src="1.png" alt="" class="post-img">
                        </a>
                    </div>
                    <div class="post-right">
                        <div class="post-title">
                            <a href="#">
                                啊啊啊啊啊
                            </a>
                        </div>
                        <div class="post-content">
                            <a href="#">
                                这是文章内容
                            </a>
                        </div>
                        <el-row type="flex" align="middle" class="post-info" justify="space-between">
                            <div>   
                                <span class="location"><i class="iconfont el-icon-location-outline"></i>北京市</span>
                                <span>by</span>
                                <span class="userInfo">
                                    <a href="#">
                                        <img src="1.png" alt="" class="userImg">
                                        <span class="userName">地球发动机</span>
                                    </a>
                                </span>
                                <span class="viewCount"><i class="iconfont el-icon-view"></i>63</span>
                            </div>
                            <span class="like">3点赞</span>
                        </el-row>
                    </div> 
                </el-row>
                
            </li>
        </ul>
        <div class="three">
            <div class="post-title">
                塞班贵？一定是你打开的方式不对！6000块玩转塞班
            </div>
            <div class="post-content">
                大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最
            </div>
            <el-row type="flex" justify="space-between" class="post-pic" :gutter="20">
                <el-col :span="8">
                    <img src="1.png" alt="" class="post-img">
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="post-info" justify="space-between" style="width:100%;">
                <div>   
                    <span class="location"><i class="iconfont el-icon-location-outline"></i>北京市</span>
                    <span>by</span>
                    <span class="userInfo">
                        <a href="#">
                            <img src="1.png" alt="" class="userImg">
                            <span class="userName">地球发动机</span>
                        </a>
                    </span>
                    <span class="viewCount"><i class="iconfont el-icon-view"></i>63</span>
                </div>
                <span class="like">3点赞</span>
            </el-row>
        </div>
        <div class="block">
        <el-pagination
            :current-page="1"
            :page-sizes="[2, 3, 5, 10]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            total:100,
        }
    },
    methods:{
        handleSizeChange(){
            console.log("size变了")
        },
        handleCurrentChange(){
            console.log("当前页变了")
        }
    }
}
</script>

<style scoped lang="less">
.post-list{
    .post-img{
        width: 220px;
        border:1px solid #ccc;
        object-fit: cover;
    }
    .post-info{
        padding-top: 13px;
        color:#999;
        font-size: 12px;
        i{
            font-size: 12px;
        }
        .location{
            margin-right: 10px;
        }
        .userInfo{
            margin:0 10px;
            .userImg{
                width:16px;
                height:16px;
                vertical-align: middle;
                border:2px #fff solid;
                border-radius:50px;
            }
            .userName{
                color:#ffa500;
            }
        }
        .like{
            float: right;
            color:#ffa500;
            font-size: 16px;
        }
    }
    .post-title{
        font-size: 18px;
        line-height: 24px;
        font-weight: 400;
        cursor: pointer;
        &:hover{
            color:#ffa500;
        }
    }
    .post-content{
        height: 65px;
        margin:15px 0;
        font-size: 14px;
        color:#666;
        cursor: pointer;
    }
    li{
        width:700px;
        margin-top: 15px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 15px;
        .post-left{
            width:220px;
        }
        .post-right{
            margin-left: 10px;
            width: 470px;  
        }
    }
    .three{
        width: 700px;
        margin-top: 15px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 15px;
        .post-img{
            border:none
        }
    }
}
</style>