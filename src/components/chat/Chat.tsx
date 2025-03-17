import styles from './styles/chatstyle.module.css';
import { useChat } from './hooks/useChat';
import { CHAT_MESSAGE } from '../../utils/constant';
import { IChatProps, Message } from './types';

const Chat = ({ user }: IChatProps) => {

    const {
        messages,
        message,
        handleSubmit,
        handleTyping,
        renderTypingIndicator,
        messagesEndRef,
        connectedUsers,
        clearChatHistory
    } = useChat({ user });

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <div className={styles.usersInfo}>
                    <span>{CHAT_MESSAGE.USERS_CONNECTED}: {connectedUsers}</span>
                </div>
                <button
                    onClick={clearChatHistory}
                    className={styles.clearButton}
                >
                    Limpiar historial
                </button>
            </div>
            <div className={styles.messagesContainer}>
                {messages.length === 0 ? (
                    <div
                        className={styles.noMessages}
                    >
                        {CHAT_MESSAGE.NO_MESSAGES}
                    </div>
                ) : (
                    messages.map((msg: Message) => (
                        <div
                            key={msg.id}
                            className={`${styles.message} 
                                ${msg.isSystem
                                    ? styles.messageSystem
                                    : msg.isSelf
                                        ? styles.messageSelf
                                        : styles.messageOther
                                }`
                            }
                        >
                            <div
                                className={styles.messageHeader}
                            >
                                {!msg.isSelf && !msg.isSystem && <span className={styles.senderName}>{msg.sender}</span>}
                            </div>
                            <div
                                className={styles.messageBody}
                            >
                                {msg.message}
                            </div>
                        </div>
                    ))
                )}
                {renderTypingIndicator()}
                <div ref={messagesEndRef} />
            </div>

            <form
                onSubmit={handleSubmit}
                className={styles.messageForm}
            >
                <input
                    type="text"
                    value={message}
                    onChange={handleTyping}
                    placeholder={CHAT_MESSAGE.WRITE_MESSAGE}
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={!message.trim()}
                >
                    {CHAT_MESSAGE.SEND}
                </button>
            </form>
        </div>
    );
}

export default Chat;