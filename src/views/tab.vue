<template>
    <div>
      <hearder></hearder>
        <div class="head">
            <div class="title">{{datalis.categoriesTitle}}</div>
            <div class="item">
                <ul>
                    <li v-for="data in datalist" :key="data.id" @click="handleitem(data.id)">
                        <img :src="data.imageUrl" alt="">
                        <div>{{data.title}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="middle">大家都在逛</div>
        <div class="items">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
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
      datalist: [],
      datalis: '',
      itemlist: [],
      finished: false,
      loading: false,
      current: 0
    }
  },
  mounted () {
    http({
      url: `/api/tab/${this.$route.params.myid}?start=0`
    }).then(res => {
      this.datalist = res.data.data.categories
      this.datalis = res.data.data
      this.itemlist = res.data.data.items.list
    })
  },
  methods: {
    handle (id) {
      this.$router.push(`/c/${id}`)
    },
    handleitem (id) {
      this.$router.push(`/category/${id}`)
    },
    onLoad () {
      this.current += 20
      http({
        url: `/api/tab/${this.$route.params.myid}/feeds?start=${this.current}&sort=0`
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
    .head{
        padding:  10px;
        background: #fff;
        .title{
            width: 100%;
            text-align: center;
            height: 30px;
            line-height: 30px;
        }
        .item{
            width: 100%;
            ul{
                display: flex;
                width: 100%;
                flex-wrap: wrap;

                li{
                    width: 25%;
                    text-align: center;
                    img{
                        width: 50px;
                        height: 50px;
                    }
                    div{
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .middle{
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
    }
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
