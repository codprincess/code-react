/**
 * Created by 小公主 on 2019/12/09.
 */
import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
class BreadcrumbItems extends Component {
    componentWillMount(){
        console.log('面包屑',this.props.first)
    }
    render() {
        const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        return (
            <span>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={'/home'}>首页</Link>
                    </Breadcrumb.Item>
                    {first}
                    {second}
                </Breadcrumb>
            </span>
        )
    }
}

export default BreadcrumbItems
