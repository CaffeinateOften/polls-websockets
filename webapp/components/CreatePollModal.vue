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
      <a-alert v-if="showError" message="You must include a question" type="error"/>
      <create-poll-form ref="poll-form"/>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleOk">Submit</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import CreatePollForm from '~/components/CreatePollForm.vue'

export default {
  components: {
    CreatePollForm
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      showError: false
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.confirmLoading = true
      const questionText = this.$refs['poll-form'].question
      if (questionText.length > 0) {
        this.showError = false
        this.$ws.emit(
          'action',
          { name: 'createPoll' },
          { poll: { question: questionText } }
        )
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
        }, 300)
      } else {
        this.showError = true
      }
      this.confirmLoading = false
    },
    handleCancel(e) {
      // console.log('Clicked cancel button')
      this.visible = false
    }
  }
}
</script>
