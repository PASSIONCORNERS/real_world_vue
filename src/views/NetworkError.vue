<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>
    <h3>
      It looks like you're experiencing some network issues, please try again
      later
    </h3>
    <p @click="$router.go(-1)">Try Again</p>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
