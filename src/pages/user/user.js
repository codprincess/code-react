/**
 * Created by 小公主 on 2019/12/19.
 */
import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'
import { _getList } from '../../axios/api'
// const FormItem = Form.Item;
// const Option = Select.Option;
// const RadioGroup = Radio.Group;
class User extends Component {
    state = {
        dataSource: [],
        selectedRowKeys: [],
        selectedRows: [],
        visible: false
    }
    async getList() {
        const res = await _getList()
        this.setState({
            dataSource: res.data
        })
        console.log('请求数据', res.data)
    }

    componentWillMount() {
        this.getList()
    }

    //操作员工
    handleOperator = (type)=>{
        let item = this.state.selectedItem;
        if(type === 'create'){
            this.setState({
                title:'创建员工',
                isVisible:true,
                type
            })
        } else if (type === 'edit' || type ==='detail'){
            if(!item){
                Modal.info({
                    title:'信息',
                    content:'请选择一个用户'
                })
                return;
            }
            this.setState({
                title: type == 'edit' ? '编辑用户' : '查看详情',
                isVisible: true,
                userInfo: item,
                type
            })
        }else if(type === 'delete'){
            if(!item){
                message.error('请先选择一个用户O(∩_∩)O哈哈~')
                return;
            }
            Modal.confirm({
                text: '确定要删除此用户吗？',
                // onOk: () => {
                //     axios.ajax({
                //         url: '/user/delete',
                //         data: {
                //             params: {
                //                 id: item.id
                //             }
                //         }
                //     }).then((res) => {
                //         if (res.code == 0) {
                //             this.setState({
                //                 isVisible: false
                //             })
                //             this.getList();
                //         }
                //     })
                // }
            })
        }
    }

    //删除
    handleDelete = () => {
        console.log('33333', this.state.selectedRowKeys.length)
        if (this.state.selectedRowKeys.length<=0) {
            message.error('请先选择一个用户O(∩_∩)O哈哈~');
            return;
        }else{
            this.setState({
                visible: true,
            });
        }
        
    }

    //取消
    handleCancel=()=>{
        this.setState({
            visible: false,
        });
    }

    //删除action
    deleteAction=()=>{
        if (this.state.selectedRowKeys.length > 0) {
            const dataSource = [...this.state.dataSource]
            dataSource.splice(this.state.selectedRows, this.state.selectedRows.length)
            this.setState({ 
                dataSource,
                visible: false,
             })
        }
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id'
        }, {
            title: '用户名',
            dataIndex: 'username'
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex == 1 ? '男' : '女'
            }
        }, {
            title: '状态',
            dataIndex: 'status',
            render(status) {
                let config = {
                    '1': '咸鱼一条',
                    '2': '风华浪子',
                    '3': '北大才子一枚',
                    '4': '百度FE',
                    '5': '创业者'
                }
                return config[status];
            }
        }, {
            title: '爱好',
            dataIndex: 'interest',
            render(interest) {
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
                return config[interest];
            }
        }, {
            title: '爱好',
            dataIndex: 'isMarried',
            render(isMarried) {
                return isMarried ? '已婚' : '未婚'
            }
        }, {
            title: '生日',
            dataIndex: 'birthday'
        }, {
            title: '联系地址',
            dataIndex: 'address'
        }, {
            title: '早起时间',
            dataIndex: 'time'
        }
        ];
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
        return (
            <div>
                <Card style={{marginTop:10}}>
                    <Button type="primary" icon="plus">添加员工</Button>
                    <Button style={{ marginRight: 20 ,marginLeft:20 }} icon="edit">编辑员工</Button>
                    <Button>员工详情</Button>
                    <Button onClick={this.handleDelete} style={{ marginRight: 20, marginLeft: 20 }} type="danger" icon="delete">删除员工</Button>
                </Card>
                <div style={{marginTop:20}}>
                    <Table
                        rowKey={record => record.id}
                        bordered={false}
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    >
                       
                    </Table>
                </div>
                {/* 删除确认框 */}
               <div>
                    <Modal
                        title="删除确认框"
                        visible={this.state.visible}
                        onOk={this.deleteAction}
                        onCancel={this.handleCancel}
                        okText="确定"
                        cancelText="取消"
                        width="300px"
                    >
                        <p>您确认要删除该用户吗?</p>
                    </Modal>
               </div>
            </div>
        )
    }
}
export default User