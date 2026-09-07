/* ==========================================================================
   Teacher's Day 5D Celebration Studio • Master JavaScript Logic
   Created & Designed by rTechCoding
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Helper Selectors & State Variables
   -------------------------------------------------------------------------- */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Form Inputs
const teacherName = $("#teacherName");
const studentName = $("#studentName");
const message = $("#message");
let uploadedImageSrc = null;

/* --------------------------------------------------------------------------
   2. Multilingual Translation Engine & Dropdown Logic
   -------------------------------------------------------------------------- */
const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navGallery: "Gallery",
    navGames: "Games",
    navMessages: "Messages",
    navCustomize: "Customize",
    navCreateCard: "Create Card",
    heroScript: "Happy",
    heroTitle: "TEACHER'S<br>DAY",
    heroCopy: "A teacher takes a hand, opens a mind, and touches a heart forever. Celebrate your amazing mentors today! 💗",
    heroBtnCreate: "Create Your Card ✨",
    heroBtnLearn: "Learn More →",
    feat1Title: "Beautiful Cards",
    feat1Desc: "Stunning 5D animated designs",
    feat2Title: "Easy Customization",
    feat2Desc: "Personalize with messages & photos",
    feat3Title: "Share Instantly",
    feat3Desc: "Save your card and spread joy",
    feat4Title: "100% Free",
    feat4Desc: "Create and share completely free",
    aboutTag: "About Teacher's Day",
    aboutHeading: "Honoring the<br>Guides of Our Lives",
    aboutDesc: "Teacher's Day is a special occasion to express heartfelt gratitude to the wonderful educators who illuminate our paths with knowledge, patience, and encouragement.",
    stat1Label: "Cards Created",
    stat2Label: "Happy Teachers",
    stat3Label: "Countries",
    aboutBtnCreate: "Create Your Card",
    galleryTag: "Gallery",
    galleryHeading: "Beautiful Teacher's Day Cards",
    gallerySub: "Explore our collection of whimsical, 3D animated, and heartfelt greeting card designs.",
    galCard1: "Happy Teacher's Day",
    galCard2: "Thank You Teacher",
    galCard3: "You Are The Best",
    galCard4: "A Special Mentor",
    galCard5: "Inspiring Guidance",
    galCard6: "Heartfelt Gratitude",
    gamesTag: "🧠 Brain Workout",
    gamesHeading: "Interactive Math Games Arcade 🎮",
    gamesSub: "Challenge your brain with fun mathematics puzzles! Solve arithmetic operator equations or slide tiles to arrange numbers in order.",
    game1Tab: "🧮 Game 1: Arithmetic Chain",
    game2Tab: "🧩 Game 2: Sliding Math Puzzle",
    arithInstruction: "FILL IN THE OPERATORS TO MAKE THE EQUATION TRUE",
    slideGoal: "Goal: arrange tiles 1 → 15 with empty space bottom-right",
    customTag: "Site & Card Studio",
    customHeading: "Customize Everything Live!",
    customSub: "Personalize the entire website & card design in real time! Change text, colors, upload your own images for the hero section or card, and export high-res PNGs.",
    tabCard: "💌 Card Customizer",
    tabNavbar: "🧭 Top Bar",
    tabHero: "🚀 Hero Section",
    tabFeatures: "⚡ Features Bar",
    tabAbout: "📖 About & Stats",
    tabGallery: "🖼️ Gallery Text",
    tabMessages: "💬 Quotes & Testimonials",
    tabCta: "📣 CTA Banner",
    tabStyle: "🎨 Site Theme",
    step1Title: "Instant Live Updates",
    step1Desc: "Left box shows real-time section preview",
    step2Title: "Apply & Preview Changes",
    step2Desc: "Click button to preview full section popup",
    demoBtn: "Start Customizing ✨",
    cardTagDefault: "With Gratitude",
    cardTitleDefault: "Happy Teacher's Day",
    lblCardTag: "Card Tag / Subtitle Text",
    lblCardHeading: "Card Main Heading Text",
    lblTeacher: "Teacher's Name",
    lblStudent: "Your Name",
    lblMessage: "Your Message",
    phTeacher: "e.g. Ms. Sharma",
    phStudent: "e.g. Rahul",
    phMessage: "Thank you for inspiring me, believing in me, and helping me grow every single day!",
    btnApply: "Apply & Preview Changes 👁️",
    btnDownload: "Download HD Card PNG 💾",
    msgTag: "Testimonials",
    msgHeading: "What Students Say",
    quote1Text: "\"This platform helped me create a beautiful personalized 3D card for my favorite teacher. She was so moved when she received it!\"",
    quote1Name: "Priya Sharma",
    quote1Role: "Student",
    quote2Text: "\"Amazing collection of 3D animated cards! It took less than a minute to customize, adjust the photo zoom, and export a high-res card.\"",
    quote2Name: "Aman Verma",
    quote2Role: "Student",
    quote3Text: "\"Made our Teacher's Day classroom celebration extra special. Highly recommended to all students everywhere!\"",
    quote3Name: "Sneha Patel",
    quote3Role: "Student",
    ctaTitle: "Ready to Make Your Teacher Smile?",
    ctaDesc: "Create a beautiful, personalized Teacher's Day card in just a few clicks!",
    ctaBtn: "Create Your Card Now ✨",
    footerBrand: "© 2026 Teacher's Day • Made with ❤️ by <a href=\"https://github.com/rTechCoding\" target=\"_blank\" rel=\"noopener noreferrer\">rTechCoding</a> for teachers everywhere.",
    applyModalTitle: "Changes Applied Successfully! 🎉",
    applyModalDesc: "Your customized text, images, and theme colors have been applied live to the website.",
    applyModalOk: "Looks Great! ✨",
    switcherTitle: "STYLE SWITCHER",
    switcherSkin: "BODY SKIN",
    switcherLayout: "LAYOUT STYLE",
    switcherSeparator: "SEPARATOR",
    switcherAnim: "BACKGROUND ANIMATION",
    switcherFont: "SITE HEADINGS FONT FAMILY",
    switcherMusic: "BACKGROUND MUSIC",
    toastLang: "Language changed to English 🇬🇧"
  },
  hi: {
    navHome: "मुख्य पृष्ठ",
    navAbout: "हमारे बारे में",
    navGallery: "गैलरी",
    navGames: "खेल",
    navMessages: "संदेश",
    navCustomize: "अनुकूलित करें",
    navCreateCard: "कार्ड बनाएं",
    heroScript: "शुभ",
    heroTitle: "शिक्षक<br>दिवस",
    heroCopy: "एक शिक्षक हाथ थामता है, मन खोलता है और दिल को हमेशा के लिए छू लेता है। आज ही अपने अद्भुत शिक्षकों का सम्मान करें! 💗",
    heroBtnCreate: "कार्ड बनाएं ✨",
    heroBtnLearn: "और जानें →",
    feat1Title: "सुंदर कार्ड",
    feat1Desc: "शानदार 5D एनिमेटेड डिज़ाइन",
    feat2Title: "आसान अनुकूलन",
    feat2Desc: "संदेश और फोटो के साथ व्यक्तिगत बनाएं",
    feat3Title: "तुरंत शेयर करें",
    feat3Desc: "अपना कार्ड सहेजें और खुशियाँ फैलाएं",
    feat4Title: "100% मुफ्त",
    feat4Desc: "बिल्कुल मुफ्त बनाएं और शेयर करें",
    aboutTag: "शिक्षक दिवस के बारे में",
    aboutHeading: "जीवन के मार्गदर्शकों<br>का सम्मान",
    aboutDesc: "शिक्षक दिवस हमारे उन अद्भुत शिक्षकों के प्रति हार्दिक आभार व्यक्त करने का एक विशेष अवसर है जो ज्ञान, धैर्य और प्रोत्साहन से हमारा मार्ग रोशन करते हैं।",
    stat1Label: "कार्ड निर्मित",
    stat2Label: "प्रसन्न शिक्षक",
    stat3Label: "देश",
    aboutBtnCreate: "अपना कार्ड बनाएं",
    galleryTag: "गैलरी",
    galleryHeading: "सुंदर शिक्षक दिवस कार्ड",
    gallerySub: "अद्भुत, 3D एनिमेटेड और दिल को छूने वाले कार्ड डिज़ाइनों का अन्वेषण करें।",
    galCard1: "शुभ शिक्षक दिवस",
    galCard2: "धन्यवाद शिक्षक महोदय",
    galCard3: "आप सर्वश्रेष्ठ हैं",
    galCard4: "एक विशेष मार्गदर्शक",
    galCard5: "प्रेरणादायक मार्गदर्शन",
    galCard6: "दिल से कृतज्ञता",
    gamesTag: "🧠 दिमागी कसरत",
    gamesHeading: "इंटरैक्टिव गणित खेल आर्केड 🎮",
    gamesSub: "मजेदार गणित पहेलियों के साथ अपने दिमाग को चुनौती दें! गणितीय समीकरण हल करें या संख्यात्मक टाइल्स व्यवस्थित करें।",
    game1Tab: "🧮 खेल 1: अंकगणित श्रृंखला",
    game2Tab: "🧩 खेल 2: स्लाइडिंग गणित पहेली",
    arithInstruction: "समीकरण को सही बनाने के लिए सही गणितीय चिह्न चुनें",
    slideGoal: "लक्ष्य: 1 से 15 तक टाइल्स को व्यवस्थित करें",
    customTag: "साइट और कार्ड स्टूडियो",
    customHeading: "सब कुछ लाइव कस्टमाइज़ करें!",
    customSub: "वास्तविक समय में पूरी वेबसाइट और कार्ड डिज़ाइन को अनुकूलित करें! पाठ, रंग बदलें, अपनी तस्वीरें अपलोड करें और HD PNG डाउनलोड करें।",
    tabCard: "💌 कार्ड कस्टमाइज़र",
    tabNavbar: "🧭 टॉप बार",
    tabHero: "🚀 हीरो सेक्शन",
    tabFeatures: "⚡ फीचर्स बार",
    tabAbout: "📖 विवरण और आँकड़े",
    tabGallery: "🖼️ गैलरी टेक्स्ट",
    tabMessages: "💬 विचार और समीक्षाएं",
    tabCta: "📣 CTA बैनर",
    tabStyle: "🎨 साइट थीम",
    step1Title: "तुरंत लाइव अपडेट",
    step1Desc: "बायां बॉक्स वास्तविक समय पूर्वावलोकन दिखाता है",
    step2Title: "लागू करें और देखें",
    step2Desc: "पूरा अनुभाग देखने के लिए बटन पर क्लिक करें",
    demoBtn: "कस्टमाइज़ करना शुरू करें ✨",
    cardTagDefault: "सादर कृतज्ञता",
    cardTitleDefault: "शुभ शिक्षक दिवस",
    lblCardTag: "कार्ड टैग / उपशीर्षक पाठ",
    lblCardHeading: "कार्ड का मुख्य शीर्षक",
    lblTeacher: "शिक्षक का नाम",
    lblStudent: "आपका नाम",
    lblMessage: "आपका व्यक्तिगत संदेश",
    phTeacher: "जैसे: प्रो. शर्मा",
    phStudent: "जैसे: राहुल",
    phMessage: "मुझे हर दिन प्रेरित करने, मुझ पर विश्वास करने और आगे बढ़ने में मदद करने के लिए धन्यवाद!",
    btnApply: "लागू करें और देखें 👁️",
    btnDownload: "HD कार्ड PNG डाउनलोड करें 💾",
    msgTag: "समीक्षाएं",
    msgHeading: "छात्रों के अनुभव",
    quote1Text: "\"इस प्लेटफॉर्म ने मुझे अपने पसंदीदा शिक्षक के लिए एक सुंदर व्यक्तिगत 3D कार्ड बनाने में मदद की। इसे पाकर वे बहुत खुश हुए!\"",
    quote1Name: "प्रिया शर्मा",
    quote1Role: "छात्रा",
    quote2Text: "\"3D एनिमेटेड कार्डों का अद्भुत संग्रह! कस्टमाइज़ करने और उच्च गुणवत्ता वाला कार्ड डाउनलोड करने में एक मिनट से भी कम समय लगा।\"",
    quote2Name: "अमन वर्मा",
    quote2Role: "छात्र",
    quote3Text: "\"हमारे शिक्षक दिवस समारोह को और भी खास बना दिया। सभी छात्रों के लिए अत्यधिक अनुशंसित!\"",
    quote3Name: "स्नेहा पटेल",
    quote3Role: "छात्रा",
    ctaTitle: "क्या आप अपने शिक्षक को मुस्कुराने का कारण देने के लिए तैयार हैं?",
    ctaDesc: "बस कुछ ही क्लिक में एक सुंदर, व्यक्तिगत शिक्षक दिवस कार्ड बनाएं!",
    ctaBtn: "अभी अपना कार्ड बनाएं ✨",
    footerBrand: "© 2026 शिक्षक दिवस • शिक्षकों के लिए <a href=\"https://github.com/rTechCoding\" target=\"_blank\" rel=\"noopener noreferrer\">rTechCoding</a> द्वारा ❤️ से निर्मित।",
    applyModalTitle: "बदलाव सफलतापूर्वक लागू किए गए! 🎉",
    applyModalDesc: "आपके कस्टमाइज़ किए गए पाठ, चित्र और रंग वेबसाइट पर लाइव लागू हो गए हैं।",
    applyModalOk: "बहुत बढ़िया! ✨",
    switcherTitle: "स्टाइल स्विचर",
    switcherSkin: "बॉडी स्किन",
    switcherLayout: "लेआउट शैली",
    switcherSeparator: "विभाजक (Separator)",
    switcherAnim: "पृष्ठभूमि एनीमेशन",
    switcherFont: "साइट हेडिंग फ़ॉन्ट शैली",
    switcherMusic: "पृष्ठभूमि संगीत",
    toastLang: "भाषा बदलकर हिन्दी की गई 🇮🇳"
  },
  es: {
    navHome: "Inicio",
    navAbout: "Acerca de",
    navGallery: "Galería",
    navGames: "Juegos",
    navMessages: "Mensajes",
    navCustomize: "Personalizar",
    navCreateCard: "Crear Tarjeta",
    heroScript: "¡Feliz",
    heroTitle: "DÍA DEL<br>PROFESOR",
    heroCopy: "Un profesor toma una mano, abre una mente y toca un corazón para siempre. ¡Celebra a tus increíbles mentores hoy! 💗",
    heroBtnCreate: "Crea tu tarjeta ✨",
    heroBtnLearn: "Saber más →",
    feat1Title: "Tarjetas Hermosas",
    feat1Desc: "Diseños animados en 5D espectaculares",
    feat2Title: "Fácil Personalización",
    feat2Desc: "Personaliza con mensajes y fotos",
    feat3Title: "Comparte al Instante",
    feat3Desc: "Guarda tu tarjeta y comparte alegría",
    feat4Title: "100% Gratis",
    feat4Desc: "Crea y comparte totalmente gratis",
    aboutTag: "Sobre el Día del Profesor",
    aboutHeading: "Honrando a los Guías<br>de Nuestras Vidas",
    aboutDesc: "El Día del Profesor es una ocasión especial para expresar nuestra más sincera gratitud a los educadores que iluminan nuestro camino.",
    stat1Label: "Tarjetas Creadas",
    stat2Label: "Profesores Felices",
    stat3Label: "Países",
    aboutBtnCreate: "Crea Tu Tarjeta",
    galleryTag: "Galería",
    galleryHeading: "Hermosas Tarjetas del Día del Profesor",
    gallerySub: "Explora nuestra colección de tarjetas animadas en 3D y diseños especiales.",
    galCard1: "¡Feliz Día del Profesor!",
    galCard2: "Gracias Profesor/a",
    galCard3: "Eres el Mejor",
    galCard4: "Un Mentor Especial",
    galCard5: "Guía Inspiradora",
    galCard6: "Gratitud Sincera",
    gamesTag: "🧠 Ejercicio Mental",
    gamesHeading: "Arcade de Juegos Matemáticos 🎮",
    gamesSub: "¡Desafía tu mente con rompecabezas matemáticos divertidos! Resuelve ecuaciones o desliza fichas para ordenar números.",
    game1Tab: "🧮 Juego 1: Cadena Aritmética",
    game2Tab: "🧩 Juego 2: Rompecabezas Deslizante",
    arithInstruction: "SELECCIONA LOS OPERADORES CORRECTOS PARA COMPLETAR LA ECUACIÓN",
    slideGoal: "Objetivo: ordena las fichas del 1 al 15",
    customTag: "Estudio de Creación",
    customHeading: "¡Personaliza Todo en Vivo!",
    customSub: "¡Personaliza todo el sitio web y la tarjeta en tiempo real! Cambia textos, colores, fotos y descarga en PNG HD.",
    tabCard: "💌 Personalizar Tarjeta",
    tabNavbar: "🧭 Barra Superior",
    tabHero: "🚀 Sección Principal",
    tabFeatures: "⚡ Características",
    tabAbout: "📖 Sobre Nosotros",
    tabGallery: "🖼️ Texto de Galería",
    tabMessages: "💬 Mensajes y Testimonios",
    tabCta: "📣 Banner CTA",
    tabStyle: "🎨 Tema del Sitio",
    step1Title: "Actualizaciones en Vivo",
    step1Desc: "La vista previa muestra cambios al instante",
    step2Title: "Aplicar y Ver Cambios",
    step2Desc: "Haz clic para ver la vista previa completa",
    demoBtn: "Empezar a Personalizar ✨",
    cardTagDefault: "Con Gratitud",
    cardTitleDefault: "¡Feliz Día del Profesor!",
    lblCardTag: "Subtítulo de Tarjeta",
    lblCardHeading: "Título Principal de Tarjeta",
    lblTeacher: "Nombre del Profesor/a",
    lblStudent: "Tu Nombre",
    lblMessage: "Tu Mensaje",
    phTeacher: "ej. Prof. Sarah Jenkins",
    phStudent: "ej. Alex Rivera",
    phMessage: "¡Gracias por inspirarme, creer en mí y ayudarme a crecer cada día!",
    btnApply: "Aplicar y Ver 👁️",
    btnDownload: "Descargar Tarjeta HD 💾",
    msgTag: "Testimonios",
    msgHeading: "Lo Que Dicen los Estudiantes",
    quote1Text: "\"¡Esta plataforma me ayudó a crear una hermosa tarjeta 3D para mi profesora favorita!\"",
    quote1Name: "Priya Sharma",
    quote1Role: "Estudiante",
    quote2Text: "\"¡Colección increíble de tarjetas animadas 3D! Muy fácil de personalizar y descargar.\"",
    quote2Name: "Aman Verma",
    quote2Role: "Estudiante",
    quote3Text: "\"Hizo que la celebración en nuestro salón fuera súper especial. ¡Muy recomendado!\"",
    quote3Name: "Sneha Patel",
    quote3Role: "Estudiante",
    ctaTitle: "¿Listo para hacer sonreír a tu profesor?",
    ctaDesc: "¡Crea una hermosa tarjeta personalizada en pocos clics!",
    ctaBtn: "Crea tu Tarjeta Ahora ✨",
    footerBrand: "© 2026 Día del Profesor • Hecho con ❤️ por <a href=\"https://github.com/rTechCoding\" target=\"_blank\" rel=\"noopener noreferrer\">rTechCoding</a>.",
    applyModalTitle: "¡Cambios Aplicados con Éxito! 🎉",
    applyModalDesc: "Tus cambios de texto, imagen y colores se han aplicado en vivo.",
    applyModalOk: "¡Se Ve Genial! ✨",
    switcherTitle: "CAMBIADOR DE ESTILO",
    switcherSkin: "COLOR DE FONDO",
    switcherLayout: "TIPO DE DISEÑO",
    switcherSeparator: "SEPARADOR",
    switcherAnim: "ANIMACIÓN DE FONDO",
    switcherFont: "FUENTE DE TÍTULOS",
    switcherMusic: "MÚSICA DE FONDO",
    toastLang: "Idioma cambiado a Español 🇪🇸"
  },
  fr: {
    navHome: "Accueil",
    navAbout: "À propos",
    navGallery: "Galerie",
    navGames: "Jeux",
    navMessages: "Messages",
    navCustomize: "Personnaliser",
    navCreateCard: "Créer Carte",
    heroScript: "Joyeuse",
    heroTitle: "FÊTE DES<br>PROFESSEURS",
    heroCopy: "Un enseignant prend une main, ouvre un esprit et touche un cœur pour toujours. Célébrez vos formidables mentors aujourd'hui! 💗",
    heroBtnCreate: "Créez votre carte ✨",
    heroBtnLearn: "En savoir plus →",
    feat1Title: "Superbes Cartes",
    feat1Desc: "Magnifiques designs animés en 5D",
    feat2Title: "Personnalisation Facile",
    feat2Desc: "Personnalisez avec messages et photos",
    feat3Title: "Partagez Instantanément",
    feat3Desc: "Enregistrez et partagez la joie",
    feat4Title: "100% Gratuit",
    feat4Desc: "Créez et partagez gratuitement",
    aboutTag: "À propos de la Fête",
    aboutHeading: "Honorer les Guides<br>de nos Vies",
    aboutDesc: "La Fête des Professeurs est une occasion spéciale d'exprimer notre profonde gratitude aux enseignants.",
    stat1Label: "Cartes Créées",
    stat2Label: "Enseignants Heureux",
    stat3Label: "Pays Touchés",
    aboutBtnCreate: "Créez Votre Carte",
    galleryTag: "Galerie",
    galleryHeading: "Magnifiques Cartes de Fête des Professeurs",
    gallerySub: "Découvrez notre collection de modèles de cartes animées 3D.",
    galCard1: "Bonne Fête des Professeurs",
    galCard2: "Merci Cher Enseignant",
    galCard3: "Vous Êtes le Meilleur",
    galCard4: "Un Mentor D'Exception",
    galCard5: "Guide Inspirant",
    galCard6: "Gratitude Sincère",
    gamesTag: "🧠 Entraînement Cérébral",
    gamesHeading: "Arcade de Jeux de Maths 🎮",
    gamesSub: "Défiez votre cerveau avec des puzzles mathématiques amusants ! Résolvez des équations ou faites glisser les tuiles.",
    game1Tab: "🧮 Jeu 1: Chaîne Arithmétique",
    game2Tab: "🧩 Jeu 2: Taquin Numérique",
    arithInstruction: "CHOISISSEZ LES BONS OPÉRATEURS POUR RÉSOUDRE L'ÉQUATION",
    slideGoal: "Objectif: rangez les tuiles de 1 à 15",
    customTag: "Studio de Création",
    customHeading: "Personnalisez Tout en Direct!",
    customSub: "Personnalisez l'ensemble du site et de la carte en temps réel ! Modifiez les textes, couleurs, photos et téléchargez en PNG HD.",
    tabCard: "💌 Personnaliser Carte",
    tabNavbar: "🧭 Barre Supérieure",
    tabHero: "🚀 Section d'Accueil",
    tabFeatures: "⚡ Caractéristiques",
    tabAbout: "📖 À Propos",
    tabGallery: "🖼️ Texte Galerie",
    tabMessages: "💬 Témoignages",
    tabCta: "📣 Bannière CTA",
    tabStyle: "🎨 Thème du Site",
    step1Title: "Aperçu en Direct",
    step1Desc: "Modifications visibles immédiatement",
    step2Title: "Appliquer et Voir",
    step2Desc: "Cliquez pour afficher l'aperçu complet",
    demoBtn: "Commencer à Créer ✨",
    cardTagDefault: "Avec Gratitude",
    cardTitleDefault: "Joyeuse Fête des Professeurs",
    lblCardTag: "Sous-titre de Carte",
    lblCardHeading: "Titre Principal de Carte",
    lblTeacher: "Nom de l'Enseignant(e)",
    lblStudent: "Votre Nom",
    lblMessage: "Votre Message",
    phTeacher: "ex. Prof. Sarah Jenkins",
    phStudent: "ex. Alex Rivera",
    phMessage: "Merci de m'inspirer, de croire en moi et de m'aider à grandir chaque jour !",
    btnApply: "Appliquer et Voir 👁️",
    btnDownload: "Télécharger Carte HD 💾",
    msgTag: "Témoignages",
    msgHeading: "Avis des Élèves",
    quote1Text: "\"Cette plateforme m'a aidé à créer une magnifique carte 3D pour mon enseignante préférée !\"",
    quote1Name: "Priya Sharma",
    quote1Role: "Élève",
    quote2Text: "\"Incroyable collection de cartes 3D ! Très rapide et facile à personnaliser.\"",
    quote2Name: "Aman Verma",
    quote2Role: "Élève",
    quote3Text: "\"A rendu notre fête en classe vraiment exceptionnelle. Recommandé à tous !\"",
    quote3Name: "Sneha Patel",
    quote3Role: "Élève",
    ctaTitle: "Prêt à faire sourire votre enseignant(e) ?",
    ctaDesc: "Créez une superbe carte personnalisée en quelques clics !",
    ctaBtn: "Créez Votre Carte ✨",
    footerBrand: "© 2026 Fête des Professeurs • Fait avec ❤️ par <a href=\"https://github.com/rTechCoding\" target=\"_blank\" rel=\"noopener noreferrer\">rTechCoding</a>.",
    applyModalTitle: "Modifications Appliquées ! 🎉",
    applyModalDesc: "Vos modifications de texte, d'image et de couleurs sont en ligne.",
    applyModalOk: "C'est Parfait ! ✨",
    switcherTitle: "PERSONNALISER LE STYLE",
    switcherSkin: "MODE DE FOND",
    switcherLayout: "STYLE DE PAGE",
    switcherSeparator: "SÉPARATEUR",
    switcherAnim: "ANIMATION DE FOND",
    switcherFont: "POLICE DES TITRES",
    switcherMusic: "MUSIQUE DE FOND",
    toastLang: "Langue modifiée en Français 🇫🇷"
  },
  de: {
    navHome: "Startseite",
    navAbout: "Über uns",
    navGallery: "Galerie",
    navGames: "Spiele",
    navMessages: "Nachrichten",
    navCustomize: "Anpassen",
    navCreateCard: "Karte Erstellen",
    heroScript: "Alles Gute zum",
    heroTitle: "TAG DER<br>LEHRER",
    heroCopy: "Ein Lehrer nimmt eine Hand, öffnet einen Geist und berührt ein Herz für immer. Feiern Sie heute Ihre fantastischen Mentoren! 💗",
    heroBtnCreate: "Karte erstellen ✨",
    heroBtnLearn: "Mehr erfahren →",
    feat1Title: "Wunderschöne Karten",
    feat1Desc: "Atemberaubende 5D-animierte Designs",
    feat2Title: "Einfache Anpassung",
    feat2Desc: "Mit Nachrichten und Fotos personalisieren",
    feat3Title: "Sofort Teilen",
    feat3Desc: "Karte speichern und Freude verbreiten",
    feat4Title: "100% Kostenlos",
    feat4Desc: "Völlig kostenlos erstellen und teilen",
    aboutTag: "Über den Lehrertag",
    aboutHeading: "Die Wegweiser unseres<br>Lebens ehren",
    aboutDesc: "Der Tag der Lehrer ist ein besonderer Anlass, um allen Pädagogen unseren herzlichen Dank auszusprechen.",
    stat1Label: "Erstellte Karten",
    stat2Label: "Glückliche Lehrer",
    stat3Label: "Länder",
    aboutBtnCreate: "Karte Erstellen",
    galleryTag: "Galerie",
    galleryHeading: "Schöne Karten zum Tag der Lehrer",
    gallerySub: "Entdecken Sie unsere Sammlung an 3D-animierten Grußkarten-Designs.",
    galCard1: "Alles Gute zum Tag der Lehrer",
    galCard2: "Danke, liebe/r Lehrer/in",
    galCard3: "Sie sind die Besten",
    galCard4: "Ein besonderer Mentor",
    galCard5: "Inspirierende Führung",
    galCard6: "Herzliche Dankbarkeit",
    gamesTag: "🧠 Gehirntraining",
    gamesHeading: "Interaktives Mathe-Spiele-Arcade 🎮",
    gamesSub: "Fordere dein Gehirn mit unterhaltsamen Mathe-Rätseln heraus! Löse Gleichungen oder verschiebe Zahlen-Kacheln.",
    game1Tab: "🧮 Spiel 1: Arithmetik-Kette",
    game2Tab: "🧩 Spiel 2: Schiebe-Mathe-Puzzle",
    arithInstruction: "WÄHLE DIE RICHTIGEN OPERATOREN, UM DIE GLEICHUNG ZU LÖSEN",
    slideGoal: "Ziel: Sortiere die Kacheln von 1 bis 15",
    customTag: "Studio & Kartenerstellung",
    customHeading: "Alles Live Anpassen!",
    customSub: "Personalisiere die gesamte Website und das Kartendesign in Echtzeit! Texte, Farben, Fotos anpassen und als HD PNG exportieren.",
    tabCard: "💌 Karte Anpassen",
    tabNavbar: "🧭 Obere Leiste",
    tabHero: "🚀 Hauptbereich",
    tabFeatures: "⚡ Funktionen",
    tabAbout: "📖 Über Uns",
    tabGallery: "🖼️ Galerie-Text",
    tabMessages: "💬 Bewertungen",
    tabCta: "📣 CTA-Banner",
    tabStyle: "🎨 Website-Design",
    step1Title: "Sofortige Live-Vorschau",
    step1Desc: "Linker Kasten zeigt Änderungen sofort an",
    step2Title: "Anwenden & Vorschau",
    step2Desc: "Klicken, um vollständige Vorschau anzuzeigen",
    demoBtn: "Jetzt Anpassen ✨",
    cardTagDefault: "Mit Dankbarkeit",
    cardTitleDefault: "Alles Gute zum Tag der Lehrer",
    lblCardTag: "Karten-Untertitel",
    lblCardHeading: "Karten-Hauptüberschrift",
    lblTeacher: "Name des Lehrers / der Lehrerin",
    lblStudent: "Ihr Name",
    lblMessage: "Ihre Nachricht",
    phTeacher: "z.B. Prof. Sarah Jenkins",
    phStudent: "z.B. Alex Rivera",
    phMessage: "Danke, dass Sie mich jeden Tag inspirieren, an mich glauben und mir beim Wachsen helfen!",
    btnApply: "Anwenden & Vorschau 👁️",
    btnDownload: "HD Karte Herunterladen 💾",
    msgTag: "Bewertungen",
    msgHeading: "Was Schüler Sagen",
    quote1Text: "\"Diese Plattform hat mir geholfen, eine wunderschöne 3D-Karte für meine Lieblingslehrerin zu erstellen!\"",
    quote1Name: "Priya Sharma",
    quote1Role: "Schülerin",
    quote2Text: "\"Tolle Sammlung von 3D-animierten Karten! Sehr einfach anzupassen und herunterzuladen.\"",
    quote2Name: "Aman Verma",
    quote2Role: "Schüler",
    quote3Text: "\"Hat unsere Feier in der Schule besonders gemacht. Sehr zu empfehlen!\"",
    quote3Name: "Sneha Patel",
    quote3Role: "Schülerin",
    ctaTitle: "Bereit, Ihrem Lehrer ein Lächeln zu schenken?",
    ctaDesc: "Erstellen Sie mit wenigen Klicks eine wunderschöne personalisierte Karte!",
    ctaBtn: "Jetzt Karte Erstellen ✨",
    footerBrand: "© 2026 Tag der Lehrer • Mit ❤️ gemacht von <a href=\"https://github.com/rTechCoding\" target=\"_blank\" rel=\"noopener noreferrer\">rTechCoding</a>.",
    applyModalTitle: "Änderungen Erfolgreich Übernommen! 🎉",
    applyModalDesc: "Ihre Texte, Bilder und Farben wurden live auf der Website aktualisiert.",
    applyModalOk: "Sieht Super Aus! ✨",
    switcherTitle: "DESIGN-SWITCHER",
    switcherSkin: "HINTERGRUND-SKIN",
    switcherLayout: "LAYOUT-STIL",
    switcherSeparator: "TRENNLINIE",
    switcherAnim: "HINTERGRUND-ANIMATION",
    switcherFont: "SCHRIFTART DER ÜBERSCHRIFTEN",
    switcherMusic: "HINTERGRUND-MUSIK",
    toastLang: "Sprache auf Deutsch geändert 🇩🇪"
  },
  tr: {
    navHome: "Ana Sayfa",
    navAbout: "Hakkında",
    navGallery: "Galeri",
    navGames: "Oyunlar",
    navMessages: "Mesajlar",
    navCustomize: "Özelleştir",
    navCreateCard: "Kart Oluştur",
    heroScript: "Kutlu Olsun",
    heroTitle: "ÖĞRETMENLER<br>GÜNÜ",
    heroCopy: "Bir öğretmen bir el tutar, bir zihin açar ve bir kalbe sonsuza dek dokunur. Harika öğretmenlerinizi bugün kutlayın! 💗",
    heroBtnCreate: "Kartınızı Oluşturun ✨",
    heroBtnLearn: "Daha Fazla →",
    feat1Title: "Harika Kartlar",
    feat1Desc: "Etkileyici 5D animasyonlu tasarımlar",
    feat2Title: "Kolay Özelleştirme",
    feat2Desc: "Mesajlar ve fotoğraflarla kişiselleştirin",
    feat3Title: "Anında Paylaşın",
    feat3Desc: "Kartınızı kaydedin ve mutluluk yayın",
    feat4Title: "%100 Ücretsiz",
    feat4Desc: "Tamamen ücretsiz oluşturun ve paylaşın",
    aboutTag: "Öğretmenler Günü Hakkında",
    aboutHeading: "Rehberlerimizi<br>Onurlandırıyoruz",
    aboutDesc: "Öğretmenler Günü, hayatımızı bilgi ve sabırla aydınlatan öğretmenlerimize şükranlarımızı sunmak için özel bir gündür.",
    stat1Label: "Oluşturulan Kart",
    stat2Label: "Mutlu Öğretmen",
    stat3Label: "Ülke",
    aboutBtnCreate: "Kartınızı Oluşturun",
    galleryTag: "Galeri",
    galleryHeading: "Güzel Öğretmenler Günü Kartları",
    gallerySub: "3D animasyonlu ve samimi tebrik kartı tasarımlarımızı keşfedin.",
    galCard1: "Öğretmenler Gününüz Kutlu Olsun",
    galCard2: "Teşekkürler Canım Öğretmenim",
    galCard3: "En İyisi Sizsiniz",
    galCard4: "Özel Bir Rehber",
    galCard5: "İlham Veren Yol Gösterici",
    galCard6: "Yürekten Minnettarlık",
    gamesTag: "🧠 Beyin Egzersizi",
    gamesHeading: "İnteraktif Matematik Oyunları 🎮",
    gamesSub: "Eğlenceli matematik bulmacalarıyla beyninizi zorlayın! Denklemleri çözün veya sayı karolarını kaydırın.",
    game1Tab: "🧮 Oyun 1: Aritmetik Zinciri",
    game2Tab: "🧩 Oyun 2: Kaydırmalı Matematik Bulmacası",
    arithInstruction: "DENKLEMİ DOĞRULAMAK İÇİN İŞLEMLERİ SEÇİN",
    slideGoal: "Hedef: karoları 1'den 15'e kadar sıralayın",
    customTag: "Stüdyo ve Özelleştirme",
    customHeading: "Her Şeyi Canlı Özelleştirin!",
    customSub: "Tüm web sitesini ve kart tasarımını gerçek zamanlı olarak kişiselleştirin! Metinleri, renkleri değiştirin, fotoğraflarınızı yükleyin ve Yüksek Çözünürlüklü PNG indirin.",
    tabCard: "💌 Kartı Özelleştir",
    tabNavbar: "🧭 Üst Menü",
    tabHero: "🚀 Ana Bölüm",
    tabFeatures: "⚡ Özellikler",
    tabAbout: "📖 Hakkımızda",
    tabGallery: "🖼️ Galeri Metni",
    tabMessages: "💬 Yorumlar",
    tabCta: "📣 CTA Banner",
    tabStyle: "🎨 Site Teması",
    step1Title: "Anında Canlı Güncelleme",
    step1Desc: "Sol kutu gerçek zamanlı önizleme gösterir",
    step2Title: "Uygula ve Önizle",
    step2Desc: "Tam önizlemeyi görmek için butona tıklayın",
    demoBtn: "Özelleştirmeye Başla ✨",
    cardTagDefault: "Sevgi ve Minnetle",
    cardTitleDefault: "Öğretmenler Gününüz Kutlu Olsun",
    lblCardTag: "Kart Alt Başlığı",
    lblCardHeading: "Kart Ana Başlığı",
    lblTeacher: "Öğretmenin Adı",
    lblStudent: "Adınız",
    lblMessage: "Mesajınız",
    phTeacher: "ör. Prof. Sarah Jenkins",
    phStudent: "ör. Alex Rivera",
    phMessage: "Her gün bana ilham verdiğiniz, bana inandığınız ve büyüme yardım ettiğiniz için teşekkür ederim!",
    btnApply: "Uygula ve Önizle 👁️",
    btnDownload: "HD Kartı İndir 💾",
    msgTag: "Yorumlar",
    msgHeading: "Öğrenciler Ne Diyor",
    quote1Text: "\"Bu platform en sevdiğim öğretmenim için harika bir 3D kart hazırlamama yardımcı oldu!\"",
    quote1Name: "Priya Sharma",
    quote1Role: "Öğrenci",
    quote2Text: "\"Harika 3D kart koleksiyonu! Kişiselleştirmek ve HD kart indirmek 1 dakikadan kısa sürdü.\"",
    quote2Name: "Aman Verma",
    quote2Role: "Öğrenci",
    quote3Text: "\"Öğretmenler Günü kutlamamızı ekstra özel kıldı. Herkese tavsiye ederim!\"",
    quote3Name: "Sneha Patel",
    quote3Role: "Öğrenci",
    ctaTitle: "Öğretmeninizi gülümsetmeye hazır mısınız?",
    ctaDesc: "Birkaç tıkla harika ve kişiselleştirilmiş bir kart oluşturun!",
    ctaBtn: "Şimdi Kartınızı Oluşturun ✨",
    footerBrand: "© 2026 Öğretmenler Günü • <a href=\"https://github.com/rTechCoding\" target=\"_blank\" rel=\"noopener noreferrer\">rTechCoding</a> tarafından ❤️ ile yapılmıştır.",
    applyModalTitle: "Değişiklikler Başarıyla Uygulandı! 🎉",
    applyModalDesc: "Metin, resim ve renk değişiklikleriniz web sitesine canlı olarak uygulandı.",
    applyModalOk: "Harika Görünüyor! ✨",
    switcherTitle: "STİL DEĞİŞTİRİCİ",
    switcherSkin: "GÖVDE TEMASI",
    switcherLayout: "DÜZEN STİLİ",
    switcherSeparator: "AYIRAÇ",
    switcherAnim: "ARKA PLAN ANİMASYONU",
    switcherFont: "BAŞLIK YAZI TİPİ",
    switcherMusic: "ARKA PLAN MÜZİĞİ",
    toastLang: "Dil Türkçe olarak değiştirildi 🇹🇷"
  }
};

