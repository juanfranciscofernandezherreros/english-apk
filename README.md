# Easy English para Android

La APK de **Easy English** muestra la misma web publicada en https://jnfz92.github.io/ cuando el teléfono tiene conexión. Así, la interfaz, los artículos, el curso por niveles, los exámenes, el perfil y la comunidad se actualizan **desde la web sin tener que volver a compilar la APK**.

La aplicación sigue siendo Cordova para Android y conserva el identificador \`com.easyenglish.grammarbook\`, de forma que se puede instalar como actualización de la app anterior.

## ¿Qué cambia?

- **Con internet:** la pantalla de inicio \`www/start.html\` comprueba que GitHub Pages responde y abre \`https://jnfz92.github.io/index.html\` **dentro de la aplicación**. Toda la navegación del dominio sigue siendo la web real, con su CSS, JS y datos de Supabase. Los enlaces a otras webs se derivan al navegador externo.
- **Sin internet al iniciar:** la aplicación ofrece abrir \`www/index.html\`, el curso original incluido dentro de la APK, que funciona sin conexión. El usuario puede volver a intentar conectar.
- **Cuentas:** el inicio de sesión, los exámenes guardados y el perfil en modo web usan las mismas cuentas y datos de Supabase que el sitio. **No** se transfieren automáticamente las sesiones ni el progreso almacenado localmente por la versión anterior: son orígenes distintos. Es posible que debas iniciar sesión de nuevo.
- **Requisitos:** la experiencia web y las consultas a Supabase necesitan acceso a internet. El contenido del curso local sigue disponible sin conexión al abrir la aplicación; no es una copia offline de toda la web.
- **Descargas de PDF y enlaces externos:** dependen de la compatibilidad de Android WebView o del navegador externo; comprobarlos en un móvil real.

## Código

- \`config.xml\`: inicio por \`start.html\` y navegación limitada a \`https://jnfz92.github.io/*\`.
- \`www/start.html\`: arranque web y ruta alternativa sin conexión.
- \`www/index.html\`, \`www/account-auth.js\` y datos locales: contenido y funcionalidad del curso antiguo para acceder sin internet.
- \`scripts/test-launcher.mjs\`: tests del arranque, URL y ruta offline.
- \`.github/workflows/build-android.yml\`: construcción automática y publicación de la APK de prueba.

**La fuente de verdad del contenido y diseño web es** https://github.com/jnfz92/jnfz92.github.io. No es necesario duplicarla en este repositorio.

## Probar y compilar

Se requiere Node.js, Java 17, Android SDK y las herramientas Android de Cordova.

\`\`\`sh
npm install
npm run test:launcher
npm run build:android
\`\`\`

APK generada en \`dist/EnglishAPK.apk\`. El flujo de GitHub Actions también publica la APK en el release \`apk-latest\` cuando los cambios llegan a \`main\`.

**Validación pendiente antes de publicar:** instalar en Android y probar navegación interna y botón atrás, login/logout, Supabase, exámenes, enlaces y descarga de PDF. Estas pruebas no se pueden sustituir con comprobaciones de código.
