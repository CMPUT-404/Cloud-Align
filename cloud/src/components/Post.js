import React from 'react'

class Post extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <h1>{this.props.post.id}</h1>
                <h1>{this.props.post.content}</h1>
            </div>
        )
    }
}

export default Post