let currentLang = "en";

function setLanguage(langCode, showNotification = true) {
  if (!translations[langCode]) langCode = "en";
  currentLang = langCode;
  const langData = translations[langCode];

  try { localStorage.setItem("selectedLanguage", langCode); } catch(e) {}

  // Update navbar language dropdown UI button & options
  const option = Array.from($$(".lang-option")).find(opt => opt.dataset.lang === langCode);
  if (option) {
    const flag = option.dataset.flag;
    const code = option.dataset.code;
    if ($("#currentLangFlag")) $("#currentLangFlag").textContent = flag;
    if ($("#currentLangCode")) $("#currentLangCode").textContent = code;
    $$(".lang-option").forEach(opt => opt.classList.toggle("active", opt.dataset.lang === langCode));
  }

  // 1. Update Nav Links & Action Buttons
  const navLinks = $$(".nav-links a");
  if (navLinks.length >= 6) {
    navLinks[0].textContent = langData.navHome;
    navLinks[1].textContent = langData.navAbout;
    navLinks[2].textContent = langData.navGallery;
    navLinks[3].textContent = langData.navGames;
    navLinks[4].textContent = langData.navMessages;
    navLinks[5].textContent = langData.navCustomize;
  }
  const navBtn = $(".nav-controls .btn");
  if (navBtn) navBtn.textContent = langData.navCreateCard;

  // 2. Update Hero Section
  if ($(".hero .script")) $(".hero .script").textContent = langData.heroScript;
  if ($(".hero h1 span")) $(".hero h1 span").innerHTML = langData.heroTitle;
  if ($(".hero-copy p")) $(".hero-copy p").textContent = langData.heroCopy;
  const heroBtns = $$(".hero-copy .actions a");
  if (heroBtns.length >= 2) {
    heroBtns[0].textContent = langData.heroBtnCreate;
    heroBtns[1].textContent = langData.heroBtnLearn;
  }

  // 3. Update Features Bar (All 4 cards)
  const features = $$(".feature");
  if (features.length >= 4) {
    if (features[0].querySelector("b")) features[0].querySelector("b").textContent = langData.feat1Title;
    if (features[0].querySelector("small")) features[0].querySelector("small").textContent = langData.feat1Desc;
    if (features[1].querySelector("b")) features[1].querySelector("b").textContent = langData.feat2Title;
    if (features[1].querySelector("small")) features[1].querySelector("small").textContent = langData.feat2Desc;
    if (features[2].querySelector("b")) features[2].querySelector("b").textContent = langData.feat3Title;
    if (features[2].querySelector("small")) features[2].querySelector("small").textContent = langData.feat3Desc;
    if (features[3].querySelector("b")) features[3].querySelector("b").textContent = langData.feat4Title;
    if (features[3].querySelector("small")) features[3].querySelector("small").textContent = langData.feat4Desc;
  }

  // 4. Update About Section
  if ($("#about .section-tag")) $("#about .section-tag").textContent = langData.aboutTag;
  if ($("#about h2")) $("#about h2").innerHTML = langData.aboutHeading;
  if ($("#about p")) $("#about p").textContent = langData.aboutDesc;
  const statLabels = $$("#about .stat span");
  if (statLabels.length >= 3) {
    statLabels[0].textContent = langData.stat1Label;
    statLabels[1].textContent = langData.stat2Label;
    statLabels[2].textContent = langData.stat3Label;
  }
  if ($("#about .btn")) $("#about .btn").textContent = langData.aboutBtnCreate;

  // 5. Update Gallery Section & Gallery Cards Captions
  if ($("#gallery .section-tag")) $("#gallery .section-tag").textContent = langData.galleryTag;
  if ($("#gallery h2")) $("#gallery h2").textContent = langData.galleryHeading;
  if ($("#gallery p")) $("#gallery p").textContent = langData.gallerySub;
  
  const galCaptions = $$("#galleryGrid .card .caption");
  if (galCaptions.length >= 6) {
    galCaptions[0].textContent = langData.galCard1;
    galCaptions[1].textContent = langData.galCard2;
    galCaptions[2].textContent = langData.galCard3;
    galCaptions[3].textContent = langData.galCard4;
    galCaptions[4].textContent = langData.galCard5;
    galCaptions[5].textContent = langData.galCard6;
  }

  // 6. Update Games Section (Arcade Math Games)
  if ($("#games .section-tag")) $("#games .section-tag").textContent = langData.gamesTag;
  if ($("#games h2")) $("#games h2").textContent = langData.gamesHeading;
  if ($("#games p")) $("#games p").textContent = langData.gamesSub;
  const gameTabBtns = $$(".games-tab-bar .game-tab-btn span");
  if (gameTabBtns.length >= 2) {
    gameTabBtns[0].textContent = langData.game1Tab;
    gameTabBtns[1].textContent = langData.game2Tab;
  }
  if ($(".equation-instruction")) $(".equation-instruction").textContent = langData.arithInstruction;
  if ($(".sliding-goal-caption")) $(".sliding-goal-caption").innerHTML = langData.slideGoal;

  // 7. Update Customize Section Headings & Tabs
  if ($("#customize .section-tag")) $("#customize .section-tag").textContent = langData.customTag;
  if ($("#customize h2")) $("#customize h2").textContent = langData.customHeading;
  if ($("#customize p")) $("#customize p").textContent = langData.customSub;

  const studioTabs = $$(".studio-tabs .tab-btn");
  if (studioTabs.length >= 9) {
    studioTabs[0].textContent = langData.tabCard;
    studioTabs[1].textContent = langData.tabNavbar;
    studioTabs[2].textContent = langData.tabHero;
    studioTabs[3].textContent = langData.tabFeatures;
    studioTabs[4].textContent = langData.tabAbout;
    studioTabs[5].textContent = langData.tabGallery;
    studioTabs[6].textContent = langData.tabMessages;
    studioTabs[7].textContent = langData.tabCta;
    studioTabs[8].textContent = langData.tabStyle;
  }

  const steps = $$("#customize .step");
  if (steps.length >= 2) {
    if (steps[0].querySelector("b")) steps[0].querySelector("b").textContent = langData.step1Title;
    if (steps[0].querySelector("small")) steps[0].querySelector("small").textContent = langData.step1Desc;
    if (steps[1].querySelector("b")) steps[1].querySelector("b").textContent = langData.step2Title;
    if (steps[1].querySelector("small")) steps[1].querySelector("small").textContent = langData.step2Desc;
  }
  if ($("#demoBtn")) $("#demoBtn").textContent = langData.demoBtn;

  // 8. Update Form Placeholders & Live Card Default Text
  if ($("#cardTagInput")) $("#cardTagInput").placeholder = langData.cardTagDefault;
  if ($("#cardTitlePrefixInput")) $("#cardTitlePrefixInput").placeholder = langData.cardTitleDefault;
  if (teacherName) teacherName.placeholder = langData.phTeacher;
  if (studentName) studentName.placeholder = langData.phStudent;
  if (message) message.placeholder = langData.phMessage;

  // Sync default card inputs & preview text when language changes if defaults are active
  const cardTagEl = $('[data-text-id="tag"]');
  const cardTitleEl = $("#pTitle");
  if (cardTagEl && ($("#cardTagInput").value === "With Gratitude" || $("#cardTagInput").value === "सादर कृतज्ञता" || $("#cardTagInput").value === "Con Gratitud" || $("#cardTagInput").value === "Avec Gratitude" || $("#cardTagInput").value === "Mit Dankbarkeit" || $("#cardTagInput").value === "Sevgi ve Minnetle")) {
    $("#cardTagInput").value = langData.cardTagDefault;
    cardTagEl.textContent = langData.cardTagDefault;
  }

  const lblEls = $$("#tab-card label");
  if (lblEls.length >= 5) {
    lblEls[0].textContent = langData.lblCardTag;
    lblEls[1].textContent = langData.lblCardHeading;
    lblEls[2].textContent = langData.lblTeacher;
    lblEls[3].textContent = langData.lblStudent;
    lblEls[4].textContent = langData.lblMessage;
  }

  if ($("#previewBtn")) $("#previewBtn").textContent = langData.btnApply;
  if ($("#downloadBtn")) $("#downloadBtn").textContent = langData.btnDownload;

  // 9. Update Testimonials / Messages Section
  if ($("#messages .section-tag")) $("#messages .section-tag").textContent = langData.msgTag;
  if ($("#messages h2")) $("#messages h2").textContent = langData.msgHeading;
  const quotes = $$(".test-grid .quote");
  if (quotes.length >= 3) {
    if (quotes[0].querySelector("p")) quotes[0].querySelector("p").textContent = langData.quote1Text;
    if (quotes[0].querySelector("b")) quotes[0].querySelector("b").textContent = langData.quote1Name;
    if (quotes[0].querySelector("small")) quotes[0].querySelector("small").textContent = langData.quote1Role;

    if (quotes[1].querySelector("p")) quotes[1].querySelector("p").textContent = langData.quote2Text;
    if (quotes[1].querySelector("b")) quotes[1].querySelector("b").textContent = langData.quote2Name;
    if (quotes[1].querySelector("small")) quotes[1].querySelector("small").textContent = langData.quote2Role;

    if (quotes[2].querySelector("p")) quotes[2].querySelector("p").textContent = langData.quote3Text;
    if (quotes[2].querySelector("b")) quotes[2].querySelector("b").textContent = langData.quote3Name;
    if (quotes[2].querySelector("small")) quotes[2].querySelector("small").textContent = langData.quote3Role;
  }

  // 10. Update CTA Banner Section
  if ($(".cta-text h2")) $(".cta-text h2").textContent = langData.ctaTitle;
  if ($(".cta-text p")) $(".cta-text p").textContent = langData.ctaDesc;
  if ($(".cta-text .btn")) $(".cta-text .btn").textContent = langData.ctaBtn;

  // 11. Update Footer Section
  if ($(".footer-brand")) $(".footer-brand").innerHTML = langData.footerBrand;

  // 12. Update Apply Modal Section
  if ($("#applyModalTitle")) $("#applyModalTitle").textContent = langData.applyModalTitle;
  if ($("#applyModalDesc")) $("#applyModalDesc").textContent = langData.applyModalDesc;
  if ($("#applyModalOkBtn")) $("#applyModalOkBtn").textContent = langData.applyModalOk;
  if ($("#applyModalDownloadBtn")) $("#applyModalDownloadBtn").textContent = langData.btnDownload;

  // 13. Update Style Switcher Drawer Labels
  if ($(".style-switcher-title span")) $(".style-switcher-title span").textContent = langData.switcherTitle;
  const switcherLabels = $$(".style-switcher-drawer .switcher-label");
  if (switcherLabels.length >= 6) {
    switcherLabels[0].textContent = langData.switcherSkin;
    switcherLabels[1].textContent = langData.switcherLayout;
    if (switcherLabels[2].querySelector("span")) switcherLabels[2].querySelector("span").textContent = langData.switcherSeparator;
    switcherLabels[3].textContent = langData.switcherAnim;
    switcherLabels[4].textContent = langData.switcherFont;
    if (switcherLabels[5].querySelector("span")) switcherLabels[5].querySelector("span").textContent = langData.switcherMusic;
  }

  if (typeof updateCardPreview === "function") {
    updateCardPreview();
  }

  if (showNotification) {
    showToast(langData.toastLang);
  }
}

