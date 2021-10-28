import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import './calendar.css';

const isLeapYear = (year) => {
  if (typeof year === 'number') {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }
  return false;
}

const Calendar = React.memo((props) => {
  const { date } = props;
  const [current, setCurrent] = useState({
    date: null,
    month_days: 0,
    week_days: 0,
    month_today: 0,
    calendar_arr: [],
  });
  const tmp = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  useEffect(() => {
    setCurrent({
      ...current,
      date: new Date(),
    });
  }, []);

  useEffect(() => {
    if (current.date instanceof Date) {
      const year = current.date.getFullYear();
      const month = current.date.getMonth();
      const calendar = [];
      let week_days = current.date.getDay();

      let currMonthDays, prevMonthDays;
      if (month !== 1) {
        currMonthDays = tmp[month];
        if (month - 1 === 1) {
          prevMonthDays = isLeapYear(year) ? 29 : 28;
        } else {
          prevMonthDays = tmp[month - 1];
        }
      } else {
        currMonthDays = isLeapYear(year) ? 29 : 28;
        prevMonthDays = 31;
      }

      for (let i = 1; i <= currMonthDays; i++) {
        calendar.push({
          type: 'curr',
          value: i,
        });
      }

      for (let i = 0; i < week_days; i++) {
        calendar.unshift({
          type: 'prev',
          value: prevMonthDays - i,
        });
      }

      let i = 1;
      while (calendar.length % 7 !== 0) {
        calendar.push({
          type: 'next',
          value: i++,
        });
      }

      setCurrent({
        ...current,
        month_days: currMonthDays,
        week_days,
        month_today: current.date.getDate(),
        calendar_arr: calendar,
      })
    }
  }, [current.date]);

  return <>
    <div className="card calendar">
      <div className="cal-header">{ dayjs(current.date).format('YYYY年MM月') }</div>
      <ul className="cal-body">
        <li className="cal-li-header">日</li>
        <li className="cal-li-header">一</li>
        <li className="cal-li-header">二</li>
        <li className="cal-li-header">三</li>
        <li className="cal-li-header">四</li>
        <li className="cal-li-header">五</li>
        <li className="cal-li-header">六</li>
        {
          Array.isArray(current.calendar_arr) && current.calendar_arr.map(item => {
            return (
              <li
                key={uuidv4()}
                className={`${item.value === current.month_today ? "today" : ''} ${item.type !== 'curr' ? "prev-next" : ''}`}
              >
                {item.value}
              </li>
            )
          })
        }
      </ul>
      {/* <div className="cal-footer">footer</div> */}
    </div>
  </>
})

export default Calendar;