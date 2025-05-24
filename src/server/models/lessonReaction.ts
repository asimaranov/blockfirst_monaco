import mongoose, { Document, Model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';

export enum ReactionType {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

export interface ILessonReaction extends Document {
  _id: string;
  userId: string;
  lessonId: string;
  reactionType: ReactionType; // 'like' or 'dislike'
  createdAt: Date;
  updatedAt: Date;
}

const lessonReactionSchema = new Schema<ILessonReaction>(
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
    lessonId: {
      type: String,
      required: true,
      index: true,
    },
    reactionType: {
      type: String,
      enum: Object.values(ReactionType),
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Add compound index to ensure uniqueness of userId+lessonId pair
// This prevents duplicate reactions from the same user for the same lesson
lessonReactionSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

// Create or retrieve the LessonReaction model
const LessonReactionModel: Model<ILessonReaction> =
  (mongoose.models?.LessonReaction as mongoose.Model<ILessonReaction>) ||
  mongoose.model<ILessonReaction>('LessonReaction', lessonReactionSchema);

export default LessonReactionModel;
