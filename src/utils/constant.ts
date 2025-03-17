export const CHAT_SOCKET_EVENTS = {
    CHAT: 'chat',
    TYPING: 'typing',
    STOP_TYPING: 'stop_typing',
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    CONNECT_ERROR: 'connect_error',
    USER_JOINED: 'user_joined',
    USER_LEFT: 'user_left',
    USERS_COUNT: 'users_count',
    CHAT_HISTORY: 'chat_history',
    LEAVE_CHAT: 'leave_chat',
    JOIN_CHAT: 'join_chat',
}

export const CHAT_MESSAGE = {
    TYPING: 'is typing...',
    TYPING_MULTIPLE: 'are typing...',
    NO_MESSAGES: 'no messages yet, be the first to write!',
    CONNECT: 'connected to chat server',
    CONNECT_ERROR: 'error connecting to chat server',
    SEND: 'send',
    SEND_ERROR: 'error sending message',
    WRITE_MESSAGE: 'write a message...',
    USERS_CONNECTED: 'users connected',
    USER_JOINED: 'joined the chat',
    USER_LEFT: 'left the chat',
}

export const LOGIN_MESSAGE = {
    LOGIN: 'Log in',
    REGISTER: 'Register',
    LOGIN_ERROR: 'Error logging in',
    REGISTER_ERROR: 'Error registering',
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_ERROR_INVALID_CREDENTIALS: 'Invalid credentials',
    LOADING: 'Loading...',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    NAME: 'Name',
    LOGIN_BUTTON: 'Log in',
    REGISTER_BUTTON: 'Register',
    GO_TO_REGISTER: 'Don\'t have an account? Register',
    GO_TO_LOGIN: 'Already have an account? Log in'
}

export const APP_MESSAGE = {
    LOGOUT: 'logout',
    WELCOME: 'welcome',
    TITLE: 'Real Time Chat V.1',

}
