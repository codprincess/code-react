import React, { Component } from 'react'
import { Row, Col, Card } from 'antd';
import BreadcrumbItems from '../../components/breadcrumbitem/BreadcrumbItems'
import Draggable from 'react-draggable';
export default class Drag extends Component {
    state = {
        activeDrags: 0,
        deltaPosition: {
            x: 0,
            y: 0,
        },
        controlledPosition: {
            x: -400,
            y: 200,
        },
    };
    onStart = () => {
        let { activeDrags } = this.state;
        this.setState({ activeDrags: ++activeDrags });
    };
    onStop = () => {
        let { activeDrags } = this.state;
        this.setState({ activeDrags: --activeDrags });
    };
    handleDrag = (e, ui) => {
        const { x, y } = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            },
        });
    };
    render() {
         const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        const { deltaPosition } = this.state;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbItems first="基础组件" second="拖拽"></BreadcrumbItems>
                <Row gutter={16}>
                    <Col className="gutter-row" md={6}>
                        <div className="gutter-box">
                            <Draggable {...dragHandlers}>
                                <Card bordered={false} className={'dragDemo'}>
                                    I can be dragged anywhere
                                </Card>
                            </Draggable>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        <div className="gutter-box">
                            <Draggable axis="x" {...dragHandlers}>
                                <Card bordered={false} className={'dragDemo'}>
                                    I can only be dragged horizonally (x axis)
                                </Card>
                            </Draggable>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        <div className="gutter-box">
                            <Draggable axis="y" {...dragHandlers}>
                                <Card bordered={false} className={'dragDemo'}>
                                    I can only be dragged vertically (y axis)
                                </Card>
                            </Draggable>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        <div className="gutter-box">
                            <Draggable onDrag={this.handleDrag} {...dragHandlers}>
                                <Card bordered={false} className={'dragDemo'}>
                                    <div>I track my deltas</div>
                                    <div>
                                        x: {deltaPosition.x.toFixed(0)}, y:{' '}
                                        {deltaPosition.y.toFixed(0)}
                                    </div>
                                </Card>
                            </Draggable>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        <div className="gutter-box">
                            <Draggable handle="strong" {...dragHandlers}>
                                <Card bordered={false} className={'dragDemo no-cursor'}>
                                    <strong className="cursor-move">
                                        <div>Drag here</div>
                                    </strong>
                                    <div>You must click my handle to drag me</div>
                                </Card>
                            </Draggable>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        <div className="gutter-box">
                            <Draggable cancel="strong" {...dragHandlers}>
                                <Card bordered={false} className={'dragDemo'}>
                                    <strong className="no-cursor">
                                        <div>Can't drag here</div>
                                    </strong>
                                    <div>Dragging here works</div>
                                </Card>
                            </Draggable>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={6}>
                        <div className="gutter-box">
                            <Draggable
                                bounds={{ top: -100, left: -100, right: 100, bottom: 100 }}
                                {...dragHandlers}
                            >
                                <Card bordered={false} className={'dragDemo'}>
                                    <div>I can only be moved 100px in any direction.</div>
                                </Card>
                            </Draggable>
                        </div>
                    </Col>
                </Row>
                <style>{`
                    .dragDemo {
                        height: 180px;
                    }
                `}</style>
            </div>
        )
    }
}
