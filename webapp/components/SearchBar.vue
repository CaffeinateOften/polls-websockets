<template>
  <div>
    <a-input-search
      placeholder="input search text"
      enter-button
      @search="onSearch"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onSearch(value) {}
  }
}
</script>
