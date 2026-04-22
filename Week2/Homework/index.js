const tbody = document.getElementById("table-body");
const totalAmount = document.getElementById("total-amount");
const refreshIcon = document.getElementById("refresh-icon");
const filterApply = document.querySelector(".filter-item:nth-child(5)");
const filterReset = document.querySelector(".filter-item:nth-child(6)");

// 로컬스토리지에서 가져오기
if (!localStorage.getItem("budgets")) {
  localStorage.setItem("budgets", JSON.stringify(data));
}
let budgets = JSON.parse(localStorage.getItem("budgets"));

// 테이블
function renderTable(list) {
  // 기존 테이블 내용 지우기
  tbody.innerHTML = "";
  let total = 0;

  for (let i = 0; i < list.length; i++) {
    var item = list[i];
    var tr = document.createElement("tr");
    var amountClass = "amount-minus";
    var amountText = item.amount.toLocaleString();

    if (item.amount > 0) {
      amountClass = "amount-plus";
      amountText = "+" + item.amount.toLocaleString();
    }

    tr.innerHTML =
      "<td><input type='checkbox' class='row-check' data-id='" +
      item.id +
      "' /></td>" +
      "<td>" +
      item.title +
      "</td>" +
      "<td class='" +
      amountClass +
      "'>" +
      amountText +
      "</td>" +
      "<td>" +
      item.date +
      "</td>" +
      "<td>" +
      item.category +
      "</td>" +
      "<td>" +
      item.pay +
      "</td>";

    tbody.appendChild(tr);
    total = total + item.amount;
  }

  // 합계 금액
  if (total > 0) {
    totalAmount.textContent = "+" + total.toLocaleString();
    totalAmount.className = "amount-plus";
  } else {
    totalAmount.textContent = total.toLocaleString();
    totalAmount.className = "amount-minus";
  }
}

renderTable(budgets);

// 필터 적용
filterApply.onclick = function () {
  var titleValue = document.getElementById("title").value;
  var filtered = [];

  for (var i = 0; i < budgets.length; i++) {
    if (budgets[i].title.indexOf(titleValue) !== -1) {
      filtered.push(budgets[i]);
    }
  }

  renderTable(filtered);
};

// 필터 초기화
filterReset.onclick = function () {
  document.getElementById("title").value = "";
  renderTable(budgets);
};

// 아이콘 클릭 시, 새로고침
refreshIcon.onclick = function () {
  location.reload();
};
