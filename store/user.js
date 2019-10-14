//用户管理
export const state=()=>({
    //采用接口返回的数据结构
    userInfo:{
        token:"",
        user:{},
    }
})

export const mutations={
     // 保存用户信息到state
     setUserInfo(state, data){
        state.userInfo = data;
    },
};

export const actions={
    async login(store,data){
        var res= await this.$axios({
            url:'/accounts/login',
            method:'post',
            data
        })
        if(res.status===200){
            store.commit("setUserInfo",res.data)
        }
        return res;
    }
}