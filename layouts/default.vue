<template>
  <div>
      <v-header></v-header>
    <nuxt />
      <v-footer></v-footer>
  </div>
</template>

<script>
    import VHeader from '~/components/Header/Header'
    import VFooter from '~/components/Footer/Footer'

    export default {
        components:{
            VHeader,
            VFooter
        },
        head: {
            link: [
                {rel: 'stylesheet', href:   'http://images.sooyooj.com/pc_static/css/swiper-4.2.2.min.css'}
            ],
            script: [
                { src: 'http://images.sooyooj.com/pc_static/js/swiper-4.2.2.min.js' },
                { src: 'http://images.sooyooj.com/pc_static/js/qrcode.js' }
            ],
        }
    }

</script>

<style lang="scss">
    @import "../assets/css/reset.css";
    @import "../assets/css/common.scss";
</style>
