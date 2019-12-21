/**
 * Creact by 小公主 on 2019/12/18.
 */
import React, { Component } from 'react'
import { 
    Card, 
    Form, 
    Input, 
    Radio, 
    InputNumber, 
    Select, 
    DatePicker, 
    Switch, 
    TimePicker ,
    Upload,
    Icon,
    message,
    Button,
    Checkbox
} from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import RadioGroup from 'antd/lib/radio/group';
const Option = Select.Option;
const TextArea = Input.TextArea;
class Register extends Component {
    state={
        loading:false,
        fileList: []
    }
    handleSubmit=()=>{
        let userInfo = this.props.form.getFieldsValue();
        // console.log('提交数据',userInfo);
        console.log('提交数据',JSON.stringify(userInfo))
        message.success(`${userInfo.username} 恭喜你，中奖一亿,请给个star吧!!`)
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    render() {
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        const { getFieldDecorator } = this.props.form;
        const rowObject = {minRows: 4, maxRows: 6}
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <Card title="表单注册">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('username',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空O(∩_∩)O哈哈~'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名"></Input>
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'密码不能为空o(╥﹏╥)o'
                                        }
                                    ]
                                })(
                                    <Input type="password" placeholder="请输入密码"></Input>
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}> 
                            {
                                getFieldDecorator('sex',{
                                    initialValue:''
                                })(
                                    <RadioGroup>
                                        <Radio value="1">女</Radio>
                                        <Radio value="2">男</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue:18
                                })(
                                    <InputNumber></InputNumber>
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    initialValue:'2'
                                })(
                                    <Select>
                                        <Option value="1">咸鱼</Option>
                                        <Option value="2">马云</Option>
                                        <Option value="3">东哥</Option>
                                        <Option value="4">马化腾</Option>
                                        <Option value="5">李彦宏</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest',{
                                    initialValue:['1','2']
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">eating</Option>
                                        <Option value="2">sleeping</Option>
                                        <Option value="3">coding</Option>
                                        <Option value="4">running</Option>
                                        <Option value="5">singing</Option>
                                        <Option value="6">playing</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried',{
                                    initialValue: true,
                                    valuePropName: 'checked'
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{

                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    ></DatePicker>
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue:"南宁帝王大厦"
                                })(
                                    <TextArea
                                        autoSize={rowObject}
                                    ></TextArea>
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time')
                                (
                                    <TimePicker></TimePicker>
                                )
                            }
                        </FormItem>

                        <FormItem label="头像" {...formItemLayout} >
                            {
                                getFieldDecorator('imageUrl',{
                                    valuePropName: 'fileList'
                                })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"

                                        onChange={this.handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>
                                )
                            }
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('userImg',{
                                    initialValue: true,
                                    valuePropName: 'checked'
                                })(
                                    <Checkbox>我已阅读过<a href="#">协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(Register)
