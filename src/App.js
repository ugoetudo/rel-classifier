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
import DataFrame from "dataframe-js";
import Records from "./records.json";
import Xarrow from "react-xarrows";


for (let i = 0; i < Records.length - 1; i++) {
  if (Records[i].hasOwnProperty("spanid")) {
    let token_text = Records[i].token_text;
    let spanid = Records[i].spanid;
    for (let j = i + 1; j < Records.length && Records[j].spanid === spanid; j++) {
      token_text += " " + Records[j].token_text;
      Records.splice(j, 1);
      j--;
    }
    Records[i].token_text = token_text;
  }
};

  const transformedRecord = [];
  const spanidSet = new Set();
  
  Records.forEach(item => {
    if (item.spanid && !spanidSet.has(item.spanid)) {
      const joinedText = Records
        .filter(i => i.spanid === item.spanid)
        .map(i => i.token_text)
        .join(' ');
        
      transformedRecord.push({
        tkid: item.tkid,
        token_text: joinedText,
        spanid: item.spanid,
        label_name: item.label_name
      });
      
      spanidSet.add(item.spanid);
    } else if (!item.spanid) {
      transformedRecord.push(item);
    }
  });
  
  

   

class Relation extends React.Component {

    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     hovered: null,
    //   };
      
    //   this.unsetHover = this.unsetHover.bind(this);
    // };
    
    // setHover(id) {
    //   return () => {
    //     this.setState({ hovered: id });
    //   }
    // };
    
    // unsetHover() {
    //   this.setState({ hovered: null });
    // };

    
    render () {
       const tokens_to_render = [];
       const input_tokens = Records;

       
      
      // console.log(spanid);
       var cntr = 100;
  
       input_tokens.forEach(tk => {
           const span = tk['spanid'];
           if (!tk['spanid']) {
              // tokens_to_render.push();
               tokens_to_render.push(
                <div className = 'inner'>
                   <div key={tk.tkid} >--</div>
                   <div key={cntr} index={tk['spanid']} className='example_d'> 
                       {tk['token_text']} 
                  </div>
                </div>
              );
              
           } else {
            // tokens_to_render.push();
              tokens_to_render.push(
                <div className = 'inner'>
                  <div key={tk.tkid}>{tk['label_name']}</div>
                  <div
                    key={cntr}
                    index={tk['spanid']}
                    className='example_c' // ${tk.spanid === this.state.hovered && 'example_c-hovered'}`}
                    // onMouseOver={this.setHover(tk.spanid)}
                    // onMouseOut={this.unsetHover}
                  > 
                      {tk['token_text']} 
                  </div>
                </div>
              );
           };
           cntr = cntr + 1;
      });
      console.log(Records);
    
      return (
          <div key="id" className="control-box">
             {tokens_to_render}
          </div>
      )
    }
  }
export default Relation;