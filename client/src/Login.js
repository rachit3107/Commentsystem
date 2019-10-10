import React from 'react';
import "./App.css";
import Service from './Service';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showFailure: false,
        };
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
    }


    email(e) {
        this.setState({ email: e.target.value, showFailure: false })
    }
    password(e) {
        this.setState({ password: e.target.value, showFailure: false })
    }
    handleSubmit = async event => {
        try {
          let body ={
              email: this.state.email,
              password: this.state.password
          }
        let service = new Service();
        let response =await service.login(body);
        window.open(`http://localhost:3000/?p=home&user=${this.state.email}`, '_self');
        } catch (error) {
            this.setState({
                showFailure: true 
            })
        }
    }
    render() {
        return (
            <div className="AppKey">
                <h1 align="center">Hello!</h1>
                <h2 align="center"><strong>Login to your account</strong></h2>
                <form>
                    <label>Username</label><br />
                    <input value={this.state.email} type="text" placeholder="email" onChange={this.email} /><br />
                    <label>Passoword</label><br />
                    <input value={this.state.password} type="password" placeholder="password" onChange={this.password} /><br />
                </form>
                <button style={{ marginLeft: '560px', width: '250px' }} disabled={!this.state.email || !this.state.password} className="btn" onClick={this.handleSubmit}>Submit</button>
                <FailureMessage failure={this.state.showFailure}></FailureMessage>
            </div>
        );
    }
}

function FailureMessage(props) {
    if (props.failure)
        return <p style={{ color: 'red', fontSize: '18px', marginLeft: '590px' }}>Authentication Failed</p>
    else
        return <p></p>
}



export default Home;
