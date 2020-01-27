import React from 'react';
import './App.css';
import PostsData from './PostsData'
import InputBox from './components/InputBox';
import CardContent from './components/CardContent';

class App extends React.Component {
  render(){
    const PostCompnents = PostsData.map(item => <CardContent post = {item} />)
  
    return (
      <div className="App">
        <InputBox id="InputBox"/>
        {PostCompnents}
      </div>
    )

  }
}
export default App