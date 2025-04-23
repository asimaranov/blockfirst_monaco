
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.7.0-integration-push-sunrovnkrkpv.1
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.7.0-integration-push-sunrovnkrkpv.1",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  expires_at: 'expires_at',
  ip_address: 'ip_address',
  user_agent: 'user_agent'
};

exports.Prisma.OauthAccountScalarFieldEnum = {
  id: 'id',
  providerId: 'providerId',
  providerUserId: 'providerUserId',
  userId: 'userId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password_hash: 'password_hash',
  email: 'email',
  role: 'role',
  uploadLimit: 'uploadLimit',
  name: 'name',
  firstName: 'firstName',
  lastName: 'lastName',
  profileImageUrl: 'profileImageUrl',
  version: 'version',
  stripeCustomerId: 'stripeCustomerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.DocumentScalarFieldEnum = {
  id: 'id',
  templateId: 'templateId',
  userId: 'userId',
  parentDocumentId: 'parentDocumentId',
  title: 'title',
  content: 'content',
  contentRich: 'contentRich',
  coverImage: 'coverImage',
  icon: 'icon',
  isPublished: 'isPublished',
  isArchived: 'isArchived',
  textStyle: 'textStyle',
  smallText: 'smallText',
  fullWidth: 'fullWidth',
  lockPage: 'lockPage',
  toc: 'toc',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DocumentVersionScalarFieldEnum = {
  id: 'id',
  documentId: 'documentId',
  userId: 'userId',
  title: 'title',
  contentRich: 'contentRich',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DiscussionScalarFieldEnum = {
  id: 'id',
  documentId: 'documentId',
  userId: 'userId',
  documentContent: 'documentContent',
  documentContentRich: 'documentContentRich',
  isResolved: 'isResolved',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  discussionId: 'discussionId',
  content: 'content',
  contentRich: 'contentRich',
  isEdited: 'isEdited',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  documentId: 'documentId',
  size: 'size',
  url: 'url',
  appUrl: 'appUrl',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.SessionOrderByRelevanceFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  ip_address: 'ip_address',
  user_agent: 'user_agent'
};

exports.Prisma.OauthAccountOrderByRelevanceFieldEnum = {
  id: 'id',
  providerId: 'providerId',
  providerUserId: 'providerUserId',
  userId: 'userId'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  id: 'id',
  username: 'username',
  password_hash: 'password_hash',
  email: 'email',
  name: 'name',
  firstName: 'firstName',
  lastName: 'lastName',
  profileImageUrl: 'profileImageUrl',
  stripeCustomerId: 'stripeCustomerId'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.DocumentOrderByRelevanceFieldEnum = {
  id: 'id',
  templateId: 'templateId',
  userId: 'userId',
  parentDocumentId: 'parentDocumentId',
  title: 'title',
  content: 'content',
  coverImage: 'coverImage',
  icon: 'icon'
};

exports.Prisma.DocumentVersionOrderByRelevanceFieldEnum = {
  id: 'id',
  documentId: 'documentId',
  userId: 'userId',
  title: 'title'
};

exports.Prisma.DiscussionOrderByRelevanceFieldEnum = {
  id: 'id',
  documentId: 'documentId',
  userId: 'userId',
  documentContent: 'documentContent'
};

exports.Prisma.CommentOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  discussionId: 'discussionId',
  content: 'content'
};

exports.Prisma.FileOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  documentId: 'documentId',
  url: 'url',
  appUrl: 'appUrl',
  type: 'type'
};
exports.UserRole = exports.$Enums.UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN'
};

exports.TextStyle = exports.$Enums.TextStyle = {
  DEFAULT: 'DEFAULT',
  SERIF: 'SERIF',
  MONO: 'MONO'
};

