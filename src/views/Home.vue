<template>
    <div>
      <hearder></hearder>
        <homeswiper :key="bannerlist.length">
            <div class="swiper-slide" v-for="item in bannerlist" :key="item.id"><img :src="item.imageUrl"></div>
        </homeswiper>
        <div class="grids">
          <div class="gridschild" v-for="data in gridslist" :key="data.id">
            <div>
              <p>{{data.title}}</p>
              <p>{{data.text}}</p>
            </div>
            <img :src="data.imageUrl" alt="">
          </div>
        </div>
        <div class="top">
          <div class="top-img"></div>
          <div class="top-swiper">
            <hotswiper title="top" :key="toplist.length">
              <div class="swiper-slide topswi" v-for="data in toplist" :key="data.id" >
                <div>
                  <img :src="data.image">
                </div>
                <div>
                  <p>{{data.title}}</p>
                </div>
                <div>
                  <p>￥{{data.price}}</p>
                </div>
              </div>
            </hotswiper>
          </div>
        </div>
        <div class="middle">{{note}}</div>
        <div class="item">
          <ul>
            <li v-for="data in itemlist" :key="data.id" @click="handle(data.id)">
              <img :src="data.image" v-showitem>
              <div v-if="data.title">
                <p>{{data.title}}<p>
                <p>￥{{data.price}}</p>
                <p>{{data.saleNum}}人已买</p>
              </div>
            </li>
          </ul>
        </div>
        <download></download>
    </div>
</template>
<script>
import http from '@/util/http'
import homeswiper from './home/homeswiper'
import Vue from 'vue'
import hearder from '../components/hearder.vue'
import hotswiper from './home/hotswiper'
import download from '../components/downloadbar'
Vue.directive('showitem', {
  inserted (el) {
    if (!el.nextElementSibling) {
      el.style.height = 100 + '%'
    }
  }
})
export default {
  data () {
    return {
      bannerlist: [],
      gridslist: [],
      toplist: [],
      note: '',
      itemlist: []
    }
  },
  components: {
    homeswiper,
    hearder,
    hotswiper,
    download
  },
  mounted () {
    http({
      url: '/api/tab/1?start=0'
    }).then(res => {
      this.bannerlist = res.data.data.banners
      this.gridslist = res.data.data.gridsV2
      this.toplist = res.data.data.topList
      this.note = res.data.data.note
      this.itemlist = res.data.data.items.list
    })
  },
  methods: {
    handle (id) {
      this.$router.push(`c/${id}`)
      console.log(id)
    }
  }
}
</script>
<style lang="scss" scoped>
    .swiper-slide img{
       height: 180px;
       display: block;
    }
    .grids{
        height: 141px;
        background: #FFF;
        padding: 10px;
        position: relative;
        p{
          font-size: 14px;
          margin-top: 5px;
        }
        .gridschild{
          border-radius: 5px;
          &:first-child{
            width: 163px;
            position: absolute;
            div{
              position: absolute;
            }
            width: 163px;
            img{
              width: 163px;
              height: 141px;
            }
          }
          &:nth-of-type(2){
            right: 10px;
            position: absolute;
            div{
              position: absolute;
            }
            width:180px;
            height: 61px;
            background:  #fff3f1;
            img{
              width: 100px;
              height: 61px;
              position: absolute;
              right: 0;
            }
          }
          &:nth-of-type(3){
            right: 10px;
            top: 90px;
            position: absolute;
            div{
              position: absolute;
            }
            width:180px;
            height: 61px;
            background-color: #eef9fc;
            img{
              width: 100px;
              height: 61px;
              position: absolute;
              right: 0;
            }
          }
        }
    }
    .top{
      width: 100%;
      height: 120px;
      padding: 10px 0px;
      background-color: #fff;
      border-top: 1px solid gray;
      .top-img{
        width: 50px;
        height: 120px;
        background: url('../../public/top.png') no-repeat center;
        background-size: 70%;
        background-color: yellow;
        float: left;
      }
      .top-swiper{
        float: right;
        height: 120px;
        width: 315px;
      }
      .topswi{
        display: flex;
        flex-direction: column;
        font-size: 12px;
        img{
          width: 90px;
          height: 90px;
          }
        p{
          text-align: center;
          &:nth-of-type(1){
          width: 90px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
    }
    .middle{
      width: 300px;
      margin: 0 auto;
      height: 30px;
      font-size: 12px;
      text-align: center;
      line-height: 30px;
    }
    .item{
      background: gainsboro;
      ul{
        li{
          width: 49%;
          height: 300px;
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
    }
</style>
