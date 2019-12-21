import React, { Component } from 'react'
import { Card, Table, Modal, Button, ConfigProvider, Icon} from 'antd'
//import { Empty } from 'antd';
import { _getList } from '../../axios/api'
const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
        <Icon type="smile" style={{ fontSize: 30 }} />
        <p>暂无数据</p>
    </div>
);
class BasicTable extends Component {
    state = {
        dataSource:[],
        selectedRowKeys: [],
        selectedRows: [],
    }
    state = {
        customize: false,
    };
    

    async getList(){
        const res = await _getList()
        this.setState({
            dataSource:res.data
        })
        console.log('请求数据',res.data)
    }
    componentWillMount(){
        this.getList()
    }
    //单选
    onRowClick = (record,index)=>{
        console.log('111111');
        let selectKey = [index];
        Modal.info({
            title: '信息',
            content: `用户名：${record.username},用户爱好：${record.interest === '3' ? '踢足球' :'麦霸'}`
        })
        this.setState({
            selectedRowKeys: selectKey,
        })
    }

    //单项删除
    onDelete=()=>{

    }

    //批量删除
    handleDelete=()=>{
        //获取列表数据
        console.log('直接获取下标',this.state.selectedRowKeys)
        if (this.state.selectedRowKeys.length>0){
            // let rows = this.state.selectedRows;
            // console.log('rows的值', rows)
            // let ids = []
            // rows.map((item) => {
            //     ids.push(item.id)
            // })
            const dataSource = [...this.state.dataSource]
            dataSource.splice(this.state.selectedRows, this.state.selectedRows.length)
            this.setState({dataSource})
        }
        

    }
    delete=(record)=>{
        //获取单条数据
        console.log('1111',record);
        let dataList = this.state.dataSource
        let index = dataList.findIndex(item=>item.id === record.id);
        dataList.splice(index,1);
        this.setState({
            dataSource:dataList
        })

    }
    render() {
        //定义表头
        const columns = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'username',
                dataIndex: 'username'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            },
            {
                title:'操作',
                render: record=>(
                    <span>
                        <a onClick={e => this.delete(record)}>
                            删除
                        </a>
                        <a style={{marginLeft:"10px"}} onClick={e => this.editAction(record)}>
                            编辑
                        </a>
                    </span>
                   
                )
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        // const emptyText = '暂无数据'
        // const { customize } = this.state;
        return (

            <div>
                <ConfigProvider renderEmpty={customizeRenderEmpty}>
                <Card>
                    <Table
                        rowKey={record => record.id}
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    ></Table>
                </Card>
                
                <Card title="Mock-单选" style={{ margin: '10px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.onDelete}>删除</Button>
                    </div>
                    <Table
                            rowKey={record => record.id}
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                        // rowKey={(record, index) => index}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>


                <Card title="Mock-多选" style={{ margin: '10px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                            rowKey={record => record.id}
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="无数据时设置自定义图标" style={{ margin: '10px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    
                        <Table
                            rowKey={record => record.id}
                            // locale={'无数据'}
                            // empty-text="无数据"
                            bordered
                            rowSelection={rowCheckSelection}
                            columns={columns}
                            // dataSource={this.state.dataSource}
                            pagination={false}
                        />
                    
                   
                </Card>
                </ConfigProvider>
            </div>
        )
    }
}

export default BasicTable
