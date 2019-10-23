<template>
    <div class="post-list">
        <div  v-for="(item,index) in data" :key="index">
            <ul>
                <li v-if="item.images.length<2">
                    <el-row type="flex" >
                        <div class="post-left">
                            <nuxt-link :to="`/post/detail?id=${item.id}`">
                                <img :src="`${item.images[0]}`" alt="" class="post-img">
                            </nuxt-link>
                        </div>
                        <div class="post-right">
                            <div class="post-title">
                                <nuxt-link :to="`/post/detail?id=${item.id}`">
                                    {{item.title}}
                                </nuxt-link>
                            </div>
                            <div class="post-content">
                                <nuxt-link :to="`/post/detail?id=${item.id}`">
                                    {{item.summary}}
                                </nuxt-link>
                            </div>
                            <el-row type="flex" align="middle" class="post-info" justify="space-between">
                                <div>   
                                    <span class="location"><i class="iconfont el-icon-location-outline"></i>{{item.cityName}}</span>
                                    <span>by</span>
                                    <span class="userInfo">
                                        <nuxt-link to="">
                                            <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt="" class="userImg">
                                            <span class="userName">{{item.account.nickname}}</span>
                                        </nuxt-link>
                                    </span>
                                    <span class="viewCount"><i class="iconfont el-icon-view"></i>{{item.watch}}</span>
                                </div>
                                <span class="like" v-if="item.like">{{item.like}} 赞</span>
                                <span class="like" v-else>0 赞</span>
                            </el-row>
                        </div> 
                    </el-row>
                    
                </li>
            </ul>
            <div class="three" v-if="item.images.length>2">
                <div class="post-title">
                    <nuxt-link :to="`/post/detail?id=${item.id}`">
                        {{item.title}}
                    </nuxt-link>
                </div>
                <div class="post-content">
                    <nuxt-link :to="`/post/detail?id=${item.id}`">
                        {{item.summary}}
                    </nuxt-link>
                </div>
                <el-row type="flex" justify="space-between" class="post-pic" :gutter="20">
                    <el-col :span="8" v-for="(itemImg,indexImg) in item.images" :key="indexImg">
                        <nuxt-link :to="`/post/detail?id=${item.id}`">
                            <img :src="`${itemImg}`" alt="" class="post-img">
                        </nuxt-link>
                    </el-col>
                </el-row>
                <el-row type="flex" align="middle" class="post-info" justify="space-between" style="width:100%;">
                    <div>   
                        <span class="location"><i class="iconfont el-icon-location-outline"></i>{{item.cityName}}</span>
                        <span>by</span>
                        <span class="userInfo">
                            <nuxt-link to="">
                                <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt="" class="userImg">
                                <span class="userName">{{item.account.nickname}}</span>
                            </nuxt-link>
                        </span>
                        <span class="viewCount"><i class="iconfont el-icon-view"></i>{{item.watch}}</span>
                    </div>
                    <span class="like" v-if="item.like">{{item.like}} 赞</span>
                    <span class="like" v-else>0 赞</span>
                </el-row>
            </div>
        </div>
        <div class="block">
        <el-pagination
            :current-page="pageList.pageNum"
            :page-sizes="[2, 3, 5, 10]"
            :page-size="pageList.pageSize"
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
    props:{
        data:{
            type:Array,
            default:[]
        },
        total:{
            type:Number,
            default:0,
        }
    },
    data(){
        return{
            // 需要传给父组件的数据集合
            pageList:{
                // 用哪条数据开始
                page_start: 0,
                // 每页显示多少条数据
                pageSize: 2,
                // 当前页码
                pageNum: 1,
            }
        }
    },
    methods:{
        handleSizeChange(val){
            //每页显示条数赋值
            this.pageList.pageSize=val
            //开始数据从0开始
            this.pageList.page_start=0;
            //当前页码为1
            this.pageList.pageNum=1
            //传递事件以及数据给父组件
            this.$emit('setPage',this.pageList)
        },
        handleCurrentChange(val){
            //切换当前页码
            this.pageList.pageNum=val
            //计算从那条开始
            this.pageList.page_start=(val-1)*this.pageList.pageSize
            // 传递数据给父组件
            this.$emit('setPage',this.pageList)
        }
    }
}
</script>

<style scoped lang="less">
.post-list{
    .post-img{
        width: 220px;
        height: 150px;
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
        height: 55px;
        overflow: hidden;
        margin:15px 0 0 0;
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
            border:none;
            margin-top: 15px;
        }
    }
}
</style>