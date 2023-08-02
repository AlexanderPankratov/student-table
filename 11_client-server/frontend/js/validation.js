// функция валидации формы
export const $inputs = document.querySelectorAll(".form input");

export function validation(form) {
  // функция удаления ошибки
  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains("error")) {
      parent.querySelector(".label-error").remove();
      parent.classList.remove("error");
    }
  }
  // функция создания ошибки
  function createError(input, text) {
    const parent = input.parentNode;
    parent.classList.add("error");

    let ErrorText = document.createElement("div");
    ErrorText.textContent = text;
    ErrorText.classList.add("label-error");
    parent.append(ErrorText);
  }

  let result = true;

  //  валидация даты рождения
  function validationDate(input) {
    const minYear = new Date("1900-01-01"),
      currentYear = new Date(),
      birthdate = new Date(input.value);

    if (minYear > birthdate || birthdate > currentYear) {
      createError(input, "Некорректная дата рождения");
      input.value = "";
      result = false;
    }
    return result;
  }

  // валидация года поступления
  function validationStartStudy(input) {
    const yearMin = 2000;
    let currentYear = new Date().getFullYear(),
      start = Number(input.value);

    if (start < yearMin || start > currentYear) {
      createError(input, "Некорректная дата поступления");
      input.value = "";
      result = false;
    }
    return result;
  }

  //   валидация заполненности полей
  function validationFullnessFields() {
    $inputs.forEach((input) => {
      removeError(input);
      if (input.value.trim() === "") {
        createError(input, "Заполните поле");
        result = false;
      }
    });
    return result;
  }

  if (validationFullnessFields()) {
    if (validationDate(document.getElementById("input-date"))) {
      validationStartStudy(document.getElementById("input-start"));
    }
  }

  return result;
}


