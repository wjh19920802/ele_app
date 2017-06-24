<template>
  <div class="goods" >
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li class="menu-item " v-for="good in goods" :class="{current:currentIndex === $index}" @click="clickMenu($index,$event)">
          <span class="text">
            <span class="icon" v-show="good.type" :class="classMap[good.type]"></span>{{good.name}}
          </span>
        </li>

        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:food-wrapper>
      <ul>
        <li class="food-list food-list-hook" v-for="good in goods">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="food in good.foods" @click="showFood(food)">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">{{food.price | currency '￥'}}</span>
                  <span class="old" v-show="oldPrice">￥</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol  :food="food" :update-food-count="updateFoodCount"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart
      :food-list="foodList"
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      :update-food-count="updateFoodCount"
      @clear="clearCart"
    ></shopcart>
  </div>

  <food :food="selectedFood" :update-food-count="updateFoodCount" v-ref:food></food>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import shopcart from '../shopcart/shopcart.vue'
  import food from '../food/food.vue'

  export default {
    props:['seller'],
    data () {
      return {
        classMap:['decrease_3','discount_3','guarantee_3','invoice_3','special_3'],
        goods:[],
        scrollY:0,
        tops:[],
        selectedFood:{}

      }
    },
    created(){
//       this.classMap = ['decrease_3','discount_3','guarantee_3','invoice_3','special_3']
      this.$http.get('/api110/goods').then((response)=>{
        const result = response.body
        if(result.code === 0){
          console.log(result.data)
          this.goods = result.data

          //再dom更新完后执行
          this.$nextTick(()=>{
            this.initTops()
//            console.log(this.tops)
            this.initScroll()
          })

        }
      })
    },

    methods:{
      initScroll(){
          //创建滚动条对象
       var menuScroll = new BScroll(this.$els.menuWrapper,{
          click: true,
         probeType : 3
        })
        this.foodScroll = new BScroll(this.$els.foodWrapper,{
          probeType: 3,
          click: true
        })
        this.foodScroll.on('scroll', (pos) => {
//          console.log( pos.y)
          this.scrollY = -pos.y
      /*    if(this.sceollY>=0){
            menuScroll.disable()
            this.foodScroll.disable()
            this.goodsScroll.enable()
          }*/
        })

      },
      // 将每一个分类的高度添加进数组
      initTops(){
        var lis = document.getElementsByClassName('food-list-hook')
          var top= 0
              this.tops.push(0)
          ;[].slice.call(lis).forEach((key)=>{
          top += key.clientHeight
          this.tops.push(top)
        })

      },

      clickMenu(index,event){
        if(!event._constructed){
          return         // 取消pc端默认点击事件（better-scroll 处理了移动端 没有处理pc端）
        }
//        console.log(index,event)
        var lis = this.$els.foodWrapper.getElementsByClassName('food-list-hook')
        var li = lis[index]
        this.foodScroll.scrollToElement(li,300)
      },

      updateFoodCount(food,isAdd,event){
            if(!event._constructed){
              return
            }
            if(isAdd){
                  if(!food.count){ // 第一次添加， 之前没有count属性
                    Vue.set(food,'count',1)  // set可以触发视图实时更新
                  }else{
                    food.count++
                  }
            }else{
              if(food.count){
                food.count--
              }
            }
      },
      clearCart(foodList){
        foodList.forEach(food=>{
          food.count=0
        })
      },
      showFood(food){
        //指定选中的food
        this.selectedFood = food
        //显示food组件： 找到组件对象调用它的方法
        this.$refs.food.showOrHide(true)

      }
    },

    computed:{
        //计算currentIndex
      currentIndex(){
        return this.tops.findIndex((top,index)=>{
          return this.scrollY >= top && this.scrollY < this.tops[index+1]
        })
      },

      foodList(){ // 找出所有count>0的food
        const foods = []
        this.goods.forEach(good=>{
          good.foods.forEach(food=>{
            if(food.count){
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    components:{
      cartcontrol,
      shopcart,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'


  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      /*flex-basis 80px*/
      width:80px
      .menu-item
        box-sizing border-box
        width: 80px
        height: 54px
        background-color #f3f5f7
        padding:0 12px
        display table
        .text
          font-weight 200
          font-size 12px
          line-height 14px
          color rgb(0,0,0)
          display table-cell
          vertical-align middle
          .discount_3
            display inline-block
            width: 12px
            height 12px
            margin-right 4px
            bg-image('discount_3')
            background-size 12px 12px
            background-repeat no-repeat
          .guarantee_3
            display inline-block
            width: 12px
            height 12px
            margin-right 4px
            bg-image('guarantee_3')
            background-size 12px 12px
            background-repeat no-repeat
      .current
        background-color #fff
        .text
          font-weight 700!important
    .foods-wrapper
      flex-grow: 1
      .title
        font-size 12px
        color: rgb(147,153,159)
        line-height 26px
        background-color #f3f5f7
        padding-left 14px
        border-left 2px solid #d9dde1
      .food-item
        position: relative
        margin:18px
        margin-bottom: 0
        display flex
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        .icon
          margin-right 10px
          &>img
            width: 57px
            height:57px
        .content
          flex-grow 1
          position: relative
          .name
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
            margin 2px 0 8px 0
          .desc
            font-size 10px
            line-height 12px
            color rgb(147,153,159)
          .extra
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
            margin-top 8px
            .count
              margin-right 12px
          .price
            .now
              font-size 14px
              line-height 24px
              color rgb(240,20,20)
            .old
              font-size 10px
              line-height 24px
              color rgb(147,153,159)
          .cartcontrol-wrapper
            position: absolute
            right 0
            bottom -10px

</style>
