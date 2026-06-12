import {StrictMode, useState} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import SpaceshipLoader from './components/SpaceshipLoader.tsx';
import './index.css';

function Root() {
  const [ready, setReady] = useState(false);
  return (
    <>
      {!ready && <SpaceshipLoader onComplete={() => setReady(true)} />}
      <App />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
