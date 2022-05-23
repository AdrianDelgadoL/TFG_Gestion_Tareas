import {Worker} from "./worker";

export class Task {
  id: string = "";
  name: string = "";
  date: Date = new Date();
  type: string = "";
  verified: boolean = false;
  assignedWorkers: any[];
  description: string | undefined;
  extraFields: Array<{name: string, value: string}> | undefined;

  constructor(
    id: string,
    name: string,
    date: Date,
    type: string,
    verified: boolean,
    assignedWorkers: [],
    description?: string,
    extraFields?: Array<{name: string, value: string}>
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
