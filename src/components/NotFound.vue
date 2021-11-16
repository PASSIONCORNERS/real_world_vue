<template>
  <h1>404 NOT FOUND</h1>
  <h3>The {{ resource }} you're looking for is not found.</h3>
  <router-link :to="{ name: 'EventList' }">Back Home</router-link>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
}
</script>

<style></style>
