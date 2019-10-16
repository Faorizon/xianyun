export const state=()=>{
    return {
        //搜索的历史记录
        history:[]
    }
}
export const mutations={
    //设置history的值，data是搜索表单的对象
    setHistory(state,data){
        state.history.unshift(data)
    }
}
export const actions={
    
}