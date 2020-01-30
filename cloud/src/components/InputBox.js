
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
        window.alert('Post has been submitted')
    }
    
    render(){
        return(
            <div id="inputBox">
                <TextArea rows={7} placeholder="What's on your mind..."/>
                <button onClick={this.submitPost}>Submit</button>
            </div>
        )
    }
}

export default InputBox


          