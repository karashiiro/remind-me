/// <reference types="@moonlight-mod/types" />

type Timestamp = number;

type Message = object;

interface SavedMessageData {
  channelId: string;
  messageId: string;
  dueAt?: Timestamp;
  savedAt?: Timestamp;
}

interface SavedMessage {
  message: Message;
  saveData: SavedMessageData;
}

declare module "@moonlight-mod/wp/remind-me_message" {
  declare class Message {
    constructor(rawMessage: unknown);
  }
}

declare module "@moonlight-mod/wp/remind-me_messagesApi" {
  namespace MessagesAPI {
    function fetchMessage(e: { channelId: string; messageId: string }): Promise<any>;
  }
}

declare module "@moonlight-mod/wp/remind-me_savedMessagesPersistedStore" {
  namespace Stores {
    declare class SavedMessagesPersistedStore {
      putSavedMessage(data: SavedMessageData): void;
      deleteSavedMessage(data: SavedMessageData): boolean;
      getSavedMessages(): SavedMessageData[];
    }
  }

  const SavedMessagesPersistedStore: Stores.SavedMessagesPersistedStore;
}

declare module "@moonlight-mod/wp/remind-me_savedMessagesStore" {
  import { Store } from "@moonlight-mod/wp/discord/packages/flux";

  namespace Stores {
    class SavedMessagesStore extends Store<SavedMessage> {
      getIsStale(): boolean;
      getLastChanged(): Timestamp;
      getMessageBookmarks(): SavedMessage[];
      getMessageReminders(): SavedMessage[];
      getOverdueMessageReminderCount();
      getSavedMessage(channelId: string, messageId: string): SavedMessage | null;
      getSavedMessageCount(): number;
      getSavedMessages(): SavedMessage[];
      hasOverdueReminder(): boolean;
      isMessageBookmarked(): boolean;
      isMessageReminder(): boolean;
      initialize(): void;
    }
  }

  const SavedMessagesStore: Stores.SavedMessagesStore;
}
