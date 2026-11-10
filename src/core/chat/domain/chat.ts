export class Chat {
  constructor(
    private readonly chatId: string,
    private readonly userId: string,
    private readonly chatName: string
  ) {}

  get id(): string {
    return this.chatId;
  }
}
