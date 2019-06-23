import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import './styles/iconfont.css';

//引入仓库
import store from './store';
//使用react-redux 来让仓库和App产生联系
import { Provider } from "react-redux";


// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Provider store={store}> <App /> </Provider> , document.getElementById('root'));
