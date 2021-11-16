<template>
  <h1>Events For Good</h1>
  <div class="events">
    <img alt="Vue logo" src="../assets/logo.png" />
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</router-link
      >
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue"
import EventSerivce from "@/services/EventService.js"
import NProgress from "nprogress"

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
    }
  },
  beforeRouteEnter(routeTo, RouteFrom, next) {
    NProgress.start()
    EventSerivce.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((res) => {
        next((comp) => {
          comp.events = res.data
          comp.totalEvents = res.headers["x-total-count"]
        })
      })
      .catch(() => {
        next({ name: "NetworkError" })
      })
      .finally(() => {
        NProgress.done()
      })
  },
  beforeRouteUpdate(routeTo) {
    NProgress.start()
    EventSerivce.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((res) => {
        this.events = res.data
        this.totalEvents = res.headers["x-total-count"]
      })
      .catch(() => {
        return { name: "NetworkError" }
      })
      .finally(() => {
        NProgress.done()
      })
  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents / 2)
      return this.page < totalPages
    },
  },
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
