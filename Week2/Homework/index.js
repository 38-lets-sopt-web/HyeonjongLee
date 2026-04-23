const tbody = document.getElementById("table-body");
const totalAmount = document.getElementById("total-amount");
const refreshIcon = document.getElementById("refresh-icon");
const filterApply = document.querySelector(".filter-item:nth-child(5)");
const filterReset = document.querySelector(".filter-item:nth-child(6)");

if (!localStorage.getItem("budgets")) {
  localStorage.setItem("budgets", JSON.stringify(data));
}
let budgets = JSON.parse(localStorage.getItem("budgets"));

function renderTable(list) {
  // tbody 안의 모든 HTML을 지워서 초기화
  tbody.innerHTML = "";
  let total = 0;

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const tr = document.createElement("tr");

    // 금액이 양수면 파란색, 음수면 빨간색
    var amountClass = "amount-minus";
    var amountText = item.amount.toLocaleString(); // 금액 포맷팅

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

  if (total > 0) {
    totalAmount.textContent = "+" + total.toLocaleString();
    totalAmount.className = "amount-plus";
  } else {
    totalAmount.textContent = total.toLocaleString();
    totalAmount.className = "amount-minus";
  }
}

// 페이지 로드 시 전체 데이터로 테이블 렌더링
renderTable(budgets);

filterApply.onclick = function () {
  var titleValue = document.getElementById("title").value;
  var typeValue = document.getElementById("type").value; // "all" | "income" | "expense"
  var categoryValue = document.getElementById("category").value;
  var payValue = document.getElementById("pay").value;
  var filtered = [];

  for (var i = 0; i < budgets.length; i++) {
    var item = budgets[i];
    if (item.title.indexOf(titleValue) === -1) continue;

    // 유형 필터
    if (typeValue === "income" && item.amount <= 0) continue;
    if (typeValue === "expense" && item.amount >= 0) continue;

    // 카테고리/결제수단
    if (categoryValue !== "all" && item.category !== categoryValue) continue;
    if (payValue !== "all" && item.pay !== payValue) continue;

    filtered.push(item);
  }

  renderTable(filtered);
};

filterReset.onclick = function () {
  document.getElementById("title").value = "";
  document.getElementById("type").value = "all";
  document.getElementById("category").value = "all";
  document.getElementById("pay").value = "all";
  renderTable(budgets);
};

refreshIcon.onclick = function () {
  location.reload(); // 새로고침
};

// 선택 삭제
document.getElementById("delete-btn").onclick = function () {
  var checks = document.querySelectorAll(".row-check:checked");

  if (checks.length === 0) {
    alert("삭제할 항목을 선택해주세요.");
    return;
  }

  var deleteIds = [];
  for (var i = 0; i < checks.length; i++) {
    deleteIds.push(Number(checks[i].dataset.id)); // 문자열 -> 숫자 변환
  }

  var newBudgets = [];
  for (var j = 0; j < budgets.length; j++) {
    var found = false;
    for (var k = 0; k < deleteIds.length; k++) {
      if (budgets[j].id === deleteIds[k]) {
        found = true;
        break;
      }
    }
    if (!found) {
      newBudgets.push(budgets[j]);
    }
  }

  budgets = newBudgets;
  localStorage.setItem("budgets", JSON.stringify(budgets));
  renderTable(budgets);
};

// 모달
document.getElementById("add-btn").onclick = function () {
  document.getElementById("modal").classList.remove("hidden");
};

document.getElementById("modal-close").onclick = function () {
  document.getElementById("modal").classList.add("hidden");
};

document.getElementById("modal-add").onclick = function () {
  // 모달 안의 각 input/select에서 입력값을 가져옴
  var title = document.getElementById("modal-title").value;
  var type = document.getElementById("modal-type").value;
  var amount = document.getElementById("modal-amount").value;
  var date = document.getElementById("modal-date").value;
  var category = document.getElementById("modal-category").value;
  var pay = document.getElementById("modal-pay").value;

  // 빈 값 있으면 함수 종료
  if (
    title === "" ||
    type === "" ||
    amount === "" ||
    date === "" ||
    category === "" ||
    pay === ""
  ) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  var numAmount = Number(amount);
  if (type === "expense") {
    numAmount = -numAmount; // 지출이면 음수변환
  }

  // 중복 없는 새 id 생성ㅇ
  var maxId = 0;
  for (var i = 0; i < budgets.length; i++) {
    if (budgets[i].id > maxId) {
      maxId = budgets[i].id;
    }
  }

  // 새 항목 객체 생성
  var newItem = {
    id: maxId + 1,
    title: title,
    amount: numAmount,
    date: date,
    category: category,
    pay: pay,
  };

  budgets.push(newItem);
  localStorage.setItem("budgets", JSON.stringify(budgets)); // localStorage 업데이트

  // 모달 입력 필드 초기화
  document.getElementById("modal-title").value = "";
  document.getElementById("modal-type").value = "";
  document.getElementById("modal-amount").value = "";
  document.getElementById("modal-date").value = "";
  document.getElementById("modal-category").value = "";
  document.getElementById("modal-pay").value = "";

  document.getElementById("modal").classList.add("hidden"); // 모달 닫기
  renderTable(budgets);
};
