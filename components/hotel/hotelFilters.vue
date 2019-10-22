<template>
    <div class="box">
        <!-- 酒店筛选 -->
        <div class="hotelFilter">
        <el-row>
            <el-col :span="4">
                <div class="price">
                    <p class="top">
                        <span class="describe">价格</span>
                        <span class="count">0-{{this.form.value1}}</span>
                    </p>           
                    <el-slider v-model="form.value1" class="slider"  :max="4000" @change="handlePrice"></el-slider>  
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grade">
                    <p>
                        住宿等级
                    </p>
                    <el-dropdown class="elDropdown">
                        <span class="el-dropdown-link">
                            <span v-if="this.form.star.length===0">不限</span>
                            <span v-if="this.form.star.length===1">{{this.stars[id=this.form.star-1].name}}</span>
                            <span v-if="this.form.star.length>1">已选{{this.form.star.length}}项</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown"
                        style="width:150px;line-height:20px;overflow:auto;overflow-x=hidden;"
                        >
                            <el-checkbox-group v-model="form.star" @change="handleStar">
                                <ul>
                                    <li  v-for="(item,index) in stars" :key="index">
                                        <el-checkbox :label="item.id" >{{item.name}}</el-checkbox>
                                    </li>    
                                </ul>
                            </el-checkbox-group>   
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="hotelType">
                    住宿类型
                    <el-dropdown class="elDropdown">
                        <span class="el-dropdown-link">
                            <span v-if="this.form.hoteltype.length===0">不限</span>
                            <span v-if="this.form.hoteltype.length===1">{{this.hotelType[id=this.form.hoteltype-1].name}}</span>
                            <span v-if="this.form.hoteltype.length>1">已选{{this.form.hoteltype.length}}项</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown"
                        style="width:150px;line-height:20px;overflow:auto;overflow-x=hidden;"
                        >
                            <el-checkbox-group v-model="form.hoteltype" @change="handleType">
                                <ul>
                                    <li  v-for="(item,index) in hotelType" :key="index">
                                        <el-checkbox :label="item.id" >{{item.name}}</el-checkbox>
                                    </li>    
                                </ul>
                            </el-checkbox-group>   
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="facility">
                    酒店设施
                    <el-dropdown class="elDropdown">
                        <span class="el-dropdown-link">
                            <span v-if="this.form.hotelfacility.length===0">不限</span>
                            <span v-if="this.form.hotelfacility.length===1">{{this.hotelFacility[id=this.form.hotelfacility-1].name}}</span>
                            <span v-if="this.form.hotelfacility.length>1">已选{{this.form.hotelfacility.length}}项</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown"
                        style="width:150px;line-height:20px;overflow:auto;overflow-x=hidden;"
                        >
                            <el-checkbox-group v-model="form.hotelfacility" @change="handleFacility">
                                <ul>
                                    <li  v-for="(item,index) in hotelFacility" :key="index">
                                        <el-checkbox :label="item.id" >{{item.name}}</el-checkbox>
                                    </li>    
                                </ul>
                            </el-checkbox-group>  
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="brand">
                    酒店品牌
                    <el-dropdown class="elDropdown">
                        <span class="el-dropdown-link">
                            <span v-if="this.form.hotelbrand.length===0">不限</span>
                            <span v-if="this.form.hotelbrand.length===1">{{this.hotelBrand[id=this.form.hotelbrand-1].name}}</span>
                            <span v-if="this.form.hotelbrand.length>1">已选{{this.form.hotelbrand.length}}项</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown"
                        style="width:150px;height:200px;line-height:20px;overflow:auto;overflow-x=hidden;"
                        >
                            <el-checkbox-group v-model="form.hotelbrand" @change="handleBrand">
                                <ul>
                                    <li  v-for="(item,index) in hotelBrand" :key="index">
                                        <el-checkbox :label="item.id" >{{item.name}}</el-checkbox>
                                    </li>
                               </ul>
                            </el-checkbox-group> 
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        </div>
        <!-- 酒店列表 -->
        <div class="hotelDetail" v-for="(item,index) in $store.state.hotel.hotelList" :key="index" >
            <el-row>
                <el-col :span="8">
                    <div class="hotelImg">
                        <img :src="item.photos" alt="">
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="hotelDescribe">
                        <h1 class="hotelName">{{item.name}}</h1>
                        <div class="hotelEn">
                            {{item.alias}}
                            <i class="iconfont iconhuangguan"></i>
                            <i class="iconfont iconhuangguan"></i>
                            <i class="iconfont iconhuangguan"></i>
                            {{item.hoteltype.name}}
                        </div>
                        <div class="evaluate">
                            <el-rate
                            :value5="item.stars"
                            v-model="item.stars"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}分">
                            </el-rate>
                            <span class="commentNum"><span style="color:#ff9900;">{{item.all_remarks}}</span>条评价</span>
                            <span class="postNum"><span style="color:#ff9900;">100</span>篇游记</span>
                        </div>
                        <div class="location">
                            <span class="iconfont el-icon-location"></span>
                            <span>位于：{{item.address}}</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="hotelOther">
                        <ul>
                            <li v-for="(product,index) in item.products" :key="index">
                                <div class="otherName">{{product.name}}</div>
                                <div>
                                    <span class="price">￥{{product.price}}</span>起
                                    <span class="iconfont el-icon-arrow-right"></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>    
        </div>
        <div>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="$store.state.hotel.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        hotelList:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            currentPage:1,
            stars:[
                {id:1,name:'1星'}
            ],//星级复选框
            hotelType:[],//酒店类型
            hotelFacility:[],//酒店设施
            hotelBrand:[],//酒店品牌
            form:{
                star:[],
                hoteltype:[],//酒店类型
                hotelfacility:[],//酒店设施
                hotelbrand:[],//酒店品牌
                value1:4000,//价格
            },
            pageIndex:1,
            pageSize:2
        }
    },
    watch:{
        form:{
            deep:true,
            handler(){
                var arr=this.hotelList
            }
        }
    },
    methods:{
        //选择价格时触发
        handlePrice(){
            // console.log(this.form.value1)
        },
        //选择星级触发
        handleStar(){
            // console.log("星级选中触发")
            // console.log(this.form.star)
        },
        //选择类型触发
        handleType(){
            console.log("类型选中触发")
            console.log(this.form.hoteltype)
        },
        //选择设施触发
        handleFacility(){
            console.log("设施选中触发")
            console.log(this.form.hotelfacility)
        },
        //选择品牌触发
        handleBrand(){
            console.log("品牌选中触发")
            console.log(this.form.hotelbrand)
        },
        handleSizeChange(val){
            this.pageSize=val
            this.$axios({
                url:`/hotels?city=${this.$store.state.hotel.city}`
            }).then(res=>{
                const {data} = res.data
                //将数据保存到store
                this.$store.commit("hotel/setHotelList",data.slice(0,val))
            })
        },
        handleCurrentChange(val){
            this.pageIndex=val
            this.$axios({
                url:`/hotels?city=${this.$store.state.hotel.city}`
            }).then(res=>{
                const {data} = res.data
                //将数据保存到store
                this.$store.commit("hotel/setHotelList",data.slice((val-1)*this.pageSize,(val-1)*this.pageSize+this.pageSize))
            })
        }
    },
    mounted(){
        this.$axios({
            url:'/hotels/options',
        }).then(res=>{
            const {data}=res.data
            this.stars=data.levels
            this.hotelType=data.types
            this.hotelFacility=data.assets
            this.hotelBrand=data.brands
        })
        
    }
}
</script>

