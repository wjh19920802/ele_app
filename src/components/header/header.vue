<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" alt="粥品香坊">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟到达</div>
          <div class="support" v-if="seller.supports">
            <span class="icon " :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="supports_count" @click="showDetail">
          <span class="count">5个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">
          {{seller.bulletin}}
        </span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
      <div class="background">
        <img src="avatar.jpg" >
      </div>
      <div class="detail fade-transition " v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <div class="name">粥品香坊（回龙观）</div>
            <div class="star-wrapper">
              <!--<div class="star star-48">
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item half"></span>
                <span class="star-item off"></span>
              </div>-->
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line line1"></div>
              <div class="text">优惠信息</div>
              <div class="line line2" ></div>
            </div>
            <ul class="supports">
              <li class="support" v-for="support in seller.supports" >
                <span class="icon " :class="classMap[support.type]" ></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line line1"></div>
              <div class="text">商家公告</div>
              <div class="line line2"></div>
            </div>
            <div class="content">
              <p>粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <span class="icon-close" @click="showDetail"></span>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  export default {
    props:['seller'],
    data () {
      return {
        detailShow:false,
        classMap:['decrease','discount','guarantee','invoice','special']
      }
    },
    methods:{
      showDetail(){
        this.detailShow = !this.detailShow
      }
    },
    components:{
      star
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"


  .header
    position relative
    background-color: rgba(7, 17, 27, 0.5)
    color: rgb(255,255,255)
    .content-wrapper
      position relative
      padding:24px 12px 18px 24px
      font-size 0
      .avatar
        width: 64px
        height: 64px
        display inline-block
        vertical-align top
        &>img
          width:100%
          height:100%
          border-radius 4px
      .content
        display inline-block
        margin-left 16px
        .title
          margin-top 2px
          margin-bottom 8px
          .brand
            margin-right 6px
            display inline-block
            width 30px
            height 18px
            background-size 30px 18px
            background-repeat no-repeat
            bg-image(brand)
            vertical-align top
          .name
            font-size 16px
            font-weight bold
            line-height 18px
        .description
          font-size 12px
          line-height 12px
          font-weight 200
        .support
          font-size 10px
          line-height 12px
          font-weight 200
          margin-top 10px
          margin-bottom 2px
          .icon
            display inline-block
            width 12px
            height: 12px
            bg-image(decrease_1)
            background-size 12px 12px
            background-repeat no-repeat
            vertical-align middle
      .supports_count
        height: 24px
        padding:7px 8px
        box-sizing border-box
        border-radius 20px
        background-color rgba(0,0,0,0.2)
        position: absolute
        right: 12px
        bottom:15px
        .count
          font-size 10px
          color: rgb(250, 250, 250)
          font-weight 200
          line-height:12px
          margin-right 2px
          vertical-align top
        .icon-keyboard_arrow_right
          font-size 10px
          line-height 12px
          color: rgb(255,255,255)
    .bulletin-wrapper
      position relative
      height: 28px
      padding:0 20px 0 12px
      background-color: rgba(7,17,27,0.2)
      overflow hidden
      text-overflow ellipsis
      white-space:nowrap
      vertical-align middle
      .bulletin-title
        display inline-block
        width: 22px
        height:12px
        bg-image(bulletin)
        background-size 22px 12px
        background-repeat no-repeat
        vertical-align middle
      .bulletin-text
        font-size: 10px
        color: rgb(255, 255, 255)
        /*font-weight:200*/
        line-height 28px
      .icon-keyboard_arrow_right
        position absolute
        right: 6px
        bottom 0
        font-size 17px
        line-height 28px
        margin-left 8px


    .background
      position: absolute
      top: 0
      left: 0
      z-index -99
      width:100%
      height:100%
      overflow hidden
      &>img
        width:100%
        height:100%
        filter blur(10px)

    .detail
      width: 100%
      height: 100%
      position: fixed
      left:0
      top:0
      z-index 99
      background-color rgba(7, 17, 27, 0.8)
      /*display none*/
      /*filter blur(10px)*/
      .detail-wrapper
        min-height 100%
        .detail-main
          padding 64px 36px
          .name
            font-size 16px
            font-weight:700
            color: rgb(255,255,255)
            line-height 16px
            text-align center
          .star-wrapper
            margin-top 16px
            height:24px
            /*background-color yellowgreen*/
            text-align center
          .title
            position relative
            padding:28px 36px 24px 36px
            text-align center
            .line
              position: absolute
              width 112px
              height: 2px
              background-color: rgba(255,192,203,0.3)
            .line1
              left: 0
              top 50%
            .line2
              right: 0
              top:50%
          .supports
            .support
              padding-bottom 12px
              .icon
                display inline-block
                width: 16px
                height: 16px
                background-repeat no-repeat
                background-size 16px 16px
                vertical-align middle
                margin-right 6px
              .decrease
                bg-image(decrease_2)
              .discount
                bg-image(discount_2)
              .guarantee
                bg-image(guarantee_2)
              .invoice
                bg-image(invoice_2)
              .special
                bg-image(special_2)
              .text
                font-size 12px
                font-weight 200
                color rgb(255,255,255)
                line-height 12px
          .content
            &>p
              font-size 12px
              font-weight 200
              color: rgb(255, 255, 255)
              line-height 24px
      .detail-close
        height: 32px
        font-size 32px
        color rgba(255,255,255,0.5)
        text-align center
        margin-top:-64px

</style>
