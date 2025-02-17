import React, { useEffect, useState } from 'react';
import { CssBaseline,ThemeProvider, Typography, Grid } from '@mui/material';
import theme from '../../theme/theme';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import style from 'styled-components';

const CustomCalendar = ({ dates, onDateChange, editable }) => {
  const isToday = (date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();
  };

  const isPastDate = (date) => {
    const today = new Date();
    return date < today;
  };

  const formatDate = (date) => {
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const koreanDay = dayOfWeek[date.getDay()];
    const formmatedKoreanDay = '(' + koreanDay + ')';
    return dayjs(date).format(`YYYY.MM.DD ${formmatedKoreanDay}`);
  };

  const tileDisabled = ({ date }) => {
    return isPastDate(date) && !isToday(date);
  };

  const allTileDisabled = ({ date }) => {
    return true;
  };

  const selectedDatesText = editable ?
    (
      dates.length === 0
      ? '선호 기간을 선택해주세요'
      : `${formatDate(dates[0])} - ${formatDate(dates[1])}`
    )
    : ('-');

    return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div>
          <div style={{ padding: '10px 17px', textAlign: 'center', borderRadius: '8px', border: "1px solid #E2E2E2", margin: '10px 0'}}>
            <Typography style={{ fontSize: '16px' }}>{selectedDatesText}</Typography>
          </div>
          <Grid style={{ border: '1px solid #E2E2E2', borderRadius: '20px', width: '100%',  padding: '18px 12px' }}>
            <CalendarDesign>
                <Calendar
                    onChange={onDateChange}
                    value={dates}
                    selectRange={true} 
                    next2Label={null}
                    prev2Label={null}
                    showNeighboringMonth={false} 
                    formatDay={(locale, date) =>
                        date.toLocaleString('en', { day: 'numeric' })
                    }
                    calendarType="gregory"
                    tileDisabled={editable ? tileDisabled : allTileDisabled}
                />
            </CalendarDesign>
          </Grid>
      </div>
    </ThemeProvider>
  );
}

const CalendarDesign = style.div`
    .react-calendar { 
        width: 100%;
        background-color: #fff;
        color: #3C3C3C;
        font-family: 'NanumSquareRound, sans-serif',
        margin: 0;
        border-color: transparent;
       }
       .react-calendar__navigation button {
        color: black;
        min-width: 30px;
        background: none;
        font-size: 16px;
        font-weight: 500px;
       }
       .react-calendar__navigation button:enabled:hover,
       .react-calendar__navigation button:enabled:focus {
        background-color: #f8f8fa;
       }
       .react-calendar__navigation button[disabled] {
        background-color: #f0f0f0;
       }
       .react-calendar__tile:disabled {
          background-color: #fff;
          color: #ccc;
          cursor: not-allowed;
        }
       .react-calendar__month-view__weekdays {
        background: white;
        abbr { /*월,화,수... 글자 부분*/
          color: #BABABA;
          font-weight: 500;
          text-decoration : none;
        }
      }
      .react-calendar__month-view__days__day:not(.react-calendar__tile--active):not(.react-calendar__tile--now):not(.react-calendar__tile:disabled):not(.react-calendar__month-view__days__day--weekend) {
        abbr {
         color: #3C3C3C;
        }
       }
      .react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend,
       .react-calendar__month-view__weekdays > div:nth-child(7),
        .react-calendar__month-view__weekdays > div:nth-child(1) {
          abbr {
            color: #FC9712 !important;
          }
        }
      .react-calendar__tile {
        text-align: center;
        height: 40px;
        margin: 4px 0;
      }
       .react-calendar__tile:enabled:hover,
       .react-calendar__tile:enabled:focus {
        background: #FC9712;
        color: white;
        font-weight: bold;
       }
       .react-calendar__tile--now:not(.react-calendar__tile--active) {
        background: #ffe4b8;
        border-radius: 50%;
        font-weight: bold;
        color: white;
       }
       .react-calendar__month-view__days__day--weekend {
        color: #FC9712;
       }
       .react-calendar__tile--active {
        background: #FC9712 !important;
        color: white !important;
        font-weight: bold !important;
       }
       .react-calendar__tile--rangeEnd {
        border-radius: 0 25px 25px 0;
       }
       .react-calendar__tile--rangeStart {
        border-radius: 25px 0 0 25px;
       } 
       .react-calendar__tile--rangeStart.react-calendar__tile--rangeEnd {
        border-radius: 25px;
      },
      .react-calendar__tile.react-calendar__tile--hasActive {
        background: #FC9712;
        color: white;
      }

    `

export default CustomCalendar;
