/**
 * Creact by 小公主 on 2019/12/09.
 */
import React, { Component } from 'react'
import { Card, Button, Radio, Row, Col, Icon, Dropdown, Menu} from 'antd'
// import './index.less'
import BreadcrumbItems from '../../components/breadcrumbitem/BreadcrumbItems'
export default class Buttons extends Component {
    constructor(props){
        super(props)
        this.state = {
            size:'default',
            loading:false,
            iconLoading:false,
            subs: [
                { id:1, title: '按钮', icon: '', },
                { id: 2, title: '图标', icon: '', },
            ],
            btnText:'请选择'
        }
    }
    handleSizeChange=(e)=>{
        console.log(e)
        this.setState({size:e.target.value});
    }

    //下拉点击
    handleMenuClick = (e)=>{
        console.log('下拉框', e)
        this.setState({
             btnText:e.item.props.children
        })
    }
    render() {
        const size = this.state.size
        const btnText = this.state.btnText
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                {
                    this.state.subs.map((item,index)=>{
                        return <Menu.Item key={index}>{item.title}</Menu.Item>
                    })
                }
            </Menu>
        )

        return (
            <div className="gutter-example button-demo">
                <BreadcrumbItems first="基础组件" second="按钮"></BreadcrumbItems>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary">Primary</Button>
                                <Button>Default</Button>
                                <Button type="dashed">Dashed</Button>
                                <Button type="danger">Danger</Button>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" shape="circle" icon="search" />
                                <Button type="primary" icon="search">
                                    Search
                                    </Button>
                                <Button shape="circle" icon="search" />
                                <Button icon="search">Search</Button>
                                <br />
                                <Button shape="circle" icon="search" />
                                <Button icon="search">Search</Button>
                                <Button type="dashed" shape="circle" icon="search" />
                                <Button type="dashed" icon="search">
                                    Search
                                    </Button>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Radio.Group value={size} onChange={this.handleSizeChange}>
                                    <Radio.Button value="large">Large</Radio.Button>
                                    <Radio.Button value="default">Default</Radio.Button>
                                    <Radio.Button value="small">Small</Radio.Button>
                                </Radio.Group>
                                <br />
                                <br />
                                <Button type="primary" shape="circle" icon="download" size={size} />
                                <Button type="primary" icon="download" size={size}>
                                    Download
                                </Button>
                                <Button type="primary" size={size}>
                                    Normal
                                </Button>
                                <br />
                                <Button.Group size={size}>
                                    <Button type="primary">
                                        <Icon type="left" />
                                        Backward
                                    </Button>
                                    <Button type="primary">
                                        Forward
                                        <Icon type="right" />
                                    </Button>
                                </Button.Group>
                            </Card>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary">primary</Button>
                                <Button>secondary</Button>
                                <Dropdown overlay={menu}>
                                    <Button>
                                        {btnText} <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </Card>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" loading>
                                    Loading
                                </Button>
                                <Button type="primary" size="small" loading>
                                    Loading
                                </Button>
                                <br />
                                <Button
                                    type="primary"
                                    loading={this.state.loading}
                                    onClick={this.enterLoading}
                                >
                                    Click me!
                                </Button>
                                <Button
                                    type="primary"
                                    icon="poweroff"
                                    loading={this.state.iconLoading}
                                    onClick={this.enterIconLoading}
                                >
                                    Click me!
                                </Button>
                                <br />
                                <Button shape="circle" loading />
                                <Button type="primary" shape="circle" loading />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <style>{`
                    .button-demo .ant-btn {
                        margin-right: 8px;
                        margin-bottom: 12px;
                    }
                `}</style>
            </div>
        )
    }
}
