// Get data from data base to do Cad file
var user_login_name = [];
var user_passwords = [];
var permissions = [];

var value_inout;
var id_array = [];

var code_array = [];
var name_array = [];
var spec_array = [];
var project_array = [];
var quantity_array = [];
var quantity_safety_array = [];
var unit_array = [];
var price_array = [];
var position_array = [];
var type_array = [];
var update_time_array = [];
var picture_array = [];
var button_array = [];
var alldata = [];
var table_for_all = [];
var table_for_inout_data = [];

var inbound_array = [];

var outbound_array = [];

var inbound_counter = 0;

var borrow_data;
var borrow_temp_value = 0;

function ok_Message() {
  document.getElementById("warning_popup_id").style.display = "flex";
  document.getElementById("warning_popup_id").style.backgroundColor = "green";
  document.getElementById("icon_apply_icon").style.display = "block";
  document.getElementById("icon_error_icon").style.display = "none";
  document.getElementById("warning_text_id").style.color = "white";
  document.getElementById("warning_text_id").innerText = "Update Succes";
  document.getElementById("warning_row_3_id").style.display = "none";

  setTimeout(function () {
    document.getElementById("warning_popup_id").style.display = "none";
  }, 5000); // Tự động ẩn alert sau 3 giây
}

// Hiển thị alert lỗi
function error_Message() {
  document.getElementById("warning_popup_id").style.display = "flex";
  document.getElementById("warning_popup_id").style.backgroundColor = "red";
  document.getElementById("icon_apply_icon").style.display = "none";
  document.getElementById("icon_error_icon").style.display = "block";
  document.getElementById("warning_text_id").style.color = "white";
  document.getElementById("warning_text_id").innerText =
    "Some value can not empty";
  document.getElementById("warning_row_3_id").style.display = "none";
  setTimeout(function () {
    document.getElementById("warning_popup_id").style.display = "none";
  }, 5000); // Tự động ẩn alert sau 3 giây
}

function login_ui() {
  var button_home_id = document.getElementById("button_home_id");
  button_home_id.style.backgroundColor = color_1;
  button_home_id.style.color = color_2;

  var loginContainer = document.getElementById("loginContainer");
  loginContainer.style.display = "flex";
  var add_id = document.getElementById("add_id");
  add_id.style.display = "none";
  var home_class_id = document.getElementById("home_class_id");
  home_class_id.style.display = "none";
  var search_result_id = document.getElementById("search_result_id");
  search_result_id.style.display = "none";
  var reload_id = document.getElementById("reload_id");
  reload_id.style.display = "none";
  var history_class_id = document.getElementById("history_class_id");
  history_class_id.style.display = "none";
  var inbound_id = document.getElementById("inbound_id");
  inbound_id.style.display = "none";
  var search_button_id = document.getElementById("search_button_id");
  search_button_id.style.display = "none";
  var sign_button_id = document.getElementById("sign_button_id");
  sign_button_id.style.display = "flex";
  var inout_search_table_id = document.getElementById("inout_search_table_id");
  inout_search_table_id.style.display = "none";
  var outbound_id = document.getElementById("outbound_id");
  outbound_id.style.display = "none";
  var safety_stock_id = document.getElementById("safety_stock_id");
  safety_stock_id.style.display = "none";
}

function user_permission() {
  document.getElementById("button_add_new_id").style.display = "none";
  document.getElementById("button_history_id").style.display = "none";
  document.getElementById("button_inbound_id").style.display = "none";
  document.getElementById("button_outbound_id").style.display = "none";
  document.getElementById("edit_button_id").style.display = "none";
  document.getElementById("button_borrow_id").style.display = "none";
}

function admin_permisstion() {
  document.getElementById("button_borrow_id").style.display = "flex";
  document.getElementById("button_add_new_id").style.display = "flex";
  document.getElementById("button_history_id").style.display = "flex";
  document.getElementById("button_inbound_id").style.display = "flex";
  document.getElementById("button_outbound_id").style.display = "flex";
  document.getElementById("edit_button_id").style.display = "flex";
}

var loggedInUser = localStorage.getItem("loggedInUser");
var isAdmin = localStorage.getItem("isAdmin");
var loginContainer = document.getElementById("loginContainer");
var logoutButton = document.getElementById("logout_button_id");
var login_name;

function login_function() {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      // Kiểm tra xem username và password có trong mảng không
      var index = user_login_name.indexOf(username);
      if (index !== -1 && user_passwords[index] === password) {
        var loggedInUser = username;
        var isAdmin = permissions[index] === "admin";
        var isAdminValue = isAdmin ? "true" : "false"; // Chuyển đổi sang chuỗi 'true' hoặc 'false'

        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem("loggedInUser", loggedInUser);
        localStorage.setItem("isAdmin", isAdminValue);

        // Cập nhật giao diện sau khi đăng nhập thành công
        document.getElementById("user_text_id").textContent = loggedInUser;
        document.getElementById("logout_button_id").style.display = "flex";
        document.getElementById("login_button_id").style.display = "none";
        document.getElementById("loginContainer").style.display = "none"; // Ẩn form đăng nhập

        // Hiển thị giao diện tương ứng với quyền hạn
        if (isAdmin) {
          admin_permisstion();
          home();
        } else {
          user_permission();
        }
      } else {
        // Xử lý khi đăng nhập không thành công
        document.getElementById("loginMessage").style.color = "red";
        document.getElementById("loginMessage").textContent =
          "User name or password wrong!";
      }
    });
}

function logout_ui() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("isAdmin");
  document.getElementById("user_text_id").textContent = "User";
  document.getElementById("logout_button_id").style.display = "none";
  document.getElementById("login_button_id").style.display = "flex";
  document.getElementById("loginMessage").textContent = "";
  user_permission();
  home();
}

var now = new Date();
// Format ngày tháng năm thành yyyy-MM-ddThh:mm để gán cho input type="datetime-local"
var year = now.getFullYear();
var month = (now.getMonth() + 1).toString().padStart(2, "0"); // Thêm 0 vào trước nếu là tháng từ 1-9
var day = now.getDate().toString().padStart(2, "0"); // Thêm 0 vào trước nếu là ngày từ 1-9
var hours = now.getHours().toString().padStart(2, "0"); // Thêm 0 vào trước nếu là giờ từ 0-9
var minutes = now.getMinutes().toString().padStart(2, "0"); // Thêm 0 vào trước nếu là phút từ 0-9

var today = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
var arr1;
var arr2;
var arr3;

// Gán giá trị cho input
// document.getElementById('current_date_time').textContent  = today;
// document.getElementById('current_date_time_2').textContent  = today;
var color_main = getComputedStyle(document.documentElement).getPropertyValue(
  "--main-color"
);
var color_1 = getComputedStyle(document.documentElement).getPropertyValue(
  "--color_1"
);
var color_2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--color_2"
);

