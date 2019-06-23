//行动生成器

//引入行动类型
import { CART_ADD } from '../actionType';

//新增购物车的行动
export const cart_add = (goodsObj) => {
    return {
        type: CART_ADD,
        //传入整个商品信息对象
        value: goodsObj
    }
}