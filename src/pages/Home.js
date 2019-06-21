import React, { Component, Fragment } from "react";

//引入走马灯组件
import { Carousel } from "antd-mobile";

//引入走马灯数据
import { getGoods } from "../api";

class Home extends Component {
  state = {
    data: [],
    imgHeight: 176
  };
  componentDidMount() {
    getGoods().then(res => {
    //   console.log(res);
      if (res.status === 0) {
        this.setState({ data: res.message.sliderlist });
      }
    });
  }
  render() {
    return (
      <Fragment>
        {/* 轮播图开始 */}
        <Carousel autoplay={true} infinite>
          {this.state.data.map(val => (
            <a
              key={val.id}
              href="#"
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
      </Fragment>
    );
  }
}

export default Home;
