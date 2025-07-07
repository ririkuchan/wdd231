const courses = [
  { code: "WDD 130", name: "Web Fundamentals", type: "WDD", completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", type: "WDD", completed: true },
  { code: "WDD 231", name: "Frontend Development I", type: "WDD", completed: false }
];

function displayCourses(filter = "All") {
  const container = document.querySelector(".course-list");
  container.innerHTML = ""; // 一度リセット

  let filtered = courses;
  if (filter !== "All") {
    filtered = courses.filter(course => course.type === filter);
  }

  filtered.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");
    div.textContent = `${course.code}`;

    if (course.completed) {
      div.style.backgroundColor = "#88cc88"; // completed style
    } else {
      div.style.backgroundColor = "#ccc"; // not completed
    }

    container.appendChild(div);
  });
}

// 最初に全表示
document.addEventListener("DOMContentLoaded", () => {
  displayCourses();

  document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      displayCourses(btn.textContent === "All" ? "All" : btn.textContent);
    });
  });
});
