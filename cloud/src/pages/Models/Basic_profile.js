import React from 'react';
import '../css/Basic_profile.css'


class Basic_profile extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            name: "bigg",
            email: "",
        }
    }


   

    render(){


    var data = "eee"
    var request = new XMLHttpRequest()
    request.open('GET','http://162.246.157.219:25565/users/')
    request.send()
    
    request.onload = ()=>{
        var temp = JSON.parse(request.response)
        this.setState({name: temp[0].username})
            
    }

    
   

    return(
    

    <div className="container">
        <img id="profile_pic" src={require('../../Images/pepe.jpeg')} />
        
        
        {this.state.name}
        <input type="image" id="add_button" src={require('../../Images/edit.jpeg')} />
        <input type="image" id="view_profile" src={require('../../Images/view.jpeg')}/>
        
        
    </div>
        

    )
    
    

    }

}

export default Basic_profile