<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <!-- flightsData是不会被修改的列表数据 -->
                <!-- setDataList用于修改过滤后的数组列表 -->
                <div>
                    <FlightsFilters 
                    :data="flightsData"
                    @setDataList="setDataList"
                    />
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <FlightsListHead/>
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                    <FlightsItem
                    v-for="(item,index) in dataList"
                    :key="index"
                    :item="item"
                    />
                    <el-pagination
                    v-if="flightsData.flights.length"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="flightsData.total">
                    </el-pagination>
                    <!-- loading等于false表示加载完毕之后才显示 -->
                    <div v-if="flightsData.flights.length === 0 && !loading" style="padding: 50px; text-align:center">
                        该航班暂无数据
                    </div>
                </div>
            </div>


            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
import FlightsFilters from "@/components/air/flightsFilters.vue"
export default {
    components:{
        FlightsListHead,
        FlightsItem,
        FlightsFilters
    },
    data(){
        return {
            //请求机票列表返回的总数据，包含了flights,info,options,total
            flightsData:{
                //初始值
                flights:[],
                info:{},
                options:{}
            },
            //缓存一份数据，只会修改一次
            cacheFlightsData:{
                flights:[],
                info:{},
                options:{}
            },

            //从flights总列表数据中切割出来数组列表
            // dataList:[],
            //当前页数
            pageIndex:1,
            //当前的条数
            pageSize:5,
            //判断是否在加载
            loading:true
        }
    },
    computed:{
        //从flights总列表数据中切割出来数组列表
        dataList(){
            const arr=this.flightsData.flights.slice(
                (this.pageIndex-1)*this.pageSize,
                this.pageIndex*this.pageSize
            )
            return arr;
        }
    },
    methods:{
        //设置dataList数据
        //arr 是展示的新数据，该方法将会传递给过滤组件使用
        setDataList(arr){
            //如果数据从第一页开始显示
            if(arr){
                this.pageIndex=1;
                this.flightsData.flights=arr;
                this.flightsData.total=arr.length;
            }
            // this.dataList=this.flightsData.flights.slice(
            //     (this.pageIndex-1)*this.pageSize,
            //     this.pageIndex*this.pageSize
            // )
        },
        handleSizeChange(val) {
            this.pageSize=val
            //重新回到第一页
            // this.dataList=this.flightsData.flights.slice(0,this.pageSize)
        },
        handleCurrentChange(val) {
            //修改当前的页数
            this.pageIndex=val
            //修改机票列表
            // this.dataList=this.flightsData.flights.slice(
            //     (this.pageIndex-1)*this.pageSize,
            //     this.pageIndex*this.pageSize
            // )
        }
    },
    mounted(){
        //请求机票列表数据
        this.$axios({
            url:"airs",
            //params是axios的get参数
            params:this.$route.query
        }).then(res=>{
            //保存到机票的总数据
            this.flightsData=res.data

            this.cacheFlightsData={...res.data}
            //第一页的数据
            // this.dataList=this.flightsData.flights.slice(0,this.pageSize)
            console.log(res.data)
            //请求完毕
            this.loading=false;
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>