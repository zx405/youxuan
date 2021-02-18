<template>
    <div class="search">
        <van-search
            v-model="value"
            show-action
            placeholder="搜索商品，发现更多优选"
            background="yellow"
        >
            <template #action>
                <div class="search-title1" >搜索</div>
            </template>
            <template #left>
                <div class="search-title2" @click="back">返回</div>
            </template>
        </van-search>
        <div class="searchall">
            <div class="search-title">热门搜索</div>
            <div>
                <span v-for="(data,index) in datalist" :key="index">{{data.word}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import search from 'vant'
import Vue from 'vue'
import http from '@/util/http'
Vue.use(search)
export default {
  data () {
    return {
      value: '',
      datalist: []
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  mounted () {
    http({
      url: '/api/search/home'
    }).then(res => {
      this.datalist = res.data.data.hotWords
      console.log(res.data.data.hotWords)
    })
  }
}
</script>
<style lang="scss" scoped>
    .search{
        width: 100%;
        .van-search{
            width: 100%;
            div{
                display: inline-block;
            }
            .van-cell{
                width: 140%;
                margin-left: -19px;
            }
            .search-title1{
                width: 50px;
                margin-left: 62px;
            }
            .search-title2{
                margin-left: 20px;
            }
        }
    }
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
