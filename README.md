# Mi Día — APK con avisos (aunque la app esté cerrada)

Los avisos se programan **dentro del teléfono** (notificaciones locales de Android): no necesitas servidor ni internet.
El APK se genera gratis en GitHub; no hace falta instalar Android Studio.

## Pasos (desde una computadora)

1. Crea una cuenta gratis en **github.com** y un repositorio nuevo (puede ser privado), por ejemplo `mi-dia`.
2. En el repositorio: **Add file → Upload files** y arrastra **el contenido** de esta carpeta
   (`www`, `resources`, `tools`, `package.json`, `capacitor.config.json`, `README.md`, `.gitignore`). Pulsa **Commit changes**.
3. Los archivos que empiezan con punto a veces no se suben. Crea el flujo a mano:
   **Add file → Create new file**, nombre: `.github/workflows/build-apk.yml`
   y pega el contenido de `build-apk.yml.txt`. Pulsa **Commit changes**.
4. Ve a la pestaña **Actions**. Verás "Crear APK" ejecutándose (tarda unos 5–8 minutos). Si no arrancó: *Crear APK → Run workflow*.
5. Cuando termine con ✓, ábrelo y baja a **Artifacts** → descarga **Mi-Dia-APK** (un .zip con `app-debug.apk` adentro).
6. Pasa `app-debug.apk` al teléfono, ábrelo e instala (permite "instalar apps desconocidas" si lo pide).
   Desinstala antes la versión hecha con *HTML to APK Builder*.

## En el teléfono

1. Abre Mi Día → 🔔 → **Activar avisos** → permite las notificaciones.
   Debe decir: "✓ Avisos programados en tu teléfono".
2. Toca **Probar aviso**: debe llegar una notificación del sistema.
3. **Muy importante en Xiaomi/Redmi (MIUI/HyperOS), Huawei, Oppo, Vivo, Samsung:** el sistema mata las apps y bloquea los avisos.
   Ajustes → Apps → Mi Día:
   - **Inicio automático**: activado
   - **Ahorro de batería**: *Sin restricciones*
   - **Notificaciones**: permitidas (con sonido y ventana emergente)
   En Android 12+ si pide "Alarmas y recordatorios", permítelo.

## Cómo editar la app después
Cambia `www/index.html`, súbelo a GitHub (Add file → Upload files, reemplaza) y se genera un APK nuevo.
Tus actividades se guardan en el teléfono; si **desinstalas** la app se borran.

## Repetir actividades
Al crear o editar una actividad, en **Repetir** elige:
- **No se repite** (una sola vez, como antes).
- **Todos los días**: aparece cada día desde la fecha de inicio.
- **Todos los [día]**: aparece cada semana el mismo día (el nombre cambia según la fecha: lunes, martes…).

Cada repetición se marca como hecha por separado (marcar hoy no marca mañana) y las compras también.
Al eliminar una actividad repetida puedes borrar **solo ese día**, **ese día y los siguientes**, o **todas**.
Los avisos se programan para los próximos 30 días cada vez que abres la app o guardas un cambio;
abre la app de vez en cuando para que se sigan programando.

## Diseño (ADSAGO)
- **Pantalla de carga**: logo al centro y marca ADSAGO abajo (dura ~1.8 s). Se edita en `www/index.html` (`<div id="splash">`).
- **Stickers por categoría**: busca `STICKERS` en `www/index.html` y cambia el emoji de cada categoría.
- Tipografía **Inter** incrustada en la app: se ve igual sin internet.
- Ícono de tema: sol en modo claro, luna en modo oscuro. Campana: con punto si los avisos están activos, tachada si no.
