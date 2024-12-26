import React, { useEffect } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelecter } from './app/hooks';
import Chat from "./components/chat/Chat";
import Sidebar from './components/sidebar/Sidebar';
import Login from "./components/login/Login";
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallBack } from "./utils/ErrorFallBack";


function App() {

  const user = useAppSelecter((state) => state.user.user);
  console.log(user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      console.log(loginUser);
      if(loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Sidebar />
          </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
