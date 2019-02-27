# 欢迎使用 react-markdown 编辑阅读器
------
### 安装方法
```
npm install react-markdown-ts;
```
### 或者
```
yarn add react-markdown-ts;
```

### 使用方法
```
import * as React from "react";
import {IMarkDownChange, MarkDown, MarkDownMode} from "./MarkDown";

export default class AppTest extends React.Component {
    onChange = (md: IMarkDownChange) => {
        console.log(md);
    }

    render() {
        return (
           <MarkDown mode={this.state.mode} onChange={this.onChange}/>
        )
    }
}
```

### props

interface IMarkDownProps {
    mode: MarkDownMode,                  // 指定模式
    defaultValue?: string,               // 设定默认值
    disabled?: boolean,                  // 编辑模式下是否禁止编辑
    value?: string,                      // 阅读模式下设定需要转化的markdown语句
    onChange?: (IMarkDownChange) => void,// 编辑模式下获取文本
    options?: {
        highlightActiveLine: boolean,    // 高亮光标所在的行
        highlightCode: boolean,          // code 组件是否高亮代码
        showCodeLines: boolean,          // code 组件是否显示行数
        scroll?: boolean,                // 编辑模式下两边代码是否同步
        split?: React.Component | null,  // 自定义编辑模式下的split模块
    }
}

您可以使用 **react-markdown-ts**

### 1. 实时同步预览

我们将 React Markdown 的主界面一分为二，左边为**编辑区**，右边为**预览区**，在编辑区的操作会实时地渲染到预览区方便查看最终的版面效果，并且如果你在其中一个区拖动滚动条，我们有一个巧妙的算法把另一个区的滚动条同步到等价的位置，超酷！

### 2. 编辑模式

独立的编辑模式，这是一个极度简洁的写作环境，所有可能会引起分心的元素都已经被挪除，超清爽！

### 3. 阅读模式

进入独立的阅读模式界面，我们在版面渲染上的每一个细节：字体，字号，行间距，前背景色都倾注了大量的时间，努力提升阅读的体验和品质。

再一次感谢您花费时间阅读这份欢迎稿，开始撰写新的文稿吧！祝您在这里记录、阅读、分享愉快！