exports.Prisma.ModelName = {
  Session: 'Session',
  OauthAccount: 'OauthAccount',
  User: 'User',
  Document: 'Document',
  DocumentVersion: 'DocumentVersion',
  Discussion: 'Discussion',
  Comment: 'Comment',
  File: 'File'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/andrey/projects/blockfirst_app/src/app/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "rhel-openssl-3.0.x"
      }
    ],
    "previewFeatures": [
      "driverAdapters",
      "fullTextSearchPostgres"
    ],
    "sourceFilePath": "/Users/andrey/projects/blockfirst_app/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../.env"
  },
  "relativePath": "../../../../prisma",
  "clientVersion": "6.7.0-integration-push-sunrovnkrkpv.1",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  binaryTargets   = [\"native\", \"rhel-openssl-3.0.x\"]\n  previewFeatures = [\"fullTextSearchPostgres\", \"driverAdapters\"]\n\n  output = \"../src/app/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Session {\n  id         String   @id\n  user_id    String\n  expires_at DateTime\n  user       User     @relation(references: [id], fields: [user_id], onDelete: Cascade)\n  ip_address String?  @db.VarChar(45)\n  user_agent String?\n}\n\nmodel OauthAccount {\n  id             String @id @default(cuid())\n  providerId     String\n  providerUserId String\n  userId         String\n  user           User   @relation(references: [id], fields: [userId], onDelete: Cascade)\n\n  @@unique([providerId, providerUserId])\n}\n\nmodel User {\n  id            String         @id\n  username      String         @unique\n  password_hash String?\n  email         String?        @unique\n  sessions      Session[]\n  oauthAccounts OauthAccount[]\n  role          UserRole       @default(USER)\n\n  uploadLimit Int @default(100000000)\n\n  name             String?\n  firstName        String?\n  lastName         String?\n  profileImageUrl  String? @db.Text\n  version          Int     @default(1)\n  stripeCustomerId String? @unique\n\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @default(now())\n  deletedAt DateTime?\n\n  documents        Document[]\n  comments         Comment[]\n  files            File[]\n  discussions      Discussion[]\n  documentVersions DocumentVersion[]\n\n  @@index([username])\n}\n\nmodel Document {\n  id         String  @id\n  templateId String?\n\n  user             User       @relation(fields: [userId], references: [id], onDelete: Cascade)\n  userId           String\n  parentDocumentId String?\n  parentDocument   Document?  @relation(\"ParentChild\", fields: [parentDocumentId], references: [id])\n  children         Document[] @relation(\"ParentChild\")\n\n  title       String?\n  content     String?\n  contentRich Json?\n  coverImage  String?\n  icon        String?\n  isPublished Boolean @default(false)\n  isArchived  Boolean @default(false)\n\n  textStyle TextStyle @default(DEFAULT)\n  smallText Boolean   @default(false)\n  fullWidth Boolean   @default(false)\n  lockPage  Boolean   @default(false)\n  toc       Boolean   @default(true)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  discussions      Discussion[]\n  documentVersions DocumentVersion[]\n  files            File[]\n\n  @@unique([userId, templateId])\n}\n\nmodel DocumentVersion {\n  id         String   @id\n  documentId String\n  document   Document @relation(fields: [documentId], references: [id], onDelete: Cascade)\n  userId     String\n  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  title       String?\n  contentRich Json?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Discussion {\n  id String @id\n\n  documentId String\n  document   Document @relation(fields: [documentId], references: [id], onDelete: Cascade)\n  userId     String\n  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  documentContent     String\n  documentContentRich Json?\n  isResolved          Boolean   @default(false)\n  comments            Comment[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now()) @updatedAt\n}\n\nmodel Comment {\n  id String @id\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  discussionId String\n  discussion   Discussion @relation(fields: [discussionId], references: [id], onDelete: Cascade)\n\n  content     String\n  contentRich Json?\n  isEdited    Boolean @default(false)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now()) @updatedAt\n}\n\nmodel File {\n  id String @id\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  documentId String?\n  document   Document? @relation(fields: [documentId], references: [id])\n\n  size   Int\n  url    String @db.Text\n  appUrl String @db.Text\n  type   String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now()) @updatedAt\n}\n\nenum UserRole {\n  USER\n  ADMIN\n  SUPERADMIN\n}\n\nenum TextStyle {\n  DEFAULT\n  SERIF\n  MONO\n}\n",
  "inlineSchemaHash": "25a7cd425924a7ef16a6b5f235ccd3da71a24643fd3a5db44d9e1814c1d944b0",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Session\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user_id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SessionToUser\"},{\"name\":\"ip_address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user_agent\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"OauthAccount\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"providerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"providerUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"OauthAccountToUser\"}],\"dbName\":null},\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password_hash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"SessionToUser\"},{\"name\":\"oauthAccounts\",\"kind\":\"object\",\"type\":\"OauthAccount\",\"relationName\":\"OauthAccountToUser\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"UserRole\"},{\"name\":\"uploadLimit\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"firstName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"profileImageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"version\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"stripeCustomerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"deletedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"documents\",\"kind\":\"object\",\"type\":\"Document\",\"relationName\":\"DocumentToUser\"},{\"name\":\"comments\",\"kind\":\"object\",\"type\":\"Comment\",\"relationName\":\"CommentToUser\"},{\"name\":\"files\",\"kind\":\"object\",\"type\":\"File\",\"relationName\":\"FileToUser\"},{\"name\":\"discussions\",\"kind\":\"object\",\"type\":\"Discussion\",\"relationName\":\"DiscussionToUser\"},{\"name\":\"documentVersions\",\"kind\":\"object\",\"type\":\"DocumentVersion\",\"relationName\":\"DocumentVersionToUser\"}],\"dbName\":null},\"Document\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"templateId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"DocumentToUser\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"parentDocumentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"parentDocument\",\"kind\":\"object\",\"type\":\"Document\",\"relationName\":\"ParentChild\"},{\"name\":\"children\",\"kind\":\"object\",\"type\":\"Document\",\"relationName\":\"ParentChild\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contentRich\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"coverImage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"icon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isPublished\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isArchived\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"textStyle\",\"kind\":\"enum\",\"type\":\"TextStyle\"},{\"name\":\"smallText\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"fullWidth\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"lockPage\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"toc\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"discussions\",\"kind\":\"object\",\"type\":\"Discussion\",\"relationName\":\"DiscussionToDocument\"},{\"name\":\"documentVersions\",\"kind\":\"object\",\"type\":\"DocumentVersion\",\"relationName\":\"DocumentToDocumentVersion\"},{\"name\":\"files\",\"kind\":\"object\",\"type\":\"File\",\"relationName\":\"DocumentToFile\"}],\"dbName\":null},\"DocumentVersion\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"documentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"document\",\"kind\":\"object\",\"type\":\"Document\",\"relationName\":\"DocumentToDocumentVersion\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"DocumentVersionToUser\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contentRich\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Discussion\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"documentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"document\",\"kind\":\"object\",\"type\":\"Document\",\"relationName\":\"DiscussionToDocument\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"DiscussionToUser\"},{\"name\":\"documentContent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"documentContentRich\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"isResolved\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"comments\",\"kind\":\"object\",\"type\":\"Comment\",\"relationName\":\"CommentToDiscussion\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Comment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CommentToUser\"},{\"name\":\"discussionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"discussion\",\"kind\":\"object\",\"type\":\"Discussion\",\"relationName\":\"CommentToDiscussion\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contentRich\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"isEdited\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"File\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"FileToUser\"},{\"name\":\"documentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"document\",\"kind\":\"object\",\"type\":\"Document\",\"relationName\":\"DocumentToFile\"},{\"name\":\"size\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"url\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"appUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: async () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

