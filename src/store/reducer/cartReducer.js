//引入行动类型
import { CART_ADD, CART_CHECKED, CART_ALL_CHECK, CART_NUM_DELETE, CART_NUM_UPDATE } from "../actionType";

//购物车数据仓库
const defaultState = {
  cartList: [
    // {
    //   // 商品的id
    //   id: "1",
    //   // 单价
    //   price: "2999",
    //   // 数量
    //   num: 3,
    //   // 名称
    //   goods_name: "飞利浦（PHILIPS）55PUF6092/T3 55英寸",
    //   // 图片的路径
    //   img_url: "http://react.zbztb.cn/imgs/FTuX2MTGiwOZjK-rjeZi4tls.jpg",
    //   isChecked: false
    // },
    // {
    //   // 商品的id
    //   id: "2",
    //   // 单价
    //   price: "2999",
    //   // 数量
    //   num: 3,
    //   // 名称
    //   goods_name: "飞利浦（PHILIPS）55PUF6092/T3 55英寸",
    //   // 图片的路径
    //   img_url: "http://react.zbztb.cn/imgs/FTuX2MTGiwOZjK-rjeZi4tls.jpg",
    //   isChecked: true
    // }
  ]
};

export default (state = defaultState, action) => {
  // 接收 派发后的action
  // 判断action的类型
  switch (action.type) {
    case CART_ADD: {
      let newState = JSON.parse(JSON.stringify(state));
      /* 
                1 获取到 商品信息对象
                2 判断购物车当中是否已经存在了
                    已经在  只要拿旧的购物车中的商品信息对象 执行 num++即可
                    还没有添加过  执行 编写一个合法 购物车数组规范的对象
                    购物车数组.push()
                */

      // 1 获取商品信息对象
      let goodsObj = action.value;
      // 2 如何判断   拿 商品信息对象和 旧的购物车数组-循环判断 根据 id是否相对 来判断即可
      // index ===-1 =>不存在
      let index = newState.cartList.findIndex(v => v.id === goodsObj.id);
      if (index === -1) {
        // 不存在
        let newGoods = {
          id: goodsObj.id,
          price: goodsObj.sell_price,
          num: 1,
          goods_name: goodsObj.title,
          img_url: goodsObj.img_url,
          isChecked: true
        };
        newState.cartList.push(newGoods);
      } else {
        // 获取旧的数据 执行 数量++
        newState.cartList[index].num++;
      }
      return newState;
    }

    case CART_CHECKED: {
      /* 
      1 获取要操作的商品的id
      2 找到 store中的购物车数组中的商品对象
      3 把商品对象的选中状态 取反
      4 返回全新的state
       */

      let newState = JSON.parse(JSON.stringify(state));
      let index = newState.cartList.findIndex(v => v.id === action.value.id);
      newState.cartList[index].isChecked = !newState.cartList[index].isChecked;
      return newState;
    }


    case CART_ALL_CHECK:{
        let newState = JSON.parse(JSON.stringify(state));
        newState.cartList.forEach(v => v.isChecked = action.value.checked);
        return newState;
    }


    case CART_NUM_DELETE:{
        /* 
        1 复制一个新的state
        2 获取要操作的购物车对象
        3 执行删除操作
        4 返回一个新的state
         */
        let newState = JSON.parse(JSON.stringify(state));
        let index = newState.cartList.findIndex(v => v.id === action.value.id);
        // 数组的删除
        // newState.cartList.splice("要删除的索引","删除几个");
        newState.cartList.splice(index, 1);
        return newState;

    }


    
    case CART_NUM_UPDATE:{
        /* 
        1 获取被修改的商品的对象
        2 直接修改数量
        3 返回newState
         */
        let newState = JSON.parse(JSON.stringify(state));
        let index = newState.cartList.findIndex(v => v.id === action.value.id);
        newState.cartList[index].num += action.value.unit;
        return newState;
    }


    default:
      break;
  }

  return state;
};
