const inputButton = document.getElementById("inputBtn");
const addButton = document.getElementById("addBtn");
const taskCon = document.getElementById("taskCon");
inputButton.focus()
var taskArr = [];
addButton.addEventListener("click", addFun);
inputButton.addEventListener("keypress", boxFun);

function getEleValue() {
  let result = JSON.parse(localStorage.getItem("taskArr"));
  for (const key in result) {
    eleCreate(result[key].value, result[key].isCompleted, result[key].id);
    taskArr.push(result[key]);
  }
}
getEleValue();

function eleCreate(btnVal, isCompleted, temLength) {
  const userEle = document.createElement("div");
  userEle.innerText = btnVal;
  userEle.addEventListener("click", handleEle);
  userEle.addEventListener("dblclick", removeEle);
  taskCon.append(userEle);
  userEle.setAttribute("id", temLength);
  if (isCompleted) {
    userEle.setAttribute("class", "taskStyle completed");
  } else {
    userEle.setAttribute("class", "taskStyle");
  }

  // userEle.setAttribute("id", "taskId");
}

function addFun() {
  const btnVal = inputButton.value;
  const btnLen = btnVal.length;
  let count = 0;
  for (let i = 0; i < btnLen; i++) {
    if (btnVal[i] == " ") {
      count++;
    }
  }
  console.log(count);
  if (btnLen == count) {
    return alert("Please enter Valid  value!");
  }

  if (btnVal.length != 0) {
    const year = new Date().getFullYear().toString();
    const month = new Date().getMonth().toString();
    const date = new Date().getDate().toString();
    const hour = new Date().getHours().toString();
    const minute = new Date().getMinutes().toString();
    const sec = new Date().getSeconds().toString();
    const millisec = new Date().getMilliseconds().toString();

    const id = year + month + date + hour + minute + sec + millisec;

    const temLength = Math.random() + id;
    eleCreate(btnVal, false, temLength);
    let temObj = {};
    temObj.value = btnVal;
    temObj.isCompleted = false;
    temObj.id = temLength;
    taskArr.push(temObj);
    localStorage.setItem("taskArr", JSON.stringify(taskArr));
  } else return alert("Please enter value!");
  inputButton.value = ''
}

function handleEle() {
  this.classList.toggle("completed");
  const taskVal = this.innerText;
  // console.log(this.getAttribute('id'));
  console.log(this.id);
  for (let index = 0; index < taskArr.length; index++) {
    if (taskArr[index].id == this.id) {
      taskArr[index].isCompleted = !taskArr[index].isCompleted;
    }
  }
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
}

function removeEle() {
  this.remove();
  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].id == this.id) {
      taskArr.splice(i, 1);
    }
  }
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
}

function boxFun(e) {
  if (e.keyCode == 13) {
    addFun();
  }
}
