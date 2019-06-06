<template>
  <div class="default">
    <Header />
    <router-view class="inner ov" />
    <Footer />
  </div>
</template>

<script>
import Header from "@/layout/header";
import Footer from "@/layout/footer";
export default {
  name: "home",
  components: {
    Header,
    Footer
  },
};
</script>
