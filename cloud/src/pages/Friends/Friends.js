import React from 'react';
import CardRequest from './CardRequest';
import 'antd/dist/antd.css';
import { Badge, Icon } from 'antd';


class FriendRequest extends React.Component {
  constructor(props){
    super(props)
    this.state={
      friendRequests : [],
      count: 0,
      username:''
    }
  }

  fetchUsername(authorId) {
    let authorRequest = new XMLHttpRequest();
    authorRequest.open('GET',"http://127.0.0.1:8000/users/".concat(authorId));
    authorRequest.send();
    authorRequest.onload = () => {
      let author = JSON.parse(authorRequest.response);
      this.setState({username:author.username})
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
        this.fetchUsername(authorId);
        let eachRequest = <CardRequest displayName = {this.state.username} friendRequest={requests[i]} />
        tempRequests.push(eachRequest);
      }
      this.setState({
        friendRequests: tempRequests,
        count: requests.length,
      })
    }
  }

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
