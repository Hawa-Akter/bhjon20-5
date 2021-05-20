const electron = require("electron");
const { ipcRenderer } = electron;

document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("mainWindowLoaded");
});

ipcRenderer.on("resultSent", function (evt, result) {
  console.log("The result is ", result);
  var food_table = document.getElementsByClassName("foodTable")[0];
  var tr = "";
  result.forEach((x) => {
    tr += `<tr id="food_data_frm_db">
      <td id="SI" class="foodValues">${x.id}</td>
      <td id="image" class="foodValues"><img  src="${
        x.category_image
      }" width="60" height="40"></td>
      <td id="category_name" class="foodValues">${x.name}</td>
      <td id="parent_menu" class="foodValues">${x.parent_menu}</td>
      <td id="status" class="foodValues">${
        x.category_is_activate == 1 ? "Active" : "Inactive"
      }</td>
    </tr>
`;
  });

  food_table.innerHTML += tr;
  food_table.style.fontSize = "12px";
  food_table.style.textAlign = "center";

  // ipcRenderer.on("resultSent", function (evt, result) {
  //   console.log("The result is ", result);
  //   table.innerHTML = "";
  //   var tr = "";
  //   result.forEach((x) => {
  //   tr += "<tr>";
  //   tr +=
  //     "<td>" +
  //     x.id +
  //     "</td>" +
  //     "<td>" +
  //     '<img src="' +
  //     x.category_image +
  //     '" height="40" width="60">' +
  //     "</td>" +
  //     "<td>" +
  //     x.name +
  //     "</td>" +
  //     "<td>" +
  //     x.parent_menu +
  //     "</td>" +
  //     "<td>" +
  //     (x.category_is_activate == 1 ? "Active" : "Inactive") +
  //     "</td>";
  //   tr += "</tr>";
  // });
  // table.innerHTML += tr;
  // table.style.fontSize = "12px";
  // table.style.textAlign = "center";
});
