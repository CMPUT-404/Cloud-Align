
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
                <Card title="Is title even needed" extra={<a href="#">Drop Down</a>}>
                    <h1>{this.props.post.id}</h1>
                    <h1>{this.props.post.content}</h1>
                </Card>
        
            </div>
        )
    }
}

export default CardContent


