<template>
  <a-list item-layout="horizontal" :data-source="polls">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      >
        <nuxt-link slot="title" :to="`/polls/${item.id}`">{{ item.question }}</nuxt-link>
        <a-avatar slot="avatar" src />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
export default {
  props: {
    polls: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style></style>
