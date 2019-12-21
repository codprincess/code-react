/**
 * Created by 小公主 on 2019/12/09.
 */
import React, { Component } from 'react';
// import { Layout, Menu} from 'antd';
import MenuConfig from '../../routes/config'
import NavItem from './NavItem';
import './index.less'
class NavLeft extends Component {
    constructor(props){
        super(props)
        this.state = {
            menus : MenuConfig
        }
        console.log('获取路由数据', this.state.menus)
    }
    render() {
        return (
            <div className="innerbox" style={{ height: "100vh", overflowY: 'scroll', background:"rgb(60, 46, 61)"}}>
                <div style={styles.logo}></div>
                <NavItem menus={this.state.menus}></NavItem>
           </div>
        );
    }


    
}
const styles = {
    logo: {
        height: '66px',
        background: '#3C2E3D',
        // margintop: '16px'
    }
}

export default NavLeft;