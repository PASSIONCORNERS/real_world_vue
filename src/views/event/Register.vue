<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      // call to api
      // redirect
      //flash message
      this.GStore.flashMessage =
        "You are successfully registered for" + this.event.title
      setTimeout(() => {
        this.GStore.flashMessage = ""
      }, 3000)
      // redirect
      this.$router.push({
        name: "EventDetail",
      })
    },
  },
}
</script>

<style></style>