// Toggle Language Dropdown Logic
const langDropdownWrapper = $("#langDropdownWrapper");
const langSelectBtn = $("#langSelectBtn");

if (langSelectBtn && langDropdownWrapper) {
  langSelectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langDropdownWrapper.classList.toggle("open");
  });
}

$$(".lang-option").forEach(opt => {
  opt.addEventListener("click", (e) => {
    e.stopPropagation();
    const selectedLang = opt.dataset.lang;
    setLanguage(selectedLang, true);
    if (langDropdownWrapper) langDropdownWrapper.classList.remove("open");
  });
});

document.addEventListener("click", (e) => {
  if (langDropdownWrapper && !langDropdownWrapper.contains(e.target)) {
    langDropdownWrapper.classList.remove("open");
  }
});

// Restore saved language on page load / refresh so it does not reset
(function initSavedLanguage() {
  let savedLang = "en";
  try {
    savedLang = localStorage.getItem("selectedLanguage") || "en";
  } catch(e) {}
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setLanguage(savedLang, false);
    });
  } else {
    setLanguage(savedLang, false);
  }
})();

/* --------------------------------------------------------------------------
   3. Theme Mode & Layout Switchers
   -------------------------------------------------------------------------- */
let imgZoom = 1.0;
let imgPosX = 0;
let imgPosY = 0;

const themeToggleBtn = $("#themeToggleBtn");
let savedTheme = localStorage.getItem("theme");
let isDarkMode = savedTheme ? savedTheme === "dark" : false;

function applyTheme() {
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    if (themeToggleBtn) {
      themeToggleBtn.textContent = "☀️";
      themeToggleBtn.setAttribute("title", "Switch to Light Mode");
    }
    if ($("#skinDarkRadio")) $("#skinDarkRadio").checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggleBtn) {
      themeToggleBtn.textContent = "🌙";
      themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
    }
    if ($("#skinLightRadio")) $("#skinLightRadio").checked = true;
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    applyTheme();
    showToast(isDarkMode ? "Dark Mode Enabled 🌙" : "Light Mode Enabled ☀️");
  });
}

applyTheme();

/* --------------------------------------------------------------------------
   4. Customizer Studio Tab & Left Side Preview View Switcher
   -------------------------------------------------------------------------- */
const tabToPreviewMap = {
  "tab-card": "previewCardView",
  "tab-hero": "previewHeroView",
  "tab-features": "previewFeaturesView",
  "tab-about": "previewAboutView",
  "tab-gallery": "previewGalleryView",
  "tab-messages": "previewMessagesView",
  "tab-cta": "previewCtaView",
  "tab-navbar": "previewNavbarView",
  "tab-style": "previewThemeView"
};

$$(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const targetTab = btn.dataset.tab;
    
    $$(".tab-content").forEach(tc => {
      tc.style.display = tc.id === targetTab ? "block" : "none";
    });

    const targetPreviewId = tabToPreviewMap[targetTab] || "previewCardView";
    $$(".studio-preview-view").forEach(pv => {
      pv.style.display = pv.id === targetPreviewId ? "block" : "none";
    });
  });
});

/* --------------------------------------------------------------------------
   4c. Card Background Template, Corner Radius & Custom Background Tuning Logic
   -------------------------------------------------------------------------- */
let activeCardTemplate = "floral";
let customCardBgSrc = "";
let activeCardRadius = 22; // default 22px
let bgFitMode = "cover";   // "cover", "contain", "100% 100%"
let bgZoom = 1.0;
let bgPosX = 0;
let bgPosY = 0;
let bgOverlayOpacity = 0.4;
let bgBlur = 0;
let activeCardFont = "'Baloo 2', cursive";