function autocomplete(inp, arr) {
  var currentFocus;

  inp.addEventListener("input", function (e) {
    var val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    var a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].toUpperCase().includes(val.toUpperCase())) {
        var b = document.createElement("DIV");
        b.innerHTML = arr[i].replace(
          new RegExp(val, "gi"),
          "<strong>$&</strong>"
        );
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

function search_type_name() {
  var input_type_search_id = document.getElementById(
    "input_type_search_id"
  ).value;
  var inputElement = document.getElementById("myInput");
  var data_for_search;
  if (input_type_search_id == "name") {
    data_for_search = name_array;
    inputElement.placeholder = "Search Component follow Name";
  }
  if (input_type_search_id == "spec") {
    data_for_search = spec_array;
    inputElement.placeholder = "Search Component follow Spec";
  }
  if (input_type_search_id == "position") {
    data_for_search = position_array;
    inputElement.placeholder = "Search Component follow Position";
  }
  if (input_type_search_id == "project") {
    data_for_search = project_array;
    inputElement.placeholder = "Search Component follow Project";
  }
  if (input_type_search_id == "code") {
    data_for_search = "";
    inputElement.placeholder = "Enter Your Code Here";
  }
  autocomplete(document.getElementById("myInput"), data_for_search);
  autocomplete(document.getElementById("myInput_2"), data_for_search);
}

function mytable(alldata) {
  var tbody = document.querySelector("#my-table tbody");
  tbody.innerHTML = "";
  alldata.forEach(function (rowData) {
    var row = tbody.insertRow();
    rowData.forEach(function (cellData, index) {
      var cell = row.insertCell();
      cell.textContent = cellData;

      // Kiểm tra nếu là cột quantity và có class low-quantity thì thêm style màu đỏ
      if (index === 5 && rowData[5] <= rowData[6]) {
        // 5 là index của quantity, 12 là index của quantityClass trong rowData
        cell.style.color = "red";
        cell.style.fontWeight = "bold";
      }
      if (index === 5 || index === 6) {
        cell.style.textAlign = "center";
      }
    });
    // Thêm sự kiện click vào từng dòng trong table
    row.addEventListener("click", function () {
      show_information(rowData);
    });
  });
}

function inout_table(inoutdata) {
  var data = inoutdata;
  var table = document.getElementById("inout_search_result_table_id");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  for (var i = 0; i < data.length; i++) {
    var row = table.insertRow();
    for (var j = 0; j < data[i].length; j++) {
      var cell = row.insertCell();
      cell.innerHTML = data[i][j];
    }
  }
}

function show_information(rowData) {
  var see_picture_id = document.getElementById("see_picture_id");
  see_picture_id.style.display = "flex";
  var home_table_id = document.getElementById("home_table_id");
  home_table_id.style.display = "none";

  document.getElementById("number_pic").innerText = rowData[0];
  document.getElementById("component_pic").innerText = rowData[1];
  document.getElementById("code_pic").innerText = rowData[2];
  document.getElementById("spec_pic").innerText = rowData[3];
  document.getElementById("project_pic").innerText = rowData[4];
  document.getElementById("quantity_pic").innerText = rowData[5];
  document.getElementById("quantity_safety_pic").innerText = rowData[6];
  document.getElementById("unit_pic").innerText = rowData[7];
  document.getElementById("price_pic").innerText = rowData[8];
  document.getElementById("position_pic").innerText = rowData[9];
  document.getElementById("type_pic").innerText = rowData[10];
  document.getElementById("time_pic").innerText = rowData[11];

  var index = id_array.indexOf(rowData[0]);
  if (index !== -1) {
    var value_picture = picture_array[index];
    document.getElementById("name_pic").innerText = value_picture;
    var picture = '<img src="pic/' + value_picture + '" class="icon_test">';
    document.getElementById("pic_id").innerHTML = picture;
  }
}

function home() {
  var button_home_id = document.getElementById("button_home_id");
  button_home_id.style.backgroundColor = color_2;
  button_home_id.style.color = color_1;
  var button_add_new_id = document.getElementById("button_add_new_id");
  button_add_new_id.style.backgroundColor = color_1;
  button_add_new_id.style.color = color_2;
  var button_history_id = document.getElementById("button_history_id");
  button_history_id.style.backgroundColor = color_1;
  button_history_id.style.color = color_2;
  var button_safety_id = document.getElementById("button_safety_id");
  button_safety_id.style.backgroundColor = color_1;
  button_safety_id.style.color = color_2;
  var button_inbound_id = document.getElementById("button_inbound_id");
  button_inbound_id.style.backgroundColor = color_1;
  button_inbound_id.style.color = color_2;
  var button_outbound_id = document.getElementById("button_outbound_id");
  button_outbound_id.style.backgroundColor = color_1;
  button_outbound_id.style.color = color_2;
  document.getElementById("reload_id").style.display = "none";
  var button_borrow_id = document.getElementById("button_borrow_id");
  button_borrow_id.style.backgroundColor = color_1;
  button_borrow_id.style.color = color_2;
  document.getElementById("home_icon_id").style.fill = color_1;
  document.getElementById("add_icon_id").style.fill = color_2;
  document.getElementById("inbound_icon_id").style.fill = color_2;
  document.getElementById("outbound_icon_id").style.fill = color_2;
  document.getElementById("history_icon_id").style.fill = color_2;
  document.getElementById("borrow_icon_id").style.fill = color_2;
  document.getElementById("safety_icon_id").style.fill = color_2;

  document.getElementById("borrow_id").style.display = "none";
  var loginContainer = document.getElementById("loginContainer");
  loginContainer.style.display = "none";
  var add_id = document.getElementById("add_id");
  add_id.style.display = "none";
  var home_class_id = document.getElementById("home_class_id");
  home_class_id.style.display = "flex";
  var search_result_id = document.getElementById("search_result_id");
  search_result_id.style.display = "flex";
  var history_class_id = document.getElementById("history_class_id");
  history_class_id.style.display = "none";
  var inbound_id = document.getElementById("inbound_id");
  inbound_id.style.display = "none";
  var search_button_id = document.getElementById("search_button_id");
  search_button_id.style.display = "none";
  var sign_button_id = document.getElementById("sign_button_id");
  sign_button_id.style.display = "flex";
  var inout_search_table_id = document.getElementById("inout_search_table_id");
  inout_search_table_id.style.display = "none";
  var outbound_id = document.getElementById("outbound_id");
  outbound_id.style.display = "none";
  var safety_stock_id = document.getElementById("safety_stock_id");
  safety_stock_id.style.display = "none";
  alldata = table_for_all;
  mytable(alldata);
}

function getData(button) {
  var row = button.parentNode.parentNode;
  // Lấy ra các giá trị cần thiết từ các ô trong dòng này
  var id = row.cells[0].innerText;
  var componentName = row.cells[1].innerText;
  var specifications = row.cells[3].innerText;
  var code = row.cells[2].innerText;
  var position = row.cells[9].innerText;
  var quantity = row.cells[5].innerText;
  var unit = row.cells[7].innerText;

  if (value_inout === "inbound") {
    var inbound_id = document.getElementById("inbound_id");
    inbound_id.style.display = "flex";
    var outbound_id = document.getElementById("outbound_id");
    outbound_id.style.display = "none";
    var borrow_id = document.getElementById("borrow_id");
    borrow_id.style.display = "none";

    // Tạo một hàng mới trong Table 2
    var table2 = document
      .getElementById("inbound_table_id")
      .getElementsByTagName("tbody")[0];
    var newRow = table2.insertRow();

    // Thêm các giá trị vào hàng mới của Table 2
    var inbound_cell1 = newRow.insertCell(0);
    inbound_cell1.id = "inbound_id_id";
    var inbound_cell2 = newRow.insertCell(1);
    var inbound_cell3 = newRow.insertCell(2);
    var inbound_cell4 = newRow.insertCell(3);
    var inbound_cell5 = newRow.insertCell(4);
    var inbound_cell6 = newRow.insertCell(5);
    var inbound_cell7 = newRow.insertCell(6);
    var inbound_cell8 = newRow.insertCell(7);

    inbound_cell1.innerText = id;
    inbound_cell2.innerText = componentName;
    inbound_cell3.innerText = specifications;
    inbound_cell4.innerText = code;
    inbound_cell5.innerText = position;
    inbound_cell6.innerText = quantity;
    inbound_cell7.innerText = unit;

    var deleteButton = document.createElement("button_new");
    deleteButton.className = "button_remove_inoutdata";
    var deleteIcon = document.createElement("img");
    deleteIcon.className = "icon_remove_inoutdata";
    deleteIcon.src = "img/thungrac.svg"; // Đường dẫn đến hình ảnh xóa
    deleteIcon.alt = "Delete";
    deleteIcon.style.verticalAlign = "middle"; // Canh chỉnh hình ảnh theo chiều dọc
    deleteButton.appendChild(deleteIcon);
    deleteButton.onclick = function () {
      deleteRow(this);
    };
    inbound_cell8.appendChild(deleteButton);

    // Thêm ô input cho Quantity Input (cột cuối cùng)
    var inputCell = newRow.insertCell(7);
    var input = document.createElement("input");
    input.type = "number";
    input.name = "column8[]";
    input.className = "inbound_input";
    input.id = "inbound_input_id";
    input.value;
    inputCell.appendChild(input);
    input.placeholder = "input value";
  } else if (value_inout === "outbound") {
    var outbound_id = document.getElementById("outbound_id");
    outbound_id.style.display = "flex";
    var inbound_id = document.getElementById("inbound_id");
    inbound_id.style.display = "none";
    var borrow_id = document.getElementById("borrow_id");
    borrow_id.style.display = "none";
    // Tạo một hàng mới trong Table 2
    var table2 = document
      .getElementById("outbound_table_id")
      .getElementsByTagName("tbody")[0];
    var newRow = table2.insertRow();

    // Thêm các giá trị vào hàng mới của Table 2
    var cell1 = newRow.insertCell(0);
    cell1.id = "outbound_id_id";
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);
    var cell8 = newRow.insertCell(7);
    var cell9 = newRow.insertCell(8);

    cell1.innerText = id;
    cell2.innerText = componentName;
    cell3.innerText = specifications;
    cell4.innerText = code;
    cell5.innerText = position;
    cell6.innerText = quantity;
    cell7.innerText = unit;

    var deleteButton = document.createElement("button_new");
    deleteButton.className = "button_remove_inoutdata";
    var deleteIcon = document.createElement("img");
    deleteIcon.className = "icon_remove_inoutdata";
    deleteIcon.src = "img/thungrac.svg"; // Đường dẫn đến hình ảnh xóa
    deleteIcon.alt = "Delete";
    deleteIcon.style.verticalAlign = "middle"; // Canh chỉnh hình ảnh theo chiều dọc
    deleteButton.appendChild(deleteIcon);
    deleteButton.onclick = function () {
      deleteRow(this);
    };
    cell9.appendChild(deleteButton);

    // Thêm ô input cho Quantity Input (cột cuối cùng)
    var inputCell = newRow.insertCell(7);
    var input = document.createElement("input");
    input.type = "number";
    input.name = "column8[]";
    input.className = "inbound_input";
    input.id = "outbound_input_id";
    inputCell.appendChild(input);
    input.placeholder = "input value";

    var inputCell = newRow.insertCell(8);
    var input = document.createElement("input");
    input.type = "text";
    input.name = "column9[]";
    input.className = "inbound_input";
    input.id = "outbound_input_receiver_id";
    inputCell.appendChild(input);
    input.placeholder = "input reveiver name";
  } else if (value_inout === "borrow") {
    var inbound_id = document.getElementById("inbound_id");
    inbound_id.style.display = "none";
    var outbound_id = document.getElementById("outbound_id");
    outbound_id.style.display = "none";
    var borrow_id = document.getElementById("borrow_id");
    borrow_id.style.display = "flex";
    document.getElementById("borrow_2_table_id").style.display = "flex";
    document.getElementById("borrow_due_day_table_id").style.display = "none";
    borrow_temp_value = 1;

    var table2 = document
      .getElementById("borrow_table_id")
      .getElementsByTagName("tbody")[0];
    console.log(table2);
    var newRow = table2.insertRow();

    // Thêm các giá trị vào hàng mới của Table 2
    var cell1 = newRow.insertCell(0);
    cell1.id = "borrow_id_id";
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);

    var cell8 = newRow.insertCell(7);
    var cell9 = newRow.insertCell(8);
    var cell10 = newRow.insertCell(9);

    cell1.innerText = id;
    cell2.innerText = componentName;
    cell3.innerText = specifications;
    cell4.innerText = code;
    cell5.innerText = quantity;
    cell6.innerText = unit;

    var deleteButton = document.createElement("button_new");
    deleteButton.className = "button_remove_inoutdata";
    var deleteIcon = document.createElement("img");
    deleteIcon.className = "icon_remove_inoutdata";
    deleteIcon.src = "img/thungrac.svg"; // Đường dẫn đến hình ảnh xóa
    deleteIcon.alt = "Delete";
    deleteIcon.style.verticalAlign = "middle"; // Canh chỉnh hình ảnh theo chiều dọc
    deleteButton.appendChild(deleteIcon);
    deleteButton.onclick = function () {
      deleteRow(this);
    };
    cell10.appendChild(deleteButton);

    // var inputCell = newRow.insertCell(6);
    var input = document.createElement("input");
    input.type = "number";
    input.name = "column8[]";
    input.className = "inbound_input";
    input.id = "borrow_quantity_input_id";
    cell7.appendChild(input);
    input.placeholder = "input value";

    var input_2 = document.createElement("input");
    input_2.type = "text";
    input_2.name = "column9[]";
    input_2.className = "inbound_input";
    input_2.id = "borrrow_reciever_input_id";
    cell8.appendChild(input_2);
    input_2.placeholder = "Reciever name";

    var input_3 = document.createElement("input");
    input_3.type = "date";
    input_3.name = "column10[]";
    input_3.className = "inbound_input";
    input_3.id = "borrrow_due_input_id";
    cell9.appendChild(input_3);
  }
}

