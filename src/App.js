import React from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Fade from '@material-ui/core/Fade';
// import Backdrop from '@material-ui/core/Backdrop';
// import Dialog from '@material-ui/core/Dialog';
import { useState } from "react";
import Records from "./records.json";




// import {
//   BrowserRouter as Router,
//   Route,
// } from 'react-router-dom';

// import './index.css'
//dev
// const api_base_url = 'http://localhost:9000';

function App(){
const [color, setColor] = useState('lightblue');

const changeColor = () => {
    // const randomColor = getRandomColor();
    console.log('Color Change with', 'green');
    // setColor('green');
    setColor('green');
}
    return(
  <div className='outer'>
    {
      Records.map( (record, index) => {
        return(
          <div key={index}> 
            <h3 className='cards'> <span key ={index} style={{backgroundColor: color}} onMouseEnter={changeColor} onMouseLeave={ () => setColor('lightblue')}> {record.token_text} </span></h3>
          </div>
      )
      })
    }
  </div>
    );
}
export default App;
