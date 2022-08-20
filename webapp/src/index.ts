import "./style.css";
import contentChoices from "./assets/json/content_choices.json";
import languageChoices from "./assets/json/language_choices.json";

const setupButtons = () => {
  const body = document.getElementById("js-body");
  const submitTopButtons = document.querySelectorAll(".js-top-submit");
  const overlay = document.getElementById("js-overlay");
  const modal = document.getElementById("js-modal");

  submitTopButtons.forEach((button) => {
    button.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      modal.classList.remove("hidden");
      body.classList.add("overflow-y-hidden");
    });
  });

  const modalClose = document.getElementById("js-modal-close");
  modalClose.addEventListener("click", () => {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
    body.classList.remove("overflow-y-hidden");
  });

  overlay.addEventListener("click", () => {
    modalClose.click();
  });
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
