import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import axiosInstance from "../util/axiosInstance";

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
    if(!userId)
    onSubmit();
  };
  return (
    user &&
    user.isAdmin && (
      <Button onClick={toggleBlackListHandler}>
        {blacklist ? "Remove from BlackList" : "Add to BlackList"}
      </Button>
    )
  );
}

export default BlackButton;
