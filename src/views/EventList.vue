<template>
  <h1>Events For Good</h1>
  <div class="events">
    <img alt="Vue logo" src="../assets/logo.png" />
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    -->
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue"
export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch("fetchEvents")
  },
  computed: {
    events() {
      return this.$store.state.events
    },
    // hasNextPage() {
    //   var totalPages = Math.ceil(this.totalEvents / 2)
    //   return this.page < totalPages
    // },
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
