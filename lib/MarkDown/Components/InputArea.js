var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import AceEditor from 'react-ace';
import ace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/ext/language_tools';
import * as React from "react";
var InputArea = /** @class */ (function (_super) {
    __extends(InputArea, _super);
    function InputArea(props) {
        var _this = _super.call(this, props) || this;
        _this.completers = [];
        _this.addCustomCompletions = function () {
            var langTools = ace.acequire("ace/ext/language_tools");
            langTools.addCompleter({
                getCompletions: function (editor, session, pos, prefix, callback) {
                    if (prefix.length === 0) {
                        callback(null, []);
                        return;
                    }
                    if (_this.completers) {
                        callback(null, _this.completers.slice());
                    }
                },
            });
        };
        _this.onChange = function (val) {
            _this.props.onChange(val);
        };
        return _this;
    }
    InputArea.prototype.componentDidMount = function () {
        var editor = this.aceEditor.editor;
        editor.container.style.lineHeight = 1.8;
        editor.renderer.updateFontSize();
        this.completers = this.props.completers;
        this.addCustomCompletions();
        this.disabled = this.props.disabled;
    };
    InputArea.prototype.componentWillReceiveProps = function (nextProps) {
        var thisCompleter = this.props.completers ? this.props.completers : [];
        var nextCompleter = nextProps.completers ? nextProps.completers : [];
        var isChange = thisCompleter.toString() !== nextCompleter.toString();
        this.disabled = nextProps.disabled;
        console.log(nextProps.disabled);
        if (isChange) {
            this.completers = nextProps.completers;
            this.addCustomCompletions();
        }
    };
    InputArea.prototype.render = function () {
        var _this = this;
        return (React.createElement(AceEditor, { mode: 'markdown', theme: 'github', name: "markdown-code", value: this.props.value, onChange: this.onChange, showGutter: false, showPrintMargin: false, editorProps: { $blockScrolling: false }, enableBasicAutocompletion: true, enableLiveAutocompletion: true, ref: function (editor) {
                _this.aceEditor = editor;
            }, readOnly: this.disabled, onScroll: this.props.onScroll, highlightActiveLine: this.props.highlightActiveLine, defaultValue: this.props.defaultValue, height: '100%', width: '100%' }));
    };
    return InputArea;
}(React.Component));
export default InputArea;
//# sourceMappingURL=InputArea.js.map