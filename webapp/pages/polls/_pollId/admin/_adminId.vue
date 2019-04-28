<template>
  <div>
    <a-row>
      <a-col :span="24">
        <div v-if="load">
          <div v-if="valid">
            <a-row :gutter="16">
              <a-col :span="24">
                <a-row :gutter="4">
                  <a-col :span="6">
                    <a-row>
                      <a-col :span="24">
                        <a-card>
                          <nuxt-link :to="`/polls/${$route.params.pollId}`" target="_blank">
                            <a-button type="primary" ghost>open link to poll...</a-button>
                          </nuxt-link>
                        </a-card>
                      </a-col>
                    </a-row>
                    <div style="padding-top: 4px" />
                    <a-row>
                      <a-col :span="24">
                        <admin-side-menu/>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="12">
                    <a-card>
                      <h1>Hello, Admin</h1>
                      <editable-field
                        fieldName="question"
                        :text="poll.question"
                        @update="dispatchPollUpdate"
                      />
                    </a-card>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </div>
          <div v-else>Not a valid admin id</div>
        </div>
        <div v-else>Loading...</div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import superagent from 'superagent'
import EditableField from '~/components/EditableField'
import AdminSideMenu from '~/components/AdminSideMenu'

export default {
  layout: 'wider-content',
  components: {
    EditableField,
    AdminSideMenu
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
