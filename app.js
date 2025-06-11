import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSLCVS3oHZ6_M_xoPMvH2ihsbYUgfdTSo",
  authDomain: "pwa-checkin-4dbe1.firebaseapp.com",
  projectId: "pwa-checkin-4dbe1",
  storageBucket: "pwa-checkin-4dbe1.appspot.com",
  messagingSenderId: "467417750707",
  appId: "1:467417750707:web:1c165c3c6353db694c0d3f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const translations = {
  zh: {
    requireName: "❌ 請先回首頁打卡並輸入姓名。",
    noRecord: "📭 尚無打卡紀錄"
  },
  id: {
    requireName: "❌ Silakan kembali ke halaman utama dan masukkan nama Anda.",
    noRecord: "📭 Belum ada catatan absensi"
  }
};

export async function handlePunch(type) {
  let name = localStorage.getItem("username");

  if (!name || name.trim() === "") {
    const lang = localStorage.getItem("lang") || "zh";
    const promptText = lang === "id" ? "Silakan masukkan nama Anda:" : "請輸入您的姓名：";
    const errorText = lang === "id"
      ? "⚠️ Masukkan nama yang valid sebelum absen!"
      : "⚠️ 請輸入有效的姓名再打卡！";

    name = prompt(promptText);
    if (!name || name.trim() === "") {
      alert(errorText);
      return;
    }
    localStorage.setItem("username", name.trim());
  }

  if (!navigator.geolocation) {
    document.getElementById("status").innerText = "❌ 無法取得 GPS 位置。";
    return;
  }

  document.getElementById("status").innerHTML = "⏳ <b style='color:green'>處理中...</b>";

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    const isInside =
      Math.abs(latitude - 25.0982990) < 0.001 &&
      Math.abs(longitude - 121.7878391) < 0.001;

    if (!isInside) {
      document.getElementById("status").innerHTML = "❌ <b style='color:red'>GPS 不在指定範圍內，禁止打卡！</b>";
      return;
    }

    try {
      await addDoc(collection(db, "attendance"), {
        name,
        type,
        timestamp: serverTimestamp(),
        gps_status: "GPS 正常",
        location: { lat: latitude, lng: longitude }
      });
      document.getElementById("status").innerHTML = `✅ <b style='color:green'>${type === 'clockin' ? '上班' : '下班'} 打卡成功！
