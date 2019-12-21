import React, { Component } from 'react';

// 插件
import axios from 'axios';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import md5 from 'js-md5';

// 组件
// import CustomOption from './customOption'

// 样式

// import './index.less';


export default class Editors extends Component {
    constructor(props) {
        super(props);
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
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
    onEditorStateChange = Function = (editorState) => {
        this.setState({
            editorState
        })
    }
    uploadImageCallBack = Function = (file) => {
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
        console.log(EditorState.createEmpty())
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={this.onEditorStateChange}
                    localization={{
                        locale: 'zh',
                    }}
                    toolbar={{
                        options: ['inline', 'colorPicker', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                        colorPicker: {
                            className: undefined,
                            component: undefined,
                            popupClassName: undefined,
                            colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                                'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                                'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                                'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                                'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                                'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
                        },
                        image: {
                            urlEnabled: true,
                            uploadEnabled: true,
                            alignmentEnabled: true,
                            uploadCallback: this.uploadImageCallBack,
                            previewImage: true,
                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                            alt: { present: true, mandatory: true }
                        }
                    }}
                />
                <textarea
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />
            </div>
        )
    }
}