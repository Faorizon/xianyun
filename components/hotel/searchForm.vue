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
                    @select="handleDestSelect"
                    @blur="handleBlur"
                    ></el-autocomplete>
                </el-form-item>
                <!-- 入住与离店日期 -->
                <el-form-item>
                    <el-date-picker
                    v-model="formData.enterTime"
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
                    v-popover:popover2>
                    </el-input>
                    <el-popover
                    ref="popover2"
                    placement="bottom"
                    title="请选择入住人数"
                    width="300"
                    trigger="click"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                    class="numberPeople"
                    >
                        <span style="margin-right:20px;">每间</span>
                        <el-select v-model="value1" placeholder="成人" style="width:100px;">
                            <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="value2" placeholder="儿童" style="width:100px;">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="clearfix">
                            <span class="line"></span>
                            <el-button type="primary" class="confirm">确定</el-button>
                        </div>
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
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isShow:false,//展开和收起
            city:[],//放所有地点的数组
            formData:{
                name_contains:"",//目的地
                enterTime:"",//入店时间
                person:"",//人数
            },
            //成人人数选择
            options1: [{
                value: '选项1',
                label: '1'
                }, {
                value: '选项2',
                label: '2'
                }, {
                value: '选项3',
                label: '3'
                }, {
                value: '选项4',
                label: '4'
                }, {
                value: '选项5',
                label: '5'
            }],
            options2: [{
                value: '选项1',
                label: '1'
                }, {
                value: '选项2',
                label: '2'
                }, {
                value: '选项3',
                label: '3'
                }, {
                value: '选项4',
                label: '4'
                }, {
                value: '选项5',
                label: '5'
            }],
            value1: '',
            value2:'',
        }
    },
    methods:{
        //输入目的地触发
        handleSelect(){
            console.log(123)
        },
        //提交表单
        onSubmit() {
            console.log('submit!');
        },
        // 出发城市输入框值发生变化时候会触发
        // value：输入框的值
        // cb:回调函数，必须要调用，调用时候必须要传递一个数组的参数，
        // 数组中的元素必须是一个对象，对象中必须要有value属性
        queryDestSearch(value, cb){
            // 判断 输入框为空 时候不请求
            if(!value) {
                cb([]);  // 传入 空列表数据
                return;  // 返回
            };
            
            // 请求 搜索建议城市 数据
            this.$axios({
                url: "/airs/city?name=" + value  // 请求 数据接口
            }).then(res => {
                // data 是后台返回的城市数组,没有 value 属性
                const {data} = res.data;

                // 循环 给每一项添加 value 属性
                const newData = data.map(v => {
                    v.value = v.name.replace("市", ""); // 将搜索城 “市” 去掉
                    return v; // 返回 每一项数据
                });

                // 把 newData 赋值给 data中cities
                this.cities = newData;

                // 展示到下拉列表
                cb(newData)
            })
        },
        //出发城市失去焦点的时候默认选中第一个
        handleBlur(){
            //判断 如果没有列表数据就返回
            console.log("失去焦点")
        },
        //选择推荐选项
        handleDestSelect(){
            console.log("选中推荐选项触发")
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
            this.city=res.data.data[0].scenics;
        })
    }
}
</script>

<style scoped lang="less">
.container{
    width:1000px;
    margin:0 auto;
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
</style>