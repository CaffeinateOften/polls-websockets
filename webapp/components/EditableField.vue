<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-row type="flex" justify="start" align="middle">
        <a-col :span="19">
          <a-input :value="value" @change="handleChange" @pressEnter="check"/>
        </a-col>
        <a-col :span="2" />
        <a-col :span="3">
            <a-button type="primary" ghost icon="check" @click="check" />
        </a-col>
      </a-row>
    </div>
    <div v-else class="editable-cell-text-wrapper">
      <a-row type="flex" justify="start" align="middle">
        <a-col :span="21">{{ value || ' ' }}</a-col>
        <a-col :span="3">
          <a-button type="primary" ghost icon="edit" @click="edit" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    fieldName: String,
    text: String
  },
  data() {
    return {
      value: this.text,
      editable: false
    }
  },
  methods: {
    handleChange(e) {
      const value = e.target.value
      this.value = value
    },
    check() {
      this.editable = false
      this.$emit('update', this.fieldName, this.value)
    },
    edit() {
      this.editable = true
    }
  }
}
</script>
