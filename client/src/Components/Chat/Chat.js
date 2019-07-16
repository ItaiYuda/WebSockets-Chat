import React, { Component } from 'react';
import socketIOCilent from 'socket.io-client';
import InputMessage from './InputMessage';
import UserNameInput from './UserNameInput';
import './style.css';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            flag: false,
            typing: {
                flag: false,
                userName: ""
            },
            data: []
        };
        this.socketListener = this.socketListener;
        this.socket = socketIOCilent("http://localhost:4000/");
    }

    componentWillUnmount = () => {
        this.socket.close();
    }

    componentDidMount = () => {
        this.socketListener();
    }

    socketListener = () => {
        this.socket.on('handshakeChat', (data) => {
            this.setState({data});
        })
        this.socket.on("chat", (newData) => {
            console.log(newData);
            var {data} = this.state;
            data.push(newData)
            this.setState({data})
            console.log("state: ", this.state.data);
            this.setState({typing: {
                flag: false,
                userName: ''
            }});
        })
        this.socket.on('typing', (data) => {
            console.log("in socket typing ", data.user);
            this.setState({typing: {
                flag: true,
                userName: data.user
            }});
            
            //this.someOneTyping();
        })
    }

    handleTypingEnd = () => {
        this.setState({typing: {
            flag: false,
            userName: ''
        }});
    }
    
    handleUser = (value) =>{
        this.setState({user: value});
        this.setState({flag: true});
    }

    renderTyping = () => {
        if(this.state.typing.flag){
            
            return (
            <p>{this.state.typing.userName} is Typing..</p>
            )
        }
        else
            return <p></p>;
            
    }

    

    renderMessage = () =>{
        return (
            <div class="chat box">
                {this.state.data.map((dat) => {
                    return (
                        <p class='message' key="dat.user">
                            <em>{dat.user}:</em> {dat.message}
                        </p>
                    )
                })}
            </div>
        )
    }
    
    render() {
        const {flag} = this.state;
        if(!flag){
            return (
                <UserNameInput handleUser={this.handleUser} />
            )
        }
        
        return (
            <div class="container">
                <h1>Web Sockets Chat App</h1>
                {this.renderMessage()}
                {this.renderTyping()}
                <InputMessage 
                    user={this.state.user} 
                    socket={this.socket}
                    handleTypingEnd={this.handleTypingEnd} />
            </div>
            
        )
    }
}
export default Chat;
