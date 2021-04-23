<template>
  <Layout>
    <div class="page-content" v-html="$page.page.content" />
    <ul class="post-list">
      <li v-for="(node, i) in $page.page.acf.testimonial" :key="i">
        <p>{{ node.date }}</p>
        {{ node.testimonial }}
      </li>
    </ul>
  </Layout>
</template>

<page-query>
query Testimonials {
  page: wordPressPage(path: "/pages/testimonials") {
    title
    content
    acf {
      header {
        heading
        headerIntro
      }
      testimonial {
        date
        testimonial
      }
    }

  }
}
</page-query>

<script>
export default {
  name: "Testimonials",
  metaInfo() {
    return {
      title: this.$page.page.title,
    };
  },
};
</script>
