import React from 'react';
import '../css/Basic_profile.css'


class Basic_profile extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            name: "",
            email: "",
            phonenumber: "",
            change: function(){
                alert("s")
            }
           
            
        }
    }

    

    render(){
<<<<<<< HEAD

   
        
    var request = new XMLHttpRequest()
    request.open('GET',this.props.url)
    request.send()
    
    request.onload = ()=>{
        var temp = JSON.parse(request.response)
        this.setState({name: temp.username,
            email: temp.email})
        // this.setState({email: temp.url})
    }

    
    
    

    return(
    

    <div className="container">


        <img  id="profile_pic" src={require('../../Images/pepe.jpeg')} />
        
        
        
        <img onClick={this.props.edit}class="smallimg" type="image" id="edit_button" src={require('../../Images/edit.jpeg')} />
        
        
        <img  class="smallimg" type="image" id="view_profile" src={require('../../Images/view.jpeg')}/>
        <div id="profiletext">
        {this.state.name}<br></br>
        {this.state.email}<br></br>
        {this.state.phonenumber}
        </div>
        
        
    </div>
=======
        var request = new XMLHttpRequest()
        request.open('GET',this.props.url)
        request.send()
>>>>>>> Frontend-Develop
        
        request.onload = ()=>{
            var temp = JSON.parse(request.response)
            this.setState({name: temp.username,
                email: temp.email})
            // this.setState({email: temp.url})
        }

        return(
            <div className="container">
                <img id="profile_pic" alt='profile' src={require('../../Images/pepe.jpeg')} />
                <input class="smallimg" id="edit_button" src={require('../../Images/edit.jpeg')} />
                <input class="smallimg" id="view_profile" src={require('../../Images/view.jpeg')}/>
                <div id="profiletext">
                {this.state.name}<br></br>
                {this.state.email}<br></br>
                {this.state.phonenumber}
                </div>
            </div>
        )


    }

}

export default Basic_profile