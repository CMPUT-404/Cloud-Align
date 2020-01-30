import React from 'react';
import './Timeline.css';
import PostsData from '../PostsData'
import InputBox from '../components/InputBox';
import CardContent from '../components/CardContent';

class Timeline extends React.Component {
  render(){
    const PostCompnents = PostsData.map(item => <CardContent key={item.id} post = {item} />)
    
    return (
      <div className="Timeline">
        <InputBox id="InputBox"/>
        {PostCompnents}
        
      </div>
    )

  }
}

export default Timeline