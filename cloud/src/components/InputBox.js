
import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import './InputBox.css';


const { TextArea } = Input;

class InputBox extends React.Component{
    constructor(){
        super()
        this.submitPost = this.submitPost.bind(this)
    }

    submitPost(){
        var connect = XMLHttpRequest()
    }

    pictureHandler = event => {
        console.log(event)
    }
    
    render(){
        return(
            <div id="inputBox">
                <TextArea rows={7} placeholder="What's on your mind..."/>
                <button id="submitButton" onClick={this.submitPost}>Submit</button>
                <input id="uploadButton" type="file" alt="image uploaded by user" onChange={this.pictureHandler}/>
            </div>
        )
    }
}

export default InputBox


          