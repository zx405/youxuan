<template>
    <div>
        <div class="head">
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
        <div class="nav">
            <ul>
                <li>默认</li>
                <li @click="hand">价格最低</li>
                <li>销量最高</li>
            </ul>
        </div>
        </div>
        <div class="item">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
            <van-cell v-for="data in itemlist" :key="data.id" @click="handle(data.id)">
              <img :src="data.image">
              <div v-if="data.title">
                <p>{{data.title}}<p>
                <p style="color:red">￥{{data.price}}</p>
                <p>{{data.saleNum}}人已买</p>
              </div>
            </van-cell>
          </van-list>
        </div>
    </div>
</template>
<script>
import { search, List, cell } from 'vant'
import Vue from 'vue'
import http from '@/util/http'
Vue.use(search).use(List).use(cell)
export default {
  data () {
    return {
      value: this.$route.params.myid,
      itemlist: [],
      loading: false,
      finished: false,
      current: 0,
      index: 0,
      itemlistprice: []
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    onLoad () {
      this.current += this.index
      http({
        url: `/api/search?word=${encodeURI(this.$route.params.myid)}&start=${this.current}&sort=0&couponOnly=NaN&minPrice=0&maxPrice=0`
      }).then(res => {
        setTimeout(() => {
          this.itemlist = [...this.itemlist, ...res.data.data.list]
          this.loading = false
          if (res.data.data.isEnd === true) {
            this.finished = true
          }
        }, 0)
      })
    },
    handle (id) {
      this.$router.push(`/c/${id}`)
    },
    hand () {
      this.itemlist.sort((n1, n2) => {
        return n1.price - n2.price
      })
    }
  },
  mounted () {
    http({
      url: `/api/search?word=${encodeURI(this.$route.params.myid)}&start=0&sort=0&couponOnly=NaN&minPrice=0&maxPrice=0`
    }).then(res => {
      console.log(res.data.data)
      this.itemlist = res.data.data.list
      this.index = res.data.data.nextIndex
    })
  }
}
</script>
<style lang="scss" scoped>
    .head{
        width: 100%;
        top: 0;
        left: 0;
        position: fixed;
        z-index: 100;
    }
    .nav{
        width: 100%;
        height: 50px;
        ul{
            display: flex;
            background: #fff;
            li{
                flex: 1;
                line-height: 50px;
                font-size: 14px;
                text-align: center;
            }
        }
    }
    .item{
      background: gainsboro;
      margin-top: 105px;
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
