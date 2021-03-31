<template>
    <div class="search">
        <van-search
            v-model="value"
            show-action
            placeholder="搜索商品，发现更多优选"
            background="yellow"
        >
            <template #action>
                <div>搜索</div>
            </template>
            <template #left>
                <div @click="back">返回</div>
            </template>
        </van-search>
        <div class="searchall">
            <div class="search-title">热门搜索</div>
            <div>
                <span v-for="(data,index) in datalist" :key="index" @click="handlesearch(index)" :class="{ active: data.highlight }">{{data.word}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { search } from 'vant'
import Vue from 'vue'
import http from '@/util/http'
Vue.use(search)
Vue.directive('search', {
  inserted (el, binding) {
    console.log(el, binding)
  }
})
export default {
  data () {
    return {
      value: '',
      datalist: [],
      wordlist: []
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    handlesearch (id) {
      this.value = this.datalist[id].word
      this.$router.push(`/searchword/${this.value}`)
    }
  },
  mounted () {
    http({
      url: '/api/search/home'
    }).then(res => {
      this.datalist = res.data.data.hotWords
      console.log(this.datalist)
    })
  }
}
</script>
<style lang="scss" scoped>
    .searchall{
        background: #fff;
        height: 667px;
        .search-title{
            height: 50px;
            width: 100%;
            line-height: 50px;
        }
    }
    span{
        background: yellow;
        padding: 10px;
        border-radius: 10px;
        display: inline-block;
        margin-left: 5px;
        margin-top: 5px;
    }
</style>
