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
          
              // Calculate the adjusted first day of the month to ensure Sunday starts at 0
              const adjustedFirstDayOfMonth = (firstDayOfMonth === 0) ? 7 : firstDayOfMonth + 1;
          
              // Insert empty days to align the 1st of the month to Sunday
              for (let i = 0; i < adjustedFirstDayOfMonth; i++) {
                const li = document.createElement('li');
                li.className = 'calendar-day empty';
            
                const dayOfWeekIndex =  i % 7; // Adjusting to start from Monday (index 0)
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
          
                  const dayOfWeekIndex = (adjustedFirstDayOfMonth + day - 2) % 7;
                  const dayOfWeek = daysOfWeek[dayOfWeekIndex];
          
                  li.dataset.weekday = dayOfWeek;
                  li.appendChild(span);
          
                  const div = document.createElement('div');
                  div.className = 'calendar-day__content';
          
                  if (days[day]) {
                      days[day].forEach(event => {
                          const eventDiv = document.createElement('div');
                          eventDiv.textContent = event;
                          div.appendChild(eventDiv);
                      });
                  }
          
                  li.appendChild(div);
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
