import * as React from "react";
import {IMarkDownChange, MarkDown, MarkDownMode} from "./MarkDown";
import './app.less';
import {Col, Radio, Row, Switch} from "antd";
import {RadioChangeEvent} from "antd/lib/radio";

export default class AppTest extends React.Component<{}, {
    mode: MarkDownMode,
    disable: boolean,
}> {
    constructor(props: any) {
        super(props);

        this.state = {
            mode: MarkDownMode.EDIT,
            disable: false,
        }
    }


    onModeChange = (e: RadioChangeEvent) => {
        this.setState({
            mode: e.target.value
        })
    }

    onDisableChange = (checked: boolean) => {
        this.setState({
            disable: checked
        })
    }

    onChange = (md: IMarkDownChange) => {
        console.log(md);
    }

    render() {
        return (
            <div className="app">
                <Row style={{margin: '10px 3px'}}>
                    <Col span={5}>
                        选择模式：
                        <Radio.Group name="mode" value={this.state.mode} onChange={this.onModeChange}>
                            <Radio value={MarkDownMode.EDIT}>编辑</Radio>
                            <Radio value={MarkDownMode.VIEW}>阅读</Radio>
                        </Radio.Group>
                    </Col>
                    <Col span={5}>
                        禁止输入：
                        <Switch onChange={this.onDisableChange} checked={this.state.disable}/>
                    </Col>
                </Row>
                <div style={{flex: 1, overflow: 'hidden'}}>
                    <MarkDown mode={this.state.mode} disabled={this.state.disable} onChange={this.onChange}/>
                </div>
            </div>
        )
    }
}