<template>
    <div>
        <div class="tabItem">
            <span 
            v-for="(item,index) in tab" 
            :key="index" 
            @click="handleCurrent(index)"
            :class="{active:index===current}"
            >{{item}}</span>
        </div>
        <div class="content">
            <div class="news" v-if="current===0">
                韩国检察官地位高、权力大，就容易出现贪污腐败、政商勾结。文在寅曾强调，在一些涉及社会特权阶层案件中，韩国检察厅和警察厅等调查机构涉嫌故意疏漏调查，甚至主动妨碍调查，隐瞒真相，庇护涉案人。
            </div>
            <div class="amusement" v-if="current===1">
                文在寅曾强调，在一些涉及社会特权阶层案件中，韩国检察厅和警察厅等调查机构涉嫌故意疏漏调查，甚至主动妨碍调查，隐瞒真相，庇护涉案人。
            </div>
            <div class="physical" v-if="current===2">
                韩国检察厅和警察厅等调查机构涉嫌故意疏漏调查，甚至主动妨碍调查，隐瞒真相，庇护涉案人。
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            current:0,
            tab:["新闻","娱乐","体育"]
        }
    },
    methods:{
        handleCurrent(index){
            this.current=index
        }
    }
}
</script>

<style scoped lang="less">
    .tabItem{
        margin-bottom: 20px;
        span{
            cursor:pointer;
            border:1px #ddd solid;
            padding:10px;
        }
        .active{
            color:red;
            border-color: red;
        }
    }
</style>