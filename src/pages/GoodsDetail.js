import React, { Component, Fragment } from "react";

//引入组件
import { NavBar, Icon, Carousel } from "antd-mobile";

//引入api
import { getGoodsById } from '../api';

//引入链接器
import { connect } from "react-redux";
//引入行动生成器
import { cart_add } from '../store/actionCreator';

class GoodsDetail extends Component {
    state = {
        //录播图
        data: [],
        //商品信息对象
        goodsinfo: {},
        imgHeight: 176,

    }
    componentDidMount(){
      console.log(this.props);
      let { id } = this.props.match.params;
      getGoodsById(id).then(res => {
        console.log(res);
        if(res.status === 0){
          this.setState({ 
            data: res.message.imglist ,
            goodsinfo: res.message.goodsinfo
          })
        }
      })
    }
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
          商品详情
        </NavBar>
        {/* 导航栏结束 */}


        {/* 轮播图开始 */}
        <Carousel autoplay infinite>
          {this.state.data.map(val => (
            <a
              key={val.id}
              href="javascript:;"
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight
              }}
            >
              <img
                src={val.thumb_path}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "auto" });
                }}
              />
            </a>
          ))}
        </Carousel>
        {/* 轮播图结束 */}

        {/* 商品信息开始 */}
        <div className='goods_info'>
            <div className='goods_title'>{this.state.goodsinfo.title}</div>
            <div className='goods_price'>
                <span className='sell_price'>￥{this.state.goodsinfo.sell_price}</span>
                <span className='market_price'>￥{this.state.goodsinfo.market_price}</span>
            </div>
        </div>
        <div className='goods_detail'>
            <div className='goods_detail_title'>商品参数</div>
            <div className='goods_detail_content'>
                <div className='goods_no'>商品编号 :{this.state.goodsinfo.goods_no}</div>
                <div className='stock_quantity'>商品库存 :{this.state.goodsinfo.stock_quantity}</div>
            </div>
        </div>
        <div className='add_time'>上架时间 :{this.state.goodsinfo.add_time}</div>
        {/* 图文详情,使用渲染html字符串 */}
        <div className='goods_product' dangerouslySetInnerHTML={{ __html: this.state.goodsinfo.content }}></div>

        <style jsx>{`
                .goods_info{
                  background-color: #fff;
                  padding: 10px;
                  .goods_title{}
                  .goods_price{
                    display: flex;
                    justify-content: space-between;
                    .sell_price{
                      color: red;
                    }
                    .market_price{
                      color: #666;
                      text-decoration: line-through;
                    }
                  }
                }
                .goods_detail{
                  background-color: #fff;
                  padding: 10px;
                  .goods_detail_title{}
                  .goods_detail_content{
                    .goods_no{}
                    .stock_quantity{}
                  }
                }
                .add_time{
                  padding: 10px;
                  background-color: #fff;
                }
                .goods_product{
                  padding: 10px;
                  background-color: #fff;
                }
        `}</style>
        {/* 商品信息结束 */}

        {/* 占位用div */}
        <div style={{ height:34 }}></div>

        {/* 底部工具栏开始 */}
        <div className='btm_tool'>
            <div className='btm_cantact btm_item'>
              <span className="iconfont icon-kefu"></span>
              <p>客服</p>
            </div>    
            <div className='btm_cart btm_item'>
              <span className="iconfont icon-gouwuche"></span>
              <p>购物车</p>
              <span className='badge' style={{ display: this.props.cartLength? 'block': 'none' }}>
                {this.props.cartLength}
              </span>
            </div>
            <div 
            className='btm_cart_add btm_item'
            onClick={() => this.props.handleCartAdd(this.state.goodsinfo)}>
                加入购物车
            </div>
            <div className='btm_buy btm_item'>
                立即购买
            </div>
        </div>
                
        <style jsx>{`
            .btm_tool{
              position: fixed;
              bottom: 0;
              display: flex;
              width: 100%;
              background-color: #fff;
              .btm_cantact{
                flex: 1;
                span{}
                p{}
              }
              .btm_cart{
                flex: 1;
                span{}
                p{}
              }
              .btm_cart_add{
                flex: 2;
                background-color: orange;
                color: #fff;
              }
              .btm_buy{
                flex: 2;
                background-color: red;
                color: #fff;
              }
            }
            /* 公共样式 */
            .btm_item{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .badge{
              position: absolute;
              top: 0;
              left: 26%;
              border-radius: 50%;
              padding: 2px 6px;
              background-color: orangered;
              color: #fff;
              font-size: 12px;
            }
        `}</style>
        {/* 底部工具栏结束 */}

      </Fragment>
    );
  }
}

// export default GoodsDetail;

//映射（获取）仓库中的信息
const mapStateToProps = state => {
  // 种类的数量也等于购物车的长度
  return {
    cartLength: state.cartReducer.cartList.length
  }
}

// 将 行动映射到 props中
const mapDispatch = dispatch => {
  return {
    handleCartAdd: goodsObj => {
      console.log(goodsObj);
      // 会触发到  管理员上
      dispatch(cart_add(goodsObj));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatch
)(GoodsDetail)