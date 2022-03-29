import React, { useContext } from "react";
import axiosInstance from "../util/axiosInstance";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { Tooltip, Zoom } from "@mui/material";
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
  const { user } = useContext(AuthContext);
  const deletePostHandler = async () => {
    const API_URL = commentId
      ? `${process.env.REACT_APP_BACKEND_HOST}/reply/${commentId}/delete/${postId}`
      : `${process.env.REACT_APP_BACKEND_HOST}/post/${postId}`;
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
