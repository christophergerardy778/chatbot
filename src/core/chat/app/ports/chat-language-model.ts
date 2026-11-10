export interface ChatLanguageModel {
  generate(): AsyncIterable<string>;
}
