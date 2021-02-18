<template>
    <div>
        <div class="swiper-container home">
            <div class="swiper-wrapper">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.min.css'
export default {
  mounted () {
    new Swiper('.home', {
      loop: true,
      autoplay: true
    })
  }
}
</script>
