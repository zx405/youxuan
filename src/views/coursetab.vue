<template>
    <div>
        <course></course>
        <div class="item">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
            <van-cell v-for="data in itemlist" :key="data.id" @click="handle(data.id)">
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
import course from './course.vue'
import downloadbar from '../components/downloadbar.vue'
import { List, cell, Toast } from 'vant'
Vue.use(List).use(cell).use(Toast)
Vue.directive('showitem', {
  inserted (el) {
    if (!el.nextElementSibling) {
      el.style.height = 100 + '%'
    }
  }
})
export default {
  components: { course, downloadbar },
  data () {
    return {
      current: 0,
      itemlist: [],
      loading: false, // true表示正在加载中,防止频繁触发
      finished: false
    }
  },
  mounted () {
    http({
      url: `/api/sub_column/${this.$route.params.youid}/items?start=0`
    }).then(res => {
      this.itemlist = res.data.data.list
      console.log(this.$route.params.youid)
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    })
    Toast.setDefaultOptions({ duration: 500 })
  },
  methods: {
    handle (id) {
      this.$router.push(`/c/${id}`)
    },
    onLoad () {
      this.current += 20
      http({
        url: `/api/sub_column/${this.$route.params.youid}/items?start=${this.current}`
      }).then(res => {
        setTimeout(() => {
          this.itemlist = [...this.itemlist, ...res.data.data.list]
          this.loading = false
          if (res.data.data.isEnd === true) {
            this.finished = true
          }
        }, 0)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

   .item{
      background: gainsboro;
      margin-top: 80px;
      div.van-list{
        .van-cell{
          width: 49%;
          height: 315px;
          background: #fff;
          display: inline-block;
          vertical-align:top;
          margin-top: 5px;
          &:nth-of-type(even){
            margin-left: 2%;
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
    }
</style>
