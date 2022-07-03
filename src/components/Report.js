import React from 'react';
import LineChart from './LineChart';
import {  Link } from 'react-router-dom';
import '../css/Report.css';

//const debug_data = [{"item_id":"0","timestamp":1656778994.663,"reaction_time":2.058000087738037,"phase":"trialB"},{"item_id":"1","timestamp":1656778996.594,"reaction_time":1.930999994277954,"phase":"trialB"},{"item_id":"2","timestamp":1656778997.209,"reaction_time":0.6150000095367432,"phase":"trialA"},{"item_id":"3","timestamp":1656778997.727,"reaction_time":0.5179998874664307,"phase":"trialA"},{"item_id":"4","timestamp":1656778999.35,"reaction_time":1.622999906539917,"phase":"trialA"},{"item_id":"5","timestamp":1656779000.608,"reaction_time":1.258000135421753,"phase":"trialA"},{"item_id":"6","timestamp":1656779001.416,"reaction_time":0.807999849319458,"phase":"trialA"},{"item_id":"7","timestamp":1656779002.109,"reaction_time":0.693000078201294,"phase":"trialA"},{"item_id":"8","timestamp":1656779002.987,"reaction_time":0.878000020980835,"phase":"trialA"},{"item_id":"9","timestamp":1656779003.736,"reaction_time":0.749000072479248,"phase":"trialA"}];


function json2csv(jsons) {
    const header = Object.keys(jsons[0]).join(',') + "\n";
    const body = jsons.map(function(d) {
        return Object.keys(d).map(function(key) {
            return d[key];
        }).join(',');
    }).join("\n");
    return header + body;
}

function download(save_path,result){
    
    const element = document.createElement("a");
    const file = new Blob([result], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = save_path;
    document.body.appendChild(element);
    element.click();
    
  }

function Report (props) { 
    const save_path =  props.setting.exp_name+".csv";
    const data = props.data.length>0?props.data:[];
    let results = JSON.stringify(props.setting)+"\n" 
    results = results + (props.data.length>0?json2csv(data):"");
        return(
            <div className='Report'>
                <div className='chart-container'>
                    <div className='my-chart' >
                        <LineChart data={data} x="item_id" y="reaction_time" condition_label="phase"
                        condition="partA"
                        label="Part A"
                        color="rgb(75, 192, 192)"/>
                    </div>

                    <div className='my-chart'>
                        <LineChart data={data} x="item_id" y="reaction_time" condition_label="phase"
                        condition="partB"
                        label="Part B"
                        color="rgb(75, 100, 192)"/>
                </div>
                </div>
            <div className="button-container">
                <button style={{"width":500,"marginLeft:":100}} className="my-btn" onClick={()=>download(save_path,results)}>  <a>Download Results </a></button>
                <button style={{"width":500,"marginLeft":100}} className="my-btn"> <Link to={props.nextPhase}>Try Again</Link></button>
            </div>
            </div>
            );
}


export default Report;