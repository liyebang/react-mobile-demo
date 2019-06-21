import React, { Component, Fragment } from 'react';

//进入路由组件
import { HashRouter as Router, Route } from 'react-router-dom'


//引入页面组件
import Cart from './pages/Cart.js';
import Home from './pages/Home.js';
import Mine from './pages/Mine.js';



//引入其他组件
import MyLayout from './components/MyLayout.js';



class App extends Component{
    render() {
        return (
             <Fragment>
                 <Router>
                     <Route path='/' exact render={(props)=><MyLayout {...props}><Home /></MyLayout>} />
                     <Route path='/Cart' render={(props)=><MyLayout {...props}><Cart /></MyLayout>} />
                     <Route path='/Mine' render={(props)=><MyLayout {...props}><Mine /></MyLayout>} />
                 </Router>
             </Fragment>
        );
    }
}

export default App;