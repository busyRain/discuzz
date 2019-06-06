<template>
    <div class="swiper-wrapper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(swiperItem, index) in swiperList" :key="index">
        <a  :href="swiperItem.toUrl || 'javascript:;'" target="__blank">
          <img class="swiper-img" :src="swiperItem.imgUrl" alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import * as api from '@/api/home'
export default {
  name: "swiperWrapper",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            bulletClass: 'bullet',
            bulletActiveClass: 'bullet-active'
          },
          autoplay: true,
          delay: 1500
        },
      swiperImg: '/img/home/banner/banner1.png',
      swiperList: [
        {
          'id': "12",
          'imgUrl' : "http://img.javaex.cn/FgxRNuOn15Dj6eci1i-N1jGWCDwH",
          'toUrl':'http://baidu.com'
        },
        {
          'id': "13",
          'imgUrl' : "http://img.javaex.cn/FsUD0pljbp5XkgO7W2oMoYaR34Dc",
          'toUrl':'http://baidu.com'
        },{
          'id':'14',
          'imgUrl':'http://ossweb-img.qq.com/upload/adw/image/20180922/dc23d82a4f1560ca505bc31ee48478b2.jpg',
          'toUrl':'http://baidu.com'
        }
      ]
    };
  },
  methods: {
    async getSwiperList() {
      // await api.getSwiperList().then(res=>{

      // })
    }
  },
  mounted() {
    this.getSwiperList();
  }
};
</script>
<style lang="scss" scoped>
.swiper-wrapper {
  /* height: 400px; */
  border-radius: 5px;
  overflow: hidden;
}
.swiper-img {
  width: 550px;
  height: 320px;
  border-radius: 5px;
  display: block;
}
img {
  background-color: #fff;
}
</style>
