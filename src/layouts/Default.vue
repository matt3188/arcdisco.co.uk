<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">Gridsome</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/functions/">functions</g-link>
        <g-link class="nav__link" to="/weddings/">weddings</g-link>
        <g-link class="nav__link" to="/parties/">parties</g-link>
        <g-link class="nav__link" to="/mood-lighting/">mood-lighting</g-link>
        <g-link class="nav__link" to="/services/">services</g-link>
        <g-link class="nav__link" to="/contact/">contact</g-link>
        <g-link class="nav__link" to="/gallery/">gallery</g-link>
        <g-link class="nav__link" to="/testimonials/">testimonials</g-link>
        <g-link class="nav__link" to="/faqs/">faqs</g-link>
      </nav>
    </header>
    <transition name="fade" appear>
      <main>
        <PageHeader
          v-if="$page.page && $page.page.acf"
          :header="$page.page.acf.header[0]"
        />
        <!-- a wrapper for slot is needed -->
        <slot />
        <!-- the content -->
      </main>
    </transition>
  </div>
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
    }
  }
}
</page-query>

<script>
import PageHeader from "@/components/PageHeader";

export default {
  name: "Default",
  components: { PageHeader },
};
</script>
