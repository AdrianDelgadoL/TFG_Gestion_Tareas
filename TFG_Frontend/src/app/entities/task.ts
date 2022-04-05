export class Task {
  id: string = "";
  name: string = "";
  date: Date = new Date();
  type: string = "";
  verified: boolean = false;
  assignedWorkers: any[];
  description: string | undefined;
  extraFields: Array<any> | undefined;

  constructor(
    id: string,
    name: string,
    date: Date,
    type: string,
    verified: boolean,
    assignedWorkers: [],
    description?: string,
    extraFields?: Array<any>
  ) {
    this.id = id
    this.name = name;
    this.date = date;
    this.type = type;
    this.verified = verified;
    this.assignedWorkers = assignedWorkers;
    this.description = description;
    this.extraFields = extraFields;
  }
}
