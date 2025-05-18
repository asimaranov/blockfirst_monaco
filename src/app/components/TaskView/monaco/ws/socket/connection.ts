/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import type { MessageConnection, Logger } from 'vscode-jsonrpc';
import { createMessageConnection } from 'vscode-jsonrpc';
import type { IWebSocket } from './socket';
import { WebSocketMessageReader } from './reader';
import { WebSocketMessageWriter } from './writer';

export function createWebSocketConnection(socket: IWebSocket, logger: Logger): MessageConnection {
    const messageReader = new WebSocketMessageReader(socket);
    const messageWriter = new WebSocketMessageWriter(socket);
    const connection = createMessageConnection(messageReader, messageWriter, logger);
    connection.onClose(() => connection.dispose());
    return connection;
} 