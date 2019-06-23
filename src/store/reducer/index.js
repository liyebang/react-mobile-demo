//引入管理员合并工具
import {  combineReducers } from 'redux';


//引入管理员
import cartReducer from './cartReducer';



export default combineReducers({ cartReducer });