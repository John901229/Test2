// (Firebase SDK imports and initialization)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp, query, where, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js";

// Your Firebase project configuration (replace with actual config object)
const firebaseConfig = {
  /* ... firebase config ... */
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

/**
 * Handle clock in/out action.
 * @param {string} type - 'clockin' or 'clockout'
 */
export async function handlePunch(type) {
  // Retrieve or prompt for username
  let username = localStorage.getItem("username");
  const lang = localStorage.getItem("lang") || "zh";
  const t = translations[lang];  // use the translations defined in lang.js

  if (!username) {
    // Ask for the user's name in the current language
    const enteredName = prompt(t.promptName, "");
    if (enteredName === null) {
      // User canceled the prompt; do nothing
      return;
    }
    if (enteredName.trim() === "") {
      // User submitted an empty name – show error and abort
      alert(t.errorName);
      return;
    }
    // Save the entered name and proceed
    username = enteredName.trim();
    localStorage.setItem("username", username);
  }

  try {
    // Record the punch action in the Firestore "attendance" collection
    await addDoc(collection(db, "attendance"), {
      name: username,
      type: type,                         // e.g., "clockin" or "clockout"
      timestamp: Timestamp.now()
    });
    // (Optionally, you could provide a success message or update UI here)
  } catch (e) {
    console.error("Error recording attendance:", e);
  }
}

/**
 * Load and display attendance records for the current user.
 * Called on the query page to populate the record list.
 */
export async function loadRecords() {
  const list = document.getElementById("record-list");
  const username = localStorage.getItem("username");
  const lang = localStorage.getItem("lang") || "zh";

  if (!username) {
    // If no user name is set, prompt to go back to home page (message currently only in Chinese in this version)
    list.innerHTML = `<p>❌ 請先回首頁打卡並輸入姓名。</p>`;
    return;
  }

  // Prepare a query to fetch the latest 20 records for this user, ordered by time (latest first)
  const recordsQuery = query(
    collection(db, "attendance"),
    where("name", "==", username),
    orderBy("timestamp", "desc"),
    limit(20)
  );

  try {
    const snapshot = await getDocs(recordsQuery);
    if (snapshot.empty) {
      // Show "no records" message in the appropriate language
      const noRecordText = (lang === "id")
        ? "📋 Belum ada catatan absensi"
        : "📋 尚無打卡紀錄";
      list.innerHTML = `<p>${noRecordText}</p>`;
      return;
    }

    // Build the HTML list of records
    let html = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      // Convert timestamp to a readable string (using zh-TW locale for formatting)
      const dateStr = data.timestamp?.toDate().toLocaleString("zh-TW") || "N/A";
      const rawType = data.type || "";  // stored type (e.g., "clockin"/"clockout")
      // Determine text label for type (Chinese text is used in this version)
      const typeLabel = (rawType === "clockin" || rawType === "in")
        ? "上班打卡"
        : "下班打卡";
      html += `<p>${dateStr} - ${typeLabel}</p>`;
    });
    list.innerHTML = html;
  } catch (e) {
    console.error("Error loading records:", e);
  }
}
