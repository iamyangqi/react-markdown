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
import './index.less';
import { Row, Col } from "antd";
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';
import { TIPTEXT, TIPHTML } from './consts';
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
        _this.setInput = function (input) {
            var newInput = _this.escapeHtml ? _this.html2Escape(input) : input;
            if (_this.state.mode === MarkDownMode.VIEW) {
                _this.setState({
                    html: newInput ? marked(newInput, { breaks: true }) : ''
                });
            }
        };
        _this.translate = function (input) {
            var newInput = _this.escapeHtml ? _this.html2Escape(input) : input;
            var html = marked(newInput, { breaks: true });
            _this.setState({
                html: html
            }, function () {
                if (_this.showCodeLines) {
                    _this.addNumber();
                }
            });
        };
        _this.changeMarkdown = function () {
            var input = _this.markdown.innerText;
            _this.translate(input);
        };
        _this.state = {
            html: '',
            mode: _this.props.mode,
            disabled: !!_this.props.disabled,
            input: _this.props.input ? _this.props.input : ''
        };
        _this.escapeHtml = _this.props.options && _this.props.options.escapeHtml ? _this.props.options.escapeHtml : false;
        _this.scroll = _this.props.options && _this.props.options.scroll !== undefined ? _this.props.options.scroll : true;
        _this.showCodeLines = _this.props.options && _this.props.options.showCodeLines !== undefined ? _this.props.options.showCodeLines : true;
        _this.highlightCode = _this.props.options && _this.props.options.highlightCode !== undefined ? _this.props.options.highlightCode : true;
        return _this;
    }
    MarkDown.prototype.addNumber = function () {
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
        if (this.state.mode === MarkDownMode.EDIT) {
            this.markdown.innerHTML = this.props.defaultValue ? this.props.defaultValue : TIPHTML;
            this.markdown.innerHTML = TIPHTML;
            var input = this.markdown.innerText;
            this.translate(input);
        }
        if (this.state.mode === MarkDownMode.VIEW) {
            this.setInput(this.props.input ? this.props.input : TIPTEXT);
        }
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
        if (this.state.mode === MarkDownMode.VIEW && this.props.input !== nextProps.input) {
            this.setInput(nextProps.input);
        }
    };
    MarkDown.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "markdown-wrapper" }, React.createElement(Row, { className: "markdown-row" }, this.state.mode === MarkDownMode.VIEW
            ? null
            : React.createElement(Col, { span: 12 }, React.createElement("div", { id: "markdownContent", onInput: this.changeMarkdown, onScroll: this.mkScroll, ref: function (ref) { return _this.markdown = ref; }, contentEditable: true })), React.createElement(Col, { span: 12 }, React.createElement("div", { id: "htmlContent", onScroll: this.htmlScroll, dangerouslySetInnerHTML: { __html: this.state.html } })))));
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
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map