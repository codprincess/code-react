/**
 * Created 小公主 on 2019/12/09.
 */
import React, { Component } from 'react'
import { Link, withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd'
// @withRouter
class NavItem extends Component {
    state = {
        openKeys: [],
        selectedKeys: []
    }

    componentDidMount(){
        //防止页面刷新侧边栏开始初始化
        console.log('1111',this.props.location)
        const pathname = this.props.location.pathname
        //获取当前所在的目录层级
        const level = pathname.split('/')
        console.log('所在的目录层级',level)
        switch(level.length){
            //一级目录
            case 2:
                this.setState({
                    selectedKeys:[pathname]
                })
                break;
            //三级目录
            case 5:
                this.setState({
                    selectedKeys:[pathname],
                    openKeys:[level.slice(0,3).join('/'),level.slice(0,4).join('/')]
                })
                break;
            default:
                this.setState({
                    selectedKeys:[pathname],
                    openKeys:[pathname.substr(0,pathname.lastIndexOf('/'))]
                })
        } 
    }

    //componentWillReceiveProps在初始化render的时候不会执行，
    //它会在Component接受到新的状态(Props)时被触发，
    //一般用于父组件状态更新时子组件的重新渲染
    componentWillReceiveProps(nextProps){
        //当点击导航时,侧边栏要同步响应
        const pathname = nextProps.location.pathname
        if(this.props.location.pathname !== pathname){
            this.setState({
                selectedKeys:[pathname]
            })
        }
    }

    //展开当前父级菜单
    onOpenChange = (openKeys)=>{
        if(openKeys.length === 0 || openKeys.length === 1){
            this.setState({
                openKeys
            })
            return 
        }

        //展开最新的菜单
        const latestOpenKey = openKeys[openKeys.length - 1]
        if(latestOpenKey.includes(openKeys[0])){
            this.setState({
                openKeys
            })
        }else{
            this.setState({
                openKeys:[latestOpenKey]
            })
        }
    }

   

    renderMenuItem = ({key,icon,title})=>{
        return (
            <Menu.Item key={key}>
                <Link to={key}>
                    {icon && <Icon type={icon}></Icon>}
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }

    renderSubMenu = ({key,icon,title,subs})=>{
        return(
            <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon}></Icon>}<span>{title}</span></span>}>
                {
                    subs && subs.map(item=>{
                        return item.subs && item.subs.length > 0?
                        this.renderSubMenu(item) :
                        this.renderMenuItem(item)

                    })
                }
            </Menu.SubMenu>
        )
    }
    render() {
        const {openKeys,selectedKeys} = this.state
        return (
           <Menu 
                onOpenChange={this.onOpenChange}
                onClick={({key})=>this.setState({selectedKeys:[key]})}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                mode='inline'
                style={{ background:"#3C2E3D"}}
           >
               {
                   this.props.menus && this.props.menus.map(item=>{
                       return item.subs && item.subs.length>0?
                        this.renderSubMenu(item):
                        this.renderMenuItem(item)
                   })
               }
           </Menu>
        )
    }
}

export default withRouter(NavItem)
