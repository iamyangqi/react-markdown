import AceEditor from 'react-ace';
import ace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/ext/language_tools';
import * as React from "react";

export interface Completer {
    name: string;
    value: string;
    score: number;
    meta: string;
    caption?: string;
    type?: string;
}

export interface InputAreaProps {
    completers?: Completer[];
    value: string;
    onChange: (val: string) => void;
    onScroll: (e: any) => void;
    defaultValue?: string;
    highlightActiveLine?: boolean;
    disabled: boolean;
    height?: string; //
}

export default class InputArea extends React.Component<InputAreaProps> {
    aceEditor: any;
    completers?: Completer[] = [];
    disabled: boolean;

    constructor(props: InputAreaProps) {
        super(props);
    }

    addCustomCompletions = () => {
        const langTools = ace.acequire("ace/ext/language_tools");

        langTools.addCompleter({
            getCompletions: (
                editor: any,
                session: any,
                pos: any,
                prefix: any,
                callback: (p: null, v: Completer[]) => void
            ) => {
                if (prefix.length === 0) {
                    callback(null, []);
                    return;
                }
                if (this.completers) {
                    callback(null, this.completers.slice());
                }
            },
        });
    };

    onChange = (val: any) => {
        this.props.onChange(val);
    }

    componentDidMount() {
        const editor = this.aceEditor.editor;
        editor.container.style.lineHeight = 1.8;
        editor.renderer.updateFontSize();
        this.completers = this.props.completers!;
        this.addCustomCompletions();
        this.disabled = this.props.disabled;
    }

    componentWillReceiveProps(nextProps: InputAreaProps) {
        const thisCompleter = this.props.completers ? this.props.completers : [];
        const nextCompleter = nextProps.completers ? nextProps.completers : [];
        const isChange = thisCompleter.toString() !== nextCompleter.toString();
        this.disabled = nextProps.disabled;
        if (isChange) {
            this.completers = nextProps.completers!;
            this.addCustomCompletions();
        }
    }

    render() {
        return (
            <AceEditor
                mode={'markdown'}
                theme={'github'}
                name={`markdown-code`}
                value={this.props.value}
                onChange={this.onChange}
                showGutter={false}
                showPrintMargin={false}
                editorProps={{ $blockScrolling: false }}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                ref={editor => {
                    this.aceEditor = editor;
                }}
                readOnly={this.disabled}
                onScroll={this.props.onScroll}
                highlightActiveLine={this.props.highlightActiveLine}
                defaultValue={this.props.defaultValue}
                height={this.props.height ? this.props.height : '100%'}
                width={'100%'} />
        )
    }
}