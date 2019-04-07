<template>
  <div>
    <a-affix :off-set-top="this.top">
      <a-button
        type="primary"
        @click="
          () => {
            this.top += 10
          }
        "
      >
        Affix top
      </a-button>
    </a-affix>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top: 10,
      bottom: 10
    }
  }
}
</script>
