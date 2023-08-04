import React from 'react';
import './App.css';
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
  // const categories = ["rank", "place", "threat", "name", "hatred", "peace"];
  
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

  const tokenPairsList = [];
  
  for (let i in transformedRecords) {
    if (transformedRecords[i].spanid) {
        for (let j in transformedRecords){
            if (transformedRecords[j].spanid && i!=j) {
                const tokenPairs = [];
                tokenPairs.push(transformedRecords[i]);
                tokenPairs.push(transformedRecords[j]);
                tokenPairsList.push(tokenPairs);
            }

        }
    }
  };
   

class Relation extends React.Component {

  //Enter all the relations here
  state={
    options : ["rank", "place", "threat", "name", "hatred", "peace"],
    count: 0
  }
  onChange = e => {
    this.setState({value: e.target.value});
  }
    
    render () {
       const tokens_to_render = [];
       const input_tokens = transformedRecords;
       const span_cntr = [];
       const token_counter = [];
       const spanPairs = [];
       const {value, options} = this.state;
      
       var cntr = 200;
       if (this.state.count >= tokenPairsList.length) {
        this.state.count = tokenPairsList.length - 1;
       }
       else if (this.state.count < 0) {
        this.state.count = 0;
       }
  
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

     for (let i in span_cntr) {
        for (let j in span_cntr){
            if (i!=j) {
                const spanPair = [];
                spanPair.push(span_cntr[i]);
                spanPair.push(span_cntr[j]);
                spanPairs.push(spanPair);
            }

        }
     };

    //   console.log(span_cntr);


      return (
        <div key="outer" className= "outer">
          <div key="id" className="control-box">
            
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
              <div className='labeler'>{tokenPairsList[this.state.count][0]['token_text']} </div>
              <label htmlFor='categories'>Pick a Relation: </label>
              <select id='options' value={value} onChange={this.onChange}>
                {options.map((val,index)=> {
                //   console.log(index);
                  return <option key={index} value={index}>{val}</option>
                  
                })}
              </select>
              <div className='labeler'>{tokenPairsList[this.state.count][1]['token_text']} </div>
              <button onClick={() => this.setState({count: this.state.count - 1})}>
                Previous
              </button>
              <button onClick={() => this.setState({count: this.state.count + 1})}>
                Next
              </button>
              <Xarrow  strokeWidth ={2} path='smooth' curveness={0.5} headSize={6} start ={`span${spanPairs[this.state.count][0]}`} end ={`span${spanPairs[this.state.count][1]}`}/>

              </div>
          </div>

        </div>
      )
    }
}
export default Relation;