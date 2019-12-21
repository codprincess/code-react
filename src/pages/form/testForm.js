/**
 * Created by 小公主 on 2019/12/19.
 */
import React, { Component } from 'react'
import { Steps, Button, message } from 'antd';
// import './style.less'
const { Step } = Steps;

const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];
class TestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    //最笨蛋的做法就是将所有数据放在同一个页面,
    //不做表单的分离

    render() {
        const { current } = this.state;
        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div style={styles.stepscontent}>
                    {steps[current].content}
                </div>
                <div style={{marginTop: "24px"}}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
            </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
            </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
            </Button>
                    )}
                </div>
            </div>
        )
    }
}

const styles = {
    stepscontent :{
        marginTop: 16,
        border: "1px dashed #e9e9e9",
        borderRadius: 6,
        backgroundColor: '#fafafa',
        minHeight: 200,
        textAlign: "center",
        paddingTop: 80
    }
   
}



export default TestForm