function deleteRow(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function add() {
  var button_home_id = document.getElementById("button_home_id");
  button_home_id.style.backgroundColor = color_1;
  button_home_id.style.color = color_2;
  var button_add_new_id = document.getElementById("button_add_new_id");
  button_add_new_id.style.backgroundColor = color_2;
  button_add_new_id.style.color = color_1;
  var button_history_id = document.getElementById("button_history_id");
  button_history_id.style.backgroundColor = color_1;
  button_history_id.style.color = color_2;
  var button_safety_id = document.getElementById("button_safety_id");
  button_safety_id.style.backgroundColor = color_1;
  button_safety_id.style.color = color_2;
  var button_inbound_id = document.getElementById("button_inbound_id");
  button_inbound_id.style.backgroundColor = color_1;
  button_inbound_id.style.color = color_2;
  var button_outbound_id = document.getElementById("button_outbound_id");
  button_outbound_id.style.backgroundColor = color_1;
  button_outbound_id.style.color = color_2;
  var button_borrow_id = document.getElementById("button_borrow_id");
  button_borrow_id.style.backgroundColor = color_1;
  button_borrow_id.style.color = color_2;
  document.getElementById("home_icon_id").style.fill = color_2;
  document.getElementById("add_icon_id").style.fill = color_1;
  document.getElementById("inbound_icon_id").style.fill = color_2;
  document.getElementById("outbound_icon_id").style.fill = color_2;
  document.getElementById("history_icon_id").style.fill = color_2;
  document.getElementById("borrow_icon_id").style.fill = color_2;
  document.getElementById("safety_icon_id").style.fill = color_2;

  document.getElementById("borrow_id").style.display = "none";
  var add_id = document.getElementById("add_id");
  add_id.style.display = "flex";
  var home_class_id = document.getElementById("home_class_id");
  home_class_id.style.display = "none";
  var history_class_id = document.getElementById("history_class_id");
  history_class_id.style.display = "none";
  var inbound_id = document.getElementById("inbound_id");
  inbound_id.style.display = "none";
  var search_button_id = document.getElementById("search_button_id");
  search_button_id.style.display = "none";
  var sign_button_id = document.getElementById("sign_button_id");
  sign_button_id.style.display = "flex";
  var inout_search_table_id = document.getElementById("inout_search_table_id");
  inout_search_table_id.style.display = "none";
  var outbound_id = document.getElementById("outbound_id");
  outbound_id.style.display = "none";
  var safety_stock_id = document.getElementById("safety_stock_id");
  safety_stock_id.style.display = "none";
}

function inbound() {
  value_inout = "inbound";
  var button_home_id = document.getElementById("button_home_id");
  button_home_id.style.backgroundColor = color_1;
  button_home_id.style.color = color_2;
  var button_add_new_id = document.getElementById("button_add_new_id");
  button_add_new_id.style.backgroundColor = color_1;
  button_add_new_id.style.color = color_2;
  var button_history_id = document.getElementById("button_history_id");
  button_history_id.style.backgroundColor = color_1;
  button_history_id.style.color = color_2;
  var button_safety_id = document.getElementById("button_safety_id");
  button_safety_id.style.backgroundColor = color_1;
  button_safety_id.style.color = color_2;
  var button_inbound_id = document.getElementById("button_inbound_id");
  button_inbound_id.style.backgroundColor = color_2;
  button_inbound_id.style.color = color_1;
  var button_outbound_id = document.getElementById("button_outbound_id");
  button_outbound_id.style.backgroundColor = color_1;
  button_outbound_id.style.color = color_2;
  var button_borrow_id = document.getElementById("button_borrow_id");
  button_borrow_id.style.backgroundColor = color_1;
  button_borrow_id.style.color = color_2;
  document.getElementById("home_icon_id").style.fill = color_2;
  document.getElementById("add_icon_id").style.fill = color_2;
  document.getElementById("inbound_icon_id").style.fill = color_1;
  document.getElementById("outbound_icon_id").style.fill = color_2;
  document.getElementById("history_icon_id").style.fill = color_2;
  document.getElementById("borrow_icon_id").style.fill = color_2;
  document.getElementById("safety_icon_id").style.fill = color_2;

  document.getElementById("borrow_id").style.display = "none";
  var home_class_id = document.getElementById("home_class_id");
  home_class_id.style.display = "none";
  var add_id = document.getElementById("add_id");
  add_id.style.display = "none";
  var history_class_id = document.getElementById("history_class_id");
  history_class_id.style.display = "none";
  var safety_stock_id = document.getElementById("safety_stock_id");
  safety_stock_id.style.display = "none";
  var inbound_id = document.getElementById("inbound_id");
  inbound_id.style.display = "flex";
  var search_button_id = document.getElementById("search_button_id");
  search_button_id.style.display = "flex";
  var sign_button_id = document.getElementById("sign_button_id");
  sign_button_id.style.display = "none";
  var inout_search_table_id = document.getElementById("inout_search_table_id");
  inout_search_table_id.style.display = "flex";
  var outbound_id = document.getElementById("outbound_id");
  outbound_id.style.display = "none";
}

function outbound() {
  value_inout = "outbound";
  var button_home_id = document.getElementById("button_home_id");
  button_home_id.style.backgroundColor = color_1;
  button_home_id.style.color = color_2;
  var button_add_new_id = document.getElementById("button_add_new_id");
  button_add_new_id.style.backgroundColor = color_1;
  button_add_new_id.style.color = color_2;
  var button_history_id = document.getElementById("button_history_id");
  button_history_id.style.backgroundColor = color_1;
  button_history_id.style.color = color_2;
  var button_safety_id = document.getElementById("button_safety_id");
  button_safety_id.style.backgroundColor = color_1;
  button_safety_id.style.color = color_2;
  var button_inbound_id = document.getElementById("button_inbound_id");
  button_inbound_id.style.backgroundColor = color_1;
  button_inbound_id.style.color = color_2;
  var button_outbound_id = document.getElementById("button_outbound_id");
  button_outbound_id.style.backgroundColor = color_2;
  button_outbound_id.style.color = color_1;
  var button_borrow_id = document.getElementById("button_borrow_id");
  button_borrow_id.style.backgroundColor = color_1;
  button_borrow_id.style.color = color_2;
  document.getElementById("home_icon_id").style.fill = color_2;
  document.getElementById("add_icon_id").style.fill = color_2;
  document.getElementById("inbound_icon_id").style.fill = color_2;
  document.getElementById("outbound_icon_id").style.fill = color_1;
  document.getElementById("history_icon_id").style.fill = color_2;
  document.getElementById("borrow_icon_id").style.fill = color_2;
  document.getElementById("safety_icon_id").style.fill = color_2;

  document.getElementById("borrow_id").style.display = "none";
  var home_class_id = document.getElementById("home_class_id");
  home_class_id.style.display = "none";
  var add_id = document.getElementById("add_id");
  add_id.style.display = "none";
  var history_class_id = document.getElementById("history_class_id");
  history_class_id.style.display = "none";
  var safety_stock_id = document.getElementById("safety_stock_id");
  safety_stock_id.style.display = "none";
  var inbound_id = document.getElementById("inbound_id");
  inbound_id.style.display = "NONE";
  var search_button_id = document.getElementById("search_button_id");
  search_button_id.style.display = "flex";
  var sign_button_id = document.getElementById("sign_button_id");
  sign_button_id.style.display = "none";
  var inout_search_table_id = document.getElementById("inout_search_table_id");
  inout_search_table_id.style.display = "flex";
  var outbound_id = document.getElementById("outbound_id");
  outbound_id.style.display = "flex";
}

function borrow_ui() {
  value_inout = "borrow";
  var button_borrow_id = document.getElementById("button_borrow_id");
  button_borrow_id.style.backgroundColor = color_2;
  button_borrow_id.style.color = color_1;
  var button_history_id = document.getElementById("button_history_id");
  button_history_id.style.backgroundColor = color_1;
  button_history_id.style.color = color_2;
  var button_home_id = document.getElementById("button_home_id");
  button_home_id.style.backgroundColor = color_1;
  button_home_id.style.color = color_2;
  var button_add_new_id = document.getElementById("button_add_new_id");
  button_add_new_id.style.backgroundColor = color_1;
  button_add_new_id.style.color = color_2;
  var button_safety_id = document.getElementById("button_safety_id");
  button_safety_id.style.backgroundColor = color_1;
  button_safety_id.style.color = color_2;
  var button_inbound_id = document.getElementById("button_inbound_id");
  button_inbound_id.style.backgroundColor = color_1;
  button_inbound_id.style.color = color_2;
  var button_outbound_id = document.getElementById("button_outbound_id");
  button_outbound_id.style.backgroundColor = color_1;
  button_outbound_id.style.color = color_2;

  document.getElementById("home_icon_id").style.fill = color_2;
  document.getElementById("add_icon_id").style.fill = color_2;
  document.getElementById("inbound_icon_id").style.fill = color_2;
  document.getElementById("outbound_icon_id").style.fill = color_2;
  document.getElementById("history_icon_id").style.fill = color_2;
  document.getElementById("borrow_icon_id").style.fill = color_1;
  document.getElementById("safety_icon_id").style.fill = color_2;

  document.getElementById("borrow_id").style.display = "flex";
  document.getElementById("inout_search_table_id").style.display = "none";
  document.getElementById("home_class_id").style.display = "none";
  document.getElementById("add_id").style.display = "none";
  document.getElementById("input_table_id").style.display = "none";
  document.getElementById("output_table_id").style.display = "none";
  document.getElementById("history_class_id").style.display = "none";
  document.getElementById("search_button_id").style.display = "flex";
  document.getElementById("sign_button_id").style.display = "none";
  document.getElementById("outbound_id").style.display = "none";
  document.getElementById("inbound_id").style.display = "none";
  document.getElementById("inout_search_table_id").style.display = "none";
  document.getElementById("safety_stock_id").style.display = "none";
  document.getElementById("see_picture_id").style.display = "none";
  document.getElementById("search_result_id").style.display = "none";
  document.getElementById("add_id").style.display = "none";
  document.getElementById("empty_id").style.display = "none";
  document.getElementById("result_add_id").style.display = "none";
  document.getElementById("edit_id").style.display = "none";
  document.getElementById("safety_stock_id").style.display = "none";

  var inout_search_table_id = document.getElementById("inout_search_table_id");
  inout_search_table_id.style.display = "flex";
}

function history() {
  var button_home_id = document.getElementById("button_home_id");
  button_home_id.style.backgroundColor = color_1;
  button_home_id.style.color = color_2;
  var button_add_new_id = document.getElementById("button_add_new_id");
  button_add_new_id.style.backgroundColor = color_1;
  button_add_new_id.style.color = color_2;
  var button_history_id = document.getElementById("button_history_id");
  button_history_id.style.backgroundColor = color_2;
  button_history_id.style.color = color_1;
  var button_safety_id = document.getElementById("button_safety_id");
  button_safety_id.style.backgroundColor = color_1;
  button_safety_id.style.color = color_2;
  var button_inbound_id = document.getElementById("button_inbound_id");
  button_inbound_id.style.backgroundColor = color_1;
  button_inbound_id.style.color = color_2;
  var button_outbound_id = document.getElementById("button_outbound_id");
  button_outbound_id.style.backgroundColor = color_1;
  button_outbound_id.style.color = color_2;
  var button_borrow_id = document.getElementById("button_borrow_id");
  button_borrow_id.style.backgroundColor = color_1;
  button_borrow_id.style.color = color_2;
  document.getElementById("home_icon_id").style.fill = color_2;
  document.getElementById("add_icon_id").style.fill = color_2;
  document.getElementById("inbound_icon_id").style.fill = color_2;
  document.getElementById("outbound_icon_id").style.fill = color_2;
  document.getElementById("history_icon_id").style.fill = color_1;
  document.getElementById("borrow_icon_id").style.fill = color_2;
  document.getElementById("safety_icon_id").style.fill = color_2;

  document.getElementById("inout_search_table_id").style.display = "none";
  document.getElementById("home_class_id").style.display = "none";
  document.getElementById("add_id").style.display = "none";
  document.getElementById("input_table_id").style.display = "none";
  document.getElementById("output_table_id").style.display = "none";
  document.getElementById("history_class_id").style.display = "flex";
  document.getElementById("search_button_id").style.display = "none";
  document.getElementById("sign_button_id").style.display = "flex";
  document.getElementById("outbound_id").style.display = "none";
  document.getElementById("inbound_id").style.display = "none";
  document.getElementById("inout_search_table_id").style.display = "none";
  document.getElementById("safety_stock_id").style.display = "none";
  document.getElementById("see_picture_id").style.display = "none";
  document.getElementById("search_result_id").style.display = "none";
  document.getElementById("add_id").style.display = "none";
  document.getElementById("empty_id").style.display = "none";
  document.getElementById("result_add_id").style.display = "none";
  document.getElementById("edit_id").style.display = "none";
  document.getElementById("inoutdata_id").style.display = "flex";
  document.getElementById("safety_stock_id").style.display = "none";
  document.getElementById("borrow_id").style.display = "none";
}

function borrow_table(borrow_data) {
  var borrow_data_arr = borrow_data.map(function (row) {
    return row.slice(); // Sao chép từng hàng
  });

  var borrow_arr = [];
  var history_arr = [];
  for (var i = 0; i < borrow_data_arr.length; i++) {
    var row_data = borrow_data_arr[i];

    var returnButtonHtml =
      '<button class="button_return" onclick="returnItem(this)">Return</button>';
    if (row_data[11] === "borrowed") {
      // Lấy ngày đến hạn và ngày mượn từ dữ liệu
      var dueDateStr = row_data[10]; // Ngày đến hạn
      var borrowDateStr = row_data[9]; // Ngày mượn

      // Tạo đối tượng Date từ chuỗi ngày
      var dueDate = new Date(dueDateStr);
      var borrowDate = new Date(borrowDateStr);

      // Chỉ so sánh ngày, không tính giờ
      dueDate.setHours(0, 0, 0, 0);
      borrowDate.setHours(0, 0, 0, 0);

      // Tính số ngày giữa ngày đến hạn và ngày hiện tại
      var currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      // Tính số ngày giữa ngày đến hạn và ngày hiện tại
      var timeDifference = dueDate - currentDate; // Sự khác biệt tính bằng mili giây
      var daysDiff = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Chuyển mili giây thành ngày

      if (isNaN(daysDiff)) {
        row_data[11] = "Invalid Date";
      } else if (daysDiff > 0) {
        row_data[11] = "Expire on " + daysDiff + " days";
      } else if (daysDiff === 0) {
        row_data[11] = "Expire today";
      } else {
        row_data[11] = "Expired " + Math.abs(daysDiff) + " day";
      }

      // Thêm nút Return vào cột 12
      row_data[12] = returnButtonHtml;
      borrow_arr.push(row_data);
    }
    if (row_data[11] === "returned") {
      history_arr.push(row_data);
    }
  }

  // Sắp xếp mảng borrow_arr theo tiêu chí
  borrow_arr.sort(function (a, b) {
    var statusA = a[11];
    var statusB = b[11];

    // Xác định thứ tự ưu tiên
    if (statusA.includes("Expired") && !statusB.includes("Expired")) return -1;
    if (!statusA.includes("Expired") && statusB.includes("Expired")) return 1;

    if (statusA.includes("Expire today") && !statusB.includes("Expire today"))
      return -1;
    if (!statusA.includes("Expire today") && statusB.includes("Expire today"))
      return 1;

    return 0; // Không sắp xếp thêm nếu trạng thái tương tự
  });

  var table = document.getElementById("due_day_table_id");
  var tbody = table.getElementsByTagName("tbody")[0];

  // Xóa tất cả các hàng hiện tại
  tbody.innerHTML = "";

  for (var g = 0; g < borrow_arr.length; g++) {
    var row = tbody.insertRow();
    var row_table = borrow_arr[g];
    for (var h = 0; h < row_table.length; h++) {
      var cell = row.insertCell();
      cell.innerHTML = row_table[h];

      if (h === 11) {
        if (row_table[11].includes("Expire today")) {
          cell.style.color = "orange";
        }
        if (row_table[11].includes("Expire on")) {
          cell.style.color = "green";
        }

        if (row_table[11].includes("Expired")) {
          row.style.color = "red";
        }
      }
    }
  }
}

function inbound_history() {
  var inbound_arr = inbound_array.map(function (row) {
    return row.slice(); // Sao chép từng hàng
  });

  var data;
  var type_data = document.getElementById("time_type_id").value;
  var month = document.getElementById("month-id").value;
  var year = document.getElementById("year-id").value;
  var arr = [];

  if (type_data === "all") {
    data = "-";
  } else if (type_data === "month") {
    data = month;
  } else if (type_data === "year") {
    data = year;
  }

  for (var i = 0; i < inbound_arr.length; i++) {
    var row_data = inbound_arr[i];
    for (var j = 0; j < row_data.length; j++) {
      var cell_data = row_data[j];
      if (j === 11) {
        if (data === "-") {
          arr.push(row_data);
        } else if (row_data[11].startsWith(data)) {
          arr.push(row_data);
        }
      }
    }
  }

  document.getElementById("input_table_id").style.display = "flex";
  document.getElementById("dowmload_id").style.display = "flex";
  var table = document.getElementById("table_input_id");
  var data_2 = arr;
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  for (var i = 0; i < data_2.length; i++) {
    var row = table.insertRow();
    for (var j = 0; j < data_2[i].length; j++) {
      var cell = row.insertCell();
      cell.innerHTML = data_2[i][j];
    }
  }
}

function outbound_history() {
  var outbound_arr = outbound_array.map(function (row) {
    return row.slice(); // Sao chép từng hàng
  });

  var data;
  var type_data = document.getElementById("time_type_id").value;
  var month = document.getElementById("month-id").value;
  var year = document.getElementById("year-id").value;
  var arr = [];
  console.log(outbound_arr);
  if (type_data === "all") {
    data = "-";
  } else if (type_data === "month") {
    data = month;
  } else if (type_data === "year") {
    data = year;
  }

  for (var i = 0; i < outbound_arr.length; i++) {
    var row_data = outbound_arr[i];
    for (var j = 0; j < row_data.length; j++) {
      var cell_data = row_data[j];
      if (j === 12) {
        if (data === "-") {
          arr.push(row_data);
        } else if (row_data[12].startsWith(data)) {
          arr.push(row_data);
        }
      }
    }
  }

  document.getElementById("output_table_id").style.display = "flex";
  document.getElementById("dowmload_id").style.display = "flex";
  var table = document.getElementById("table_output_id");

  var data_2 = arr;

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  for (var i = 0; i < data_2.length; i++) {
    var row = table.insertRow();
    for (var j = 0; j < data_2[i].length; j++) {
      var cell = row.insertCell();
      cell.innerHTML = data_2[i][j];
    }
  }
}

function borrow_history() {
  var borrow_arr = borrow_data.map(function (row) {
    return row.slice(); // Sao chép từng hàng
  });
  console.log(borrow_arr);
  var data;
  var type_data = document.getElementById("time_type_id").value;
  var month = document.getElementById("month-id").value;
  var year = document.getElementById("year-id").value;
  var arr = [];

  if (type_data === "all") {
    data = "-";
  } else if (type_data === "month") {
    data = month;
  } else if (type_data === "year") {
    data = year;
  }

  for (var i = 0; i < borrow_arr.length; i++) {
    var row_data = borrow_arr[i];
    for (var j = 0; j < row_data.length; j++) {
      var cell_data = row_data[j];
      if (j === 11) {
        if (cell_data === "returned" && data === "-") {
          arr.push(row_data);
        } else if (cell_data === "returned" && row_data[12].startsWith(data)) {
          arr.push(row_data);
        }
      }
    }
  }
  console.log(arr);
  console.log("type: " + data);
  borrow_history_table_id;
  var history_table = document.getElementById("borrow_history_table_id");
  document.getElementById("borrow_history_id").style.display = "flex";
  document.getElementById("dowmload_id").style.display = "flex";
  var his_tbody = history_table.getElementsByTagName("tbody")[0];
  his_tbody.innerHTML = "";

  for (var t = 0; t < arr.length; t++) {
    var row_2 = his_tbody.insertRow();
    var his_table = arr[t];
    for (var r = 0; r < his_table.length; r++) {
      var cell_2 = row_2.insertCell();
      cell_2.innerHTML = his_table[r];
    }
  }
}

// Hàm xử lý khi nhấn nút Return
function returnItem(button) {
  var verifier = document.getElementById("user_text_id").innerText;
  var row = button.parentNode.parentNode; // Lấy hàng chứa nút
  var cells = row.getElementsByTagName("td");
  var itemId = cells[0].innerText; // Giả sử cột đầu tiên là ID món đồ
  var qts = cells[6].innerText;
  var date_borrow = cells[9].innerText;

  var msg = {
    topic: "borrow_update",
    payload: {
      itemId,
      qts,
      date_borrow,
      verifier,
    },
  };
  uibuilder.send(msg);
  row.parentNode.removeChild(row);
}

function safety_stock() {
  var button_home_id = document.getElementById("button_home_id");
  button_home_id.style.backgroundColor = color_1;
  button_home_id.style.color = color_2;

  var button_add_new_id = document.getElementById("button_add_new_id");
  button_add_new_id.style.backgroundColor = color_1;
  button_add_new_id.style.color = color_2;

  var button_history_id = document.getElementById("button_history_id");
  button_history_id.style.backgroundColor = color_1;
  button_history_id.style.color = color_2;

  var button_safety_id = document.getElementById("button_safety_id");
  button_safety_id.style.backgroundColor = color_2;
  button_safety_id.style.color = color_1;

  var button_inbound_id = document.getElementById("button_inbound_id");
  button_inbound_id.style.backgroundColor = color_1;
  button_inbound_id.style.color = color_2;

  var button_outbound_id = document.getElementById("button_outbound_id");
  button_outbound_id.style.backgroundColor = color_1;
  button_outbound_id.style.color = color_2;

  var button_borrow_id = document.getElementById("button_borrow_id");
  button_borrow_id.style.backgroundColor = color_1;
  button_borrow_id.style.color = color_2;

  document.getElementById("home_icon_id").style.fill = color_2;
  document.getElementById("add_icon_id").style.fill = color_2;
  document.getElementById("inbound_icon_id").style.fill = color_2;
  document.getElementById("outbound_icon_id").style.fill = color_2;
  document.getElementById("history_icon_id").style.fill = color_2;
  document.getElementById("borrow_icon_id").style.fill = color_2;
  document.getElementById("safety_icon_id").style.fill = color_1;

  document.getElementById("borrow_id").style.display = "none";
  var inout_search_table_id = document.getElementById("inout_search_table_id");
  inout_search_table_id.style.display = "none";

  var outbound_id = document.getElementById("outbound_id");
  outbound_id.style.display = "none";

  var inout_search_table_id = document.getElementById("inout_search_table_id");
  inout_search_table_id.style.display = "none";

  var home_class_id = document.getElementById("home_class_id");
  home_class_id.style.display = "none";

  var add_id = document.getElementById("add_id");
  add_id.style.display = "none";

  var history_class_id = document.getElementById("history_class_id");
  history_class_id.style.display = "none";

  var safety_stock_id = document.getElementById("safety_stock_id");
  safety_stock_id.style.display = "none";

  var inbound_id = document.getElementById("inbound_id");
  inbound_id.style.display = "none";

  var sign_button_id = document.getElementById("sign_button_id");
  sign_button_id.style.display = "flex";

  var outbound_id = document.getElementById("outbound_id");
  outbound_id.style.display = "none";

  var safety_stock_id = document.getElementById("safety_stock_id");
  safety_stock_id.style.display = "none";

  document.getElementById("safety_stock_id").style.display = "block";

  for (var h = 0; h < id_array.length; h++) {
    var total_number = h + 1;
  }
  document.getElementById("total_component_value_id").innerText = total_number;

  var tbody = document.querySelector("#table_safety_stock_id tbody");
  tbody.innerHTML = "";

  var count = 0;
  alldata = table_for_all;
  alldata.forEach(function (rowData) {
    // Kiểm tra điều kiện trước khi thêm vào bảng
    if (rowData[5] <= rowData[6]) {
      // Kiểm tra điều kiện của quantity và quantityClass
      var row = tbody.insertRow();
      rowData.forEach(function (cellData, index) {
        var cell = row.insertCell();
        cell.textContent = cellData;
        if (index === 5 || index === 6) {
          cell.style.textAlign = "center";
        }
      });
      count++;
    }
  });
  document.getElementById("total_stock_value_id").innerText = count;

  var inbound_arr = inbound_array.map(function (row) {
    return row.slice(); // Sao chép từng hàng
  });
  for (var z = 0; z < inbound_arr.length; z++) {
    var z_data = z + 1;
  }
  document.getElementById("total_inbound_value_id").innerText = z_data;

  var outbound_arr = outbound_array.map(function (row) {
    return row.slice(); // Sao chép từng hàng
  });
  for (var y = 0; y < outbound_arr.length; y++) {
    var y_data = y + 1;
  }
  document.getElementById("total_outbound_value_id").innerText = y_data;
}

function inbound_success() {
  var array_data = [];
  var remove = [];
  var table = document.getElementById("inbound_table_id"); // Lấy thẻ bảng
  var importer = document.getElementById("user_text_id").innerText;
  for (var i = 2; i < table.rows.length; i++) {
    var row = table.rows[i];
    var rowData = [];
    var isEmpty = false;
    for (var j = 0; j < row.cells.length; j++) {
      var cellValue = row.cells[j].innerText.trim(); // Lấy nội dung của ô và loại bỏ khoảng trắng thừa

      // Kiểm tra nếu ô chứa input, lấy giá trị của input
      if (j === 7) {
        var quantity_input = row.cells[j].querySelector("input").value;
        if (quantity_input === "") {
          isEmpty = true;
          error_Message();
          break;
        }
        rowData.push(quantity_input);
      } else {
        rowData.push(cellValue); // Thêm nội dung của ô vào mảng rowData
      }
    }
    if (isEmpty === true) {
      break;
    }
    remove.push(i);
    array_data.push(rowData);
  }
  if (isEmpty === false) {
    for (var g = 0; g < array_data.length; g++) {
      var a = array_data[g];
      console.log(a);
      var msg = {
        topic: "inbound",
        payload: {
          data: a,
          importer: importer,
        },
      };
      uibuilder.send(msg);
    }
    remove.sort(function (a, b) {
      return b - a; // Sắp xếp giảm dần
    });
    for (var f = 0; f < remove.length; f++) {
      var rowindex = remove[f];
      table.deleteRow(rowindex);
    }
    ok_Message();
  }
}

function outbound_succes() {
  var array_data = [];
  var remove = [];
  var table = document.getElementById("outbound_table_id"); // Lấy thẻ bảng
  var importer = document.getElementById("user_text_id").innerText;
  console.log(table.rows.length);
  for (var i = 2; i < table.rows.length; i++) {
    var rowData = []; // Khởi tạo rowData cho mỗi hàng
    var isEmpty = false;
    var row = table.rows[i];
    for (var j = 0; j < row.cells.length; j++) {
      var cell = row.cells[j].innerText.trim();
      if (j === 7) {
        var quantity_output = row.cells[j].querySelector("input").value;
        if (quantity_output === "") {
          isEmpty = true;
          error_Message();
          break;
        }
        rowData.push(quantity_output);
      } else if (j === 8) {
        var reciever = row.cells[j].querySelector("input").value;
        if (reciever === "") {
          isEmpty = true;
          error_Message();
          break;
        }
        rowData.push(reciever);
      } else {
        rowData.push(cell);
      }
    }
    if (isEmpty === true) {
      break;
    }
    remove.push(i);
    array_data.push(rowData);
  }

  if (isEmpty === false) {
    for (var g = 0; g < array_data.length; g++) {
      var a = array_data[g];
      console.log(a);
      var msg = {
        topic: "outbound",
        payload: {
          data: a,
          importer: importer,
        },
      };
      uibuilder.send(msg);
    }
    remove.sort(function (a, b) {
      return b - a; // Sắp xếp giảm dần
    });
    for (var f = 0; f < remove.length; f++) {
      var rowindex = remove[f];
      table.deleteRow(rowindex);
    }
    ok_Message();
  }
}

function borrow_succes() {
  var array_data = [];
  var remove = [];

  var table = document.getElementById("borrow_table_id"); // Lấy thẻ bảng
  var importer = document.getElementById("user_text_id").innerText;
  console.log(table.rows.length);

  for (var i = 1; i < table.rows.length; i++) {
    var rowData = []; // Khởi tạo rowData cho mỗi hàng
    var isEmpty = false;
    var row = table.rows[i];
    for (var j = 0; j < row.cells.length; j++) {
      var cell = row.cells[j].innerText.trim();
      if (j === 6) {
        var quantity_output = row.cells[j].querySelector("input").value;
        if (quantity_output === "") {
          isEmpty = true;
          error_Message();
          break;
        }
        rowData.push(quantity_output);
      } else if (j === 7) {
        var reciever = row.cells[j].querySelector("input").value;
        if (reciever === "") {
          isEmpty = true;
          error_Message();
          break;
        }
        rowData.push(reciever);
      } else if (j === 8) {
        var date_return = row.cells[j].querySelector("input").value;
        if (date_return === "") {
          console.log("j8 emtpty");
          isEmpty = true;
          error_Message();
          break;
        }
        rowData.push(date_return);
      } else {
        rowData.push(cell);
      }
    }

    console.log(rowData);

    if (isEmpty === true) {
      break;
    }
    remove.push(i);
    array_data.push(rowData);
  }
  if (isEmpty === false) {
    for (var g = 0; g < array_data.length; g++) {
      var a = array_data[g];
      console.log(a);
      var msg = {
        topic: "borrow",
        payload: {
          data: a,
          importer: importer,
        },
      };
      uibuilder.send(msg);
    }
    remove.sort(function (a, b) {
      return b - a; // Sắp xếp giảm dần
    });
    for (var f = 0; f < remove.length; f++) {
      var rowindex = remove[f];
      table.deleteRow(rowindex);
    }
    ok_Message();
  }
}

function add_data() {
  document.getElementById("reload_id").style.display = "flex";
  var component_id = document.getElementById("component_id").value;
  var code_id = document.getElementById("code_id").value;
  var spec_id = document.getElementById("spec_id").value;
  var project_id = document.getElementById("project_id").value;
  var quatity_id = document.getElementById("quatity_id").value;
  var unit_id = document.getElementById("unit_id").value;
  var filePath = document.getElementById("picture_id").value;
  var price_id = document.getElementById("price_id").value;
  var position_id = document.getElementById("position_id").value;
  var type_id = document.getElementById("type_id").value;
  var fileName = filePath.split("\\").pop();
  var quantity_safety = document.getElementById("quantity_safety_id").value;

  var msg = {
    topic: "data",
    payload: {
      component: component_id,
      code: code_id,
      spec: spec_id,
      project: project_id,
      quatity: quatity_id,
      quantity_safety: quantity_safety,
      unit: unit_id,
      price: price_id,
      position: position_id,
      type: type_id,
      pic: fileName,
    },
  };
  uibuilder.send(msg);
  uploadFile();
}

function uploadFile() {
  const fileInput = document.getElementById("picture_id");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result.split(",")[1]; // Lấy dữ liệu base64 từ chuỗi Data URL
      const payload = {
        imgname: file.name,
        data: data, // Dữ liệu base64, không phải đối tượng
      };
      uibuilder.send({
        topic: "upload",
        payload: payload,
      });
    };
    reader.readAsDataURL(file); // Đọc file dưới dạng base64
  }
}

