/**
 * ARCHIVO DE DATOS DE PROYECTOS
 * ==============================
 *
 * Este archivo centraliza todos los proyectos que aparecen en tu portfolio.
 * Es la fuente de datos principal para la sección de proyectos.
 *
 * PROPÓSITO:
 * - Define la estructura de datos de cada proyecto
 * - Almacena información bilingüe (español/inglés)
 * - Soporta múltiples tipos de enlaces y contenido multimedia
 * - Permite marcar proyectos como destacados (PINNED)
 *
 * ARQUITECTURA:
 * - TypeScript para type-safety y validación
 * - Soporte bilingüe completo en todos los campos de texto
 * - Propiedades opcionales (demo, web, images, etc.) para flexibilidad
 * - Sistema de filtrado por tecnologías (tech array)
 *
 * CÓMO AÑADIR UN PROYECTO:
 * 1. Copia uno de los ejemplos existentes
 * 2. Modifica los campos según tu proyecto
 * 3. Añádelo al array projectsData
 * 4. Guarda - Astro recargará automáticamente
 *
 * CÓMO ELIMINAR UN PROYECTO:
 * 1. Localiza el objeto del proyecto en el array
 * 2. Elimina desde { hasta }, (incluyendo la coma)
 * 3. Guarda el archivo
 */

/**
 * INTERFAZ: Project
 * -----------------
 * Define la estructura de datos que debe tener cada proyecto.
 * TypeScript usa esta interfaz para validar que no falten campos obligatorios.
 *
 * PROPIEDADES OBLIGATORIAS:
 * - title: Título del proyecto (bilingüe)
 * - description: Descripción breve que aparece en la tarjeta (bilingüe, soporta HTML)
 * - tech: Array de tecnologías/skills usadas
 * - featured: Boolean que indica si es proyecto destacado (PINNED)
 *
 * PROPIEDADES OPCIONALES:
 * - explanation: Descripción extendida para modal (bilingüe, soporta HTML)
 * - link: URL al código fuente (GitHub)
 * - demo: URL a demo en vivo
 * - web: URL al sitio web oficial
 * - csv: Ruta a archivo descargable (CSV o cualquier formato)
 * - images: Array de rutas a screenshots para galería
 *
 * TIPOS DE BOTONES QUE SE MUESTRAN:
 * - [demo] - Si demo !== null
 * - [code] - Si link !== null
 * - [web] - Si web !== null
 * - [images] - Si images !== null y images.length > 0
 * - [explicación] - Si explanation !== undefined
 * - [csv] - Si csv !== null
 */
export interface Project {
  // TÍTULO (Obligatorio)
  // Aparece como encabezado principal del proyecto
  title: { // Título en español
    en: string;  // Título en inglés
  };

  // DESCRIPCIÓN (Obligatorio)
  // Texto que aparece en la tarjeta del proyecto
  // SOPORTA HTML: Puedes usar <strong>, <br>, <span>, etc.
  description: { // Descripción en español
    en: string;  // Descripción en inglés
  };

  // EXPLICACIÓN EXTENDIDA (Opcional)
  // Si se define, aparece botón [explicación] que abre modal con este contenido
  // Útil para proyectos complejos que necesitan más contexto
  explanation?: { // Explicación en español
    en: string;  // Explicación en inglés
  };

  // TECNOLOGÍAS (Obligatorio)
  // Array de strings con las tecnologías/skills usadas
  // Se muestra como etiquetas bajo el proyecto y permite filtrado
  // Ejemplo: ["React", "Node.js", "PostgreSQL", "Docker"]
  tech: string[];

  // CÓDIGO FUENTE (Opcional)
  // URL al repositorio de GitHub (o similar)
  // Si es null, no se muestra botón [code]
  link: string | null;

  // DEMO EN VIVO (Opcional)
  // URL a una versión funcional del proyecto
  // Si es null, no se muestra botón [demo]
  demo: string | null;

  // SITIO WEB (Opcional)
  // URL al sitio web oficial del proyecto
  // Si es null, no se muestra botón [web]
  web: string | null;

  // ARCHIVO DESCARGABLE (Opcional)
  // Ruta a archivo CSV u otro formato descargable
  // Debe estar en public/assets/ para ser accesible
  // Si es null, no se muestra botón [csv]
  csv: string | null;

  // DESTACADO (Obligatorio)
  // true = aparece con badge "PINNED" al inicio de la lista
  // false = aparece en orden normal
  featured: boolean;

  // GALERÍA DE IMÁGENES (Opcional)
  // Array de rutas a screenshots del proyecto
  // NO incluir extensión (.png, .jpg) - se añade automáticamente
  // Si es null o array vacío, no se muestra botón [images]
  // Rutas relativas a public/ (ejemplo: "/screenshots/proyecto/img-01")
  images: string[] | null;
}

