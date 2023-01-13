import React, { useContext, useEffect, useState } from "react";
// import { Grid, Image, ListItem, Transition } from "semantic-ui-react";
import PostCard from "../component/PostCard";
import { AuthContext } from "../context/auth";
import AddPost from "../component/AddPost";
import axiosInstance from "../util/axiosInstance";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import SortButton from "../component/SortButton";
import Slide from "@mui/material/Slide";
import {
  Alert,
  AlertTitle,
  Collapse,
  Stack,
  Typography,
  ListItem,
  Grid,
  Zoom,
  checkboxClasses,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionGroup } from "react-transition-group";
// function Home() {
//   const authCtx = useContext(AuthContext);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const searchkey = searchParams.get("searchkey");
//   const sort = searchParams.get("sort");
//   // console.log("search from home",searchParams.get("searchkey"));
//   const [posts, setPosts] = useState([]);
//   const { user } = authCtx;

//   useEffect(() => {
//     const getUser = async () => {
//       const response = await axiosInstance(
//         `${process.env.REACT_APP_BACKEND_HOST}/login/user`
//       );
//       if (!response.data.error) authCtx.login({ token: response.data.token });
//       else if (authCtx.user) authCtx.logout();
//     };
//     getUser();
//   }, [authCtx]);

//   useEffect(() => {
//     const getAllBySortPosts = async () => {
//       const response = await axiosInstance.get(
//         `${process.env.REACT_APP_BACKEND_HOST}/post`,
//         { params: { sort } }
//       );
//       setPosts(response.data);
//     };
//     if (sort) getAllBySortPosts();
//   }, [sort]);

//   useEffect(() => {
//     const getSearchPost = async () => {
//       const response = await axiosInstance.get(
//         `${process.env.REACT_APP_BACKEND_HOST}/search`,
//         { params: { searchkey } }
//       );
//       setPosts(response.data);
//     };
//     if (searchkey) getSearchPost();
//     const getAllPosts = async () => {
//       const response = await axiosInstance.get(
//         `${process.env.REACT_APP_BACKEND_HOST}/post`
//       );
//       setPosts(response.data);
//     };
//     if (!searchkey && !sort) getAllPosts();
//   }, [searchkey, sort]);

//   const deletePostHandler = (postId) => {
//     const filterPost = posts.filter(
//       (post) => post._id.toString() !== postId.toString()
//     );
//     setPosts(filterPost);
//   };
//   return (
//     <Grid columns={2}>
//       <Grid.Row className="page-title">
//         {searchkey ? (
//           <h1>
//             Posts which contains{" "}
//             <strong style={{ color: "#00b5ad" }}>{searchkey}</strong>
//           </h1>
//         ) : (
//           <h1>Recent Posts</h1>
//         )}
//         {!user && (
//           <div className="ui yellow mini message">
//             You have to login for accessing posts
//           </div>
//         )}
//       </Grid.Row>
//       <SortButton />
//       <Grid.Row>
//         {user && !searchkey && (
//           <Grid.Column>
//             <AddPost />
//           </Grid.Column>
//         )}
//         {posts && posts.length === 0 ? (
//           <p>No post to show</p>
//         ) : (
//           <Transition.Group>
//             {" "}
//             {posts &&
//               posts.map((post) => (
//                 <Grid.Column key={post._id} style={{ marginBottom: "20px" }}>
//                   <PostCard
//                     post={post}
//                     key={post._id}
//                     deletePostHandler={deletePostHandler}
//                   />
//                 </Grid.Column>
//               ))}
//           </Transition.Group>
//         )}
//       </Grid.Row>
//     </Grid>
//   );
// }

