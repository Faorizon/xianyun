<template>
    <div class="container">
        <!-- 酒店查询 -->
        <SearchForm/>
        <!-- 筛选 -->
        <HotelFilters/>
    </div>
</template>

<script>
import SearchForm from "@/components/hotel/searchForm"
import HotelFilters from "@/components/hotel/hotelFilters"
export default {
    components:{
        SearchForm,
        HotelFilters
    }
}
</script>

<style scoped lang="less">
    .container{
        width:1000px;
        margin:0 auto;
    }

</style>