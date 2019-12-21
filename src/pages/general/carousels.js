import React, { Component } from 'react'
import BreadcrumbItems from '../../components/breadcrumbitem/BreadcrumbItems'
import { Row, Col, Card, Carousel} from 'antd'
class Carousels extends Component {
    onChange = (a, b, c)=>{
        console.log(a, b, c);
    }
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbItems first="基础组件" second="轮播图"></BreadcrumbItems>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="最基本的用法">
                                <Carousel afterChange={this.onChange}>
                                    <div>
                                        <h3>1</h3>
                                    </div>
                                    <div>
                                        <h3>2</h3>
                                    </div>
                                    <div>
                                        <h3>3</h3>
                                    </div>
                                    <div>
                                        <h3>4</h3>
                                    </div>
                                </Carousel>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="最基本的用法">
                                <Carousel autoplay={true}>
                                    <div>
                                        <h3>1</h3>
                                    </div>
                                    <div>
                                        <h3>2</h3>
                                    </div>
                                    <div>
                                        <h3>3</h3>
                                    </div>
                                    <div>
                                        <h3>4</h3>
                                    </div>
                                </Carousel>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <style>
                    {`
                    .ant-carousel .slick-slide {
                        text-align: center;
                        height: 160px;
                        line-height: 160px;
                        background: rgb(60, 46, 61);
                        overflow: hidden;
                    }

                    .ant-carousel .slick-slide h3 {
                        color: #fff;
                    }
                        
                    .ant-carousel .slick-dots li.slick-active button {
                        width: 24px;
                        background: #44b549;
                        opacity: 1;
                    }
                    `  

                    
                    }
                </style>
            </div>
        )
    }
}

export default Carousels
