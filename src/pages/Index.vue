<template>
  <Layout>
    <div class="page-content" v-html="$page.page.content" />
  </Layout>
</template>

<page-query>
query Home {
  page: wordPressPage(id:4) {
    title
    content
  }
}
</page-query>

<script>
export default {
  name: "Home",
  metaInfo() {
    return {
      title: this.$page.page.title,
    };
  },
};
</script>
