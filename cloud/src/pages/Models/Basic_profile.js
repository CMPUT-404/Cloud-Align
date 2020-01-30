import React from 'react';
import '../css/Basic_profile.css'
class Basic_profile extends React.Component{
    constructor(){
        super()
    }
    render(){
        

        return(
        
           
            
        <div class="container">
            <img id="profile_pic" src={require('../../images/pepe.jpeg')} />
            <h1>AinzOoalGown Of Nazarik</h1>
            
            
            <input type="image" id="add_button" src={require('../../images/edit.jpeg')} />
            
            {/* <img id="add" src={require('../../images/add.jpeg')} /> */}
            
            <p1>Basic profile stuff</p1>
        </div>
            
       
        
        )
    }

}
export default Basic_profile