import React, { Component } from "react";

//引入ant-design的组件
import { TabBar } from "antd-mobile";

//引入链接器
import { connect } from "react-redux";


class MyLayout extends Component {
  render() {
    return (
      <div style={{ position: "fixed", height: "100%", width: "100%", top: 0 }}>
        {/* TabBar开始 */}
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          {/* TabBar的首页开始 */}
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<span className="iconfont icon-home" />}
            selectedIcon={<span className="iconfont icon-home" />}
            selected={this.props.match.url === "/"}
            onPress={() => {
              // console.log(this.props);
              this.props.history.push("/");
            }}
            data-seed="logId"
          >
            {/* 打开对应页面的时候才渲染 */}
            {this.props.match.url === "/" ? this.props.children : null}
          </TabBar.Item>
          {/* TabBar的首页结束 */}

          {/* TabBar的购物车开始 */}
          <TabBar.Item
            icon={<span className="iconfont icon-gouwuche" />}
            selectedIcon={<span className="iconfont icon-gouwuche" />}
            title="购物车"
            key="Cart"
            badge={this.props.cartLength}
            selected={this.props.match.url === "/Cart"}
            onPress={() => {
              this.props.history.push("/Cart");
            }}
            data-seed="logId1"
          >
            {this.props.match.url === "/Cart" ? this.props.children : null}
          </TabBar.Item>
          {/* TabBar的购物车结束 */}

          {/* TabBar的我的开始 */}
          <TabBar.Item
            icon={<span className="iconfont icon-weibiaoti2fuzhi12" />}
            selectedIcon={<span className="iconfont icon-weibiaoti2fuzhi12" />}
            title="我的"
            key="Mine"
            dot
            selected={this.props.match.url === "/Mine"}
            onPress={() => {
              this.props.history.push("/Mine");
            }}
          >
            {this.props.match.url === "/Mine" ? this.props.children : null}
          </TabBar.Item>
          {/* TabBar的我的结束 */}
        </TabBar>
        {/* TabBar结束 */}
      </div>
    );
  }
}

// export default MyLayout;

//映射（获取）仓库中的信息
const mapStateToProps = state => {
  // 种类的数量也等于购物车的长度
  return {
    cartLength: state.cartReducer.cartList.length
  }
}

export default connect(mapStateToProps,null)(MyLayout);
