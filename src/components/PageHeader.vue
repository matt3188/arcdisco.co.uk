<template>
  <div>
    <h1>{{ header.heading }}</h1>
    <div v-html="header.headerIntro" />
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    header: Object,
  },
  // metaInfo() {
  //   return {
  //     title: this.$page.page.title,
  //   };
  // },
};
</script>
