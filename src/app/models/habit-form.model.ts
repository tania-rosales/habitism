
export class habitModel {
  habitName: string;
  goal: number;
  date: Date = new Date();
  description: string;
  status: boolean = false; //Para saber si un habito se completó, false si no, true si ya se completó
  uid: string;

  constructor(
    habitName: string,
    goal: number,
    date: Date = new Date(),
    description: string,
    status: boolean = false,
    uid: string
  ){
    this.habitName = habitName;
    this.goal = goal;
    this.date = date;
    this.description = description;
    this.status = status;
    this.uid = uid;
  }
}