<style scoped lang="less">
    .box{
        margin: 50px 0;
        
        width: 100%;
        
        font-size: 14px;
        .hotelFilter{
            padding:10px 0;
            box-sizing: border-box;
            border:1px #ccc solid;
            div{
                padding: 0 5px;
                border-right: 1px solid #ccc;
                &:last-child{
                    border-right: none;
                }
                p{
                    overflow: hidden;
                    .describe{
                        float:left;
                    }
                    .count{
                        float:right;
                    }
                } 
            }
        }
        
        .elDropdown{
            margin-top:8px;
            margin-left: -5px;
           
            .el-icon--right{
                margin-left: 80px;
            }
        } 
    }
    .hotelDetail{
        padding:25px 0;
        width: 100%;
        border-bottom: 1px solid #ccc;
        .hotelImg{
            width:320px;
            height:265px;
            overflow: hidden;
            img{
                display: block;
                width: 100%;
                // object-fit:contain;
            }
        }
        .hotelDescribe{
            padding-right: 20px;
            .hotelName{
                font-weight: 300;
            }
            .hotelEn{
                font-size: 16px;
                .iconhuangguan {
                    color: #ff9900;
                }
            }
            .evaluate{
                display: flex;
                margin: 10px 0;
                font-size: 16px;
                .commentNum{
                    margin-left: 8px;
                }
                .postNum{
                    margin-left: 8px;
                }
            }
        }
        .hotelOther{
            ul{
                li{
                    padding: 10px 5px;
                    border-bottom: 1px solid #ccc;
                    display: flex;
                    justify-content: space-between;
                    .price{
                        color:#ff9900;
                    }
                }
            }
                
        }
    }
    
    /deep/.el-checkbox{
        padding: 0 60px 0 10px;
        display: block;
        margin-bottom: 3px;
    }
    /deep/.el-checkbox__inner{
        border-radius: 50%;
    }
    /deep/.el-pagination{
        float: right;
    }
    
</style>