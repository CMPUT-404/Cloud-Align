
import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import './InputBox.css';


const { TextArea } = Input;

class InputBox extends React.Component{
    constructor(){
        super()
    }
    
    render(){
        return(
            <div id="inputBox">
                <TextArea rows={7} />
            </div>
        )
    }
}

export default InputBox


          