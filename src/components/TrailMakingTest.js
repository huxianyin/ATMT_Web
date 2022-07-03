import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import '../css/tmtStyle.css';
import CompleteBar from './CompleteBar';

//move to app js because they are global settings!!

const jp = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん"];
const en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


class TrailMakingTest extends Component {
    constructor(props){
        super(props);
        this.state = {
          started : false,
          finished : false,
          completeBar : null,
          alphabet_array : [],
          table : [],
          posNumber:[],
          posBlanck:[],
          nextAnswer : 0,
          lastTime : 0,
          setting : {
            step: props.phase.includes('trial')?props.trial_step:props.step,
            num: props.phase.includes('trial')?props.trial_num:props.num,
          },
        };
      }


    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
      
    IsNeibor(pos1,pos2,num_row){
        if(num_row<=4)
        {
            return false;
        }
        if(Math.abs(pos1-pos2)<2)
        {
            return true;
        }
        if(Math.abs(pos1-pos2) === num_row)
        {
            return true;
        }
        return false;
    }

    updatePosition(num_row,real_num,numToGenerate,offset,random)
    {
        if(random)
            {
                var rand_idx = [];
                for(var i=0;i<num_row*num_row;i++)
                {
                    rand_idx.push(i);
                }
                var shuffled_rand_idx = this.shuffle(rand_idx);
                while(this.IsNeibor(shuffled_rand_idx[0] , this.state.posNumber[0],num_row) && offset!=0)
                {
                    shuffled_rand_idx = this.shuffle(rand_idx);
                }
                this.state.posNumber = shuffled_rand_idx.slice(0,numToGenerate);;
                this.state.posBlanck = shuffled_rand_idx.slice(numToGenerate,rand_idx.length);
            }
        else{
            if(numToGenerate < real_num)
            {
                this.state.posBlanck.push(this.state.posNumber[0]);
                this.state.posNumber.shift();
            }
            else
            {
                this.state.posBlanck.push(this.state.posNumber[0]);
                this.state.posNumber.shift();
                this.state.posNumber.push(this.state.posBlanck[0]);
                this.state.posBlanck.shift();
            }
        }
    }

    generateMarksA(num_row,offset)
    {
        var rows = [];
        var item_id = 0;
        for(var i=0;i<num_row;i++)
        {
            var cols = [];
            for(var j=0;j<num_row;j++)
            {
                if(this.state.posNumber.includes(item_id))
                {
                    cols.push(<th key={item_id}><button id={this.state.posNumber.indexOf(item_id)+offset} onClick={this.handleMarkClick.bind(this)} className="mark">{this.state.posNumber.indexOf(item_id)+1+offset}</button></th>);
                }
                else
                {
                    cols.push(<th key={item_id}><button className='transparent'/></th>);
                }
                item_id++;
            }
            rows.push(<tr key={i}>{cols}</tr>);
        }
        return rows;
    }

    generateMarksB(num_row,offset)
    {
        var rows = [];
        var item_id = 0;
        var putNumber = true;
        for(var i=0;i<num_row;i++)
        {
            var cols = [];
            for(var j=0;j<num_row;j++)
            {
                if(this.state.posNumber.includes(item_id))
                {
                    var element_id = this.state.posNumber.indexOf(item_id) + offset;
                    putNumber = element_id % 2 === 0 ? true : false;
                    var numberText = Math.floor((element_id)/2) + 1 ;
                    var alphabetText = this.state.alphabet_array[(Math.floor((element_id)/2))%this.state.alphabet_array.length];
                    var showText = putNumber ? numberText : alphabetText;
                    cols.push(<th key={item_id}><button id={element_id} onClick={this.handleMarkClick.bind(this)} className="mark">{showText}</button></th>);
                }
                else
                {
                    cols.push(<th key={item_id}><button className='transparent'/></th>);
                }
                item_id++;
            }
            rows.push(<tr key={i}>{cols}</tr>);
        }
        return rows;
    }

