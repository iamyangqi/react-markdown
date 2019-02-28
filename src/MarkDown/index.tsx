import * as React from "react";
import marked from 'marked';
import hljs from 'highlight.js';
import './index.less';
import 'highlight.js/styles/vs.css';
import InputArea from "./Components/InputArea";
import {INDEXTEXT} from "./Utils/Consts";

export enum MarkDownMode {   // markdown的两种模式： EDIT - 编辑    VIEW - 阅读
    'EDIT', 'VIEW'
}

export interface IMarkDownChange {
    markdown: string,
    html: string,
}

interface IMarkDownProps {
    mode: MarkDownMode,                  // 指定模式
    defaultValue?: string,               // 设定默认值
    disabled?: boolean,                  // 编辑模式下是否禁止编辑
    value?: string,                      // 阅读模式下设定需要转化的markdown语句
    onChange?: (IMarkDownChange) => void,// 编辑模式下获取文本
    height?: string,
    options?: {
        highlightActiveLine: boolean,    // 高亮光标所在的行
        highlightCode: boolean,          // code 组件是否高亮代码
        showCodeLines: boolean,          // code 组件是否显示行数
        scroll?: boolean,                // 编辑模式下两边代码是否同步
        split?: React.Component | null,  // 自定义编辑模式下的split模块
    }
}

interface IMarkDownStates {
    html: string;
    mode: MarkDownMode;
    disabled: boolean;
    value: string;
}

export class MarkDown extends React.Component<IMarkDownProps, IMarkDownStates> {
    active: string = '';
    defaultValue: string = '';
    highlightCode: boolean;
    highlightActiveLine: boolean;
    scroll: boolean;
    showCodeLines: boolean;
    markdown: any;
    split: React.ReactNode | null;
    disabled: boolean;

    constructor(props: IMarkDownProps) {
        super(props);

        this.state =  {
            html: '',
            mode: this.props.mode,
            disabled: !!this.props.disabled,
            value: this.props.value ? this.props.value : ''
        }

        const {defaultValue, options} = this.props;

        this.defaultValue = defaultValue ? defaultValue : INDEXTEXT;
        this.scroll = options && options.scroll !== undefined ? options.scroll : true;
        this.showCodeLines = options && options.showCodeLines !== undefined ? options.showCodeLines : true;
        this.highlightCode = options && options.highlightCode !== undefined ? options.highlightCode : true;
        this.highlightActiveLine = options && options.highlightActiveLine !== undefined ? options.highlightActiveLine : true;

        if (options && options.split !== null) {
            this.split = options.split
        } else if (options && options.split === null) {
            this.split = null
        } else {
            this.split = <div className='split'/>
        }
    }

    get htmlScrollTop() {
        return $('#htmlContent').scrollTop()!;
    }

    get markdownScrollTop() {
        return $('#markdown-code .ace_scrollbar-v')[0].scrollTop;
    }

    get htmlScrollHeight() {
        return $('#htmlContent')[0].scrollHeight - $('#htmlContent')[0].clientHeight;
    }

    get markdownScrollHeight() {
        return $('#markdown-code .ace_scrollbar-v')[0].scrollHeight - $('#markdown-code .ace_scrollbar-v')[0].clientHeight;
    }

    showCodeNumber() {
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

    mkScroll = (e: any) => {
        if (this.active === 'markdown') {
            const ratio = this.markdownScrollTop / this.markdownScrollHeight;
            const htmlScrollTop = this.htmlScrollHeight * ratio;
            $('#htmlContent').scrollTop(htmlScrollTop);
        }
    }

    htmlScroll = () => {
        if (this.active === 'html') {
            const ratio = this.htmlScrollTop / this.htmlScrollHeight;
            const markdownScrollTop = this.markdownScrollHeight * ratio;
            $('#markdown-code .ace_scrollbar-v').scrollTop(markdownScrollTop);
        }
    }

    setActive = () => {
        $('#htmlContent').on('mouseenter', () => {
            this.active = 'html';
        })

        $('#markdown-code').on('mouseenter', () => {
            this.active = 'markdown';
        })
    }

    setDefault = () => {
        const newState = {...this.state}
        newState.value = this.defaultValue;

        this.setState(newState, () => {
            this.md2Html(this.defaultValue)
        })
    }

    html2Escape(sHtml) {
        return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
    }

    md2Html = (value: string) => {
        const html = marked(value, {breaks: true});
        const newState = {...this.state}
        newState.html = html;

        this.setState(newState, () => {
            if (this.showCodeLines) {
                this.showCodeNumber()
            }

            if (this.props.onChange) {
                this.props.onChange({
                    markdown: this.state.value,
                    html: this.state.html
                })
            }
        })
    }

    onChange = (val: string) => {
        const newState = {...this.state}
        newState.value = val;

        this.setState(newState, () => {
            this.md2Html(val);
        })



    }

    componentDidMount() {
        this.setDefault();

        if (this.highlightCode) {
            this.highlight();
        }

        if (this.state.mode === MarkDownMode.EDIT && this.scroll) {
            this.setActive();
        }
    }

    componentWillReceiveProps(nextProps: IMarkDownProps) {
        if (this.props.mode !== nextProps.mode) {
            const newState = {...this.state};
            newState.mode = nextProps.mode;
            this.setState(newState)
        }

        if (this.props.disabled !== nextProps.disabled) {
            const newState = {...this.state};
            newState.disabled = !!nextProps.disabled
            this.setState(newState)
        }

        if (this.state.mode === MarkDownMode.VIEW && this.props.value !== nextProps.value) {
            this.md2Html(nextProps.value ? nextProps.value : '')
        }
    }

    render() {
        return (
            <div className="markdown-wrapper">
                <div className="markdown-row">
                    {
                        this.state.mode === MarkDownMode.VIEW
                            ? null
                            : <div className="markdown-part">
                                <div id="markdownContent" >
                                    <InputArea
                                        highlightActiveLine={this.highlightActiveLine} onChange={this.onChange}
                                        disabled={this.state.disabled} defaultValue={this.defaultValue}
                                        value={this.state.value} onScroll={this.mkScroll} height={this.props.height}/>
                                    </div>
                                </div>
                    }
                    {this.state.mode === MarkDownMode.VIEW ? null : this.split}
                    <div className="html-part">
                        <div id="htmlContent" onScroll={this.htmlScroll} dangerouslySetInnerHTML={{__html: this.state.html}} />
                    </div>
                </div>
            </div>
        )
    }
}