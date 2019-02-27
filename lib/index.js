import * as React from 'react';
import * as ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader'; // 保存state
import 'babel-polyfill';
import '../node_modules/antd/dist/antd.min.css';
import './index.less';
import AppTest from "./app.test";
var app = document.getElementById('app');
function renderApp(Component) {
    ReactDOM.render(React.createElement(AppContainer, null, Component), app);
}
renderApp(React.createElement(AppTest, null));
if (module.hot) { // 热更新时，保存state
    module.hot.accept('./app.test', function () {
        var App = require('./app.test').default;
        renderApp(App);
    });
}
//# sourceMappingURL=index.js.map