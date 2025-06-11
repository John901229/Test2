const translations = {
  zh: {
    title: "打卡系統",
    btnClockin: "上班打卡",
    btnClockout: "下班打卡",
    btnQuery: "查詢打卡紀錄"
    titleＲecord: "📋 打卡紀錄"
  },
  id: {
    title: "Sistem Absensi",
    btnClockin: "Absen Masuk",
    btnClockout: "Absen Pulang",
    btnQuery: "Lihat Riwayat Absensi"
    titleRecord: "📋 Riwayat Absensi"
  }
};

let currentLang = "zh";

function toggleLang() {
  currentLang = currentLang === "zh" ? "id" : "zh";
  const t = translations[currentLang];

  document.querySelector(".title").innerText = t.title;
  document.querySelector(".btnClockin").innerText = t.btnClockin;
  document.querySelector(".btnClockout").innerText = t.btnClockout;
  document.querySelector(".btnQuery").innerText = t.btnQuery;
  
  const titleRecordEl = document.querySelector(".titleRecord");
  if (titleRecordEl) titleRecordEl.innerText = t.titleRecord;

  localStorage.setItem("lang", currentLang);
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang");
  if (saved && saved !== currentLang) {
    currentLang = saved;
    toggleLang();
  }
});
