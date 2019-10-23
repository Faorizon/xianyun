<template>
    <div class="box">
        <el-row type="flex" class="row-bg">
            <div class="left">
                <el-col :span="6">
                    <div class="grid-content bg-purple menu" @mouseleave="childHidden">
                        <ul  @mouseover="childShow($event)">
                            <li class="menu-item" v-for="(item,index) in menuList" :key="index" :data-id="index">
                                {{item.type}}
                                <span class="iconfont el-icon-arrow-right"></span>
                                <div class="recommend" v-show="showIndex">
                                    <div class="recommendItem" v-for="(city,rank) in childrenList" :key="rank">
                                        <span class="ranking">{{rank+1}}</span>
                                        <span class="city">{{city.city}}</span>
                                        <span class="describe">{{city.desc}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        
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
                            <input type="text" placeholder="请输入想去的地方,比如：广州" v-model="travelSearch" @keydown.enter="getPostList(travelSearch)">
                            <i class="iconfont el-icon-search" @click="getPostList(travelSearch)"></i>
                        </div>
                        <div class="searchRecommend">
                            推荐：
                            <nuxt-link to="/post?city=北京">北京</nuxt-link>
                            <nuxt-link to="/post?city=上海">上海</nuxt-link>
                            <nuxt-link to="/post?city=广州">广州</nuxt-link>
                        </div>
                        <el-row type="flex" justify="space-between" align="middle" class="recommend-title">
                            <h4>推荐攻略</h4>
                            <el-button type="primary" icon="el-icon-edit" @click.native="$router.push('/post/create')">
                                写游记
                            </el-button>
                        </el-row>
                    </div>
                    <PostList :data="postList" :total="total" @setPage="setPage"/>
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
            travelSearch:"",
            menuList:[],//存放侧栏信息
            showIndex:false,//显示隐藏左边栏
            childrenList:[],//要显示的字数据
            currentIndex:0,//默认显示第一个
            postList:[],//存放文章列表数据
            total:0,//存放文章总数目
            // 发送请求需要带的参数
            listPage: {
                page_start: 0,
                pageSize: 2
            },
        }
    },
    watch: {
        // 监听url中city数据的变化重新请求数据
        '$route.query.city':function(newVal, oldVal){
            this.getPostList(newVal)
        }
    },
    methods:{
        childHidden(){
            this.showIndex=false;
        },
        childShow(e){
            this.showIndex=true
            //判断鼠标移入的目标没有id则设置默认索引值的数值数据
            if(!e.target.dataset.id){
                this.childrenList=this.menuList[this.currentIndex].children
            }else{
                this.currentIndex=e.target.dataset.id
                this.childrenList=this.menuList[this.currentIndex].children
            }  
        },
        handleSearch(){
            console.log(123)
        },
        //文章列表组件传值
        setPage(obj){
            this.listPage.page_start=obj.page_start
            this.listPage.pageSize=obj.pageSize
            this.getPostList()
        },
        //获取文章数据列表
        getPostList(getCity){
            const params={
                _start:this.listPage.page_start,
                _limit:this.listPage.pageSize,
            }
            // 如果有城市则设置
            if (getCity) {
                params.city = getCity
            }
            //获取文章列表
            this.$axios({
                url:'/posts',
                params
            }).then(res=>{
                const {data} =res.data
                // 遍历文章列表数组
                data.forEach((e) => {
                    // 判断图片数组的长度是否小于3，是则设置保留一个数据，否则保留3个数据
                    if (e.images.length < 3) {
                        e.images.splice(1)
                    } else {
                        e.images.splice(3)
                    }
                })
                
                this.postList=data
                this.total=res.data.total
            })
        }
    },
    mounted(){
        //获取侧边栏输几局
        this.$axios({
            url:'/posts/cities'
        }).then(res=>{
            // console.log(res)
            const {data} = res.data
            this.menuList=data
        })
        this.getPostList()
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
                z-index: 18;
                ul{
                    width:260px;
                    border:1px solid #ccc;
                    &:hover{
                        border-right: none;
                    }
                    .menu-item{   
                        display: flex;
                        justify-content: space-between;
                        padding:0 20px;
                        // box-sizing: border-box;
                        height: 40px;
                        line-height: 40px;
                        border-bottom:1px solid #ccc;
                        &:hover{
                            border-right:#fff 1px solid;
                            color: orange;
                        }
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
                    left: 260px;
                    // display: none;
                    z-index:-5;
                    padding: 0 5px;
                    width: 300px;
                    border: 1px solid #ccc;
                    // border-left: none;
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