function delete_val() {
  document.getElementById("component_id").value = "";
  document.getElementById("code_id").value = "";
  document.getElementById("spec_id").value = "";
  document.getElementById("project_id").value = "";
  document.getElementById("quatity_id").value = "";
  document.getElementById("unit_id").value = "";
  document.getElementById("price_id").value = "";
  document.getElementById("position_id").value = "";
  document.getElementById("type_id").value = "";
  document.getElementById("picture_id").value = "";
  document.getElementById("quantity_safety_id").value = "";

  document.getElementById("component_edit_id").value = "";
  document.getElementById("code_edit_id").value = "";
  document.getElementById("spec_edit_id").value = "";
  document.getElementById("project_edit_id").value = "";
  document.getElementById("quatity_edit_id").value = "";
  document.getElementById("unit_edit_id").value = "";
  document.getElementById("price_edit_id").value = "";
  document.getElementById("position_edit_id").value = "";
  document.getElementById("type_edit_id").value = "";
  document.getElementById("picture_edit_id").value = "";
  document.getElementById("safety_quantity_edit_id").value = "";
}

function delete_object() {
  var number_2 = document.getElementById("number_pic").innerText;
  document.getElementById("add_number_id").innerText = number_2;
  document.getElementById("warning_popup_id").style.display = "flex";
  document.getElementById("warning_popup_id").style.backgroundColor = "yellow";
  document.getElementById("warning_row_3_id").style.display = "flex";
  document.getElementById("icon_apply_icon").style.display = "none";
  document.getElementById("icon_error_icon").style.display = "none";
  document.getElementById("warning_text_id").style.color = "black";
  document.getElementById("warning_text_id").innerText =
    "Delete it, Are you sure?";
}

