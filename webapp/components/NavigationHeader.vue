<template>
  <div>
    <a-row type="flex" justify="space-between">
      <a-col>
        <nuxt-link :to="{ name: 'index' }">
          <a-button ghost icon="home" type="primary" @click="scrollToTop" />
        </nuxt-link>
      </a-col>
      <a-col :span="18">
        <search-bar />
      </a-col>
      <a-col :span="4">
        <create-poll-modal />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import SearchBar from '~/components/SearchBar'
import CreatePollModal from '~/components/CreatePollModal'
export default {
  components: {
    SearchBar,
    CreatePollModal
  },
  data() {
    return {}
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>
