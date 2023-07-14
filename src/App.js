import React from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Fade from '@material-ui/core/Fade';
// import Backdrop from '@material-ui/core/Backdrop';
// import Dialog from '@material-ui/core/Dialog';
// import { useState } from "react";
import Records from "./records.json";
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import Slider from "react-slider";


// for (let i = 0; i < Records.length - 1; i++) {
//   if (Records[i].hasOwnProperty("spanid")) {
//     let token_text = Records[i].token_text;
//     let spanid = Records[i].spanid;
//     for (let j = i + 1; j < Records.length && Records[j].spanid === spanid; j++) {
//       token_text += " " + Records[j].token_text;
//       Records.splice(j, 1);
//       j--;
//     }
//     Records[i].token_text = token_text;
//   }
// };


  const transformedRecords = [];
  const spanidSet = new Set();
  
  Records.forEach(item => {
    if (item.spanid && !spanidSet.has(item.spanid)) {
      const joinedText = Records
        .filter(i => i.spanid === item.spanid)
        .map(i => i.token_text)
        .join(' ');
        
      transformedRecords.push({
        tkid: item.tkid,
        token_text: joinedText,
        spanid: item.spanid,
        label_name: item.label_name
      });
      
      spanidSet.add(item.spanid);
    } else if (!item.spanid) {
      transformedRecords.push(item);
    }
  });
  
  

   

class Relation extends React.Component {
    
    render () {
       const tokens_to_render = [];
       const input_tokens = transformedRecords;
       const span_cntr = [];
       const token_counter = [];
       const rel_labeler = [];
      
      // console.log(spanid);
       var cntr = 200;
  
       input_tokens.forEach(tk => {
           const span = tk['spanid'];
           if (!tk['spanid']) {
               tokens_to_render.push(
                <div key= {`id${cntr}`} className = 'inner'>
                   <div id = {`label${cntr}`} className='no-label' key={tk.tkid}>--</div>
                   <div key={cntr} id = {`span${cntr}`} index={tk['spanid']} className='example_d'> 
                       {tk['token_text']} 
                  </div>
                </div>
              );
              
           } else {
              tokens_to_render.push(
                <div key = {`id${cntr}`} className = 'inner'>
                  <div id = {`label${cntr}`} className='label' key={tk.tkid} >{tk['label_name']}</div>
                  <div
                    key={cntr} id = {`span${cntr}`}
                    index={tk['spanid']}
                    className='example_c' 
                  > 
                      {tk['token_text']} 
                  </div>
                </div>
              );
              span_cntr.push(cntr);
              token_counter.push(tk.tkid);
           };
           cntr = cntr + 1;
      });
      // console.log(span_cntr);
      input_tokens.forEach(tk => {
        if (tk['tkid'] === token_counter[0]) {
            rel_labeler.push( <div className='labeler'>{tk['token_text']} </div>);
            rel_labeler.push(<a>Pick a relation</a>);
        }
        else if (tk['tkid'] === token_counter[1]) {
          rel_labeler.push( <div className='labeler'>{tk['token_text']} </div>);
        }
      });

    
      return (
        <div key="outer" className= "outer">
          <div key="id" className="control-box">
            <Xarrow  strokeWidth ={2} path='smooth' curveness={0.5} headSize={6} start ={`span${span_cntr[0]}`} end ={`span${span_cntr[1]}`}/>
             {tokens_to_render}
             
          </div> 
          <div className='annotation'>
            <p>Sentiment</p>
            <Slider
                // aria-label="Sentiment"
                className='slider'
                defaultValue={30}
                // getAriaValueText={valuetext}
                // valueLabelDisplay="auto"
                step={1}
                marks={10}
                min={0}
                max={10}
              />
              <div className='outerlabeler'>
              {rel_labeler}
              </div>
          </div>

        </div>
      )
    }
  }
export default Relation;