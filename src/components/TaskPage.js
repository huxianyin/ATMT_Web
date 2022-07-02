import React from 'react';
import TrailMakingTest from './TrailMakingTest'
import '../css/tmtStyle.css';

const RULE_TEXT={
  "trialA":<p>今から，検査Aのための練習をします。画面に書かれている数字の<span>『1－2－3』</span>というような順番にできるだけ早く押してください。練習の成績は最後の成績に記入しません。練習は終わったら、本番の課題に進めます。</p>,
  "partA":<p>スタートしたら，<span>検査A本番</span>が始まります。画面に書かれている数字の<span>『1－2－3』</span>というような順番にできるだけ早く押してください。この成績は最後の成績に記入します。</p>,
  "trialB":<p>検査Bは少し違うことをしていただきます。最初は練習です。今度は<span>『1－あ－2－い－3－う』</span>というような数字と仮名を交互した順番でボタンを押してください。もし途中で数字と仮名が交互でなかったり，順番を間違ったりすると不正解と判定されます。できるだけ早く行なってください。練習の成績は最後の成績に記入しません。練習は終わったら、本番の課題に進めます。</p>,
  "partB":<p>スタートしたら，<span>検査B本番</span>が始まります。画面に書かれている数字と仮名を、<span>『1－あ－2－い－3－う』</span>というような数字と仮名を交互した順番でボタンを押してください。この成績は最後の成績に記入します。</p>,
}


function generate_phase_name(isTrial,taskType){
  return (isTrial?"trial":"part")+taskType;
}


function generate_rule(isTrial,taskType){
  const phase = generate_phase_name(isTrial,taskType);
  return RULE_TEXT[phase];
}

function generate_title(isTrial,taskType){
  return "〜 " + (isTrial?"trial":"part").toUpperCase()+" "+taskType+" 〜";
}

// a stateless component
const TaskPage = (props) => {
    const rule_content = generate_rule(props.isTrial,props.taskType);
    const phase = generate_phase_name(props.isTrial,props.taskType);
    const title = generate_title(props.isTrial,props.taskType);

    return (
      <div className="container">
          <button className="reset-btn" onClick={()=>{props.Reset();}}>Reset</button>
          <h3>{ title } </h3>
          <div className="container">
            <div className="box26">
              <span className="box-title">ルール</span>
               {rule_content}
          </div>
        </div>
          <TrailMakingTest 
          exp_name={props.exp_name}
          num={props.num}
          step={props.step}
          task_r={props.task_r} 
          phase={phase}
          onClearHistory={props.onClearHistory}
          onUpdateResult={props.onUpdateResult}
          nextPhase={props.nextPhase}
          />
        
      </div>
    );
  }

export default TaskPage;
