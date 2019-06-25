//行动生成器

//引入行动类型
import { CART_ADD, CART_CHECKED, CART_ALL_CHECK, CART_NUM_DELETE, CART_NUM_UPDATE } from '../actionType';

//新增购物车的行动
export const cart_add = (goodsObj) => {
    return {
        type: CART_ADD,
        //传入整个商品信息对象
        value: goodsObj
    }
}

//单选框的切换
export const cart_check = (id) => {
    return { type: CART_CHECKED, value: { id } };
}


//全选框的切换
export const cart_all_check = (checked) => {
    return {
        type: CART_ALL_CHECK,
        value: { checked }
      }
}

//执行删除购物车
export const cart_num_delete = (id) => {
    return {
      type: CART_NUM_DELETE,
      value: { id }
    }
  }


  //修改购物车数量
  export const cart_num_update = (id, unit) => {
    return {
        type: CART_NUM_UPDATE,
        value: { id, unit }
      }
  }