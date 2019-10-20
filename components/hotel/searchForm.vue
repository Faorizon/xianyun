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
                <el-form-item>
                    <el-input 
                    v-model="formData.person" 
                    placeholder="人数未定"
                    v-popover:popover2>
                    </el-input>
                    <el-popover
                        ref="popover2"
                        placement="bottom"
                        title="标题"
                        width="200"
                        trigger="click"
                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                    </el-popover>
                </el-form-item>
            <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formData:{
                name_contains:"",//目的地
                enterTime:"",//入店时间
                person:"",//人数
            }
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
        }

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
}
</style>