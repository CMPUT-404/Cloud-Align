import React from 'react';
import PostsData from '../PostsData'
import InputBox from '../Components/InputBox';
import CardContent from '../Components/CardContent';
<<<<<<< HEAD
import FullPost from '../Components/FullPost';
=======
>>>>>>> frontend-dev-joe

class Timeline extends React.Component {
  state = {
    current: undefined
  };

  changeCurrent = (id) => {
    this.setState({
      current: id
    })
  }

  render(){
<<<<<<< HEAD
    var postComponents = []
    for(var i=0;i<PostsData[0].posts.length;i++){
        
        var eachPost = <CardContent key={PostsData[0].posts[i].id} post={PostsData[0].posts[i]} index={i} onChangeCurrent={this.changeCurrent}/>
        postComponents.push(eachPost)
    }

    return(
      <div className="Timeline">
        <InputBox id="InputBox"/>
        {postComponents}
=======
    const PostCompnents = PostsData.map(item => <CardContent key={item.id} post = {item} />)
    
    return (
      <div className="Timeline">
        <InputBox id="InputBox"/>
        {PostCompnents}
        
        
>>>>>>> frontend-dev-joe
      </div>
    )
  }
}

export default Timeline