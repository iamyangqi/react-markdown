var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
            };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import { Row, Col } from "antd";
import marked from 'marked';
import hljs from 'highlight.js';
import './index.less';
import 'highlight.js/styles/vs.css';
import InputArea from "./Components/InputArea";
export var MarkDownMode;
(function (MarkDownMode) {
    MarkDownMode[MarkDownMode["EDIT"] = 0] = "EDIT";
    MarkDownMode[MarkDownMode["VIEW"] = 1] = "VIEW";
})(MarkDownMode || (MarkDownMode = {}));
var MarkDown = /** @class */ (function (_super) {
    __extends(MarkDown, _super);
    function MarkDown(props) {
        var _this = _super.call(this, props) || this;
        _this.active = '';
        _this.mkScroll = function () {
            if (_this.active === 'markdown') {
                var markdownScrollTop = $('#markdownContent').scrollTop();
                var markdownScrollHeight = $('#markdownContent')[0].scrollHeight;
                var htmlScrollHeight = $('#htmlContent')[0].scrollHeight;
                var ratio = markdownScrollTop / markdownScrollHeight;
                var htmlScrollTop = htmlScrollHeight * ratio;
                $('#htmlContent').scrollTop(htmlScrollTop);
            }
        };
        _this.htmlScroll = function () {
            if (_this.active === 'html') {
                var htmlScrollTop = $('#htmlContent').scrollTop();
                var htmlScrollHeight = $('#htmlContent')[0].scrollHeight;
                var markdownScrollHeight = $('#markdownContent')[0].scrollHeight;
                var ratio = htmlScrollTop / htmlScrollHeight;
                var markdownScrollTop = markdownScrollHeight * ratio;
                $('#markdownContent').scrollTop(markdownScrollTop);
            }
        };
        _this.setActive = function () {
            $('#htmlContent').on('mouseenter', function () {
                _this.active = 'html';
            });
            $('#markdownContent').on('mouseenter', function () {
                _this.active = 'markdown';
            });
        };
        _this.setValue = function (val) {
            var newValue = _this.escapeHtml ? _this.html2Escape(val) : val;
            if (_this.state.mode === MarkDownMode.VIEW) {
                _this.setState({
                    html: newValue ? marked(newValue, { breaks: true }) : ''
                });
            }
        };
        _this.md2Html = function (value) {
            var newValue = _this.escapeHtml ? _this.html2Escape(value) : value;
            var html = marked(newValue, { breaks: true });
            _this.setState({
                html: html
            }, function () {
                if (_this.showCodeLines) {
                    _this.showCodeNumber();
                }
            });
        };
        _this.onChange = function (val) {
            _this.md2Html(val);
        };
        _this.state = {
            html: '',
            mode: _this.props.mode,
            disabled: !!_this.props.disabled,
            value: _this.props.value ? _this.props.value : ''
        };
        _this.escapeHtml = _this.props.options && _this.props.options.escapeHtml ? _this.props.options.escapeHtml : true;
        _this.scroll = _this.props.options && _this.props.options.scroll !== undefined ? _this.props.options.scroll : true;
        _this.showCodeLines = _this.props.options && _this.props.options.showCodeLines !== undefined ? _this.props.options.showCodeLines : true;
        _this.highlightCode = _this.props.options && _this.props.options.highlightCode !== undefined ? _this.props.options.highlightCode : true;
        return _this;
    }
    MarkDown.prototype.showCodeNumber = function () {
        $('pre code').each(function () {
            if ($(this).parent().find('.pre-numbering').length === 0) {
                var lines = $(this).text().split('\n').length;
                var $numbering = $('<ul/>').addClass('pre-numbering');
                $(this)
                    .addClass('has-numbering')
                    .parent()
                    .prepend($numbering);
                for (var i = 1; i <= lines; i++) {
                    $numbering.append($('<li/>').text(i));
                }
            }
            ;
        });
    };
    MarkDown.prototype.highlight = function () {
        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });
    };
    MarkDown.prototype.html2Escape = function (sHtml) {
        return sHtml.replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; });
    };
    MarkDown.prototype.componentDidMount = function () {
        if (this.highlightCode) {
            this.highlight();
        }
        if (this.state.mode === MarkDownMode.EDIT && this.scroll) {
            this.setActive();
        }
        // if (this.state.mode === MarkDownMode.EDIT) {
        //     this.markdown.innerHTML = this.props.defaultValue ? this.props.defaultValue : TIPHTML;
        //     this.markdown.innerHTML = TIPHTML;
        //     const input = this.markdown.innerText;
        //     this.translate(input);
        // }
        //
        // if (this.state.mode === MarkDownMode.VIEW) {
        //     this.setValue(this.props.input ? this.props.input : TIPTEXT)
        // }
    };
    MarkDown.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.mode !== nextProps.mode) {
            this.setState({
                mode: nextProps.mode
            });
        }
        if (this.props.disabled !== nextProps.disabled) {
            this.setState({
                disabled: !!nextProps.disabled
            });
        }
        if (this.state.mode === MarkDownMode.VIEW && this.props.value !== nextProps.value) {
            this.setValue(nextProps.value);
        }
    };
    MarkDown.prototype.render = function () {
        return (React.createElement("div", { className: "markdown-wrapper" }, React.createElement(Row, { className: "markdown-row" }, this.state.mode === MarkDownMode.VIEW
            ? null
            : React.createElement(Col, { span: 12 }, React.createElement("div", { id: "markdownContent" }, React.createElement(InputArea, { defaultValue: '', onChange: this.onChange }))), React.createElement(Col, { span: 12 }, React.createElement("div", { id: "htmlContent", onScroll: this.htmlScroll, dangerouslySetInnerHTML: { __html: this.state.html } })))));
    };
    return MarkDown;
}(React.Component));
export default MarkDown;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map