/**
 * ARRAY: projectsData
 * -------------------
 * Contiene todos los proyectos del portfolio.
 * Se exporta para uso en componentes y utilidades.
 *
 * ORDEN:
 * - Los proyectos con featured: true aparecen primero
 * - Luego los demás en el orden que los defines aquí
 *
 * EJEMPLOS INCLUIDOS:
 * 1. Proyecto Completo: Muestra TODAS las opciones disponibles
 * 2. Proyecto Destacado: Solo algunas opciones, featured: true
 * 3. Proyecto Regular: Configuración básica estándar
 * 4. Proyecto Simple: Mínimo necesario
 *
 * REEMPLAZA ESTOS EJEMPLOS CON TUS PROYECTOS REALES
 */
export const projectsData: Project[] = [
  /**
   * TIPO 1: PROYECTO COMPLETO
   * --------------------------
   * Este ejemplo muestra TODAS las opciones disponibles.
   * Tiene: featured, demo, code, web, images, explanation, csv
   *
   * USA ESTE COMO PLANTILLA para proyectos con muchas características.
   *
   * BOTONES QUE MUESTRA:
   * [demo] [code] [web] [images] [explicación] [csv] + badge PINNED
   * 
   */
  {
    title: {
      en: "AlertEYE"
    },
    description: {
      // SOPORTA HTML: <strong>, <br>, <span>, etc.
      en: "<strong>Real-time driver monitoring and rewarding system.</strong><br><br>Developed android application for risk detection, instant alerts and reward engine and an IOT hardware device using Arduino sensors to further detect driver behavior. Implemented computer-vision-based drowsiness detection using OpenCV and pre-trained machine learning models."
    },    
    // {
    //   // OPCIONAL: Descripción detallada que aparece en modal
    //   // Útil para explicar contexto, arquitectura, resultados, métricas
    //   en: "Here goes the EXTENDED explanation of the project (optional).<br><br><strong>Section 1:</strong><br>• Point 1<br>• Point 2<br>• Point 3<br><br><strong>Section 2:</strong><br>• Additional detail<br>• More information<br><br>Use this field to give detailed context of the project."
    // },
    tech: ["Arduino", "Android Studio", "Java", "Firebase", "Google Maps API", "OpenCV", "Python"], // CAMBIAR: Reemplaza con tecnologías reales (React, Node, etc.)
    link: "https://github.com/sathindudezoysa/AlertEYE", // CAMBIAR: URL de tu repositorio GitHub
    demo: "https://www.instagram.com/p/DBAzdklM0_y/", // CAMBIAR: URL de tu demo en vivo (Vercel, Netlify, etc.)
    web: null, // CAMBIAR: URL del sitio web oficial
    csv: null, // CAMBIAR: Ruta a tu archivo CSV en public/assets/
    featured: true, // true = aparece como "PINNED" al inicio
    images: [ // CAMBIAR: Rutas a tus screenshots (sin extensión .png, .jpg)
      "/screenshots/alertEye/1768631005012.jpeg",
      "/screenshots/alertEye/1768630937847.jpeg",
      "/screenshots/alertEye/1768630908769.jpeg"
    ]
  },

  /**
   * TIPO 2: PROYECTO DESTACADO
   * ---------------------------
   * Proyecto importante pero con menos opciones que el completo.
   * Tiene: featured, code, web (sin demo, csv, images, explanation)
   *
   * USA ESTE COMO PLANTILLA para proyectos destacados simples.
   *
   * BOTONES QUE MUESTRA:
   * [code] [web] + badge PINNED
   */
  {
    title: {
      en: "Sentinel Store"
    },
    description: {
      en:
      `
      <strong>Distributed File Storage System with ZooKeeper </strong>
      <br/>
      <br/>
      This project implements a fault-tolerant distributed file storage system using ZooKeeper for leader election and a consensus algorithm for maintaining data consistency across nodes.
      `
    },
    // Sin explanation = no aparece botón [explicación]
    tech: ["Apache ZooKeeper", "Fault Tolerant Systems", "Distributed Systems"],
    link: "https://github.com/sathindudezoysa/SentinelStore",
    demo: null, // null = no mostrar botón [demo]
    web: null,
    csv: null, // null = no mostrar botón [csv]
    featured: true, // PINNED
    images: null // null = no mostrar botón [images]
  },

  /**
   * TIPO 3: PROYECTO REGULAR
   * -------------------------
   * Proyecto estándar sin destacar.
   * Tiene: code, demo (sin featured, web, images, explanation, csv)
   *
   * USA ESTE COMO PLANTILLA para proyectos normales.
   *
   * BOTONES QUE MUESTRA:
   * [demo] [code]
   */
  {
    title: {
      en: "Rahasak"
    },
    description: {
      en: `
      <strong>End-to-End Encrypted Messaging Platform</strong><br><br>
      Rahasak (meaning "Secret" or "Whisper" in Sinhala) is a secure, end-to-end encrypted messaging platform designed to prioritize user privacy and trust. Unlike traditional messaging apps that rely on centralized servers for key distribution, Rahasak introduces a novel physical key exchange protocol, allowing users to establish trust offline before communicating.
      `
    },
    tech: ["Encryption", " Private Key Management", "Public Key Cryptography", "Apache Kafka", "Next.js"],
    link: "https://github.com/yourusername/project-repo",
    demo: "https://project-demo.com",
    web: null,
    csv: null,
    featured: true, // false = NO aparece como destacado
    images: null
  },

  /**
   * TIPO 4: PROYECTO SIMPLE
   * ------------------------
   * Configuración mínima: solo código y tecnologías.
   * Tiene: code (todo lo demás null/false)
   *
   * USA ESTE COMO PLANTILLA para proyectos básicos o en desarrollo.
   *
   * BOTONES QUE MUESTRA:
   * [code] solamente
   */
  {
    title: {
      en: "TestLang++"
    },
    description: {
      en: `
      <strong>API Testing DSL Compiler</strong><br><br>
      The compiler is built using Flex (Lex) and Bison (Yacc) with code generation in C. It parses a custom .test file (like example.txt) and translates it into a complete, runnable JUnit 5 Java test class (GeneratedTests.java). This generated class uses the native java.net.http.HttpClient to execute the defined API tests against a backend.`
    },
    tech: ["C", "Lex", "Yacc", "Compiler Theory"],
    link: "https://github.com/sathindud/JavaCompiler/tree/main/new",
    demo: null, // Todo null = solo muestra [code]
    web: null,
    csv: null,
    featured: false,
    images: null
  }
];

