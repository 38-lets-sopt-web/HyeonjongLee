// 이어 붙인 수
function solution(num_list) {
  const odd = num_list
    .filter((n) => n % 2 !== 0)
    .reduce((acc, n) => acc + String(n), "");

  const even = num_list
    .filter((n) => n % 2 === 0)
    .reduce((acc, n) => acc + String(n), "");

  return Number(odd) + Number(even);
}
