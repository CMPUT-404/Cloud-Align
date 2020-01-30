
import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import './InputBox.css';


const { TextArea } = Input;

class InputBox extends React.Component{
    constructor(){
        super()
        this.bind
    }

    submitPost{}
    
    render(){
        return(
            <div id="inputBox">
                <TextArea rows={7} placeholder="What's on your mind..."/>
                <button onClick={submitPost}>Submit</button>
            </div>
        )
    }
}

export default InputBox


          