import React from 'react';
import Post from './Post'
import './App.css';
import PostsData from './PostsData'

function App() {
  const PostCompnents = PostsData.map(item => <Post post={item}/>)
  
  return (
    <div className="App">
      {PostCompnents}
    </div>
  );
}

export default App;
