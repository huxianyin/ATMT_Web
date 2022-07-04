import React from 'react';
import {  Link } from 'react-router-dom';

import '../css/Setting.css';


const Setting = (props) => {
    const min_num = 1;
    const min_step = 1;
    const max_step = 20;
    const max_num = 20;
    return (
      <div className="Setting">
        <header>
          <h1 className="h1-text">ATMT</h1>
          <h2 className="h1-text">~Advanced Trail Making Test~</h2>
        </header>

        <div className="input-panel" >

          <div className="sub-container">
            <div className="param-label">{"Experiment Name"}</div>
            <div className="param-label">{"Num "+"("+min_num+"-"+max_num+")"}</div>
            <div className="param-label">{"Step "+"("+min_step+"-"+max_step+")"}</div>
            <div className="param-label">Language</div>
            <div className="param-label">Task-R</div>
          </div>

          <div className="sub-container">
              <div className="param-input">
                    <input className="input-area" type="text" pattern="[0-9]*-[0-9]*" defaultValue={props.exp_name} onChange={
                      (v) =>{
                      props.handleParamChange("exp_name",v.target.value);
                      }
                    }/>
              </div>
              
              <div className="param-input">
                    <input className="input-area" type="number" pattern="[0-9]*" step="1" min={min_num} max={max_num} defaultValue={props.num} onChange={
                      (v) =>{
                        var value = v.target.value > max_num? max_num : v.target.value;
                        value = value < min_num ? min_num : value;
                        props.handleParamChange("num",value);
                      }
                    }/>
              </div>

              <div className="param-input">
                    <input className="input-area" type="number" pattern="[0-9]*" step="1" min={min_step} max={max_step} defaultValue={props.step} onChange={
                      (v) =>{
                        var value = v.target.value > max_step? max_step : v.target.value;
                        value = value < min_step ? min_step : value;
                        props.handleParamChange("step",value);
                      }
                    }/>
              </div>

              <div className="param-input">
                  <select className="input-area" defaultValue={props.lang} onChange={
                    (v) =>{
                      props.handleParamChange("lang",
                      v.target.value==="English"?"en":"jp");
                    }}>
                      <option>Japanese</option>
                      <option>English</option>
                    </select>
              </div>

              <div className="param-input">
                <label className="myCheckbox">
                    <input type="checkbox" defaultChecked={props.task_r} onChange={
                      (v) =>{
                        props.handleParamChange("task_r",v.target.checked);
                      }}/>
                    <span className="checkmark"></span>
                </label>
              </div>
              
          </div>
        </div>
        <button className="my-btn" >
         <Link to={props.nextPhase}>Next</Link>
         </button>
        
      </div>
    );
  }

export default Setting;
