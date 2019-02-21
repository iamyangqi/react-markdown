import * as React from 'react';
import * as ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader'; // 保存state
import 'babel-polyfill';
import '../node_modules/antd/dist/antd.min.css';
import './index.less';
import MarkDown from './MarkDown';

const app = document.getElementById('app');

function renderApp(Component)  {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>, app
    )
}

renderApp(MarkDown)

if (module.hot) {                                // 热更新时，保存state
    module.hot.accept('./MarkDown', () => {
        const App = require('./MarkDown').default;
        renderApp(App);
    })
}

