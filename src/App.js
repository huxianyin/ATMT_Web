import React, {Component} from 'react';
import './css/App.css';
import Setting from './components/Setting'
import TaskPage from './components/TaskPage';
import Report from './components/Report'

import {  BrowserRouter,Routes,Route } from 'react-router-dom';

const save_dir = "../results/";
const defaultParas = {
    num: 5,
    step: 10,
    task_r: false,
    exp_name: '1-1'
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: {
                num: defaultParas.num,
                step: defaultParas.step,
                task_r: defaultParas.task_r,
                exp_name: defaultParas.exp_name
            }
        };

    }
    reset() {
        if (window.confirm('リセットすると、今までの成績は無くなります。本当にリセットしますか？')) {
            window.history.pushState(null, null, '/');
            window.location.reload();

        }
    }


    handleParameterChange(name, v) {
        let { setting } = this.state;
        if (name === "task_r" || name === "exp_name") {
            setting[name] = v;
        } else {
            setting[name] = parseFloat(v);
        }
    }


    json2csv(json) {
        var header = Object.keys(json[0]).join(',') + "\n";

        var body = json.map(function(d) {
            return Object.keys(d).map(function(key) {
                return d[key];
            }).join(',');
        }).join("\n");

        return header + body;
    }

    handleNext(next) {
        //this.setState({phase:next});
        //browserHistory.push(next);
        if (next === "trailA") {
            var config = [{
                num: this.state.setting.num,
                step: this.state.setting.step,
                task_r: this.state.setting.task_r
            }];
            var file_name = save_dir + "config_" + this.state.setting.exp_name + ".csv";
            this.handleClearHistory(file_name);
            this.handleSubmitResult(file_name, this.json2csv(config));
        }
    }

    handleSubmitResult(file_name, data) {
        //ipcRenderer.send('submit-result', { data: data, fname: file_name });
    }

    handleClearHistory(file_name) {
        //ipcRenderer.send('clear-history', { fname: file_name });
    }

    quitApp() {
        // var ele_window = electron.remote.getCurrentWindow();
        // ele_window.close();
        // window.history.pushState(null, null, '/');
        // window.location.reload();
        //ipcRenderer.send('window-all-closed');
    }

    generage_page(isTrial,taskType){
        const phase = (isTrial?"trial":"part" )+ taskType;
        return ( <TaskPage
            isTrial = {isTrial} 
            taskType = {taskType} 
            handleNext = { this.handleNext.bind(this, phase) }
            Reset = { this.reset }
            exp_name = { this.state.setting.exp_name }
            num = { this.state.setting.num }
            step = { this.state.setting.step }
            task_r = { this.state.setting.task_r }
            onClearHistory = { this.handleClearHistory.bind(this) }
            onSubmitResult = { this.handleSubmitResult.bind(this) }
            />
        );
    }

    render() {
        const MySettingPage = (props) => {
            return ( <Setting 
                num = { this.state.num }
                step = { this.state.step }
                task_r = { this.state.task_r }
                exp_name = { this.state.exp_name }
                handleNext = { this.handleNext.bind(this, "trailA") }
                handleParamChange = { this.handleParameterChange.bind(this) }
                Reset = { this.reset }
                />
            );
        }
        const TrailAPage = (props) => {return this.generage_page(true,'A');}
        const PartAPage = (props) => {return this.generage_page(false,'A');}
        const TrailBPage = (props) => {return this.generage_page(true,'B');}
        const PartBPage = (props) => {return this.generage_page(false,'B');}

        const ReportPage = (props) => {
            return ( <
                Report id = "report"
                Reset = { this.reset }
                quitAPP = { this.quitApp }
                exp_name = { this.state.setting.exp_name }
                />);
            }

        return ( 
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path = "/" element = { <MySettingPage />}/> 
                        <Route path = 'setting' element = { <MySettingPage /> }/>
                        <Route path = 'trailA' element = { <TrailAPage /> }/> 
                        <Route path = 'partA' element = { <PartAPage />}/> 
                        <Route path = 'trailB' element = { <TrailBPage />}/> 
                        <Route path = 'partB' element = { <PartBPage />}/> 
                        <Route path = 'report' element = { <ReportPage />}/> 
                    </Routes>
                </BrowserRouter>
            </div>
        );
        }
    }


export default App;