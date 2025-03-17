import {
    useEffect,
    useRef,
    useState
} from "react";
import io, { Socket } from "socket.io-client";
import {
    IChatProps,
    Message,
    TypingUser
} from "../types";
import {
    CHAT_MESSAGE,
    CHAT_SOCKET_EVENTS
} from "../../../utils/constant";
import styles from "../styles/chatstyle.module.css";

const getChatStorageKey = (userEmail: string) => `chat_messages_${userEmail}`;
const MAX_STORED_MESSAGES = 100;

export const useChat = ({ user }: IChatProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');
    const [typingUsers, setTypingUsers] = useState<Record<string, TypingUser>>({});
    const [connectedUsers, setConnectedUsers] = useState<number>(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);

    useEffect(() => {
        const storageKey = getChatStorageKey(user.email);
        const savedMessages = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
        setMessages(savedMessages);

        const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
            auth: { token: user.token }
        });

        newSocket.on(CHAT_SOCKET_EVENTS.CONNECT, () => {
            console.log(CHAT_MESSAGE.CONNECT);
        });

        newSocket.on(CHAT_SOCKET_EVENTS.CONNECT_ERROR, (err: any) => {
            console.error(CHAT_MESSAGE.CONNECT_ERROR, err.message);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user.token, user.email]);

    useEffect(() => {
        if (!socket) return;

        socket.on(CHAT_SOCKET_EVENTS.CHAT, (data: any) => {
            setMessages(prevMessages => {
                const newMessages = [...prevMessages, {
                    id: Date.now(),
                    sender: data.user,
                    message: data.message,
                    isSelf: data.id === socket.id
                }];

                const storageKey = getChatStorageKey(user.email);
                localStorage.setItem(
                    storageKey,
                    JSON.stringify(newMessages.slice(-MAX_STORED_MESSAGES))
                );

                return newMessages;
            });

            setTypingUsers(prev => {
                const updated = { ...prev };
                delete updated[data.id];
                return updated;
            });
        });

        socket.on(CHAT_SOCKET_EVENTS.TYPING, (data: any) => {
            setTypingUsers(prev => ({
                ...prev,
                [data.id]: data.user
            }));
        });

        socket.on(CHAT_SOCKET_EVENTS.STOP_TYPING, (data: any) => {
            setTypingUsers(prev => {
                const updated = { ...prev };
                delete updated[data.id];
                return updated;
            });
        });

        socket.on(CHAT_SOCKET_EVENTS.USERS_COUNT, (count: number) => {
            setConnectedUsers(count);
        });

        socket.on(CHAT_SOCKET_EVENTS.USER_JOINED, (userData) => {
            setMessages(prevMessages => {
                const systemMessage = {
                    id: Date.now(),
                    sender: 'System',
                    message: `${userData.name} ${CHAT_MESSAGE.USER_JOINED}`,
                    isSelf: false,
                    isSystem: true
                };

                const newMessages = [...prevMessages, systemMessage];
                const storageKey = getChatStorageKey(user.email);
                localStorage.setItem(
                    storageKey,
                    JSON.stringify(newMessages.slice(-MAX_STORED_MESSAGES))
                );

                return newMessages;
            });

            console.log(`${userData.name} ${CHAT_MESSAGE.USER_JOINED}`);
        });

        socket.on(CHAT_SOCKET_EVENTS.USER_LEFT, (userData) => {
            setMessages(prevMessages => {
                const systemMessage = {
                    id: Date.now(),
                    sender: 'System',
                    message: `${userData.name} ${CHAT_MESSAGE.USER_LEFT}`,
                    isSelf: false,
                    isSystem: true
                };

                const newMessages = [...prevMessages, systemMessage];
                const storageKey = getChatStorageKey(user.email);
                localStorage.setItem(
                    storageKey,
                    JSON.stringify(newMessages.slice(-MAX_STORED_MESSAGES))
                );

                return newMessages;
            });

            console.log(`${userData.name} ${CHAT_MESSAGE.USER_LEFT}`);
        });

        socket.emit(CHAT_SOCKET_EVENTS.JOIN_CHAT, user);

        return () => {
            socket.off(CHAT_SOCKET_EVENTS.CHAT);
            socket.off(CHAT_SOCKET_EVENTS.TYPING);
            socket.off(CHAT_SOCKET_EVENTS.STOP_TYPING);
            socket.off(CHAT_SOCKET_EVENTS.USERS_COUNT);
            socket.off(CHAT_SOCKET_EVENTS.USER_JOINED);
            socket.off(CHAT_SOCKET_EVENTS.USER_LEFT);
            socket.emit(CHAT_SOCKET_EVENTS.LEAVE_CHAT, user);
        };
    }, [socket, user]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (message.trim() && socket) {
            socket.emit(CHAT_SOCKET_EVENTS.CHAT, message);
            setMessage('');

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            socket.emit(CHAT_SOCKET_EVENTS.STOP_TYPING);
        }
    };

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        if (!socket) return;

        if (!typingTimeoutRef.current) {
            socket.emit(CHAT_SOCKET_EVENTS.TYPING);
        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit(CHAT_SOCKET_EVENTS.STOP_TYPING);
            typingTimeoutRef.current = null;
        }, 1000);
    };

    const renderTypingIndicator = () => {
        const typers = Object.values(typingUsers);
        if (typers.length === 0) return null;

        if (typers.length === 1) {
            return <div className={styles.typingIndicator}>{typers[0].name} {CHAT_MESSAGE.TYPING}</div>;
        } else {
            return <div className={styles.typingIndicator}>{CHAT_MESSAGE.TYPING_MULTIPLE}</div>;
        }
    };

    const clearChatHistory = () => {
        const storageKey = getChatStorageKey(user.email);
        localStorage.removeItem(storageKey);
        setMessages([]);
    };

    return {
        messages,
        message,
        handleSubmit,
        handleTyping,
        renderTypingIndicator,
        messagesEndRef,
        connectedUsers,
        clearChatHistory,
    }
}