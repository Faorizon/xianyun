<template>
    <div class="container">
        <!-- 酒店查询 -->
        <SearchForm/>
        <!-- 筛选 -->
        <HotelFilters :hotelList="hotelList"/>
    </div>
</template>

<script>
import SearchForm from "@/components/hotel/searchForm"
import HotelFilters from "@/components/hotel/hotelFilters"
export default {
    data(){
        return{
            hotelList:[]
        }
    },
    components:{
        SearchForm,
        HotelFilters
    },
    mounted(){
        //获取默认南京酒店数据
        this.$axios({
            url:`/hotels?city=74`
        }).then(res=>{
             const {data} = res.data
             console.log(data)
            //将数据保存到store
            this.$store.commit("hotel/setHotelList",data.slice(0,2))
            //将城市id保存到store
            this.$store.commit("hotel/setCity",74)
            //将酒店总数存入store
            this.$store.commit("hotel/setTotal",data.length)
        })
    }
}
</script>

<style scoped lang="less">
    .container{
        width:1000px;
        margin:0 auto;
    }

</style>