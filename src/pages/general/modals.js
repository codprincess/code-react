/**
 * Creact by 小公主 on 2019/12/10.
 */
import React, { Component } from 'react'
import BreadcrumbItems from '../../components/breadcrumbitem/BreadcrumbItems'
import { Row, Col, Card, Button, Modal } from 'antd'
const confirm = Modal.confirm;
class Modals extends Component {
    state = { 
        visible: false ,
        ModalText: 'Content of the modal',
        visible2: false,
        confirmLoading: false,
    };
    //普通
    showModal=()=>{
        this.setState({visible:true})
    }
    handleOk=(e)=>{
        // console.log('222',e)
        this.setState({ visible: false })
    }

    handleCancel=(e)=>{
        this.setState({ visible: false })
    }

    //异步
    showModal2 = () => {
        this.setState({ visible2: true })
    }
    handleOk2=()=>{
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible2: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel2 = () => {
        //console.log('Clicked cancel button');
        this.setState({
            visible2: false,
        });
    };

    showConfirm4 = () => {
        confirm({
            title: 'Want to delete these items?',
            content: 'some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    info = () => {
        Modal.info({
            title: 'This is a notification message',
            content: (
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
            onOk() { },
        });
    };
    success = () => {
        Modal.success({
            title: 'This is a success message',
            content: 'some messages...some messages...',
        });
    };
    error = () => {
        Modal.error({
            title: 'This is an error message',
            content: 'some messages...some messages...',
        });
    };
    warning = () => {
        Modal.warning({
            title: 'This is a warning message',
            content: 'some messages...some messages...',
        });
    };

    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbItems first="基础组件" second="对话框"></BreadcrumbItems>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" onClick={this.showModal}>
                                    Open Modal
                                </Button>
                                <Modal
                                    title="Basic Modal"
                                    okText="确定"
                                    cancelText="取消"
                                    // footer={null}
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                </Modal>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card>
                                <Button type="primary" onClick={this.showModal2}>
                                    Open Modal with async logic
                                </Button>
                                <Modal
                                    title="Title"
                                    visible={this.state.visible2}
                                    onOk={this.handleOk2}
                                    confirmLoading={this.state.confirmLoading}
                                    onCancel={this.handleCancel2}
                                >
                                    <p>{this.state.ModalText}</p>
                                </Modal>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" onClick={this.showModal}>
                                    Open Modal
                                </Button>
                                <Modal
                                    title="Basic Modal"
                                    okText="确定"
                                    cancelText="取消"
                                    // footer={null}
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                </Modal>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card>
                                <p style={{}}>
                                    <Button onClick={this.showConfirm4}>确认框</Button>
                                    <Button onClick={this.info}>信息提示</Button>
                                    <Button onClick={this.success}>成功</Button>
                                    <Button onClick={this.error}>失败</Button>
                                    <Button onClick={this.warning}>警告</Button>
                                </p>
                                
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Modals
