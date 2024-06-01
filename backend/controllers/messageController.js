import Conversation from '../model/convesationModel.js'
import Message from '../model/messageModel.js'
import { getReceiverSocketId, io } from '../socket/socket.js'
export const sendMessage = async (req, res) => {
    try {
      const { message } = req.body;
      const { id: receiver_Id } = req.params;
      const sender_Id = req.user._id;
let conversation = await Conversation.findOne({
        participants: { $all: [sender_Id, receiver_Id] },
      });
  
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [sender_Id, receiver_Id],
        });
      }
  
   
      const newMessage = new Message({
        sender_Id,
        receiver_Id,
        message,
      });
  
      await Promise.all([conversation.save(), newMessage.save()]);
  
      conversation.messages.push(newMessage._id);
      await conversation.save();  // Ensure conversation is saved with updated messages
  
      // Socket emission (optional optimization)
      if (newMessage) {
        const receiverSocketID = getReceiverSocketId(receiver_Id);
        if (receiverSocketID) {
          io.to(receiverSocketID).emit("newMessage", newMessage);
        }
      }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error while sending message:', error.message);
      res.status(500).json({ error: 'internal server error' });
    }
  };
  
  
  export const getMessage = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const sender_Id = req.user._id;
  
      try {
        const conversation = await Conversation.findOne({
          participants: { $all: [sender_Id, userToChatId] },
        })
        .populate("messages");
  
        if (!conversation) {
          res.status(200).json([]);
          return;
        }
  
        res.status(200).json(conversation.messages);
      } catch (error) {
        console.error('Error populating messages:', error.message);
        // Handle population error appropriately
      }
    } catch (error) {
      console.error('Error getting message:', error.message);
      res.status(500).json({ error: 'internal server error' });
    }
  };
  