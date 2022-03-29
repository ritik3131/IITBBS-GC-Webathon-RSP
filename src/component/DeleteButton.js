import React, { useContext, useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../util/axiosInstance";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { Chip, Tooltip, Zoom } from "@mui/material";
import { AuthContext } from "../context/auth";
// function DeleteButton({ postId, commentId, onDelete, onSubmit }) {
//   const [confirmOpen, setComfirmOpen] = useState(false);
//   const navigate = useNavigate();
//   const deletePostHandler = async () => {
//     const API_URL = commentId
//       ? `${process.env.REACT_APP_BACKEND_HOST}/reply/${commentId}/delete/${postId}`
//       : `${process.env.REACT_APP_BACKEND_HOST}/post/${postId}`;
//     setComfirmOpen(false);
//     if (!commentId) onDelete(postId);
//     else onSubmit();
//     await axiosInstance.delete(API_URL);
//   };
//   return (
//     <>
//       <Popup
//         content={`Delete this ${commentId ? "comment" : "post"}`}
//         inverted
//         position="right center"
//         trigger={
//           <Button
//             as="div"
//             color="red"
//             floated="right"
//             onClick={() => setComfirmOpen(true)}
//           >
//             <Icon name="trash" style={{ margin: 0 }} />
//           </Button>
//         }
//       />
//       <Confirm
//         open={confirmOpen}
//         onCancel={() => setComfirmOpen(false)}
//         onConfirm={deletePostHandler}
//       />
//     </>
//     //   )}
//   );
// }
function DeleteButton({ postId, commentId, onDelete, onSubmit, userName }) {
  const [confirmOpen, setComfirmOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const deletePostHandler = async () => {
    const API_URL = commentId
      ? `${process.env.REACT_APP_BACKEND_HOST}/reply/${commentId}/delete/${postId}`
      : `${process.env.REACT_APP_BACKEND_HOST}/post/${postId}`;
    setComfirmOpen(false);
    if (commentId) await axiosInstance.delete(API_URL);
    if (!commentId) onDelete(postId);
    else onSubmit();
    if (!commentId) await axiosInstance.delete(API_URL);
  };

  return (
    <>
      <Tooltip
        TransitionComponent={Zoom}
        followCursor={true}
        title={<Typography variant="h6">Delete this post</Typography>}
        TransitionProps={{ timeout: 600 }}
      >
        <IconButton
          color="error"
          onClick={() => {
            deletePostHandler();
          }}
        >
          {user && user.name === userName && <DeleteForever />}
        </IconButton>
      </Tooltip>
    </>
  );
}
export default DeleteButton;
