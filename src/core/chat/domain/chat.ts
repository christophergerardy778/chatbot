export class Chat {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly summary: string,
    public readonly next_sequence: number,
    public readonly facts_until_sequence: number,
    public readonly created_at: Date
  ) {}
}
