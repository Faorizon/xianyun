<template>
    <div class="container">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="crumbs">
            <el-breadcrumb-item>酒店</el-breadcrumb-item>
            <el-breadcrumb-item>南京酒店预订</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 酒店查询 -->
        <el-form :inline="true" :model="formData" class="demo-form-inline">
                <!-- 目的地 -->
                <el-form-item>
                    <el-autocomplete
                    class="inline-input inquire"
                    v-model="formData.name_contains"
                    :fetch-suggestions="queryDestSearch"
                    placeholder="目的地"
                    @change="handleDestSelect"
                    @blur="handleBlur"
                    ></el-autocomplete>
                </el-form-item>
                <!-- 入住与离店日期 -->
                <el-form-item>
                    <el-date-picker
                    v-model="time"
                    @change="handleDate"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="入住日期"
                    end-placeholder="离店日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="inpPeople">
                    <el-input 
                    v-model="formData.person" 
                    placeholder="人数未定"
                    suffix-icon="el-icon-edit-outline"
                    v-popover:popover2>
                    </el-input>
                    <el-popover
                    ref="popover2"
                    placement="bottom"
                    title="请选择入住人数"
                    width="300"
                    trigger="click"
                    class="numberPeople"
                    >
                        <span>每间</span>
                        <el-select v-model="value1" placeholder="成人" style="width:85px;">
                            <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="value2" placeholder="儿童" style="width:85px">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-button type="primary" class="confirm" @click="handleConfirm">确定</el-button>
                    </el-popover>
                </el-form-item>
            <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 简介 -->
        <el-row>
            <el-col :span="14">
                <div class="gonglve">
                    <!-- 区域 -->
                    <div class="area" ref="area">
                        <span class="areaLogo">区域：&nbsp;&nbsp;</span>
                        <span class="content">
                            <span v-for="(item,index) in this.city" :key="index">
                                <a href="#" class="item-name">{{item.name}}</a>
                            </span>
                        </span>                      
                    </div>
                    <a href="#" @click="clickShow" v-if="!isShow" class="showArea">
                        <span class="iconfont el-icon-arrow-down"></span>
                    </a>
                    <a href="#" @click="clickShow" v-if="isShow"  class="showArea">
                        <span class="iconfont el-icon-arrow-up"></span>
                    </a> 
                    <!-- 攻略 -->
                    <div class="strategy">
                        <span class="strategyLogo">攻略: &nbsp;&nbsp;</span>
                        <span class="content">
                            北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
                        </span>
                    </div>
                    <!-- 均价 -->
                    <el-tooltip class="item" effect="dark" content="等级评定是针对房价,设施和服务等各方面水平的综合评估" placement="top">
                    <div class="price">均价 &nbsp;&nbsp;:
                        <span class="wenhaoSytle">?</span>&nbsp;&nbsp;
                        <i class="iconfont iconhuangguan"></i>
                        <i class="iconfont iconhuangguan"></i>
                        <i class="iconfont iconhuangguan"></i>¥332
                        &nbsp;
                        <i class="iconfont iconhuangguan"></i>
                        <i class="iconfont iconhuangguan"></i>¥521
                        &nbsp;
                        <i class="iconfont iconhuangguan"></i>
                        <i class="iconfont iconhuangguan"></i>
                        <i class="iconfont iconhuangguan"></i>¥768
                    </div>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple-light">
                    <div id="container"></div>
                </div>
            </el-col>
            <el-col :span="10">
                <div id="map"></div> 
            </el-col>
        </el-row>
    </div>
</template>

