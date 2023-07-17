import { Entity } from "src/ddd/core/domain/Entity";
import { UniqueEntityId } from "src/ddd/core/domain/UniqueEntityId";

interface IDeckProps {
  name: string;
  parent: Deck | null;
  subdecks: Deck[];
}

export class Deck extends Entity<IDeckProps> {
  private constructor(props: IDeckProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create (props: IDeckProps, id?: UniqueEntityId) {
    if (props.subdecks.some((deck) => deck === props.parent)) {
      throw new Error(`Parent deck ${props.parent} is also in children`);
    }
    return new Deck(props, id);
  }
};