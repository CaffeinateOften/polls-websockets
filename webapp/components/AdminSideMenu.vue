<template>
  <div>
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['sub1']"
      mode="inline"
      :inlineCollapsed="collapsed"
    >
      <a-menu-item key="1">
        <a-icon type="pie-chart"/>
        <span>Manage</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="desktop"/>
        <span>Analyze</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
