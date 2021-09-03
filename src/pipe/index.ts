/**
 * Class for constructing type-safe left-to-right function compositions
 *
 * Example:
 *
 * const foo =
 *   Pipe
 *     .from((x: number) => x * 2)
 *     .to(x => x.toString())
 *     .to(s => s + s)
 *     .fn
 */
export default class Pipe<In extends readonly any[], Out> {
  private constructor(public readonly fn: (...args: In) => Out) {}

  to<Result>(fn: (value: Out) => Result): Pipe<In, Result> {
    return new Pipe<In, Result>((...args: In) => fn(this.fn(...args)));
  }

  static from<In extends readonly any[], Out>(fn: (...args: In) => Out) {
      return new Pipe((...args: In) => fn(...args));
  }
}
