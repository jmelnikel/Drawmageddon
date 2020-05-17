import React from 'react'
import NavButton from '../NavButton'
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import "./LandingView.css";;


// subcomponents

export default function LandingView(props) {
  
  return (
    <div className="scrolling-background">
    
      <h1 className="LandingView__titleAnimation">Draw-mageddon!</h1>

      <form className="LandingView__container--nameForm">
        <input
          className="LandingView__form--inputField App__colorScheme--inputField"
          type="text"
          id="username"
          placeholder="Enter your name"
          onChange={props.inputChangeHandler}
        />
      </form>

      <div className="LandingView__btnContainer">
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

// <footer className="LandingView__about--container">
//         <button className="LandingView__about--button App__colorScheme--button">About</button>
//         <button className="LandingView__about--button App__colorScheme--button">?</button>
//       </footer>