# CiviTable PWA

Offline-first progressive web app for Civil Engineering timetable (Semester V).

## ✅ Features
- Installable (Add to Home Screen / Desktop) via Web App Manifest
- Full offline support (app shell + data.js) after first successful load
- Runtime caching for same-origin assets (images / JS / CSS)
- Automatic update flow with in-app reload prompt

## 🧱 Project Structure
```
index.html        # App shell
data.js           # Static timetable + course data
sw.js             # Service Worker (Workbox + custom fallback)
workbox-*.js      # Workbox runtime file
manifest.json     # PWA Manifest
images/           # Icons
src/styles.css    # Tailwind source (ensure built to dist/styles.css if using Tailwind build)
dist/styles.css   # (Expected) Compiled stylesheet referenced by index.html
```

## 🚀 Getting Started (Local)
Serve the root folder with any static server over HTTP(S). Examples:

### Node (http-server)
```
npm install -g http-server
http-server -c-1 -p 5173 .
```
Visit: http://localhost:5173

### Python 3
```
python -m http.server 5173
```

## 📦 Tailwind / styles.css
The HTML points to `./dist/styles.css`. If you haven't built Tailwind yet:
1. Install Tailwind locally (optional enhancement)
2. Build into `dist/styles.css`

If you skip Tailwind build, create a minimal placeholder file so it is cached:
```
mkdir dist
echo '/* placeholder */' > dist/styles.css
```

## 🔐 Offline Behavior Details
After first load with network:
- Core assets listed in `CORE_ASSETS` inside `sw.js` are cached.
- Navigations when offline return the cached `index.html`.
- `data.js` uses Stale-While-Revalidate: cached instantly, updated quietly.

If you clear browser storage (Application Data / Site Data), caches are removed—no web app can persist after a full data purge. Just reopen once online to repopulate.

## ♻️ Updating the App
1. Modify files (e.g., `data.js` or UI).
2. Bump `APP_VERSION` constant in `sw.js` to force clients to fetch the new service worker.
3. Deploy.
4. Users with the app open will see an “A new version is available!” banner.

## 🧪 Testing Offline
1. Open DevTools → Application → Service Workers.
2. Confirm `sw.js` is active.
3. Go to Network tab → set to Offline.
4. Refresh → App should still load with timetable.

## 🛠 Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| Offline reload shows browser error | SW not installed yet | Open online once; check for registration console log |
| Styles missing offline | `dist/styles.css` not present/cached | Create/build the file or remove the link in HTML |
| Update banner never appears | Version not bumped | Increment `APP_VERSION` in `sw.js` |
| Data not updating | SW still serving old cache | Close all app tabs; reopen (forces new SW to take control) |

## 🌐 Deploying to GitHub Pages
You can host directly from this repository using GitHub Pages.

### 1. Repository Setup
If your repository name is `civitable` and your username is `your-user`, the site will be served at:
`https://your-user.github.io/civitable/`

### 2. Ensure Correct Paths
Already handled:
- `manifest.json` uses relative `start_url` and `scope` ("./").
- `sw.js` uses relative paths for `CORE_ASSETS`.
- Service worker registered with `./sw.js`.
- Added `404.html` to redirect deep links back to `index.html` (GitHub Pages SPA pattern).

### 3. Enable Pages
GitHub → Settings → Pages → Set source to `main` (or `gh-pages` branch) and root folder.

### 4. Optional: Custom Domain
Add `CNAME` file at root containing your domain. Update links if you stop using a subpath.

### 5. Hard Refresh After Deploy
If users had an older version loaded: advise pressing Ctrl+F5 (desktop) once after an update if the update banner wasn't accepted.

### 6. Tailwind Build (If Needed)
If you integrate a build step later, add an action that runs Tailwind and commits `dist/styles.css` before publishing.

## 🧪 Quick GitHub Pages Publish Steps
1. Commit all files.
2. Push to GitHub.
3. Enable Pages (if first time).
4. Visit the published URL once online so the service worker can cache assets.
5. Then test offline.

## 🔒 Limitations
No PWA can survive: clearing browser site data, uninstalling the app, or OS storage reclamation under pressure. These are platform-controlled.

## 📄 License
Add a license file (e.g., MIT) if you intend to open source.

---
Happy building! If you want background sync, push notifications, or dynamic API layering next, those can be added incrementally.