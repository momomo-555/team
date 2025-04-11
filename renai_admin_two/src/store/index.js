import { createStore } from 'vuex'

export default createStore({
    state: { 
        aside_fight:false
    },
    mutations: { 
        toggleFight(state){
            state.aside_fight=!state.aside_fight
        }
    },
    actions: {},
})