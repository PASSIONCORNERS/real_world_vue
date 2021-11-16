// import { reactive } from "vue"
// export default reactive({ flashMessage: "", event: null })

import { createStore } from "vuex"
export default createStore({
  state: {
    user: "Phong Truong",
    events: [],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
  },
  actions: {},
  modules: {},
})
