import {
  ListItem,
  Stack,
  Button,
  stepClasses,
  Typography,
  Collapse,
  Zoom,
  TextField,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
// import { Button, Form } from "semantic-ui-react";
import axiosInstance from "../util/axiosInstance";
import AddBoxIcon from "@mui/icons-material/AddBox";
// function AddPost() {
//   const [content, setContent] = useState("");
//   const changeValuesHandler = (e) => {
//     setContent(e.target.value);
//   };
//   const submitPostHandler = async () => {
//     if (content.trim().length > 0)
//       await axiosInstance.post(`${process.env.REACT_APP_BACKEND_HOST}/post`, {
//         content,
//       });
//     setContent("");
//   };

//   return (
//     <>
//       <Form onSubmit={submitPostHandler}>
//         <h2>Create a Post</h2>
//         <Form.Field>
//           <Form.Input
//             placeholder="Hi Guys"
//             name="body"
//             value={content}
//             // error={error ?error.graphQLErrors[0].message: false}
//             onChange={changeValuesHandler}
//           />
//           <Button
//             type="submit"
//             color="teal"
//             disabled={content.trim().length === 0}
//           >
//             Add Post
//           </Button>
//         </Form.Field>
//       </Form>
//     </>
//   );
// }
function NewAddPost({ reload }) {
  const [content, setContent] = useState("");
  const changeValuesHandler = (e) => {
    setContent(e.target.value);
  };
  const submitPostHandler = async () => {
    if (content.trim().length > 0)
      await axiosInstance.post(`${process.env.REACT_APP_BACKEND_HOST}/post`, {
        content,
      });
    setContent("");
    reload();
  };
  const [displayFormInput, setDisplayFormInput] = React.useState(false);
  const Input = styled("input")({
    display: "none",
  });

  return (
    <>
      <Stack style={{ minWidth: "" }}>
        <ListItem sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={() => setDisplayFormInput(!displayFormInput)}
            endIcon={
              <AddBoxIcon style={{ paddingTop: "", transform: "scale(1.2)" }} />
            }
          >
            <Typography variant="h5"> Click To Add New Post </Typography>
          </Button>
        </ListItem>
        <ListItem sx={{ width: "100%", backgroundColor: "" }}>
          <Zoom in={displayFormInput}>
            <Stack
              sx={{
                marginLeft: "",
                width: "100%",
                backgroundColor: "",
              }}
            >
              <ListItem sx={{ width: "100%", backgroundColor: "" }}>
                <TextField
                  fullWidth
                  multiline
                  id="outlined-basic"
                  label="Text For Post"
                  variant="outlined"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </ListItem>
              <ListItem style={{ justifyContent: "center" }}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label>
              </ListItem>
              <ListItem style={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => submitPostHandler()}
                  endIcon={<SendIcon />}
                >
                  <Typography variant="h6">Post</Typography>
                </Button>
              </ListItem>
            </Stack>
          </Zoom>
        </ListItem>
      </Stack>
    </>
  );
}
export default NewAddPost;
