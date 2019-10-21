<template>
    <div class="box">
        <el-row>
            <el-col :span="4">
                <div class="price">
                    <p class="top">
                        <span class="describe">价格</span>
                        <span class="count">0-{{value1}}</span>
                    </p>           
                    <el-slider v-model="value1" class="slider"  :max="4000" @change="handlePrice"></el-slider>  
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grade">
                    <p>
                        住宿等级
                    </p>
                    <el-dropdown class="elDropdown">
                        <span class="el-dropdown-link">
                            不限<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <div @change="handleStar">
                                <el-checkbox v-model="star" >1星</el-checkbox>
                            </div>   
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="hotelType">
                    住宿类型
                    <el-dropdown class="elDropdown">
                        <span class="el-dropdown-link">
                            不限<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <div @change="handleType">
                                <el-checkbox v-model="hotelType" >1星</el-checkbox>
                            </div>   
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="facility">
                    酒店设施
                    <el-dropdown class="elDropdown">
                        <span class="el-dropdown-link">
                            不限<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <div @change="handleFacility">
                                <el-checkbox v-model="hotelFacility" >1星</el-checkbox>
                            </div>   
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="brand">
                    酒店品牌
                    <el-dropdown class="elDropdown">
                        <span class="el-dropdown-link">
                            不限<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <div @change="handleBrand">
                                <el-checkbox v-model="hotelBrand" >1星</el-checkbox>
                            </div>   
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value1:4000,//价格
            star:[],//星级复选框
            hotelType:[],//酒店类型
            hotelFacility:[],//酒店设施
            hotelBrand:[],//酒店品牌
        }
    },
    methods:{
        //选择价格时触发
        handlePrice(){
            console.log(this.value1)
        },
        //选择星级触发
        handleStar(){
            console.log("星级选中触发")
        },
        //选择类型触发
        handleType(){
            console.log("类型选中触发")
        },
        //选择设施触发
        handleFacility(){
            console.log("设施选中触发")
        },
        //选择品牌触发
        handleBrand(){
            console.log("品牌选中触发")
        },
    }
}
</script>

<style scoped lang="less">
    .box{
        margin: 50px 0;
        padding:10px 0;
        width: 100%;
        box-sizing: border-box;
        height: 80px;
        border:1px #ccc solid;
        font-size: 14px;
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
            .elDropdown{
                margin-top:8px;
                margin-left: -5px;
                .el-icon--right{
                    margin-left: 80px;
                }
            } 
    }
    /deep/.el-checkbox{
        padding: 0 100px 0 10px;
    }
    /deep/.el-checkbox__inner{
        border-radius: 50%;
    }
    /deep/.el-checkbox__label{
        padding-left: 20px;
    }
</style>