import React, { useContext, useEffect, useRef, useState } from 'react';

import './App.css';
import GlobalStateContext, { globalState } from './components/GlobalStateContext';
import PlayScreen from './components/PlayScreen';
import SplashScreen from './components/SplashScreen';

function App() {
	const { socket } = useContext(GlobalStateContext);
	const [ isPlayerOne, setIsPlayerOne ] = useState(false);
	const [ connected, setConnected ] = useState(false);
	const [ isInRoom, setisInRoom ] = useState(false);
	const [ roomId, setRoomId ] = useState('');
	const [ playerNumberFn, setPlayerNumberFn ] = useState(() => () => 0);
	const joinRoom = (data: any) => {
		const connection = data.target.value;
		socket.emit('check-connection', connection);
		function checkForConnection(connectionExistence: boolean) {
			if (connectionExistence) {
				setisInRoom(true);
				socket.emit('add-player-to-room', { nextPlayerId: connection, roomId });
			}
		}
		socket.on('connection-status', checkForConnection);
	};
	useEffect(
		() => {
			socket.on('connect', () => {
				setConnected(true);
				socket.on('added-to-room', (roomId, playerNumber) => {
					setisInRoom(true);
					setRoomId(roomId);
					setPlayerNumberFn(() => () => playerNumber);
				});
				socket.on('removed-from-room', () => {
					setisInRoom(false);
				});
			});
		},
		[ connected ]
	);
	return (
		<GlobalStateContext.Provider
			value={{ ...globalState, isPlayerOne, setIsPlayerOne, getPlayerNumber: playerNumberFn }}>
			<div id="app">
				{!isInRoom && <SplashScreen joinRoom={joinRoom} />}
				{isInRoom && <PlayScreen />}
			</div>
		</GlobalStateContext.Provider>
	);
}

export default App;
