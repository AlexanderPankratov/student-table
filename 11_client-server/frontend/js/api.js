// создание нового студента
export async function createStudent(obj) {
  const response = await fetch('http://localhost:3000/api/students', {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json'
    }
  });

  const data = await response.json();

  return data;
}

// загрузка все студентов
export async function uploadAllStudent() {
  const response = await fetch('http://localhost:3000/api/students');
const data = await response.json();

return data;
}

// загрузка конкретного студента
export async function uploadStudent(id) {
  const response = await fetch(`http://localhost:3000/api/students/${id}`);
  const data = await response.json();

  console.log(data)
}

// удаление студента
export  function deleteStudent(id) {
  fetch(`http://localhost:3000/api/students/${id}`, {
    method: "DELETE"
  })
};

// редактирование студента
export async function changeStudent(id, obj) {
  const response = await fetch(`http://localhost:3000/api/students/${id}`, {
    method: "PATCH",
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json'
    }
  });

  const data = await response.json();

  console.log(data)
}
