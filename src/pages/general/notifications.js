/**
 * Creact by 小公主 on 2019/12/10.
 */
import React, { Component } from 'react'
import BreadcrumbItems from '../../components/breadcrumbitem/BreadcrumbItems'
import { Row, Col, Card, Button, notification, Select} from 'antd'
const { Option } = Select;
const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
export default class Notifications extends Component {
    openNotification=()=>{
        notification.open({
            // placement: 'bottomRight',
            // bottom: 50,
            message: 'Notification Title',
            description:
                '最简单的用法，4.5 秒后自动关闭。最简单的用法，4.5 秒后自动关闭。',
        });
    }
    openNotification2=()=>{
        const args = {
            // placement: 'bottomRight',
            // bottom: 50,
            message: 'Notification Title',
            description:
                '自定义通知框自动关闭的延时，默认4.5s，取消自动关闭只要将该值设为 0 即可',
            duration: 0,
        };
        notification.open(args);
    }

    openNotificationWithIcon = (type) => {
        notification[type]({
            // placement: 'bottomRight',
            // bottom: 50,
            message: 'Notification Title',
            description:
                '成功失败消息等',
        });
    };
    openNotification3 = () => {
        const key = `open${Date.now()}`;
        const btnClick = function () {
            // to hide notification box
            notification.close(key);
        };
        const btn = (
            <Button type="primary" size="small" onClick={btnClick}>
                Confirm
            </Button>
        );
        notification.open({
            // placement: 'bottomRight',
            // bottom: 50,
            message: 'Notification Title',
            description:
                '自定义按钮',
            btn,
            key,
            onClose: this.close,
        });
    };
    close = () => {
        console.log(
            '关闭'
        );
    };
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbItems first="基础组件" second="通知提醒框"></BreadcrumbItems>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" onClick={this.openNotification}>
                                    基本用法-4.5秒关闭
                                </Button>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" onClick={this.openNotification2}>
                                    取消自动关闭
                                </Button>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button
                                    type="primary"
                                    onClick={() => this.openNotificationWithIcon('success')}
                                >
                                    成功
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => this.openNotificationWithIcon('info')}
                                >
                                    提醒
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => this.openNotificationWithIcon('warning')}
                                >
                                    警告
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => this.openNotificationWithIcon('error')}
                                >
                                    失败
                                </Button>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" onClick={this.openNotification3}>
                                    自定义按钮
                                </Button>
                            </Card>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Select
                                    defaultValue="topRight"
                                    style={{ width: 120, marginRight: 10 }}
                                    onChange={(val) => {
                                        notification.config({
                                            placement: val,
                                        });
                                    }}
                                >
                                    {options.map(val => (
                                        <Option key={val} value={val}>
                                            {val}
                                        </Option>
                                    ))}
                                </Select>
                                <Button type="primary" onClick={this.openNotification}>
                                    打开消息通知
                                </Button>
                            </Card>
                        </div>
                    </Col>

                </Row>
                <style>
                    {`
                        .ant-btn-primary {
                            margin-left: 10px !important;
                        }
                    `}
                </style>
            </div>
        )
    }
}