function ok_delete() {
  var number_2 = document.getElementById("number_pic").innerText;
  var msg = {
    topic: "delete_object",
    payload: {
      id: number_2,
    },
  };
  uibuilder.send(msg);
}

function cancel_delete() {
  document.getElementById("warning_popup_id").style.display = "none";
}

function update_data() {
  var number_id_2 = document.getElementById("add_number_edit_id").innerText;
  var component_id = document.getElementById("component_edit_id").value;
  var code_id = document.getElementById("code_edit_id").value;
  var spec_id = document.getElementById("spec_edit_id").value;
  var project_id = document.getElementById("project_edit_id").value;
  var unit_id = document.getElementById("unit_edit_id").value;
  var filePath = document.getElementById("picture_edit_id").value;
  var price_id = document.getElementById("price_edit_id").value;
  var position_id = document.getElementById("position_edit_id").value;
  var type_id = document.getElementById("type_edit_id").value;
  var fileName = filePath.split("\\").pop();
  var quantity_safety = document.getElementById(
    "safety_quantity_edit_id"
  ).value;
  if (fileName !== "") {
    const fileInput = document.getElementById("picture_edit_id");
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = e.target.result.split(",")[1]; // Lấy dữ liệu base64 từ chuỗi Data URL
        const payload = {
          imgname: file.name,
          data: data, // Dữ liệu base64, không phải đối tượng
        };
        uibuilder.send({
          topic: "upload",
          payload: payload,
        });
      };
      reader.readAsDataURL(file); // Đọc file dưới dạng base64
    }
  } else {
    fileName = "";
  }

  var msg = {
    topic: "update_data",
    payload: {
      id: number_id_2,
      component: component_id,
      code: code_id,
      spec: spec_id,
      project: project_id,
      quantity_safety: quantity_safety,
      unit: unit_id,
      price: price_id,
      position: position_id,
      type: type_id,
      pic: fileName,
    },
  };
  uibuilder.send(msg);
}

