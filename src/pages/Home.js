import React, { Component, Fragment } from "react";

//withRouter可以绑定props，暴露组件的时候使用
import { withRouter } from 'react-router-dom';

//引入走马灯组件
import { Carousel } from "antd-mobile";

//引入走马灯数据
import { getGoods, getGoodsGroup } from "../api";

class Home extends Component {
  state = {
    //轮播图
    data: [],
    //推荐商品
    toplist:[],
    //商品列表
    goodslist:[],
    imgHeight: 176
  };
  componentDidMount() {
    //获取轮播图数据和推荐商品数据
    getGoods().then(res => {
    //   console.log(res);
      if (res.status === 0) {
        this.setState({ 
            data: res.message.sliderlist,
            toplist: res.message.toplist
         });
      }
    });

    //获取商品商品列表数据
    getGoodsGroup().then(res => {
      // console.log(res);
      if(res.status === 0){
        this.setState({ goodslist: res.message })
      }
    })
  }
  render() {
    return (
      <Fragment>
        {/* 轮播图开始 */}
        <Carousel autoplay={true} infinite>
          {this.state.data.map(val => (
            <a
              key={val.id}
              href="javascript:;"
              onClick={()=>{this.props.history.push(`/GoodsDetail/${val.id}`)}}
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight
              }}
            >
              <img
                src={val.img_url}
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

        {/* 推荐商品开始 */}
        <div className='recommend_goods'>
            <div className='recommend_goods_title'>推荐商品</div>
            <div className='recommend_goods_content'>
              {this.state.toplist.map(v => {
                return (
                  <div key={v.id} 
                  className='recommend_goods_item'
                  onClick={()=>{this.props.history.push(`/GoodsDetail/${v.id}`)}}>
                    <div className='recommend_goods_img'><img  src={v.img_url} alt='' /></div>
                    <div className='recommend_goods_name'><p>{v.title}</p></div>
                  </div>
                )
              })}
            </div>
        </div>

        <style jsx>{`
            .recommend_goods{
              .recommend_goods_title{
                padding:10px;
                background-color: #f5f5f9;
                color: #666;
              }
              .recommend_goods_content{
                .recommend_goods_item{
                  background-color: #fff;
                  border-bottom: 1px solid #666;
                  display: flex;
                  .recommend_goods_img{
                    flex: 1;
                    padding: 20px;
                    img{}
                  }
                  .recommend_goods_name{
                    flex: 6;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    overflow: hidden;
                    p{
                      /*单行文本超出用省略号代替*/
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                    }
                  }
                }
                
              }
            }
        `}</style>
        {/* 推荐商品结束 */}

        {/* 商品列表开始 */}
        <div>
          {this.state.goodslist.map(v1 => {
            return (
              <div key={v1.level1cateid} className='goods_list'>
                <div className='goods_list_catetitle'>{v1.catetitle}</div>
                <div className='goods_list_content'>
                  {v1.datas.map(v2 => {
                    return (
                      <div key={v2.artID} 
                      className='goods_list_item'
                      onClick={()=>{this.props.history.push(`/GoodsDetail/${v2.artID}`)}}>
                        <div className='goods_list_img'><img alt='' src={v2.img_url} /></div>
                        <div className='goods_list_artTitle'><p>{v2.artTitle}</p></div>
                        <div className='goods_list_price'>
                          <span className='goods_list_sell_price'>￥{v2.sell_price}</span>
                          <span className='goods_list_market_price'>￥{v2.market_price}</span>
                        </div>
                        <div className='goods_list_stock_quantity'>热卖中  <span>{v2.stock_quantity}</span></div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <style jsx>{`
          .goods_list{
            .goods_list_catetitle{
              padding: 10px;
              background-color: #f5f5f9;
              font-size: 14px;
            }
            .goods_list_content{
              display: flex;
              flex-wrap: wrap;
              .goods_list_item{
                width: 50%;
                padding: 10px;
                background-color: #fff;
                border-bottom: 1px solid #666;
                &:nth-child(odd){
                  border-right: 1px solid #666;
                }
                .goods_list_img{
                  img{}
                }
                .goods_list_artTitle{
                  p{
                      font-size: 15px;
                      /* 两行超出用省略号代替 */
                      display: -webkit-box;
                      overflow: hidden;
                      white-space: normal!important;
                      text-overflow: ellipsis;
                      word-wrap: break-word;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical; 
                  }
                }
                .goods_list_price{
                  display:flex;
                  justify-content: space-between;
                  .goods_list_sell_price{
                    color: red;
                  }
                  .goods_list_market_price{
                    color: #666;
                    text-decoration: line-through
                  }
                }
                .goods_list_stock_quantity{
                  span{
                    color: red;
                  }
                }
              }
            }
          }
        `}</style>
        {/* 商品列表结束 */}
        

      </Fragment>
    );
  }
}

export default withRouter(Home);
