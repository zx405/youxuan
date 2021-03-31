<template>
    <div>
      <hearder></hearder>
        <div class="items">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="data in itemlist" :key="data.id">
              <img :src="data.image" v-showitem>
                <div v-if="data.title">
                  <p>{{data.title}}<p>
                  <p>￥{{data.price}}</p>
                  <p>{{data.saleNum}}人已买</p>
                </div>
            </van-cell>
          </van-list>
        </div>
        <downloadbar></downloadbar>
    </div>
</template>
<script>
import http from '@/util/http'
import Vue from 'vue'
import hearder from '../components/hearder.vue'
import downloadbar from '../components/downloadbar.vue'
import { List } from 'vant'
Vue.use(List)
Vue.directive('showitem', {
  inserted (el) {
    if (!el.nextElementSibling) {
      el.style.height = 100 + '%'
    }
  }
})
export default {
  components: { hearder, downloadbar },
  data () {
    return {
      itemlist: [],
      finished: false,
      loading: false,
      current: 0
    }
  },
  mounted () {
    http({
      url: `/api/category/${this.$route.params.myid}/items?start=0&sort=0`
    }).then(res => {

    })
  },
  methods: {
    onLoad () {
      this.current += 20
      http({
        url: `/api/category/${this.$route.params.myid}/items?start=${this.current}&sort=0`
      }).then(res => {
        setTimeout(() => {
          this.itemlist = [...this.itemlist, ...res.data.data.items.list]
          this.loading = false
          if (res.data.data.items.isEnd === true) {
            this.finished = true
          }
        }, 0)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .items{
      background: gainsboro;
        .van-cell{
          width: 49%;
          height: 315px;
          background: #fff;
          display: inline-block;
          vertical-align:top;
          margin-top: 5px;
          &:nth-of-type(even){
            margin-left: 7px;
          }
          img{
            width: 100%;
            height: 230px;
            display: block;
          }
          p{
            width: 100%;
            text-overflow:ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
    }
</style>
