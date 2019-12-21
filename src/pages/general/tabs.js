/**
 * Creact by 小公主 on 2019/12/10.
 */
import React, { Component } from 'react'
import BreadcrumbItems from '../../components/breadcrumbitem/BreadcrumbItems'
import { Row, Col, Card, Tabs, Icon, Radio, Select, Button} from 'antd'
const { TabPane } = Tabs;
const { Option } = Select;
class TabsR extends Component {
        constructor(props){
            super(props);
            const panes = [
                { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
                { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
                {
                    title: 'Tab 3',
                    content: 'Content of Tab 3',
                    key: '3',
                    closable: false,
                },
            ];

            this.state = {
                itemList: [
                    { id: 1, title: '按钮1', icon: '', },
                    { id: 2, title: '图标1', icon: '', },
                    { id: 3, title: '加载中1', icon: '' },
                    { id: 4, title: '对话框1', icon: '' },
                    { id: 5, title: '通知提醒1', icon: '' },
                    { id: 6, title: '标签页1', icon: '' }
                ],
                itemList2: [
                    { id: 1, title: '按钮2', icon: '', },
                    { id: 2, title: '图标2', icon: '', },
                    { id: 3, title: '加载中2', icon: '' },
                    { id: 4, title: '对话框2', icon: '' },
                    { id: 5, title: '通知提醒2', icon: '' },
                    { id: 6, title: '标签页2', icon: '' }
                ],
                mode: 'top',
                tabPosition: 'top',
                activeKey: panes[0].key,
                newTabIndex: 0,
                panes
            }
        }
        
    
    handleTabsChange=(e)=>{
       // console.log('55555',e)
        if(e === 1){
           this.setState({
               itemList: this.state.itemList2
           })
        }else if(e===2){
            this.setState({
                itemList: this.state.itemList
            })
        }
    }

    callback=(key)=>{
        console.log('333', key);
    }

    handleModeChange=(e)=>{
        // console.log('444',e)
        const mode = e.target.value;
        this.setState({ mode });
    }

    changeTabPosition = tabPosition => {
        this.setState({ tabPosition });
    };
    onChange = (activeKey)=>{
        console.log('666',activeKey);
        this.setState({activeKey});
    }
    onEdit = (targetKey, action)=>{
        this[action](targetKey);

    }

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.state.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };

    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbItems first="基础组件" second="标签栏"></BreadcrumbItems>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="默认选中第一项">
                                <Tabs defaultActiveKey="1" onChange={this.callback}>
                                    <TabPane tab="Tab 1" key="1">
                                       Content of Tab Pane 1
                                    </TabPane>
                                    <TabPane tab="Tab 2" key="2">
                                        Content of Tab Pane 2
                                    </TabPane>
                                    <TabPane tab="Tab 3" key="3">
                                        Content of Tab Pane 3
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card title="有图标的标签">
                                <Tabs defaultActiveKey="1" onChange={this.handleTabsChange}>
                                    <TabPane
                                        tab={
                                            <span><Icon type="apple" /> Tab 1</span>
                                        }
                                        key="1"
                                    >
                                        {this.state.itemList.map((item, index) => {
                                            return <p key={index}>{item.title}</p>
                                        })}
                                    </TabPane>
                                    <TabPane
                                        tab={
                                            <span><Icon type="android" />Tab 2</span>
                                        }
                                        key="2"
                                    >
                                        {this.state.itemList.map((item, index) => {
                                            return <p key={index}>{item.title}</p>
                                        })}
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </div>

                        <div className="gutter-box">
                            <Card title="卡片式风格" bordered={false}>
                                <Tabs onChange={this.callback} type="card">
                                    <TabPane tab="Tab 1" key="1">
                                        Content of Tab Pane 1
                                    </TabPane>
                                    <TabPane tab="Tab 2" key="2">
                                        Content of Tab Pane 2
                                    </TabPane>
                                    <TabPane tab="Tab 3" key="3">
                                        Content of Tab Pane 3
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="禁用某项" bordered={false}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Tab 1" key="1">
                                        Tab 1
                                    </TabPane>
                                    <TabPane tab="Tab 2" disabled key="2">
                                        Tab 2
                                    </TabPane>
                                    <TabPane tab="Tab 3" key="3">
                                        Tab 3
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card title="带滚动" bordered={false}>
                                <Radio.Group onChange={this.handleModeChange} value={this.state.mode} style={{ marginBottom: 8 }}>
                                    <Radio.Button value="top">水平</Radio.Button>
                                    <Radio.Button value="left">垂直</Radio.Button>
                                </Radio.Group>
                                <Tabs defaultActiveKey="1" tabPosition={this.state.mode} style={{ height: 220 }}>
                                    {[...Array(30).keys()].map(i => (
                                        <TabPane tab={`Tab-${i}`} key={i}>
                                            Content of tab {i}
                                        </TabPane>
                                    ))}
                                </Tabs>
                            </Card>
                        </div>

                        <div className="gutter-box">
                            <Card title="有四个位置，tabPosition=left|right|top|bottom" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    Tab position：
                                    <Select
                                        value={this.state.tabPosition}
                                        onChange={this.changeTabPosition}
                                        dropdownMatchSelectWidth={false}
                                    >
                                        <Option value="top">top</Option>
                                        <Option value="bottom">bottom</Option>
                                        <Option value="left">left</Option>
                                        <Option value="right">right</Option>
                                    </Select>
                                </div>
                                <Tabs tabPosition={this.state.tabPosition}>
                                    <TabPane tab="Tab 1" key="1">
                                        Content of Tab 1
                                    </TabPane>
                                    <TabPane tab="Tab 2" key="2">
                                        Content of Tab 2
                                    </TabPane>
                                    <TabPane tab="Tab 3" key="3">
                                        Content of Tab 3
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </div>

                        <div className="gutter-box">
                            <Card title="支持新增和关闭选项" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button onClick={this.add}>ADD</Button>
                                </div>
                                <Tabs
                                    onChange={this.onChange}
                                    activeKey={this.state.activeKey}
                                    type="editable-card"
                                    onEdit={this.onEdit}
                                >
                                    {this.state.panes.map(pane => (
                                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                            {pane.content}
                                        </TabPane>
                                    ))}
                                </Tabs>
                            </Card>
                        </div>


                    </Col>

                </Row>
            </div>
        )
    }
}

export default TabsR
