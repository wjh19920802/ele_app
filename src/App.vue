<template>
  <div>
    <div>
      <app-header :seller="seller"></app-header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评价</a>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import  header from './components/header/header.vue'


export default {
  data(){
    return{
      seller:{}
    }
  },
  components: {
    'app-header': header
  },
  created(){
    this.$http.get('/api110/seller').then(response=>{
      this.seller = response.body.data
      console.log(this.seller)
//      console.log(this)
    })

  }
}
</script >

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl'

  .tab
    display flex
    height:40px
    /*align-items center*/
    position relative
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      display: inline-block
      text-align center
      flex:1
      font-size 14px
      line-height 40px
      color: rgb(77,85,93)
      .v-link-active
        color: rgb(240,20,20)
</style>