function Home() {
  const [reloadChecker, setReloadChecker] = React.useState(false);
  const authCtx = useContext(AuthContext);
  function Reloader() {
    console.log("ReloaderCalled");
    setReloadChecker(!reloadChecker);
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const searchkey = searchParams.get("searchkey");
  const sort = searchParams.get("sort");
  const reloaderx = searchParams.get("reloader");
  const navigate = useNavigate();
  // console.log("reloader=",reloaderx)
  // if (reloaderx) setReloadChecker(!reloadChecker);
  // console.log("search from home",searchParams.get("searchkey"));
  const [posts, setPosts] = useState([]);
  const { user } = authCtx;

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance(
        `${process.env.REACT_APP_BACKEND_HOST}/login/user`
      );
      if (!response.data.error) authCtx.login({ token: response.data.token });
      else if (authCtx.user) authCtx.logout();
    };
    getUser();
  }, [authCtx]);
  useEffect(() => {}, [posts, reloadChecker]);
  useEffect(() => {
    const getAllBySortPosts = async () => {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_HOST}/post`,
        { params: { sort } }
      );
      setPosts(response.data);
    };
    if (sort) getAllBySortPosts();
  }, [sort, reloadChecker]);

  useEffect(() => {
    const getSearchPost = async () => {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_HOST}/search`,
        { params: { searchkey } }
      );
      setPosts(response.data);
    };
    if (searchkey) getSearchPost();
    const getAllPosts = async () => {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_HOST}/post`
      );
      setPosts(response.data);
    };
    if ((!searchkey && !sort) || reloaderx) {
      getAllPosts();
      if (reloaderx) navigate("/");
    }
  }, [searchkey, sort, reloadChecker, reloaderx]);

  const deletePostHandler = (postId) => {
    console.log("DeletePostHandlerCalled");
    const filterPost = posts.filter(
      (post) => post._id.toString() !== postId.toString()
    );
    setPosts(filterPost);
  };
  const [NotifForSearchPhrase, setNotifForSearchPhrase] = React.useState(true);
  const [NotifForUser, setNotifForUser] = React.useState(user);
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {searchkey ? (
          <>
            <Collapse in={NotifForSearchPhrase} sx={{ width: "100%" }}>
              <Alert
                sx={{
                  "& .MuiAlert-icon": {
                    marginTop: "5px",
                  },
                }}
                severity="info"
                action={
                  <div style={{ marginTop: "9px", marginRight: "12px" }}>
                    <CloseIcon
                      onClick={() => setNotifForSearchPhrase(false)}
                    ></CloseIcon>
                  </div>
                }
              >
                <Typography style={{ paddingBottom: "-40px" }} variant="h5">
                  Posts which contain the phrase <strong>{searchkey}</strong>
                </Typography>
              </Alert>
            </Collapse>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3">Recent Posts</Typography>
          </div>
        )}
        {!user && (
          <Slide direction="down" in={NotifForUser} mountOnEnter unmountOnExit>
            <Alert
              severity="warning"
              sx={{
                "& .MuiAlert-icon": {
                  marginTop: "6px",
                },
              }}
              action={
                <div style={{ marginTop: "25px", marginRight: "12px" }}>
                  <CloseIcon onClick={() => setNotifForUser(false)}></CloseIcon>
                </div>
              }
            >
              <AlertTitle variant="h4">Warning</AlertTitle>
              <Typography variant="h6">
                You Gotta Login
                <strong> to access any of the posts</strong>
              </Typography>
            </Alert>
          </Slide>
        )}
        <ListItem>
          <SortButton />
        </ListItem>
        <ListItem style={{ justifyContent: "center" }}>
          {user && !searchkey && <AddPost reload={Reloader} />}
        </ListItem>
      </Stack>
      {!posts || posts.length === 0 ? (
        <div>no posts to show</div>
      ) : (
        // <TransitionGroup>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            backgroundColor: "",
            paddingBottom: "20px",
          }}
        >
          {posts.map((post) => (
            // <Zoom key={post._id}>
            <Grid item key={post._id} xs={12} md={4} sm={6} lg={4} xl={4}>
              <PostCard
                post={post}
                key={post._id}
                deletePostHandler={deletePostHandler}
                reloader={Reloader}
              />
            </Grid>
            // </Zoom>
          ))}
        </Grid>
        // </TransitionGroup>
      )}
    </>
  );
}

export default Home;
