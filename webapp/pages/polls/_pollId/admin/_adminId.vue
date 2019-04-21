<template>
  <div>
    <a-row>
      <a-col :span="24">
        <div v-if="load">
          <div v-if="valid">
            {{ poll }}
          </div>
          <div v-else>
            Not a valid admin id
          </div>
        </div>
        <div v-else>
          Loading...
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import superagent from 'superagent'

export default {
  data() {
    return {
      valid: false,
      load: false
    }
  },
  computed: {
    ...mapState(['entities']),
    poll() {
      return this.entities.polls[this.$route.params.pollId]
    }
  },
  methods: {},
  async beforeMount() {
    const { pollId, adminId } = this.$route.params
    const response = await superagent.get(`http://localhost:3001/polls/${pollId}/admin/${adminId}`)
    const isValid = response.body.validAdminId
    // eslint-disable-next-line
    console.log(isValid)
    this.valid = isValid
    this.load = true
  }
}
</script>
<style></style>
