import * as React from "react";
import './index.less';
import 'highlight.js/styles/vs.css';
export declare enum MarkDownMode {
    'EDIT' = 0,
    'VIEW' = 1
}
interface IMarkDownProps {
    mode: MarkDownMode;
    defaultValue?: string;
    disabled?: boolean;
    input?: string;
    options?: {
        highlightCode: boolean;
        showCodeLines: boolean;
        scroll?: boolean;
        escapeHtml?: boolean;
    };
}
interface IMarkDownStates {
    html: string;
    mode: MarkDownMode;
    disabled: boolean;
    input: string;
}
export default class MarkDown extends React.Component<IMarkDownProps, IMarkDownStates> {
    active: string;
    escapeHtml: boolean;
    highlightCode: boolean;
    scroll: boolean;
    showCodeLines: boolean;
    markdown: any;
    constructor(props: IMarkDownProps);
    addNumber(): void;
    highlight(): void;
    mkScroll: () => void;
    htmlScroll: () => void;
    setActive: () => void;
    html2Escape(sHtml: any): any;
    highlightMarkDown: () => void;
    setInput: (input: string | undefined) => void;
    translate: (input: string) => void;
    changeMarkdown: () => void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IMarkDownProps): void;
    render(): JSX.Element;
}
export {};
