# Frontend - Cabin Rentals Project 🏕️

Este es el frontend del proyecto web de alquiler de cabañas, desarrollado con [Next.js](https://nextjs.org/) y [TypeScript](https://www.typescriptlang.org/).

---

## 🚀 Inicio rápido

1. Cloná el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo-frontend.git
cd tu-repo-frontend
```

2. Instalá las dependencias:

```bash
npm install
# o
yarn install
```

3. Creá un archivo `.env` en la raíz del proyecto y completalo según el ejemplo:

```bash
cp .env.example .env
```

4. Iniciá el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Accedé a [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

---

## ⚙️ Variables de entorno

El archivo `.env` debe contener al menos la siguiente variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Esta URL debe apuntar al backend (API) que utiliza la aplicación.

---

## 📁 Estructura básica

- `/app`: configuración de rutas con el nuevo sistema de rutas de Next.js (App Router).
- `/components`: componentes reutilizables de la interfaz.
- `/styles`: archivos de estilos globales.
- `/public`: recursos públicos como imágenes y fuentes.

---

## 🛠️ Scripts disponibles

- `dev`: inicia el servidor en modo desarrollo.
- `build`: compila el proyecto para producción.
- `start`: levanta el servidor en producción después de compilar.
- `lint`: corre ESLint para detectar errores de código.

---

## 🧪 Dependencias clave

- `next`
- `react`
- `typescript`
- `tailwindcss` (si lo estás usando)
- `axios` para llamadas a la API
- `formik` y `yup` para formularios y validaciones
- `react-icons` para íconos

---

## 📦 Despliegue

Podés desplegar esta aplicación en plataformas como [Vercel](https://vercel.com/), que tiene integración nativa con proyectos Next.js.

---

## 📝 Notas

- Asegurate de que tu archivo `.env` **no esté versionado** (`.gitignore` ya lo incluye por defecto).
- Podés usar el archivo `.env.example` como referencia para otros desarrolladores.

---

## 📚 Licencia

Este proyecto es privado y forma parte del sistema de reservas y alquiler de cabañas desarrollado por Oscar Luciani.

