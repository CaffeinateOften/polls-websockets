<template>
  <div>
    <a-row>
      <a-card>
        <a-col :span="24">
          <div v-if="load">
            <div v-if="valid">
              <a-row>
                <a-col :span="12">
                  <a-row>
                    <a-col :span="12">
                      <h1>Hello, Admin</h1>
                    </a-col>
                    <a-col :span="12"></a-col>
                  </a-row>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <editable-field
                    fieldName="question"
                    :text="poll.question"
                    @update="dispatchPollUpdate"
                  />
                </a-col>
              </a-row>
            </div>
            <div v-else>Not a valid admin id</div>
          </div>
          <div v-else>Loading...</div>
        </a-col>
      </a-card>
    </a-row>
    <div :style="{paddingTop: '20px'}"/>
    <a-card>
      <a-row>
        <nuxt-link :to="`/polls/${$route.params.pollId}`" target="_blank">
          <a-button type="primary" ghost>open link to poll...</a-button>
        </nuxt-link>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import superagent from 'superagent'
import EditableField from '~/components/EditableField'

export default {
  components: {
    EditableField
  },
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
  methods: {
    dispatchPollUpdate(fieldName, value) {
      const payload = {}
      const name = 'updatePoll'

      const id = this.$route.params.pollId
      const adminId = this.$route.params.adminId

      payload.id = id
      payload.adminId = adminId
      payload[fieldName] = value

      this.$ws.emit('action', {
        name: name,
        payload: payload
      })
    }
  },
  async beforeMount() {
    const { pollId, adminId } = this.$route.params
    const response = await superagent.get(
      `http://localhost:3001/polls/${pollId}/admin/${adminId}`
    )
    const isValid = response.body.validAdminId
    // eslint-disable-next-line
    console.log(isValid)
    this.valid = isValid
    this.load = true
  }
}
</script>
<style></style>
