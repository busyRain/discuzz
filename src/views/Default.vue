<template>
  <div class="default">
    <Header />
    <router-view class="inner ov" />
    <Bottom/>
		<Footer />
  </div>
</template>

<script>
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Bottom from '@/layout/bottom';

export default {
  name: "home",
  components: {
    Header,
    Footer,
    Bottom
  },
};
</script>
