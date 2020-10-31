import React, { Component } from "react";
import {observer} from "mobx-react";
import User from "./auth/users";
import Login from "./Components/Login";


class App extends Component {

  async componentDidMount() {
    try{
      let res =  await fetch('/isLoggedIn',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });
      let result = await res.json();

      if(result && result.success){
        User.loading = false;
        User.isLoggedIn=true;
        User.username=result.username;
      }else{
        User.loading = false;
        User.isLoggedIn=false;
      }
    }catch(e){
      User.loading = false;
      User.isLoggedIn=false;
      console.log("Error: ",e);
    }
  }

  async logout() {
    try{
      let res =  await fetch('/logout',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });
      let result = await res.json();

      if(result && result.success){
        // User.loading = false;
        User.isLoggedIn=false;
        User.username='';
      }
    }catch(e){
      console.log("Error: ",e);
    }
  }

  render() {
    if(User.loading){
      return(
        <div className="app">
          <div className="container">
            Loading...
          </div>
        </div>
      )
    }else{
      if(User.isLoggedIn){
        return(
          <div className="app">
            <div className="container">
              Welcome {User.username}!
              sasdasd
              <button type="submit" onClick={() =>this.logout()}>Log Out</button>
            </div>
          </div>
        )
      }else{
        return (
          <div className="app">
            <div className="container">
              <Login/>
            </div>
          </div>
        );
      }
    }
  }
}
export default observer(App);
