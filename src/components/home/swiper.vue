<template>
    <div class="swiper-wrapper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(swiperItem, index) in swiperList" :key="index">
        <a :href="swiperItem.topicurl || 'javascript:;'" target="__blank">
          <img class="swiper-img" :src="$IMG_URL+swiperItem.imgurl" alt="">
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
        
      ]
    };
  },
  methods: {
    async getSwiperList() {
      await api.getSwiperList().then(res=>{
        const {data} =res
        if(res.code ==0){
          this.swiperList=data
        }
      })
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
