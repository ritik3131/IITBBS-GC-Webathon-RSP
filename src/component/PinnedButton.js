import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import axiosInstance from "../util/axiosInstance";
import { Tooltip, IconButton, Typography, Zoom, Chip } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
function PinnedButton({ onSubmit, userId ,pinnedUser}) {
  const pinnedIndex = pinnedUser.findIndex(
    (user) =>{ 
      return user.toString() === userId.toString()}
  );

  const { user } = useContext(AuthContext);
  const togglePinnedHandler = async () => {
    const body = { userId };
    const API_URL = `${process.env.REACT_APP_BACKEND_HOST}/user/togglepin`;

    await axiosInstance.patch(API_URL, body);
    onSubmit();
  };

  return (
    <>
      {user && (
        <Tooltip
          style={{ margin: "0.5rem" }}
          TransitionComponent={Zoom}
          followCursor={true}
          title={
            <Typography variant="h6">
              {pinnedIndex === -1 ? "Pin this user" : "Unpin this user"}
            </Typography>
          }
          TransitionProps={{ timeout: 600 }}
        >
          <Chip
            label={
              <Typography label="h7" style={{ marginTop: "3px" }}>
                {pinnedIndex === -1 ? "Pin this user" : "Unpin this user"}
              </Typography>
            }
            onDelete={() => {
              togglePinnedHandler();
            }}
            // variant="outlined"
            variant={pinnedIndex === -1 ? "outlined" : "filled"}
            // variant={!liked ? "outlined" : "filled"}
            color="error"
            disabled={userId === ""}
            deleteIcon={
              <IconButton
                color="error"
                onClick={() => {
                  togglePinnedHandler();
                }}
              >
                {pinnedIndex === -1 ? (
                  <PersonAddAltIcon />
                ) : (
                  <GroupRemoveIcon />
                )}
              </IconButton>
            }
          />
        </Tooltip>
      )}
    </>
  );
}

export default PinnedButton;
