<template>
  <div>
    <a-row>
      <a-col :span="24">
        <poll-list />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import PollList from '~/components/PollList'

export default {
  components: {
    PollList
  }
}
</script>
<style></style>
