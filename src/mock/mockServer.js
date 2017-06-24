/**
 * Created by 王锦辉 on 2017/6/9.
 */

import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/api110/goods',{
  code: 0 ,
  data: data.goods
})
Mock.mock('/api110/seller',{
  code: 0 ,
  data: data.seller
})
Mock.mock('/api110/ratings',{
  code: 0 ,
  data: data.ratings
})


// 不适用export！！！！！！！！！！！！！！！！