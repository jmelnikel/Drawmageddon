import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'



// subcomponents
import NavButton from '../NavButton'
import PlayerLobbyStatus from '../PlayerLobbyStatus';

// Helpers
import util from '../../helpers/util'

export default function HostLobbyView(props) {
  const { username, socket, changeViewHandler } = props;


  const [state, setState] = useState({
    lobbyID: '',
    players: [],
    playerObj: null
  });
  const { lobbyID, players, playerObj } = state;


  useEffect(() => {
    // establish lobbyID
    const lobbyID = util.generateLobbyID(6);
    setState({...state, lobbyID});

    // requests to DB
    socket.emit('createLobby', { lobbyID }); 
    socket.on('lobbyCreated', () => {
      socket.emit('createPlayer', { username, coordinates: [] });
      socket.on('playerCreated', playerObj => {
        socket.emit('addToPlayers', { lobbyID, playerObj });
        setState({...state, playerObj});

        socket.on('playerAdded', lobbyObj => {
          const { lobbyID, players, currentView } = lobbyObj;

          socket.emit('joinLobby', { lobbyID });
        });

      });
    });

    // listeners
    socket.on('userJoinLobby', () => {
      socket.emit('findLobby', { lobbyID });
      socket.on('lobbyFound', lobbyObj => {
        const { players, lobbyID, currentView } = lobbyObj;
        console.log('Updating players array with...', lobbyObj)
        setState({...state, players});
      });
    });

    // socket.on('gameState', data => {
    //   console.log('Received game state:', data)
    //   const { lobbyID, players } = data;
    //   setState({...state, players, lobbyID});
    // });

    // socket.on('changeView', data => {
    //   const { nextView } = data;
    //   changeViewHandler(nextView);
    // });

    // socket.on('playerObj', playerObj => {
    //   setState({...state, playerObj});
    //   socket.emit('addToPlayers', { lobbyID, playerObj });
    //  });

  }, []);


  // event handlers
  const onClickHandler = e => {
    e.preventDefault();

    socket.emit('changeView', { nextView: 'InstructionsView' });
  }


  // render logic
  const greeting = username.trim().length === 0 ? 'Hello!' : `Hello, ${username}!`;
  const playersList = players.map(player => <PlayerLobbyStatus key={uuid()} username={player}/>);

  return (
    <div>
      <h1>Find me at components/HostLobbyView.js</h1>

      <h1>{greeting}</h1>
      <h2>Share this code to your friends</h2>
      <p>{lobbyID}</p>

      {playersList}
      
      <button onClick={e => onClickHandler(e)}>Start game</button>
      <NavButton
      nextView={'InstructionsView'}
      buttonTitle={'Start game'}
      changeViewHandler={props.changeViewHandler}/>
    </div>
  )
}
