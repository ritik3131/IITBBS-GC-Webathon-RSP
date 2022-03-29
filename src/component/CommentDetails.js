import {  Stack } from "@mui/material";
import moment from "moment";
import React, { useContext } from "react";
import { Card } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import BlackButton from "./BlackButton";
import DeleteButton from "./DeleteButton";
import DownvoteButton from "./downVoteButton";
import LikeButton from "./LikeButton";

function CommentDetails({ comments, postId, onSubmit }) {
  const { user } = useContext(AuthContext);
  if (!comments) return <p>Loading...</p>;
  return (
    comments &&
    comments.map((comment) => (
      <Card
        fluid
        key={comment._id}
        style={{ backgroundColor: comment.blackList ? "#e6d1d1" : "white" }}
      >
        <Card.Content>
          <Card.Header>{comment.username}</Card.Header>
          <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
          <Card.Description className="content-post">
            {comment.content}
          </Card.Description>
          {comment.blackList && (
            <strong style={{ paddingBottom: "5px" }}>BlackListed</strong>
          )}
          <Stack direction="row" spacing={1}>
            <LikeButton
              replyId={comment._id}
              upvotes={comment.upvotes}
              userId={user ? user.id : ""}
              likeCount={comment.upvotes.length}
              reloader={onSubmit}
            />
            <DownvoteButton
              replyId={comment._id}
              reloader={onSubmit}
              downvotes={comment.downvotes}
              userId={user ? user.id : ""}
              dislikeCount={comment.downvotes.length}
            />
            {user && user.isAdmin && (
              <BlackButton
                blacklist={comment.blackList}
                replyId={comment._id}
                onSubmit={onSubmit}
              />
            )}
            {user && user.name === comment.username && (
              <DeleteButton
                postId={postId}
                commentId={comment._id}
                onSubmit={onSubmit}
                // onDelete={delete}
                userName={comment.username}
              />
            )}
          </Stack>
        </Card.Content>
      </Card>
    ))
  );
}

export default CommentDetails;
