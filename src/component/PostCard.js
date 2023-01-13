import React, { useContext } from "react";
// import { Button, Card, Icon, Image, Label, Popup } from "semantic-ui-react";
import moment from "moment";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DownvoteButton from "./downVoteButton";
import BlackButton from "./BlackButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { CardMedia } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Chip, Tooltip, Zoom } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteButton from "./DeleteButton";
import PinnedButton from "./PinnedButton";
// function PostCard({ post, deletePostHandler }) {
//   const {
//     content: body,
//     createdAt,
//     upvotes,
//     downvotes,
//     _id: id,
//     username: userName,
//     replies,
//     userid,
//     blacklist,
//   } = post;
//   const upvotesCount = upvotes.length;
//   const downvotesCount = downvotes.length;
//   const commentCount = replies.length;
//   const { image: userImage, mailId: userEmailId } = userid;
//   const { user } = useContext(AuthContext);
//   const blacklistPopup = (
//     <div>
//       <p>{userName}</p>
//       {user && user.isAdmin && (
//         <BlackButton userId={userid._id} blacklist={userid.blackList} />
//       )}
//     </div>
//   );

//   return (
//     <Card fluid>
//       <Card.Content>
//         <Popup
//           wide
//           trigger={
//             <Image floated="right" size="massive" src={userImage} avatar />
//           }
//           on="click"
//         >
//           {blacklistPopup}
//         </Popup>
//         <Card.Header>{userName}</Card.Header>
//         <Card.Meta as={Link} to={`/posts/${post._id}`}>
//           {moment(createdAt).fromNow()}
//         </Card.Meta>
//         <Card.Description>{body}</Card.Description>
//         {blacklist && <strong>BlackListed</strong>}
//       </Card.Content>
//       <Card.Content extra>
//         <LikeButton
//           postId={id}
//           upvotes={upvotes}
//           userId={user ? user.id : ""}
//           likeCount={upvotesCount}
//         />
//         <DownvoteButton
//           postId={id}
//           downvotes={downvotes}
//           userId={user ? user.id : ""}
//           likeCount={downvotesCount}
//         />
//         <Popup
//           content="Click here to add comment on this post"
//           inverted
//           position="right center"
//           trigger={
//             <Button
//               as="div"
//               labelPosition="right"
//               as={Link}
//               to={`/posts/${id}`}
//             >
//               <Button color="blue" basic>
//                 <Icon name="comments" />
//               </Button>
//               <Label basic color="blue" pointing="left">
//                 {commentCount}
//               </Label>
//             </Button>
//           }
//         />
//         {user && user.name === userName && (
//           <DeleteButton postId={id} onDelete={deletePostHandler} />
//         )}
//       </Card.Content>
//     </Card>
//   );
// }
const useStyles = makeStyles((theme) => ({
  customTooltip: {
    // I used the rgba color for the standard "secondary" color
    backgroundColor: "white",
  },
  customArrow: {
    color: "rgba(220, 0, 78, 0.8)",
  },
}));
function PostCard({ post, deletePostHandler, reloader ,pinned}) {
  const navigate = useNavigate();
  const {
    content: body,
    createdAt,
    upvotes,
    downvotes,
    _id: id,
    username: userName,
    noOfReplies,
    userid,
    blacklist,
    image,
  } = post;
  const upvotesCount = upvotes.length;
  const downvotesCount = downvotes.length;
  const commentCount = noOfReplies || 0;
  const { image: userImage } = userid;
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const blackListBackground = blacklist ? "#e6d1d1" : "white";
  return (
    <>
      <Card
        sx={{ maxWidth: "345" }}
        style={{ backgroundColor: blackListBackground }}
      >
        <CardHeader
          avatar={
            <Tooltip
              // sx={{ backgroundColor: "white" }}
              classes={{
                tooltip: classes.customTooltip,
                arrow: classes.customArrow,
              }}
              TransitionComponent={Zoom}
              // followCursor={true}
              TransitionProps={{ timeout: 600 }}
              title={
                <>
                  <PinnedButton
                    pinnedUser={pinned}
                    userId={userid._id}
                    onSubmit={reloader}
                  />
                  {user && user.isAdmin && (
                    <BlackButton
                      userId={userid._id}
                      blacklist={userid.blackList}
                      onSubmit={reloader}
                    />
                  )}

                  {/* <Button style={{}} variant="outlined"> */}
                  {/* click me */}
                  {/* </Button> */}
                </>
              }
            >
              <Avatar
                src={userImage}
                sx={{ width: "70px", height: "70px" }}
              ></Avatar>
            </Tooltip>
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
          height="194"
          width="194px"
          image={`https://whats-brewing.onrender.com/${image}`}
          alt="Post Image"
        />

        <CardContent style={{}}>
          <Typography variant="h6" style={{ wordWrap: "break-word" }}>
            {body}
          </Typography>
        </CardContent>
        {blacklist && <strong style={{ padding: "17px" }}>BlackListed</strong>}
        <CardActions>
          <LikeButton
            postId={id}
            upvotes={upvotes}
            userId={user ? user.id : ""}
            likeCount={upvotesCount}
            reloader={reloader}
          />
          <DownvoteButton
            postId={id}
            downvotes={downvotes}
            userId={user ? user.id : ""}
            dislikeCount={downvotesCount}
            reloader={reloader}
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
          {/* <Tooltip
            TransitionComponent={Zoom}
            followCursor={true}
            title={<Typography variant="h6">Delete this post</Typography>}
            TransitionProps={{ timeout: 600 }}
          >
            <IconButton
              color="error"
              onClick={() => {
                deletePostHandler(id);
              }}
            >
              {user && user.name === userName && <DeleteForever />}
            </IconButton>
          </Tooltip> */}
          {user && user.name === userName && (
            <DeleteButton
              postId={id}
              onDelete={deletePostHandler}
              userName={userName}
            />
          )}
        </CardActions>
      </Card>
    </>
  );
}
export default PostCard;
