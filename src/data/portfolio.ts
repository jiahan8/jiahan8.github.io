type Project = {
  name: string
  summary: string
  stack: string
  link?: string
  image?: string
  images?: string[]
  /* Parallel to `images` — names the feature each screenshot shows. */
  imageCaptions?: string[]
  imageAlt?: string
}

type Experience = {
  role: string
  company: string
  period: string
  highlights: string[]
}

type SkillGroup = {
  title: string
  skills: string[]
}

type Education = {
  degree: string
  school: string
  period: string
  image?: string
  imageAlt?: string
  summary: string
  courses: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: ['Kotlin', 'Java'],
  },
  {
    title: 'Android Core',
    skills: [
      'Android SDK',
      'ViewModel',
      'LiveData',
      'Data Binding',
      'Navigation',
      'Paging Library',
      'Room',
      'Jetpack Compose',
      'CameraX',
      'Hilt',
      'DataStore',
      'MotionLayout',
      'Notifications',
      'MVVM',
      'RxJava',
      'Coroutines',
      'Flow',
      'Material Design 3',
      'Kotlin Multiplatform (KMP)',
    ],
  },
  {
    title: 'Cloud & Backend',
    skills: [
      'Amazon Web Services (AWS)',
      'Firebase',
      'Firebase Cloud Functions',
      'Google Cloud',
      'Google Cloud Vision API',
    ],
  },
  {
    title: 'Testing & Quality',
    skills: ['JUnit', 'Robolectric', 'MockK', 'Espresso', 'A/B Testing'],
  },
  {
    title: 'CI/CD & Tooling',
    skills: [
      'Git',
      'GitHub Actions',
      'Bitrise',
      'Android Profiler',
      'Retrofit',
      'Ktor',
      'Coil',
      'ExoPlayer',
      'Google AdMob',
      'CleverTap',
      'Postman',
      'Proxyman',
    ],
  },
  {
    title: 'AI Tools',
    skills: ['Claude Code', 'GitHub Copilot', 'ChatGPT', 'AI Agents', 'Model Context Protocol (MCP)'],
  },
]

export const projects: Project[] = [
  {
    name: 'Smart Photos (Android App)',
    summary:
      'Published an Android app using Google ML Kit, Cloud Vision API, and Jetpack CameraX for real-time text recognition from photos.',
    stack: 'Android, Kotlin, Firebase',
    link: 'https://play.google.com/store/apps/details?id=com.jiahan.smartcamera',
    image: '/images/1_homepage.webp',
    images: [
      '/images/1_homepage.webp',
      '/images/2_bottomsheet.webp',
      '/images/3_note.webp',
      '/images/4_search.webp',
      '/images/5_favorite.webp',
      '/images/6_editnote.webp',
      '/images/7_share.webp',
      '/images/8_multilanguage.webp',
    ],
    imageCaptions: [
      'Home feed',
      'Capture sheet',
      'Note detail',
      'Search',
      'Favourites',
      'Note editing',
      'Sharing',
      'Multi-language',
    ],
    imageAlt: 'Smart Photos app preview from Google Play',
  }
]

export const experiences: Experience[] = [
  {
    role: 'Senior Android Software Engineer',
    company: 'Electrolux Home Appliances Sdn. Bhd.',
    period: 'March 2024 – Present',
    highlights: [
      'Managed the full app development lifecycle in an agile environment — from conceptualization through deployment and maintenance — successfully shipping 35 releases to ~700K monthly active users.',
      'Architected core modules of a 20+ module IoT application using Jetpack Compose and Kotlin Multiplatform, sharing 80% of business logic across platforms to reduce duplicate engineering effort.',
      'Improved app accessibility across 10+ screens by implementing semantics and enhancing the TalkBack user experience.',
      'Leveraged Claude Code, GitHub Copilot and the Figma MCP Server to accelerate the development and code review process for the geofencing feature.',
      'Presented newly built features in biweekly company-wide engineering sharing sessions over 2+ years, fielding technical questions from developers across teams.',
    ],
  },
  {
    role: 'Senior Android Software Engineer',
    company: 'Fave Asia Sdn. Bhd',
    period: 'March 2021 – March 2024',
    highlights: [
      'Built key features (Search, Nearby, Arcade) using 10+ Firebase Remote Configs for dynamic app control; ran ~5 A/B tests that drove a 32% increase in conversion rate.',
      'Integrated Google AdMob on the homepage, generating an additional S$800 in monthly revenue.',
      'Deployed 15 deep links for precise in-app navigation, increasing user engagement by 24%.',
      'Refactored codebase from Java to Kotlin with Hilt dependency injection, reducing app size by 13% (72 MB → 63 MB).',
      'Expanded unit and instrumented test coverage, achieving 99.6%+ crash-free user sessions; implemented CleverTap for event tracking and analytics.',
    ],
  },
  {
    role: 'Android Mobile Engineer',
    company: 'Freelance',
    period: 'September 2019 – December 2020',
    highlights: [
      'Diagnosed and resolved UI performance bottlenecks using Android Profiler, Layout Inspector, and overdraw analysis.',
      'Built robust networking and REST API integration layers with Retrofit and offline-capable data persistence with Room local database.',
      'Designed background execution pipelines for long-running tasks using Coroutines and RxJava.',
    ],
  },
  {
    role: 'Android Software Engineer',
    company: 'Advisory Apps Sdn. Bhd.',
    period: 'February 2019 – August 2019',
    highlights: [
      'Developed a real-time messaging system serving 500+ MAU using LiveData and MVVM architecture.',
      'Integrated Firebase and SQLite for data persistence and offline access.',
      'Implemented a location-sharing feature combining Google Maps API, Foursquare API, and GPS for accurate real-time positioning.',
    ],
  },
  {
    role: 'Data Structures & Algorithms Teaching Assistant',
    company: 'Iowa State University',
    period: 'August 2018 – December 2018',
    highlights: [
      'Wrote JUnit test suites used as grading rubrics for weekly programming assignments across 350+ students.',
      'Led weekly recitation sessions of 30+ students; graded exams and coached students on debugging and algorithm tradeoffs.',
    ],
  },
  {
    role: 'IT System Support Technician',
    company: 'Iowa State University',
    period: 'June 2017 – December 2017',
    highlights: [
      'Resolved software and hardware issues for customers in person, by phone, and via email.',
      'Collaborated within a 5-person team to maintain and troubleshoot computer systems and LAN/WAN/TCP-IP networks.',
    ],
  },
]

export const education: Education = {
  degree: 'Bachelor of Science in Computer Science',
  school: 'Iowa State University',
  period: 'December 2018',
  image: '/images/isu.png',
  imageAlt: 'Iowa State University logo',
  summary:
    '2nd Place (out of 21), ACM North America Regional Programming Contest at Iowa State University',
  courses: [
    'COMS 327 Advanced Programming in C,C++',
    'COMS 228 Data Structures and Algorithms',
    'COMS 311 Design and Analysis of Algorithms',
    'COMS 281 Digital Logic',
    'COMS 230 Discrete Math',
    'COMS 227 Object Oriented Programming',
    'COMS 472 Principles of Artificial Intelligence',
    'COMS 309 Software Development Practices',
    'COMS 409 Software Requirements Engineering',
    'COMS 417 Software Testing',
  ],
}
