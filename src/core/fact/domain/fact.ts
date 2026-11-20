export class Fact {
  constructor(
    public readonly chatId: string,
    public readonly key: string,
    public readonly value: string,
    public readonly messageId: string
  ) {}
}
