import * as React from 'react';
import * as ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader'; // 保存state
import 'babel-polyfill';
import '../node_modules/antd/dist/antd.min.css';
import './index.less';
import AppTest from "./app.test";

const app = document.getElementById('app');

function renderApp(Component)  {
    ReactDOM.render(
        <AppContainer>
            {
                Component
            }
        </AppContainer>, app
    )
}

renderApp(<AppTest />)

if (module.hot) {                                // 热更新时，保存state
    module.hot.accept('./app.test', () => {
        const App = require('./app.test').default;
        renderApp(App);
    })
}

