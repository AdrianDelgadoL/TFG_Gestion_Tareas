export abstract class UseCaseTemplate<x, y> {
  abstract execute(operator: x): y;
}
