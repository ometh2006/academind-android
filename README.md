# 🎓 AcadeMind – Android App

> AI-powered academic study dashboard. Built with **Capacitor** (JavaScript) — no Android Studio needed!

---

## 📱 Features
- **100% offline** — all data stored on-device (localStorage)  
- **AI Tutor** — powered by Pollinations.ai (free, works when online)  
- Dashboard · Subjects · Analytics · Test History · AI Chat  
- Dark & Light themes · Charts · Grade tracking  
- Bottom navigation bar optimised for Android

---

## 🚀 How to Build Your APK (No Android Studio!)

You only need: **a GitHub account** (free) and **a phone**.

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) → Log in or sign up (free)
2. Click **"+"** (top right) → **"New repository"**
3. Name it: `academind-android`
4. Set it to **Public** ✅
5. Click **"Create repository"**

---

### Step 2 — Upload These Files

In your new GitHub repository:

1. Click **"Add file"** → **"Upload files"**
2. Drag and drop ALL files from this folder:
   ```
   academind-android/
   ├── www/
   │   ├── index.html       ← the full app
   │   ├── sw.js            ← offline service worker  
   │   ├── manifest.json    ← PWA manifest
   │   └── icons/
   │       └── icon-512.png ← your app icon
   ├── .github/
   │   └── workflows/
   │       └── build-apk.yml ← the magic auto-builder
   ├── package.json
   ├── capacitor.config.json
   └── README.md
   ```
3. Scroll down → type commit message: `Initial commit`  
4. Click **"Commit changes"**

> ⚠️ **Important:** Make sure `.github/workflows/build-apk.yml` is uploaded — this is what builds your APK!

---

### Step 3 — Enable GitHub Actions

1. In your repo, click the **"Actions"** tab
2. If prompted, click **"I understand my workflows, go ahead and enable them"**
3. You'll see **"Build AcadeMind APK"** workflow appear
4. It will automatically start building! (Takes ~5-8 minutes)

---

### Step 4 — Download Your APK

**Option A — From Actions (fastest):**
1. Click **Actions** tab → click the latest run
2. Scroll down to **"Artifacts"**
3. Click **"AcadeMind-debug-apk"** to download
4. Extract the zip → you have `app-debug.apk`!

**Option B — From Releases (after first build):**
1. Click **"Releases"** on the right side of your repo
2. Download `app-debug.apk` directly

---

### Step 5 — Install on Your Android Phone

1. **Transfer the APK** to your phone (USB, WhatsApp to yourself, Google Drive, etc.)
2. On your phone: **Settings → Security → Install unknown apps** → Allow your file manager
3. Tap the APK file → **Install**
4. Open **AcadeMind** from your app drawer! 🎉

---

## 🔁 Updating the App

Whenever you want to update (e.g., after making changes):
1. Edit files on GitHub directly (click the file → pencil icon)
2. Commit changes
3. GitHub Actions automatically builds a new APK within minutes!

---

## 🤖 AI Features

The AI Tutor uses **Pollinations.ai** (free, no API key needed):
- ✅ Works when you have internet
- ✅ Has access to your student profile and grades
- ✅ Can create study plans, explain concepts, analyse performance
- ⚠️ Shows offline message when no internet (everything else still works)

---

## 📂 Tech Stack

| Layer | Technology |
|-------|-----------|
| App Framework | Capacitor 6 (wraps HTML/JS in native Android) |
| Language | JavaScript (same as the original web app) |
| Offline | Service Worker + localStorage |
| Charts | Chart.js |
| AI | Pollinations.ai (free GPT) |
| Build | GitHub Actions (free cloud CI/CD) |

**Why JavaScript over Kotlin?**  
Your app is already 100% built in HTML/JS. Wrapping it with Capacitor means:
- Zero code rewrite
- Identical look and feel
- Same JS logic — no bugs from translation
- Kotlin would require rebuilding everything from scratch

---

## 🛠 Troubleshooting

**Build failed?**
- Click the failed action → read the red error message
- Most common: Ensure all files were uploaded correctly (especially `.github/workflows/build-apk.yml`)

**App won't install?**
- Enable "Install unknown apps" in phone Settings
- Make sure you downloaded the right file (`.apk`, not `.zip`)

**AI not working?**
- Check internet connection
- Pollinations.ai is free but may have rate limits — try again in a minute

---

## 📝 License

Free to use and modify for personal/educational purposes.
