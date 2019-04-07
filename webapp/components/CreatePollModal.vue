<template>
  <div>
    <a-button ghost icon="form" type="primary" @click="showModal">Create Poll</a-button>
    <a-modal
      title="Create New Poll"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <create-poll-form/>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleOk">Submit</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import CreatePollForm from '~/components/CreatePollForm.vue'
// import request from 'request-promise-native'

export default {
  components: {
    CreatePollForm
  },
  data() {
    return {
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.confirmLoading = true

      this.$ws.emit('action', { name: 'loadInitialState' })

      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 5000)
    },
    handleCancel(e) {
      // console.log('Clicked cancel button')
      this.visible = false
    }
  }
}
</script>
