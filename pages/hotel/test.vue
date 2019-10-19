<template>
    <div style="padding:50px;">
        高德地图
        <div id="container"></div> 
    </div>
</template>

<script>

export default {
    mounted(){
        window.onLoad  = function(){
            var map = new AMap.Map('container', {
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
</script scoped>
    
<style>
    #container {width:500px; height: 380px; }  
</style>