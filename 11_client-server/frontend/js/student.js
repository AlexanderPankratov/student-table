export  class Student {
  constructor(name, lastname, surname, faculty, birthday, studyStart, id) {
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.faculty = faculty
    this.birthday = birthday
    this.studyStart = studyStart
    this.id = id
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname;
  }

  get end() {
    const studyPeriod = 4;
    let endDate = parseInt(this.studyStart) + studyPeriod;
    return endDate.toString();
  }

  getYearsName(years) {
    let wordAge;
    const remainder = years % 10;
    if (years >= 11 && years <= 14) {
      wordAge = "лет";
    } else if (remainder === 1) {
      wordAge = "год";
    } else if (remainder >= 2 && remainder <= 4) {
      wordAge = "годa";
    } else {
      wordAge = "лет";
    }
    return wordAge;
  }

  getBirthDateString() {
    const yyyy = Number(this.birthday.substring(0, 4));
    let mm = Number(this.birthday.substring(5, 7));
    let dd = Number(this.birthday.substring(8, 10));
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy;
  }

  getAge() {
    const today = new Date();
    let age = today.getFullYear() - this.birthday.substring(0, 4);
    let m = today.getMonth() - this.birthday.substring(5, 7);
    if (m < 0 || (m === 0 && today.getDate() < this.birthday.substring(8, 10))) {
      age--;
    }
    return age;
  }
}


// функция редактирования строки
export function getStringRedact(str) {
  if (str === "") {
    return;
  }
  return str.trim().replace(str[0], str[0].toUpperCase());
}






