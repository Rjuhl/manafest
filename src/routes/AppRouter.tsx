import Landing from "@page/landing"
import GameRoom from "@page/gameroom";
import MyAppBar from "@component/MyAppBar"
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

export default function AppRouter() {
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