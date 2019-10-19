<template>
    <div class="container">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="crumbs">
            <el-breadcrumb-item>酒店</el-breadcrumb-item>
            <el-breadcrumb-item>南京酒店预订</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 酒店查询 -->
        <SearchForm/>
    </div>
</template>

<script>
import SearchForm from "@/components/hotel/searchForm"
export default {
    components:{
        SearchForm
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