import React, { Component } from 'react'

export default class UserNameInput extends Component {
    constructor(props) {
        super(props);
        this.state= {
            user: ''
        };
    }

    handleChangeUser = (value) =>{
        this.setState({user: value});
    }

    sendUser = () =>{
        this.props.handleUser(this.state.user);
        
    }
    
    render() {
        return (
            <div class="enter-user">
                <label>Enter your UserName:</label>
                <input 
                    type='text'
                    value={this.state.user}
                    placeholder="UserName..."
                    onChange={(event) => this.handleChangeUser(event.target.value)}
                />
                <button 
                    type="button"
                    onClick={() => this.sendUser()}
                    >Send</button>
            </div>
        )
  }
}
