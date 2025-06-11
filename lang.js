const translations = {
  zh: {
    title: "打卡系統",
    btnClockin: "上班打卡",
    btnClockout: "下班打卡",
    btnQuery: "查詢打卡紀錄",
    titleRecord: "📋 打卡紀錄"
  },
  id: {
    title: "Sistem Absensi",
    btnClockin: "Absen Masuk",
    btnClockout: "Absen Pulang",
    btnQuery: "Lihat Riwayat Absensi",
    titleRecord: "📋 Riwayat Absensi"
  }
};

let currentLang = "zh";

function toggleLang() {
  currentLang = currentLang === "zh" ? "id" : "zh";
  const t = translations[currentLang];

  const titleEl = document.querySelector(".title");
  if (titleEl) titleEl.innerText = t.title;

  const btnIn = document.querySelector(".btnClockin");
  if (btnIn) btnIn.innerText = t.btnClockin;

  const btnOut = document.querySelector(".btnClockout");
  if (btnOut) btnOut.innerText = t.btnClockout;

  const btnQuery = document.querySelector(".btnQuery");
  if (btnQuery) btnQuery.innerText = t.btnQuery;

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
