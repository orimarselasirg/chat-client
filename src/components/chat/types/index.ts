import { User } from "../../../context/authContext";

export interface IChatProps {
    user: User;
}

export interface Message {
    id: number;
    sender: string;
    message: string;
    isSelf: boolean;
    isSystem?: boolean;
}

export interface TypingUser {
    name: string;
}