<template>
  <div>
    <a-row>
      <a-col :span="24">
        <poll-list :polls="getPolls"/>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PollList from '~/components/PollList'

export default {
  components: {
    PollList
  },
  computed: {
    ...mapState(['entities']),
    getPolls() {
      return this.entities.polls.ids.map((pollId) => {
        return this.entities.polls[pollId]
      })
    }
  }
}
</script>
<style></style>
