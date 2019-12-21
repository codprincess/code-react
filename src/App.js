/**
 * Creact by 小公主 on 2019/12/07.
 */
import React, { Component } from 'react'
import './App.css';
// import { Button, message } from 'antd'
// import service from './axios/request'
// import axios from 'axios'
//import { _getList } from './axios/api'
class App extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     data:[]
  //   }
  // }
  // async getList(){
  //   const res = await _getList()
  //   console.log(res)
  // }
  // handleClick = () => {
  //   message.success('成功啦...');
  // }
  // componentWillMount(){
  //   this.getList()
  // }
  render() {
    return (
      <div>
        {/* <Button type='primary' onClick={this.handleClick}>学习</Button> */}
        {this.props.children}
      </div>
    )
  }
}

export default App;