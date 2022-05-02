export class Role {
  id: string = "";
  permits: string[] = []
  constructor(id: string, permits: string[]) {
    this.id = id;
    this.permits = permits;
  }
}
