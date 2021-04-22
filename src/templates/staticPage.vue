<template>
  <Layout>
    <!-- <PageHeader :header="$page.page.acf.header[0]" /> -->
    <!-- <h1 class="mb-5">{{ $page.page.title }}</h1> -->
    <div class="page-content" v-html="$page.page.content" />
  </Layout>
</template>

<page-query>
query($path: String) {
  page: wordPressPage(path: $path) {
    title
    content
    acf {
      header {
        heading
        headerIntro
      }
      banners {
        image {
          path
        }
      }
    }
  }
}
</page-query>

<script>
import PageHeader from "@/components/PageHeader";

export default {
  components: { PageHeader },
  metaInfo() {
    return {
      title: this.$page.page.title,
    };
  },
};
</script>
