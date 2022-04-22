var currentDate = new Date();

var month = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

// var schedules = [
//   {
//     date: "",
//     callback: function name(params) {
//       // send email
//     },
//   },
// ];

// window.setInterval(() => {
//   schedules.forEach((s) => {
//     if (s.date === now) {
//       s.callback('me@gmail.com');
//     }
//   });
// }, 1000);

let monthTitle = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let holidayDataBase = [];

/*alert("Hello World");*/
/*prompt("Please Enter Your Name");*/
/*document.write("MOAR COOODEEEE Zzzzz!");*/
/*document.write("<h1>MOAR COOODEEEE Zzzzz!</h1>");*/
//console.log(document.getElementById("month-title").innerHTML);

// document.getElementById("month-title").innerHTML = months[0];
// document.getElementById("year-title").innerHTML = currentYear;

//console.log("current date:" + currentDate.getDate());
//console.log("current day: " + currentDate.getDay());
//console.log("current month index:" + currentDate.getMonth());

//Today's Date
document.getElementById("local-time").innerHTML = currentDate;

/*document.getElementById("local-time").innerHTML =
  daysOfTheWeek[currentDate.getDay()] +
  "/" +
  monthTitle[currentDate.getMonth()] +
  "/" +
  currentDate.getDate() +
  "/" +
  currentDate.getFullYear();*/

//Calculate & generate dates in a month
function generateDaysInMonth(currentMonth, currentYear) {
  var firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDate();
  var lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  var daysInMonth = [];

  for (var i = firstDayOfMonth; i <= lastDayOfMonth; i++) {
    var date = new Date(currentYear, currentMonth);
    date.setDate(i);

    daysInMonth.push(date);
    //console.log(date);
  }

  console.log(daysInMonth);

  return daysInMonth;
}

generateDaysInMonth(month, currentYear);