/**
 * GUÍA RÁPIDA DE PERSONALIZACIÓN
 * ===============================
 *
 * PASO 1: ELIMINAR EJEMPLOS
 * Borra los 4 proyectos de ejemplo de este archivo.
 *
 * PASO 2: AÑADIR TUS PROYECTOS
 * Copia uno de los tipos de ejemplo según tus necesidades:
 * - Tipo 1: Proyecto completo con todas las opciones
 * - Tipo 2: Proyecto destacado simple
 * - Tipo 3: Proyecto regular estándar
 * - Tipo 4: Proyecto mínimo solo código
 *
 * PASO 3: PERSONALIZAR CAMPOS
 * Cambia los valores de cada campo:
 * - title: Nombre de tu proyecto (español e inglés)
 * - description: Qué hace y por qué es interesante
 * - tech: Tecnologías que usaste
 * - link: URL de tu repo GitHub
 * - demo/web/csv/images: URLs/rutas según disponibilidad
 * - featured: true si quieres que aparezca como PINNED
 *
 * PASO 4: AÑADIR SCREENSHOTS (OPCIONAL)
 * Si tu proyecto tiene imágenes:
 * 1. Crea carpeta en public/screenshots/nombre-proyecto/
 * 2. Añade imágenes numeradas: screenshot-01.png, screenshot-02.png, etc.
 * 3. Crea thumbnails en public/thumbnails/screenshots/nombre-proyecto/
 * 4. Añade rutas en el campo images (sin extensión)
 *
 * PASO 5: GUARDAR Y VERIFICAR
 * Guarda el archivo y verifica en http://localhost:4321
 *
 * EJEMPLO REAL:
 * {
 *   title: {
 *     es: "E-commerce de Zapatos",
 *     en: "Shoe E-commerce"
 *   },
 *   description: {
 *     es: "<strong>Tienda online completa.</strong><br><br>E-commerce con carrito, checkout y pasarela de pago. Incluye panel de administración, gestión de inventario y analytics. <strong>React</strong>, <strong>Stripe</strong>, <strong>MongoDB</strong>.",
 *     en: "<strong>Complete online store.</strong><br><br>E-commerce with cart, checkout and payment gateway. Includes admin panel, inventory management and analytics. <strong>React</strong>, <strong>Stripe</strong>, <strong>MongoDB</strong>."
 *   },
 *   tech: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
 *   link: "https://github.com/tu-usuario/ecommerce-zapatos",
 *   demo: "https://zapatos-demo.vercel.app",
 *   web: "https://www.zapatosonline.com",
 *   csv: null,
 *   featured: true,
 *   images: [
 *     "/screenshots/ecommerce-zapatos/home",
 *     "/screenshots/ecommerce-zapatos/producto",
 *     "/screenshots/ecommerce-zapatos/carrito",
 *     "/screenshots/ecommerce-zapatos/checkout"
 *   ]
 * }
 */
