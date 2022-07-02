import React , {Component} from 'react';

const debug_data = [{"item_id":"0","timestamp":1656778994.663,"reaction_time":2.058000087738037,"phase":"trialA"},{"item_id":"1","timestamp":1656778996.594,"reaction_time":1.930999994277954,"phase":"trialA"},{"item_id":"2","timestamp":1656778997.209,"reaction_time":0.6150000095367432,"phase":"trialA"},{"item_id":"3","timestamp":1656778997.727,"reaction_time":0.5179998874664307,"phase":"trialA"},{"item_id":"4","timestamp":1656778999.35,"reaction_time":1.622999906539917,"phase":"trialA"},{"item_id":"5","timestamp":1656779000.608,"reaction_time":1.258000135421753,"phase":"trialA"},{"item_id":"6","timestamp":1656779001.416,"reaction_time":0.807999849319458,"phase":"trialA"},{"item_id":"7","timestamp":1656779002.109,"reaction_time":0.693000078201294,"phase":"trialA"},{"item_id":"8","timestamp":1656779002.987,"reaction_time":0.878000020980835,"phase":"trialA"},{"item_id":"9","timestamp":1656779003.736,"reaction_time":0.749000072479248,"phase":"trialA"}];


function json2csv(jsons) {
    var header = "settings\n";
    header = header + Object.keys(jsons[0]).join(',') + "\n";
    var body = jsons.map(function(d) {
        return Object.keys(d).map(function(key) {
            return d[key];
        }).join(',');
    }).join("\n");
    return header + body;
}


class Report extends Component {
    constructor(props){
    super(props);
    this.state={
    }
  }

  download(){
    //const result = JSON.stringify(this.props.setting)+"\n" + json2csv(this.props.data);
    const result="test"
    const save_path = this.props.save_dir + "/" + this.props.setting.exp_name+".csv";
    console.log(save_path);
  }

    render(){ 
        return(
            /* show result in charts using Chart.js */
            <div>
                <button onClick={this.download.bind(this)}> Download Results</button>
            </div>
            );
    }
}


export default Report;