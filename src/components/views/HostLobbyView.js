import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'


// subcomponents
import NavButton from '../NavButton'
import PlayerLobbyStatus from '../PlayerLobbyStatus';

// Helpers
import util from '../../helpers/util'

export default function HostLobbyView(props) {

  const [lobbyID, setLobbyID] = useState('');
  const [playerList, setPlayerList] = useState([]);


  // when this component mounts, we will generate a lobby ID
  useEffect(() => {
    const lobbyID = util.generateLobbyID(6);
    setLobbyID(lobbyID);


    // ask server to add this lobby to list of lobbies
    props.socket.emit('createLobby', lobbyID)

    // ...then join that lobby
    const data = {lobbyID, username: props.username}
    props.socket.emit('joinRoom', data);

    // recieve list of players for rendering
    props.socket.on('playersInLobby', data => setPlayerList(data));

    return () => {
      // when host component unmounts trigger a view change for all players
      const data = {
        lobbyID,
        nextView: 'InstructionsView'
      }
      props.socket.emit('changeView', data);
    }
  }, []);

  // greeting logic
  const username = props.username.trim() // *TODO: we need to sanitize the input before it's thrown into the db, not here.
  const greeting = username.length === 0 ? 'Hello!' : `Hello, ${username}!`;

  // map for rendering
  const playersInLobby = playerList.map(player => <PlayerLobbyStatus key={uuid()} username={player.username}/>);

  return (
    <div className="main-container">
      <h1 style={{color: "red", fontSize: "14px"}}>HostLobbyView.js</h1>

      <h1 className="title">{greeting}</h1>
      
      <div className="lobby-code-container">
        <h2>Share this code to your friends</h2>
        <p style={{color: "red"}}>{lobbyID}</p>
      </div>
      
      <ul style={{color: "red"}} className="lobby-container">
        {playersInLobby}
        <li>test name</li>
        <li>test name</li>
        <li>test name</li>
      </ul>
      
      <div className="button-container">
        <NavButton
        nextView={'InstructionsView'}
        buttonTitle={'Start game'}
        changeViewHandler={props.changeViewHandler}/>
      </div>
    </div>
  )
}
