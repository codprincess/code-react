/**
 * Created by 小公主 on 2019/12/19.
 */
import React, { Component } from 'react'
import {Form, Select, Steps, Input, Button, Divider, BackTop, Alert, Icon, Card} from 'antd'
import './style.less'
const { Step } = Steps;
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        offset: 5
    }
}
class MyForm1 extends Component{
    state = {
        current : 1
    }
    nextStep = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        // console.log('提交数据',userInfo);
        const userInfos = JSON.stringify(userInfo)
        //console.log('提交数据', JSON.stringify(userInfo))
    
         // 存储至本地防止刷新数据丢失
        localStorage.setItem('userInfos', userInfos)
        console.log(userInfo.payAccount)
        this.setState({
            current:this.state.current+1
        })
        console.log('进行下一步',this.state.current)
        localStorage.setItem('current', this.state.current)
        // this.props.form.validateFields((err,value)=>{
        //     if(!err){
        //         // this.props.setInfo(value)
        //         // console.log('12', this.props.setInfo(value))
        //         // this.props.setCurrent(1)
        //     }
        // })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        
        console.log('current',this.state.current)
        return (
            <div>
                {/* <Card title="分步表单"> */}
                <Form className="stepForm" >
                    <Form.Item label="付款账户" {...formItemLayout}>
                        {
                            getFieldDecorator('payAccount',{
                                initialValue:'@alipay.com',
                                rules:[{
                                    required:true,
                                    message:'请选择付款账户'
                                }]
                            })(
                                <Select placeholder="@alipay.com">
                                    <Option value="@alipay.com">
                                        @alipay.com
                                    </Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="收款账户" {...formItemLayout}>
                        <Input.Group compact>
                            <Select defaultValue='alipay' style={{ width: 100 }}>
                                <Option value="alipay">支付宝</Option>
                                <Option value="bank">银行账户</Option>
                            </Select>
                            {
                                getFieldDecorator('receiverAccount',{
                                    initialValue:'test@example.com',
                                    rules:[
                                        { required: true, message: '请输入收款人账户' },
                                        { type: 'email', message: '账户名应为邮箱格式' },
                                    ]
                                })(
                                    <Input style={{ width: 'calc(100% - 100px)'}}></Input>
                                )
                            }
                        </Input.Group>
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="收款人姓名">
                        {getFieldDecorator('receiverName', {
                            initialValue: 'Alex',
                            rules: [{ required: true, message: '请输入收款人姓名' }],
                        })(<Input placeholder="请输入收款人姓名" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="转账金额">
                        {getFieldDecorator('amount', {
                            initialValue: 500,
                            rules: [
                                { required: true, message: '请输入转账金额' },
                                {
                                    pattern: /^(\d+)((?:\.\d+)?)$/,
                                    message: '请输入合法金额数字',
                                },
                            ],
                        })(<Input prefix="￥" placeholder="请输入金额" />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type='primary' onClick={this.nextStep}>下一步</Button>
                    </Form.Item>

                </Form>
                <Divider></Divider>
                {/* </Card> */}
                <div className='desc'>
                    <h3>说明</h3>
                    <h4>转账到支付宝账户</h4>
                    <p>
                        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
                    <h4>转账到银行卡</h4>
                    <p>
                        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
                </div>
                <BackTop visibilityHeight={200} style={{ right: 50 }}></BackTop>
            </div>
        )
    }
}
class MyForm2 extends Component {
    state = {
        loading:false,
        userInfos: localStorage.getItem('userInfos'),
    }

    render() {
        const { getFieldDecorator } = this.props.form
        //const userInfos = localStorage.getItem('userInfos')
        const userInfos = JSON.parse(this.state.userInfos)
        console.log('333', userInfos)
        return (
            <div>
                <Form className="stepForm" id='step2'>
                    <Alert closable showIcon message="确认转账后，资金将直接打入对方账户，无法退回。" style={{ marginBottom: 24 }}></Alert>
                    <Form.Item {...formItemLayout} className='setFormText' label="付款账户">
                         {userInfos.payAccount}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="收款账户">
                        {userInfos.receiverAccount}
                    </Form.Item>

                    <Form.Item {...formItemLayout} className='setFormText' label="收款人姓名">
                        {userInfos.receiverName}
                    </Form.Item>

                    <Form.Item {...formItemLayout} className='setFormText' label="转账金额">
                        <span className='money'>{userInfos.amount}</span>
                        {/* <span>（{digitUppercase(this.props.stepFormStore.info.amount)}）</span> */}
                    </Form.Item>
                    <Divider />

                    <Form.Item {...formItemLayout} label="支付密码" required={false}>
                        {getFieldDecorator('password', {
                            initialValue: '123456',
                            rules: [
                                {
                                    required: true,
                                    message: '需要支付密码才能进行支付',
                                },
                            ],
                        })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 8 }}
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: {
                                span: formItemLayout.wrapperCol.span,
                                offset: formItemLayout.labelCol.span,
                            },
                        }}
                        label=""
                    >
                        <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>提交</Button>
                        {/* <Button onClick={() => this.props.setCurrent(0)} style={{ marginLeft: 8 }}>上一步</Button> */}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

class MyForm3 extends Component{
    state = {
        userInfos: localStorage.getItem('userInfos'),
    }
    render(){
        const userInfos = JSON.parse(this.state.userInfos)
        console.log('333', userInfos)
        return(
            <div id='step3'>
                <div>
                    <div className='icon-box'>
                        <Icon type='check-circle' />
                    </div>
                    <div>
                        <h3 className='success'>操作成功</h3>
                        <p className='success-desc'>预计两小时内到账</p>
                    </div>
                    <Form className='result'>
                        <Form.Item>
                            <Form.Item {...formItemLayout} className='setFormText' label="付款账户">
                                {userInfos.payAccount}
                            </Form.Item>
                            <Form.Item {...formItemLayout} style={{ marginBottom: 18 }} label="收款账户">
                                {userInfos.receiverAccount}
                            </Form.Item>
                            <Form.Item {...formItemLayout} className='setFormText' label="收款人姓名">
                                {userInfos.receiverName}
                            </Form.Item>
                            <Form.Item {...formItemLayout} className='setFormText' label="转账金额">
                                <span className='money'>{userInfos.amount}</span>元
              </Form.Item>
                        </Form.Item>
                    </Form>
                    <div>
                        {/* <Button type='primary' onClick={() => this.props.stepFormStore.setCurrent(0)}>再转一笔</Button> */}
                        <Button style={{ marginLeft: 8 }}>查看账单</Button>
                    </div>
                </div>
            </div>
        )
    }
}
const Form1 = Form.create(MyForm1)(MyForm1)

const Form2 = Form.create(MyForm2)(MyForm2)

const Form3 = Form.create(MyForm3)(MyForm3)

class StepForm extends Component {
    constructor(props){
        super(props)
        console.log('6666', this.state.current)
    }
    state = {
        current:localStorage.getItem('current') || 0
    }
    
    showStep = ()=>{
        switch(this.state.current){
            case 1 :return <Form2></Form2>
            case 2: return <Form3></Form3>
            default:return <Form1></Form1>
        }
    }
    
    componentWillMount(){
        this.showStep()
    }

    render() {
        // console.log('666',this.state.current)
        return (
            <div >
                <Card title='分步表单' bordered={false} style={{ minHeight: 600 }}>
                    <Steps style={styles.steps} current={this.state.current}>
                        <Step title="填写转账信息" />
                        <Step title="确认转账信息" />
                        <Step title="完成" />
                    </Steps>
                    <div>{this.showStep()}</div>
                </Card>
                
            </div>
        )
    }
}

const styles = {
    steps: {
        maxWidth: 750,
        margin: '16px auto'
    },
    desc: {
        padding: '0 56px',
    }
}
export default StepForm
