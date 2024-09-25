let count = 0;
const counter = document.getElementById("counter");
const countEl = document.getElementById("count");

const setCount = (value: number) => {
  count = value;
  if (countEl) {
    countEl.innerText = count.toString();
  }
};

counter?.addEventListener("click", () => {
  setCount(count + 1);
});

setCount(count);

// 版本信息
console.log(`%cBuild Time:  ${__BUILDTIME__}`, "color: #3488ff");
console.log(`%cLast Commit: ${__COMMITID__}`, "color: #3488ff");
