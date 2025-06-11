import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// 初始化 Firebase
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

document.getElementById("clear-btn").addEventListener("click", async () => {
  const confirmDelete = confirm("你確定要刪除所有打卡資料嗎？此操作無法復原！");
  if (!confirmDelete) return;

  const snapshot = await getDocs(collection(db, "attendance"));
  const deletions = [];

  snapshot.forEach((docSnap) => {
    deletions.push(deleteDoc(doc(db, "attendance", docSnap.id)));
  });

  await Promise.all(deletions);
  alert("✅ 已成功刪除所有資料！");
});
