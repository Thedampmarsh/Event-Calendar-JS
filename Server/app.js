document.addEventListener('DOMContentLoaded', function () {

    // Get current year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    fetch(`/Server/events_${currentYear}.json`)
        .then(response => response.json())
        .then(data => {
            // Grab Json object
            const events = data.events;

            const eventMonth = document.getElementById('eventMonth');
            const eventDay = document.getElementById('eventDay');
            const eventYear = document.getElementById('eventYear');
            // Month buttons
            const prevButton = document.querySelector('.prevMonth');
            const nextButton = document.querySelector('.nextMonth');

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            const currentDay = currentDate.getDate();
            const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            function updateDateInfo() {
                const dateInfo = document.getElementById('dateInfo');
                const fullDate = `${eventMonth.options[eventMonth.selectedIndex].text} ${currentDay}, ${currentYear}`;
                dateInfo.textContent = fullDate;
            }

            function updateDays() {
                const year = eventYear.value;
                const month = eventMonth.value;
                const monthName = eventMonth.options[eventMonth.selectedIndex].text;

                fetch(`/Server/events_${year}.json`)
                    .then(response => response.json())
                    .then(data => {
                        const eventData = data.events[year][monthName] || {};

                        if (eventDay) {
                            eventDay.innerHTML = '';
                            Object.keys(eventData).forEach(day => {
                                const option = document.createElement('option');
                                option.value = day;
                                option.textContent = day;
                                eventDay.appendChild(option);
                            });
                        }
                        updateCalendar(monthName, eventData);
                    })
                    .catch(error => console.error('Error fetching events:', error));
            }

            function updateCalendar(monthName, days) {
                const calendar = document.querySelector('.calendar');
                calendar.innerHTML = '';

                const year = eventYear.value;
                const month = parseInt(eventMonth.value);

                const firstDayOfMonth = new Date(year, month, 1).getDay();
                const lastDayOfMonth = new Date(year, month + 1, 0).getDate();


                // Insert empty days to align the 1st of the month to Sunday
                for (let i = 0; i < firstDayOfMonth; i++) {
                    const li = document.createElement('li');
                    li.className = 'calendar-day empty';

                    const dayOfWeekIndex = (0 + i) % 7;
                    const dayOfWeek = daysOfWeek[dayOfWeekIndex];

        li.dataset.weekday = dayOfWeek;

                    calendar.appendChild(li);
                }

                for (let day = 1; day <= lastDayOfMonth; day++) {
                    const li = document.createElement('li');
                    li.className = 'calendar-day';
                    const span = document.createElement('span');
                    span.className = 'calendar-day__number';
                    span.textContent = day;

                    const dayOfWeekIndex = (firstDayOfMonth + day - 1) % 7;
                    const dayOfWeek = daysOfWeek[dayOfWeekIndex];

                    li.dataset.weekday = dayOfWeek;
                    li.appendChild(span);

                    const div = document.createElement('div');
                    div.className = 'calendar-day__content';
                    // console.log(day.days["2024"]["January"]);
                    const eventDiv = document.createElement('a');
                    days[day].forEach(event => {
                                const { name, embeddedLink, color } = event;
                                if (name || color || embeddedLink) {
                                    if (embeddedLink) {
                                        eventDiv.href = embeddedLink;
                                    }
                            
                                    // Check if color exists before setting background color
                                    if (color) {
                                        eventDiv.style.backgroundColor = color;
                                    }
                            
                                    // Check if name exists before setting text content
                                    if (name) {
                                        eventDiv.textContent = name;
                                    }
                                    div.appendChild(eventDiv);         
                                    console.log(name, embeddedLink, color);
                                    console.log('Event details:', { name, embeddedLink, color });
                                    console.log('Event element:', eventDiv);
                                }
                        })
            

                    

                    li.appendChild(div);
                    calendar.appendChild(li);
                }
                const remainingDays = (7 - (lastDayOfMonth + firstDayOfMonth - 1) % 7) % 7;
                for (let i = 0; i < remainingDays; i++) {
                    const li = document.createElement('li');
                    li.className = 'calendar-day empty';
            
                    const dayOfWeekIndex = (firstDayOfMonth + lastDayOfMonth + i - 1) % 7;
                    const dayOfWeek = daysOfWeek[dayOfWeekIndex];
                    // console.log("First day of the month:", firstDayOfMonth);
                    li.dataset.weekday = dayOfWeek;
                    calendar.appendChild(li);
                }
            }

            eventMonth.addEventListener('change', updateDays);
            eventYear.addEventListener('change', updateDays);
            prevButton.addEventListener('click', () => {
                if (eventMonth.selectedIndex > 0) {
                    eventMonth.selectedIndex--;
                } else if (eventYear.selectedIndex > 0) {
                    eventYear.selectedIndex--;
                    eventMonth.selectedIndex = 11;
                }
                updateDays();
            });
            nextButton.addEventListener('click', () => {
                if (eventMonth.selectedIndex < 11) {
                    eventMonth.selectedIndex++;
                } else if (eventYear.selectedIndex < eventYear.options.length - 1) {
                    eventYear.selectedIndex++;
                    eventMonth.selectedIndex = 0;
                }
                updateDays();
            });

            eventMonth.selectedIndex = currentMonth;
            updateDateInfo();
            updateDays();
        })
        .catch(error => console.error('Error fetching events:', error));
});
