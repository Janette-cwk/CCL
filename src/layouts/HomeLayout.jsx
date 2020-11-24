import React, { Component, useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth, Hub } from 'aws-amplify'

const authStyle = {
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  alignItems: "center"
}

const HomeLayout = () => {

  function checkUser() {
    Auth.currentAuthenticatedUser()
    .then(user => {
        console.log(user)
        console.log(user.signInUserSession.accessToken.payload['cognito:groups'])
        let groups  = user.signInUserSession.accessToken.payload['cognito:groups']
        if (groups && groups.includes('admin')) {
          window.location.replace("/admin/courses");
        }
    })
    .catch((err) => {
      console.log("error", err)
    // this.setState({ loaded: true, isAuthenticated: false })
    // window.location.replace("/user/usercourse")
    })
  }
  checkUser()
  useEffect(() => {
    Hub.listen('auth', (data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
       if (payload.event === 'signIn') {
        let groups = payload.data.signInUserSession.accessToken.payload['cognito:groups']
        if (groups && groups.includes('admin')) {
          console.log("admin user")
          window.location.replace("/admin/courses");
        }
        else {
          window.location.replace("/user/usercourse");
        }
         console.log('a user has signed in!')
       }
    })
  }, [])
  return (
    <div id='auth-cont' style={authStyle}>
    <AmplifyAuthenticator usernameAlias="username">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="username"
        formFields={[
          {
            type: "username",
            label: "Username",
            placeholder: "Enter username here",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            placeholder: "Enter password here",
            required: true,
          }
        ]}

      ></AmplifySignUp>
    <AmplifySignOut></AmplifySignOut>
    </AmplifyAuthenticator>
    </div>
  );
  }

export default HomeLayout;
