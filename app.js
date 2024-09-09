//MASIH BELUM SELESAI
var questions = [
  {
    question: "apa yang itu HTML?",
    option1: "HyperText Markup Language",
    option2: "HyperText Marker Language",
    option3: "HyperText Markdown Language",
    option4: "HyperText Main Language",
    answer: "HyperText Markup Language",
  },
  {
    question: "Apa fungsi elemen <p> pada HTML",
    option1: "Menentukan gaya CSS untuk elemen.",
    option2: "Membuat dan menginisialisasi objek.",
    option3: "Mengelola koneksi database.",
    option4: "Menampilkan teks paragraf.",
    answer: "Menampilkan teks paragraf.",
  },
  {
    question: "Element tag apa yang digunakan untuk membuat judul pada HTML?",
    option1: "this",
    option2: "new",
    option3: "create",
    option4: "h1",
    answer: "h1",
  },
  {
    question:
      "Apa yang dimaksud dengan kata kunci 'src' dalam elemen <img> pada HTML?",
    option1: "Menentukan Sumber gambar.",
    option2: "Objek prototype dari konstruktor.",
    option3: "Alamat URL saat ini.",
    option4: "Kata kunci yang sudah dipesan tanpa makna khusus.",
    answer: "Menentukan Sumber gambar.",
  },
  {
    question: "Apa tujuan dari atribut 'href' dalam elemen <a> pada HTML?",
    option1: "Mendefinisikan nama konstruktor.",
    option2: "Menyimpan data pribadi untuk objek.",
    option3: "Menambahkan metode dan properti ke semua instansi objek.",
    option4: "Menentukan URL tujuan tautan.",
    answer: "Menentukan URL tujuan tautan.",
  },
  {
    question:
      "Bagaimana cara menambahkan warna latar belakang pada elemen HTML?",
    option1: "Menggunakan notasi 'dot' (contohnya, obj.property).",
    option2: "Dengan memanggil fungsi terpisah dengan nama properti.",
    option3:
      "Dengan menggunakan atribut 'style' dan properti 'background-color'.",
    option4: "Dengan menggunakan properti 'prototype' dari konstruktor.",
    answer:
      "Dengan menggunakan atribut 'style' dan properti 'background-color'.",
  },
];
//memanggil query selector element byid
var startBtn = document.querySelector(".startBtn");
var login_form = document.querySelector(".login_form");
var emailPass = document.querySelector(".emailPass");
var hideBtn = document.querySelector(".hideBtn");
var userEmail = document.getElementById("uEmail");
var userPass = document.getElementById("uPass");
var infoBox = document.querySelector(".info_box");
var quizStart = document.querySelector(".quiz_container");
var resultbox = document.querySelector(".result_box");
var scoreText = document.querySelector(".score_text");
var inputs = document.querySelector(".inputs");
var links = document.querySelector(".links");
var progressbar = document.getElementById("progressBar");
var form = document.getElementById("form");
var countDown = document.getElementById("timer");
var index = 0; // Question Counting variabel
var score = 0; // User Correct Question Score variabel
var counter; // counter of timer waktu sisa
var timeValue = 60; // timer value waaktu

// Registrasi Form
var singUpName = document.getElementById("sName");
var singUpEmail = document.getElementById("sEmail");
var singUpPass = document.getElementById("sPass");

function submitForm() {
  event.preventDefault();
  var registerUser = {
    name: singUpName.value,
    email: singUpEmail.value,
    password: singUpPass.value,
  };

  console.log("registerUser", registerUser);

  localStorage.setItem("registerUser", JSON.stringify(registerUser));
  window.location.href = "./index.html";
}

// get data user data to localStorage
var getUserData = localStorage.getItem("registerUser");
getUserData = JSON.parse(getUserData);

// login form email dan password
var getEmail = getUserData.email;
var getPass = getUserData.password;

