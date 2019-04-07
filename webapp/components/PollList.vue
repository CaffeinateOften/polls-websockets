<template>
  <a-list item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      >
        <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]
new Array(40)
  .join('*')
  .split('')
  .map((elem, i) => {
    data.push({ title: 'Ant Design Title ' + (i + 5) })
  })
export default {
  data() {
    return {
      data
    }
  }
}
</script>
<style></style>