// Apply Card Background Tuning & Shape UI Update
function applyBackgroundTuningUI() {
  const wrap = $("#previewWrap");
  if (!wrap) return;

  // Set card corner radius
  wrap.style.borderRadius = `${activeCardRadius}px`;

  // Handle custom card background image if selected
  if (activeCardTemplate === "custom" && customCardBgSrc) {
    wrap.style.backgroundImage = `url("${customCardBgSrc}")`;
    wrap.style.backgroundRepeat = "no-repeat";

    if (bgFitMode === "100% 100%") {
      wrap.style.backgroundSize = "100% 100%";
    } else {
      const zoomPct = Math.round(bgZoom * 100);
      wrap.style.backgroundSize = bgZoom !== 1.0 ? `${zoomPct}% auto` : bgFitMode;
    }

    wrap.style.backgroundPosition = `calc(50% + ${bgPosX}px) calc(50% + ${bgPosY}px)`;
    wrap.style.backdropFilter = bgBlur > 0 ? `blur(${bgBlur}px)` : "none";

    let overlay = $("#previewBgOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "previewBgOverlay";
      overlay.className = "card-bg-overlay";
      overlay.style.cssText = "position:absolute; inset:0; pointer-events:none; border-radius:inherit; transition:background 0.2s ease; z-index:1;";
      wrap.style.position = "relative";
      wrap.insertBefore(overlay, wrap.firstChild);
    }
    overlay.style.background = `rgba(255, 255, 255, ${bgOverlayOpacity})`;
    overlay.style.display = "block";
  } else {
    // Hide overlay when standard template or no custom image
    const overlay = $("#previewBgOverlay");
    if (overlay) overlay.style.display = "none";
  }

  // Persist settings
  try {
    localStorage.setItem("activeCardTemplate", activeCardTemplate);
    localStorage.setItem("customCardBgSrc", customCardBgSrc);
    localStorage.setItem("activeCardRadius", activeCardRadius);
    localStorage.setItem("bgFitMode", bgFitMode);
    localStorage.setItem("bgZoom", bgZoom);
    localStorage.setItem("bgPosX", bgPosX);
    localStorage.setItem("bgPosY", bgPosY);
    localStorage.setItem("bgOverlayOpacity", bgOverlayOpacity);
    localStorage.setItem("bgBlur", bgBlur);
  } catch(e) {}
}

// 1. Template Dropdown Toggle
if ($("#templateToggleBtn")) {
  $("#templateToggleBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    const dd = $("#cardTemplateDropdown");
    const arrow = $("#activeTplArrow");
    if (dd) {
      const isVisible = dd.style.display === "grid";
      dd.style.display = isVisible ? "none" : "grid";
      if (arrow) arrow.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
    }
  });
}

// Close template dropdown when clicking outside
document.addEventListener("click", (e) => {
  const dropdown = $("#cardTemplateDropdown");
  const toggleBtn = $("#templateToggleBtn");
  if (dropdown && toggleBtn && !toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
    if ($("#activeTplArrow")) $("#activeTplArrow").style.transform = "rotate(0deg)";
  }
});

// 2. Template Button Click
$$(".card-template-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".card-template-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    activeCardTemplate = btn.dataset.template || "floral";
    const icon = btn.querySelector(".tpl-icon") ? btn.querySelector(".tpl-icon").textContent : "🌸";
    const name = btn.querySelector(".tpl-name") ? btn.querySelector(".tpl-name").textContent : "Floral";

    if ($("#activeTplIcon")) $("#activeTplIcon").textContent = icon;
    if ($("#activeTplName")) $("#activeTplName").textContent = name;

    const wrap = $("#previewWrap");
    if (wrap) {
      wrap.className = "preview-card-wrap " + (activeCardTemplate !== "custom" ? activeCardTemplate : "");
      if (activeCardTemplate !== "custom") {
        wrap.style.backgroundImage = "";
        wrap.style.backgroundSize = "";
        wrap.style.backgroundPosition = "";
      }
    }

    applyBackgroundTuningUI();
    showToast(`Card Template updated to ${name} 🎨`);
  });
});

// 3. Custom Background Image Upload & Reset
if ($("#cardBgPhotoInput")) {
  $("#cardBgPhotoInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      customCardBgSrc = ev.target.result;
      activeCardTemplate = "custom";

      // Select Custom template button UI
      $$(".card-template-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.template === "custom");
      });
      if ($("#activeTplIcon")) $("#activeTplIcon").textContent = "🖼️";
      if ($("#activeTplName")) $("#activeTplName").textContent = "Custom Image";

      if ($("#cardBgThumbnailBox")) $("#cardBgThumbnailBox").style.display = "flex";
      if ($("#cardBgThumbnailImg")) $("#cardBgThumbnailImg").src = customCardBgSrc;

      applyBackgroundTuningUI();
      showToast("Custom Card Background Image Applied! 🖼️");
    };
    reader.readAsDataURL(file);
  });
}

if ($("#resetCardBgBtn")) {
  $("#resetCardBgBtn").addEventListener("click", () => {
    if ($("#cardBgPhotoInput")) $("#cardBgPhotoInput").value = "";
    customCardBgSrc = "";
    activeCardTemplate = "floral";

    $$(".card-template-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.template === "floral");
    });
    if ($("#activeTplIcon")) $("#activeTplIcon").textContent = "🌸";
    if ($("#activeTplName")) $("#activeTplName").textContent = "Floral";

    if ($("#cardBgThumbnailBox")) $("#cardBgThumbnailBox").style.display = "none";
    if ($("#previewWrap")) {
      $("#previewWrap").className = "preview-card-wrap floral";
      $("#previewWrap").style.backgroundImage = "";
    }

    applyBackgroundTuningUI();
    showToast("Custom Background Reset to Floral 🌸");
  });
}

// 4. Corner Radius Buttons
$$(".radius-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".radius-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCardRadius = parseInt(btn.dataset.radius, 10) || 0;
    applyBackgroundTuningUI();
    showToast(`Card shape updated: Radius ${activeCardRadius}px 📐`);
  });
});

// 5. Expandable Background Tuning Panel Toggle
if ($("#openBgAdjustBtn")) {
  $("#openBgAdjustBtn").addEventListener("click", () => {
    const controls = $("#bgControls");
    const arrow = $("#bgAdjustArrow");
    if (controls) {
      const isVisible = controls.style.display === "block";
      controls.style.display = isVisible ? "none" : "block";
      if (arrow) arrow.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
    }
  });
}

// 6. Fit Mode Buttons
$$(".bg-fit-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".bg-fit-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    bgFitMode = btn.dataset.fit || "cover";
    applyBackgroundTuningUI();
  });
});

// 7. Background Tuning Sliders
if ($("#bgZoomSlider")) {
  $("#bgZoomSlider").addEventListener("input", (e) => {
    bgZoom = parseFloat(e.target.value);
    if ($("#bgZoomVal")) $("#bgZoomVal").textContent = `${bgZoom.toFixed(2)}x`;
    applyBackgroundTuningUI();
  });
}

if ($("#bgPosXSlider")) {
  $("#bgPosXSlider").addEventListener("input", (e) => {
    bgPosX = parseInt(e.target.value, 10);
    if ($("#bgPosXVal")) $("#bgPosXVal").textContent = `${bgPosX}px`;
    applyBackgroundTuningUI();
  });
}

if ($("#bgPosYSlider")) {
  $("#bgPosYSlider").addEventListener("input", (e) => {
    bgPosY = parseInt(e.target.value, 10);
    if ($("#bgPosYVal")) $("#bgPosYVal").textContent = `${bgPosY}px`;
    applyBackgroundTuningUI();
  });
}

if ($("#bgOverlaySlider")) {
  $("#bgOverlaySlider").addEventListener("input", (e) => {
    bgOverlayOpacity = parseFloat(e.target.value);
    if ($("#bgOverlayVal")) $("#bgOverlayVal").textContent = `${Math.round(bgOverlayOpacity * 100)}%`;
    applyBackgroundTuningUI();
  });
}

if ($("#bgBlurSlider")) {
  $("#bgBlurSlider").addEventListener("input", (e) => {
    bgBlur = parseInt(e.target.value, 10);
    if ($("#bgBlurVal")) $("#bgBlurVal").textContent = `${bgBlur}px`;
    applyBackgroundTuningUI();
  });
}

// 8. Font Dropdown Toggle & Font Selection
if ($("#fontToggleBtn")) {
  $("#fontToggleBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    const dd = $("#cardFontDropdown");
    const arrow = $("#activeFontArrow");
    if (dd) {
      const isVisible = dd.style.display === "grid";
      dd.style.display = isVisible ? "none" : "grid";
      if (arrow) arrow.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
    }
  });
}

document.addEventListener("click", (e) => {
  const fontDropdown = $("#cardFontDropdown");
  const fontToggleBtn = $("#fontToggleBtn");
  if (fontDropdown && fontToggleBtn && !fontToggleBtn.contains(e.target) && !fontDropdown.contains(e.target)) {
    fontDropdown.style.display = "none";
    if ($("#activeFontArrow")) $("#activeFontArrow").style.transform = "rotate(0deg)";
  }
});

$$(".card-font-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".card-font-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCardFont = btn.dataset.font || "'Baloo 2', cursive";

    const icon = btn.querySelector(".font-icon") ? btn.querySelector(".font-icon").textContent : "✍️";
    const name = btn.querySelector(".font-name") ? btn.querySelector(".font-name").textContent : "Baloo 2";

    if ($("#activeFontIcon")) $("#activeFontIcon").textContent = icon;
    if ($("#activeFontName")) $("#activeFontName").textContent = name;

    const wrap = $("#previewWrap");
    if (wrap) wrap.style.fontFamily = activeCardFont;
    showToast(`Font updated to ${name} ✍️`);
  });
});

/* --------------------------------------------------------------------------
   5. Live Card Preview & Photo Adjustment Logic
   -------------------------------------------------------------------------- */
function updateCardPreview() {
  const tagText = $("#cardTagInput") ? $("#cardTagInput").value.trim() : "With Gratitude";
  const titlePrefix = $("#cardTitlePrefixInput") ? $("#cardTitlePrefixInput").value.trim() : "Happy Teacher's Day";
  const tName = teacherName ? teacherName.value.trim() : "";
  const sName = studentName ? studentName.value.trim() : "";
  const msg = message ? message.value.trim() : "";

  try {
    localStorage.setItem("cardTag", tagText);
    localStorage.setItem("cardTitlePrefix", titlePrefix);
    localStorage.setItem("teacherName", tName);
    localStorage.setItem("studentName", sName);
    localStorage.setItem("cardMessage", msg);
  } catch(e) {}

  if ($(".preview-tag")) {
    $(".preview-tag").textContent = tagText || "With Gratitude";
  }

  let fullHeading = titlePrefix || "Happy Teacher's Day";
  if (tName) {
    fullHeading = `${fullHeading}, ${tName}!`;
  }
  if ($("#pTitle")) {
    $("#pTitle").textContent = fullHeading;
  }

  if ($("#pMsg")) $("#pMsg").textContent = msg || "Thank you for being such an amazing teacher.";
  if ($("#pFrom")) $("#pFrom").textContent = sName ? `— ${sName}` : "— Your Student";
}

[$("#cardTagInput"), $("#cardTitlePrefixInput"), teacherName, studentName, message].forEach(el => {
  if (el) el.addEventListener("input", updateCardPreview);
});

$("#heroScriptInput").addEventListener("input", e => {
  const val = e.target.value || "Happy";
  $(".hero .script").textContent = val;
  $("#miniHeroScript").textContent = val;
});

$("#heroTitleInput").addEventListener("input", e => {
  const val = e.target.value.trim() || "TEACHER'S DAY";
  const formatted = val.includes(" ") ? val.replace(" ", "<br>") : val;
  $(".hero h1 span").innerHTML = formatted;
  $("#miniHeroTitle").innerHTML = formatted;
});

$("#heroSubtextInput").addEventListener("input", e => {
  const val = e.target.value;
  $(".hero-copy p").textContent = val;
  $("#miniHeroSubtext").textContent = val;
});

$$(".hero-preset-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".hero-preset-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const src = btn.dataset.src;
    $(".room-card img").src = src;
    $("#miniHeroImg").src = src;
    if ($("#heroThumbnailImg")) $("#heroThumbnailImg").src = src;
    showToast("Hero section image updated 🖼️");
  });
});

$("#heroPhotoInput").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const src = ev.target.result;
    $(".room-card img").src = src;
    $("#miniHeroImg").src = src;
    if ($("#heroThumbnailImg")) $("#heroThumbnailImg").src = src;
    $$(".hero-preset-btn").forEach(b => b.classList.remove("active"));
    showToast("Custom Hero image uploaded 🖼️");
  };
  reader.readAsDataURL(file);
});

$("#resetHeroImgBtn").addEventListener("click", () => {
  $("#heroPhotoInput").value = "";
  const defaultHeroSrc = "assets/hero_teacher_scene.jpg";
  $(".room-card img").src = defaultHeroSrc;
  $("#miniHeroImg").src = defaultHeroSrc;
  if ($("#heroThumbnailImg")) $("#heroThumbnailImg").src = defaultHeroSrc;
  $$(".hero-preset-btn").forEach((b, idx) => b.classList.toggle("active", idx === 0));
  showToast("Hero section image reset 🖼️");
});

$("#aboutHeadingInput").addEventListener("input", e => {
  const val = e.target.value.trim() || "Honoring the Guides of Our Lives";
  const formatted = val.includes(" ") ? val.replace(" ", "<br>") : val;
  $("#about h2").innerHTML = formatted;
  $("#miniAboutHeading").innerHTML = formatted;
});

$("#aboutDescInput").addEventListener("input", e => {
  const val = e.target.value;
  $("#about p").textContent = val;
  $("#miniAboutDesc").textContent = val;
});

$("#stat1Input").addEventListener("input", e => {
  const val = e.target.value || "5M+";
  $$(".stat strong")[0].textContent = val;
  $("#miniStat1").textContent = val;
});

$("#stat2Input").addEventListener("input", e => {
  const val = e.target.value || "1M+";
  $$(".stat strong")[1].textContent = val;
  $("#miniStat2").textContent = val;
});

$("#stat3Input").addEventListener("input", e => {
  const val = e.target.value || "100+";
  $$(".stat strong")[2].textContent = val;
  $("#miniStat3").textContent = val;
});

$$(".about-preset-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".about-preset-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const src = btn.dataset.src;
    const aboutImg = $("#about .about-art img");
    if (aboutImg) aboutImg.src = src;
    if ($("#miniAboutImg")) $("#miniAboutImg").src = src;
    if ($("#aboutThumbnailImg")) $("#aboutThumbnailImg").src = src;
    showToast("About section image updated 📖");
  });
});

$("#aboutPhotoInput").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const src = ev.target.result;
    const aboutImg = $("#about .about-art img");
    if (aboutImg) aboutImg.src = src;
    if ($("#miniAboutImg")) $("#miniAboutImg").src = src;
    if ($("#aboutThumbnailImg")) $("#aboutThumbnailImg").src = src;
    $$(".about-preset-btn").forEach(b => b.classList.remove("active"));
    showToast("Custom About image uploaded 📖");
  };
  reader.readAsDataURL(file);
});

$("#resetAboutImgBtn").addEventListener("click", () => {
  $("#aboutPhotoInput").value = "";
  const defaultAboutSrc = "assets/about_teacher_male.jpg";
  const aboutImg = $("#about .about-art img");
  if (aboutImg) aboutImg.src = defaultAboutSrc;
  if ($("#miniAboutImg")) $("#miniAboutImg").src = defaultAboutSrc;
  if ($("#aboutThumbnailImg")) $("#aboutThumbnailImg").src = defaultAboutSrc;
  $$(".about-preset-btn").forEach((b, idx) => b.classList.toggle("active", idx === 0));
  showToast("About section image reset 📖");
});

/* --------------------------------------------------------------------------
   4b. Features, Gallery, Quotes & CTA Live Sync Engine
   -------------------------------------------------------------------------- */

