import mongoose from "mongoose";
import { User } from "./userModel.js";

const messageSchema = new mongoose.Schema(
  {
    sender_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    receiver_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    message: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
