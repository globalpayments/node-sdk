export interface IRawRequestBuilder {
  getValue<T>(names: string[]): T;
}