// 1. Features Bar Live Sync
function updateFeaturesUI() {
  const feat1Icon = $("#feat1IconInput") ? $("#feat1IconInput").value || "🎨" : "🎨";
  const feat1Title = $("#feat1TitleInput") ? $("#feat1TitleInput").value || "Beautiful Cards" : "Beautiful Cards";
  const feat1Desc = $("#feat1DescInput") ? $("#feat1DescInput").value || "Stunning 5D animated designs" : "Stunning 5D animated designs";

  const feat2Icon = $("#feat2IconInput") ? $("#feat2IconInput").value || "✏️" : "✏️";
  const feat2Title = $("#feat2TitleInput") ? $("#feat2TitleInput").value || "Easy Customization" : "Easy Customization";
  const feat2Desc = $("#feat2DescInput") ? $("#feat2DescInput").value || "Personalize with messages & photos" : "Personalize with messages & photos";

  const feat3Icon = $("#feat3IconInput") ? $("#feat3IconInput").value || "↗" : "↗";
  const feat3Title = $("#feat3TitleInput") ? $("#feat3TitleInput").value || "Share Instantly" : "Share Instantly";
  const feat3Desc = $("#feat3DescInput") ? $("#feat3DescInput").value || "Save your card and spread joy" : "Save your card and spread joy";

  const feat4Icon = $("#feat4IconInput") ? $("#feat4IconInput").value || "♡" : "♡";
  const feat4Title = $("#feat4TitleInput") ? $("#feat4TitleInput").value || "100% Free" : "100% Free";
  const feat4Desc = $("#feat4DescInput") ? $("#feat4DescInput").value || "Create and share completely free" : "Create and share completely free";

  // Main Page Section Updates
  const mainFeatures = $$(".feature");
  if (mainFeatures[0]) {
    if (mainFeatures[0].querySelector(".feature-icon")) mainFeatures[0].querySelector(".feature-icon").textContent = feat1Icon;
    if (mainFeatures[0].querySelector("b")) mainFeatures[0].querySelector("b").textContent = feat1Title;
    if (mainFeatures[0].querySelector("small")) mainFeatures[0].querySelector("small").textContent = feat1Desc;
  }
  if (mainFeatures[1]) {
    if (mainFeatures[1].querySelector(".feature-icon")) mainFeatures[1].querySelector(".feature-icon").textContent = feat2Icon;
    if (mainFeatures[1].querySelector("b")) mainFeatures[1].querySelector("b").textContent = feat2Title;
    if (mainFeatures[1].querySelector("small")) mainFeatures[1].querySelector("small").textContent = feat2Desc;
  }
  if (mainFeatures[2]) {
    if (mainFeatures[2].querySelector(".feature-icon")) mainFeatures[2].querySelector(".feature-icon").textContent = feat3Icon;
    if (mainFeatures[2].querySelector("b")) mainFeatures[2].querySelector("b").textContent = feat3Title;
    if (mainFeatures[2].querySelector("small")) mainFeatures[2].querySelector("small").textContent = feat3Desc;
  }
  if (mainFeatures[3]) {
    if (mainFeatures[3].querySelector(".feature-icon")) mainFeatures[3].querySelector(".feature-icon").textContent = feat4Icon;
    if (mainFeatures[3].querySelector("b")) mainFeatures[3].querySelector("b").textContent = feat4Title;
    if (mainFeatures[3].querySelector("small")) mainFeatures[3].querySelector("small").textContent = feat4Desc;
  }

  // Left Studio Preview Box Updates
  if ($("#miniFeat1Icon")) $("#miniFeat1Icon").textContent = feat1Icon;
  if ($("#miniFeat1Title")) $("#miniFeat1Title").textContent = feat1Title;
  if ($("#miniFeat1Desc")) $("#miniFeat1Desc").textContent = feat1Desc;

  if ($("#miniFeat2Icon")) $("#miniFeat2Icon").textContent = feat2Icon;
  if ($("#miniFeat2Title")) $("#miniFeat2Title").textContent = feat2Title;
  if ($("#miniFeat2Desc")) $("#miniFeat2Desc").textContent = feat2Desc;

  if ($("#miniFeat3Icon")) $("#miniFeat3Icon").textContent = feat3Icon;
  if ($("#miniFeat3Title")) $("#miniFeat3Title").textContent = feat3Title;
  if ($("#miniFeat3Desc")) $("#miniFeat3Desc").textContent = feat3Desc;

  if ($("#miniFeat4Icon")) $("#miniFeat4Icon").textContent = feat4Icon;
  if ($("#miniFeat4Title")) $("#miniFeat4Title").textContent = feat4Title;
  if ($("#miniFeat4Desc")) $("#miniFeat4Desc").textContent = feat4Desc;

  try {
    localStorage.setItem("teachersDay_features", JSON.stringify({
      f1: { icon: feat1Icon, title: feat1Title, desc: feat1Desc },
      f2: { icon: feat2Icon, title: feat2Title, desc: feat2Desc },
      f3: { icon: feat3Icon, title: feat3Title, desc: feat3Desc },
      f4: { icon: feat4Icon, title: feat4Title, desc: feat4Desc }
    }));
  } catch(e) {}
}

["feat1IconInput", "feat1TitleInput", "feat1DescInput",
 "feat2IconInput", "feat2TitleInput", "feat2DescInput",
 "feat3IconInput", "feat3TitleInput", "feat3DescInput",
 "feat4IconInput", "feat4TitleInput", "feat4DescInput"].forEach(id => {
  const inp = $("#" + id);
  if (inp) inp.addEventListener("input", updateFeaturesUI);
});


// 2. Gallery Text Live Sync
function updateGalleryUI() {
  const tag = $("#galleryTagInput") ? $("#galleryTagInput").value || "Gallery" : "Gallery";
  const title = $("#galleryHeadingInput") ? $("#galleryHeadingInput").value || "Beautiful Teacher's Day Cards" : "Beautiful Teacher's Day Cards";
  const sub = $("#gallerySubInput") ? $("#gallerySubInput").value : "Explore our collection of whimsical, 3D animated, and heartfelt greeting card designs.";

  // Main Page Updates
  const galTagEl = $("#gallery .section-tag");
  const galTitleEl = $("#gallery h2");
  const galSubEl = $("#gallery p");
  if (galTagEl) galTagEl.textContent = tag;
  if (galTitleEl) galTitleEl.textContent = title;
  if (galSubEl) galSubEl.textContent = sub;

  // Studio Preview Updates
  if ($("#miniGalleryTag")) $("#miniGalleryTag").textContent = tag;
  if ($("#miniGalleryHeading")) $("#miniGalleryHeading").textContent = title;
  if ($("#miniGallerySub")) $("#miniGallerySub").textContent = sub;

  try {
    localStorage.setItem("teachersDay_galleryText", JSON.stringify({ tag, title, sub }));
  } catch(e) {}
}

["galleryTagInput", "galleryHeadingInput", "gallerySubInput"].forEach(id => {
  const inp = $("#" + id);
  if (inp) inp.addEventListener("input", updateGalleryUI);
});


// 3. Quotes & Testimonials Live Sync
function updateMessagesUI() {
  const tag = $("#msgTagInput") ? $("#msgTagInput").value || "Testimonials" : "Testimonials";
  const heading = $("#msgHeadingInput") ? $("#msgHeadingInput").value || "What Students Say" : "What Students Say";

  const q1Text = $("#quote1TextInput") ? $("#quote1TextInput").value : "";
  const q1Name = $("#quote1NameInput") ? $("#quote1NameInput").value : "";
  const q1Role = $("#quote1RoleInput") ? $("#quote1RoleInput").value : "";

  const q2Text = $("#quote2TextInput") ? $("#quote2TextInput").value : "";
  const q2Name = $("#quote2NameInput") ? $("#quote2NameInput").value : "";
  const q2Role = $("#quote2RoleInput") ? $("#quote2RoleInput").value : "";

  const q3Text = $("#quote3TextInput") ? $("#quote3TextInput").value : "";
  const q3Name = $("#quote3NameInput") ? $("#quote3NameInput").value : "";
  const q3Role = $("#quote3RoleInput") ? $("#quote3RoleInput").value : "";

  // Main Page Updates
  const msgTagEl = $("#messages .section-tag");
  const msgTitleEl = $("#messages h2");
  if (msgTagEl) msgTagEl.textContent = tag;
  if (msgTitleEl) msgTitleEl.textContent = heading;

  const quotes = $$("#messages .quote");
  if (quotes[0]) {
    if (quotes[0].querySelector("p")) quotes[0].querySelector("p").textContent = `"${q1Text}"`;
    if (quotes[0].querySelector("b")) quotes[0].querySelector("b").textContent = q1Name;
    if (quotes[0].querySelector("small")) quotes[0].querySelector("small").textContent = q1Role;
  }
  if (quotes[1]) {
    if (quotes[1].querySelector("p")) quotes[1].querySelector("p").textContent = `"${q2Text}"`;
    if (quotes[1].querySelector("b")) quotes[1].querySelector("b").textContent = q2Name;
    if (quotes[1].querySelector("small")) quotes[1].querySelector("small").textContent = q2Role;
  }
  if (quotes[2]) {
    if (quotes[2].querySelector("p")) quotes[2].querySelector("p").textContent = `"${q3Text}"`;
    if (quotes[2].querySelector("b")) quotes[2].querySelector("b").textContent = q3Name;
    if (quotes[2].querySelector("small")) quotes[2].querySelector("small").textContent = q3Role;
  }

  // Studio Preview Updates
  if ($("#miniMsgTag")) $("#miniMsgTag").textContent = tag;
  if ($("#miniMsgHeading")) $("#miniMsgHeading").textContent = heading;
  if ($("#miniQuote1Text")) $("#miniQuote1Text").textContent = `"${q1Text}"`;
  if ($("#miniQuote1Name")) $("#miniQuote1Name").textContent = q1Name;
  if ($("#miniQuote1Role")) $("#miniQuote1Role").textContent = q1Role;

  try {
    localStorage.setItem("teachersDay_messages", JSON.stringify({
      tag, heading,
      q1: { text: q1Text, name: q1Name, role: q1Role },
      q2: { text: q2Text, name: q2Name, role: q2Role },
      q3: { text: q3Text, name: q3Name, role: q3Role }
    }));
  } catch(e) {}
}

["msgTagInput", "msgHeadingInput",
 "quote1TextInput", "quote1NameInput", "quote1RoleInput",
 "quote2TextInput", "quote2NameInput", "quote2RoleInput",
 "quote3TextInput", "quote3NameInput", "quote3RoleInput"].forEach(id => {
  const inp = $("#" + id);
  if (inp) inp.addEventListener("input", updateMessagesUI);
});


// 4. CTA Banner Live Sync
function updateCtaUI() {
  const title = $("#ctaTitleInput") ? $("#ctaTitleInput").value || "Ready to Make Your Teacher Smile?" : "Ready to Make Your Teacher Smile?";
  const desc = $("#ctaDescInput") ? $("#ctaDescInput").value : "Create a beautiful, personalized Teacher's Day card in just a few clicks!";
  const btnText = $("#ctaBtnTextInput") ? $("#ctaBtnTextInput").value || "Create Your Card Now ✨" : "Create Your Card Now ✨";

  // Main Page Updates
  const ctaTitleEl = $(".cta h2");
  const ctaDescEl = $(".cta p");
  const ctaBtnEl = $(".cta .btn");
  if (ctaTitleEl) ctaTitleEl.textContent = title;
  if (ctaDescEl) ctaDescEl.textContent = desc;
  if (ctaBtnEl) ctaBtnEl.textContent = btnText;

  // Studio Preview Updates
  if ($("#miniCtaTitle")) $("#miniCtaTitle").textContent = title;
  if ($("#miniCtaDesc")) $("#miniCtaDesc").textContent = desc;
  if ($("#miniCtaBtnText")) $("#miniCtaBtnText").textContent = btnText;

  try {
    localStorage.setItem("teachersDay_ctaText", JSON.stringify({ title, desc, btnText }));
  } catch(e) {}
}

["ctaTitleInput", "ctaDescInput", "ctaBtnTextInput"].forEach(id => {
  const inp = $("#" + id);
  if (inp) inp.addEventListener("input", updateCtaUI);
});

$$(".cta-preset-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".cta-preset-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const src = btn.dataset.src;
    $$(".cta .cta-art img").forEach(img => img.src = src);
    if ($("#miniCtaImg")) $("#miniCtaImg").src = src;
    if ($("#ctaThumbnailImg")) $("#ctaThumbnailImg").src = src;
    try { localStorage.setItem("teachersDay_ctaImgSrc", src); } catch(e) {}
    showToast("CTA Banner artwork updated 📣");
  });
});

if ($("#ctaPhotoInput")) {
  $("#ctaPhotoInput").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const src = ev.target.result;
      $$(".cta .cta-art img").forEach(img => img.src = src);
      if ($("#miniCtaImg")) $("#miniCtaImg").src = src;
      if ($("#ctaThumbnailImg")) $("#ctaThumbnailImg").src = src;
      $$(".cta-preset-btn").forEach(b => b.classList.remove("active"));
      try { localStorage.setItem("teachersDay_ctaImgSrc", src); } catch(e) {}
      showToast("Custom CTA image uploaded 📣");
    };
    reader.readAsDataURL(file);
  });
}

if ($("#resetCtaImgBtn")) {
  $("#resetCtaImgBtn").addEventListener("click", () => {
    if ($("#ctaPhotoInput")) $("#ctaPhotoInput").value = "";
    const defaultCtaSrc = "assets/cta_teacher_wave.jpg";
    $$(".cta .cta-art img").forEach(img => img.src = defaultCtaSrc);
    if ($("#miniCtaImg")) $("#miniCtaImg").src = defaultCtaSrc;
    if ($("#ctaThumbnailImg")) $("#ctaThumbnailImg").src = defaultCtaSrc;
    $$(".cta-preset-btn").forEach((b, idx) => b.classList.toggle("active", idx === 0));
    try { localStorage.setItem("teachersDay_ctaImgSrc", defaultCtaSrc); } catch(e) {}
    showToast("CTA Banner image reset 📣");
  });
}

$$(".template-toggle-bar").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const wrapper = btn.closest(".template-toggle-wrapper");
    if (wrapper) wrapper.classList.toggle("open");
  });
});

document.addEventListener("click", (e) => {
  $$(".template-toggle-wrapper").forEach(w => {
    if (!w.contains(e.target)) w.classList.remove("open");
  });
  $$(".font-toggle-wrapper").forEach(w => {
    if (!w.contains(e.target)) w.classList.remove("open");
  });
});

/* Old duplicate card template block removed to consolidate in section 4c */

let activeHeaderFont = "'Baloo 2', cursive, sans-serif";

$$(".header-font-card").forEach(card => {
  card.addEventListener("click", () => {
    activeHeaderFont = card.dataset.font;
    try { localStorage.setItem("siteHeaderFont", activeHeaderFont); } catch(e) {}

    $$(".header-font-card").forEach(c => {
      c.classList.toggle("active", c.dataset.font === activeHeaderFont);
    });

    document.documentElement.style.setProperty("--header-font", activeHeaderFont);
    $$("h1, h2, h3, h4, .section-tag, .script").forEach(el => {
      el.style.fontFamily = activeHeaderFont;
    });

    const fontTitle = card.querySelector(".font-card-name") ? card.querySelector(".font-card-name").textContent : activeHeaderFont;
    showToast(`Website Headings Font set to ${fontTitle}! ✍️`);
  });
});

$("#customColorPicker").addEventListener("input", e => {
  const chosenColor = e.target.value;
  document.documentElement.style.setProperty("--purple", chosenColor);
  if ($("#previewWrap")) $("#previewWrap").style.borderColor = chosenColor;
  try { localStorage.setItem("siteThemeColor", chosenColor); } catch(e) {}
});

let activePhotoLayout = "circle";

$$(".photo-layout-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".photo-layout-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activePhotoLayout = btn.dataset.layout;

    const avatar = $("#avatarBox");
    if (avatar) {
      avatar.classList.remove("layout-circle", "layout-arch", "layout-full");
      avatar.classList.add(`layout-${activePhotoLayout}`);
    }

    const layoutName = btn.querySelector(".pl-name") ? btn.querySelector(".pl-name").textContent : activePhotoLayout;
    showToast(`Photo Frame Layout set to ${layoutName}! 🖼️`);
  });
});

let isDraggingAvatar = false;
let startX = 0;
let startY = 0;
let initialPosX = 0;
let initialPosY = 0;

const avatarBoxEl = $("#avatarBox");

function onDragStart(e) {
  isDraggingAvatar = true;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  startX = clientX;
  startY = clientY;
  initialPosX = imgPosX;
  initialPosY = imgPosY;
  if (avatarBoxEl) avatarBoxEl.style.cursor = "grabbing";
}

function onDragMove(e) {
  if (!isDraggingAvatar) return;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const deltaX = clientX - startX;
  const deltaY = clientY - startY;

  imgPosX = Math.min(Math.max(initialPosX + deltaX, -160), 160);
  imgPosY = Math.min(Math.max(initialPosY + deltaY, -160), 160);

  if ($("#posXSlider")) $("#posXSlider").value = imgPosX;
  if ($("#posYSlider")) $("#posYSlider").value = imgPosY;
  if ($("#posXVal")) $("#posXVal").textContent = imgPosX + "px";
  if ($("#posYVal")) $("#posYVal").textContent = imgPosY + "px";

  applyPhotoTransform();
}

function onDragEnd() {
  if (isDraggingAvatar) {
    isDraggingAvatar = false;
    if (avatarBoxEl) avatarBoxEl.style.cursor = "grab";
  }
}

if (avatarBoxEl) {
  avatarBoxEl.addEventListener("mousedown", onDragStart);
  avatarBoxEl.addEventListener("touchstart", onDragStart, { passive: true });

  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("touchmove", onDragMove, { passive: true });

  window.addEventListener("mouseup", onDragEnd);
  window.addEventListener("touchend", onDragEnd);
}

function applyPhotoTransform() {
  const transformStr = `translate(${imgPosX}px, ${imgPosY}px) scale(${imgZoom})`;
  const imgEl = $("#avatarBox img");
  
  if (imgEl) {
    imgEl.style.transform = transformStr;
    imgEl.style.transformOrigin = "center center";
  } else {
    const avatarBox = $("#avatarBox");
    if (avatarBox) {
      avatarBox.style.transform = transformStr;
      avatarBox.style.transformOrigin = "center center";
    }
  }

  $$("#cardPhotoImg").forEach(img => {
    img.style.transform = transformStr;
    img.style.transformOrigin = "center center";
  });
}

const handleZoom = e => {
  imgZoom = parseFloat(e.target.value);
  $("#zoomVal").textContent = imgZoom.toFixed(2) + "x";
  applyPhotoTransform();
};

const handlePosX = e => {
  imgPosX = parseInt(e.target.value);
  $("#posXVal").textContent = imgPosX + "px";
  applyPhotoTransform();
};

const handlePosY = e => {
  imgPosY = parseInt(e.target.value);
  $("#posYVal").textContent = imgPosY + "px";
  applyPhotoTransform();
};

["input", "change"].forEach(evt => {
  const z = $("#zoomSlider");
  const px = $("#posXSlider");
  const py = $("#posYSlider");
  if (z) z.addEventListener(evt, handleZoom);
  if (px) px.addEventListener(evt, handlePosX);
  if (py) py.addEventListener(evt, handlePosY);
});

$("#resetPhotoBtn").addEventListener("click", () => {
  imgZoom = 1.0;
  imgPosX = 0;
  imgPosY = 0;
  if ($("#zoomSlider")) $("#zoomSlider").value = 1;
  if ($("#posXSlider")) $("#posXSlider").value = 0;
  if ($("#posYSlider")) $("#posYSlider").value = 0;
  $("#zoomVal").textContent = "1.0x";
  $("#posXVal").textContent = "0px";
  $("#posYVal").textContent = "0px";
  applyPhotoTransform();
  showToast("Photo position reset 🔄");
});

const openPhotoAdjustBtn = $("#openPhotoAdjustBtn");
const photoControls = $("#photoControls");

function togglePhotoAdjustDropdown() {
  if (!photoControls) return;
  const isOpen = photoControls.classList.contains("open") || photoControls.style.display === "block";
  if (isOpen) {
    photoControls.classList.remove("open");
    photoControls.style.display = "none";
    if (openPhotoAdjustBtn) openPhotoAdjustBtn.classList.remove("active");
  } else {
    photoControls.classList.add("open");
    photoControls.style.display = "block";
    if (openPhotoAdjustBtn) openPhotoAdjustBtn.classList.add("active");
  }
}

