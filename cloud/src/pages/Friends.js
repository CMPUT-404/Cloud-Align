import React from 'react';
import RequestsData from './Data/RequestsData'
import CardRequest from './FriendParts/CardRequest';
import 'antd/dist/antd.css';


import { Badge, Icon } from 'antd';


class FriendRequest extends React.Component {
  constructor(props){
    super(props)
    this.state={
      friendRequests : [],
      count: 0,
    }
  }

  componentWillMount(){
    let request = new XMLHttpRequest()
    request.open('GET','http://127.0.0.1:8000/friendrequest/')
    request.send()
    request.onload = () => {
      let requests = JSON.parse(request.response);
      let tempRequests = [];
      for(let i = 0;i<requests.length;i++){
        let authorId = requests[i].authorID.split("/").slice(4)[0];
        let authorRequest = new XMLHttpRequest();
        authorRequest.open('GET',"http://127.0.0.1:8000/users/".concat(authorId));
        let username;
        authorRequest.onreadystatechange = function() {
          var data = JSON.parse(authorRequest.responseText);
          username = data.username;
          console.log(username);
        }
        authorRequest.send();
        console.log(username);
        let eachRequest = <CardRequest displayName = "test" friendRequest={requests[i]} />
        tempRequests.push(eachRequest);
      }
      this.setState({
        friendRequests: tempRequests,
        count: requests.length,
      })
    }
  }
    /*
    render(){
    let request = new XMLHttpRequest()
    request.open('POST', 'http://162.246.157.219:25565/friendrequest/')
    request.send()
    */

    render(){
      return (
        <div className="FriendRequest">
          <h2> Pending Friend Requests {<Badge count={this.state.count} />}</h2>

          {this.state.friendRequests}
        </div>
      )
    }
}
export default FriendRequest