    ceilSqrt(n){
        return Math.ceil(Math.sqrt(n));
    }

    generateMarks(phase,offset,random){
        var real_num = phase.includes('A') ? this.state.setting.num : this.state.setting.num*2;
        var real_step = phase.includes('A') ? this.state.setting.step : this.state.setting.step*2;
        var generateFunc = phase.includes('A') ? this.generateMarksA.bind(this) : this.generateMarksB.bind(this);

        var movingForward = this.state.nextAnswer < real_step;
        var overStep = offset - real_step;
        var num_row = this.ceilSqrt(real_num)+1;
        var numToGenerate = movingForward ? real_num :  real_num-overStep ;
        if(numToGenerate>0)
        {
            this.updatePosition(num_row,real_num,numToGenerate,offset,random);
            return generateFunc(num_row,offset);
        }
        else
        {
            this.state.finished = true;
            this.setState({finished:true});
        }
    }


    handleMarkClick(clickEvent){
        const item_id = clickEvent.target.id;
        if(item_id == this.state.nextAnswer)
        {
            this.state.nextAnswer = this.state.nextAnswer+1;
            //recored data
            var nowDate = new Date();
            const timestamp = nowDate.getTime()/1000;
            const rt = timestamp-this.state.lastTime;
            nowDate = null;
            this.props.onUpdateResult({"item_id":item_id,"timestamp":timestamp,"reaction_time":rt,"phase":this.props.phase});

            this.state.lastTime = timestamp;
            this.state.completeBar.setCompleteNumber(this.state.nextAnswer);
            const newTable = this.generateMarks(this.props.phase,this.state.nextAnswer,this.props.task_r);
            this.setState({table:newTable});
        }
        else
        {
            clickEvent.target.setAttribute("Class", "mark_wrong");
            setTimeout( function (target){
                target.setAttribute("Class", "mark");
            }.bind(this,clickEvent.target),500);
        }

    }

    componentDidMount()
    {
        this.state.nextAnswer = 0;
        this.state.lastTime = 0;
        this.state.started = false;
        if(this.props.lang === "jp")
        {
            this.state.alphabet_array = jp;
        }
        else if(this.props.lang === "en")
        {
            this.state.alphabet_array = en;
        }
        this.state.completeBar.setCompleteNumber(this.state.nextAnswer);
        var real_num = this.props.phase.includes('A') ? this.state.setting.num : this.state.setting.num*2;
        var real_step = this.props.phase.includes('A') ? this.state.setting.step : this.state.setting.step*2;
        this.state.completeBar.setNum(real_num);
        this.state.completeBar.setStep(real_step);

        this.setState({table:this.generateMarks(this.props.phase,this.state.nextAnswer,true)});
    }

    render(){
        var showedTable = (<table className="posMesh">
            <tbody>
                {this.state.table}
            </tbody>
        </table>);

        var showedStartPannel = (
            <button className="startPannel" onClick={()=>{
                this.state.started = true;this.setState({started:true});
                this.state.completeBar.onStart();
                var startDate = new Date();
                this.state.lastTime = startDate.getTime()/1000;
                startDate = null;    
                }}>
                <span>準備はいいですか？</span>
            </button>
        )

        var showedNextButton = (
            <button className="nextPanel">
                <Link to={this.props.nextPhase}>NEXT</Link>
            </button>
        )
        return (
        <div className="container">
            <div className="window">
                {(() => {
                    if (!this.state.started)
                    {
                        return showedStartPannel;
                    }
                    else if(this.state.finished)
                    {
                        return <p className="finish-message">{"終わりました!"}</p>
                    }
                    return showedTable;
                    
                   })()
                }
            </div>
            {(() => {
                if (!this.state.finished)
                {
                    return <CompleteBar className='completeBar' started={this.state.started} ref={instance => { this.state.completeBar = instance; }}/>;
                }
                else
                {
                    return showedNextButton;
                }
            })()
            }
            

        </div>
        
        );}
}

export default TrailMakingTest;
