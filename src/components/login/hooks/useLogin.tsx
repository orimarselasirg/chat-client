import { useContext, useState } from "react";
import AuthContext from "../../../context/authContext";
import { LOGIN_MESSAGE } from "../../../utils/constant";
import { Form } from "../types";

const useLogin = () => {
    const [form, setForm] = useState<Form>({
        email: '',
        password: '',
        name: ''
    });
    const { login, register } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isLoginMode) {
                await login(form);
            } else {
                await register({ ...form, name: form.name ?? '' });
            }
        } catch (error) {
            setError(LOGIN_MESSAGE.LOGIN_ERROR);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    return {
        form,
        handleSubmit,
        loading,
        error,
        handleChange,
        isLoginMode,
        toggleMode,
    }
}

export default useLogin;