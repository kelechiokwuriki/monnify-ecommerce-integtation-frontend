<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <Products />
        </div>
        <div class="col-sm-4">
          <Cart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Products from './components/Products.vue'
import Cart from './components/Cart.vue'

export default {
  name: 'App',
  components: {
    Products,
    Cart
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
