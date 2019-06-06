<template>
  <div >
    <div class="home">
      <div class="topLeft fl">
        <Swiper />
      </div>
      <div class="topRight">
        <news-list></news-list>
      </div>
      <div class="content inner ov">
        <article-list></article-list>
      </div>
      <div class="inner">
        <friend></friend>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "@/components/home/swiper";
import newsList from "@/components/home/newsList";
import articleList from "@/components/home/articleList";
import friend from "@/components/home/friend";
export default {
  name: "home",
  components: {
    Swiper,
    newsList,
    articleList,
    friend
  }
};
</script>
<style lang="scss" scoped>
.home {
  box-sizing: border-box;
  margin-top: 20px;
}
.topLeft {
  width:550px;
  margin-right: 20px;
}
.topRight {
  width: 630px;
  float: left
}
</style>
