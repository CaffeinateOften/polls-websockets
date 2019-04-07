<template>
  <div>
    <a-row>
      <a-col :span="24">
          <h1>{{ getPoll($route.params.id).question }}</h1>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState(['entities'])
  },
  methods: {
    getPoll(id) {
      return this.entities.polls[id]
    }
  }
}
</script>
<style></style>