//Rendering Dates to the local web server
function renderDaysInMonth(currentMonth, currentYear) {
  var daysInMonth = generateDaysInMonth(currentMonth, currentYear);
  var paddingDayHead = generatePadDayHead(currentYear, month);
  var paddingDayTail = generatePadDayTail(currentYear, month);

  //daysInMonth = paddingDayHead.concat(daysInMonth).concat(paddingDayTail);

  //var monthElements = [];
  var datePanel = document.getElementsByClassName("date-slot")[0];

  //CUSTOM HEAD PADDING RENDER
  paddingDayHead.forEach((element) => {
    var tag = document.createElement("div");
    var text = element.getDate();

    /*var text =
        element.getDate() +
        "   " +
        daysOfTheWeek[element.getDay()] +
        "   " +
        element.toLocaleDateString();*/

    var textNode = document.createTextNode(text);
    tag.appendChild(textNode);
    tag.style.backgroundColor = "grey";
    tag.className = "date";

    tag.onclick = () => {
      //alert(JSON.stringify(element));
      //console.log(element);
      document.getElementById("input-date").innerHTML =
        daysOfTheWeek[element.getDay()] +
        "/" +
        monthTitle[element.getMonth()] +
        "/" +
        element.getDate() +
        "/" +
        element.getFullYear();
      //tag.style.backgroundColor = "blue";
    };

    datePanel.appendChild(tag);
  });

  //NORMAL DAYS RENDER
  daysInMonth.forEach((element) => {
    var tag = document.createElement("div");
    var text = element.getDate();

    /*var text =
        element.getDate() +
        "   " +
        daysOfTheWeek[element.getDay()] +
        "   " +
        element.toLocaleDateString();*/

    var textNode = document.createTextNode(text);
    tag.appendChild(textNode);

    tag.className = "date";

    // check whether the day is a holiday or not
    for (var i = 0; i < holidayDataBase.length; i++) {
      if (holidayDataBase[i].date === element.toDateString()) {
        var eventShow = document.createElement("div");
        eventShow.className = "event";
        eventShow.id = "user-event";
        eventShow.appendChild(
          document.createTextNode(holidayDataBase[i].event)
        );

        var timeShow = document.createElement("div");
        timeShow.className = "time";
        timeShow.id = "timming";
        timeShow.appendChild(document.createTextNode(holidayDataBase[i].time));

        tag.append(eventShow);
        tag.append(timeShow);
        break;
      }
    }

    tag.onclick = () => {
      //alert(JSON.stringify(element));
      //console.log(element);
      document.getElementById("input-date").innerHTML =
        daysOfTheWeek[element.getDay()] +
        "/" +
        monthTitle[element.getMonth()] +
        "/" +
        element.getDate() +
        "/" +
        element.getFullYear();
      document.getElementById("input-date").style.backgroundColor =
        "rgb(253, 236, 204)";
      //tag.style.backgroundColor = "blue";
    };
    //tag.style["grid-column"] = element.getDay() + 1;

    tag.ondblclick = () => {
      //text area to write events
      var textBox = document.createElement("textarea");
      textBox.setAttribute("placeholder", "New Event");
      textBox.className = "user-input";
      textBox.id = "input-event";

      //time area to write time event
      var timeBox = document.createElement("textarea");
      timeBox.setAttribute("placeholder", "HH:MM AM");
      timeBox.className = "time-input";
      timeBox.id = "input-time";

      //submition button
      var button = document.createElement("input");
      button.setAttribute("type", "submit");
      button.id = "submit-button";
      button.className = "user-confirmation";
      button.setAttribute("onclick", "storeHoliday()");

      tag.appendChild(textBox);
      tag.appendChild(timeBox);
      tag.appendChild(button);

      tag.ondblclick = () => {
        tag.removeChild(button);
        tag.removeChild(timeBox);
        tag.removeChild(textBox);

        tag.appendChild(textBox);
        tag.appendChild(timeBox);
        tag.appendChild(button);
      };

      //if submit button clicked
      document.getElementById("submit-button").onclick = function () {
        //user input time (in calendar)
        var timeShow = document.createElement("div");
        timeShow.className = "time";
        timeShow.id = "timming";
        var timeInput = document.getElementById("input-time").value;
        timeShow.appendChild(document.createTextNode(timeInput));

        //event display (in calendar)
        var eventShow = document.createElement("div");
        eventShow.className = "event";
        eventShow.id = "user-event";
        var eventText = document.getElementById("input-event").value;
        eventShow.appendChild(document.createTextNode(eventText));

        //event display (event board)
        var eventHold = document.getElementsByClassName("event-adder")[0];
        var eventTag = document.createElement("div");
        var eventName = document.createTextNode(
          element.toDateString() +
            ": " +
            " " +
            eventText +
            ": " +
            " " +
            timeInput
        );
        eventTag.style.backgroundColor = random_bg_color();
        eventTag.appendChild(eventName);
        eventHold.appendChild(eventTag);

        storeHoliday(element.toDateString(), eventText, timeInput);
        //alert("button was clicked");
        if (tag.hasChildNodes(button) || tag.hasChildNodes(textBox)) {
          tag.removeChild(button);
          tag.removeChild(timeBox);
          tag.removeChild(textBox);
          tag.append(eventShow);
          tag.append(timeShow);
        }
      };
    };
    datePanel.appendChild(tag);
  });

  //CUSTOM TAIL PADDING RENDER
  paddingDayTail.forEach((element) => {
    var tag = document.createElement("div");
    var text = element.getDate();
    /*var text =
        element.getDate() +
        "   " +
        daysOfTheWeek[element.getDay()] +
        "   " +
        element.toLocaleDateString();*/

    var textNode = document.createTextNode(text);
    tag.appendChild(textNode);
    tag.style.backgroundColor = "grey";
    tag.className = "date";

    tag.onclick = () => {
      //alert(JSON.stringify(element));
      //console.log(element);
      document.getElementById("input-date").innerHTML =
        daysOfTheWeek[element.getDay()] +
        "/" +
        monthTitle[element.getMonth()] +
        "/" +
        element.getDate() +
        "/" +
        element.getFullYear();
      //tag.style.backgroundColor = "blue";
    };

    //tag.style["grid-column"] = element.getDay() + 1;

    datePanel.appendChild(tag);
  });
}

