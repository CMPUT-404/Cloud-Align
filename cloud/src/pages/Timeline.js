import React from 'react';
import './Timeline.css';
import PostsData from '../PostsData'
import InputBox from '../components/InputBox';
import CardContent from '../components/CardContent';

class Timeline extends React.Component {
  render(){

    var postComponents = []
    for(var i=0;i<PostsData[0].posts.length;i++){
        var eachPost = <CardContent post={PostsData[0].posts[i]}/>
        postComponents.push(eachPost)
    }

  
    return (
      <div className="Timeline">
        <InputBox id="InputBox"/>
        {postComponents}
      </div>
    )

  }
}

export default Timeline