function download_all() {
  console.log("vào đây");
}

function edit_object() {
  var see_picture_id = document.getElementById("see_picture_id");
  see_picture_id.style.display = "none";

  var edit_id = document.getElementById("edit_id");
  edit_id.style.display = "flex";

  var home_table_id = document.getElementById("home_table_id");
  home_table_id.style.display = "none";

  var component = document.getElementById("component_pic").innerText;
  document.getElementById("component_edit_id").value = component;
  var code = document.getElementById("code_pic").innerText;
  document.getElementById("code_edit_id").value = code;
  var spec = document.getElementById("spec_pic").innerText;
  document.getElementById("spec_edit_id").value = spec;
  var project = document.getElementById("project_pic").innerText;
  document.getElementById("project_edit_id").value = project;

  var quantity_2 = document.getElementById("quantity_pic").innerText;
  document.getElementById("quatity_edit_id").innerText = quantity_2;

  var unit = document.getElementById("unit_pic").innerText;
  document.getElementById("unit_edit_id").value = unit;
  var priceText = document.getElementById("price_pic").innerText;
  // Loại bỏ ký tự "$" và khoảng trắng từ đầu và cuối chuỗi
  var priceWithoutCurrency = priceText.replace(/\$|\s/g, "");
  // Chuyển đổi thành số nguyên
  var priceNumber = parseInt(priceWithoutCurrency);
  // Gán giá trị số vào phần tử có id là "price_edit_id"
  document.getElementById("price_edit_id").value = priceNumber;

  var position = document.getElementById("position_pic").innerText;
  document.getElementById("position_edit_id").value = position;

  var type = document.getElementById("type_pic").innerText;
  document.getElementById("type_edit_id").value = type;

  var number_2 = document.getElementById("number_pic").innerText;
  document.getElementById("add_number_edit_id").innerText = number_2;

  var quantity_safety = document.getElementById(
    "quantity_safety_pic"
  ).innerText;
  document.getElementById("safety_quantity_edit_id").value = quantity_safety;
}

