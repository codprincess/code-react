/**
 * Creact by 小公主 on 2019/12/10.
 */
import React, { Component } from 'react'
import BreadcrumbItems from '../../components/breadcrumbitem/BreadcrumbItems'
import icons from '../../routes/icons'
import { Icon, Row, Col, Card} from 'antd'
import './icons.less'
import Emoji from '../../components/Emoji/index'

class Icons extends Component {
    constructor(props){
        super(props)
        this.state = {
            icons:icons
        }
    }
    componentWillMount(){
       // console.log('图标',icons);
    }
    render() {
        const emojiList = () => {
            let _elements = [];
            for (let i = 1; i < 30; i++) {
                _elements.push(
                    <li key={i}>
                        <Emoji type={'emoji-' + i} />
                        <span>{'emoji-' + i}</span>
                    </li>
                );
            }
            return _elements;
        };
        const iconsList = Object.keys(this.state.icons).map(v =>
            (icons)[v].map((icon, i) => (
                <li key={i}>
                    <Icon type={icon} style={{ fontSize: 20 }} />
                    <p>{icon}</p>
                </li>
            ))
        );

        return (
            <div className="gutter-example">
                <BreadcrumbItems first="基础组件" second="图标"></BreadcrumbItems>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <ul className="icons-list">{emojiList()}</ul>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <ul className="icons-list">{iconsList}</ul>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Icons
