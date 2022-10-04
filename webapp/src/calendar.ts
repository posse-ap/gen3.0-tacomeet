import flatpickr from "flatpickr";
import { Japanese } from "flatpickr/dist/l10n/ja.js";
import { range } from "./helper";

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const today = new Date();
// 9 is because of timezone difference
let selectedDate = new Date(today.getFullYear(), today.getMonth(), 1, 9);

let originalDate = selectedDate;

export const setupCalendar = () => {
  setupButtons();
  createCalendar();
};

export const setupButtons = () => {
  const prevButtonELement = document.getElementById("js-calendar-prev");
  const nextButtonELement = document.getElementById("js-calendar-next");

  prevButtonELement.addEventListener("click", prev);
  nextButtonELement.addEventListener("click", next);

  const modalCalendar = document.getElementById("js-modal--calendar");

  const formDateElement = document.getElementById(
    "js-form-date"
  ) as HTMLInputElement;
  const formCalendarButton = document.getElementById("js-calendar-submit");
  const calendarBackButton = document.getElementById("js-calendar-back");

  const modalCloseButton = document.getElementById("js-modal-close");

  const modalForm = document.getElementById("js-modal--form");
  formDateElement.addEventListener("focus", () => {
    originalDate = selectedDate;
    modalForm.classList.add("hidden");
    modalCalendar.classList.remove("hidden");
    modalCloseButton.classList.add("hidden");
  });

  formCalendarButton.addEventListener("click", () => {
    formDateElement.valueAsDate = selectedDate;
    modalForm.classList.remove("hidden");
    modalCalendar.classList.add("hidden");
    modalCloseButton.classList.remove("hidden");
  });

  calendarBackButton.addEventListener("click", () => {
    selectedDate = originalDate;
    modalForm.classList.remove("hidden");
    modalCalendar.classList.add("hidden");
    modalCloseButton.classList.remove("hidden");
  });
};

export const prev = () => {
  selectedDate.setMonth(selectedDate.getMonth() - 1);
  createCalendar(selectedDate);
};

export const next = () => {
  selectedDate.setMonth(selectedDate.getMonth() + 1);
  createCalendar(selectedDate);
};

const createCalendar = (date = new Date()) => {
  const calendarBodyElement = document.getElementById("js-calendar-body");
  clearPrevCalendarBody(calendarBodyElement);

  const calendarHeaderElement = document.getElementById("js-calendar-header");
  setupHeader(date, calendarHeaderElement);

  const dayElement = createDayRowElement();
  calendarBodyElement.append(dayElement);

  const year = date.getFullYear();
  const month = date.getMonth();
  const startDayOfWeek = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const row = Math.ceil((startDayOfWeek + endDate) / 7);

  range(row).forEach((row_num) => {
    const RowElement = createWeekRowElement(row_num, startDayOfWeek, endDate);
    calendarBodyElement.appendChild(RowElement);
  });
};

const clearPrevCalendarBody = (calendarBodyTableElement) => {
  calendarBodyTableElement.innerHTML = "";
};

const setupHeader = (date, calendarHeaderElement) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  calendarHeaderElement.textContent = `${year}年${month + 1}月`;
};

const dayElem = document.getElementById("js-tmpl-dayElem");

const createDayRowElement = () => {
  const dayTrElement = document.createElement("tr");
  week.forEach((day) => {
    const thElement = dayElem.cloneNode(false) as HTMLElement;
    thElement.textContent = day;
    dayTrElement.appendChild(thElement);
  });
  return dayTrElement;
};

const prevDateElem = document.getElementById("js-tmpl-prevDateElem");
const nextDateElem = document.getElementById("js-tmpl-nextDateElem");
const selectedDateElem = document.getElementById("js-tmpl-selectedDateElem");

const createWeekRowElement = (row_num, startDayOfWeek, endDate) => {
  const RowElement = document.createElement("tr");

  range(7).forEach((col_num) => {
    const curDay = row_num * 7 + col_num - startDayOfWeek + 1;
    if ((row_num == 0 && col_num < startDayOfWeek) || curDay > endDate) {
      const tdElement = document.createElement("td");
      RowElement.appendChild(tdElement);
    } else {
      let tdElement;
      if (curDay == selectedDate.getDate()) {
        tdElement = selectedDateElem.cloneNode(false);
      } else if (curDay < selectedDate.getDate()) {
        tdElement = prevDateElem.cloneNode(false);
      } else {
        tdElement = nextDateElem.cloneNode(false);
      }

      tdElement.addEventListener("click", () => {
        console.log(curDay);
        selectedDate.setDate(curDay);
        createCalendar(selectedDate);
      });
      tdElement.textContent = String(curDay);
      RowElement.appendChild(tdElement);
    }
  });
  return RowElement;
};

// not using
export const setupFlatPickrCalendar = () => {
  const modalForm = document.getElementById("js-modal--form");
  const calendarElement = document.getElementById("js-calendar");

  flatpickr(calendarElement, {
    defaultDate: new Date(),
    locale: Japanese,
    dateFormat: "Y年 m月 d日 (D)", // 2021.05.24（月）の形式で表示
  });

  calendarElement.addEventListener("focusin", () => {
    modalForm.classList.add("hidden");
  });
  calendarElement.addEventListener("focusout", () => {
    console.log("onblur");
    // modalForm.classList.remove("hidden");
  });
};
