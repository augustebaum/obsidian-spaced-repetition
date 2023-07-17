import { UniqueEntityId } from "./UniqueEntityId";

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityId;
  protected props: T;

  // Take note of this particular nuance here:
  // Why is "id" optional?
  constructor(props: T, id?: UniqueEntityId) {
    this._id = id ? id : new UniqueEntityId();
    this.props = props;
  }

  // Entities are compared based on their referential
  // equality.
  public equals (object?: Entity<T>): boolean {

    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}