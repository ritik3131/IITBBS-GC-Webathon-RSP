import React, { useState } from "react";
import { useNavigate } from "react-router";
// import { Button, Form, Grid, Icon, Search } from "semantic-ui-react";
import axiosInstance from "../util/axiosInstance";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { AppBar } from "@mui/material";
// function SearchButton() {
//   const [searchkey, setSearchkey] = useState("");
//   const navigate = useNavigate();
//   const [error, setError] = useState(false);
//   const changeValuesHandler = (e) => {
//     setSearchkey(e.target.value);
//   };

//   const submitPostHandler = async () => {
//     if (searchkey.trim().length > 0) {
//       setSearchkey("");
//       navigate(`/?searchkey=${searchkey}`);
//       setError(false);
//     } else setError(true);
//   };

//   return (
//     <>
//       <Form onSubmit={submitPostHandler}>
//         <Form.Group>
//           <Form.Input
//             placeholder="Search Post...."
//             name="search"
//             value={searchkey}
//             onChange={changeValuesHandler}
//             error={error}
//             style={{ marginTop: "1rem", marginBottom: "-2rem" }}
//           />
//           {/* <Icon color="teal" name="search" /> */}
//         </Form.Group>
//       </Form>
//     </>
//   );
// }
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  // borderColor:'blue',
  // backgroundColor:"blue",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    // backgroundColor:"#3B8AD9",
    color: "black",

    padding: theme.spacing(2, 0, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  color: "black",
  // backgroundColor:"pink",
  // backgroundColor:"pink",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
function SearchButton() {
  const [searchkey, setSearchkey] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const changeValuesHandler = (e) => {
    setSearchkey(e.target.value);
  };

  const submitPostHandler = async () => {
    console.log("ok");
    if (searchkey.trim().length > 0) {
      setSearchkey("");
      navigate(`/?searchkey=${searchkey}`);
      setError(false);
    } else setError(true);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitPostHandler();
    }
  };
  return (
    <Search style={{}}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={changeValuesHandler}
        onClick={() => {
          submitPostHandler();
        }}
        onKeyDown={handleKeyDown}
      />
    </Search>
  );
}
export default SearchButton;
