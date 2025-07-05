import AppRouter from '@route/AppRouter'
import { SessionDataProvider } from '@context/SessionDataContext';

function App() {
  return (
    <>
      <SessionDataProvider>
        <AppRouter/>
      </SessionDataProvider>
    </>
  )
}

export default App