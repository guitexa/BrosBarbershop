import styled from 'styled-components';
import { shade } from 'polished';

import BackgroundImage from '../../assets/bgdark.png';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  background: url(${BackgroundImage}) no-repeat top fixed;
  padding-top: 120px;
  min-height: 100vh;
`;

export const Header = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  position: fixed;
  top: 0;
  z-index: 9999;
`;

export const HeaderContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
  height: 120px;
  display: flex;
  align-items: center;

  > img {
    height: 150px;
    margin-top: 50px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: none;
    outline: none;

    svg {
      color: #ffffff60;
      transition: all 0.2s;

      &:hover {
        color: #fff;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  margin-left: 40px;
  line-height: 21px;

  img {
    display: flex;
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    span:nth-child(1) {
      font-weight: 300;
      color: #ccc;
    }
    span:nth-child(2) {
      font-size: 25px;
      color: #f2f2f2;
      margin-top: 3px;
    }
  }
`;

export const Content = styled.div`
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 65px;
`;

export const Schedule = styled.section`
  width: 640px;
  display: flex;
  flex-direction: column;

  > div:nth-child(2) {
    display: flex;
    align-items: center;
    margin-bottom: 41px;

    span {
      display: flex;
      align-items: center;
      font-weight: 300;
      font-size: 24px;
      color: #ccc;

      & + span::before {
        content: '';
        background: #ccc;
        width: 1px;
        height: 14px;
        margin: 0 10px 4px 10px;
      }
    }
  }
`;

export const NextAppointment = styled.div`
  width: 640px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 50px;

  h1 {
    font-weight: 300;
    color: #ccc;
  }

  > div {
    width: 640px;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid #f2f2f230;
    padding: 18px 23px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &::before {
      content: '';
      width: 2px;
      height: 70%;
      background: #f2f2f2;
      position: absolute;
      left: 0;
    }

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 20px;
    }

    strong {
      font-size: 28px;
    }

    div {
      margin-left: auto;
      display: flex;
      align-items: center;

      svg {
        margin-right: 10px;
      }

      span {
        color: #ffffff90;
        font-size: 28px;
        font-weight: 300;
        margin-top: 2px;
      }
    }
  }
`;

export const Section = styled.div`
  margin-bottom: 50px;

  span:nth-child(1) {
    display: flex;
    flex: 1;
    border-bottom: 1px solid #f2f2f250;
    margin-bottom: 20px;
    padding-bottom: 5px;
  }
  span:nth-child(2) {
    color: #f2f2f290;
    font-weight: 300;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 12px;
  }

  div:nth-child(1) {
    display: flex;
    align-items: center;
    width: 80px;

    svg {
      color: #ccc;
      margin-right: 10px;
    }

    span {
      font-size: 25px;
      font-weight: 300;
      margin-top: 5px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex: 1;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid #f2f2f230;
    padding: 18px 23px;
    border-radius: 8px;
    justify-content: flex-start;
    align-items: center;
    margin-left: 20px;

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 20px;
    }

    strong {
      font-size: 28px;
    }
  }
`;

export const Calendar = styled.aside`
  position: absolute;
  margin-left: 678px;
  top: 155px;

  .DayPicker {
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid #f2f2f230;
    border-radius: 8px;
    font-weight: 400;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker-Day {
    padding: 0.3em 0.5em 0.2em 0.5em;
    font-size: 18px;
  }

  .DayPicker-Weekday {
    font-weight: 400;
    font-size: 20px;
    color: #ccc !important;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 10px 5px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #cccccc10;
    border-radius: 6px;
    color: #f2f2f2;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: #f2f2f2 !important;
    color: #000;
    font-size: 18px;
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #cccccc30 !important;
    background: transparent !important;
    font-weight: 400;
    font-size: 18px;
  }

  .DayPicker-Day--selected {
    background: #f2f2f2 !important;
    border-radius: 10px;
    color: #000 !important;
    font-weight: 400;
    font-size: 18px;
  }

  .DayPicker-Caption {
    font-size: 18px;
    margin-bottom: 0;
  }

  .DayPicker-Caption > div {
    margin-left: 10px;
    margin-top: 5px;
  }
`;
