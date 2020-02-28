
import React from 'react';
import 'antd/dist/antd.css';
import { Card, Button, Modal, Input } from 'antd';
import { Route, Link } from 'react-router-dom'
import RequestsData from '../Data/RequestsData'
import FriendRequest from './Friends'


class CardRequest extends React.Component{

  constructor(props){
      super(props)
      this.num = {
      count: 6,
      };
      this.state = {
        path: '/Timeline/' + props.friendRequest.id
      }
}
    increase = () => {
      const count = this.num.count + 1;
      this.setState({ count });
    };

    decline = () => {
      let count = this.num.count - 1;
      if (count < 0) {
        count = 0;
      }
      this.setState({ count });
    };

    onChange = show => {
      this.setState({ show });
    };

    render(){
        return(
            <div>
                <Card title={this.props.friendRequest.displayName}>

                <Link to={'/Profile/'+this.props.friendRequest.authorID}><img id="cardProfile" align="left" src={require('../../Images/pepe.jpeg')} /></Link>
                <h2> {this.props.displayName} {'wants to add you as a friend'}</h2>
                <hr/>
                <Link to={'/Profile/'+this.props.friendRequest.authorID}>{this.props.friendRequest.authorID}</Link>
                <Button onClick={this.decline}>decline</Button>
                <Button onClick={this.increase}>accept</Button>
                </Card>
            </div>


        )
    }
}

export default CardRequest
