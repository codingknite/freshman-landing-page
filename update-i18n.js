const fs = require('fs');

const languages = {
  es: {
    features: {
      eyebrow: "CARACTERÍSTICAS",
      title: "Todo lo que necesitas. Nada que no necesites.",
      items: [
        {
          title: "Sube Apuntes, Libros y Exámenes Pasados",
          description: "Tus materiales se convierten automáticamente en tu banco de pruebas personalizado. Sin creación manual de tarjetas. Súbelo y Freshman se encarga del resto."
        },
        {
          title: "Cuatro Modos de Prueba Distintos",
          description: "Cuestionarios. Active Recall. Simulacros de Examen. Exámenes Pasados. Cada modo tiene un propósito de estudio diferente. Usa los cuatro y llega al día del examen habiendo experimentado cada tipo de pregunta imaginable."
        },
        {
          title: "Biblioteca de Estudio Organizada",
          description: "Todos tus apuntes, libros, mazos de tarjetas y materias, organizados y con capacidad de búsqueda. Navega por materia, busca por término, estudia cuando quieras."
        },
        {
          title: "Comparte con tu Grupo de Estudio",
          description: "Comparte apuntes, mazos de tarjetas, exámenes pasados y libros con tus compañeros mediante un solo enlace. Estudiar solo es una opción, no un requisito."
        },
        {
          title: "Personalizado Desde el Primer Día",
          description: "Modo oscuro, preferencias de idioma, objetivos de estudio, métodos de revisión — Freshman aprende cómo estudias y se adapta. Tu experiencia nunca es igual a la de los demás."
        },
        {
          title: "Haz un Seguimiento de tu Progreso",
          description: "Las puntuaciones de las sesiones, las rachas y los resúmenes de rendimiento te indican exactamente dónde estás mejorando y en qué debes enfocarte a continuación. Sin adivinanzas."
        }
      ]
    },
    faqs: {
      title: "Preguntas Frecuentes",
      subtitle: "Tus dudas resueltas",
      contactPrefix: "¿Necesitas más ayuda?",
      contactLink: "Contáctanos",
      items: [
        {
          id: "item-1",
          question: "¿Qué diferencia a Freshman de Anki o Quizlet?",
          answer: "Anki y Quizlet requieren que crees tus tarjetas manualmente. Freshman genera pruebas automáticamente a partir de tus propios materiales subidos, notas, PDFs, libros de texto, exámenes pasados. También obtienes un tutor de IA completo, cuatro modos de prueba, un espacio de trabajo de lectura inteligente y un feed diario de repetición espaciada. Es un sistema de estudio completo, no solo una herramienta de tarjetas didácticas."
        },
        {
          id: "item-2",
          question: "¿Tengo que crear tarjetas yo mismo?",
          answer: "No, y ese es el punto. Sube tus materiales y Freshman construye tus pruebas por ti. Tú te enfocas en estudiar; nosotros manejamos la configuración."
        },
        {
          id: "item-3",
          question: "¿Qué materias y tipos de archivos soporta Freshman?",
          answer: "Freshman funciona en cualquier materia y admite PDFs, documentos de texto, URLs web y notas personales. Derecho, medicina, ingeniería, humanidades, idiomas... si puedes subirlo, Freshman puede ponerte a prueba en ello."
        },
        {
          id: "item-4",
          question: "¿Existe un plan gratuito?",
          answer: "Sí. Puedes empezar a usar Freshman de forma gratuita con acceso a funciones básicas. Los planes de pago desbloquean uso ilimitado, el tutor de IA completo y todos los modos de prueba y examen avanzados."
        },
        {
          id: "item-5",
          question: "¿Funciona para estudiantes de posgrado y doctorado, no solo universitarios?",
          answer: "Absolutamente. El espacio de trabajo web con su lector de fuentes, el canal de resaltado y el tutor de IA está diseñado específicamente para estudios de alto volumen y mucha lectura. Los posgrados e investigadores lo encuentran particularmente poderoso para procesar y retener material académico denso a escala."
        },
        {
          id: "item-6",
          question: "¿Puedo compartir materiales con mi grupo de estudio?",
          answer: "Sí. Puedes compartir notas, mazos de tarjetas y exámenes pasados con tus compañeros de clase a través de un enlace compartible. Ellos pueden abrir tus recursos compartidos directamente en su propia aplicación Freshman."
        },
        {
          id: "item-7",
          question: "¿Están seguros mis datos?",
          answer: "Tus notas, documentos y datos de estudio subidos se almacenan de forma segura. No compartimos tus materiales ni los utilizamos para entrenar modelos de IA de terceros."
        },
        {
          id: "item-8",
          question: "¿Está disponible Freshman en Android?",
          answer: "La aplicación móvil está actualmente disponible en iOS. La aplicación web se ejecuta en cualquier navegador en un dispositivo de escritorio. El soporte para la aplicación Android está planeado."
        },
        {
          id: "item-9",
          question: "¿Puedo cancelar en cualquier momento?",
          answer: "Siempre. Sin tarifas de cancelación, sin fricción. Cancela directamente desde la configuración de tu cuenta cuando quieras."
        }
      ]
    }
  },
  de: {
    features: {
      eyebrow: "FUNKTIONEN",
      title: "Alles, was du brauchst. Nichts, was du nicht brauchst.",
      items: [
        {
          title: "Notizen, Lehrbücher & Altklausuren hochladen",
          description: "Deine Materialien werden automatisch zu deiner personalisierten Testdatenbank. Keine manuelle Kartenerstellung. Lade sie hoch und Freshman kümmert sich um den Rest."
        },
        {
          title: "Vier verschiedene Testmodi",
          description: "Quizze. Active Recall. Probeprüfungen. Altklausuren. Jeder Modus hat einen anderen Studienzweck. Nutze alle vier und komme am Prüfungstag an, nachdem du jede erdenkliche Art von Frage erlebt hast."
        },
        {
          title: "Organisierte Studienbibliothek",
          description: "All deine Notizen, Bücher, Karteikarten und Fächer — organisiert und durchsuchbar. Stöbere nach Fach, suche nach Begriffen, lerne auf Abruf."
        },
        {
          title: "Teile mit deiner Lerngruppe",
          description: "Teile Notizen, Karteikarten, Altklausuren und Lehrbücher mit Klassenkameraden über einen einzigen Link. Allein zu lernen ist eine Wahl, keine Pflicht."
        },
        {
          title: "Personalisiert vom ersten Tag an",
          description: "Dunkelmodus, Sprachpräferenzen, Studienziele, Wiederholungsmethoden — Freshman lernt, wie du studierst, und passt sich an. Deine Erfahrung ist niemals von der Stange."
        },
        {
          title: "Verfolge deinen Fortschritt",
          description: "Sitzungsergebnisse, Abschlusssträhnen und Leistungszusammenfassungen sagen dir genau, wo du dich verbesserst und worauf du dich als nächstes konzentrieren solltest. Kein Raten mehr."
        }
      ]
    },
    faqs: {
      title: "Häufig gestellte Fragen",
      subtitle: "Deine Fragen beantwortet",
      contactPrefix: "Brauchst du weitere Hilfe?",
      contactLink: "Kontaktiere uns",
      items: [
        {
          id: "item-1",
          question: "Was unterscheidet Freshman von Anki oder Quizlet?",
          answer: "Anki und Quizlet verlangen, dass du deine Karten manuell erstellst. Freshman generiert Tests automatisch aus deinen hochgeladenen Materialien, Notizen, PDFs, Lehrbüchern und Altklausuren. Du erhältst auch einen vollständigen KI-Tutor, vier Testmodi, einen intelligenten Lese-Arbeitsbereich und einen täglichen Spaced-Repetition-Feed. Es ist ein komplettes Studiensystem, nicht nur ein Karteikarten-Tool."
        },
        {
          id: "item-2",
          question: "Muss ich Karteikarten selbst erstellen?",
          answer: "Nein, und das ist der Punkt. Lade deine Materialien hoch und Freshman baut deine Tests für dich. Du konzentrierst dich aufs Lernen; wir erledigen die Einrichtung."
        },
        {
          id: "item-3",
          question: "Welche Fächer und Dateitypen unterstützt Freshman?",
          answer: "Freshman funktioniert für jedes Fach und unterstützt PDFs, Textdokumente, Web-URLs und persönliche Notizen. Jura, Medizin, Ingenieurwesen, Geisteswissenschaften, Sprachen — wenn du es hochladen kannst, kann Freshman dich darin testen."
        },
        {
          id: "item-4",
          question: "Gibt es einen kostenlosen Plan?",
          answer: "Ja. Du kannst Freshman kostenlos mit Zugang zu grundlegenden Funktionen nutzen. Kostenpflichtige Pläne schalten unbegrenzte Nutzung, den vollen KI-Tutor und alle erweiterten Test- und Prüfungsmodi frei."
        },
        {
          id: "item-5",
          question: "Funktioniert es für Postgraduierte und Doktoranden, nicht nur für Bachelorstudenten?",
          answer: "Absolut. Der Web-Arbeitsbereich mit seinem Quellenleser, der Hervorhebungs-Pipeline und dem KI-Tutor ist speziell für umfangreiches, leselastiges Studium konzipiert. Postgraduierte und Forscher finden ihn besonders leistungsfähig, um dichtes akademisches Material im großen Maßstab zu verarbeiten und zu behalten."
        },
        {
          id: "item-6",
          question: "Kann ich Materialien mit meiner Lerngruppe teilen?",
          answer: "Ja. Du kannst Notizen, Karteikarten und Altklausuren über einen teilbaren Link mit Klassenkameraden teilen. Sie können deine freigegebenen Ressourcen direkt in ihrer eigenen Freshman-App öffnen."
        },
        {
          id: "item-7",
          question: "Sind meine Daten sicher?",
          answer: "Deine hochgeladenen Notizen, Dokumente und Studiendaten werden sicher gespeichert. Wir teilen deine Materialien nicht und verwenden sie nicht, um KI-Modelle von Drittanbietern zu trainieren."
        },
        {
          id: "item-8",
          question: "Ist Freshman auf Android verfügbar?",
          answer: "Die mobile App ist derzeit auf iOS verfügbar. Die Web-App läuft in jedem Browser auf einem Desktop-Gerät. Die Unterstützung der Android-App ist in Planung."
        },
        {
          id: "item-9",
          question: "Kann ich jederzeit kündigen?",
          answer: "Immer. Keine Kündigungsgebühren, keine Reibung. Kündige direkt in deinen Kontoeinstellungen, wann immer du willst."
        }
      ]
    }
  },
  fr: {
    features: {
      eyebrow: "FONCTIONNALITÉS",
      title: "Tout ce dont vous avez besoin. Rien de superflu.",
      items: [
        {
          title: "Uploadez Notes, Manuels et Annales",
          description: "Vos documents deviennent automatiquement votre banque d'examens personnalisée. Pas de création manuelle de cartes. Uploadez-les et Freshman s'occupe du reste."
        },
        {
          title: "Quatre Modes de Test Distincts",
          description: "Quiz. Active Recall. Examens Blancs. Annales. Chaque mode sert un objectif d'étude différent. Utilisez les quatre et arrivez le jour de l'examen après avoir expérimenté chaque type de question imaginable."
        },
        {
          title: "Bibliothèque d'Étude Organisée",
          description: "Toutes vos notes, livres, paquets de flashcards et matières — organisés et consultables. Parcourez par matière, recherchez par terme, étudiez à la demande."
        },
        {
          title: "Partagez avec votre Groupe d'Étude",
          description: "Partagez vos notes, paquets de flashcards, annales et manuels avec vos camarades via un lien unique. Étudier seul est un choix, pas une obligation."
        },
        {
          title: "Personnalisé Dès le Premier Jour",
          description: "Mode sombre, préférences de langue, objectifs d'étude, méthodes de révision — Freshman apprend comment vous étudiez et s'adapte. Votre expérience n'est jamais la même que celle d'un autre."
        },
        {
          title: "Suivez vos Progrès",
          description: "Les scores des sessions, les séries de complétion et les résumés de performances vous indiquent exactement où vous vous améliorez et sur quoi vous concentrer ensuite. Plus de devinettes."
        }
      ]
    },
    faqs: {
      title: "Questions Fréquentes",
      subtitle: "Vos questions trouvent des réponses",
      contactPrefix: "Besoin de plus d'aide ?",
      contactLink: "Contactez-nous",
      items: [
        {
          id: "item-1",
          question: "Qu'est-ce qui différencie Freshman d'Anki ou de Quizlet ?",
          answer: "Anki et Quizlet exigent que vous construisiez vos cartes manuellement. Freshman génère des tests automatiquement à partir de vos propres documents uploadés, notes, PDF, manuels scolaires, annales. Vous bénéficiez également d'un tuteur IA complet, de quatre modes de test, d'un espace de lecture intelligent et d'un flux quotidien de répétition espacée. C'est un système d'étude complet, pas seulement un outil de flashcards."
        },
        {
          id: "item-2",
          question: "Dois-je créer moi-même des flashcards ?",
          answer: "Non, et c'est bien là l'intérêt. Uploadez vos documents et Freshman construit vos tests pour vous. Vous vous concentrez sur l'étude ; nous nous occupons de la configuration."
        },
        {
          id: "item-3",
          question: "Quelles matières et quels types de fichiers Freshman prend-il en charge ?",
          answer: "Freshman fonctionne avec n'importe quelle matière et prend en charge les PDF, les documents texte, les URL web et les notes personnelles. Droit, médecine, ingénierie, sciences humaines, langues... si vous pouvez l'uploader, Freshman peut vous tester dessus."
        },
        {
          id: "item-4",
          question: "Existe-t-il un plan gratuit ?",
          answer: "Oui. Vous pouvez commencer à utiliser Freshman gratuitement avec accès aux fonctionnalités de base. Les plans payants débloquent une utilisation illimitée, le tuteur IA complet et tous les modes de test et d'examen avancés."
        },
        {
          id: "item-5",
          question: "Est-ce que cela fonctionne pour les étudiants en master et doctorat, pas seulement pour les licences ?",
          answer: "Absolument. L'espace de travail web avec son lecteur de sources, son pipeline de surlignage et son tuteur IA est spécialement conçu pour des études à fort volume de lecture. Les chercheurs le trouvent particulièrement puissant pour traiter et retenir des documents académiques denses à grande échelle."
        },
        {
          id: "item-6",
          question: "Puis-je partager des documents avec mon groupe d'étude ?",
          answer: "Oui. Vous pouvez partager des notes, des paquets de flashcards et des annales avec vos camarades de classe via un lien partageable. Ils peuvent ouvrir vos ressources partagées directement dans leur propre application Freshman."
        },
        {
          id: "item-7",
          question: "Mes données sont-elles en sécurité ?",
          answer: "Vos notes, documents et données d'étude uploadés sont stockés en toute sécurité. Nous ne partageons pas vos documents et ne les utilisons pas pour entraîner des modèles d'IA tiers."
        },
        {
          id: "item-8",
          question: "Freshman est-il disponible sur Android ?",
          answer: "L'application mobile est actuellement disponible sur iOS. L'application web fonctionne dans n'importe quel navigateur sur un ordinateur de bureau. La prise en charge de l'application Android est prévue."
        },
        {
          id: "item-9",
          question: "Puis-je annuler à tout moment ?",
          answer: "Toujours. Pas de frais d'annulation, pas de friction. Annulez directement depuis les paramètres de votre compte quand vous le souhaitez."
        }
      ]
    }
  }
};

for (const lang of ['es', 'de', 'fr']) {
  const filePath = `messages/${lang}.json`;
  const fileData = fs.readFileSync(filePath, 'utf8');
  let data = JSON.parse(fileData);
  data.features = languages[lang].features;
  data.faqs = languages[lang].faqs;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

console.log('Updated i18n JSON files.');
