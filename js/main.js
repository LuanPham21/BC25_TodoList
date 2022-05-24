// import Services from "./service";
var services = new Services();
var sapxep = 0;

// const services = new Services();
const getEle = (id) => document.getElementById(id);
const getValueId = (id) => document.getElementById(id).value;

/**
 * lay danh sach mon an
 */
const getListTodo = () => {
  services
    .fetchData()
    .then(function (result) {
      renerHTML(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

getListTodo();

const renerHTML = (data) => {
  var contentTodo = "";
  var contentDone = "";
  var arr = data;
  if (sapxep == 0) {
  } else if (sapxep == 1) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i].name > arr[j].name) {
          //Hoan vi
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          var todo = arr[i];
        }
      }
    }
  } else if (sapxep == 2) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i].name < arr[j].name) {
          //Hoan vi
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          var todo = arr[i];
        }
      }
    }
  }
  for (var i = 0; i < arr.length; i++) {
    var todo = arr[i];
    let { id, name, done } = todo;
    if (done == "todo") {
      contentTodo += `
      <li>${name}                
        <div class="buttons">
          <button>
            <i class="fas fa-trash-alt remove" onclick="xoa(${id})"></i>
            <i class="fas fa-check complete" onclick="sua(${id})"></i>
          </button>
        </div>
      </li>
    `;
    }
    if (done == "done") {
      contentDone += `
      <li>${name}                
        <div class="buttons">
          <button>
            <i class="fas fa-trash-alt remove" onclick="xoa(${id})"></i>
            <span class="fas fa-check complete" onclick="sua(${id})"></span>
          </button>
        </div>
      </li>
    `;
    }
  }

  getEle("todo").innerHTML = contentTodo;
  getEle("completed").innerHTML = contentDone;
};

/**
 * Xoa sp
 */
function xoa(id) {
  services
    .deleteFromId(id)
    .then((res) => {})
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      getListTodo();
    });
}

//Them todo
getEle("addItem").addEventListener("click", function () {
  var task = getEle("newTask").value;
  var done = "todo";

  var todo = new Todo("", task, done);
  if (todo) {
    services
      .create(todo)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getListTodo();
      });
  }
});

/**
 * Sua SP
 */

function sua(id) {
  var done = "done";
  var _name = "";
  services
    .getTodoById(id)
    .then((res) => {
      let { name } = res.data;
      var todo = new Todo(id, name, done);
      services
        .editTodoById(todo)
        .then((res) => {})
        .finally(() => {
          getListTodo();
        });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      getListTodo();
    });
  // var todo = new Todo(id, _name, done);
  // if (todo) {
  //   services
  //     .editTodoById(todo)
  //     .then((res) => {})
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       getListTodo();
  //     });
  // }
}

//A->Z
getEle("two").addEventListener("click", function () {
  sapxep = 1;
  getListTodo();
});

//Z->A
getEle("three").addEventListener("click", function () {
  sapxep = 2;
  getListTodo();
});
