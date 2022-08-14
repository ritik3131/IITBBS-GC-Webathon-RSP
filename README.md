# IITBBS_GC_Webathon

Members of the team:

- Ritik Gupta
- Satyansh Shukla
- Prateek Singh

## Getting Started

First, installs the dependencies:

```bash
npm install in backend and cliend both
# or
yarn install
```

Second

Add environment variable in .env

Third, run the development server:

```bash
npm start in backend and cliend both
# or
yarn start
```
## Video Demo
[Click here](https://drive.google.com/drive/u/1/folders/1IuRLlRYaGSR4luFGUft8SurHIEgUwn2X)
## Features

- Created an online social media platform where one can interact with others, share posts and comments, like others' posts, etc.

- This app will show the list of comments on the landing page without the login but the user can't access the post(comment, reply, like, dislike, etc…)

- For accessing posts the first user has to login through the mail Id(google oath) then it will redirect the user to a home page where the user can create a new post which will contain an image and caption for the image. Users can now comment on any post and can like or dislike posts and comments.

- It has a searching feature to search a specific user or post and a sorting feature where the user can sort the post by different fields.

- It has a unique feature where users can pin any no of user and then can use a flied from sorting feature to see the post of that specific user

- The above feature is for regular users but if a user is an admin user it has some additional features such as he/she can blacklist a reply of any comments, can blacklist comments(if a comment is blacklisted then it’s all reply will also become blacklisted) and can even blacklist any user(if a user is blacklisted then it’s all reply and comments will also become blacklisted ). And this blackistListed stuff will not be visible to a regular user.

- Backend authorization is maintained by passport.js and JWT Tokens; for the frontend, Context API is used to maintain this.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