function loginForm() {
  var user = localStorage.getItem("user");
  if (!user) {
    const Toast = Swal.mixin({
      //sweetalert
      toast: true,
      position: "top",
      showConfirmButton: true,
    });
    Toast.fire({
      //isi text
      title: "<h2>Hello, Selamat datang!</h2> Silahkan daftarkan akun Anda",
    });
  } else {
    if (userEmail.value == getEmail && userPass.value == getPass) {
      infoBox.style.display = "block";
      login_form.style.display = "none";
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Yeyy! Anda Berhasil Masuk Selamat",
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
      });
      Toast.fire({
        icon: "warning",
        title: "<h2>email dan password Anda Tidak Valid</h2>",
      });
    }
  }
}

// quit quiz
function quit() {
  location.reload();
}

// masuk quiz
function enterQuiz() {
  infoBox.style.display = "none";
  startBtn.style.display = "block";
}

// akan tampilkan pertanyaan
function renderQuestions() {
  var question = document.getElementById("qustionsContainer");
  var options = document.getElementsByName("options");
  var qustionNo = document.getElementById("qustionNo");
  clearInterval(counter);
  startTimer(timeValue);

  for (var i = 0; i < options.length; i++) {
    if (options[i].checked) {
      if (options[i].value === questions[index - 1].answer) {
        score++;
      }
    }
  }
  //persentase soal benar
  var percentage = (score / 6) * 100;

  window.addEventListener("blur", () => {
    clearInterval(counter);
    resultbox.style.display = "flex";
    quizStart.style.display = "none";

    if (score === 0) {
      scoreText.innerHTML = `
        <span style="text-align: center; margin: 5px 0; font-size: 22px;">
        Anda dilarang untuk keluar dari aplikasi Quiz, anda didiskualifikasi 🖐️ <span>
        `;
    } else {
      var progressbar = document.querySelector(".progressBar");
      if (progressbar) {
        progressbar.innerHTML = `
          <p>${percentage}%</p>
          `;
      }
      scoreText.innerHTML = `
        <span>Score: <p>${score}</p> out of <p>${questions.length}</p><span>
        `;
    }
  });

  //pertanyaan
  if (!questions[index]) {
    clearInterval(counter);
    resultbox.style.display = "flex";
    quizStart.style.display = "none";

    scoreText.innerHTML = `
      <span>Score: <p>${score}</p> out of <p>${questions.length}</p><span>
      `;

    var circularProgress = document.querySelector(".circular-progress"),
      progressValue = document.querySelector(".progress-value");

    var progressStartValue = 0,
      progressEndValue = percentage,
      speed = 25;

    var progress = setInterval(() => {
      progressStartValue++;

      progressValue.textContent = `${progressStartValue}%`;
      circularProgress.style.background = `conic-gradient(var(--primaryColor) ${
        progressStartValue * 3.6
      }deg, #ededed 0deg)`;

      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);

    return;
  }

  var number = index + 1;

  var questionValue = questions[index];
  question.innerHTML = `
    <div id="qustions">
      <span>${number}</span>
      <p>${questionValue.question}</p>
    </div>
    <div class="options_list">
      <label for="options1" class="options"><input type="checkbox" id="options1" name="options" value="${questionValue.option1}">${questionValue.option1}<span class="checkmark"></span></label>
      <label for="options2" class="options"><input type="checkbox" id="options2" name="options" value="${questionValue.option2}">${questionValue.option2}<span class="checkmark"></span></label>
      <label for="options3" class="options"><input type="checkbox" id="options3" name="options" value="${questionValue.option3}">${questionValue.option3}<span class="checkmark"></span></label>
      <label for="options4" class="options"><input type="checkbox" id="options4" name="options" value="${questionValue.option4}">${questionValue.option4}<span class="checkmark"></span></label>
    </div>
  `;

  index++;
  qustionNo.innerHTML = index;
}

// set timer
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    countDown.textContent = time;
    time--;
    if (time < 0) {
      clearInterval(counter);
      renderQuestions();
    }
  }
}

// start kuis
function startQuiz() {
  quizStart.style.display = "block";
  startBtn.style.display = "none";
  renderQuestions();

  // set page full screen when start quiz
  document.documentElement.requestFullscreen();
}
