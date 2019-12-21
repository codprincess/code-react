/**
 * Created 小公主 on 2019/12/7.
 */
import React, { Component } from 'react';
// import screenfull from 'screenfull';
// import SiderHeader from './SiderHeader';
import { Menu, Icon, Layout, Badge } from 'antd';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import './header.less'
import avatar from '../../asset/img/ava.jpg'
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class Headers extends Component{
    // constructor(props){
    //     super(props)
       
    // }
    state = {
        user: '',
        visible: false,
        isMobile: false,
        username:'傻啦吧唧'
    };
    
    componentDidMount() {
        // const QueryString = queryString() as any;
        // let _user,
        //     storageUser = localStorage.getItem('user');

        // _user = (storageUser && JSON.parse(storageUser)) || '测试';
        // if (!_user && QueryString.hasOwnProperty('code')) {
        //     gitOauthToken(QueryString.code).then((res: any) => {
        //         gitOauthInfo(res.access_token).then((info: any) => {
        //             this.setState({
        //                 user: info,
        //             });
        //             localStorage.setItem('user', JSON.stringify(info));
        //         });
        //     });
        // } else {
        //     this.setState({
        //         user: _user,
        //     });
        // }
    }
    // screenFull = () => {
    //     if (screenfull.isEnabled) {
    //         screenfull.request();
    //     }
    // };
    menuClick = () => {
      //  e.key === 'logout' && this.logout();
    };
    logout = () => {
        // localStorage.removeItem('user');
        // this.props.history.push('/login');
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = () => {
       // this.setState({ visible });
    };
    render() {
      //  const { responsive = { data: {} } } = this.props;
        return (
            <Header className="custom-theme header" style={{ background: "#3C2E3D"}}>
                {/* {this.state.isMobile ? (
                    <Popover
                        content={<SiderHeader popoverHide={this.popoverHide} />}
                        trigger="click"
                        placement="bottomLeft"
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <Icon type="bars" className="header__trigger custom-trigger" />
                    </Popover>
                ) : (
                        <Icon
                            className="header__trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )} */}
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="pwa">
                        {/* <PwaInstaller /> */}
                    </Menu.Item>
                    {/* <Menu.Item key="full" onClick={this.screenFull}>
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item> */}
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
                            <Icon type="notification" style={{ color:"#44b549"}}/>
                        </Badge>
                    </Menu.Item>
                    <SubMenu
                        title={
                            <span className="avatar">
                                <img style={{width:"40px",height:"40px",borderRadius:"50%"}} src={avatar} alt="头像" />
                                <i className="on bottom b-white" />
                            </span>
                        }
                    >
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.state.userName}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                            <Menu.Item key="logout">
                                <span onClick={this.logout}>退出登录</span>
                            </Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

// 重新设置连接之后组件的关联类型
// const HeaderCustomConnect: React.ComponentClass<
//     HeaderCustomProps,
//     HeaderCustomState
// > = connectAlita(['responsive'])(HeaderCustom);

export default Headers;
