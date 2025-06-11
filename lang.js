const translations = {
  zh: {
    title: "打卡系統",
    btnClockin: "上班打卡",
    btnClockout: "下班打卡",
    btnQuery: "查看打卡紀錄",
    titleRecord: "📋 打卡紀錄",
    promptName: "請輸入您的姓名。",
    errorName: "⚠️ 請輸入有效的姓名再打卡！",
    noRecord: "📋 尚無打卡紀錄"
    // requireName not yet translated in this version
  },
  id: {
    title: "Sistem Absensi",
    btnClockin: "Absen Masuk",
    btnClockout: "Absen Pulang",
    btnQuery: "Lihat Riwayat Absensi",
    titleRecord: "📋 Riwayat Absensi",
    promptName: "Silakan masukkan nama Anda.",
    errorName: "⚠️ Masukkan nama yang valid sebelum absen!",
    noRecord: "📋 Belum ada catatan absensi"
    // requireName not present yet in this version
  }
};

let currentLang = "zh";

/**
 * Toggle the UI language between Chinese (zh) and Indonesian (id).
 * Updates all relevant text on the page and stores the selection.
 */
function toggleLang() {
  // Switch the current language
  currentLang = (currentLang === "zh") ? "id" : "zh";
  localStorage.setItem("lang", currentLang);

  // Update texts on the page according to the new language
  const t = translations[currentLang];
  document.querySelector('.title')?.innerText = t.title;
  document.querySelector('.titleRecord')?.innerText = t.titleRecord;
  document.querySelector('.btnClockin')?.innerText = t.btnClockin;
  document.querySelector('.btnClockout')?.innerText = t.btnClockout;
  document.querySelector('.btnQuery')?.innerText = t.btnQuery;
  document.title = t.title;  // also update the <title> tag if present
}
