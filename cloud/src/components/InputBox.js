
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
        var request = new XMLHttpRequest()
        request.open('POST',this.props.url)
        // alert(this.props.url)
       
        request.setRequestHeader("Content-Type", "application/json")
        request.setRequestHeader('Authorization', "Basic " + btoa('skrillex:raversfantasy'));
        request.onreadystatechange = function () {
            alert(request.responseText)
            if (request.readyState === 4 && request.status === 200) {
                var json = JSON.parse(request.responseText);
                alert(JSON.stringify(json));
            }
        };

        var text = document.getElementById("text").innerText

        var data = {}
        data["text"] = text
        data["title"] = "poster"
        data["authro"] = "name"
        
        alert(data["text"])

        // request.send('{"username":"AtestCow","password":"123456"}')

       
    }

    pictureHandler = event => {
        console.log(event)
    }
    
    render(){
        return(
            <div id="inputBox">
                <TextArea id="text" rows={7} placeholder="What's on your mind..."/>
                <button id="submitButton" onClick={this.submitPost}>Submit</button>
                <input id="uploadButton" type="file" alt="image uploaded by user" onChange={this.pictureHandler}/>
            </div>
        )
    }
}

export default InputBox


          