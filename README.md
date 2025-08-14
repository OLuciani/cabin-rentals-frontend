# Frontend - Cabin Rentals Project 🏕️

Este es el frontend del proyecto web de alquiler de cabañas, desarrollado con [Next.js](https://nextjs.org/) y [TypeScript](https://www.typescriptlang.org/) aplicando una arquitectura basada en capas y organizada por funcionalidades (feature-based).

---

## 🌐 Proyecto desplegado

La aplicación ya se encuentra desplegada y disponible para su uso:

* 🔗 **Frontend en producción**: [https://cabin-rentals-frontend.vercel.app](https://cabin-rentals-frontend.vercel.app)
* ⚙️ **Backend en producción (API)**: [https://cabin-rentals-backend.onrender.com/api/health](https://cabin-rentals-backend.onrender.com/api/health)

🛠️ El backend funciona como una API REST que da soporte al frontend. Incluye una ruta pública `/api/health` para verificar rápidamente que la API está activa.

---

## ☁️ Hosting y disponibilidad

El backend está desplegado en el plan gratuito de Render, que suspende la aplicación tras 15 minutos de inactividad. El frontend está desplegado en el plan gratuito de Vercel, con despliegue rápido y escalabilidad automática, aunque pueden ocurrir tiempos de arranque en frío tras periodos de inactividad.

---

## 🚀 Inicio rápido

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo-frontend.git
cd tu-repo-frontend
```

2. Instalar dependencias:

```bash
npm install
# o
yarn install
```

3. Crear archivo de entorno:

```bash
cp .env.example .env
```

4. Iniciar servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Accedé a [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

## ⚙️ Variables de entorno

El archivo `.env` debe contener al menos la siguiente variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 📁 Estructura básica

* `/app`: rutas con el App Router de Next.js
* `/components`: componentes reutilizables
* `/styles`: estilos globales
* `/public`: recursos públicos como imágenes y fuentes

---

## 🛠️ Tecnologías y prácticas demostradas

* Next.js y TypeScript
* TailwindCSS para estilos
* Axios para llamadas a API
* Formik y Yup para formularios y validaciones
* React Icons para íconos
* Arquitectura feature-based y separación de lógica
* Zustand para estado global y control de roles
* Persistencia de login y sincronización de datos con cookies
* Componentes reutilizables y responsive
* Buen manejo de errores y validaciones consistentes
* Despliegue en servicios modernos (Vercel y Render) usando planes gratuitos

---

## 📦 Despliegue

Podés desplegar esta aplicación en plataformas como [Vercel](https://vercel.com/), que tiene integración nativa con proyectos Next.js.

---

## 📝 Notas

* Asegurate de que tu archivo `.env` no esté versionado.
* Podés usar `.env.example` como referencia para otros desarrolladores.

---

## 📚 Licencia

Este proyecto es privado y forma parte del sistema de reservas y alquiler de cabañas desarrollado por Oscar Luciani.
