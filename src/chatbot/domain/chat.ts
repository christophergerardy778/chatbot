export class Chat {
  constructor(
    private readonly chatId: string,
    private readonly userId: string,
    private readonly chatName: string
  ) {}

  public id(): string {
    return this.chatId;
  }
}
