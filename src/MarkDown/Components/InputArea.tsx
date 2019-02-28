import * as React from "react";
import '../Utils/codemirror/lib/codemirror.css'
import '../Utils/codemirror/mode/markdown/markdown'
import '../Utils/codemirror/addon/hint/show-hint.css'
import '../Utils/codemirror/addon/hint/show-hint'
import '../Utils/codemirror/addon/hint/anyword-hint'
import '../Utils/codemirror/addon/comment/comment'
import '../Utils/codemirror/keymap/sublime'
import CodeMirror from '../Utils/codemirror/lib/codemirror'


export interface InputAreaProps {
    value: string;
    onRef: (ref: any) => void;
    defaultValue?: string;
    allowDropFile?: boolean;
}

export default class InputArea extends React.Component<InputAreaProps> {
    editor: any;
    codeDom: any;

    constructor(props: InputAreaProps) {
        super(props);
    }

    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(this.codeDom, {
            lineNumbers: false,
            lineWrapping: false,
            keyMap: 'sublime',
            indentUnit: 4,
            tabSize: 4,
            mode: 'markdown',
            showCursorWhenSelecting: true,
            dragDrop: this.props.allowDropFile,
        })

        if (this.props.defaultValue) {
            this.editor.setValue(this.props.defaultValue)
        } else {
            this.editor.setValue(this.props.value)
        }

        this.props.onRef(this.editor)
    }

    componentWillReceiveProps(nextProps: InputAreaProps) {
        if (this.props.value !== nextProps.value) {
            this.editor.setValue(nextProps.value)
        }
    }

    render() {
        return (
            <textarea ref={p => { this.codeDom = p }}/>
        )
    }
}