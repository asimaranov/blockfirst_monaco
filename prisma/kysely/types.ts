import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const UserRole = {
    USER: "USER",
    ADMIN: "ADMIN",
    SUPERADMIN: "SUPERADMIN"
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export const TextStyle = {
    DEFAULT: "DEFAULT",
    SERIF: "SERIF",
    MONO: "MONO"
} as const;
export type TextStyle = (typeof TextStyle)[keyof typeof TextStyle];
export type Comment = {
    id: string;
    userId: string;
    discussionId: string;
    content: string;
    contentRich: unknown | null;
    isEdited: Generated<boolean>;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Discussion = {
    id: string;
    documentId: string;
    userId: string;
    documentContent: string;
    documentContentRich: unknown | null;
    isResolved: Generated<boolean>;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Document = {
    id: string;
    templateId: string | null;
    userId: string;
    parentDocumentId: string | null;
    title: string | null;
    content: string | null;
    contentRich: unknown | null;
    coverImage: string | null;
    icon: string | null;
    isPublished: Generated<boolean>;
    isArchived: Generated<boolean>;
    textStyle: Generated<TextStyle>;
    smallText: Generated<boolean>;
    fullWidth: Generated<boolean>;
    lockPage: Generated<boolean>;
    toc: Generated<boolean>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    sortOrder: Generated<number | null>;
};
export type DocumentVersion = {
    id: string;
    documentId: string;
    userId: string;
    title: string | null;
    contentRich: unknown | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type File = {
    id: string;
    userId: string;
    documentId: string | null;
    size: number;
    url: string;
    appUrl: string;
    type: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type OauthAccount = {
    id: string;
    providerId: string;
    providerUserId: string;
    userId: string;
};
export type Session = {
    id: string;
    user_id: string;
    expires_at: Timestamp;
    ip_address: string | null;
    user_agent: string | null;
};
export type User = {
    id: string;
    username: string;
    password_hash: string | null;
    email: string | null;
    role: Generated<UserRole>;
    uploadLimit: Generated<number>;
    name: string | null;
    firstName: string | null;
    lastName: string | null;
    profileImageUrl: string | null;
    version: Generated<number>;
    stripeCustomerId: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    deletedAt: Timestamp | null;
};
export type DB = {
    Comment: Comment;
    Discussion: Discussion;
    Document: Document;
    DocumentVersion: DocumentVersion;
    File: File;
    OauthAccount: OauthAccount;
    Session: Session;
    User: User;
};
