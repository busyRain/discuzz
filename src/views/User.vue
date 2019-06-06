<template>
  <div class="login">
    <Header />
    <router-view class="inner ov" />
  </div>
</template>

<script>
import Header from "@/layout/header";
export default {
  name: "login",
  components: {
    Header,
  },
};
</script>