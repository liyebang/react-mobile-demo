import React, { Component, Fragment } from "react";

//引入组件
import { NavBar, Icon, List, Checkbox, SwipeAction, Modal } from "antd-mobile";

//withRouter可以绑定props，暴露组件的时候使用
import { withRouter } from "react-router-dom";

//引入链接器
import { connect } from "react-redux";
//引入行动生成器
import { cart_check, cart_all_check, cart_num_delete, cart_num_update } from '../store/actionCreator';

const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;

class Cart extends Component {
  //   componentDidMount() {
  //     console.log(this.props.cartList);
  //   }
  render() {
    return (
      <Fragment>
        {/* 导航栏开始 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          // 点击图标 跳转会上一个页面
          onLeftClick={() => this.props.history.go(-1)}
        >
          购物车
        </NavBar>
        {/* 导航栏结束 */}

        {/* 购物车列表展示开始 */}
        <div className="cart_list">
          <List>
            {this.props.cartList.map(v => {
              return (
                <SwipeAction
                  key={v.id}
                  style={{ backgroundColor: "gray" }}
                  autoClose
                  right={[
                    {
                      text: "取消",
                      onPress: () => {},
                      style: { backgroundColor: "#ddd", color: "white" }
                    },
                    {
                      text: "删除",
                      onPress: () => {this.props.handleDisDelete(v.id);},
                      style: { backgroundColor: "#F4333C", color: "white" }
                    }
                  ]}
                >
                  <div className="cart_list_item">
                    <div className="cart_list_select">
                      <CheckboxItem 
                      checked={v.isChecked} 
                      onChange={() => {this.props.handleCartcheck(v.id)}} />
                    </div>
                    <div className="cart_list_img">
                      <img alt="" src={v.img_url} />
                    </div>
                    <div className="cart_list_info">
                      <div className="cart_goods_name">{v.goods_name}</div>
                      <div className="cart_goods_price">￥{v.price}</div>
                    </div>
                    <div className="cart_list_num">
                      <span 
                      className="num_reduce iconfont icon-minus" 
                      onClick={() => this.props.handleCartNumUpdate(v.id, -1, v.num)}/>
                      <span className="num_info">{v.num}</span>
                      <span 
                      className="num_add iconfont icon-plus" 
                      onClick={()=>{this.props.handleCartNumUpdate(v.id, 1)}}/>
                    </div>
                  </div>
                </SwipeAction>
              );
            })}
          </List>
        </div>

        <style jsx>{`
          .cart_list {
            .cart_list_item {
              display: flex;
              padding: 5px;
              border-bottom: 1px solid #666;
              &:last-child {
                border: none;
              }
              .cart_list_select {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .cart_list_img {
                flex: 3;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .cart_list_info {
                flex: 3;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                overflow: hidden;
                .cart_goods_name {
                  display: -webkit-box;
                  overflow: hidden;
                  white-space: normal !important;
                  text-overflow: ellipsis;
                  word-wrap: break-word;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                .cart_goods_price {
                  color: red;
                }
              }
              .cart_list_num {
                flex: 3;
                display: flex;
                justify-content: center;
                align-items: center;
                .num_reduce {
                }
                .num_info {
                  padding: 0 5px;
                }
                .num_add {
                }
              }
            }
          }
        `}</style>
        {/* 购物车列表展示结束 */}
        {/* 底部结算栏开始 */}
        <div className="clearing_tool">
          <div className="selectAll">
            <CheckboxItem 
            checked={this.props.allChecked}
            onChange={this.props.handleCartAllCheck}>
              全选
            </CheckboxItem>
          </div>
          <div className="total">
            合计
            <span>￥{this.props.allPrice}</span>
          </div>
          <div className="clearing">
            结算
            <span style={{ display: this.props.selectdNums ? "block" : "none" }}>
              ({this.props.selectdNums})
            </span>
          </div>
        </div>

        <style jsx>{`
          .clearing_tool {
            width: 100%;
            height: 50px;
            font-size: 17px;
            display: flex;
            position: fixed;
            bottom: 50px;
            background-color: #fff;
            .selectAll {
              display: flex;
              justify-content: center;
              align-items: center;
              flex: 1;
            }
            .total {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              span {
                color: orangered;
              }
            }
            .clearing {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: orangered;
              color: #fff;
              font-weight: 700;
              span {
              }
            }
          }
        `}</style>
        {/* 底部结算栏结束 */}
      </Fragment>
    );
  }
}

// 获取总价格
const getTotalPrice = arr => {
  let sum = 0;
  arr.forEach(v => {
    // 要的选中的了的商品
    v.isChecked && (sum += v.price * v.num);
    // if(v.isChecked){
    //   sum+=v.price*v.num
    // }
  });
  return sum;
};


// export default withRouter(Cart);
//映射（获取）仓库中的信息
const mapStateToProps = state => {
  // 种类的数量也等于购物车的长度
  return {
    cartLength: state.cartReducer.cartList.length,
    cartList: state.cartReducer.cartList,
    // 只要购物车中的每一个商品都是选中状态，那么全选的按钮 就是 选中状态
    allChecked:
      state.cartReducer.cartList.length &&
      state.cartReducer.cartList.every(v => v.isChecked),
    // 总的价格( 被选中的单价 * 数量 的叠加总和)
    allPrice: getTotalPrice(state.cartReducer.cartList),
    // 结算中的 数字 => 购物车中 选中了的数组的长度
    selectdNums: state.cartReducer.cartList.filter(v => v.isChecked).length
  };
};

const mapDispatch = dispatch => {
  return {
    handleCartcheck: id => {
      //单选功能
      dispatch(cart_check(id));
    },
    //全选功能
    handleCartAllCheck: e => {
      let { checked } = e.target;
      dispatch(cart_all_check(checked));
    },
    //数量加减功能
    handleCartNumUpdate: (id, unit, num) => {
      if (unit === -1 && num === 1) {
        alert("警告", "您确定删除吗?", [
          { text: "取消", onPress: () => {} },
          {
            text: "删除",
            onPress: () => {
              // 1 只需要传递id就可以了  删除数据
              dispatch(cart_num_delete(id));
            }
          }
        ]);
      } else {
        // 编辑数量
        dispatch(cart_num_update(id, unit));
      }
    },
    //滑动删除事件
    handleDisDelete: id => {
      alert("警告", "您确定删除吗?", [
        { text: "取消", onPress: () => {} },
        {
          text: "删除",
          onPress: () => {
            // 1 只需要传递id就可以了  删除数据
            dispatch(cart_num_delete(id));
          }
        }
      ]);
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatch
)(withRouter(Cart));