if (openPhotoAdjustBtn) openPhotoAdjustBtn.onclick = togglePhotoAdjustDropdown;

const tbHomeBtn = $("#tbHomeBtn");
const tbTextBtn = $("#tbTextBtn");
const tbPhotoBtn = $("#tbPhotoBtn");
const tbFitBtn = $("#tbFitBtn");
const tbStyleBtn = $("#tbStyleBtn");

function openStyleDrawerTab() {
  const styleTabBtn = document.querySelector('[data-tab="tab-style"]');
  if (styleTabBtn) styleTabBtn.click();
  const customizeSec = document.querySelector('#customize');
  if (customizeSec) customizeSec.scrollIntoView({ behavior: "smooth" });
}

if (tbHomeBtn) tbHomeBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
if (tbTextBtn) tbTextBtn.onclick = () => { if (teacherName) teacherName.focus(); };
if (tbPhotoBtn) tbPhotoBtn.onclick = () => { if ($("#photo")) $("#photo").click(); };
if (tbFitBtn) tbFitBtn.onclick = togglePhotoAdjustDropdown;
if (tbStyleBtn) tbStyleBtn.onclick = openStyleDrawerTab;

$("#photo").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    uploadedImageSrc = ev.target.result;
    const avatar = $("#avatarBox");
    avatar.style.transform = "none";
    avatar.innerHTML = `<img src="${uploadedImageSrc}" id="cardPhotoImg" style="width:100%;height:100%;object-fit:cover;transform-origin:center center;" onerror="this.onerror=null; this.parentElement.innerHTML='🧑‍🏫';">`;
    applyPhotoTransform();
    $("#photoControls").style.display = "block";
    showToast("Photo added! Use sliders below to adjust fit & zoom 🔍");
  };
  reader.readAsDataURL(file);
});

$$(".avatar-preset-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".avatar-preset-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const src = btn.dataset.src;
    const avatar = $("#avatarBox");
    avatar.style.transform = "none";

    if (!src) {
      uploadedImageSrc = null;
      avatar.innerHTML = "🧑‍🏫";
      $("#photoControls").style.display = "block";
      applyPhotoTransform();
      showToast("Avatar set to Default Emoji 🧑‍🏫");
    } else {
      uploadedImageSrc = src;
      avatar.innerHTML = `<img src="${src}" id="cardPhotoImg" style="width:100%;height:100%;object-fit:cover;transform-origin:center center;" onerror="this.onerror=null; this.parentElement.innerHTML='🧑‍🏫';">`;
      applyPhotoTransform();
      $("#photoControls").style.display = "block";
      showToast("Avatar preset updated 🎨");
    }
  });
});

$("#removePhotoBtn").addEventListener("click", () => {
  uploadedImageSrc = null;
  $("#photo").value = "";
  const avatar = $("#avatarBox");
  avatar.style.transform = "none";
  avatar.innerHTML = "🧑‍🏫";
  $$(".avatar-preset-btn").forEach((b, idx) => {
    b.classList.toggle("active", idx === 0);
  });
  imgZoom = 1.0;
  imgPosX = 0;
  imgPosY = 0;
  if ($("#zoomSlider")) $("#zoomSlider").value = 1;
  if ($("#posXSlider")) $("#posXSlider").value = 0;
  if ($("#posYSlider")) $("#posYSlider").value = 0;
  if ($("#zoomVal")) $("#zoomVal").textContent = "1.0x";
  if ($("#posXVal")) $("#posXVal").textContent = "0px";
  if ($("#posYVal")) $("#posYVal").textContent = "0px";
  applyPhotoTransform();
  $("#photoControls").style.display = "block";
  showToast("Photo removed! Restored default avatar 🧑‍🏫");
});

document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", () => {
    console.warn("Image missing or failed to load:", img.src);
    if (img.id === "miniHeroImg" || img.closest(".room-card")) {
      img.src = "assets/hero_teacher_scene.jpg";
    } else if (img.closest(".about-art")) {
      img.src = "assets/about_teacher_male.jpg";
    } else if (img.id === "cardPhotoImg") {
      img.onerror = null;
      $("#avatarBox").innerHTML = "🧑‍🏫";
    }
  });
});

$$(".color").forEach(c => {
  c.addEventListener("click", () => {
    $$(".color, .drop-swatch").forEach(x => x.classList.remove("active"));
    c.classList.add("active");
    const chosenColor = c.dataset.color;
    document.documentElement.style.setProperty("--purple", chosenColor);
    if ($("#customColorPicker")) $("#customColorPicker").value = chosenColor;
    if ($("#previewWrap")) $("#previewWrap").style.borderColor = chosenColor;
    try { localStorage.setItem("siteThemeColor", chosenColor); } catch(e) {}
    showToast("Theme color updated ✨");
  });
});

$("#previewBtn").addEventListener("click", () => {
  updateCardPreview();

  const activeTabBtn = $(".tab-btn.active");
  const activeTab = activeTabBtn ? activeTabBtn.dataset.tab : "tab-card";
  const activePreviewId = tabToPreviewMap[activeTab] || "previewCardView";
  const activePreviewEl = $("#" + activePreviewId);

  const modalBody = $("#applyModalBody");
  modalBody.innerHTML = "";
  if (activePreviewEl) {
    let clone;
    if (activePreviewId === "previewCardView" && $("#previewWrap")) {
      const wrapClone = document.createElement("div");
      wrapClone.className = $("#previewWrap").className;
      wrapClone.style.cssText = $("#previewWrap").style.cssText;
      wrapClone.style.padding = "16px";
      wrapClone.style.borderRadius = "18px";
      wrapClone.style.minHeight = "320px";
      wrapClone.style.maxHeight = "380px";
      const cardClone = activePreviewEl.cloneNode(true);
      cardClone.style.display = "block";
      
      const dlBtn = cardClone.querySelector("#downloadBtn");
      if (dlBtn) dlBtn.style.display = "none";
      
      wrapClone.appendChild(cardClone);
      clone = wrapClone;
    } else {
      clone = activePreviewEl.cloneNode(true);
      clone.style.display = "block";
    }
    
    clone.querySelectorAll("img").forEach(img => {
      if (!img.getAttribute("src") || img.getAttribute("src") === "" || img.src.includes("undefined")) {
        img.style.display = "none";
      } else {
        img.onerror = () => {
          if (img.id === "miniHeroImg") img.src = "assets/hero_teacher_scene.jpg";
          else img.style.display = "none";
        };
      }
    });
    
    modalBody.appendChild(clone);
  }

  $("#applyModal").classList.add("open");
  showToast("Section changes applied live! Opening preview popup 👁️");
});

if ($("#applyModalClose")) $("#applyModalClose").onclick = () => $("#applyModal").classList.remove("open");
if ($("#applyModalOkBtn")) {
  $("#applyModalOkBtn").onclick = () => {
    $("#applyModal").classList.remove("open");
    const activeTabBtn = $(".tab-btn.active");
    const activeTab = activeTabBtn ? activeTabBtn.dataset.tab : "tab-card";
    if (activeTab === "tab-hero") $("#home").scrollIntoView({ behavior: "smooth" });
    else if (activeTab === "tab-about") $("#about").scrollIntoView({ behavior: "smooth" });
    else if (activeTab === "tab-card") $("#customize").scrollIntoView({ behavior: "smooth" });
  };
}

if ($("#applyModalDownloadBtn")) {
  $("#applyModalDownloadBtn").onclick = () => {
    $("#applyModal").classList.remove("open");
    downloadCard();
  };
}

if ($("#applyModal")) {
  $("#applyModal").addEventListener("click", e => {
    if (e.target.id === "applyModal") e.currentTarget.classList.remove("open");
  });
}

if ($("#demoBtn")) {
  $("#demoBtn").addEventListener("click", () => {
    $("#customize .editor").scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* --------------------------------------------------------------------------
   6. HTML5 Canvas Card Exporter & PNG Downloader
   -------------------------------------------------------------------------- */
function triggerDownload(canvas) {
  try {
    const link = document.createElement("a");
    const tName = teacherName.value.trim() || "Teacher";
    link.download = `Teachers_Day_Card_${tName.replace(/[^a-z0-9]/gi, '_')}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Card PNG Downloaded Successfully! 💾");
  } catch (err) {
    console.error("Download error:", err);
    showToast("Card download failed ⚠️");
  }
}

function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function downloadCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1200;
  const ctx = canvas.getContext("2d");

  // Corner radius canvas clipping
  const canvasRadiusScale = (activeCardRadius / 22) * 44;
  ctx.save();
  if (canvasRadiusScale > 0 && typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(0, 0, 1000, 1200, canvasRadiusScale);
    ctx.clip();
  }

  const activeColor = getComputedStyle(document.documentElement).getPropertyValue('--purple').trim() || '#7444ed';
  let primaryTitleColor = "#1e2451";
  let subtitleColor = activeColor;
  let strokeColor = activeColor;
  let msgTextColor = "#3d426b";
  let cornerSymLeft = "🌸";
  let cornerSymRight = "🌸";

  // Preload custom background image if active
  let customBgImg = null;
  if (activeCardTemplate === "custom" && customCardBgSrc) {
    customBgImg = await loadImage(customCardBgSrc);
  }

  if (activeCardTemplate === "custom") {
    if (customBgImg) {
      let imgW = customBgImg.width;
      let imgH = customBgImg.height;
      let canvasW = 1000;
      let canvasH = 1200;
      let dw, dh, dx, dy;

      if (bgFitMode === "100% 100%") {
        dw = canvasW * bgZoom;
        dh = canvasH * bgZoom;
      } else if (bgFitMode === "contain") {
        let ratio = Math.min(canvasW / imgW, canvasH / imgH);
        dw = imgW * ratio * bgZoom;
        dh = imgH * ratio * bgZoom;
      } else { // cover
        let ratio = Math.max(canvasW / imgW, canvasH / imgH);
        dw = imgW * ratio * bgZoom;
        dh = imgH * ratio * bgZoom;
      }
      dx = (canvasW - dw) / 2 + (bgPosX * 2.94);
      dy = (canvasH - dh) / 2 + (bgPosY * 2.94);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasW, canvasH);
      ctx.drawImage(customBgImg, dx, dy, dw, dh);

      if (bgOverlayOpacity > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${bgOverlayOpacity})`;
        ctx.fillRect(0, 0, canvasW, canvasH);
      }
    } else {
      const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1200);
      bgGrad.addColorStop(0, '#ffffff');
      bgGrad.addColorStop(0.5, '#f7f2ff');
      bgGrad.addColorStop(1, '#ebe0ff');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1000, 1200);
    }
    strokeColor = activeColor;
    primaryTitleColor = "#1e2451";
    subtitleColor = activeColor;
    msgTextColor = "#1e2451";
    cornerSymLeft = "🖼️";
    cornerSymRight = "✨";
  } else if (activeCardTemplate === "scrapbook") {
    const bgGrad = ctx.createRadialGradient(500, 600, 100, 500, 600, 800);
    bgGrad.addColorStop(0, '#fdfbf7');
    bgGrad.addColorStop(1, '#ebdfd3');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1000, 1200);
    strokeColor = "#d7c4b7";
    primaryTitleColor = "#4a2c11";
    subtitleColor = "#8c6239";
    msgTextColor = "#5c4033";
    cornerSymLeft = "🌻";
    cornerSymRight = "🌻";
  } else if (activeCardTemplate === "gold") {
    const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1200);
    bgGrad.addColorStop(0, '#1f1a24');
    bgGrad.addColorStop(0.5, '#3a2e1d');
    bgGrad.addColorStop(1, '#15101a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1000, 1200);
    strokeColor = "#ffb52e";
    primaryTitleColor = "#ffcf68";
    subtitleColor = "#ffb52e";
    msgTextColor = "#f0e6cf";
    cornerSymLeft = "⭐";
    cornerSymRight = "✨";
  } else if (activeCardTemplate === "chalk") {
    const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1200);
    bgGrad.addColorStop(0, '#1b2e2b');
    bgGrad.addColorStop(1, '#132421');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1000, 1200);
    strokeColor = "#8d6e63";
    primaryTitleColor = "#ffffff";
    subtitleColor = "#81c784";
    msgTextColor = "#e0f2f1";
    cornerSymLeft = "📝";
    cornerSymRight = "✏️";
  } else if (activeCardTemplate === "sunset") {
    const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1200);
    bgGrad.addColorStop(0, '#ff7e5f');
    bgGrad.addColorStop(1, '#feb47b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1000, 1200);
    strokeColor = "#ffffff";
    primaryTitleColor = "#ffffff";
    subtitleColor = "#ffffff";
    msgTextColor = "#fff5ee";
    cornerSymLeft = "💗";
    cornerSymRight = "💖";
  } else if (activeCardTemplate === "ocean") {
    const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1200);
    bgGrad.addColorStop(0, '#0f2027');
    bgGrad.addColorStop(0.5, '#203a43');
    bgGrad.addColorStop(1, '#2c5364');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1000, 1200);
    strokeColor = "#4dd0e1";
    primaryTitleColor = "#80deea";
    subtitleColor = "#4dd0e1";
    msgTextColor = "#e0f7fa";
    cornerSymLeft = "✨";
    cornerSymRight = "🫧";
  } else if (activeCardTemplate === "3d") {
    const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1200);
    bgGrad.addColorStop(0, '#191436');
    bgGrad.addColorStop(1, '#090617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1000, 1200);
    strokeColor = "#ffffff";
    primaryTitleColor = "#ffffff";
    subtitleColor = "#ffb52e";
    msgTextColor = "#f0ebff";
    cornerSymLeft = "🏫";
    cornerSymRight = "🎓";
  } else if (activeCardTemplate === "neon") {
    const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1200);
    bgGrad.addColorStop(0, '#4F12D6');
    bgGrad.addColorStop(0.55, '#D81B60');
    bgGrad.addColorStop(1, '#FF9800');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1000, 1200);

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let x = 40; x < 960; x += 40) {
      for (let y = 40; y < 1160; y += 40) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    strokeColor = "rgba(255, 255, 255, 0.8)";
    primaryTitleColor = "#ffffff";
    subtitleColor = "#ffe0b2";
    msgTextColor = "#ffffff";
    cornerSymLeft = "🧙‍♂️";
    cornerSymRight = "✨";
  } else {
    const bgGrad = ctx.createLinearGradient(0, 0, 1000, 1200);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(0.5, '#f7f2ff');
    bgGrad.addColorStop(1, '#ebe0ff');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1000, 1200);
  }

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 16;
  ctx.strokeRect(30, 30, 940, 1140);

  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 6;
  ctx.strokeRect(44, 44, 912, 1112);

  ctx.font = "80px sans-serif";
  ctx.fillText(cornerSymLeft, 60, 120);
  ctx.fillText(cornerSymRight, 860, 120);

  const tagText = $("#cardTagInput") ? $("#cardTagInput").value.trim() : "With Gratitude";
  const titlePrefix = $("#cardTitlePrefixInput") ? $("#cardTitlePrefixInput").value.trim() : "Happy Teacher's Day";

  ctx.fillStyle = subtitleColor;
  ctx.font = "bold 28px Poppins";
  ctx.textAlign = "center";
  ctx.fillText((tagText || "WITH GRATITUDE").toUpperCase(), 500, 180);

  const tName = teacherName.value.trim();
  let fullTitle = titlePrefix || "Happy Teacher's Day";
  if (tName) {
    fullTitle = `${fullTitle}, ${tName}!`;
  }
  ctx.fillStyle = primaryTitleColor;
  ctx.font = activeCardTemplate === "chalk" ? "bold 64px 'Caveat', cursive, sans-serif" : `bold 56px ${activeCardFont}`;
  ctx.fillText(fullTitle, 500, 270);

  ctx.beginPath();
  ctx.moveTo(350, 310);
  ctx.lineTo(650, 310);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 4;
  ctx.stroke();

  const img = uploadedImageSrc ? await loadImage(uploadedImageSrc) : null;

  if (img) {
    ctx.save();
    
    if (activePhotoLayout === "full") {
      ctx.drawImage(img, 0, 0, 1000, 1200);
      ctx.fillStyle = "rgba(15, 10, 33, 0.45)";
      ctx.fillRect(0, 0, 1000, 1200);
      ctx.restore();
    } else if (activePhotoLayout === "arch") {
      ctx.beginPath();
      const archX = 370 + (imgPosX * 2);
      const archY = 340 + (imgPosY * 2);
      ctx.roundRect(archX, archY, 260, 310, [130, 130, 40, 40]);
      ctx.clip();
      ctx.drawImage(img, archX, archY, 260 * imgZoom, 310 * imgZoom);
      ctx.restore();
      
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 10;
      ctx.roundRect(archX, archY, 260, 310, [130, 130, 40, 40]);
      ctx.stroke();
    } else {
      ctx.beginPath();
      const circleCenterX = 500 + (imgPosX * 2);
      const circleCenterY = 480 + (imgPosY * 2);
      ctx.arc(circleCenterX, circleCenterY, 110, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      
      const baseDiameter = 220;
      const drawW = baseDiameter * imgZoom;
      const drawH = baseDiameter * imgZoom;
      const drawX = circleCenterX - (drawW / 2);
      const drawY = circleCenterY - (drawH / 2);

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
      
      ctx.beginPath();
      ctx.arc(circleCenterX, circleCenterY, 112, 0, Math.PI * 2, true);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 8;
      ctx.stroke();
    }

    drawCanvasText(ctx, primaryTitleColor, subtitleColor, msgTextColor);
    ctx.restore();
    triggerDownload(canvas);
  } else {
    drawDefaultCanvasAvatar(ctx, strokeColor);
    drawCanvasText(ctx, primaryTitleColor, subtitleColor, msgTextColor);
    ctx.restore();
    triggerDownload(canvas);
  }
}