function inout_select_data() {
  var type_data = document.getElementById("time_type_id").value;

  if (type_data === "all") {
    var month_id = document.getElementById("month-id");
    month_id.style.display = "none";

    var week_id = document.getElementById("year-id");
    week_id.style.display = "none";

    var input_table_id = document.getElementById("input_table_id");
    input_table_id.style.display = "none";
    var output_table_id = document.getElementById("output_table_id");
    output_table_id.style.display = "none";
    var dowmload_id = document.getElementById("dowmload_id");
    dowmload_id.style.display = "none";
    document.getElementById("borrow_history_id").style.display = "none";
  }

  if (type_data === "month") {
    var month_id = document.getElementById("month-id");
    month_id.style.display = "block";

    var week_id = document.getElementById("year-id");
    week_id.style.display = "none";

    var input_table_id = document.getElementById("input_table_id");
    input_table_id.style.display = "none";
    var output_table_id = document.getElementById("output_table_id");
    output_table_id.style.display = "none";
    var dowmload_id = document.getElementById("dowmload_id");
    dowmload_id.style.display = "none";
    document.getElementById("borrow_history_id").style.display = "none";
  }

  if (type_data === "year") {
    var month_id = document.getElementById("month-id");
    month_id.style.display = "none";
    var week_id = document.getElementById("year-id");
    week_id.style.display = "block";
    var input_table_id = document.getElementById("input_table_id");
    input_table_id.style.display = "none";
    var output_table_id = document.getElementById("output_table_id");
    output_table_id.style.display = "none";
    var dowmload_id = document.getElementById("dowmload_id");
    dowmload_id.style.display = "none";
    document.getElementById("borrow_history_id").style.display = "none";
  }
}

function check_data_inout() {
  var type_data = document.getElementById("type_data_id").value;
  if (type_data === "inbound_topic") {
    inbound_history();
  } else if (type_data === "outbound_topic") {
    outbound_history();
  } else if (type_data === "borrow_topic") {
    borrow_history();
  }

  // var msg = {
  //   topic: type_data_id,
  //   payload: {
  //     type: topic_time,
  //     time: value_time,
  //   },
  // };
  // uibuilder.send(msg);
}

function signed() {
  var user_1 = document.getElementById("user_id").value;
  var number_ = document.getElementById("number_id").value;
  var quantity = document.getElementById("quantity_id").value;
  var unit = document.getElementById("unit_id").value;
  var possition = document.getElementById("possition_id").value;
  console.log(user_1);
  var msg = {
    topic: "data",
    payload: {
      user: user_1,
      capacity: number_,
      unit: unit,
      quantity: quantity,
      possition: possition,
    },
  };
  uibuilder.send(msg);
}

function back_1() {
  var see_picture_id = document.getElementById("see_picture_id");
  see_picture_id.style.display = "none";
  var search_result_id = document.getElementById("search_result_id");
  search_result_id.style.display = "flex";
  var home_table_id = document.getElementById("home_table_id");
  home_table_id.style.display = "flex";
  document.getElementById("warning_popup_id").style.display = "none";
}

function back_2() {
  var edit_id = document.getElementById("edit_id");
  edit_id.style.display = "none";
  var see_picture_id = document.getElementById("see_picture_id");
  see_picture_id.style.display = "flex";
  var inbound_id = document.getElementById("inbound_id");
  inbound_id.style.display = "none";
  var outbound_id = document.getElementById("outbound_id");
  outbound_id.style.display = "none";
  document.getElementById("warning_popup_id").style.display = "none";
}
function back_3() {
  var inbound_id = document.getElementById("inbound_id");
  inbound_id.style.display = "none";
  document.getElementById("warning_popup_id").style.display = "none";
}
function back_4() {
  var outbound_id = document.getElementById("outbound_id");
  outbound_id.style.display = "none";
  document.getElementById("warning_popup_id").style.display = "none";
}
function back_5() {
  document.getElementById("add_id").style.display = "none";
  document.getElementById("warning_popup_id").style.display = "none";
  home();
}

function back_7() {
  if (borrow_temp_value === 0) {
    console.log("vao day");
    document.getElementById("borrow_2_table_id").style.display = "flex";
    document.getElementById("borrow_due_day_table_id").style.display = "none";
    borrow_temp_value = 1;
    return;
  }
  if (borrow_temp_value === 1) {
    console.log("vao day 1");
    document.getElementById("borrow_2_table_id").style.display = "none";
    document.getElementById("borrow_due_day_table_id").style.display = "flex";
    borrow_temp_value = 0;
    return;
  }
}

function search_result() {
  var type = [];
  var input_type_search_id = document.getElementById(
    "input_type_search_id"
  ).value;
  var text_input = document.getElementById("myInput").value;
  if (input_type_search_id === "name" && text_input !== "") {
    type = name_array;
  } else if (input_type_search_id === "spec" && text_input !== "") {
    type = spec_array;
  } else if (input_type_search_id === "code" && text_input !== "") {
    type = code_array;
  } else if (input_type_search_id === "project" && text_input !== "") {
    type = project_array;
  } else if (input_type_search_id === "position" && text_input !== "") {
    type = position_array;
  } else {
    alldata = table_for_all;
    inoutdata = table_for_inout_data;
    mytable(alldata);
    inout_table(inoutdata);
  }
  var searchTerm = document.getElementById("myInput").value.toLowerCase(); // Convert search input to lowercase for case-insensitive comparison
  var result_search = []; // Initialize array to store filtered data
  var result_inout = []; // Initialize array to store filtered data
  // Iterate through the arrays to filter data based on search term
  var button =
    '<button class="infor_button" onclick="getData(this)"><img src="img/information-help-svgrepo-com.svg" class="icon_add_inout"></button>';
  for (var i = 0; i < id_array.length; i++) {
    // Check if the current component matches the search term
    if (type[i].toLowerCase().includes(searchTerm)) {
      // Create an array representing a row of data
      var rowData = [
        id_array[i],
        name_array[i],
        code_array[i],
        spec_array[i],
        project_array[i],
        quantity_array[i],
        quantity_safety_array[i],
        unit_array[i],
        price_array[i],
        position_array[i],
        type_array[i],
        update_time_array[i],
      ];
      result_search.push(rowData); // Push the row array into the result array

      var rowData_2 = [
        id_array[i],
        name_array[i],
        code_array[i],
        spec_array[i],
        project_array[i],
        quantity_array[i],
        quantity_safety_array[i],
        unit_array[i],
        price_array[i],
        position_array[i],
        type_array[i],
        update_time_array[i],
        button_array[i],
      ];
      result_inout.push(rowData_2); // Push the row array into the result array
    }
  }
  alldata = result_search;
  inoutdata = result_inout;
  inout_table(inoutdata);
  mytable(alldata);
}

