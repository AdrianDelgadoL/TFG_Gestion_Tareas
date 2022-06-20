import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarView} from "angular-calendar";
import {GetUnverifiedTasksUseCase} from "../../../uc_layer/database/get-verified-tasks.usecase";
import {Task} from "../../../entities/task"
import {isSameDay, isSameMonth} from "date-fns";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  events: CalendarEvent[] = []
  activeDayIsOpen: boolean = false;

  constructor(private getTasksUC: GetUnverifiedTasksUseCase) { }


  async ngOnInit() {
    const tasks: Task[] = await this.getTasksUC.execute(null);
    tasks.forEach(task => {
      this.events = [
        ...this.events, // Appends new event to the event array
        {
          start: task.date,
          title: task.name
        }
        ]
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // On clicking a day with tasks, open the menu to see the tasks for that day
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

}
