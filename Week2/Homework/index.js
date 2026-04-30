import { data } from "./data.js";

const tbody = document.getElementById("table-body");
const totalAmount = document.getElementById("total-amount");
const refreshIcon = document.getElementById("refresh-icon");
const filterApply = document.getElementById("filter-apply-button");
const filterReset = document.getElementById("filter-reset-button");

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

    // 금액이 양수면 파란색, 음수면 빨간색, 0
    let amountClass = "amount-minus";
    let amountText = item.amount.toLocaleString();

    if (item.amount >= 0) {
      amountClass = "amount-plus";
      amountText = "+" + item.amount.toLocaleString();
    }

    tr.innerHTML = `
      <td><input type="checkbox" class="row-check" data-id="${item.id}" /></td>
      <td>${item.title}</td>
      <td class="${amountClass}">${amountText}</td>
      <td>${item.date}</td>
      <td>${item.category}</td>
      <td>${item.pay}</td>
    `;

    tbody.appendChild(tr);
    total = total + item.amount;
  }

  if (total >= 0) {
    totalAmount.textContent = "+" + total.toLocaleString();
    totalAmount.className = "amount-plus";
  } else {
    totalAmount.textContent = total.toLocaleString();
    totalAmount.className = "amount-minus";
  }
}

// 페이지 로드 시 전체 데이터로 테이블 렌더링
renderTable(budgets);

function getFilteredList() {
  const titleValue = document.getElementById("title").value;
  const typeValue = document.getElementById("type").value;
  const categoryValue = document.getElementById("category").value;
  const payValue = document.getElementById("pay").value;
  const filtered = [];

  for (let i = 0; i < budgets.length; i++) {
    const item = budgets[i];
    if (item.title.indexOf(titleValue) === -1) continue;

    // 유형 필터
    if (typeValue === "income" && item.amount <= 0) continue;
    if (typeValue === "expense" && item.amount >= 0) continue;

    // 카테고리/결제수단
    if (categoryValue !== "all" && item.category !== categoryValue) continue;
    if (payValue !== "all" && item.pay !== payValue) continue;

    filtered.push(item);
  }

  return filtered;
}

filterApply.addEventListener("click", function () {
  renderTable(getFilteredList());
});

filterReset.addEventListener("click", function () {
  document.getElementById("title").value = "";
  document.getElementById("type").value = "all";
  document.getElementById("category").value = "all";
  document.getElementById("pay").value = "all";
  renderTable(budgets);
});

refreshIcon.addEventListener("click", function () {
  location.reload();
});

// 선택 삭제
document.getElementById("delete-btn").addEventListener("click", function () {
  const checks = document.querySelectorAll(".row-check:checked");

  if (checks.length === 0) {
    alert("삭제할 항목을 선택해주세요.");
    return;
  }

  const deleteIds = [];
  for (let i = 0; i < checks.length; i++) {
    deleteIds.push(Number(checks[i].dataset.id));
  }

  budgets = budgets.filter(function (item) {
    return !deleteIds.includes(item.id);
  });
  localStorage.setItem("budgets", JSON.stringify(budgets));
  renderTable(getFilteredList());
});

// 모달
document.getElementById("add-btn").addEventListener("click", function () {
  document.getElementById("modal").classList.remove("hidden");
});

document.getElementById("modal-close").addEventListener("click", function () {
  document.getElementById("modal").classList.add("hidden");
});

document.getElementById("modal-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("modal-title").value;
  const type = document.getElementById("modal-type").value;
  const amount = document.getElementById("modal-amount").value;
  const date = document.getElementById("modal-date").value;
  const category = document.getElementById("modal-category").value;
  const pay = document.getElementById("modal-pay").value;

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

  let numAmount = Number(amount);
  if (type === "expense") {
    numAmount = -numAmount;
  }

  // 중복 없는 새 id 생성
  let maxId = 0;
  for (let i = 0; i < budgets.length; i++) {
    if (budgets[i].id > maxId) {
      maxId = budgets[i].id;
    }
  }

  const newItem = {
    id: maxId + 1,
    title: title,
    amount: numAmount,
    date: date,
    category: category,
    pay: pay,
  };

  budgets.push(newItem);
  localStorage.setItem("budgets", JSON.stringify(budgets));

  // 모달 입력 필드 초기화
  document.getElementById("modal-title").value = "";
  document.getElementById("modal-type").value = "";
  document.getElementById("modal-amount").value = "";
  document.getElementById("modal-date").value = "";
  document.getElementById("modal-category").value = "";
  document.getElementById("modal-pay").value = "";

  document.getElementById("modal").classList.add("hidden");
  renderTable(budgets);
});
