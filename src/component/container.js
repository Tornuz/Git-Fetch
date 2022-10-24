import React from "react";
import { useState } from "react";
import UserForm from "./other/form";
import axios from "axios";
import "../App.css";

const ContainerExampleText = () => {
    
  const [info, setInfo] = useState({
    repos: null,
    name: null,
    followers: null,
    following: null,
    url: null,
    user: null,
    img: null,
    bio: null,
  })
  const getuser = (e) => {
    e.preventDefault();
    const user = e.target.elements.username.value;

    if (user) {
      axios.get(`https://api.github.com/users/${user}`).then((res) => {
        const repos = res.data.public_repos;
        const name = res.data.name;
        const followers = res.data.followers;
        const following = res.data.following;
        const url = res.data.html_url;
        const user = res.data.login;
        const img = res.data.avatar_url;
        const bio = res.data.bio;
        setInfo({
          name,
          repos,
          followers,
          following,
          url,
          user,
          img,
          bio,
        });
      });
    } else return;
  };

  return (
    <div className="App" id="main-div">
      <div className="row">
        <div className="col s12 m6">
          <div className="card">
            <div className="card-title" id="title">
              Git Fetch
            </div>
            <div className="card-content">
              <UserForm getuser={getuser} />
              {info.repos ? (
                <div>
                  <img alt="" src={info.img} id={"img"} />
                  {info.bio ? (
                    <div id={"span1"}>BIO : {info.bio}</div>
                  ) : (
                    <div> </div>
                  )}

                  <p></p>
                  <span id={"span3"}>Name : {info.name}</span>
                  <span id={"span2"}>
                    {" "}
                    No of repos are : {info.repos}
                  </span>

                  <p></p>
                  <span id={"span6"}>Followers : {info.followers}</span>
                  <span id={"span4"}>Following : {info.following}</span>
                  <p></p>
                  <span id={"span5"}>URL : {info.url}</span>
                </div>
              ) : (
                <p id={"other"}>Please enter username </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerExampleText;
