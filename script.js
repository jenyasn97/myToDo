window.addEventListener("DOMContentLoaded", function () {

  const textInput = document.querySelector('.main__text')
  const btnAdd = document.querySelector('.main__btn-add')
  const taskList = document.querySelector('.main__list')

  let tasks = []

  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (el) {
    const cssClass = el.done ? "main__item done" : "main__item";
    const task = `<li id="${el.id}" class="${cssClass}">
          <h2>${el.text}</h2>
          <div class="item__btns">
          <button class="item__btn-done">Готово</button>
          <button class="item__btn-delete">Удалить</button>
    </div>
  </li>`
    textInput.focus()
    taskList.insertAdjacentHTML('afterbegin', task)


  });


  textInput.addEventListener("keyup", function (event) {

    if (event.keyCode === 13) {
      addTask()
    }
  })
  //Отслеживаем событе клик по кнопке "Добавить дело" 
  btnAdd.addEventListener('click', addTask)
  //Удаляет задачу 
  taskList.addEventListener('click', removeTask)
  //Отмечает задачу готвой 
  taskList.addEventListener('click', doneTask)



  //Функция "Добавить задачу"
  function addTask() {
    const taskText = textInput.value.trim()

    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    }



    const cssClass = newTask.done ? "main__item done" : "main__item";

    const task = `<li id="${newTask.id}" class="${cssClass}">
                  <h2>${newTask.text}</h2>
                  <div class="item__btns">
                  <button class="item__btn-done">Готово</button>
                  <button class="item__btn-delete">Удалить</button>
              </div>
            </li>`
    if (taskText == '') {
      alert(`Введите название дела`)
      textInput.value = ''
      textInput.focus()
      return
    }
    else {
      taskList.insertAdjacentHTML('afterbegin', task)
      textInput.value = ''
      tasks.push(newTask)
    }

    saveToLocalStorage()
  }

  //Удалить задачу 
  function removeTask(event) {
    if (event.target.classList.contains('item__btn-delete')) {
      const parentNode = event.target.closest('li')

      const liID = +parentNode.id //Определяем ID задачи

      //Находим ID задачи в массиве
      const arrIndex = tasks.findIndex(function (index) {
        return index.id === liID
      })



      //Удаляем задачу из разметки
      if (confirm(`Действительно удалить?`) == true) {
        //Удаляем задачу из массива
        tasks.splice(arrIndex, 1)
        parentNode.remove();
        saveToLocalStorage()
      }
    }


  }

  //Отметить готовой 
  function doneTask(event) {
    if (event.target.classList.contains('item__btn-done')) {
      const parentNode = event.target.closest('li')
      parentNode.classList.toggle('done');


      const liID = +parentNode.id //Определяем ID задачи

      //Находим ID задачи в массиве
      const arrIndex = tasks.find(function (index) {
        return index.id === liID
      })
      arrIndex.done = !arrIndex.done
      console.log(arrIndex);
    }

    saveToLocalStorage()
  }


  function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
})