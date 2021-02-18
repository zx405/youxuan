<template>
    <div>
        <div class="swiper-container detailswiper" >
            <div class="swiper-wrapper">
                <slot></slot>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.min.css'
export default {
  mounted () {
    new Swiper('.detailswiper', {
      pagination: {
        el: '.swiper-pagination'
      },
      loop: true
    })
  }
}
</script>
