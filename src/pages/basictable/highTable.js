import React, { Component } from 'react'
import { Card, Table} from 'antd'
import { _getList } from '../../axios/api'
import './style.css';
// import mystyle from './index.css';
class HighTable extends Component {
    
    state = {
        dataSource:[]
    }
    async getList() {
        const res = await _getList()
        this.setState({
            dataSource: res.data
        })
        console.log(res.data)
    }
    componentWillMount() {
       // console.log('112314', styles.blue);
        this.getList()
    }
    render() {

        const columns = [
            {
                title: '名字',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                fixed: 'left',
                filters: [
                    {
                        text: 'Joe',
                        value: 'Joe',
                    },
                    {
                        text: 'John',
                        value: 'John',
                    },
                ],
                onFilter: (value, record) => record.name.indexOf(value) === 0,
            },
            {
                title: '其他',
                children: [
                    {
                        title: '年龄',
                        dataIndex: 'age',
                        key: 'age',
                        width: 150,
                        sorter: (a, b) => a.age - b.age,
                    },
                    {
                        title: '地址',
                        children: [
                            {
                                title: '街道',
                                dataIndex: 'street',
                                key: 'street',
                                width: 150,
                            },
                            {
                                title: '楼房',
                                children: [
                                    {
                                        title: '几栋',
                                        dataIndex: 'building',
                                        key: 'building',
                                        width: 100,
                                    },
                                    {
                                        title: '房号',
                                        dataIndex: 'number',
                                        key: 'number',
                                        width: 100,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: '公司',
                children: [
                    {
                        title: '公司地址',
                        dataIndex: 'companyAddress',
                        key: 'companyAddress',
                        width: 200,
                    },
                    {
                        title: '公司名字',
                        dataIndex: 'companyName',
                        key: 'companyName',
                    },
                ],
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                width: 80,
                fixed: 'right',
            },
        ];
        const columnss = [
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
                key: 'status',
                dataIndex: 'status',
                render(status) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[status];
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
                title: '操作',
                render: record => (
                    <span>
                        <a onClick={e => this.delete(record)}>
                            删除
                        </a>
                        <a style={{ marginLeft: "10px" }} onClick={e => this.editAction(record)}>
                            编辑
                        </a>
                    </span>

                )
            }
        ]

        const columns3 = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                
                render: record =>(
                    // {record}
                    <div className={record === '胡彦斌' ? "test" :"myblue"}>{record}</div>
                )
                   
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                // onCell: (record, rowIndex) => ({
                //     style: { backgroundColor: '#fff674' }
                // })
                render: record => (
                    <div className={record > 32 ? "test" :"myyellow"}>{record}</div>
                )
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                render: record => <span className={record === '西湖区湖底公园1号' ? "test" : "mygreen"}>{record}</span>,
            },
        ];

        const dataSource3 = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园2号',
            },
        ];


        const data = [];
        //生成数据
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: 'John Brown',
                age: i + 1,
                street: 'Lake Park',
                building: 'C',
                number: 2035,
                companyAddress: 'Lake Street 42',
                companyName: 'SoftLake Co',
                gender: 'M',
            });
        }

        return (
            <div>
                <Card title="表头合并" style={{ margin: '10px 0' }}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        // size="middle"
                        // scroll={{ x: 'calc(700px + 50%)', y: 240 }}
                    />
                </Card>

                <Card title="表格奇数偶数颜色变换" style={{ margin: '10px 0' }}>
                    <Table
                        rowKey={record => record.id}
                        columns={columnss}
                        dataSource={this.state.dataSource}
                        bordered
                        // rowClassName={(record, index) => {
                        //     let className = 'light-row';
                        //     (record.status === '1' ? className = 'blue' : record.status === '2' ? className = 'yellow' : className = 'red')}}
                        // //rowClassName={(record, index) => blue}
                        rowClassName={(record, index) => {
                            let className = 'light-row';
                            if (index % 2 === 1) className = 'blue';
                            return className;
                        }}
                        
                    />
                </Card>

                <Card title="根据状态变化改变表格行的颜色">
                    <Table
                        rowKey={record => record.id}
                        columns={columnss}
                        dataSource={this.state.dataSource}
                        bordered
                        //rowClassName={record => (record.status === '1' ? mystyle.blue : record.status === '2' ? mystyle.yellow : mystyle.red)}
                        rowClassName={(record, index) => {
                            let className = 'light-row';
                            if (record.status === '1') className = 'blue';
                            if (record.status === '2') className = 'yellow';
                            if (record.status !== '1' && record.status !== '2') className = 'red';
                            return className;
                        }}
                    />
                </Card>

                <Card title="根据单元格填充颜色">
                   <div className="boss">
                        <Table
                            columns={columns3}
                            dataSource={dataSource3}
                            bordered

                        />
                   </div>
                </Card>

            </div>
           
        )
    }

}

export default HighTable
