import React from 'react';
import Post from './components/Post'
import './App.css';
import PostsData from './PostsData'

class App extends React.Component {
  render(){
    const PostCompnents = PostsData.map(item => <Post post={item}/>)
  
    return (
      <div className="App">
        {PostCompnents}
      </div>
    )

  }
}
export default App