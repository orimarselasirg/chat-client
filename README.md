# Real-Time Chat - Client


## Description


A real-time chat application developed with React, TypeScript, and Socket.IO. It allows users to register, log in, and communicate in real-time with other connected users.

## Technologies Used


- React 19
- TypeScript
- Vite
- Socket.IO
- CSS Modules

## Features


- **User authentication**: registration and login
- **Real-time chat**: communication with other users
- **Typing indicators**: see when other users are typing
- **User presence**: see when other users are online
- **File sharing**: send files to other users
- **Group chats**: create and join group chats
- **Private messages**: send private messages to other users


## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chat-client.git

# Navigate to the project directory
cd chat-client

# Install dependencies
npm install
```


## Configuration


Create a `.env` file in the project root with the following variables:

```bash
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

Adjust the URLs according to your server configuration.

## Execution

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production version
npm run preview
```

## Project Structure

```
/src
  /components
    /chat         # Chat-related components
    /login        # Authentication components
  /context        # React contexts (AuthContext)
  /utils          # Utilities and constants
  App.tsx         # Main component
  main.tsx        # Entry point
```

## Environment Variables

- `VITE_API_URL`: Base URL for the authentication API
- `VITE_SOCKET_URL`: URL of the Socket.IO server

## Functionalities

### Authentication

- Registration of new accounts
- Login with existing credentials
- Session management using tokens

### Chat

- Sending and receiving messages in real-time
- Indicator of connected users
- Notifications when users join or leave the chat
- Real-time typing indicators
- Local storage of chat history
- Option to clear chat history

## License

[MIT](LICENSE)

## Author

- [@Ramiro Grisales](https://github.com/orimarselasirg)# chat-client
