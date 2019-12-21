/**
 * Created by hao.cheng on 2017/4/26.
 */
import React, { Component } from 'react';
import { Row, Col, Card, Button, Modal} from 'antd';
import BreadcrumbItems from '../../components/breadcrumbitem/BreadcrumbItems'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
// import draftToMarkdown from 'draftjs-to-markdown';
import axios from 'axios'
import md5 from 'js-md5';
class Editors extends Component {
    state = {
        showRichText: false,
        editorContent: '',
        editorState: ''
    };

    handleClearContent = () => {  //清空文本
        this.setState({
            editorState: ''
        })
    }
    handleGetText = () => {    //获取文本内容
        this.setState({
            showRichText: true
        })
    }
    onEditorStateChange = (editorState) => {   //编辑器的状态
        this.setState({
            editorState
        })
    }
    onEditorChange = (editorContent) => {   //编辑器内容的状态
        this.setState({
            editorContent
        })
    }

    componentWillMount() {
        axios({
            url: '**/frontend_sts_token', //获得上传到oss的相应参数
            method: 'GET',
            timeout: 4000,
            headers: {
                'content-type': 'application/json',
                'Authorization': "Bearer token" //后台接口返回的token,怎么上传token，依据后台人员来，我这边是这么传
            },
            params: ''
        }).then((response) => {
            console.log(response.data.data)
            this.setState({
                frontend_sts_token: response.data.data
            })
        })
    }

    // imageUploadCallBack = (file) =>
    //     new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
    //         xhr.open('POST', 'https://api.imgur.com/3/image');
    //         xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
    //         const data = new FormData(); // eslint-disable-line no-undef
    //         data.append('image', file);
    //         xhr.send(data);
    //         xhr.addEventListener('load', () => {
    //             const response = JSON.parse(xhr.responseText);
    //             resolve(response);
    //         });
    //         xhr.addEventListener('error', () => {
    //             const error = JSON.parse(xhr.responseText);
    //             reject(error);
    //         });
    //     });

    imageUploadCallBack = (file) => {
        console.log(file)
        const { frontend_sts_token } = this.state;
        return new Promise((resolve, reject) => {
            let name = md5(file.name) + ".jpg";
            let formData = new FormData();
            let _key = frontend_sts_token.dir + name;
            // 文件名字，可设置路径
            console.log(_key)
            formData.append('key', frontend_sts_token.dir + name);
            // policy规定了请求的表单域的合法性 
            formData.append('policy', frontend_sts_token.policy)
            // Bucket 拥有者的Access Key Id 
            formData.append('OSSAccessKeyId', frontend_sts_token.accessid)
            // 让服务端返回200,不然，默认会返回204 
            formData.append('success_action_status', '200')
            // 根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性 
            formData.append('callback', frontend_sts_token.callback)
            formData.append('signature', frontend_sts_token.signature)
            formData.append('name', name)
            formData.append('file', file)
            console.log(formData)

            axios({
                url: frontend_sts_token.host,
                method: 'post',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then((res) => {
                    console.log(res)
                    //添加到虚线框
                    let imgurl = res.data.filename;
                    let imgObj = {
                        data: {
                            link: res.data.oss_domain + imgurl
                        }
                    }
                    resolve(imgObj)
                })
                .catch((err) => { reject(err) })
        });
    }

    render() {
        const { editorContent, editorState } = this.state;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbItems first="基本组件" second="富文本" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="富文本编辑器" bordered={false}>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="home-toolbar"
                                    wrapperClassName="home-wrapper"
                                    editorClassName="home-editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                    toolbar={{
                                        history: { inDropdown: true },
                                        inline: { inDropdown: false },
                                        list: { inDropdown: true },
                                        textAlign: { inDropdown: true },
                                        image: { uploadCallback: this.imageUploadCallBack },
                                    }}
                                    onContentStateChange={this.onEditorChange}
                                    placeholder="请输入正文~~尝试@哦，有惊喜"
                                    spellCheck
                                    onFocus={() => {
                                        console.log('focus');
                                    }}
                                    onBlur={() => {
                                        console.log('blur');
                                    }}
                                    onTab={() => {
                                        console.log('tab');
                                        return true;
                                    }}
                                    localization={{
                                        locale: 'zh',
                                        translations: { 'generic.add': 'Test-Add' },
                                    }}
                                    mention={{
                                        separator: ' ',
                                        trigger: '@',
                                        caseSensitive: true,
                                        suggestions: [
                                            { text: 'A', value: 'AB', url: 'href-a' },
                                            { text: 'AB', value: 'ABC', url: 'href-ab' },
                                            { text: 'ABC', value: 'ABCD', url: 'href-abc' },
                                            { text: 'ABCD', value: 'ABCDDDD', url: 'href-abcd' },
                                            { text: 'ABCDE', value: 'ABCDE', url: 'href-abcde' },
                                            { text: 'ABCDEF', value: 'ABCDEF', url: 'href-abcdef' },
                                            {
                                                text: 'ABCDEFG',
                                                value: 'ABCDEFG',
                                                url: 'href-abcdefg',
                                            },
                                        ],
                                    }}
                                />

                                <style>{`
                                    .home-editor {
                                        min-height: 300px;
                                    }
                                `}</style>
                            </Card>
                            <Card>
                                <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                                <Button type="primary" onClick={this.handleGetText} style={{ marginLeft: 10 }}>获取html文本</Button>
                            </Card>
                            <Modal
                                title="富文本"
                                visible={this.state.showRichText}
                                onCancel={() => {
                                    this.setState({
                                        showRichText: false
                                    })
                                }}
                                footer={null}>
                                {draftToHtml(editorContent)}
                            </Modal>
                        </div>
                    </Col>
                    {/* <Col className="gutter-row" md={8}>
                        <Card title="同步转换HTML" bordered={false}>
                            <pre>{draftToHtml(editorContent)}</pre>
                        </Card>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <Card title="同步转换MarkDown" bordered={false}>
                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                                {draftToMarkdown(editorContent)}
                            </pre>
                        </Card>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <Card title="同步转换JSON" bordered={false}>
                            <pre style={{ whiteSpace: 'normal' }}>
                                {JSON.stringify(editorContent)}
                            </pre>
                        </Card>
                    </Col> */}

                </Row>

            </div>
        );
    }
}

export default Editors;
