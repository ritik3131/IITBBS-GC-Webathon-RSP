import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Grid, Icon, Search } from "semantic-ui-react";
import axiosInstance from "../util/axiosInstance";

function SearchButton() {
  const [searchkey, setSearchkey] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const changeValuesHandler = (e) => {
    setSearchkey(e.target.value);
  };

  const submitPostHandler = async () => {
    if (searchkey.trim().length > 0) {
      setSearchkey("");
      navigate(`/?searchkey=${searchkey}`);
      setError(false);
    } else setError(true);
  };

  return (
    <>
      <Form onSubmit={submitPostHandler}>
        <Form.Group>
          <Form.Input
            placeholder="Search Post...."
            name="search"
            value={searchkey}
            onChange={changeValuesHandler}
            error={error}
            style={{ marginTop: "1rem", marginBottom: "-2rem" }}
          />
          {/* <Icon color="teal" name="search" /> */}
        </Form.Group>
      </Form>
    </>
  );
}

export default SearchButton;
