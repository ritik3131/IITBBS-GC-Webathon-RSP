import React, { useRef, useState } from "react";
import { Button, Card, Form } from "semantic-ui-react";
import axiosInstance from "../util/axiosInstance";

function AddPost({ postId ,onSubmit}) {
  const commentInputRef = useRef();
  const [content,setContent]=useState('');
  const changeValuesHandler=(e)=>{
   setContent(e.target.value);
  }
  const submitReplyHandler=async(e)=>{
    e.preventDefault();
    if(content.trim().length>0)
     await axiosInstance.post(`${process.env.REACT_APP_BACKEND_HOST}/reply`,{content,postId});
    setContent(''); 
    onSubmit();
  }

  return (
    <Card style={{ width: "140%" ,paddingTop:"20px" }}>
      <Card.Content>
        <form onSubmit={submitReplyHandler}>
          <h2>Add Comment</h2>
          <div className="ui action input fluid">
            <input
              placeholder="Comment..."
              name="body"
              value={content}
              // error={error ?error.graphQLErrors[0].message: false}
              onChange={changeValuesHandler}
              ref={commentInputRef}
            />
            <button
              type="submit"
              className="ui button teal"
              disabled={content.trim().length === 0}
            >
              Add Comment
            </button>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
}

export default AddPost;
