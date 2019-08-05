<template>
  <div class="counter-warp">
    <!-- <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p> -->
  </div>
</template>

<script>
// Use Vuex
import store from './store'

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
    created(){


    },
    mounted(){
        // var pages = getCurrentPages() //获取加载的页面
        // console.log(pages);
        // var currentPage = pages[pages.length-1] //获取当前页面的对象
        // console.log(currentPage);
        // var urls = currentPage.route //当前页面url
        // console.log(urls);

    },
    methods: {
        increment () {
            store.commit('increment')
        },
        decrement () {
            store.commit('decrement')
        }
    },
    onShow(){
        let url='/pages/expert/main'
        wx.navigateTo({url})
    }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
