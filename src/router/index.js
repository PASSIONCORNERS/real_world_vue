import { createRouter, createWebHistory } from "vue-router"
import NotFound from "../components/NotFound"
import EventList from "../views/EventList.vue"
import EventDetail from "../views/event/Detail.vue"
import EventLayout from "../views/event/Layout.vue"
import EventRegister from "../views/event/Register.vue"
import EventEdit from "../views/event/Edit.vue"
import About from "../views/About.vue"

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
  { path: "/:pathMatch(.*)", name: "bad-not-found", component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
