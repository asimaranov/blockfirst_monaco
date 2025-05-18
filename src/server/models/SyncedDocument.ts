import mongoose from 'mongoose';

// Define the schema for a single document entry
const DocumentEntrySchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

// Define the schema for the synced documents collection
const SyncedDocumentSchema = new mongoose.Schema(
  {
    taskId: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    documents: [DocumentEntrySchema],
  },
  { timestamps: true }
);

// Create a compound index for faster lookups
SyncedDocumentSchema.index({ taskId: 1, userId: 1 }, { unique: true });

export interface ISyncedDocument extends mongoose.Document {
  taskId: string;
  userId: string;
  documents: Array<{ key: string; value: string }>;
}

export const SyncedDocument =
  mongoose.models.SyncedDocument ||
  mongoose.model<ISyncedDocument>('SyncedDocument', SyncedDocumentSchema);

export default SyncedDocument;
