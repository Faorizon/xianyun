<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.airport" placeholder="起飞机场">
                    <el-option
                    v-for="(item,index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.flightTimes"  placeholder="起飞时间" >
                    <el-option
                    v-for="(item,index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00-${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.company"  placeholder="航空公司">
                    <el-option
                    v-for="(item,index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.airSize" placeholder="机型">
                    <el-option
                    v-for="(item,index) in sizeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                type="primary" 
                round 
                plain 
                size="mini" 
                @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    data(){
        return {
            filters:{
                airport: "",        // 机场
                flightTimes: "",    // 出发时间
                company: "",        // 航空公司
                airSize: "",        // 机型大小
            },
            
            sizeOptions:[
                {name:'大',size:"L"},
                {name:'中',size:"M"},
                {name:'小',size:"S"},
            ]
        }
    },
    watch:{
        filters:{
            deep:true,
            handler(){
                var arr=this.data.flights.filter(v=>{
                    let valid=true;
                    //航空公司
                    if(this.filters.company && this.filters.company !==v.airline_name){
                        valid=false;
                    }
                    //机场
                    if(this.filters.airport && this.filters.airport !== v.org_airport_name){
                        valid=false;
                    }
                    //出发时间
                    if(this.filters.flightTimes){
                        //出发时间的小时
                        const start = +v.dep_time.split(":")[0];
                        const arr = this.filters.flightTimes.split(",");
                        if(start < +arr[0] || start>+arr[1]){
                            valid=false;
                        }                      
                    }
                    //飞机大小
                    if(this.filters.airSize && this.filters.airSize !== v.plane_size){
                        valid=false;
                    }
                    return valid
                })
                this.$emit("setDataList",arr)
            }
        }
    },
    methods: {
        // // 选择机场时候触发
        // handleAirport(value){
        //     const arr=this.data.flights.filter(v=>{
        //         return v.org_airport_name===value
        //     });

        //     // console.log(arr)
        //     this.$emit("setDataList",arr)
        // },

        // // 选择出发时间时候触发
        // handleFlightTimes(value){
        //     //数组中第一项是开始时间，第二项是终止时间
        //     const arr=value.split(",");
        //     const arr2=this.data.flights.filter(v=>{
        //         //出发时间的小时
        //         const start = +v.dep_time.split(":")[0];
        //         //比较航班出发时间是否在选中的时间段内
        //         return start >= +arr[0] && start < +arr[1]
        //     })
        //     //修改列表数据
        //     this.$emit("setDataList",arr2)
        // },

        //  // 选择航空公司时候触发
        // handleCompany(value){
        //     const arr= this.data.flights.filter(v=>{
        //         return v.airline_name===value
        //     })
        //     //修改列表数据
        //     this.$emit("setDataList",arr)
        // },

        //  // 选择机型时候触发
        // handleAirSize(value){
        //    const arr=this.data.flights.filter(v=>{
        //        return v.plane_size===value;
        //    })
        //    //修改列表数据
        //    this.$emit("setDataList",arr)
        // },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport="";
            this.flightTimes="";
            this.company="";
            this.airSize="";
            this.$emit("setDataList",this.data.flights)
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>