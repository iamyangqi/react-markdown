import * as React from "react";
import './index.less';
import {Input, Row, Col} from "antd";
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';

export enum MarkDownMode {   // markdown的两种模式： EDIT - 编辑    VIEW - 阅读
    'EDIT', 'VIEW'
}

interface IMarkDownProps {
    mode: MarkDownMode,         // 指定模式
    disabled?: boolean,         // 编辑模式下是否禁止编辑
    input?: string,             // 阅读模式下设定需要转化的markdown语句
    options?: {
        highlightCode: boolean, // code 组件是否高亮代码
        showCodeLines: boolean, // code 组件是否显示行数
        scroll?: boolean,       // 编辑模式下两边代码是否同步
        escapeHtml?: boolean,   // 是否转义HTML
    }
}

interface IMarkDownStates {
    html: string;
    mode: MarkDownMode;
    disabled: boolean;
    input: string;
}

export default class MarkDown extends React.Component<IMarkDownProps, IMarkDownStates> {
    active: string = '';
    escapeHtml: boolean;
    highlightCode: boolean;
    scroll: boolean;
    showCodeLines: boolean;

    constructor(props: IMarkDownProps) {
        super(props);

        this.state =  {
            html: '',
            mode: this.props.mode,
            disabled: !!this.props.disabled,
            input: this.props.input ? this.props.input : ''
        }

        this.escapeHtml = this.props.options && this.props.options.escapeHtml ? this.props.options.escapeHtml : false;
        this.scroll = this.props.options && this.props.options.scroll !== undefined ? this.props.options.scroll : true;
        this.showCodeLines = this.props.options && this.props.options.showCodeLines !== undefined ? this.props.options.showCodeLines : true;
        this.highlightCode = this.props.options && this.props.options.highlightCode !== undefined ? this.props.options.highlightCode : true;
    }

    addNumber() {
        $('pre code').each(function(){
            if ($(this).parent().find('.pre-numbering').length === 0) {
                const lines = $(this).text().split('\n').length;
                const $numbering = $('<ul/>').addClass('pre-numbering');
                $(this)
                    .addClass('has-numbering')
                    .parent()
                    .prepend($numbering);
                for(let i = 1; i <= lines; i++){
                    $numbering.append($('<li/>').text(i));
                }
            };
        });
    }

    highlight() {
        marked.setOptions({
            highlight (code) {
                return hljs.highlightAuto(code).value
            }
        })
    }

    mkScroll = () => {
        if (this.active === 'markdown') {
            const markdownScrollTop = $('#markdownContent').scrollTop()!;
            const markdownScrollHeight = $('#markdownContent')[0].scrollHeight;
            const htmlScrollHeight = $('#htmlContent')[0].scrollHeight;
            const ratio = markdownScrollTop / markdownScrollHeight;
            const htmlScrollTop = htmlScrollHeight * ratio;
            $('#htmlContent').scrollTop(htmlScrollTop);
        }
    }

    htmlScroll = () => {
        if (this.active === 'html') {
            const htmlScrollTop = $('#htmlContent').scrollTop()!;
            const htmlScrollHeight = $('#htmlContent')[0].scrollHeight;
            const markdownScrollHeight = $('#markdownContent')[0].scrollHeight;
            const ratio = htmlScrollTop / htmlScrollHeight;
            const markdownScrollTop = markdownScrollHeight * ratio;
            $('#markdownContent').scrollTop(markdownScrollTop);
        }
    }

    setActive = () => {
        $('#htmlContent').on('mouseenter', () => {
            this.active = 'html';
        })

        $('#markdownContent').on('mouseenter', () => {
            this.active = 'markdown';
        })
    }

    html2Escape(sHtml) {
        return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
    }

    setInput = (input: string | undefined) => {
        const newInput = this.escapeHtml ? this.html2Escape(input) : input;

        if (this.state.mode === MarkDownMode.VIEW) {
            this.setState({
                html: newInput ? marked(newInput, {breaks: true}) : ''
            })
        }
    }

    changeMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        const newInput = this.escapeHtml ? this.html2Escape(input) : input;

        const html = marked(newInput, {breaks: true});
        this.setState({
            html
        }, () => {
            if (this.showCodeLines) {
                this.addNumber()
            }
        })
    }

    componentDidMount() {
        if (this.highlightCode) {
            this.highlight();
        }

        if (this.state.mode === MarkDownMode.EDIT && this.scroll) {
            this.setActive();
        }

        if (this.state.mode === MarkDownMode.VIEW) {
            this.setInput(this.props.input)
        }
    }

    componentWillReceiveProps(nextProps: IMarkDownProps) {
        if (this.props.mode !== nextProps.mode) {
            this.setState({
                mode: nextProps.mode
            })
        }

        if (this.props.disabled !== nextProps.disabled) {
            this.setState({
                disabled: !!nextProps.disabled
            })
        }

        if (this.state.mode === MarkDownMode.VIEW && this.props.input !== nextProps.input) {
            this.setInput(nextProps.input)
        }
    }

    render() {
        return (
            <div className="markdown-wrapper">
                <Row className="markdown-row">
                    {
                        this.state.mode === MarkDownMode.VIEW
                            ? null
                            : <Col span={12}>
                                 <Input.TextArea id="markdownContent" onChange={this.changeMarkdown} onScroll={this.mkScroll}
                                                disabled={this.state.disabled}/>
                              </Col>
                    }
                    <Col span={12}>
                        <div id="htmlContent" onScroll={this.htmlScroll} dangerouslySetInnerHTML={{__html: this.state.html}} />
                    </Col>
                </Row>
            </div>
        )
    }
}