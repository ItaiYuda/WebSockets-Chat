import React, { Component } from 'react';
import Chat from './Components/Chat/Chat';
import './App.css';
import chatImage from './Utilities/chat.png';

class App extends Component {
  state = {
    display: "Home"
  };
  
  changeScreen = (value) => {
    this.setState({display: value});
  }

  render() {
    const {display} = this.state;
    if(display === "Home"){
      return (
        <div className="App">
          <nav  class="navbar">
            <ul>
              <li onClick={() => this.changeScreen("Home")}>Home</li>
              <li onClick={() => this.changeScreen("Chat")}>Chat</li>
            </ul>
          </nav>
          <div class="box-container">
            <div onClick={() => this.changeScreen("Chat")}><img src={chatImage} /></div>
          </div>
          
        </div>
      )
    }
    else{
      return (
        <div className="App">
          <nav  class="navbar">
            <ul>
              <li onClick={() => this.changeScreen("Home")}>Home</li>
              <li onClick={() => this.changeScreen("Chat")}>Chat</li>            
            </ul>
          </nav>
          
          <Chat />
        </div>
      )
    }
      
  }
}

export default App;
