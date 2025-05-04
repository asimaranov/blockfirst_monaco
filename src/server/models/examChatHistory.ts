import mongoose, { Document, Model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';

export interface ExamChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  messageType?: 'error' | 'success' | null;
  messageTypeExplanation?: string | null;
  feedback?: {
    isCorrect?: boolean;
    explanation?: string;
  } | null;
}

export interface ExamChatHistory extends Document {
  userId: string;
  examId?: string;
  messages: ExamChatMessage[];
  totalLives: number;
  currentLives: number;
  currentQuestionId: number;
  createdAt: Date;
  updatedAt: Date;
}

const examChatMessageSchema = new Schema<ExamChatMessage>(
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
    messageType: {
      type: String,
      enum: ['error', 'success', null],
      default: null,
    },
    messageTypeExplanation: {
      type: String,
      default: null,
    },
    feedback: {
      type: new Schema(
        {
          isCorrect: Boolean,
          explanation: String,
        },
        { _id: false }
      ),
      default: null,
    },
  },
  { _id: false, toJSON: { getters: true }, toObject: { getters: true } }
);

const examChatHistorySchema = new Schema<ExamChatHistory>(
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
    examId: {
      type: String,
      index: true,
    },
    messages: [examChatMessageSchema],
    totalLives: {
      type: Number,
      default: 5,
    },
    currentLives: {
      type: Number,
      default: 5,
    },
    currentQuestionId: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Add compound index to ensure uniqueness of userId+examId pair
examChatHistorySchema.index({ userId: 1, examId: 1 }, { unique: true });

// Create or retrieve the ExamChatHistory model
const ExamChatHistoryModel: Model<ExamChatHistory> =
  mongoose.models.ExamChatHistory ||
  mongoose.model<ExamChatHistory>('ExamChatHistory', examChatHistorySchema);

export default ExamChatHistoryModel;
