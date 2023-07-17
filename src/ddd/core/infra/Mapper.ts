import { Result } from "@badrap/result";

/**
* A mapper that converts a domain object (entity or value object) to and from a persistent form.
*
* Has two static methods: `toDomain` and `toPersistence`.
* However, because Typescript [doesn't allow static methods in interfaces](https://github.com/microsoft/TypeScript/issues/33892) it has to be written as an abstract class.
*/
// export interface Mapper<T> {
//   // public static toDomain (raw: any): Result<T>;
//   // public static toPersistence (t: T): any;
//   // public static toDTO (t: T): DTO;
// }
export abstract class Mapper<T> {
  static toDomain (raw: any): Result<T> { throw new Error("Not implemented"); };
  static toPersistence (t: T): any { throw new Error("Not implemented"); };
  // public static toDTO (t: T): DTO;
};