<script>
import moment from "moment";
export default {
    data(){
        return{
            isShow:false,//展开和收起
            city:[],//放所有地点的数组
            formData:{
                name_contains:"",//目的城市名称
                city:"",//目的城市id
                enterTime:"",//入店时间
                leftTime:"",//离店时间
                person:"",//人数
            },
            //成人人数选择
            options1: [{
                value: '1',
                label: '1成人'
                }, {
                value: '2',
                label: '2成人'
                }, {
                value: '3',
                label: '3成人'
                }, {
                value: '4',
                label: '4成人'
                }, {
                value: '5',
                label: '5成人'
            }],
            options2: [{
                value: '0',
                label: '0儿童'
                }, {
                value: '1',
                label: '1儿童'
                }, {
                value: '2',
                label: '2儿童'
                }, {
                value: '3',
                label: '3儿童'
                }, {
                value: '4',
                label: '4儿童'
            }],
            value1: '',//成人
            value2:'',//儿童
            time:"",//入住与离店时间
            cities:[],//存放收缩框搜索出来的城市
            hotelList:[],//存放酒店列表
        }
    },
    methods:{
        //输入目的地触发
        handleSelect(){
            console.log(123)
        },
        //提交表单
        onSubmit() {
            this.$axios({
                url:`/hotels?city=${this.formData.city}&enterTime=${this.formData.enterTime}&leftTime=${this.formData.leftTime}`
            }).then(res=>{
                console.log(res)
                const {data} = res.data
                //将数据保存到store
                this.$store.commit("hotel/setHotelList",data)
            })
        },
        // 出发城市输入框值发生变化时候会触发
        // value：输入框的值
        // cb:回调函数，必须要调用，调用时候必须要传递一个数组的参数，
        // 数组中的元素必须是一个对象，对象中必须要有value属性
        queryDestSearch(value, cb){
        //    console.log(value)
        //    console.log(this.formData.name_contains)
            if(!value){
                cb([]);
                return;
            };
            this.$axios({
                url:"/airs/city?name="+value
            }).then(res=>{
                const {data}=res.data
                const newData=data.map(v=>{
                    v.value=v.name.replace("市","")
                    return v;
                })
                this.cities=newData
                cb(newData)
            })
        },
        //出发城市失去焦点的时候默认选中第一个
        handleBlur(){
            if(this.cities.length===0) return;
            this.formData.name_contains=this.cities[0].value;
            this.formData.destCode=this.cities[0].sort
        },
        //选择推荐选项
        handleDestSelect(){
            console.log("选中推荐选项触发")
        },
        //选择日期后触发
        handleDate(){
            const timer1=moment(this.time[0]).format(`YYYY-MM-DD`)
            const timer2=moment(this.time[1]).format(`YYYY-MM-DD`)
            this.formData.enterTime=timer1;
            this.formData.leftTime=timer2;
        },
        handleConfirm(){            
            this.$refs.popover2.$refs.popper.hidden=true;
            console.log(this.value1,this.value2)
            this.formData.person=`${this.value1}成人 ${this.value2}儿童`;
            
        },
        //区域部分超出的展示和隐藏
        clickShow(){
            this.isShow= !this.isShow;
            if(this.isShow){
                this.$refs.area.style.height="130px"

            }else{
                this.$refs.area.style.height="40px"
            }
        }

    },
    mounted(){
        //获取城市区域所有列表
        this.$axios({
            url:"/cities?name=南京"
        }).then(res=>{
            const {data}=res.data
            console.log(data)
            // console.log(data[0])
            this.city=data[0].scenics;
            this.formData.city=data[0].id
        })
        window.onLoad  = function(){
            var map = new AMap.Map('map', {
            zoom:11,//级别
            center: [116.397428, 39.90923],//中心点坐标
            viewMode:'3D'//使用3D视图
        });
        }
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=5d7329a6de1940ae225c998fa7e59ba0&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
}
</script>

<style scoped lang="less">
.container{
    .crumbs{
        padding:20px 0;
    }
    .line{
       display:block;
       width: 100%;
       border-bottom:1px solid #000; 
       padding:5px 0 10px;
       margin-top: 5px;
    }
    .confirm{
        float: right;
        height: 30px;
        line-height: 8px;
    }
    .gonglve{
        .area{
            height: 40px;
            overflow: hidden;   
        }
        .areaLogo,.strategyLogo{
            float: left;
        }
        .content{
            display: inline-block;
            width: 500px;
            height:40px;
            font-size: 14px;
            .item-name {
                margin-right: 10px;
                &:hover {
                    text-decoration: underline;
                    color: #0099ff;
                }
            }
        }
        .showArea{
            margin-left: 53px;
            color:#00a4ff;
            text-decoration: underline;
            font-size: 14px;
        }
        .price{
            position: relative;
            .wenhaoSytle {
                margin-top: 20px;
                background: #ccc;
                display: inline-block;
                width: 10px;
                height: 10px;
                line-height: 10px;
                font-size: 10px;
                padding: 2px;
                border-radius: 50%;
                text-align: center;
                position: absolute;
                top: -20px;
                left: 30px;
                
            }
            .iconhuangguan {
                color: #ff9900;
            }
        }
    }

    
}
#map {width:400px; height: 280px; }
</style>