function drawDefaultCanvasAvatar(ctx, activeColor) {
  ctx.beginPath();
  ctx.arc(500, 480, 110, 0, Math.PI * 2, true);
  ctx.fillStyle = activeColor + "20";
  ctx.fill();
  ctx.strokeStyle = activeColor;
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.font = "130px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🧑‍🏫", 500, 480);
  ctx.textBaseline = "alphabetic";
}

function drawCanvasText(ctx, primaryTitleColor, subtitleColor, msgTextColor) {
  const msg = message.value.trim() || "Thank you for inspiring me, believing in me, and helping me grow!";
  const sName = studentName.value.trim() || "Your Student";

  ctx.fillStyle = msgTextColor || "#3d426b";
  ctx.font = activeCardTemplate === "chalk" ? "bold 38px 'Caveat', cursive, sans-serif" : `italic 32px ${activeCardFont}`;
  
  const words = msg.split(' ');
  let line = '';
  let y = 680;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 700 && n > 0) {
      ctx.fillText(line, 500, y);
      line = words[n] + ' ';
      y += 48;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 500, y);

  ctx.fillStyle = subtitleColor;
  ctx.font = activeCardTemplate === "chalk" ? "bold 44px 'Caveat', cursive, sans-serif" : `bold 38px ${activeCardFont}`;
  ctx.fillText(`— With love, ${sName}`, 500, y + 100);

  // Render User Added Custom Text Blocks / Stickers on exported PNG
  if (typeof customTextBlocks !== 'undefined' && customTextBlocks.length > 0) {
    customTextBlocks.forEach((block, idx) => {
      ctx.fillStyle = primaryTitleColor || "#7444ed";
      ctx.font = `bold 30px ${activeCardFont}`;
      ctx.fillText(block.text, 500 + (block.x * 1.8), y + 150 + (idx * 45) + (block.y * 1.8));
    });
  }

  // Dynamic High-Contrast Branded Footer Watermark Badge
  ctx.save();
  const isDarkBg = ["gold", "chalk", "ocean", "neon"].includes(activeCardTemplate);
  const activeThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--purple').trim() || '#7444ed';
  
  const footerBgColor = isDarkBg ? "rgba(15, 10, 33, 0.78)" : "rgba(255, 255, 255, 0.88)";
  const footerTextColor = isDarkBg ? "#ffffff" : (primaryTitleColor && primaryTitleColor !== "#ffffff" ? primaryTitleColor : "#1e2451");
  const footerBorderColor = subtitleColor || activeThemeColor;

  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(130, 1066, 740, 44, [22]);
  } else {
    ctx.rect(130, 1066, 740, 44);
  }
  ctx.fillStyle = footerBgColor;
  ctx.fill();
  ctx.strokeStyle = footerBorderColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = footerTextColor;
  ctx.font = "bold 20px Poppins, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Made with ❤️ by rTechCoding • Teacher's Day Celebration", 500, 1095);
  ctx.restore();
}

if ($("#downloadBtn")) $("#downloadBtn").addEventListener("click", downloadCard);

$$(".card").forEach(card => {
  card.addEventListener("click", () => {
    const title = card.dataset.title;
    const imgSrc = card.dataset.img;
    if ($("#modalTitle")) $("#modalTitle").textContent = title;
    if ($("#modalImg")) $("#modalImg").src = imgSrc;
    if ($("#modal")) $("#modal").classList.add("open");
  });
});

