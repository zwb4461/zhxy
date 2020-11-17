import createPersistedState from "vuex-persistedstate"

import VuexPersistence from 'vuex-persist'
// plugins: [new VuexPersistence().plugin]
// let isClient = process.client;

// const plugins;
// if(isClient){
//     plugins = [createPersistedState()]
// }


const state = () => ({
    PROJECT_NAME: '管理平台', //项目名称
    FOOTER_NAME: 'hjf ©2020 Created by myself', //版权的名称
    counter: 0,
})

const mutations = {
    increment(state) {
        state.counter++
    }
}

const actions = {
    increment(context) {
        context.commit('increment')
    }
}

// const plugins = [
//     createPersistedState()
// ]
export default {
    state,
    mutations,
    actions,
    // plugins
}