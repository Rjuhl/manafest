import Landing from "@page/landing"
import GameRoom from "@page/gameroom";
import MyAppBar from "@component/MyAppBar"
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { useSessionData } from '@context/SessionDataContext';
import { useState, useEffect } from 'react';
import socket from '@util/socket';

export default function AppRouter() {
    const { sessionData, setSessionValue, clearSessionData } = useSessionData();

    // useEffect(() => {
    //     socket.connect();
    //     if (sessionData.username !== "") {
    //         socket.emit('rejoin', sessionData.username);
    //     } 
    //     return () => {
    //     };
    // }, []);

    const Layout = () => {
        return (
            <>
            <MyAppBar />
            <Outlet />
            </>
        )
    }

    const BrowserRoutes = () => {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Landing />} />
                        <Route path="game-room" element={<GameRoom />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
    return(
        <BrowserRoutes />
    )
}