<template>
  <div class="contemt">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'contemt',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contemt{
  position: absolute;
  width: 100%;
  top: 171px;
  bottom: 0;
}

</style>