if ($("#modalClose")) $("#modalClose").onclick = () => $("#modal").classList.remove("open");
if ($("#modal")) {
  $("#modal").addEventListener("click", e => {
    if (e.target.id === "modal") e.currentTarget.classList.remove("open");
  });
}
if ($("#modalSelectBtn")) {
  $("#modalSelectBtn").addEventListener("click", () => {
    $("#modal").classList.remove("open");
    $("#customize .editor").scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function showToast(text) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => observer.observe(el));

const navAnchors = $$(".nav-links a");
const sectionEls = $$("header[id], section[id]");

function highlightActiveNav() {
  const scrollPos = window.scrollY + 160;
  let currentSectionId = "home";

  sectionEls.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navAnchors.forEach(a => {
    const targetId = a.getAttribute("href").replace("#", "");
    if (targetId === currentSectionId) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", highlightActiveNav);
window.addEventListener("load", highlightActiveNav);
highlightActiveNav();

if ($("#menuBtn")) {
  $("#menuBtn").onclick = () => {
    $("#navLinks").classList.toggle("active");
  };
}

/* --------------------------------------------------------------------------
   7. Interactive Background Animation Engine (Canvas)
   -------------------------------------------------------------------------- */
const bgCanvas = $("#bgAnimCanvas");
const bgCtx = bgCanvas ? bgCanvas.getContext("2d") : null;

let currentAnimMode = "mesh";
let animParticles = [];
let animReqId = null;
let meshHue = 0;

function resizeBgCanvas() {
  if (!bgCanvas) return;
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeBgCanvas);
resizeBgCanvas();

function initAnimParticles(mode) {
  animParticles = [];
  const count = mode === "confetti" ? 65 : mode === "particles" ? 55 : 36;
  const w = bgCanvas ? bgCanvas.width : window.innerWidth;
  const h = bgCanvas ? bgCanvas.height : window.innerHeight;

  for (let i = 0; i < count; i++) {
    animParticles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: mode === "confetti" ? Math.random() * 10 + 6 : mode === "bubbles" ? Math.random() * 22 + 10 : Math.random() * 18 + 14,
      vx: (Math.random() - 0.5) * 1.5,
      vy: mode === "bubbles" || mode === "hearts" || mode === "stars" ? -(Math.random() * 1.4 + 0.6) : Math.random() * 2.2 + 1,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.08,
      color: ["#7444ed", "#ff6f9f", "#8e5cf6", "#ffb52e", "#25a8b7"][Math.floor(Math.random() * 5)],
      symbol: mode === "stars" ? "⭐" : mode === "hearts" ? ["💜", "💗", "💖", "💕"][Math.floor(Math.random() * 4)] : null,
      alpha: Math.random() * 0.7 + 0.3
    });
  }
}

function renderBgAnimation() {
  if (!bgCtx) return;
  const w = bgCanvas.width;
  const h = bgCanvas.height;

  bgCtx.clearRect(0, 0, w, h);

  if (currentAnimMode === "mesh") {
    meshHue = (meshHue + 0.35) % 360;
    const grad = bgCtx.createRadialGradient(w * 0.3, h * 0.3, 50, w * 0.5, h * 0.5, w * 0.7);
    grad.addColorStop(0, `hsla(${meshHue}, 80%, 75%, 0.12)`);
    grad.addColorStop(0.5, `hsla(${(meshHue + 60) % 360}, 85%, 80%, 0.08)`);
    grad.addColorStop(1, "transparent");
    bgCtx.fillStyle = grad;
    bgCtx.fillRect(0, 0, w, h);
  } else {
    animParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vRot;

      if (p.y > h + 40) p.y = -40;
      if (p.y < -40) p.y = h + 40;
      if (p.x > w + 40) p.x = -40;
      if (p.x < -40) p.x = w + 40;

      bgCtx.save();
      bgCtx.translate(p.x, p.y);
      bgCtx.rotate(p.rot);

      if (currentAnimMode === "particles") {
        bgCtx.beginPath();
        bgCtx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        bgCtx.fillStyle = p.color;
        bgCtx.globalAlpha = p.alpha;
        bgCtx.shadowBlur = 12;
        bgCtx.shadowColor = p.color;
        bgCtx.fill();
      } else if (currentAnimMode === "confetti") {
        bgCtx.fillStyle = p.color;
        bgCtx.globalAlpha = p.alpha;
        bgCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (currentAnimMode === "bubbles") {
        bgCtx.beginPath();
        bgCtx.arc(0, 0, p.size, 0, Math.PI * 2);
        bgCtx.strokeStyle = "rgba(255, 255, 255, 0.75)";
        bgCtx.lineWidth = 2;
        bgCtx.fillStyle = "rgba(230, 220, 255, 0.15)";
        bgCtx.fill();
        bgCtx.stroke();
        bgCtx.beginPath();
        bgCtx.arc(-p.size * 0.3, -p.size * 0.3, p.size * 0.25, 0, Math.PI * 2);
        bgCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
        bgCtx.fill();
      } else if (currentAnimMode === "stars" || currentAnimMode === "hearts") {
        bgCtx.font = `${p.size}px sans-serif`;
        bgCtx.textAlign = "center";
        bgCtx.textBaseline = "middle";
        bgCtx.globalAlpha = p.alpha;
        bgCtx.fillText(p.symbol, 0, 0);
      }

      bgCtx.restore();
    });
  }

  animReqId = requestAnimationFrame(renderBgAnimation);
}

function setBackgroundAnimation(mode) {
  currentAnimMode = mode;
  initAnimParticles(mode);
  
  $$(".anim-card").forEach(card => {
    card.classList.toggle("active", card.dataset.anim === mode);
  });

  showToast(`${mode.charAt(0).toUpperCase() + mode.slice(1)} Animation Activated! ✨`);
}

$$(".anim-card").forEach(card => {
  card.addEventListener("click", () => {
    const mode = card.dataset.anim;
    try { localStorage.setItem("bgAnimation", mode); } catch(e) {}
    setBackgroundAnimation(mode);
  });
});

/* --------------------------------------------------------------------------
   8. Style Switcher Drawer Event Handlers
   -------------------------------------------------------------------------- */
const styleSwitcherToggle = $("#styleSwitcherToggle");
const navAnimBtn = $("#navAnimBtn");
const styleSwitcherDrawer = $("#styleSwitcherDrawer");
const drawerOverlay = $("#drawerOverlay");
const drawerCloseBtn = $("#drawerCloseBtn");

function openStyleDrawer() {
  if (styleSwitcherDrawer) styleSwitcherDrawer.classList.add("open");
  if (drawerOverlay) drawerOverlay.classList.add("open");
}

function closeStyleDrawer() {
  if (styleSwitcherDrawer) styleSwitcherDrawer.classList.remove("open");
  if (drawerOverlay) drawerOverlay.classList.remove("open");
}

if (styleSwitcherToggle) styleSwitcherToggle.onclick = openStyleDrawer;
if (navAnimBtn) navAnimBtn.onclick = openStyleDrawer;
if (drawerCloseBtn) drawerCloseBtn.onclick = closeStyleDrawer;
if (drawerOverlay) drawerOverlay.onclick = closeStyleDrawer;

$$(".drop-swatch").forEach(drop => {
  drop.addEventListener("click", () => {
    $$(".drop-swatch, .color").forEach(d => d.classList.remove("active"));
    drop.classList.add("active");
    const chosenColor = drop.dataset.color;
    document.documentElement.style.setProperty("--purple", chosenColor);
    if ($("#customColorPicker")) $("#customColorPicker").value = chosenColor;
    if ($("#previewWrap")) $("#previewWrap").style.borderColor = chosenColor;
    try { localStorage.setItem("siteThemeColor", chosenColor); } catch(e) {}
    showToast("Theme accent color updated 💧");
  });
});

const skinLightRadio = $("#skinLightRadio");
const skinDarkRadio = $("#skinDarkRadio");

if (skinLightRadio && skinDarkRadio) {
  skinLightRadio.addEventListener("change", () => {
    isDarkMode = false;
    try { localStorage.setItem("theme", "light"); } catch(e) {}
    applyTheme();
    showToast("Light Skin Activated ☀️");
  });

  skinDarkRadio.addEventListener("change", () => {
    isDarkMode = true;
    try { localStorage.setItem("theme", "dark"); } catch(e) {}
    applyTheme();
    showToast("Dark Skin Activated 🌙");
  });
}

const layoutWideRadio = $("#layoutWideRadio");
const layoutBoxedRadio = $("#layoutBoxedRadio");

if (layoutWideRadio && layoutBoxedRadio) {
  layoutWideRadio.addEventListener("change", () => {
    document.body.classList.remove("boxed-layout");
    try { localStorage.setItem("layoutStyle", "wide"); } catch(e) {}
    showToast("Wide Layout Activated 📏");
  });

  layoutBoxedRadio.addEventListener("change", () => {
    document.body.classList.add("boxed-layout");
    try { localStorage.setItem("layoutStyle", "boxed"); } catch(e) {}
    showToast("Boxed Layout Activated 📦");
  });
}

$$("input[name='separatorRadio']").forEach(radio => {
  radio.addEventListener("change", e => {
    const val = e.target.value;
    try { localStorage.setItem("separatorStyle", val); } catch(e) {}
    $$(".section-tag").forEach(tag => {
      if (val === "solid") tag.style.borderBottom = "2px solid var(--purple)";
      else if (val === "slanted") tag.style.borderBottom = "2px dashed var(--purple)";
      else if (val === "double") tag.style.borderBottom = "4px double var(--purple)";
      else if (val === "wave") tag.style.borderBottom = "2px dotted var(--pink)";
      else if (val === "arrow") tag.style.borderBottom = "3px inset var(--purple)";
    });
    showToast("Separator Style Updated! Scroll to view ✨");
  });
});

const galleryGrid = $("#galleryGrid");
const prevGalleryBtn = $("#prevGallery");
const nextGalleryBtn = $("#nextGallery");

if (galleryGrid && prevGalleryBtn && nextGalleryBtn) {
  const getScrollStep = () => {
    const firstCard = galleryGrid.querySelector(".card");
    return firstCard ? firstCard.offsetWidth + 22 : 300;
  };

  prevGalleryBtn.addEventListener("click", () => {
    galleryGrid.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });

  nextGalleryBtn.addEventListener("click", () => {
    galleryGrid.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------------
   9. LocalStorage Persistence & Reload Handler
   -------------------------------------------------------------------------- */
function loadSavedPreferences() {
  try {
    const savedTName = localStorage.getItem("teacherName");
    const savedSName = localStorage.getItem("studentName");
    const savedMsg = localStorage.getItem("cardMessage");
    if (savedTName !== null && teacherName) teacherName.value = savedTName;
    if (savedSName !== null && studentName) studentName.value = savedSName;
    if (savedMsg !== null && message) message.value = savedMsg;

    const savedColor = localStorage.getItem("siteThemeColor");
    if (savedColor) {
      document.documentElement.style.setProperty("--purple", savedColor);
      if ($("#customColorPicker")) $("#customColorPicker").value = savedColor;
      if ($("#previewWrap")) $("#previewWrap").style.borderColor = savedColor;
      $$(".color, .drop-swatch").forEach(el => {
        el.classList.toggle("active", el.dataset.color === savedColor);
      });
    }

    const savedLayout = localStorage.getItem("layoutStyle");
    if (savedLayout === "boxed") {
      document.body.classList.add("boxed-layout");
      if ($("#layoutBoxedRadio")) $("#layoutBoxedRadio").checked = true;
    } else if (savedLayout === "wide") {
      document.body.classList.remove("boxed-layout");
      if ($("#layoutWideRadio")) $("#layoutWideRadio").checked = true;
    }

    const savedSeparator = localStorage.getItem("separatorStyle");
    if (savedSeparator) {
      const targetRadio = $(`input[name='separatorRadio'][value='${savedSeparator}']`);
      if (targetRadio) {
        targetRadio.checked = true;
        $$(".section-tag").forEach(tag => {
          if (savedSeparator === "solid") tag.style.borderBottom = "2px solid var(--purple)";
          else if (savedSeparator === "slanted") tag.style.borderBottom = "2px dashed var(--purple)";
          else if (savedSeparator === "double") tag.style.borderBottom = "4px double var(--purple)";
          else if (savedSeparator === "wave") tag.style.borderBottom = "2px dotted var(--pink)";
          else if (savedSeparator === "arrow") tag.style.borderBottom = "3px inset var(--purple)";
        });
      }
    }

    const savedAnim = localStorage.getItem("bgAnimation");
    if (savedAnim) {
      currentAnimMode = savedAnim;
      initAnimParticles(savedAnim);
      $$(".anim-card").forEach(card => {
        card.classList.toggle("active", card.dataset.anim === savedAnim);
      });
    }

    const savedHeaderFont = localStorage.getItem("siteHeaderFont") || "'Baloo 2', cursive, sans-serif";
    activeHeaderFont = savedHeaderFont;
    document.documentElement.style.setProperty("--header-font", activeHeaderFont);
    $$("h1, h2, h3, h4, .section-tag, .script").forEach(el => {
      el.style.fontFamily = activeHeaderFont;
    });
    $$(".header-font-card").forEach(card => {
      card.classList.toggle("active", card.dataset.font === activeHeaderFont);
    });

    const savedCustomBg = localStorage.getItem("teachersDay_customCardBgSrc");
    if (savedCustomBg) {
      customCardBgSrc = savedCustomBg;
    }

    const savedCardTpl = localStorage.getItem("cardTemplate");
    if (savedCardTpl) {
      activeCardTemplate = savedCardTpl;
    }
    applyCardBgTemplateUI();

    const savedCardFont = localStorage.getItem("cardTextFont");
    if (savedCardFont) {
      activeCardFont = savedCardFont;
      $$(".card-font-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.font === activeCardFont);
      });
      const previewWrap = $("#previewWrap");
      if (previewWrap) {
        previewWrap.style.fontFamily = activeCardFont;
        const title = previewWrap.querySelector("h3");
        const msg = previewWrap.querySelector(".msg-text");
        const signature = previewWrap.querySelector(".from");
        const sub = previewWrap.querySelector(".card-subtitle");
        if (title) title.style.fontFamily = activeCardFont;
        if (msg) msg.style.fontFamily = activeCardFont;
        if (signature) signature.style.fontFamily = activeCardFont;
        if (sub) sub.style.fontFamily = activeCardFont;
      }
      const matchFontBtn = Array.from($$(".card-font-btn")).find(b => b.dataset.font === activeCardFont);
      if (matchFontBtn) {
        const fontIcon = matchFontBtn.querySelector(".font-icon") ? matchFontBtn.querySelector(".font-icon").textContent : "✍️";
        const fontTitle = matchFontBtn.querySelector(".font-name") ? matchFontBtn.querySelector(".font-name").textContent : activeCardFont;
        ["activeFontIcon", "activeFontIcon2", "activeFontIcon3"].forEach(id => { if ($("#" + id)) $("#" + id).textContent = fontIcon; });
        ["activeFontName", "activeFontName2", "activeFontName3"].forEach(id => {
          if ($("#" + id)) {
            $("#" + id).textContent = fontTitle;
            $("#" + id).style.fontFamily = activeCardFont;
          }
        });
      }
    }

    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) {
      setLanguage(savedLang, false);
    }

    // Restore Draggable Text Positions & Custom Text Blocks
    const savedPos = localStorage.getItem("teachersDay_cardTextPositions");
    if (savedPos) {
      try { cardTextPositions = JSON.parse(savedPos); } catch(e) {}
    }
    const savedCustomTxt = localStorage.getItem("teachersDay_customTextBlocks");
    if (savedCustomTxt) {
      try { customTextBlocks = JSON.parse(savedCustomTxt); } catch(e) {}
    }
    renderCustomTextList();
    applyTextTransforms();

    // Restore Navigation Bar Customization
    const savedNavIcon = localStorage.getItem("teachersDay_navLogoIcon");
    const savedNavText = localStorage.getItem("teachersDay_navLogoText");
    const savedNavColor = localStorage.getItem("teachersDay_navLogoColor");
    const savedNavLinks = localStorage.getItem("teachersDay_navLinkLabels");
    const savedNavStyle = localStorage.getItem("teachersDay_navStyle");

    if (savedNavIcon) {
      navLogoIcon = savedNavIcon;
      if ($("#navLogoIconInput")) $("#navLogoIconInput").value = navLogoIcon;
    }
    if (savedNavText) {
      navLogoText = savedNavText;
      if ($("#navLogoTextInput")) $("#navLogoTextInput").value = navLogoText;
    }
    if (savedNavColor) {
      navLogoColor = savedNavColor;
      if ($("#navLogoColorInput")) $("#navLogoColorInput").value = navLogoColor;
    }
    if (savedNavLinks) {
      try {
        navLinkLabels = JSON.parse(savedNavLinks);
        ["navLink1Input", "navLink2Input", "navLink3Input", "navLink4Input", "navLink5Input"].forEach((id, idx) => {
          if ($("#" + id) && navLinkLabels[idx]) $("#" + id).value = navLinkLabels[idx];
        });
      } catch(e) {}
    }
    if (savedNavStyle) {
      activeNavStyle = savedNavStyle;
      $$(".nav-style-btn").forEach(b => b.classList.toggle("active", b.dataset.navstyle === activeNavStyle));
    }
    updateNavbarUI();

    // Restore Features Bar
    const savedFeats = localStorage.getItem("teachersDay_features");
    if (savedFeats) {
      try {
        const feats = JSON.parse(savedFeats);
        if (feats.f1) {
          if ($("#feat1IconInput")) $("#feat1IconInput").value = feats.f1.icon;
          if ($("#feat1TitleInput")) $("#feat1TitleInput").value = feats.f1.title;
          if ($("#feat1DescInput")) $("#feat1DescInput").value = feats.f1.desc;
        }
        if (feats.f2) {
          if ($("#feat2IconInput")) $("#feat2IconInput").value = feats.f2.icon;
          if ($("#feat2TitleInput")) $("#feat2TitleInput").value = feats.f2.title;
          if ($("#feat2DescInput")) $("#feat2DescInput").value = feats.f2.desc;
        }
        if (feats.f3) {
          if ($("#feat3IconInput")) $("#feat3IconInput").value = feats.f3.icon;
          if ($("#feat3TitleInput")) $("#feat3TitleInput").value = feats.f3.title;
          if ($("#feat3DescInput")) $("#feat3DescInput").value = feats.f3.desc;
        }
        if (feats.f4) {
          if ($("#feat4IconInput")) $("#feat4IconInput").value = feats.f4.icon;
          if ($("#feat4TitleInput")) $("#feat4TitleInput").value = feats.f4.title;
          if ($("#feat4DescInput")) $("#feat4DescInput").value = feats.f4.desc;
        }
        updateFeaturesUI();
      } catch(e) {}
    }

    // Restore Gallery Text
    const savedGalText = localStorage.getItem("teachersDay_galleryText");
    if (savedGalText) {
      try {
        const gal = JSON.parse(savedGalText);
        if ($("#galleryTagInput")) $("#galleryTagInput").value = gal.tag;
        if ($("#galleryHeadingInput")) $("#galleryHeadingInput").value = gal.title;
        if ($("#gallerySubInput")) $("#gallerySubInput").value = gal.sub;
        updateGalleryUI();
      } catch(e) {}
    }

    // Restore Quotes & Testimonials
    const savedMsgs = localStorage.getItem("teachersDay_messages");
    if (savedMsgs) {
      try {
        const msgs = JSON.parse(savedMsgs);
        if ($("#msgTagInput")) $("#msgTagInput").value = msgs.tag;
        if ($("#msgHeadingInput")) $("#msgHeadingInput").value = msgs.heading;
        if (msgs.q1) {
          if ($("#quote1TextInput")) $("#quote1TextInput").value = msgs.q1.text;
          if ($("#quote1NameInput")) $("#quote1NameInput").value = msgs.q1.name;
          if ($("#quote1RoleInput")) $("#quote1RoleInput").value = msgs.q1.role;
        }
        if (msgs.q2) {
          if ($("#quote2TextInput")) $("#quote2TextInput").value = msgs.q2.text;
          if ($("#quote2NameInput")) $("#quote2NameInput").value = msgs.q2.name;
          if ($("#quote2RoleInput")) $("#quote2RoleInput").value = msgs.q2.role;
        }
        if (msgs.q3) {
          if ($("#quote3TextInput")) $("#quote3TextInput").value = msgs.q3.text;
          if ($("#quote3NameInput")) $("#quote3NameInput").value = msgs.q3.name;
          if ($("#quote3RoleInput")) $("#quote3RoleInput").value = msgs.q3.role;
        }
        updateMessagesUI();
      } catch(e) {}
    }

    // Restore CTA Banner
    const savedCtaText = localStorage.getItem("teachersDay_ctaText");
    if (savedCtaText) {
      try {
        const cta = JSON.parse(savedCtaText);
        if ($("#ctaTitleInput")) $("#ctaTitleInput").value = cta.title;
        if ($("#ctaDescInput")) $("#ctaDescInput").value = cta.desc;
        if ($("#ctaBtnTextInput")) $("#ctaBtnTextInput").value = cta.btnText;
        updateCtaUI();
      } catch(e) {}
    }

    const savedCtaImgSrc = localStorage.getItem("teachersDay_ctaImgSrc");
    if (savedCtaImgSrc) {
      $$(".cta .cta-art img").forEach(img => img.src = savedCtaImgSrc);
      if ($("#miniCtaImg")) $("#miniCtaImg").src = savedCtaImgSrc;
      if ($("#ctaThumbnailImg")) $("#ctaThumbnailImg").src = savedCtaImgSrc;
      $$(".cta-preset-btn").forEach(b => b.classList.toggle("active", b.dataset.src === savedCtaImgSrc));
    }

  } catch(e) {
    console.warn("Error restoring saved preferences:", e);
  }
}

// ==========================================
// 20. Draggable Card Text & Add Custom Text Block Engine
// ==========================================
let isCardTextLocked = true;
let activeDragTextEl = null;
let dragTextStartX = 0;
let dragTextStartY = 0;
let dragTextInitialX = 0;
let dragTextInitialY = 0;
let cardTextPositions = {
  tag: { x: 0, y: 0 },
  title: { x: 0, y: 0 },
  msg: { x: 0, y: 0 },
  from: { x: 0, y: 0 }
};
let customTextBlocks = [];

function applyTextTransforms() {
  $$(".draggable-card-text").forEach(el => {
    el.classList.toggle("locked", isCardTextLocked);
    const textId = el.dataset.textId;
    if (textId && cardTextPositions[textId]) {
      const pos = cardTextPositions[textId];
      el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
  });

  const container = $("#customTextBlocksContainer");
  if (container) {
    container.innerHTML = "";
    customTextBlocks.forEach((block, idx) => {
      const div = document.createElement("div");
      div.className = "draggable-card-text custom-card-text-block";
      if (isCardTextLocked) div.classList.add("locked");
      div.dataset.customIdx = idx;
      div.style.transform = `translate(${block.x}px, ${block.y}px)`;
      div.style.fontSize = "13px";
      div.style.fontWeight = "700";
      div.style.color = "var(--purple)";
      div.style.margin = "6px 0";
      div.textContent = block.text;

      div.addEventListener("mousedown", onTextDragStart);
      div.addEventListener("touchstart", onTextDragStart, { passive: true });
      container.appendChild(div);
    });
  }
}

function onTextDragStart(e) {
  if (isCardTextLocked) return;
  activeDragTextEl = e.currentTarget;
  activeDragTextEl.classList.add("dragging");

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  dragTextStartX = clientX;
  dragTextStartY = clientY;

  const textId = activeDragTextEl.dataset.textId;
  if (textId && cardTextPositions[textId]) {
    dragTextInitialX = cardTextPositions[textId].x;
    dragTextInitialY = cardTextPositions[textId].y;
  } else if (activeDragTextEl.dataset.customIdx !== undefined) {
    const idx = parseInt(activeDragTextEl.dataset.customIdx);
    dragTextInitialX = customTextBlocks[idx] ? customTextBlocks[idx].x : 0;
    dragTextInitialY = customTextBlocks[idx] ? customTextBlocks[idx].y : 0;
  } else {
    dragTextInitialX = 0;
    dragTextInitialY = 0;
  }
}

function onTextDragMove(e) {
  if (!activeDragTextEl || isCardTextLocked) return;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const deltaX = clientX - dragTextStartX;
  const deltaY = clientY - dragTextStartY;

  const newX = dragTextInitialX + deltaX;
  const newY = dragTextInitialY + deltaY;

  const textId = activeDragTextEl.dataset.textId;
  if (textId && cardTextPositions[textId]) {
    cardTextPositions[textId].x = newX;
    cardTextPositions[textId].y = newY;
    activeDragTextEl.style.transform = `translate(${newX}px, ${newY}px)`;
  } else if (activeDragTextEl.dataset.customIdx !== undefined) {
    const idx = parseInt(activeDragTextEl.dataset.customIdx);
    if (customTextBlocks[idx]) {
      customTextBlocks[idx].x = newX;
      customTextBlocks[idx].y = newY;
      activeDragTextEl.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  }
}

function onTextDragEnd() {
  if (activeDragTextEl) {
    activeDragTextEl.classList.remove("dragging");
    activeDragTextEl = null;
    try {
      localStorage.setItem("teachersDay_cardTextPositions", JSON.stringify(cardTextPositions));
      localStorage.setItem("teachersDay_customTextBlocks", JSON.stringify(customTextBlocks));
    } catch(e) {}
  }
}

$$(".draggable-card-text").forEach(el => {
  el.classList.toggle("locked", isCardTextLocked);
  el.addEventListener("mousedown", onTextDragStart);
  el.addEventListener("touchstart", onTextDragStart, { passive: true });
});

window.addEventListener("mousemove", onTextDragMove);
window.addEventListener("touchmove", onTextDragMove, { passive: true });
window.addEventListener("mouseup", onTextDragEnd);
window.addEventListener("touchend", onTextDragEnd);

function renderCustomTextList() {
  const listEl = $("#customTextBlocksList");
  if (!listEl) return;
  listEl.innerHTML = "";
  customTextBlocks.forEach((block, idx) => {
    const item = document.createElement("div");
    item.className = "custom-text-block-item";
    item.innerHTML = `
      <span>📌 "${block.text}"</span>
      <span class="remove-txt-btn" data-idx="${idx}">❌ Remove</span>
    `;
    item.querySelector(".remove-txt-btn").addEventListener("click", () => {
      customTextBlocks.splice(idx, 1);
      renderCustomTextList();
      applyTextTransforms();
      try { localStorage.setItem("teachersDay_customTextBlocks", JSON.stringify(customTextBlocks)); } catch(e) {}
      showToast("Custom text block removed ❌");
    });
    listEl.appendChild(item);
  });
}

if ($("#addCustomTextBtn")) {
  $("#addCustomTextBtn").addEventListener("click", () => {
    const val = $("#newCustomTextInput").value.trim();
    if (!val) {
      showToast("Please enter text to add ⚠️");
      return;
    }
    customTextBlocks.push({ id: Date.now(), text: val, x: 0, y: 0 });
    $("#newCustomTextInput").value = "";
    renderCustomTextList();
    applyTextTransforms();
    try { localStorage.setItem("teachersDay_customTextBlocks", JSON.stringify(customTextBlocks)); } catch(e) {}
    showToast(`Added custom text block: "${val}" 📌`);
  });
}

if ($("#lockCardTextBtn")) {
  $("#lockCardTextBtn").addEventListener("click", () => {
    isCardTextLocked = !isCardTextLocked;
    $$(".draggable-card-text").forEach(el => {
      el.classList.toggle("locked", isCardTextLocked);
    });
    const lockBtn = $("#lockCardTextBtn");
    const langData = (typeof translations !== "undefined" && translations[currentLang]) ? translations[currentLang] : null;
    if (lockBtn) {
      if (langData && langData.btnDragLock && langData.btnDragUnlock) {
        lockBtn.textContent = isCardTextLocked ? langData.btnDragLock : langData.btnDragUnlock;
      } else {
        lockBtn.textContent = isCardTextLocked ? "🔒 Dragging Locked (Click to Unlock)" : "🔓 Dragging Enabled (Click to Lock)";
      }
    }
    showToast(isCardTextLocked ? "Card text locked in place 🔒" : "Card text unlocked for dragging 🔓");
  });
}

if ($("#resetCardTextPosBtn")) {
  $("#resetCardTextPosBtn").addEventListener("click", () => {
    cardTextPositions = { tag: { x: 0, y: 0 }, title: { x: 0, y: 0 }, msg: { x: 0, y: 0 }, from: { x: 0, y: 0 } };
    applyTextTransforms();
    try {
      localStorage.removeItem("teachersDay_cardTextPositions");
    } catch(e) {}
    showToast("Card text positions reset 🔄");
  });
}

// ==========================================
// 21. Navigation Top Bar Customizer Engine
// ==========================================
let navLogoIcon = "💗";
let navLogoText = "Teacher's Day";
let navLogoColor = "";
let navLinkLabels = ["Home", "About", "Gallery", "Messages", "Customize"];
let activeNavStyle = "glass";

function updateNavbarUI() {
  const logoHeart = $(".logo-heart");
  const logo = $(".logo");
  if (logoHeart) logoHeart.textContent = navLogoIcon;
  if (logo) {
    logo.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
        node.nodeValue = " " + navLogoText;
      }
    });
    if (navLogoColor) {
      logo.style.color = navLogoColor;
    } else {
      logo.style.color = "";
    }
  }

  if ($("#miniNavLogoIcon")) $("#miniNavLogoIcon").textContent = navLogoIcon;
  if ($("#miniNavLogoText")) {
    $("#miniNavLogoText").textContent = navLogoText;
    if (navLogoColor) {
      $("#miniNavLogoText").style.color = navLogoColor;
    } else {
      $("#miniNavLogoText").style.color = "var(--purple)";
    }
  }

  const links = $$(".nav-links a");
  const miniLinkIds = ["miniNavLinkHome", "miniNavLinkAbout", "miniNavLinkGallery", "miniNavLinkMessages", "miniNavLinkCustomize"];

  navLinkLabels.forEach((label, idx) => {
    if (links[idx]) links[idx].textContent = label;
    if ($("#" + miniLinkIds[idx])) $("#" + miniLinkIds[idx]).textContent = label;
  });

  const navEl = $(".nav");
  if (navEl) {
    navEl.classList.remove("style-glass", "style-solid", "style-gradient");
    navEl.classList.add(`style-${activeNavStyle}`);
  }

  try {
    localStorage.setItem("teachersDay_navLogoIcon", navLogoIcon);
    localStorage.setItem("teachersDay_navLogoText", navLogoText);
    localStorage.setItem("teachersDay_navLogoColor", navLogoColor);
    localStorage.setItem("teachersDay_navLinkLabels", JSON.stringify(navLinkLabels));
    localStorage.setItem("teachersDay_navStyle", activeNavStyle);
  } catch(e) {}
}

if ($("#navLogoIconInput")) {
  $("#navLogoIconInput").addEventListener("input", e => {
    navLogoIcon = e.target.value || "💗";
    updateNavbarUI();
  });
}

$$(".nav-icon-preset").forEach(btn => {
  btn.addEventListener("click", () => {
    navLogoIcon = btn.dataset.icon;
    if ($("#navLogoIconInput")) $("#navLogoIconInput").value = navLogoIcon;
    updateNavbarUI();
    showToast(`Navbar logo set to ${navLogoIcon}!`);
  });
});

if ($("#navLogoTextInput")) {
  $("#navLogoTextInput").addEventListener("input", e => {
    navLogoText = e.target.value || "Teacher's Day";
    updateNavbarUI();
  });
}

if ($("#navLogoColorInput")) {
  $("#navLogoColorInput").addEventListener("input", e => {
    navLogoColor = e.target.value;
    updateNavbarUI();
  });
}

$$(".nav-logo-color-preset").forEach(btn => {
  btn.addEventListener("click", () => {
    navLogoColor = btn.dataset.color;
    if ($("#navLogoColorInput")) $("#navLogoColorInput").value = navLogoColor;
    updateNavbarUI();
    showToast("Navbar brand title color updated 🎨");
  });
});

["navLink1Input", "navLink2Input", "navLink3Input", "navLink4Input", "navLink5Input"].forEach((id, idx) => {
  const inp = $("#" + id);
  if (inp) {
    inp.addEventListener("input", e => {
      navLinkLabels[idx] = e.target.value || `Link ${idx + 1}`;
      updateNavbarUI();
    });
  }
});

$$(".nav-style-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".nav-style-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeNavStyle = btn.dataset.navstyle;
    updateNavbarUI();
    showToast(`Top bar style set to ${activeNavStyle.toUpperCase()}! ✨`);
  });
});

// Load All Saved Preferences from LocalStorage on Startup
loadSavedPreferences();

// Start Animation Loop
initAnimParticles(currentAnimMode);
renderBgAnimation();

// Initial Call
updateCardPreview();



