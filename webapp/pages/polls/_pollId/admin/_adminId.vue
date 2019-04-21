<template>
  <div>
    <a-row>
      <a-col :span="24">
        {{ $route.params }}
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      pollId: this.$route.params.id
    }
  },
  computed: {
    ...mapState(['entities']),
    poll() {
      return this.entities.polls[this.pollId]
    }
  },
  methods: {},
  beforeMount() {
    // eslint-disable-next-line
    console.log(this.$route.params)
  }
}
</script>
<style></style>
