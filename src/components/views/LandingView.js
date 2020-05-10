import React from 'react'
import "./LandingView.css";

// subcomponents
import NavButton from '../NavButton'

export default function LandingView(props) {
  
  return (
    <div className="main-container">
      <h1 className="title">Draw-mageddon!</h1>

      <form className="name-form">
        <input className="name-field" type="text" id="username" placeholder="Enter your name!"
        onChange={props.inputChangeHandler}/>
      </form>

      <div className="button-container">
        <NavButton
        nextView={'HostLobbyView'}
        buttonTitle={'Create a lobby'}
        changeViewHandler={props.changeViewHandler}/>

        <NavButton
        nextView={'GuestLobbyView'}
        buttonTitle={'Join a lobby'}
        changeViewHandler={props.changeViewHandler}/>
      </div>
    </div>
  )
}
