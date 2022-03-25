export class Task {
  id: string = ""
  name: string = ""
  date: Date = new Date()
  type: string = ""
  verified: boolean = false
  extraFields: Array<any> | undefined

  constructor(
    id: string,
    name: string,
    date: Date,
    type: string,
    verified: boolean,
    extraFields?: Array<any>
  ) {
    this.id = id
    this.name = name;
    this.date = date;
    this.type = type;
    this.verified = verified;
    this.extraFields = extraFields;
  }
}
