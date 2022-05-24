const API = "https://625bc0d150128c5702070712.mockapi.io/api/todolist";
function Services() {
  this.fetchData = function () {
    return axios({
      url: API,
      method: "GET",
    });
  };

  //delete
  this.deleteFromId = function (id) {
    return axios({
      url: `${API}/${id}`,
      method: "DELETE",
    });
  };

  //create
  this.create = function (todo) {
    return axios({
      url: API,
      method: "POST",
      data: todo,
    });
  };

  this.getTodoById = function (id) {
    return axios({
      url: `${API}/${id}`,
      method: "GET",
    });
  };

  this.editTodoById = function (todo) {
    return axios({
      url: `${API}/${todo.id}`,
      method: "PUT",
      data: todo,
    });
  };
}
