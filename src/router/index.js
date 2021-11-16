import { createRouter, createWebHistory } from "vue-router"
import NProgress from "nprogress"
import NotFound from "../components/NotFound"
import NetworkError from "../views/NetworkError.vue"
import EventList from "../views/EventList.vue"
import EventDetail from "../views/event/Detail.vue"
import EventLayout from "../views/event/Layout.vue"
import EventRegister from "../views/event/Register.vue"
import EventEdit from "../views/event/Edit.vue"
import About from "../views/About.vue"
import EventService from "@/services/EventService.js"
import GStore from "@/store"

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((res) => {
          GStore.event = res.data
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            return {
              name: "404Resource",
              params: { resource: "event" },
            }
          } else {
            return { name: "NetworkError" }
          }
        })
    },
    children: [
      {
        path: "",
        name: "EventDetail",
        component: EventDetail,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  {
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      return { path: "/events/" + to.params.afterEvent }
    },
  },
  {
    path: "/about-us",
    name: "About",
    component: About,
  },
  {
    path: "/about",
    redirect: { name: "About" },
  },
  // events
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  // network
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
  // 404
  { path: "/:catchAll(.*)", name: "NotFound", component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
