import mongoose, { Document, Model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatHistory extends Document {
  userId: string;
  taskId?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const chatMessageSchema = new Schema<ChatMessage>(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      get: (value: any) => new Date(value),
    },
  },
  { _id: false, toJSON: { getters: true }, toObject: { getters: true } }
);

const chatHistorySchema = new Schema<ChatHistory>(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    taskId: {
      type: String,
      index: true,
    },
    messages: [chatMessageSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Create or retrieve the ChatHistory model
const ChatHistoryModel: Model<ChatHistory> =
  mongoose.models.ChatHistory ||
  mongoose.model<ChatHistory>('ChatHistory', chatHistorySchema);

export default ChatHistoryModel;
