import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
// import GStore from "./store"
import store from "./store"
import "nprogress/nprogress.css"
import { reactive } from "vue"

// createApp(App).use(router).provide("GStore", GStore).mount("#app")

const GStore = reactive({ flashMessage: "", event: null })

createApp(App).use(store).use(router).provide("GStore", GStore).mount("#app")
