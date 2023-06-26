import { useState } from "react";
import records from "./records.json"

const Colorizer = () => {
    const [color, setColor] = useState("lightblue");
const getRandomColor = () => {
    const random = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return random;
}

    const changeColor = () => {
        const randomColor = getRandomColor();
        console.log('Color Change with', randomColor);
        // setColor('green');
        setColor(randomColor);
    }
    return (
        <div className="colorizer">
            <div className="box" style={{backgroundColor: color}}>{color}</div>
            <button onClick={ changeColor }>Change Color</button>
        </div>
        
        
    )
}

export default Colorizer;