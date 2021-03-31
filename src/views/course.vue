<template>
    <div class="all">
        <div class="heade"><span @click="back"><van-icon name="arrow-left" /></span>{{list.name}}</div>
        <navswiper :key="datalist.length">
            <router-link v-for="data in datalist" :key="data.id" :to="'/col/'+dataid+'/sub/'+data.id" custom  v-slot="{ navigate,isActive }">
                <div class="swiper-slide" @click="navigate" :class="isActive?'active':''">
                    {{data.name}}
                </div>
            </router-link>
        </navswiper>
    </div>
</template>
<script>
import http from '@/util/http'
import Vue from 'vue'
import { Icon } from 'vant'
import navswiper from './nav/navswiper'
Vue.use(Icon)
export default {
  components: { navswiper },
  data () {
    return {
      list: '',
      datalist: [],
      dataid: ''
    }
  },
  mounted () {
    http({
      url: `/api/column/${this.$route.params.myid}`
    }).then(res => {
      this.list = res.data.data
      this.datalist = this.list.subColumns
      this.dataid = this.$route.params.myid
      console.log(this.datalist)
    })
  },
  methods: {
    back () {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" scoped>
 .heade{
     width: 100%;
     height: 40px;
     background: yellow;
     line-height: 40px;
     text-align: center;
 }
 .all{
    z-index: 999;
     width: 100%;
     position: fixed;
     top: 0;
     span{
         width: 20px;
         height: 20px;
         position: absolute;
         left: 20px;
         top: 10px;
         line-height: 20px;
         text-align: center;
     }
 }
 .swiper-slide{
  text-align: center;
}
</style>
