import { Student, getStringRedact } from "./student.js";
import { createStudent, uploadAllStudent, deleteStudent } from './api.js'
import { $inputs, validation } from './validation.js';

const form = document.getElementById('add-student');
const inputSearchAll = document.querySelectorAll('.input-search');
const $studentList = document.getElementById('student-list');
const $studentListTHAll = document.querySelectorAll('.student-table th');
let dir = true;
let arrayStudent = [];
let column = "fio";
let columnDir = true;


//  создание массива студентов
async function createArrayStudent() {
  await uploadAllStudent().then(data => {
    if (data.length === 0) {
      console.log('Ошибка 404: данные не обнаружены!')
    }

    arrayStudent.length = 0;

    data.forEach(student => {
      arrayStudent.push(new Student(student.name, student.lastname, student.surname, student.faculty, student.birthday, student.studyStart, student.id));
    })
    render(arrayStudent)
  })
}

// сортировка массива студентов
function getSortStudent(arr, prop, dir) {
  let arrayCopy = [...arr];
  return arrayCopy.sort(function (studentA, studentB) {
    if (
      !dir === false
        ? studentA[prop] < studentB[prop]
        : studentA[prop] > studentB[prop]
    )
      return -1;
  });
}

// получение строки студента
function newStudentTR(student) {
  const $studentTR = document.createElement("tr"),
    $fioTD = document.createElement("td"),
    $facultyTD = document.createElement("td"),
    $birthDateTD = document.createElement("td"),
    $yearsStudyTD = document.createElement("td"),
    $buttonDelete = document.createElement('button');

  $buttonDelete.textContent = 'x';
  $buttonDelete.classList.add('button-delete');
  $yearsStudyTD.classList.add('position-button')
  $fioTD.textContent = student.fio;
  $facultyTD.textContent = student.faculty;
  $birthDateTD.textContent =
    student.getBirthDateString() +
    "(" + student.getAge() + " " + student.getYearsName(student.getAge()) +
    ")";
  $yearsStudyTD.textContent = student.studyStart + " - " + student.end;

  $yearsStudyTD.append($buttonDelete);
  $studentTR.append($fioTD);
  $studentTR.append($facultyTD);
  $studentTR.append($birthDateTD);
  $studentTR.append($yearsStudyTD);

  $buttonDelete.addEventListener('click', () => {
    if (confirm('Вы уверены?')) {
      $studentTR.remove();
      deleteStudent(student.id);
    }
  })

  return $studentTR;
}

// отрисовка массива студентов
function render(arr) {
  $studentList.innerHTML = '';
  for (let item of arr) {
    $studentList.append(newStudentTR(item))
  }
}

//  события фильтрации
inputSearchAll.forEach((input) => {
  input.addEventListener('input', function () {
   render(getFilterStudent(arrayStudent))
  })
})

// фильтрация массива студентов
function getFilterStudent(arr) {
  const fio = document.querySelector(".input-search-fio").value.trim().toLowerCase();
  const faculty = document.querySelector(".input-search-faculty").value.trim().toLowerCase();
  const start = document.querySelector(".input-search-start").value.trim();
  const end = document.querySelector(".input-search-end").value.trim();

  return arr = arr.filter((student) => {
    const studentFio = student.fio.toLowerCase();
    const studentFaculty = student.faculty.toLowerCase();
    const studentStart = student.studyStart;
    const studentEnd = student.end;

    const fioMatch = !fio || studentFio.includes(fio);
    const facultyMatch = !faculty || studentFaculty.includes(faculty);
    const startMatch =
      !start || (start.length === 4 && studentStart.includes(start));
    const endMatch = !end || (end.length === 4 && studentEnd.includes(end));

    return fioMatch && facultyMatch && startMatch && endMatch;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  createArrayStudent();
})

// события сортировки
$studentListTHAll.forEach((Element) => {
  Element.addEventListener("click", function () {
    column = this.dataset.sort;
    columnDir = !columnDir;
    const studentsSort = getSortStudent(arrayStudent, column, columnDir);
    render(studentsSort);
  });
});


//  создание нового студента
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = getStringRedact(document.getElementById("input-name").value),
    lastname = getStringRedact(
      document.getElementById("input-lastname").value
    ),
    surname = getStringRedact(document.getElementById("input-surname").value),
    faculty = getStringRedact(document.getElementById("input-faculty").value),
    birthday = new Date(document.getElementById("input-date").value),
    studyStart = document.getElementById("input-start").value.trim();


  if (validation(form)) {
    let objectStudent = await createStudent({ name, surname, lastname, birthday, studyStart, faculty });

    $studentList.append(newStudentTR(new Student(
      objectStudent.name,
      objectStudent.lastname,
      objectStudent.surname,
      objectStudent.faculty,
      objectStudent.birthday,
      objectStudent.studyStart,
      objectStudent.id
    )));

    $inputs.forEach(input => {
      input.value = '';
    })
  }
});







