/**
 * Creact by 小公主 on 2019/12/10.
 */
import React, { Component } from 'react'
import BreadcrumbItems from '../../components/breadcrumbitem/BreadcrumbItems'
import { Row, Col, Card, Spin, Alert, Switch, Icon} from 'antd'
 class Loadings extends Component {
     state = { loading: false };

     toggle = value => {
         this.setState({ loading: value });
     };
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbItems first="基础组件" second="加载中"></BreadcrumbItems>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Spin />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card>
                                <Spin size="small" />
                                <Spin />
                                <Spin size="large" />
                            </Card>
                        </div>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Spin tip="Loading...">
                                    <Alert
                                        message="Alert message title"
                                        description="Further details about the context of this alert."
                                        type="info"
                                    />
                                </Spin>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card>
                                <Spin spinning={this.state.loading} >
                                    <Alert
                                        message="Alert message title"
                                        description="Further details about the context of this alert."
                                        type="info"
                                    />
                                </Spin>
                                <div style={{ marginTop: 16 }}>
                                    Loading state：
                                    <Switch checked={this.state.loading} onChange={this.toggle} />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Icon type="loading" style={{ fontSize: 24 }} spin />;
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card>
                                <Spin spinning={this.state.loading} delay={500}>
                                    <Alert
                                        message="Alert message title"
                                        description="Further details about the context of this alert."
                                        type="info"
                                    />
                                </Spin>
                                <div style={{ marginTop: 16 }}>
                                    Loading state：
                                    <Switch checked={this.state.loading} onChange={this.toggle} />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Loadings