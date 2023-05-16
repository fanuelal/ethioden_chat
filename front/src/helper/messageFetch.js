import {messages} from '../model/message.js'
export const fetchMessage = (userId) => {
    const activeScreenChat = messages.some(message => message.reciverId === userId || message.senderId === userId)
    return activeScreenChat
}