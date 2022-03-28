import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axiosInstance from "../util/axiosInstance";
// import React, { useEffect, useState } from "react";
// import axiosInstance from "../util/axiosInstance";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Chip, Tooltip, Zoom } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
// function DownvoteButton({
//   likeCount,
//   postId,
//   downvotes,
//   userId,
//   replyId,
//   onSubmit,
// }) {
//   const [downVote, setdownVote] = useState(false);
//   useEffect(() => {
//     if (downvotes && downvotes.findIndex((upId) => upId === userId) !== -1)
//       setdownVote(true);
//     else if (downvotes && downvotes.findIndex((upId) => upId === userId) === -1)
//       setdownVote(false);
//   }, [downvotes, userId]);
//   const devotePostHandler = async () => {
//     setdownVote(!downVote);
//     const body = !replyId
//       ? {
//           upvote: false,
//           postId,
//           userId,
//         }
//       : {
//           upvote: false,
//           replyId,
//           userId,
//         };
//     const API_URL = replyId
//       ? `${process.env.REACT_APP_BACKEND_HOST}/reply/vote`
//       : `${process.env.REACT_APP_BACKEND_HOST}/post/vote`;
//     await axiosInstance.patch(API_URL, body);
//     onSubmit();
//   };

//   const devoteButton = userId ? (
//     downVote ? (
//       <Button color="red">
//         <Icon name="arrow alternate circle down" />
//       </Button>
//     ) : (
//       <Button color="red" basic>
//         <Icon name="arrow alternate circle down" />
//       </Button>
//     )
//   ) : (
//     <Button as={Link} to="/login" color="red" basic>
//       <Icon name="arrow alternate circle down" />
//     </Button>
//   );
//   return (
//     <Button as="div" labelPosition="right" onClick={devotePostHandler}>
//       <Popup
//         content="downvote this post"
//         inverted
//         position="left center"
//         trigger={devoteButton}
//       />
//       <Label basic color="red" pointing="left">
//         {likeCount}
//       </Label>
//     </Button>
//   );
// }
function DownvoteButton({
  dislikeCount,
  postId,
  downvotes,
  userId,
  replyId,
  // onSubmit,
  reloader,
}) {
  const [downVote, setdownVote] = useState(false);
  useEffect(() => {
    if (downvotes && downvotes.findIndex((upId) => upId === userId) !== -1)
      setdownVote(true);
    else if (downvotes && downvotes.findIndex((upId) => upId === userId) === -1)
      setdownVote(false);
  }, [downvotes, userId]);
  const devotePostHandler = async () => {
    setdownVote(!downVote);
    const body = !replyId
      ? {
          upvote: false,
          postId,
          userId,
        }
      : {
          upvote: false,
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

  return (
    <>
      <Tooltip
        TransitionComponent={Zoom}
        followCursor={true}
        title={<Typography variant="h6">Report this post</Typography>}
        TransitionProps={{ timeout: 600 }}
      >
        <Chip
          label={
            <Typography label="h7" style={{ marginTop: "2px" }}>
              {dislikeCount ? dislikeCount : `0`}
            </Typography>
          }
          onDelete={() => {
            devotePostHandler();
          }}
          // variant="outlined"
          variant={!downVote ? "outlined" : "filled"}
          // variant={!liked ? "outlined" : "filled"}
          color="error"
          disabled={userId === ""}
          deleteIcon={
            <IconButton>
              <ReportProblemIcon
                style={{ marginTop: "0px ", paddingRight: "2px" }}
              />
            </IconButton>
          }
        />
      </Tooltip>
    </>
  );
}
export default DownvoteButton;
