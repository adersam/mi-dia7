// Se ejecuta después de `npx cap add android`: permisos de avisos + íconos de la app.
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const manifest = path.join(root, "android/app/src/main/AndroidManifest.xml");
const res = path.join(root, "android/app/src/main/res");

let x = fs.readFileSync(manifest, "utf8");
const perms = ["POST_NOTIFICATIONS", "SCHEDULE_EXACT_ALARM", "USE_EXACT_ALARM", "RECEIVE_BOOT_COMPLETED", "VIBRATE", "WAKE_LOCK"];
const add = perms.filter(p => !x.includes(`android.permission.${p}"`)).map(p => `    <uses-permission android:name="android.permission.${p}" />`).join("\n");
if (add) x = x.replace("</manifest>", add + "\n</manifest>");
fs.writeFileSync(manifest, x);

// Íconos: quita el ícono adaptativo por defecto y usa los PNG de resources/
fs.rmSync(path.join(res, "mipmap-anydpi-v26"), { recursive: true, force: true });
for (const d of fs.readdirSync(path.join(root, "resources"))) {
  const from = path.join(root, "resources", d), to = path.join(res, d);
  fs.mkdirSync(to, { recursive: true });
  for (const f of fs.readdirSync(from)) fs.copyFileSync(path.join(from, f), path.join(to, f));
}
// Arranque nativo: fondo crema liso (en vez del logo por defecto de Capacitor), igual que la pantalla de carga de la app.
try {
  const values = path.join(res, "values");
  fs.mkdirSync(values, { recursive: true });
  fs.writeFileSync(path.join(values, "colors_splash.xml"),
    '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="splash_bg">#F7F1E6</color>\n</resources>\n');
  const stylesPath = path.join(values, "styles.xml");
  let st = fs.readFileSync(stylesPath, "utf8");
  // Android 11 o menos: fondo crema + logo (drawable/splash_screen.xml)
  st = st.replace(/<item name="android:background">@drawable\/splash<\/item>/g, '<item name="android:background">@drawable/splash_screen</item>');
  // Android 12 o más: el sistema dibuja el arranque con estos atributos
  if (st.includes("Theme.SplashScreen") && !st.includes("windowSplashScreenBackground")) {
    st = st.replace(/(<style name="AppTheme\.NoActionBarLaunch"[^>]*>)/,
      '$1\n        <item name="windowSplashScreenBackground">@color/splash_bg</item>\n        <item name="windowSplashScreenAnimatedIcon">@drawable/splash_logo</item>');
  }
  fs.writeFileSync(stylesPath, st);
} catch (e) { console.log("Aviso: no se pudo ajustar el arranque nativo:", e.message); }
console.log("Android preparado: permisos, íconos y pantalla de arranque.");
