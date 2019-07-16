import React, {Component} from 'react';

class InputMessage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    sendMessage = () => {
        this.props.socket.emit('chat', {
            user: this.props.user,
            message: this.state.message
        });
        this.setState({message: ''})
        //this.props.handleTypingEnd();
        /*const typing = {
            flag:false,
            userName: ""
        };
        this.setState({typing});*/
    }

    handleChangeMessage = (value) => {
        this.setState({message: value});
        console.log(this.props.user);
        this.props.socket.emit('typing', {
            user: this.props.user
        });
    }

    render() {
        return(
            <div class="message-input">
                <label>{this.props.user} : </label>
                <input 
                    type='text'
                    value={this.state.message}
                    placeholder="Enter Your Message"
                    onChange={(event) => this.handleChangeMessage(event.target.value)}
                />
                <button 
                    type="button"
                    onClick={() => this.sendMessage()}
                    >Send</button>
            </div>
        )
    }  
}    

export default InputMessage;