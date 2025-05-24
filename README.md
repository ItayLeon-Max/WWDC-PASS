# WWDC-PASS

# WWDC25 Wallet Pass Generator

This project allows users to generate a personalized Apple Wallet pass for WWDC25 by entering their name. It consists of a **frontend (Netlify)** and a **backend (Render)** working together.

## 🔗 Live Website

Frontend URL: [https://stirring-scone-be6f45.netlify.app/](https://stirring-scone-be6f45.netlify.app/)

## 🚀 What the App Does

* User enters their name.
* Backend generates a `.pkpass` file dynamically.
* File is downloaded automatically, and can be opened in Apple Wallet.

---

## 📂 Project Structure

```
WWDC-PASS
├── wallet-client          # Frontend (Netlify hosted)
│   ├── index.html         # HTML page with form
│   ├── style.css          # Styling
│   └── netlify.toml       # Netlify config (optional)
│
├── wallet-server          # Backend (Render hosted)
    ├── src
    │   ├── router
    │   │   └── pass.ts      # Express route handling /pass/generate
    │   ├── service
    │   │   └── passGenerator.ts # Pass generation logic
    │   └── app.ts          # Main Express server
    ├── certs              # Certificates for signing passes
    ├── assets             # icon.png, logo.png used in pass
    └── public             # Optional public folder for static files
```

---

## 🌐 Deploy Instructions

### Backend (Render)

1. Push the `wallet-server` folder to GitHub.
2. Go to [Render](https://render.com/), create a new **Web Service**.
3. Connect to your GitHub repo.
4. Set the following:

   * Build Command: `npm install && npm run build`
   * Start Command: `node dist/app.js`
   * Root Directory: `wallet-server`
5. Deploy. Once live, copy your Render URL (e.g. `https://wallet-server.onrender.com`).

### Frontend (Netlify)

1. Push the `wallet-client` folder to GitHub.
2. Go to [Netlify](https://netlify.com/) and connect the repo.
3. Set root directory to `wallet-client`.
4. Deploy site.
5. Inside `wallet-client/index.html`, make sure the fetch URL matches your Render URL:

```js
fetch("https://your-render-url.com/pass/generate?name=XYZ")
```

---

## 🤔 Troubleshooting

* **CORS error?** Ensure your Render backend has `cors` enabled:

```ts
import cors from "cors";
app.use(cors());
```

* **Pass not downloading?**

  * Ensure your backend route is `GET /pass/generate`
  * The browser only allows downloads from GET, not POST (hence we switched)

---

## 📅 Author

Developed by Itay Leon, 2025. Enjoy WWDC! 🌟

---

## 📲 For Users

To generate your WWDC25 Wallet Pass:

1. Visit [https://stirring-scone-be6f45.netlify.app/](https://stirring-scone-be6f45.netlify.app/)
2. Enter your name
3. Click **"Add to Wallet"**
4. Your `.pkpass` will be downloaded automatically
5. Open it in **Apple Wallet**


# WWDC25 Wallet Pass Generator

ברוכים הבאים לפרויקט יצירת כרטיס Wallet לאירוע WWDC25 🎟️🍎

## ✨ מה עושה הפרויקט?

הפרויקט מאפשר למשתמשים להזין את שמם האישי ולקבל כרטיס Apple Wallet מותאם אישית שכולל את שמם, שאותו ניתן להוסיף ישירות לאפליקציית הארנק ב-iPhone.

---

## 🚀 לינק לאתר החי (Frontend)

[https://stirring-scone-be6f45.netlify.app/](https://stirring-scone-be6f45.netlify.app/)

שם תוכל להזין את שמך המלא, ללחוץ על "Add to Wallet" והכרטיס ייפתח במסך (או יישמר כהורדה במכשירים שאינם תומכים).

---

## 🚧 פרויקט השרת (Backend)

השרת רץ על Render ומאזין לבקשות אל:

```
POST https://wwdc-pass.onrender.com/pass/generate
```

או

```
GET  https://wwdc-pass.onrender.com/pass/generate?name=John%20Appleseed
```

השרת מבצע את הפעולות הבאות:

1. יוצר תיקייה זמנית לכל כרטיס.
2. טוען את תבנית `pass.json` ומכניס לתוכה את השם.
3. מוסיף אייקון ולוגו.
4. יוצר חתימה דיגיטלית עם OpenSSL.
5. יוצר קובץ `.pkpass`.
6. מחזיר את הקובץ ללקוח להורדה או פתיחה מיידית.

---

## 📂 מבנה הפרויקט

```
WWDC-PASS/
├── wallet-client/            # צד לקוח (Netlify)
│   ├── index.html            # טופס ההזנה וקריאה לשרת
│   ├── style.css             # עיצוב בסיסי
│   ├── netlify.toml          # הגדרות Netlify (אם רלוונטי)
│
├── wallet-server/           # צד שרת (Render)
│   ├── src/
│   │   ├── router/pass.ts    # מסלול שמטפל בבקשת יצירת כרטיס
│   │   ├── service/passGenerator.ts # הגנרטור עצמו
│   │   ├── templates/pass.json     # תבנית בסיסית
│   │   └── assets/                 # קבצי icon/logo
│   ├── public/index.html    # קובץ HTML תצוגתי אם רוצים גם מהשרת
│   └── app.ts               # נקודת כניסה לשרת Express
```

---

## 🌐 העלאת צד השרת ל-Render

1. היכנס ל-[https://render.com](https://render.com).
2. לחץ על "New Web Service".
3. חבר את הריפו של `wallet-server`.
4. הגדר את ה-Build Command:

```
npm install && npm run build
```

5. הגדר את Start Command:

```
node dist/app.js
```

6. ודא שפורט 3000 פתוח (`process.env.PORT` משומש).

---

## 🌐 העלאת צד לקוח ל-Netlify

1. היכנס ל-[https://app.netlify.com](https://app.netlify.com).
2. לחץ על "Add new site" > "Deploy manually".
3. בחר את תיקיית `wallet-client/` מהמחשב שלך.
4. לחץ על Deploy Site.
5. לאחר סיום תקבל לינק – לדוגמה:

```
https://stirring-scone-be6f45.netlify.app/
```

---

## ✅ שימוש באתר

1. גש ללינק באתר החי.
2. הזן את שמך.
3. לחץ על "Add to Wallet".
4. הכרטיס ייפתח מידית להוספה ל-Wallet באייפון (או ירד כקובץ במחשב).

---

## 📅 מה נדרש מהמשתמש?

* מכשיר תומך Apple Wallet (iPhone / Safari).
* שם להזנה בטופס.

---

## ⚡ טיפים למפתחים

* כדי ש-iPhone יפתח אוטומטית את הכרטיס – מומלץ להשתמש ב-`window.location.href = urlToPass`.
* קובץ `.pkpass` חייב להיחתם עם תעודה תקפה של Apple.
* אין גישת GET רגילה למסלול `/pass/generate` אלא רק אם שינית בקוד.

---

בהצלחה! ואם יש צורך – תתיידע 😉
