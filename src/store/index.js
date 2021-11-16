// import { reactive } from "vue"
// export default reactive({ flashMessage: "", event: null })

import { createStore } from "vuex"
import EventService from "../services/EventService"
export default createStore({
  state: {
    user: "Phong Truong",
    events: [],
    event: {},
  },
  // synchronous only
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
  },
  // logic before mutate (asynchronous)
  actions: {
    // create
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit("ADD_EVENT", event)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // read all
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then((res) => {
          commit("SET_EVENTS", res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchEvent({ commit }, id) {
      EventService.getEvent(id)
        .then((res) => {
          commit("SET_EVENT", res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  modules: {},
})
