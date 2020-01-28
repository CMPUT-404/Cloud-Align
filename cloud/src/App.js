import React from 'react';
import Post from './Post'
import './App.css';
import PostsData from './PostsData'

import Face from './Components/Face.js'

class App extends React.Component {
  render(){
    const PostCompnents = PostsData.map(item => <Post post={item}/>)
    
    const Temp = <Face />
    
    
  
    return (
      <div className="App">
        {Temp}
        {PostCompnents}
        

      </div>
    )

  }
}
export default App