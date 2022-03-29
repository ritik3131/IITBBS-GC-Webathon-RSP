import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import moment from "moment";
import LikeButton from "../component/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../component/DeleteButton";
import CommentDetails from "../component/CommentDetails";
import AddComment from "../component/AddComment";
import DownvoteButton from "../component/downVoteButton";
import axiosInstance from "../util/axiosInstance";
import BlackButton from "../component/BlackButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { CardMedia, Chip, Tooltip, Zoom } from "@mui/material";

function PostDetails() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState({});
  const [submit, setSubmit] = useState(0);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const getOnePost = async () => {
      const response = await axiosInstance(
        `${process.env.REACT_APP_BACKEND_HOST}/post/currentPost/${postId}`
      );
      const { post, replies } = response.data;
      setPost(post);
      setReplies(replies);
    };
    getOnePost();
    console.log("rerender triggered");
  }, [submit, postId]);
  if (Object.keys(post).length === 0) return <p>Loading...</p>;
  const {
    content: body,
    createdAt,
    upvotes,
    downvotes,
    _id: id,
    username: userName,
    blacklist,
    userid,
    image
  } = post;

  const { image: userImage} = userid || {
    image: "",
    mailId: "",
  };

  const upVotesCount = upvotes.length;
  const downVotesCount = downvotes.length;
  const commentCount = replies.length;

  const deletePostHandler = () => {
    // history.push("/");
    // history.go(0)
    navigate("/?reloader=true", { replace: true });
    console.log("Post deleted");
  };
  const submitCommentHandler = () => {
    setSubmit(submit + 1);
  };
  return (
    <>
      <Card sx={{}}>
        <CardHeader
          avatar={
            <Avatar
              src={userImage}
              sx={{ width: "100px", height: "100px" }}
            ></Avatar>
          }
          title={<Typography variant="h5">{userName}</Typography>}
          subheader={
            <Typography variant="h7">
              posted : {moment(createdAt).fromNow()}
            </Typography>
          }
        />

        <CardMedia
          component="img"
          height="auto"
          width="194px"
          image={`http://localhost:9000/${image}`}
          alt="Post Image"
        />
        <CardContent style={{}}>
          <Typography variant="h6" style={{ wordWrap: "break-word" }}>
            {body}
          </Typography>
        </CardContent>
        <CardActions>
          <LikeButton
            postId={id}
            upvotes={upvotes}
            userId={user ? user.id : ""}
            likeCount={upVotesCount}
            reloader={submitCommentHandler}
          />
          <DownvoteButton
            postId={id}
            downvotes={downvotes}
            userId={user ? user.id : ""}
            dislikeCount={downVotesCount}
            reloader={submitCommentHandler}
          />

          <Tooltip
            TransitionComponent={Zoom}
            followCursor={true}
            title={<Typography variant="h6">Comment on this post</Typography>}
            TransitionProps={{ timeout: 600 }}
          >
            <Chip
              label={
                <Typography label="h7" style={{ marginTop: "6px" }}>
                  {commentCount}
                </Typography>
              }
              onDelete={() => {
                navigate(`/posts/${id}`);
              }}
              variant="outlined"
              color="primary"
              disabled={user === null}
              deleteIcon={
                <IconButton>
                  <InsertCommentIcon
                    style={{ marginTop: "4px ", paddingRight: "2px" }}
                  />
                </IconButton>
              }
            />
          </Tooltip>
          {user && user.isAdmin && (
            <BlackButton
              blacklist={blacklist}
              postId={postId}
              onSubmit={submitCommentHandler}
            />
          )}

          {user && user.name === userName && (
            <DeleteButton
              postId={postId}
              onDelete={deletePostHandler}
              userName={userName}
            />
          )}
        </CardActions>
      </Card>
      {user && <AddComment onSubmit={submitCommentHandler} postId={postId} />}
      <CommentDetails
        comments={replies}
        postId={postId}
        onSubmit={submitCommentHandler}
        delete={deletePostHandler}
      />
    </>
  );
}
export default PostDetails;
