<template>
  <div>
    <router-view :key="key"></router-view>
  </div>
</template>
<script>
// import hearder from './components/hearder.vue'
export default {
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
  }

}
</script>
<style lang="scss">
   *{
    margin: 0;
    padding: 0;
  }
  html,body{
    height: 100%;
    background: gainsboro;
  }
  ul{
    list-style: none;
  }
</style>
