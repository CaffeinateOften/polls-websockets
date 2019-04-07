<template>
  <div>
    <a-form layout="horizontal">
      <a-form-item>
        <a-input v-model="question" ghost placeholder="What would you like to ask?"/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: ''
    }
  },
  methods: {}
}
</script>
