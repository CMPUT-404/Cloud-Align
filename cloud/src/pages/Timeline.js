import React from 'react';
import PostsData from '../PostsData'
import InputBox from '../Components/InputBox';
import CardContent from '../Components/CardContent';

class Timeline extends React.Component {
  render(){

    var postComponents = []
    for(var i=0;i<PostsData[0].posts.length;i++){
        var eachPost = <CardContent key={PostsData[0].posts[i].id} post={PostsData[0].posts[i]}/>
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