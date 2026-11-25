# Un peluche para Maci

Una experiencia web personalizada para celebrar el Día de Regalar Peluches, el 25 de noviembre de 2026.

El proyecto está en [`peluche-para-ti/`](peluche-para-ti/), con SVG originales, personalización, certificado descargable, minijuego, carta secreta y música sintetizada. Sin frameworks ni backend.

```bash
cd peluche-para-ti
python3 -m http.server 8080
```

Abre `http://localhost:8080`. Consulta el [README del proyecto](peluche-para-ti/README.md) para personalizarlo y publicarlo gratis.

## Acceso desde celular o PC

El workflow [Publicar regalo de Maci](.github/workflows/deploy-pages.yml) comprueba el código y publica el contenido de `peluche-para-ti/dist` en GitHub Pages cada vez que se actualiza `main`.

Para la primera publicación, entra en **Settings → Pages → Build and deployment → Source** y selecciona **GitHub Actions**. Después ejecuta el workflow desde **Actions → Publicar regalo de Maci → Run workflow**, si la primera ejecución falló antes de activar Pages.

Una vez que el despliegue termine correctamente, la dirección será:

**https://DieguitoBot.github.io/ArchiMaci/**

La misma dirección sirve para teléfonos, tablets y computadoras; no requiere instalación.
