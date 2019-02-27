import 'brace/mode/markdown';
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
}
export default class InputArea extends React.Component<InputAreaProps> {
    aceEditor: any;
    completers?: Completer[];
    addCustomCompletions: () => void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: InputAreaProps): void;
    render(): JSX.Element;
}
