<template>
    <div>
        <van-search v-model="value" placeholder="搜索商品，发现更多优选" background="yellow" @click="handlesear"><van-icon name="search" size="18"/></van-search>
    </div>
</template>
<script>
import Vue from 'vue'
import { Search, Icon } from 'vant'
Vue.use(Search).use(Icon)
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    handlesear () {
      this.$router.push('/search')
    }
  }
}
</script>
