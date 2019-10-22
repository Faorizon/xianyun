export const state=()=>{
    return {
        //酒店列表
        hotelList:[],
        //城市id
        city:"",
        //酒店总数
        total:0
    }
}
export const mutations={
    //设置hotelList的值，data是酒店数据
    setHotelList(state,data){
        state.hotelList=data
    },
    //设置城市id
    setCity(state,data){
        state.city=data
    },
    //设置酒店总数
    setTotal(state,data){
        state.total=data
    }
}
export const action={
    async getHotelList(store){
        //请求默认城市列表
        const res= await this.$axios({
            url:`/hotels?city=197`
        });
        const {data} = res.data
        //将数据保存到store
        commit("setHotelList",data)
        return data
    }
}