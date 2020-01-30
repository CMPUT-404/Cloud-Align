
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import { Card } from 'antd';
import { Route } from 'react-router-dom'
import FullPost from './FullPost'

class CardContent extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Card title={this.props.post.title} extra={<a href="/FullPost">expand</a>/*TODO: How do I route this to a FullPost ?*/}>
                    <h1>{this.props.post.content}</h1>
                </Card>
        
            </div>
        )
    }
}

export default CardContent

//extra={<Route path="/FullPost" component={FullPost}/>}

{/* <Router>
<NavBar />
<Switch>
  <Route path="/profile" component={Profile}/>
  <Route path="/friends" component={Friends}/>
  <Route path="/timeline" component={Timeline}/>
</Switch>
</Router> */}
