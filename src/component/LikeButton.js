import React, { useEffect, useState } from "react";
import axiosInstance from "../util/axiosInstance";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Chip, Tooltip, Zoom } from "@mui/material";
import { useNavigate } from "react-router";

// function LikeButton({ likeCount, postId, upvotes, userId, replyId, onSubmit }) {
//   const [liked, setLiked] = useState(false);
//   useEffect(() => {
//     if (upvotes && upvotes.findIndex((upId) => upId === userId) !== -1)
//       setLiked(true);
//     else if (upvotes && upvotes.findIndex((upId) => upId === userId) === -1)
//       setLiked(false);
//   }, [upvotes, userId]);

//   const likePostHandler = async () => {
//     setLiked(!liked);
//     const body = !replyId
//       ? {
//           upvote: true,
//           postId,
//           userId,
//         }
//       : {
//           upvote: true,
//           replyId,
//           userId,
//         };
//     const API_URL = replyId
//       ? `${process.env.REACT_APP_BACKEND_HOST}/reply/vote`
//       : `${process.env.REACT_APP_BACKEND_HOST}/post/vote`;
//     await axiosInstance.patch(API_URL, body);
//     onSubmit();
//   };

//   const likedButton = userId ? (
//     liked ? (
//       <Button color="grey">
//         <Icon name="arrow alternate circle up" />
//       </Button>
//     ) : (
//       <Button color="black" basic>
//         <Icon name="arrow alternate circle up" />
//       </Button>
//     )
//   ) : (
//     <Button as={Link} to="/login" color="grey" basic>
//       <Icon name="arrow alternate circle up" />
//     </Button>
//   );
//   return (
//     <Button as="div" labelPosition="right" onClick={likePostHandler}>
//       <Popup
//         content="upvote this post"
//         inverted
//         position="left center"
//         trigger={likedButton}
//       />
//       <Label basic color="grey" pointing="left">
//         {likeCount}
//       </Label>
//     </Button>
//   );
// }
function LikeButton({
  likeCount,
  postId,
  upvotes,
  userId,
  replyId,
  onSubmit,
  reloader,
}) {
  const [liked, setLiked] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    if (upvotes && upvotes.findIndex((upId) => upId === userId) !== -1)
      setLiked(true);
    else if (upvotes && upvotes.findIndex((upId) => upId === userId) === -1)
      setLiked(false);
  }, [upvotes, userId]);

  const likePostHandler = async () => {
    if(!userId)
    navigate('/login');
    setLiked(!liked);
    const body = !replyId
      ? {
          upvote: true,
          postId,
          userId,
        }
      : {
          upvote: true,
          replyId,
          userId,
        };
    const API_URL = replyId
      ? `${process.env.REACT_APP_BACKEND_HOST}/reply/vote`
      : `${process.env.REACT_APP_BACKEND_HOST}/post/vote`;
    await axiosInstance.patch(API_URL, body);
    // onSubmit();
    reloader();
  };
  useEffect(() => [liked]);
  return (
    <Tooltip
      sx={{}}
      title={<Typography variant="h6">Upvote this post</Typography>}
      followCursor={true}
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 600 }}
    >
      <Chip
        label={
          <Typography label="h7" style={{ marginTop: "6px" }}>
            {likeCount}
          </Typography>
        }
        onDelete={() => {
          likePostHandler();
        }}
        variant={!liked ? "outlined" : "filled"}
        color="success"
        disabled={userId === ""}
        deleteIcon={
          <IconButton>
            <ThumbUpIcon style={{ marginTop: "1px " }} />
          </IconButton>
        }
      />
    </Tooltip>
  );
}
export default LikeButton;
