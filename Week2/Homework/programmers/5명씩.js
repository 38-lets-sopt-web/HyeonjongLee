// 5명씩
function solution(names) {
  var answer = [];
  return (answer = names.filter((name, index) => index % 5 === 0));
}