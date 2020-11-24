import React from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { Auth, Hub } from 'aws-amplify'

class PrivateRoute extends React.Component {
    state = {
      loaded: false,
      isAuthenticated: false
    }
    async componentDidMount() {
        await Auth.currentAuthenticatedUser()
        .then(user => {
            console.log(user)
            console.log(user.signInUserSession.accessToken.payload['cognito:groups'])
            let groups  = user.signInUserSession.accessToken.payload['cognito:groups']
            if (groups && groups.includes('admin')) {
                this.setState({ loaded: true, isAuthenticated: true })
            }
            else {
              this.setState({ loaded: true, isAuthenticated: false })
            }
        })
        .catch((err) => {
          console.log("error", err)
        // this.setState({ loaded: true, isAuthenticated: false })
          window.location.replace("/user/usercourse")
        })
    }
    render() {
      const { component: Component, ...rest } = this.props
      const { loaded , isAuthenticated} = this.state
      console.log(this.state)
      console.log(this.props)
      if (!loaded) return null
      return (
        <Route
          {...rest}
          render={props => {
            return isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/user/usercourse",
                }}
              />
            )
          }}
        />
      )
    }
  }
  PrivateRoute = withRouter(PrivateRoute)
  export default PrivateRoute