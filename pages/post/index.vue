<template>
    <div class="box">
        <el-row type="flex" class="row-bg">
            <div class="left">
                <el-col :span="6">
                    <div class="grid-content bg-purple menu">
                        <ul>
                            <li class="menu-item">热门城市 <span class="iconfont el-icon-arrow-right"></span></li>
                            <li class="menu-item">推荐城市 <span class="iconfont el-icon-arrow-right"></span></li>
                            <li class="menu-item">奔向海岛 <span class="iconfont el-icon-arrow-right"></span></li>
                            <li class="menu-item">主题推荐 <span class="iconfont el-icon-arrow-right"></span></li>
                        </ul>
                        <div class="recommend">
                                <div class="recommendItem">
                                    <span class="ranking">1</span>
                                    <span class="city">北京</span>
                                    <span class="describe">世界著名古都和现代化国际城市</span>
                                </div>
                        </div>
                    </div>
                    <div class="wishful">
                        <h4>推荐城市</h4>
                        <img src="1.png" alt="">
                    </div>
                </el-col>
            </div>
            <div class="right">   
                <el-col :span="18">
                    <div class="grid-content bg-purple-light">
                        <div class="search">
                            <input type="text" placeholder="请输入想去的地方,比如：广州" v-model="travelSearch" @keydown.enter="handleSearch">
                            <i class="iconfont el-icon-search" @click="handleSearch"></i>
                        </div>
                        <div class="searchRecommend">
                            推荐：
                            <a href="#">北京</a>
                            <a href="#">上海</a>
                            <a href="#">广州</a>
                        </div>
                        <el-row type="flex" justify="space-between" align="middle" class="recommend-title">
                            <h4>推荐攻略</h4>
                            <el-button type="primary" icon="el-icon-edit" @click.native="$router.push('/post/create')">
                                写游记
                            </el-button>
                        </el-row>
                    </div>
                    <PostList/>
                </el-col>
            </div>
            
        </el-row>
    </div>
</template>

<script>
import PostList from "@/components/post/postList"
export default {
    components:{
        PostList
    },
    data(){
        return{
            travelSearch:""
        }
    },
    methods:{
        handleSearch(){
            console.log(123)
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped lang="less">
    .box{
        width:1000px;
        margin:0 auto;
        padding: 20px 0;
        .left{
            margin-right: 35px;
            .menu{
                position: relative;
                ul{
                    width:260px;
                    border:1px solid #ccc;
                    .menu-item{   
                        display: flex;
                        justify-content: space-between;
                        padding:0 20px;
                        box-sizing: border-box;
                        height: 40px;
                        line-height: 40px;
                        border-bottom:1px solid #ccc;
                        &:last-child{
                            border-bottom: none;
                        }
                        .el-icon-arrow-right{
                            line-height: 40px;
                        }
                    }
                }
                .recommend{
                    position: absolute;
                    top: 0px;
                    left: 261px;
                    display: none;
                    z-index:-1;
                    padding: 0 5px;
                    width: 300px;
                    border: 1px solid #ccc;
                    background-color: #fff;
                    .recommendItem{
                        height: 40px;
                        line-height: 40px;
                        overflow: hidden;
                        color:#ffa500;
                        .ranking{
                            margin-left: 10px;
                            font-size: 20px;
                            font-weight: 600;
                            cursor:pointer;
                        }
                        .city{
                            margin-left: 10px;
                            font-size: 16px;
                            cursor: pointer;
                            &:hover{
                                text-decoration: underline;
                            }
                        }
                        .describe{
                            margin-left: 10px;
                            font-size: 14px;
                            color:#ccc;
                            cursor: pointer;
                            &:hover{
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
            .wishful{
                margin-top: 20px;
                width: 260px;
                h4{
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                    font-weight: 300;
                    border-bottom: 1px solid #ccc;
                }
                img{
                    width:100%;
                }
            }
        }
        .right{
            width:700px;
            .search{
                width:700px;
                border:2px solid #ffa500;
                input{
                    padding:0 15px;
                    width:610px;
                    line-height: 36px;
                    outline: none;
                    border:none;
                }
                i{  
                    margin-top: 8px;
                    width: 40px;
                    color:#ffa500;
                    font-size: 24px;
                    font-weight: 600;
                    cursor: pointer
                }
            }
            .searchRecommend{
                margin: 10px 0;
                font-size: 12px;
                color:#333;
                a{
                    margin-left: 3px;
                    cursor: pointer;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
            .recommend-title{
                padding: 10px 0;
                width: 700px;
                border-bottom: 1px solid #ccc;
                h4{
                    font-weight: 400;
                    font-size: 18px;
                    color:#ffa500;
                    &::after{
                        display: block;
                        content: "";
                        width:72px;
                        height: 2px;
                        background-color: #ffa500;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                    }
                }
            }
        }
    }
    
</style>