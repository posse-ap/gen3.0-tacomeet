"use-strict";

const CLS_SP_MENU = "js-spMenu";
const CLS_CLICKED = "clicked";
const CLS_MAIN = "js-main";
const CLS_HIDDEN = "hidden";
const CLS_OVERLAY = "js-overlay";
const CLS_FOOTER = "js-footer";
const CLS_FOOTER_LOGO = "js-footerLogo";
const CLS_FOOTER_COPY = "js-footerCopy";
const CLS_FIXED = "fixed";
const CLS_IN_OVERLAY = "in-overlay";
const CLS_LINE_CTA = "js-lineCTA";

const TEXT_LINE_CTA_DEF = "公式LINEで最新情報をGET！";
const TEXT_LINE_CTA_OVERLAY = "POSSE公式LINE追加";

// setup
{
  const lineCTAElement = document.querySelector("." + CLS_LINE_CTA);

  lineCTAElement.querySelector(".text").textContent = TEXT_LINE_CTA_DEF;
}

// hamburger menu
{
  const spMenuElement = document.querySelector("." + CLS_SP_MENU);

  spMenuElement.addEventListener("click", () => {
    const mainElement = document.querySelector("." + CLS_MAIN);
    const overlayElement = document.querySelector("." + CLS_OVERLAY);
    const footerLogoElement = document.querySelector("." + CLS_FOOTER_LOGO);
    const footerCopyElement = document.querySelector("." + CLS_FOOTER_COPY);
    const footerElement = document.querySelector("." + CLS_FOOTER);
    const lineCTAElement = document.querySelector("." + CLS_LINE_CTA);
    
    if (spMenuElement.classList.contains(CLS_CLICKED)) {
      spMenuElement.classList.remove(CLS_CLICKED);
      mainElement.classList.remove(CLS_HIDDEN);
      footerLogoElement.classList.remove(CLS_HIDDEN);
      footerCopyElement.classList.remove(CLS_HIDDEN);
      footerElement.classList.remove(CLS_FIXED);
      lineCTAElement.classList.remove(CLS_IN_OVERLAY);
      lineCTAElement.querySelector(".text").textContent = TEXT_LINE_CTA_DEF;
      
      overlayElement.classList.add(CLS_HIDDEN);
      overlayElement.classList.add(CLS_HIDDEN);
    } else {
      spMenuElement.classList.add(CLS_CLICKED);
      mainElement.classList.add(CLS_HIDDEN);
      footerLogoElement.classList.add(CLS_HIDDEN);
      footerCopyElement.classList.add(CLS_HIDDEN);
      footerElement.classList.add(CLS_FIXED);
      lineCTAElement.classList.add(CLS_IN_OVERLAY);
      lineCTAElement.querySelector(".text").textContent = TEXT_LINE_CTA_OVERLAY;

      overlayElement.classList.remove(CLS_HIDDEN);
    }
  });
}
