const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target; //부모클래스(id)를 찾음
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); //모든 toDos가 li의 id와 같지 않을때
  });
  //filter는 foreach처럼 각각의 item에 함수가 실행됨.
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //JSON.stringfy는 local storage에 저장되는 엘리먼트들을 string으로 저장함.
}

function paintToDo(text) {
  const li = document.createElement("li"); //js에서 li태그 생성
  const delBtn = document.createElement("img");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.src = `images/delBtn.png`;
  delBtn.width = 15;
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span); //li 안에 span하고 버튼을 넣음
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}
function handleSubmit(event) {
  event.preventDefault(); //엔터치면 새로고침되는거 방지
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; //입력하면 초기화
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    //자바스크립트가 데이터를 전달할 때 다룰 수 있는 object로 변환
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    }); //각 Array들의 text값을 li로 생성(paintToDo)
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
