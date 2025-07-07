import { useNavigate } from 'react-router-dom';
import { useSessionData } from '@context/SessionDataContext';
import { useEffect } from 'react';
import socket from '@util/socket';

export default function PageRouterHook(page: string) {
    const navigate = useNavigate();
    const { sessionData } = useSessionData();

    useEffect(() => {
        if (page === "landing" && (sessionData.roomId !== "" && sessionData.roomId !== undefined)) {
            navigate('/game-room');
        }

        if (page === "game-room" && (sessionData.roomId === "" || sessionData.roomId === undefined)) {
            navigate('/');
        }

        socket.connect();
        if (sessionData.username !== "") {
            socket.emit('rejoin', sessionData.username);
        } 

        return () => {
            socket.disconnect();
        }
    }, [sessionData]);

}
