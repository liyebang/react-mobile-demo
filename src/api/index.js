import axios from 'axios';

//统一请求的前缀
axios.defaults.baseURL = 'http://react.zbztb.cn/site/';


// axios拦截器 
// 发送前 调用一个事件  拦截器
// 发送回来 调用一个事件  拦截器
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 返回什么数据 其他用了 axios 请求的返回值 就是什么数据 
    return response.data;
},function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
})


//1.获取轮播图数据和热门推荐
export const getGoods = () => axios.get('goods/gettopdata/goods');

//2.获取商品列表
export const getGoodsGroup = () => axios.get('goods/getgoodsgroup');

//3.根据id获取商品详细信息
export const getGoodsById = (id) => axios.get(`goods/getgoodsinfo/${id}`);