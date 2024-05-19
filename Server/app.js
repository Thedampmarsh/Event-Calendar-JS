
const dateInfo = document.querySelector('#dateInfo');
const prevMonth = document.querySelector('.prevMonth');
const nextMonth = document.querySelector('.nextMonth');
const currentDate = new Date();

const monthInx = currentDate.getMonth();
const dayOfMonth = currentDate.getDate();
const year = currentDate.getFullYear();
const dayOfWeek = currentDate.getDay();

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "september",
    "October",
    "November",
    "December"
];



let currentMonthIndex = new Date().getMonth();

function updateMonth() {
const calendar = document.querySelector('.calendar');
const dateInfo = document.querySelector('#dateInfo');
dateInfo.innerHTML = "";
const dayElements = calendar.querySelectorAll('.calendar-day__number');
const year = currentDate.getFullYear();
const dayName = daysOfWeek[dayOfWeek];
const monthName = months[currentMonthIndex];
const fullDate = `${monthName} ${dayOfMonth} ${dayName} ${year}`;
const dateSpan = document.createElement('span');
dateSpan.textContent = fullDate;
dateInfo.appendChild(dateSpan);
}
function populateDays() {
    const eventDaySelect = document.querySelector('#eventDay');
    eventDaySelect.innerHTML = '';
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        eventDaySelect.appendChild(option);
    }
}

function addEvent() {
    const eventTitle = document.querySelector('#eventTitle').value;
    const eventSubject = document.querySelector('#eventSubject').value;
    const eventMonth = document.querySelector('#eventMonth').value;
    const eventDay = document.querySelector('#eventDay').value;
    const eventHour = document.querySelector('#eventHour').value;
    const eventMinute = document.querySelector('#eventMinute').value;
    const eventYear = document.querySelector('#eventYear').value;
    const eventColor = document.querySelector('#eventColor').value;

    const eventContainer = document.querySelector('.calendar-day__content')

    if (eventTitle && eventSubject && eventMonth && eventDay && eventHour !== "" && eventMinute !== "" && eventYear) {
        // Find the correct calendar-day__content element
        const calendarDays = document.querySelectorAll('.calendar-day');
        // let targetDayElement = null;
        calendarDays.forEach(dayElement => {
            const dayNumber = dayElement.querySelector('.calendar-day__number').textContent;
            if (parseInt(dayNumber) === parseInt(eventDay)) {
                targetDayElement = dayElement.querySelector('.calendar-day__content');
            }
        });
    }
        if (targetDayElement) {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.style.backgroundColor = eventColor;
            eventElement.textContent = `Title: ${eventTitle}, Subject: ${eventSubject}, Date: ${months[eventMonth]} ${eventDay}, ${eventYear} at ${eventHour}:${eventMinute}`;
            targetDayElement.appendChild(eventElement);

            // Clear the input fields
            document.querySelector('#eventTitle').value = '';
            document.querySelector('#eventSubject').value = '';
            document.querySelector('#eventMonth').value = '0';
            document.querySelector('#eventDay').value = '';
            document.querySelector('#eventHour').value = '';
            document.querySelector('#eventMinute').value = '';
            document.querySelector('#eventYear').value = '';
            document.querySelector('#eventColor').value = 'red';

    }
}


document.addEventListener("DOMContentLoaded", function() {
    updateMonth()
    populateDays()
// Month Buttons



document.querySelector('.prevMonth').addEventListener('click', function() {
    currentMonthIndex = (currentMonthIndex - 1) % months.length;
    updateMonth();
});

document.querySelector('.nextMonth').addEventListener('click', function() {
    currentMonthIndex = (currentMonthIndex + 1) % months.length;
    updateMonth();
});

document.querySelector('#addEventButton').addEventListener('click', addEvent);

});