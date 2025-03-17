import { LOGIN_MESSAGE } from '../../utils/constant';
import styles from './styles/loginstyle.module.css';
import useLogin from './hooks/useLogin';

const Login = () => {
    const {
        form,
        handleSubmit,
        loading,
        error,
        handleChange,
        isLoginMode,
        toggleMode
    } = useLogin();

    const modeButtonText = isLoginMode ? LOGIN_MESSAGE.LOGIN_BUTTON : LOGIN_MESSAGE.REGISTER_BUTTON;
    const buttonText = loading ? LOGIN_MESSAGE.LOADING : modeButtonText;

    return (
        <div className={styles.loginContainer}>
            <h2>{isLoginMode ? LOGIN_MESSAGE.LOGIN : LOGIN_MESSAGE.REGISTER}</h2>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit}>
                {!isLoginMode && (
                    <div className={styles.formGroup}>
                        <label htmlFor="name">{LOGIN_MESSAGE.NAME}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name ?? ''}
                            onChange={handleChange}
                            required={!isLoginMode}
                        />
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label htmlFor="email">{LOGIN_MESSAGE.EMAIL}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">{LOGIN_MESSAGE.PASSWORD}</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {buttonText}
                </button>
            </form>

            <div className={styles.toggleMode}>
                <button type="button" onClick={toggleMode}>
                    {isLoginMode ? LOGIN_MESSAGE.GO_TO_REGISTER : LOGIN_MESSAGE.GO_TO_LOGIN}
                </button>
            </div>
        </div>
    );
}

export default Login;