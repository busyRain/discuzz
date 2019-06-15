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
import {
	Base64
} from 'js-base64';
import Swiper from "@/components/home/swiper";
import newsList from "@/components/home/newsList";
import articleList from "@/components/home/articleList";
import friend from "@/components/home/friend";
import { mapGetters } from 'vuex';
export default {
  name: "home",
  components: {
    Swiper,
    newsList,
    articleList,
    friend
  },
  computed:{
    ...mapGetters({
      userInfo:'userInfo'
    })
  },
  methods:{
    getName(c_name){
      if (document.cookie.length>0){
        let c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1){ 
          c_start=c_start + c_name.length+1 
          let c_end=document.cookie.indexOf(";",c_start)
          if (c_end==-1) c_end=document.cookie.length
          return Base64.decode(document.cookie.substring(c_start,c_end))
        } 
      }
      return ""
    }
  },
  created(){
      // let username = this.getName('username')
      // let token = this.getName('token')||'2310be6e0fcf4047b8c49aa91146e8a7'
      // let auth =this.getName('auth')
      // this.$store.dispatch('init',{username,token})
      // if(username){
        
      // }
      sessionStorage.removeItem('navList')
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
