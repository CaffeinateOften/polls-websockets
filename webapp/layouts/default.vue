<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <a-row type="flex" justify="center">
        <a-col :span="12">
          <navigation-header />
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <div :style="{ paddingTop: '88px' }" />
      <a-row type="flex" justify="center">
        <a-col :span="12">
          <nuxt />
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-footer> Developer: <a target="_blank" href="https://twitter.com/caffeinateoften"><a-icon type="twitter" /> @CaffeinateOften </a></a-layout-footer>
  </a-layout>
</template>
<script>
import NavigationHeader from '~/components/NavigationHeader'

export default {
  components: {
    NavigationHeader
  }
}
</script>

<style>

a, a:link, a:visited, a:hover, a:active {
  text-decoration: none;
}

.ant-layout-header {
  padding-left: 0px;
  padding-right: 0px;
}

.content {
  max-width: 800px;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
