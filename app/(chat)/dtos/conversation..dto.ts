export interface ICreateConversationDto {
  userId?: string;
  name?: string;
  isGroup?: boolean;
  members?: string[];
  sessionId?: string;
}
