<template>
    <div>
        <div class="back" @click="handle"><van-icon name="arrow-left" /></div>
        <detailswiper :key="photolist.length">
            <div class="swiper-slide detailphoto" v-for="data in photolist" :key="data.seq">
                <img :src="data.url">
            </div>
        </detailswiper>
        <div class="content">
            <div>{{detaillist.title}}</div>
            <div>用券后：￥{{detaillist.price}}</div>
            <div>原价：￥{{detaillist.originPrice}}<span>月销量 {{detaillist.saleNum}}</span></div>
        </div>
        <div class="middle">淘宝图文详情</div>
        <div class="showimg">
            <ul>
                <li v-for="data in imglist" :key="data.id" >
                    <img :src="data.image.url" alt="" v-if="data.image">
                </li>
            </ul>
        </div>
        <div class="bottom">
            <span>{{detaillist.couponValue}}</span>
            <span v-sh @click="show">领券购买</span>
        </div>
        <div class="showpage" v-if="showpage">
          <div @click="closeshow">×</div>
          你已复制口令请前往淘宝购买</div>
    </div>
</template>
<script>
import http from '@/util/http'
import detailswiper from '../components/detalswiper'
import { Icon, Toast } from 'vant'
import Vue from 'vue'
Vue.use(Icon).use(Toast)
Vue.directive('sh', {
  update (el) {
    if (el.previousSibling.innerHTML === '') {
      el.innerHTML = '去淘宝买'
    } else {
      el.innerHTML = '领券购买'
    }
  }
})
export default {
  data () {
    return {
      photolist: [],
      detaillist: '',
      imglist: [],
      showpage: false
    }
  },
  components: {
    detailswiper
  },
  mounted () {
    http({
      url: `/api/detail?id=${this.$route.params.myid}&normal=1&sa=`
    }).then(res => {
      this.detaillist = res.data.data.detail
      this.photolist = res.data.data.detail.photo
      this.imglist = res.data.data.detail.descContentList
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    })
    Toast.setDefaultOptions({ duration: 500 })
  },
  methods: {
    handle () {
      this.$router.go(-1)
    },
    show () {
      this.showpage = true
    },
    closeshow () {
      this.showpage = false
    }
  }

}
</script>
<style lang="scss" scoped>
    .showpage{
      position: fixed;
      width: 300px;
      height: 300px;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      background: yellow;
      z-index: 9999;
      font-size: 20px;
      line-height: 300px;
      text-align: center;
      opacity: 0.8;
      div{
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        height: 20px;
        line-height: 20px;
      }
    }
    .detailphoto{
        width: 375px;
        img{
            width: 100%;
            display: block;
        }
    }
    .back{
        width: 50px;
        height: 50px;
        line-height: 54px;
        text-align: center;
        background: rgba(0,0,0,0.3);
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 1000;
        border-radius: 50%;
        color:#fff;
        font-size: 20px;
    }
    .content{
        background: #fff;
        div{
        padding: 10px;
        span{
            float: right;
        }
    }
    }
    .middle{
        background: #fff;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
    }
    .showimg{
        img{
            width: 100%;
            display: block;
        }
    }
    .bottom{
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 50px;
        background: #eee;
        span{
            line-height: 50px;
            text-align: center;
            display: inline-block;
            &:first-child{
                width: 60%;
                color:blue;
            }
            &:nth-child(2){
                background: #f60;
                width: 40%;
                color:#fff;
                font-weight: bold;
            }
        }
    }
</style>
