import "./style.css";
import contentChoices from "./assets/json/content_choices.json";
import languageChoices from "./assets/json/language_choices.json";
import { setupChart, drawCharts } from "./chart";
import { setupCalendar } from "./calendar";

const setupButtons = () => {
  const body = document.getElementById("js-body");
  const overlay = document.getElementById("js-overlay");
  const modal = document.getElementById("js-modal");

  const modalForm = document.getElementById("js-modal--form");
  const modalAfterSubmit = document.getElementById("js-modal--after-submit");
  const modalLoading = document.getElementById("js-modal--loading");
  const modalCalendar = document.getElementById("js-modal--calendar");
  const modals = [modalForm, modalAfterSubmit, modalLoading, modalCalendar];

  const topSubmitButtons = document.querySelectorAll(".js-top-submit");
  const modalSubmitButton = document.getElementById("js-modal-submit");

  const modalCloseButton = document.getElementById("js-modal-close");

  const openModal = (modalElement: HTMLElement) => {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    modals.forEach((modal) => {
      modal.classList.add("hidden");
    });
    modalElement.classList.remove("hidden");
    body.classList.add("overflow-y-hidden");
  };

  topSubmitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(modalForm);
    });
  });

  modalSubmitButton.addEventListener("click", () => {
    modalLoading.classList.remove("hidden");
    modalForm.classList.add("hidden");
    (modalCloseButton as HTMLButtonElement).disabled = true;
    overlay.removeEventListener("click", closeModal);
    setTimeout(() => {
      modalAfterSubmit.classList.remove("hidden");
      modalLoading.classList.add("hidden");
      (modalCloseButton as HTMLButtonElement).disabled = false;
      overlay.addEventListener("click", closeModal);
    }, 5000);
  });

  const closeModal = () => {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
    body.classList.remove("overflow-y-hidden");
  };

  modalCloseButton.addEventListener("click", closeModal);

  overlay.addEventListener("click", closeModal);
};

interface choice {
  displayName: string;
  id: string;
}

const doCreateChoices = (choices: choice[], wrapper: Node) => {
  const template = document.getElementById("js-templ-choice");

  choices.map(({ displayName, id }) => {
    const newElem = template.cloneNode(true) as HTMLElement;
    newElem.id = "";

    const input = newElem.children[0] as HTMLInputElement;
    const label = newElem.children[1] as HTMLLabelElement;
    const labelSpan = label.children[1] as HTMLSpanElement;
    input.id = id;
    label.htmlFor = id;
    labelSpan.textContent = displayName;

    wrapper.appendChild(newElem);
  });
};

const createChoices = () => {
  const contentWrapper = document.getElementById("js-wrapper-content");
  const languageWrapper = document.getElementById("js-wrapper-language");

  doCreateChoices(contentChoices, contentWrapper);
  doCreateChoices(languageChoices, languageWrapper);
};

setupButtons();
createChoices();
setupChart();
setupCalendar();

window.onresize = function () {
  drawCharts();
};
