import React from 'react';
import '../css/Basic_profile.css'
import data from '../Data/Profile_data'
class Basic_profile extends React.Component{
    constructor(){
        super()
    }
    render(){
    
        return(
        
    
        <div className="container">
            <img id="profile_pic" src={require('../../images/pepe.jpeg')} />
        <h1>{data.name}</h1>
        <h2>{data.nickname}</h2>
            <input type="image" id="add_button" src={require('../../images/edit.jpeg')} />
            
            
        </div>
            
    
        )
    }

}
export default Basic_profile