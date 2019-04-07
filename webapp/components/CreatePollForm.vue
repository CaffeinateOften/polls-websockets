<template>
  <div>
    <a-form layout="horizontal">
      <a-form-item>
        <a-input ghost placeholder="What would you like to ask?"/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: 'horizontal'
    }
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
        : {}
    }
  },
  methods: {}
}
</script>
