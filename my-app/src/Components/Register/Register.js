import React, { Component } from 'react';


class Register extends Component {

  constructor(props){
    super(props);

    this.state = {

      registerinEmail: '',
      registerinName: '',
      registerinPassword: ''
    }

  }

  onNameChange = (event) => {
   
      this.setState({registerinName: event.target.value})
    

  }

  onEmailChange = (event) => {
    this.setState({registerinEmail: event.target.value})

  }
  onPasswordChange = (event) => {
    this.setState({registerinPassword: event.target.value})

  }

  onSubmitRegister = () => {
    fetch('http://localhost:4000/register', {
      method: "post",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        name: this.state.registerinName,
        email: this.state.registerinEmail,
        password: this.state.registerinPassword
        
      })
    }).then(response => response.json()).then(data => {
      if(typeof data === 'object') {
        this.props.onRouteChange('signin')
        alert("User Register with success");
      } else {
        alert(data);
      }
    })

    
  }

  render() {


    return (
      <div>
          <article className="br4 ba dark-gray b--black-10 mv3 w-100 w-50-m w-25-l mw7 shadow-5 center">
      <div className="measure">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f1 fw6 ph0 mh0">Register</legend>
        <div className="mt3">
          <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
          <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
        </div>
        <div className="mt3">
          <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
          <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"  />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
          <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
        </div>
      </fieldset>
      <div className="">
        <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
      </div>
    </div>
    </article>
      </div>
      
    );
  }


}



export default Register;