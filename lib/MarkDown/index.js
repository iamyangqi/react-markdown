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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import marked from 'marked';
import hljs from 'highlight.js';
import './index.less';
import 'highlight.js/styles/vs.css';
import InputArea from "./Components/InputArea";
import { INDEXTEXT } from "./Utils/Consts";
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
        _this.defaultValue = '';
        _this.mkScroll = function (e) {
            if (_this.active === 'markdown') {
                var ratio = _this.markdownScrollTop / _this.markdownScrollHeight;
                var htmlScrollTop = _this.htmlScrollHeight * ratio;
                $('#htmlContent').scrollTop(htmlScrollTop);
            }
        };
        _this.htmlScroll = function () {
            if (_this.active === 'html') {
                var ratio = _this.htmlScrollTop / _this.htmlScrollHeight;
                var markdownScrollTop = _this.markdownScrollHeight * ratio;
                $('#markdown-code .ace_scrollbar-v').scrollTop(markdownScrollTop);
            }
        };
        _this.setActive = function () {
            $('#htmlContent').on('mouseenter', function () {
                _this.active = 'html';
            });
            $('#markdown-code').on('mouseenter', function () {
                _this.active = 'markdown';
            });
        };
        _this.setDefault = function () {
            var newState = __assign({}, _this.state);
            newState.value = _this.defaultValue;
            _this.setState(newState, function () {
                _this.md2Html(_this.defaultValue);
            });
        };
        _this.md2Html = function (value) {
            var html = marked(value, { breaks: true });
            var newState = __assign({}, _this.state);
            newState.html = html;
            _this.setState(newState, function () {
                if (_this.showCodeLines) {
                    _this.showCodeNumber();
                }
                if (_this.props.onChange) {
                    _this.props.onChange({
                        markdown: _this.state.value,
                        html: _this.state.html
                    });
                }
            });
        };
        _this.onChange = function (val) {
            var newState = __assign({}, _this.state);
            newState.value = val;
            _this.setState(newState, function () {
                _this.md2Html(val);
            });
        };
        _this.state = {
            html: '',
            mode: _this.props.mode,
            disabled: !!_this.props.disabled,
            value: _this.props.value ? _this.props.value : ''
        };
        var _a = _this.props, defaultValue = _a.defaultValue, options = _a.options;
        _this.defaultValue = defaultValue ? defaultValue : INDEXTEXT;
        _this.scroll = options && options.scroll !== undefined ? options.scroll : true;
        _this.showCodeLines = options && options.showCodeLines !== undefined ? options.showCodeLines : true;
        _this.highlightCode = options && options.highlightCode !== undefined ? options.highlightCode : true;
        _this.highlightActiveLine = options && options.highlightActiveLine !== undefined ? options.highlightActiveLine : true;
        if (options && options.split !== null) {
            _this.split = options.split;
        }
        else if (options && options.split === null) {
            _this.split = null;
        }
        else {
            _this.split = React.createElement("div", { className: 'split' });
        }
        return _this;
    }
    Object.defineProperty(MarkDown.prototype, "htmlScrollTop", {
        get: function () {
            return $('#htmlContent').scrollTop();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkDown.prototype, "markdownScrollTop", {
        get: function () {
            return $('#markdown-code .ace_scrollbar-v')[0].scrollTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkDown.prototype, "htmlScrollHeight", {
        get: function () {
            return $('#htmlContent')[0].scrollHeight - $('#htmlContent')[0].clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkDown.prototype, "markdownScrollHeight", {
        get: function () {
            return $('#markdown-code .ace_scrollbar-v')[0].scrollHeight - $('#markdown-code .ace_scrollbar-v')[0].clientHeight;
        },
        enumerable: true,
        configurable: true
    });
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
        this.setDefault();
        if (this.highlightCode) {
            this.highlight();
        }
        if (this.state.mode === MarkDownMode.EDIT && this.scroll) {
            this.setActive();
        }
    };
    MarkDown.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.mode !== nextProps.mode) {
            var newState = __assign({}, this.state);
            newState.mode = nextProps.mode;
            this.setState(newState);
        }
        if (this.props.disabled !== nextProps.disabled) {
            var newState = __assign({}, this.state);
            newState.disabled = !!nextProps.disabled;
            this.setState(newState);
        }
        if (this.state.mode === MarkDownMode.VIEW && this.props.value !== nextProps.value) {
            this.md2Html(nextProps.value ? nextProps.value : '');
        }
    };
    MarkDown.prototype.render = function () {
        return (React.createElement("div", { className: "markdown-wrapper" },
            React.createElement("div", { className: "markdown-row" },
                this.state.mode === MarkDownMode.VIEW
                    ? null
                    : React.createElement("div", { className: "markdown-part" },
                        React.createElement("div", { id: "markdownContent" },
                            React.createElement(InputArea, { highlightActiveLine: this.highlightActiveLine, onChange: this.onChange, disabled: this.state.disabled, defaultValue: this.defaultValue, value: this.state.value, onScroll: this.mkScroll }))),
                this.state.mode === MarkDownMode.VIEW ? null : this.split,
                React.createElement("div", { className: "html-part" },
                    React.createElement("div", { id: "htmlContent", onScroll: this.htmlScroll, dangerouslySetInnerHTML: { __html: this.state.html } })))));
    };
    return MarkDown;
}(React.Component));
export { MarkDown };
//# sourceMappingURL=index.js.map