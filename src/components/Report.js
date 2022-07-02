import React , {Component} from 'react';

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
            /* show result in charts */
            <div>
                <button onClick={this.download.bind(this)}> Download Results</button>
            </div>
            );
    }
}
export default Report;