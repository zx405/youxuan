<template>
    <div>
        <div class="swiper-container navswiper">
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
    new Swiper('.navswiper', {
      slidesPerView: 5
    })
  }
}
</script>
<style lang="scss" scoped>
.navswiper{
    background: yellow;
    height: 40px;
    line-height: 40px;
}
</style>
