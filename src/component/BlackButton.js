import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import axiosInstance from "../util/axiosInstance";
import { Tooltip, IconButton, Typography, Zoom, Chip } from "@mui/material";
import DeleteForever from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// function BlackButton({ blacklist, postId, onSubmit, replyId, userId }) {
//   const { user } = useContext(AuthContext);
//   const toggleBlackListHandler = async () => {
//     const body = userId
//       ? {
//           userId,
//           blacklist,
//         }
//       : replyId
//       ? {
//           replyId,
//           blacklist,
//         }
//       : {
//           postId,
//           blacklist,
//         };
//     const API_URL = userId
//       ? `${process.env.REACT_APP_BACKEND_HOST}/user/blacklist`
//       : replyId
//       ? `${process.env.REACT_APP_BACKEND_HOST}/reply/blacklist`
//       : `${process.env.REACT_APP_BACKEND_HOST}/post/blacklist`;
//     await axiosInstance.patch(API_URL, body);
//     if (!userId) onSubmit();
//   };
//   return (
//     user &&
//     user.isAdmin && (
//       <Button onClick={toggleBlackListHandler}>
//         {blacklist ? "Remove from BlackList" : "Add to BlackList"}
//       </Button>
//     )
//   );
// }
function BlackButton({ blacklist, postId, onSubmit, replyId, userId }) {
  const { user } = useContext(AuthContext);
  const toggleBlackListHandler = async () => {
    const body = userId
      ? {
          userId,
          blacklist,
        }
      : replyId
      ? {
          replyId,
          blacklist,
        }
      : {
          postId,
          blacklist,
        };
    const API_URL = userId
      ? `${process.env.REACT_APP_BACKEND_HOST}/user/blacklist`
      : replyId
      ? `${process.env.REACT_APP_BACKEND_HOST}/reply/blacklist`
      : `${process.env.REACT_APP_BACKEND_HOST}/post/blacklist`;

    await axiosInstance.patch(API_URL, body);
    onSubmit();
  };

  return (
    <>
      {user && user.isAdmin && (
        <Tooltip
          TransitionComponent={Zoom}
          followCursor={true}
          title={
            <Typography variant="h6">
              {blacklist ? "Remove from BlackList" : "Add to BlackList"}
            </Typography>
          }
          TransitionProps={{ timeout: 600 }}
        >
          <Chip
            label={
              <Typography label="h7" style={{ marginTop: "3px" }}>
                {blacklist ? "Remove from BlackList" : "Add to BlackList"}
              </Typography>
            }
            onDelete={() => {
              toggleBlackListHandler();
            }}
            // variant="outlined"
            variant={blacklist ? "outlined" : "filled"}
            // variant={!liked ? "outlined" : "filled"}
            color="error"
            disabled={userId === ""}
            deleteIcon={
              <IconButton
                color="error"
                onClick={() => {
                  toggleBlackListHandler();
                }}
              >
                {blacklist ? <DeleteForever /> : <AddCircleOutlineIcon />}
              </IconButton>
            }
          />
        </Tooltip>
      )}
    </>
  );
}
export default BlackButton;
