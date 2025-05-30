const siswaData = [
  { nama: "Anggi", kode: "A123", tagihan: 500000 },
  { nama: "Bagus", kode: "B456", tagihan: 0 },
  { nama: "Canggih", kode: "C789", tagihan: 250000 }
];

// Login form
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-msg");

loginForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const kode = document.getElementById("kode").value.trim();
  const user = siswaData.find(s => s.nama.toLowerCase() === nama.toLowerCase() && s.kode.toLowerCase() === kode.toLowerCase());
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "kelulusan.html";
  } else {
    errorMsg.textContent = "Nama atau kode unik salah.";
  }
});

// Halaman kelulusan
window.addEventListener("load", () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    window.location.href = "index.html";
    return;
  }
  const user = JSON.parse(userStr);
  document.getElementById("namaSiswa").textContent = user.nama;
  const backsound = document.getElementById("backsound");
  backsound.play();

  const cekBtn = document.getElementById("cekTagihanBtn");
  const tagihanContainer = document.getElementById("tagihanContainer");
  cekBtn.addEventListener("click", () => {
    tagihanContainer.innerHTML = "";
    if (user.tagihan > 0) {
      tagihanContainer.textContent = "Tagihan anda sebesar: Rp " + user.tagihan.toLocaleString("id-ID");
    } else {
      tagihanContainer.textContent = "Anda tidak memiliki tagihan.";
    }
  });
});
