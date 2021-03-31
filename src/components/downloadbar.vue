<template>
    <div @click="handle">APP内浏览</div>
</template>
<script>
export default {
  methods: {
    handle () {
      this.$router.push('/download')
    }
  }
}
</script>
<style lang="scss" scoped>
    div{
        width: 120px;
        border-radius: 50px;
        height: 50px;
        line-height: 50px;
        background: blue;
        opacity: 0.8;
        color: #fff;
        text-align: center;
        position: fixed;
        bottom: 20px;
        left: 130px;
    }
</style>
