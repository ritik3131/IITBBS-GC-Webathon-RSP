import { Button, Collapse, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { ListItem } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FeedIcon from "@mui/icons-material/Feed";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import { Button, Select } from "semantic-ui-react";

// function SortButton() {
//   const options = [
//     { key: "s", text: "Upvotes", value: "Upvotes" },
//     { key: "t", text: "Newest", value: "createdAt" },
//   ];
//   const navigate = useNavigate();
//   const changeSortingOrderHandler = (e) => {
//     const sort = e.target.textContent === "Upvotes" ? "hot" : "";
//     if (sort) navigate(`/?sort=${sort}`);
//     else navigate(`/`);
//   };
//   return (
//     <Select
//       placeholder="Sort By"
//       options={options}
//       onChange={changeSortingOrderHandler}
//     />
//   );
// }
function SortButton() {
  const options = [
    { key: "s", text: "Upvotes", value: "Upvotes" },
    { key: "t", text: "Newest", value: "createdAt" },
    { key: "p", text: "Pinned user", value: "pinned" },
  ];
  const navigate = useNavigate();
  const changeSortingOrderHandler = (e) => {
    const sort = e.target.textContent === "Upvotes" ? "hot" : ( e.target.textContent==="Pinned user"?"pinned":"");
    if (sort) navigate(`/?sort=${sort}`);
    else navigate(`/`);
  };
  const [handleTransition, setHandleTransition] = React.useState(false);
  const SelectItem = (
    <>
      <Button
        variant="contained"
        onClick={() => setHandleTransition(!handleTransition)}
        endIcon={ !handleTransition ? <SortIcon /> : <CloseIcon />}
      >
        <Typography variant="h6">
          {!handleTransition ? `Sort By ` : `Close Dialog Box`}
        </Typography>
      </Button>
    </>
  );
  function RenderItem(data) {
    return (
      <>
        <ListItem>
          <Button
            variant="contained"
            endIcon={
              data.text === "Upvotes" ? (
                <ThumbUpIcon sx={{ marginTop: "-2px", marginLeft: "3px" }} />
              ) :(data.text==="Pinned user"?(<PersonOutlineIcon  sx={{ marginTop: "-2px", marginLeft: "10px" }}/>): (
                <FeedIcon sx={{ marginTop: "-2px", marginLeft: "10px" }} />
              ))
            }
            onClick={() => {
              changeSortingOrderHandler({
                target: { textContent: data.text },
              });
            }}
          >
            <Typography variant="h7">{data.text}</Typography>
          </Button>
        </ListItem>
      </>
    );
  }
  return (
    <>
      <Stack sx={{ marginLeft: "" }}>
        <ListItem>{SelectItem}</ListItem>
        {options.map((item) => (
          <Collapse in={handleTransition} key={item.key}>
            {RenderItem(item)}
          </Collapse>
        ))}
      </Stack>
    </>
  );
}
export default SortButton;
