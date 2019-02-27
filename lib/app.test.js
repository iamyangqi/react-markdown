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
import * as React from "react";
import { MarkDown, MarkDownMode } from "./MarkDown";
import './app.less';
import { Col, Radio, Row, Switch } from "antd";
var AppTest = /** @class */ (function (_super) {
    __extends(AppTest, _super);
    function AppTest(props) {
        var _this = _super.call(this, props) || this;
        _this.onModeChange = function (e) {
            _this.setState({
                mode: e.target.value
            });
        };
        _this.onDisableChange = function (checked) {
            _this.setState({
                disable: checked
            });
        };
        _this.aa = function (md) {
            console.log(md);
        };
        _this.state = {
            mode: MarkDownMode.VIEW,
            disable: false,
        };
        return _this;
    }
    AppTest.prototype.render = function () {
        return (React.createElement("div", { className: "app" },
            React.createElement(Row, { style: { margin: '10px 3px' } },
                React.createElement(Col, { span: 5 },
                    "\u9009\u62E9\u6A21\u5F0F\uFF1A",
                    React.createElement(Radio.Group, { name: "mode", value: this.state.mode, onChange: this.onModeChange },
                        React.createElement(Radio, { value: MarkDownMode.EDIT }, "\u7F16\u8F91"),
                        React.createElement(Radio, { value: MarkDownMode.VIEW }, "\u9605\u8BFB"))),
                React.createElement(Col, { span: 5 },
                    "\u7981\u6B62\u8F93\u5165\uFF1A",
                    React.createElement(Switch, { onChange: this.onDisableChange, checked: this.state.disable }))),
            React.createElement("div", { style: { flex: 1, overflow: 'hidden' } },
                React.createElement(MarkDown, { mode: this.state.mode, disabled: this.state.disable, onChange: this.aa }))));
    };
    return AppTest;
}(React.Component));
export default AppTest;
//# sourceMappingURL=app.test.js.map