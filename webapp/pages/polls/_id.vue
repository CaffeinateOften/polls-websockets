<template>
  <div>
    <a-row>
      <a-col :span="24">
        <h1 v-if="poll">{{ poll.question }}</h1>
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
  methods: {}
}
</script>
<style></style>
