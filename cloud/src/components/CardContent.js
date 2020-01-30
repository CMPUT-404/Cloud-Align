
import React from 'react';
import 'antd/dist/antd.css';
import './CardContent.css';
import { Card } from 'antd';

class CardContent extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                
                <Card title={this.props.post.title} extra={<a href="#">expand</a>}>
                    <h1>{this.props.post.content}</h1>
                </Card>
        
            </div>
        )
    }
}

export default CardContent


