export const state=()=>{
    return {
        //酒店列表
        hotelList:[]
    }
}
export const mutations={
    //设置hotelList的值，data是酒店数据
    setHotelList(state,data){
        state.hotelList=data
    }
}
export const action={
    
}