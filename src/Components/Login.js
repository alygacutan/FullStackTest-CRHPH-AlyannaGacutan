import React, { Component } from "react";
import User from "../auth/users";

export default class Login extends Component {
    state = {
      username: "",
      password: "",
      loginErrors: ""
    };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  resetFields(){
    this.setState({
      username: "",
      password: ""
    })
  }

  async handleSubmit(){
    if(!this.state.username){
      return;
    }
    if(!this.state.password){
      return;
    }

    try{
      let res = await fetch("/login",{
        method: "post",
        headers:{
          "Accept" : "application/json",
          "Content-type":"application/json" 
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      let result = await res.json();
      if(result && result.success){
        User.isLoggedIn=true;
        User.username=result.username;
      }else if((result && result.success===false)){
        this.resetFields();
        alert(result.msg);
      }
    }catch(e){
      this.resetFields();
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
