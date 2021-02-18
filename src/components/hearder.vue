<template>
  <div>
    <searchbar></searchbar>
    <div class="navall">
      <navswiper :key="datalist.length">
        <router-link v-for="data in datalist" :key="data.id" :to="'/tab/'+data.id" custom  v-slot="{ navigate,isActive }" >
          <div class="swiper-slide nav" @click="navigate" :class="isActive?'active':''">{{data.name}}</div>
        </router-link>
      </navswiper>
      <span class="navspan"></span>
    </div>
  </div>
</template>
<script>
import searchbar from './searchbar'
import http from '@/util/http'
import navswiper from '../views/nav/navswiper'
export default {
  data () {
    return {
      datalist: []
    }
  },
  components: {
    searchbar,
    navswiper
  },

  mounted () {
    http({
      url: '/api/tabs?sa='
    }).then(res => {
      this.datalist = res.data.data.list
    })
  }
}
</script>
<style lang="scss">
  .navall{
    width: 100%;
    background: yellow;
    position: relative;
    .nav{
      text-align: center;
    }
    .navspan{
      background: url('../../public/下载.png') no-repeat center;
      width: 25px;height: 25px;
      display:block;
      position: absolute;
      right: 5px;
      top: 7.5px;
    }
  }
  .active{
    color:red
  }
</style>
