import React, { Component } from 'react';
import './css/App.css';
import Setting from './components/Setting'
import TaskPage from './components/TaskPage';
import Report from './components/Report'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const save_dir = "../results/";
const trial_num = 1;
const trial_step = 1;
const lang = "en";

const defaultSettings = {
    num: 1,
    step: 1,
    task_r: false,
    exp_name: 'hu'
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phase: "setting",
            setting: {
                num: defaultSettings.num,
                step: defaultSettings.step,
                task_r: defaultSettings.task_r,
                exp_name: defaultSettings.exp_name
            },
            results: Array(),
        };

    }

    reset() {
        if (window.confirm('リセットすると、今までの成績は無くなります。本当にリセットしますか？')) {
            window.location.reload();
        }
    }


    handleParameterChange(name, v) {
        const setting = this.state.setting;
        if (name === "task_r" || name === "exp_name") {
            setting[name] = v;
        } else {
            setting[name] = parseFloat(v);
        }
    }


    onUpdateResult(data) {
        this.state.results.push(data);
    }

    generage_page(isTrial, taskType, nextPhase) {
        return ( < TaskPage isTrial = { isTrial }
            taskType = { taskType }
            nextPhase = { nextPhase } //{ this.handleNext.bind(this, phase) }
            Reset = { this.reset }
            exp_name = { this.state.setting.exp_name }
            num = { this.state.setting.num }
            step = { this.state.setting.step }
            trial_num = { trial_num }
            trial_step = { trial_step }
            lang = { lang }
            task_r = { this.state.setting.task_r }
            onUpdateResult = { this.onUpdateResult.bind(this) }
            />
        );
    }

    render() {
        const MySettingPage = (props) => {
            return ( < Setting num = { this.state.setting.num }
                step = { this.state.setting.step }
                task_r = { this.state.setting.task_r }
                exp_name = { this.state.setting.exp_name }
                nextPhase = "trialA"
                handleParamChange = { this.handleParameterChange.bind(this) }
                Reset = { this.reset }
                />
            );
        }
        const TrailAPage = (props) => { return this.generage_page(true, 'A', "../partA"); }
        const PartAPage = (props) => { return this.generage_page(false, 'A', "../trialB"); }
        const TrailBPage = (props) => { return this.generage_page(true, 'B', "../partB"); }
        const PartBPage = (props) => { return this.generage_page(false, 'B', "../report"); }

        const ReportPage = (props) => {
            return ( < Report data = { this.state.results }
                setting = { this.state.setting }
                save_dir = { save_dir }
                nextPhase = "/" /
                > );
        }

        return ( <
            div >
            <
            BrowserRouter basename = '/index.html' >
            <
            Routes >
            <
            Route exact path = "/"
            element = { < MySettingPage / > }
            />  <
            Route path = 'trialA'
            element = { < TrailAPage / > }
            />  <
            Route path = 'partA'
            element = { < PartAPage / > }
            />  <
            Route path = 'trialB'
            element = { < TrailBPage / > }
            />  <
            Route path = 'partB'
            element = { < PartBPage / > }
            />  <
            Route path = 'report'
            element = { < ReportPage / > }
            />  <
            /Routes> <
            /BrowserRouter> <
            /div>
        );
    }
}


export default App;