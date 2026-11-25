# Maci, un peluche para ti

Un regalo interactivo para Maci, dedicado al 25 de noviembre de 2026. HTML, CSS, JavaScript Vanilla y SVG; sin paquetes de producción, cuentas ni backend.

## Abrir en tu computadora

Desde esta carpeta:

```bash
python3 -m http.server 8080
```

Visita `http://localhost:8080`. Usa un servidor HTTP: los módulos JavaScript no se cargan correctamente al abrir `index.html` con `file://`.

## La experiencia

- Caja ilustrada que se abre, partículas y presentación del osito Miel.
- Nombre, dueña, cinco colores de lazo, tres accesorios y seis expresiones.
- Certificado de adopción descargable como PNG de 1400 × 1000 píxeles. La fecha corresponde al día de la primera adopción en el dispositivo.
- Abrazos contados, caricias, cosquillas, sueño y mensajes de cariño.
- Jardín con cinco corazones y sus cinco deseos. Al encontrarlos se desbloquean la carta y el abrazo final.
- Música de caja musical y efectos sintetizados con Web Audio API. Comienza en silencio; solo se reproduce con una interacción voluntaria. Si la preferencia quedó activada, se reanuda al abrir el regalo.
- Preferencias y progreso en `localStorage`, con manejo de almacenamiento no disponible. No se envían datos a un servidor.
- Navegación con teclado, controles táctiles y respeto por `prefers-reduced-motion`.

## Estructura

```text
peluche-para-ti/
├── index.html
├── css/
│   ├── main.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── illustrations.js
│   ├── storage.js
│   ├── audio.js
│   └── certificate.js
├── scripts/
│   └── build.mjs
├── tests/smoke.mjs
├── .openai/hosting.json
├── .gitignore
└── README.md
```

## Personalización

El nombre inicial `Maci` y el nombre del peluche `Miel` están en `js/storage.js`. Los textos de la dedicatoria y de la carta están en `index.html`; los mensajes interactivos y los cinco deseos, en `js/app.js`. La paleta está definida al principio de `css/main.css`. Las ilustraciones se construyen en `js/illustrations.js`.

Para volver a empezar en tu propio dispositivo, elimina la clave `peluche-para-maci-v1` desde el almacenamiento del navegador. Esto borra la personalización, los abrazos y el progreso guardado.

## Publicar gratis

No hay compilación obligatoria. Puedes publicar directamente esta carpeta:

- **GitHub Pages:** coloca su contenido en la raíz del repositorio o en `docs/`, y configura Settings → Pages para esa ubicación. Alternativamente, publícala como subcarpeta y abre `/peluche-para-ti/`.
- **Netlify:** arrastra la carpeta a Netlify Drop. Si conectas un repositorio, usa esta carpeta como directorio de publicación, sin comando de build.
- **Vercel:** selecciona el preset Other y esta carpeta como Root Directory, sin build.

Para generar una copia de publicación separada:

```bash
node scripts/build.mjs
```

El resultado queda en `dist/`. El archivo `.openai/hosting.json` es exclusivamente para el hosting de Sites; no es necesario en GitHub Pages, Netlify ni Vercel. Un sitio privado en Sites requiere acceso del propietario; para compartir por WhatsApp usa uno de los hostings públicos anteriores o configura explícitamente el acceso del sitio.

## Recursos y compatibilidad

Todas las ilustraciones SVG, la textura de papel y los sonidos fueron creados para este proyecto. Las fuentes son del sistema y no se realizan solicitudes a servicios externos. En Safari/iPhone, la imagen descargada puede aparecer en Archivos → Descargas; si se abre una vista previa, se puede guardar con Compartir.

Se realizaron comprobaciones de sintaxis de los módulos, integridad de recursos, siete pruebas de preferencias/fechas/ilustraciones y validación XML de 20 ilustraciones. Puedes ejecutar las pruebas con `node tests/smoke.mjs`. La vista previa en navegador no pudo ejecutarse en el entorno de desarrollo por restricciones para abrir sockets. Es recomendable realizar una comprobación visual final en Safari y Chrome móvil antes de enviar el enlace.
