import { Component } from '@angular/core';

const day: string[] = [
"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const months: string[] = [
"January", "February", "March", "April", "May", "June", "July", "August",
"September", "October", "November", "December"];

const days_in_month: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function generateMonth(monthID) {
  var month = months[monthID];
  var firstDay = new Date(2016, monthID, 1);
  var startingDay = firstDay.getDay();
  var numDays = days_in_month[monthID];

  var month_days = [];

  for (var i = 1; i <= numDays; i++)
  {
    month_days.push(i);
  }
  for (var k = 0; k < startingDay; k++)
  {
    month_days.unshift(0);
  }
  return month_days;
};

function getCurrentMonth() {
  var today = new Date();
  return today.getMonth();
};

function allStorage() {
  var values = [],
  keys = Object.keys(localStorage),
  i = keys.length;

  while (i--) {
    var eventDetails = localStorage.getItem(keys[i]);
    var key = keys[i];
    var event = key + " : " + eventDetails;
    values.push(event);
  }
  return values;
};


@Component({
    selector: 'my-app',
    template: `<h1>Calendar 2016</h1>
    <div style='font-size: 18px;'><button (click)="monthprev(monthnum)">Prev</button>
      {{month}} ({{monthnum + 1}}) {{year}}<button (click)="monthnext(monthnum)">Next</button></div>
    <ul class="horizontal">
      <li *ngFor="let week_day_name of days">{{week_day_name}}</li>
    </ul>
    <div> <!--iterate over each week -->
      <div class="din" *ngFor="let day of month_data"> <!-- print each day of the week-->
        <div style='text-align: center' *ngIf="day == 0">-</div>
        <div class="valid_day" id="{{day + '-' + monthnum}}" *ngIf="day != 0" (click)="getEvent(day, monthnum)"> {{day}} </div>
      </div>
    </div>
    <div>
      <h4>Scheduled Events</h4>
      <ul>
        <li *ngFor="let event of events">{{event}}</li>
      </ul>
    </div>
    `
})

export class AppComponent {

  public days : string[];
  public month : string;
  public monthnum : number;
  public month_data : number[];
  public events: string[];

  constructor() {
    this.days = day;
    this.monthnum = getCurrentMonth();
    this.month = months[getCurrentMonth()];
    this.month_data = generateMonth(getCurrentMonth());
    this.events = allStorage();
  }

  monthprev(currentMonth)
  {
    var prevMonth = (currentMonth - 1);

    if (prevMonth < 0)
    {
      prevMonth = 11;
    }

    this.month = months[prevMonth];
    this.monthnum = prevMonth;
    this.month_data = generateMonth(prevMonth);
  }

  monthnext(currentMonth)
  {
    var nextMonth = currentMonth + 1;

    if (nextMonth > 11)
    {
      nextMonth = 0;
    }

    this.month = months[nextMonth];
    this.monthnum = nextMonth;
    this.month_data = generateMonth(nextMonth);
  }

  getEvent(day, monthnum)
  {
    var key = day.toString() + "-" + months[monthnum].toString();
    var check = localStorage.getItem(key);

    if (check == null)
    {
      var eventValue = prompt("Enter event name: ");
      if (eventValue != null)
      {
        localStorage.setItem(key, eventValue);
        this.events = allStorage();
      }
    }
    else
    {
      var showString = "There are already events scheduled- ";
      var choice = confirm(showString + check + ". Click OK to add more.");

      if (choice == true)
      {
        var eventValue = prompt("Enter new event or type 'x' to delete scheduled events.");
        var newval = check.toString() + ", " + eventValue.toString();

        if (eventValue == 'x')
        {
          localStorage.removeItem(key);
          this.events = allStorage();
        }
        else
        {
          localStorage.setItem(key, newval);
          this.events = allStorage();
        }
      }
    }
  }
}
