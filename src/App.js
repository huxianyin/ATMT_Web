import React, {Component} from 'react';
import './css/App.css';
import Setting from './components/Setting'
import TaskPage from './components/TaskPage';
import Report from './components/Report'

import {  BrowserRouter,Routes,Route } from 'react-router-dom';

const save_dir = "../results/";
const defaultSettings = {
    num: 2,
    step: 1,
    task_r: false,
    exp_name: 'hu'
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phase:"setting",
            setting: {
                num: defaultSettings.num,
                step: defaultSettings.step,
                task_r: defaultSettings.task_r,
                exp_name: defaultSettings.exp_name
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
        let { phase,setting } = this.state;
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

    

    quitApp() {
        // var ele_window = electron.remote.getCurrentWindow();
        // ele_window.close();
        // window.history.pushState(null, null, '/');
        // window.location.reload();
        //ipcRenderer.send('window-all-closed');
    }

    handleClearHistory(){}
    handleSubmitResult(){}

    generage_page(isTrial,taskType,nextPhase){
        const phase = (isTrial?"trial":"part" )+ taskType;
        return ( <TaskPage
            isTrial = {isTrial} 
            taskType = {taskType} 
            nextPhase = {nextPhase}//{ this.handleNext.bind(this, phase) }
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
                num = { this.state.setting.num }
                step = { this.state.setting.step }
                task_r = { this.state.setting.task_r }
                exp_name = { this.state.setting.exp_name }
                nextPhase = "trailA"
                handleParamChange = { this.handleParameterChange.bind(this) }
                Reset = { this.reset }
                />
            );
        }
        const TrailAPage = (props) => {return this.generage_page(true,'A',"../partA");}
        const PartAPage = (props) => {return this.generage_page(false,'A',"../trialB");}
        const TrailBPage = (props) => {return this.generage_page(true,'B',"../partB");}
        const PartBPage = (props) => {return this.generage_page(false,'B',"../report");}

        const ReportPage = (props) => {
            return ( <Report 
                id = "report"
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