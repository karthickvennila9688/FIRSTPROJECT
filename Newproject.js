const popup = document.getElementById("coursePopup");
const title = document.getElementById("coursePopupTitle");
const courseList = document.getElementById("coursePopupList");
const nextBtn = document.getElementById("courseNextBtn");

const courseSteps = [
  {
    title: "UG Courses",
    courses: [
      "B.Sc. Computer Science", "B.Com", "BBA",
      "BCA", "BA English", "B.Sc. Mathematics"
    ]
  },
  {
    title: "PG Courses",
    courses: [
      "M.Sc. Computer Science", "M.Com", "MBA", "M.A. English"
    ]
  },
  {
    title: "BE Courses",
    courses: [
      "B.E. Computer Science", "B.E. Mechanical",
      "B.E. Electrical", "B.E. Civil"
    ]
  }
];

let currentStep = 0;

function openCoursePopup() {
  currentStep = 0;
  renderCourseStep();
  popup.style.display = "flex";
}

function closeCoursePopup() {
  popup.style.display = "none";
}

function nextCourseTab() {
  currentStep++;
  if (currentStep >= courseSteps.length) {
    closeCoursePopup();
  } else {
    renderCourseStep();
  }
}

function renderCourseStep() {
  const step = courseSteps[currentStep];
  title.textContent = step.title;
  courseList.innerHTML = step.courses
    .map(course => `<div>${course}</div>`)
    .join("");
  nextBtn.textContent = currentStep === courseSteps.length - 1 ? "Close" : "Next";
}

function openContactModal() {
document.getElementById("contactModal").style.display = "flex";
}

function closeContactModal() {
document.getElementById("contactModal").style.display = "none";
}

document.getElementById("studentContactForm").addEventListener("submit", function (e) {
e.preventDefault();
alert("✅ Your message has been sent! We'll contact you soon.");
closeContactModal();
this.reset();
});

window.addEventListener("click", function (e) {
const modal = document.getElementById("contactModal");
if (e.target === modal) {
  closeContactModal();
}
});

const courseDetails = {
  "B.Sc. Computer Science": { fee: "₹35,000", duration: "3 Years", level: "12th Pass (Science Stream)", mode: "Full-time" },
  "B.Com": { fee: "₹30,000", duration: "3 Years", level: "12th Pass (Commerce Stream)", mode: "Full-time" },
  "BBA": { fee: "₹32,000", duration: "3 Years", level: "12th Pass", mode: "Full-time" },
  "BCA": { fee: "₹34,000", duration: "3 Years", level: "12th Pass with Maths", mode: "Full-time" },
  "BA English": { fee: "₹28,000", duration: "3 Years", level: "12th Pass", mode: "Full-time" },
  "B.Sc. Mathematics": { fee: "₹30,000", duration: "3 Years", level: "12th Pass (Science Stream)", mode: "Full-time" },
  "M.Sc. Computer Science": { fee: "₹40,000", duration: "2 Years", level: "B.Sc. Computer Science or BCA", mode: "Full-time" },
  "M.Com": { fee: "₹38,000", duration: "2 Years", level: "B.Com / BBA", mode: "Full-time" },
  "MBA": { fee: "₹60,000", duration: "2 Years", level: "Any UG Degree with TANCET / MAT", mode: "Full-time" },
  "M.A. English": { fee: "₹36,000", duration: "2 Years", level: "BA English", mode: "Full-time" }
};

function showCourseDetails() {
  const selected = document.getElementById("courseDropdown").value;
  const data = courseDetails[selected];
  const infoBox = document.getElementById("courseInfo");
  const infoCards = document.getElementById("infoBoxes"); // Optional: if you use info card grid

  if (data) {
    const feeTotal = parseInt(data.fee.replace(/[₹,]/g, ""));
    const years = parseInt(data.duration);
    const semesters = years * 2;
    const feePerYear = Math.round(feeTotal / years);
    const feePerSemester = Math.round(feeTotal / semesters);

    document.getElementById("courseTitle").textContent = selected;
    document.getElementById("duration").textContent = data.duration;
    document.getElementById("level").textContent = data.level;
    document.getElementById("mode").textContent = data.mode;
    document.getElementById("totalFee").textContent = `₹${feeTotal.toLocaleString()}`;
    document.getElementById("feePerYear").textContent = `₹${feePerYear.toLocaleString()}`;
    document.getElementById("feePerSemester").textContent = `₹${feePerSemester.toLocaleString()}`;

    infoBox.style.display = 'block';
    if (infoCards) infoCards.style.display = 'none';
  } else {
    infoBox.style.display = 'none';
    if (infoCards) infoCards.style.display = 'grid';
  }
}

const modal = document.getElementById("enrollModal");

function openModal() {
  const course = document.getElementById("courseDropdown").value;
  document.getElementById("selectedCourse").value = course || "Not selected";
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Thank you for registering! Our admissions team will contact you shortly.");
  closeModal();
  this.reset();
});