# WWDC-PASS

## WWDC25 Wallet Pass Generator

This project allows users to generate a personalized Apple Wallet pass for WWDC25 by entering their name. It consists of a **frontend (Netlify)** and a **backend (Render)** working together.

## 🔗 Live Website

Frontend URL: [https://stirring-scone-be6f45.netlify.app/](https://stirring-scone-be6f45.netlify.app/)
Backend Base URL: [https://wwdc-pass.wuaze.com/](https://wwdc-pass.wuaze.com/)

---

## 🚀 What the App Does

* User enters their name.
* Backend generates a `.pkpass` file dynamically.
* File is downloaded automatically, and can be opened in Apple Wallet.
* System checks for updated pass versions and displays a banner if a new version is available.

---

## 📂 Project Structure

```
WWDC-PASS
├── wallet-client          # Frontend (Netlify hosted)
│   ├── index.html         # HTML page with form
│   ├── style.css          # Styling including dark mode
│   └── netlify.toml       # Netlify config (optional)
│
├── wallet-server          # Backend (Render hosted)
│   ├── src
│   │   ├── router
│   │   │   └── pass.ts              # Express route for pass handling
│   │   ├── service
│   │   │   └── passGenerator.ts     # Logic for creating the pass
│   │   └── app.ts                  # Express entry point
│   ├── certs              # Apple certificates
│   ├── assets             # icon.png, logo.png used in pass
│   └── public
│       └── pass
│           └── version.json       # Version metadata for updates
```

---

## 🌐 Deployment

### Backend (Render)

1. Push `wallet-server` folder to GitHub.
2. On [Render](https://render.com/), create a **Web Service**:

   * Root Directory: `wallet-server`
   * Build Command: `npm install && npm run build`
   * Start Command: `node dist/app.js`
   * Environment Variable: `PORT` (Render uses this automatically)

### Frontend (Netlify)

1. Push `wallet-client` to GitHub or drag-and-drop via Netlify UI.
2. Root directory: `wallet-client`
3. Deploy.
4. In `index.html`, make sure all fetch calls use:

```js
fetch("https://wwdc-pass.wuaze.com/pass/generate")
```

---

## 🤔 Troubleshooting

* **CORS error?**
  Ensure the backend includes:

  ```ts
  import cors from 'cors';
  app.use(cors());
  ```

* **Dark mode not working in Safari?**
  Clear Safari's cached CSS (Settings > Safari > Advanced > Website Data).

* **Pass not downloading?**
  Double-check that the server returns:

  ```
  Content-Disposition: attachment; filename=pass.pkpass
  Content-Type: application/vnd.apple.pkpass
  ```

---

## 📲 For Users

1. Visit [https://stirring-scone-be6f45.netlify.app/](https://stirring-scone-be6f45.netlify.app/)
2. Enter your name
3. Click **"Add to Wallet"**
4. Your `.pkpass` will be downloaded automatically
5. Open it in **Apple Wallet**

---

## 🧪 Version Check Feature

* On load, the client fetches the latest version from `version.json`.
* If the version has changed since the last load, a yellow notification appears.
* Clicking "Update Now" refreshes the page and stores the current version in `localStorage`.

---

### מחולל כרטיסים ל-WWDC25 ב־Apple Wallet

הפרויקט מאפשר למשתמשים להזין את שמם ולקבל כרטיס Apple Wallet מותאם אישית.

### כתובות חשובות

* אתר: [https://stirring-scone-be6f45.netlify.app/](https://stirring-scone-be6f45.netlify.app/)
* שרת: [https://wwdc-pass.wuaze.com/](https://wwdc-pass.wuaze.com/)

### כיצד זה עובד?

1. המשתמש מזין את שמו בטופס.
2. השרת יוצר קובץ `.pkpass` עם שמו.
3. הקובץ נחתם בתעודת Apple ומורד מיידית למכשיר.
4. ניתן לפתוח אותו ב־Apple Wallet באייפון.

### תמיכה בעדכוני גרסה

אם יש גרסה חדשה לכרטיס, מופיעה הודעת עדכון בעמוד, עם אפשרות לעדכון מיידי.

### דרישות למשתמשים

* iPhone עם Apple Wallet
* Safari פתוח (במחשב, ייתכן שתתבצע הורדה בלבד)

---

## 👨‍💻 מפתח

פותח על ידי איתי ליאון, 2025. בהצלחה ב־WWDC! 🍎
