<template>
    <div>
        <div class="swiper-container hot">
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
    new Swiper('.hot', {
      slidesPerView: 4,
      spaceBetween: 100
    })
  }
}
</script>
