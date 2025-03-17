import { useContext } from 'react';
import AuthContext from './context/authContext';
import Chat from './components/chat/Chat';
import styles from './appstyle.module.css';
import { APP_MESSAGE } from './utils/constant';
import Login from './components/login/Login';

function App() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>{APP_MESSAGE.TITLE}</h1>
        {user && (
          <div className={styles.userInfo}>
            {APP_MESSAGE.WELCOME}, {user.name}
            <button
              onClick={handleLogout}
              className={styles.logoutBtn}
            >
              {APP_MESSAGE.LOGOUT}
            </button>
          </div>
        )}
      </header>

      <main className={styles.appMain}>
        {!user?.token ? (
          <Login />
        ) : (
          <Chat user={user} />
        )}
      </main>
    </div>
  );
}

export default App;