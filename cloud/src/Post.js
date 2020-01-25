import React from 'react'

function Post(props){
    return(
        <div>
            <h1>{props.post.id}</h1>
            <h1>{props.post.content}</h1>
        </div>
    )

}

export default Post