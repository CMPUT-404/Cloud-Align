import React from 'react';
import RequestsData from './Data/RequestsData'
import CardRequest from './FriendParts/CardRequest';
import 'antd/dist/antd.css';


import { Badge, Icon } from 'antd';


class FriendRequest extends React.Component {
  state = {
    current: undefined
  };

  changeCurrent = (id) => {
    this.setState({
      current: id
    })
  }

  render(){
    var requestList = []
    for(var i=0;i<RequestsData[0].friend.length;i++){
        var request = <CardRequest key={RequestsData[0].friend[i].id} friendRequest={RequestsData[0].friend[i]} index={i} onChangeCurrent={this.changeCurrent}/>
        requestList.push(request)
    }

    return (
      <div className="FriendRequest">
        <h2> Pending Friend Requests {<Badge count={6} />}</h2>

        {requestList}
      </div>
    )

  }
}
export default FriendRequest
