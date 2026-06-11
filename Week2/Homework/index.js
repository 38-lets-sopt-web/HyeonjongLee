import { data } from "./data.js";

const tbody = document.getElementById("table-body");
const totalAmount = document.getElementById("total-amount");
const refreshIcon = document.getElementById("refresh-icon");
const filterApply = document.getElementById("filter-apply-button");
const filterReset = document.getElementById("filter-reset-button");
const selectAll = document.getElementById("select-all");
const sortSelect = document.getElementById("sort-select");

if (!localStorage.getItem("budgets")) {
  localStorage.setItem("budgets", JSON.stringify(data));
}
let budgets = JSON.parse(localStorage.getItem("budgets"));

// 날짜 기준 정렬
function getSortedList(list) {
  const sorted = list.slice(); 
  sorted.sort(function (a, b) {
    if (sortSelect.value === "newest") {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
    } else {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
    }
    return 0;
  });
  return sorted;
}

// 전체 체크박스 상태 업데이트
function updateSelectAll() {
  const checks = tbody.querySelectorAll(".row-check");
  if (checks.length === 0) {
    selectAll.checked = false;
    return;
  }

  let allChecked = true;
  for (let i = 0; i < checks.length; i++) {
    if (!checks[i].checked) {
      allChecked = false;
      break;
    }
  }
  selectAll.checked = allChecked;
}

function renderTable(list) {
  tbody.innerHTML = "";
  let total = 0;

  const sorted = getSortedList(list);

  for (let i = 0; i < sorted.length; i++) {
    const item = sorted[i];
    const tr = document.createElement("tr");

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

    // 개별 체크박스 변경 시 전체 체크박스 상태 업데이트
    tr.querySelector(".row-check").addEventListener("change", function () {
      updateSelectAll();
    });

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

  updateSelectAll();
}

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
    if (typeValue === "income" && item.amount <= 0) continue;
    if (typeValue === "expense" && item.amount >= 0) continue;
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

// 전체 체크박스 클릭 시 모든 행 체크/해제
selectAll.addEventListener("change", function () {
  const checks = tbody.querySelectorAll(".row-check");
  for (let i = 0; i < checks.length; i++) {
    checks[i].checked = selectAll.checked;
  }
});

// 날짜 정렬 드롭다운 변경 시 즉시 반영
sortSelect.addEventListener("change", function () {
  renderTable(getFilteredList());
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

// 항목 추가 모달
document.getElementById("add-btn").addEventListener("click", function () {
  document.getElementById("modal").classList.remove("hidden");
});

document.getElementById("modal-close").addEventListener("click", function () {
  document.getElementById("modal").classList.add("hidden");
});

// 백드롭 클릭 시 모달 닫기
document.getElementById("modal").addEventListener("click", function () {
  document.getElementById("modal").classList.add("hidden");
});

// 모달 내용 클릭 시 버블링 차단
document.querySelector(".modal-box").addEventListener("click", function (e) {
  e.stopPropagation();
});

document.getElementById("modal-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("modal-title").value;
  const type = document.getElementById("modal-type").value;
  const amount = document.getElementById("modal-amount").value;
  const date = document.getElementById("modal-date").value;
  const category = document.getElementById("modal-category").value;
  const pay = document.getElementById("modal-pay").value;

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

  document.getElementById("modal-title").value = "";
  document.getElementById("modal-type").value = "";
  document.getElementById("modal-amount").value = "";
  document.getElementById("modal-date").value = "";
  document.getElementById("modal-category").value = "";
  document.getElementById("modal-pay").value = "";

  document.getElementById("modal").classList.add("hidden");
  renderTable(budgets);
});
