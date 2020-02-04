
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import { Card, Button } from 'antd';
import { Route, Link } from 'react-router-dom'
// import FullPost from './FullPost'

class CardContent extends React.Component{
    constructor(){
        super()
        this.state = {
            expand: false
        }
    }

    expand = () => {
        this.setState({
            expand: !this.state.expand
        })
    }

    render(){
        return(
            <div>

                <Card title={this.props.post.title} extra={<Button type="link" onClick={this.expand}>hide</Button>}>
                    <h1 hidden={this.state.expand}>{this.props.post.content}</h1>
                </Card>

            </div>
        )
    }
}

export default CardContent
