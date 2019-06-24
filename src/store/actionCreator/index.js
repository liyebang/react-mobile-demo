//行动生成器

//引入行动类型
import { CART_ADD, CART_CHECKED, CART_ALL_CHECK } from '../actionType';

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