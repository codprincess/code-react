import React, { Component } from 'react'
import { Card, Button, Form, Input, Select, Tree, Transfer, Modal } from 'antd'
import ETable from '../../components/ETable/index'
import Utils from '../../utils/utils'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
class Permission extends Component {
    state = {}
    componentWillMount(){
        this.requestList();   
    }
    requestList = () => {
        // axios.ajax({
        //     url: '/role/list',
        //     data: {
        //         params: {}
        //     }
        // }).then((res) => {
        //     if (res.code == 0) {
        //         let list = res.result.item_list.map((item, i) => {
        //             item.key = i;
        //             return item;
        //         })
        //         this.setState({
        //             list
        //         })
        //     }
        // })
    }

    //角色创建
    handleRole = ()=>{
        this.setState({
            isRoleVisible:true
        })
    }

    //角色提交
    handleRoleSubmit = ()=>{
        //获取提交用户表单数据
        let data = this.roleForm.props.form.getFieldsValue();
        // axios.ajax({
        //     url: 'role/create',
        //     data: {
        //         params: {
        //             ...data
        //         }
        //     }
        // }).then((res) => {
        //     if (res) {
        //         this.setState({
        //             isRoleVisible: false
        //         })
        //         //重置表单
        //         this.roleForm.props.form.resetFields();
        //         this.requestList();
        //     }
        // })
    }

    //设置权限
    handlePermission=()=>{
        if (!this.state.selectedItem){
            Modal.info({
                title: '提示',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: this.state.selectedItem
        });
        let menuList = this.state.selectedItem.menus;
        this.setState({
            menuInfo: menuList
        })

    }

    handlePermEditSubmit =()=>{
        let data = this.roleForm.props.form.getFieldsValue();
        //获得角色id
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        //请求编辑接口
        // axios.ajax({
        //     url: '/permission/edit',
        //     data: {
        //         params: {
        //             ...data
        //         }
        //     }
        // }).then((res) => {
        //     if (res) {
        //         this.setState({
        //             isPermVisible: false
        //         })
        //         this.requestList();
        //     }
        // })
    }

    //用户授权
    handleUserAuth=()=>{
        if(!this.state.selectedItem){
            Modal.info({
                title: '信息',
                content: '未选中任何项目'
            })
            return;
        }
        this.getRoleUserList(this.state.selectedItem.id);
        this.setState({
            isUserVisible: true,
            isAuthClosed: false,
            detailInfo: this.state.selectedItem
        });

    }
    //获取一个角色的权限信息
    getRoleUserList = (id) => {
        // axios.ajax({
        //     url: '/role/user_list',
        //     data: {
        //         params: {
        //             id: id
        //         }
        //     }
        // }).then((res) => {
        //     if (res) {
        //         this.getAuthUserList(res.result);
        //     }
        // })
    }

    //筛选目标用户
    getAuthUserList = (dataSource)=>{
        const mockData = [];
        const targetKeys = [];
        if(dataSource && dataSource.length>0){
            for(let i=0;i<dataSource.length;i++){
                const data = {
                    key:dataSource[i].user_id,
                    title:dataSource[i].user_name,
                    status:dataSource[i].status,
                };
                if(data.status == 1){
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
        }
        this.setState({mockData,targetKeys});
        
    }
    patchUserInfo = (targetKeys)=>{
        this.setState({targetKeys:targetKeys})
    }

    //用户授权提交
    handleUserSubmit=()=>{
        let data = {};
        data.user_ids = this.state.targetKeys || [];
        data.role_id = this.state.selectedItem.id;
        // axios.ajax({
        //     url: '/role/user_role_edit',
        //     data: {
        //         params: {
        //             ...data
        //         }
        //     }
        // }).then((res) => {
        //     if (res) {
        //         this.setState({
        //             isUserVisible: false
        //         })
        //         this.requestList();
        //     }
        // })
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formatTime
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    if (status == 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formatTime
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>  

                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        columns={columns}
                    />
                </div>
            </div>
        )
    }
}

//角色创建
class RoleForm extends Component{
    render(){
        const { getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:16}
        };

        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                            
                        })
                    }
                </FormItem>
            </Form>
        )
    }
}
export default Permission
