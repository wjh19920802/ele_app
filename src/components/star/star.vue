<template>
<!--  <div class="star star-48">
    <span class="star-item on48"></span>
    <span class="star-item on48"></span>
    <span class="star-item on48"></span>
    <span class="star-item half48"></span>
    <span class="star-item off48"></span>
  </div>-->
    <span v-for="star in stars"  :class="star" track-by="$index"></span>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      score: Number,
      size: Number
    },
    data () {
      return {}
    },
    computed:{
        stars(){
            var starsArr = []
            for(var i= 0;i<Math.floor(this.score);i++){
              starsArr.push("star-"+this.size+" star-"+this.size+"on")
            }
            if(this.score-Math.floor(this.score)>=0.5){
              starsArr.push("star-"+this.size+" star-"+this.size+"half")
            }
            while(starsArr.length<5){
              starsArr.push("star-"+this.size+" star-"+this.size+"off")
            }

          return starsArr
        }

    },
    created(){
      console.log(this)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .star-48
    width: 20px
    height: 19px
    display inline-block
    margin:0 8px
  .star-48on
    bg-star(star48_on)
    background-size 20px 19px
  .star-48half
    bg-star(star48_half)
    background-size 20px 19px
  .star-48off
    bg-star(star48_off)
    background-size 20px 19px

  .star-36
    width: 15px
    height: 15px
    display inline-block
    margin:0 5px
  .star-36on
      bg-star(star36_on)
      background-size 15px 15px
  .star-36half
      bg-star(star36_half)
      background-size 15px 15px
  .star-36off
      bg-star(star36_off)
      background-size 15px 15px

  .star-24
    width: 10px
    height: 10px
    display inline-block
    margin:0 4px
  .star-24on
      bg-star(star24_on)
      background-size 10px 10px
  .star-24half
      bg-star(star24_half)
      background-size 10px 10px
  .star-24off
      bg-star(star24_off)
      background-size 10px 10px
</style>