//calculate current time (12 hours)
function currentTime() {
  currentDate = new Date();
  var timer = document.getElementById("time-display");
  let hh = currentDate.getHours();
  let mm = currentDate.getMinutes();
  let ss = currentDate.getSeconds();
  let session = "AM";

  if (hh == 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  timer.innerText = time;
  return time;
}

//set time very 1000 millisec or 1 sec
setInterval(() => currentTime(), 1000);

function storeHoliday(date, event, time) {
  //fix remind if it's 12PM/ 12AM
  var actualTime = time;
  var hh = time.substring(0, 2);
  var mm = time.substring(3, 5);
  var session = time.substring(6, 8);

  if (hh == 12 && parseInt(mm) - 5 < 0) {
    hh = 11;
    if (session === "PM") {
      session = "AM";
    } else {
      session = "PM";
    }
    mm = parseInt(mm) - 5 + 60;
  } else {
    mm = parseInt(mm) - 5;
  }

  time = hh + ":" + mm + " " + session;

  var obj = {
    date: date,
    event: event,
    time: actualTime,
    reminder: time,
    ack: false,
  };
  holidayDataBase.push(obj);
  //console.log(date);
  //console.log(event);
  //console.log(time);
  console.log("currently hold: " + holidayDataBase.length);
}

renderDaysInMonth(month, currentYear);

//changing date/month/year if user click right (to move forward in month)
function changeMonthRight() {
  var nextMonth = month++;
  var element = document.getElementsByClassName("month-title")[0];
  var tag = document.createElement("span");

  if (nextMonth >= 11) {
    nextMonth = 0;
    currentYear++;
    month = nextMonth;
  }
  var datePanel = document.getElementsByClassName("date-slot")[0];
  removeAllChildNodes(datePanel);
  renderDaysInMonth(month, currentYear);
  removeAllChildNodes(element);
  tag.appendChild(
    document.createTextNode(monthTitle[month] + "  " + currentYear)
  );
  element.append(tag);
  //console.log(month);
  //console.log(currentYear);
}

//render the current month
function renderMonth() {
  var element = document.getElementsByClassName("month-title")[0];
  var tag = document.createElement("span");
  tag.appendChild(
    document.createTextNode(monthTitle[month] + "  " + currentYear)
  );
  element.append(tag);
}

renderMonth();

//changing date/month/year if user click left (to move back in month)
function changeMonthLeft() {
  var previousMonth = month--;
  var element = document.getElementsByClassName("month-title")[0];
  var tag = document.createElement("span");

  if (previousMonth < 1) {
    previousMonth = 11;
    currentYear--;
    month = previousMonth;
  }
  var datePanel = document.getElementsByClassName("date-slot")[0];
  removeAllChildNodes(datePanel);
  renderDaysInMonth(month, currentYear);
  removeAllChildNodes(element);
  tag.appendChild(
    document.createTextNode(monthTitle[month] + "  " + currentYear)
  );
  element.append(tag);
  //console.log(month);
  //console.log(currentYear);
}

//remove all element in a container
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//rendering days in a week (mon,tues...sun)
function renderDaysOfWeek() {
  var element = document.getElementsByClassName("day-of-the-week")[0];

  for (var i = 0; i < daysOfTheWeek.length; i++) {
    var tag = document.createElement("div");
    var day = document.createTextNode(daysOfTheWeek[i]);
    tag.appendChild(day);
    element.appendChild(tag);
  }
  console.log("Successfully added days of the week");
}

renderDaysOfWeek();

//generating padding days from the first date of the month
/*function generatePadDayHead(currentYear, month) {
  var padDaysHead = [];
  var firstDayOfMonth = new Date(currentYear, month, 1).getDay();
  //console.log("first day " + firstDayOfMonth);
  //console.log("last day " + lastDayOfMonth);
  for (var i = 0; i < firstDayOfMonth; i++) {
    padDaysHead[i] = null;
    //console.log("head " + i + ": " + padDaysHead[i]);
  }
  return padDaysHead;
}*/

function generatePadDayHead(currentYear, month) {
  var padDaysHead = [];
  var firstDayOfMonth = new Date(currentYear, month, 1).getDay();
  for (var i = 0; i < firstDayOfMonth; i++) {
    var j = i;
    padDaysHead.push(new Date(currentYear, month, -j));
    //console.log("head " + i + ": " + padDaysHead[i]);
  }
  return padDaysHead.reverse();
}

//generating padding days from the last date of the month
/*function generatePadDayTail(currentYear, month) {
  var padDayTail = [];
  var lastDayOfMonth = new Date(currentYear, month + 1, 0).getDay();
  //console.log("first day " + firstDayOfMonth);
  //console.log("last day " + lastDayOfMonth);
  for (var i = lastDayOfMonth; i < 6; i++) {
    padDayTail[i] = null;
    console.log("tail " + i + ": " + padDayTail[i]);
  }
  return padDayTail;
}*/

function generatePadDayTail(currentYear, month) {
  var padDaysTail = [];
  var lastDayOfMonth = new Date(currentYear, month + 1, 0).getDay();
  console.log("lastDayOfMonth:" + lastDayOfMonth);
  for (var i = lastDayOfMonth, j = 1; i < 6; i++, j++) {
    padDaysTail.push(new Date(currentYear, month + 1, j));
  }
  //for (var k = 0; k < padDaysTail.length; k++) {
  //  console.log("Tail " + k + ": " + padDaysTail[k]);
  //}
  return padDaysTail;
}

//month & day check
// var lastDayOfMonth = new Date(currentYear, month + 1, 0).getDay();
// var lastDateOfMonth = new Date(currentYear, month + 1, 0).getDate();
// var fullDate = new Date(currentYear, month + 1, 0);
// console.log("lastDayOfMonth:" + lastDayOfMonth);
// console.log("full Date:" + fullDate);

//Random background color (each time created)
function random_bg_color() {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  console.log(bgColor);

  return bgColor;
}

function sendEmail() {
  //GET 5 MINUTES AGO FROM CURRENT CLOCK
  //const aMinuteAgo = new Date(Date.now() - 5000 * 60);
  //console.log(aMinuteAgo);

  let dateCheck = new Date();
  var day = dateCheck.getDay();
  var month = dateCheck.getMonth();
  var date = dateCheck.getDate();
  var year = dateCheck.getFullYear();

  let hh = dateCheck.getHours();
  let mm = dateCheck.getMinutes();
  let session = "AM";

  if (hh == 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;

  let dateString =
    daysOfTheWeek[day] +
    " " +
    monthTitle[month].substring(0, 3) +
    " " +
    date +
    " " +
    year;
  //console.log(dateString);

  let timeReminder = hh + ":" + mm + " " + session;
  //console.log(timeString);

  holidayDataBase.forEach((element) => {
    if (
      element.date === dateString &&
      element.reminder === timeReminder &&
      !element.ack
    ) {
      //console.log("true day match!");
      //console.log(element.reminder);
      //console.log(timeReminder);
      //sendAlert(element, eventCheck);
      alert("Alarm ring for: " + element.event + " !");

      element.ack = true;
    }
  });
  //console.log("Sending Email....");
}

//Send "Email"
// function sendAlert(element, eventCheck) {
//   if (eventCheck) {
//     //Need function to send email
//     alert("Alarm ring for: " + element.event + " !");
//   }
//   return (eventCheck = false);
// }

//check event in calendar every second
setInterval(sendEmail, 1000);

/*https://www.youtube.com/watch?v=m9OSBJaQTlM*/