function excel_download_inout() {
  var table;
  var table_text;
  var type_data = document.getElementById("type_data_id").value;
  if (type_data === "inbound_topic") {
    table = document.getElementById("table_input_id");
    table_text = "Inbound.xlsx";
  } else if (type_data === "outbound_topic") {
    table = document.getElementById("table_output_id");
    table_text = "Outbound.xlsx";
  } else if (type_data === "borrow_topic") {
    table = document.getElementById("borrow_history_table_id");
    table_text = "Borrow.xlsx";
  }

  var wb = XLSX.utils.book_new(); // Tạo workbook mới
  var ws = XLSX.utils.table_to_sheet(table); // Chuyển bảng HTML thành worksheet
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Thêm worksheet vào workbook
  XLSX.writeFile(wb, table_text); // Xuất workbook dưới dạng file Excel
}

function excel_download_component() {
  console.log("vao day");
  var wb = XLSX.utils.book_new(); // Tạo workbook mới
  var ws = XLSX.utils.table_to_sheet(document.getElementById("my-table")); // Chuyển bảng HTML thành worksheet
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Thêm worksheet vào workbook
  XLSX.writeFile(wb, "Component.xlsx"); // Xuất workbook dưới dạng file Excel
}

function reload() {
  var status_check = "reload";
  var home_class_id = document.getElementById("home_class_id");
  home_class_id.style.display = "flex";
  var search_result_id = document.getElementById("search_result_id");
  search_result_id.style.display = "none";
  var reload_id = document.getElementById("reload_id");
  reload_id.style.display = "flex";
  var msg = {
    topic: "page_reload",
    payload: status_check,
  };
  uibuilder.send(msg);
}

window.onload = function () {
  if (loggedInUser) {
    loginContainer.style.display = "none"; // Ẩn giao diện đăng nhập
    document.getElementById("user_text_id").textContent = loggedInUser;
    document.getElementById("logout_button_id").style.display = "flex";
    document.getElementById("login_button_id").style.display = "none";
    // Nếu là admin, hiển thị giao diện admin và button đăng xuất
    if (isAdmin === "true") {
      admin_permisstion();
    } else {
      user_permission();
    }
  }
};

uibuilder.start();
{
  reload();

  uibuilder.onChange("msg", function (msg) {
    if (msg.topic === "input_user") {
      user_login_name = msg.payload.user_name;
      user_passwords = msg.payload.password;
      permissions = msg.payload.permisstion;
    }

    if (msg.topic === "all_data_for_array") {
      id_array = msg.payload.id_array;
      code_array = msg.payload.code_array;
      name_array = msg.payload.name_array;
      spec_array = msg.payload.spec_array;
      position_array = msg.payload.position_array;
      project_array = msg.payload.project_array;
      quantity_array = msg.payload.quantity_array;
      quantity_safety_array = msg.payload.quantity_safety_array;
      unit_array = msg.payload.unit_array;
      price_array = msg.payload.price_array;
      position_array = msg.payload.position_array;
      type_array = msg.payload.type_array;
      update_time_array = msg.payload.update_time_array;
      picture_array = msg.payload.picture_array;
      button_array = msg.payload.button_array;
      var data_for_search = name_array;
      autocomplete(document.getElementById("myInput"), data_for_search);
    }

    if (msg.topic === "inbound_data_array") {
      inbound_array = msg.payload;
    }

    if (msg.topic === "outbound_data_array") {
      outbound_array = msg.payload;
    }

    if (msg.topic === "table_all_data") {
      var search_result_id = document.getElementById("search_result_id");
      search_result_id.style.display = "flex";
      var reload_id = document.getElementById("reload_id");
      reload_id.style.display = "none";
      table_for_all = msg.payload;
      alldata = table_for_all;
      mytable(alldata);
    }

    if (msg.topic === "search_data_inout") {
      table_for_inout_data = msg.payload;
      inoutdata = table_for_inout_data;
      inout_table(inoutdata);
    }

    if (msg.topic === "empty") {
      const empty_text = document.getElementById("empty_value");
      empty_text.innerText = msg.payload;
    }

    if (msg.topic === "warning") {
      var a = msg.payload;
      error_Message();
      var loading_gif_id = document.getElementById("loading_gif_id");
      loading_gif_id.style.display = "none";
      if (a === "Update Success") {
        back_1();
      }
    }

    if (msg.topic === "inbound_warning") {
      var a = msg.payload;
    }

    if (msg.topic === "insert_data_succes") {
      ok_Message();
      delete_val();
      document.getElementById("reload_id").style.display = "none";
    }

    if (msg.topic === "insert_data_ok") {
      document.getElementById("result_add_id").style.display = "flex";
      var table = document.getElementById("insert_data_table");
      var data = msg.payload;
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
      for (var i = 0; i < data.length; i++) {
        var row = table.insertRow();
        for (var j = 0; j < data[i].length; j++) {
          var cell = row.insertCell();
          cell.innerHTML = data[i][j];
        }
      }
    }

    if (msg.topic === "data_updated") {
      ok_Message();
      var edit_id = document.getElementById("edit_id");
      var see_picture_id = document.getElementById("see_picture_id");
      edit_id.style.display = "none";
      see_picture_id.style.display = "flex";

      var rowData = [];

      rowData.push(
        msg.payload.id,
        msg.payload.name,
        msg.payload.code,
        msg.payload.spec,
        msg.payload.project,
        msg.payload.quatity,
        msg.payload.safety_inventory,
        msg.payload.unit,
        msg.payload.price,
        msg.payload.position,
        msg.payload.status,
        msg.payload.time
      );
      show_information(rowData);
      console.log(rowData);
    }

    if (msg.topic === "delete_success") {
      back_1();
      reload();
      ok_Message();
    }

    if (msg.topic === "quantity_safety_data_list") {
      var safety_stock_id = document.getElementById("safety_stock_id");
      safety_stock_id.style.display = "block";
      var table = document.getElementById("table_safety_stock_id");
      var data_2 = msg.payload;
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
      for (var i = 0; i < data_2.length; i++) {
        var row = table.insertRow();
        for (var j = 0; j < data_2[i].length; j++) {
          var cell = row.insertCell();
          cell.innerHTML = data_2[i][j];
        }
      }
    }

    if (msg.topic === "see_the_picture") {
      var see_picture_id = document.getElementById("see_picture_id");
      see_picture_id.style.display = "flex";
      var home_table_id = document.getElementById("home_table_id");
      home_table_id.style.display = "none";

      const number_pic = document.getElementById("number_pic");
      number_pic.innerText = msg.payload.id;

      const time_pic = document.getElementById("time_pic");
      time_pic.innerText = msg.payload.time;
      var component_pic = document.getElementById("component_pic");
      component_pic.innerText = msg.payload.name;
      const code_pic = document.getElementById("code_pic");
      code_pic.innerText = msg.payload.code;
      const spec_pic = document.getElementById("spec_pic");
      spec_pic.innerText = msg.payload.spec;
      const project_pic = document.getElementById("project_pic");
      project_pic.innerText = msg.payload.project;
      const quantity_pic = document.getElementById("quantity_pic");
      quantity_pic.innerText = msg.payload.quantity;
      const unit_pic = document.getElementById("unit_pic");
      unit_pic.innerText = msg.payload.unit;
      const price_pic = document.getElementById("price_pic");
      price_pic.innerText = msg.payload.price;
      const position_pic = document.getElementById("position_pic");
      position_pic.innerText = msg.payload.position;
      const type_pic = document.getElementById("type_pic");
      type_pic.innerText = msg.payload.status;
      const pic_id = document.getElementById("pic_id");
      pic_id.innerHTML = msg.payload.picture;
      const name_pic = document.getElementById("name_pic");
      name_pic.innerText = msg.payload.picname;
      const quantity_safety_pic = document.getElementById(
        "quantity_safety_pic"
      );
      quantity_safety_pic.innerText = msg.payload.quantity_safety;
    }
    if (msg.topic === "real_date_time") {
      document.getElementById("time_id").innerText = msg.payload.nowtime;
      document.getElementById("date_id").innerText = msg.payload.nowdate;
    }

    if (msg.topic === "borrow_data") {
      borrow_data = msg.payload;
      borrow_table(borrow_data);
    }
  });
}
