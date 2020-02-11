
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import { Card, Button } from 'antd';
import FullPost from '../Pages/FullPost';
import { Modal} from 'antd';
import { Input } from 'antd';

const { TextArea } = Input;
class CardContent extends React.Component{
    constructor(){
        super()
        this.state = {
            ModalText: "display a list of comments",
            visible: false,
            confirmLoading: false,
          };
    }
    seeFullPost(){
        //Route to full post  
        return <FullPost />
    }

    displayProfile(){
        //Route to profile 
        window.alert("Going to user's profile")
    }


    addComment = () => {
        this.setState({
          visible: true,
        });
      };

    handleOk = () => {
        this.setState({
          ModalText: 'Posting your comment',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      };


    render(){
        const { visible, confirmLoading, ModalText } = this.state;
        return(
            <div>
                <Card title={this.props.post.title} extra={<Button type="link" onClick={this.seeFullPost}>see more</Button>}>
                    <h1>{this.props.post.author.firstName + " " + this.props.post.author.lastName}</h1>
                    <img id="cardProfile" onClick={this.displayProfile} align="left" src={require('../Images/pepe.jpeg')} />
                    <p>{this.props.post.content}</p>
                    <button onClick={this.addComment}>Add Comment</button>
                    <Modal
                        title={this.props.post.title}
                        visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                        >
                        <TextArea rows={7} placeholder="Make a comment about this post"/>
                        <p>{ModalText}</p>
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default CardContent
