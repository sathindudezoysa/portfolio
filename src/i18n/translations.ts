/**
 * ARCHIVO DE TRADUCCIONES (i18n)
 * ===============================
 *
 * Este archivo contiene todas las traducciones del template en formato bilingüe
 * (Español/Inglés). Es la fuente central de todo el texto que aparece en la interfaz.
 *
 * ARQUITECTURA:
 * - Usa TypeScript para type-safety y autocompletado
 * - Define una interfaz que garantiza consistencia entre idiomas
 * - Soporta HTML en los valores de traducción (con <br>, <span>, etc.)
 * - Incluye detección automática del idioma del navegador
 *
 * CÓMO PERSONALIZAR:
 * 1. Busca el texto que quieres cambiar en la sección 'es' (línea 62)
 * 2. Modifica el valor según tus necesidades
 * 3. IMPORTANTE: Repite el cambio en la sección 'en' (línea 90) en inglés
 * 4. Guarda el archivo - Astro recargará automáticamente
 *
 * REGLAS DE EDICIÓN:
 * - SIEMPRE modifica ambos idiomas (es y en) para mantener paridad
 * - Puedes usar HTML básico: <br>, <strong>, <span class="...">
 * - El texto {year} se reemplaza automáticamente por el año actual
 * - Mantén el formato de comandos terminal ($ whoami, cd, etc.) para coherencia visual
 */

/**
 * INTERFAZ: Translations
 * ----------------------
 * Define la estructura de todas las traducciones disponibles.
 * Garantiza que ambos idiomas tengan exactamente las mismas propiedades.
 *
 * SECCIONES:
 * - Navigation & Meta: Títulos, descripciones SEO
 * - Hero Section: Sección principal de presentación
 * - Projects Section: Textos relacionados con proyectos
 * - Contact Section: Información de contacto en footer
 * - Footer: Copyright y estado del sitio
 */
export interface Translations {
  // Navigation & Meta
  siteTitle: string;          // Título que aparece en pestaña del navegador
  siteDescription: string;    // Descripción para motores de búsqueda (SEO)

  // Hero Section (Sección principal)
  heroGreeting: string;       // Comando inicial "$ whoami"
  heroTitle: string;          // Tu nombre o marca personal
  heroSubtitle: string;       // Tu título profesional
  heroDescription: string;    // Descripción profesional (soporta HTML)
  heroCta: string;            // Texto del botón de navegación "cd ~/projects"
  heroTemplateButton: string; // Texto del botón "git clone template"

  // Projects Section (Sección de proyectos)
  projectsTitle: string;      // Título de sección "$ ls ~/projects"
  projectsFeatured: string;   // Badge "PINNED" para proyectos destacados
  projectsDemo: string;       // Botón "[demo]"
  projectsCode: string;       // Botón "[code]" (enlace a GitHub)
  projectsWeb: string;        // Botón "[web]" (enlace a sitio web)
  projectsImages: string;     // Botón "[images]" (abre galería)
  projectsExplanation: string;// Botón "[explicación]" (abre modal)
  projectsCsv: string;        // Botón "[csv]" (descarga datos)

  // Contact Section (Sección de contacto en footer)
  contactTitle: string;       // Título "$ contact --me"
  contactEmailButton: string; // Texto del botón "cat email.txt"
  contactLinks: string;       // Título de enlaces sociales "Links"

  // Footer
  footerCopyright: string;    // Copyright (usa {year} como placeholder)
  footerStatus: string;       // Estado del sitio "● All systems operational"
}

/**
 * OBJETO: translations
 * --------------------
 * Contiene las traducciones para cada idioma soportado.
 *
 * ESTRUCTURA:
 * - Clave: Código de idioma ('es', 'en')
 * - Valor: Objeto con todas las traducciones para ese idioma
 *
 * IDIOMAS SOPORTADOS:
 * - 'es': Español (idioma por defecto)
 * - 'en': Inglés (English)
 */
export const translations: Record<string, Translations> = {
  en: {
    // Meta tags for SEO
    siteTitle: "Sathindu Dhanushka - Tech Portfolio",
    siteDescription: "Fellow Researcher (Developer/Creator/Writer)",

    // Hero Section (Main)
    heroGreeting: "$ whoami",
    heroTitle: "Sathindu Dhanushka", // Change this to your real name
    heroSubtitle: "Fellow ( Researcher | Developer | Writer)", // E.g: "Full Stack Developer", "Frontend Engineer", "Data Scientist"
    heroDescription: "I am a student who has a strong passion for research new technologies. I enjoy creating innovative solutions using those thechnologies. All my projects are bult from scratch, from having the idea and developing and all the way to solving the problem.",
    heroCta: "cd ~/projects",
    heroTemplateButton: "cd ~/contact --me",

    // Projects Section
    projectsTitle: "$ ls ~/projects",
    projectsFeatured: "PINNED",
    projectsDemo: "[demo]",
    projectsCode: "[code]",
    projectsImages: "[images]",
    projectsExplanation: "[explanation]",
    projectsCsv: "[csv]",
    projectsWeb: "[web]",

    // Contact Section (Footer)
    contactTitle: "$ contact --me",
    contactEmailButton: "cat email.txt",
    contactLinks: "Links",

    // Footer
    footerCopyright: "© {year} Sathindu Dhanushka", // {year} is automatically replaced
    footerStatus: "● All systems operational"
  }
};

export function getTranslations(lang: string = 'en'): Translations {
  // Always return English translations
  return translations.en;
}

export function getBrowserLanguage(): string {
  // Hardcode to English since we are removing Spanish support
  return 'en';
}
