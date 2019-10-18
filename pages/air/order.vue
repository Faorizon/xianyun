<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm @getDetail="getDetail"/>
            </div>

            <!-- 侧边栏 -->
            <OrderAside :data="detail"/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/orderAside.vue";
export default {
    data(){
        return{
            detail:{
                //默认值
                seat_infos:{}
            }
        }
    },
    components:{
        OrderForm,
        OrderAside
    },
    methods:{
        //获取机票详情的方法
        getDetail(detail){
            this.detail=detail;
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>