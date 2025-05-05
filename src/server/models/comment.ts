import { Schema, model, models, Document, Types } from 'mongoose';

export interface CommentImage {
  id: string;
  url: string;
}

export interface IComment extends Document {
  lessonId: string;
  parentId?: string;
  author: {
    id: string;
    name: string;
    avatarInitial: string;
  };
  text: string;
  timestamp: Date;
  likes: string[]; // Array of user IDs who liked the comment
  images?: CommentImage[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    lessonId: { type: String, required: true, index: true },
    parentId: { type: String, default: null, index: true },
    author: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      avatarInitial: { type: String, required: true },
    },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    likes: [{ type: String }], // Array of user IDs
    images: [
      {
        id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const CommentModel = models.Comment || model<IComment>('Comment', CommentSchema);

export default CommentModel; 