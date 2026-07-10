type Project = {
  name: string
  summary: string
  stack: string
  link?: string
  image?: string
  images?: string[]
  imageAlt?: string
}

export const projects: Project[] = [
  {
    name: 'Smart Photos (Android App)',
    summary:
      'Published an Android app using Google ML Kit, Cloud Vision API, and Jetpack CameraX for real-time text recognition from photos.',
    stack: 'Android, Kotlin, Firebase',
    link: 'https://play.google.com/store/apps/details?id=com.jiahan.smartcamera',
    image: '/images/smart-photos-1.webp',
    images: [
      '/images/smart-photos-1.webp',
      '/images/smart-photos-2.webp',
      '/images/smart-photos-3.webp',
      '/images/smart-photos-4.webp',
      '/images/smart-photos-5.webp',
      '/images/smart-photos-6.webp',
      '/images/smart-photos-7.webp',
    ],
    imageAlt: 'Smart Photos app preview from Google Play',
  }
]

export const experiences = [
  {
    role: 'Senior Android Software Engineer',
    company: 'Electrolux Home Appliances Sdn. Bhd.',
    period: 'March 2024 – Present',
    highlights: [
      'Proficient in the entire app development lifecycle, including conceptualization, design, development, testing, deployment, and maintenance. Successfully managing 35 app releases, serving an audience of approximately 700K monthly active users',
      'Develop a large-scale IoT application with 20+ modules, leveraging Jetpack Compose and Kotlin Multiplatform',
      'Improve overall application performance by ~10% through optimized data structures, efficient algorithms, and strategic caching',
    ],
  },
  {
    role: 'Senior Android Software Engineer',
    company: 'Fave Asia Sdn. Bhd',
    period: 'March 2021 – March 2024',
    highlights: [
      'Built key features (Search, Nearby, Arcade) by utilizing over 10 Firebase Remote Configs to dynamically control the app experience and conducted approximately 5 A/B tests, resulting in a significant 32% increase in the conversion rate',
      'Successfully implemented Google AdMob/Ads on the homepage, boosting revenue by S$800',
      'Deployed 15 deep links for precise in-app navigation, leading to a 24% increase in user engagement',
      'Refactored the codebase to leverage Kotlin and Hilt, reducing the app size by 13% (from 72 MB to 63 MB)',
      'Incorporated CleverTap event trackers and unit tests to enhance stability, resulting in over 99.6% crash-free users',
    ],
  },
  {
    role: 'Android Mobile Engineer',
    company: 'Freelance',
    period: 'September 2019 – December 2020',
    highlights: [
      'Maximized app performance with Android Profiler, Layout Inspector and overdraw reduction',
      'Utilized Retrofit for network calls and Room local database for data searching and offline capabilities',
      'Designed background execution functions for long-running tasks using Coroutines and RxJava',
    ],
  },
  {
    role: 'Android Software Engineer',
    company: 'Advisory Apps Sdn. Bhd.',
    period: 'February 2019 – August 2019',
    highlights: [
      'Developed a messaging system that serves 500+ MAU using LiveData and MVVM to update and display data in real-time',
      'Interacted with Firebase, SQLite databases and local storage for data saving functionality and offline capabilities',
      'Integrated Google Maps API, Foursquare API and GPS to provide an accurate location-sharing feature',
    ],
  },
  {
    role: 'Data Structures & Algorithms Teaching Assistant',
    company: 'Iowa State University',
    period: 'August 2018 – December 2018',
    highlights: [
      'Developed JUnit test cases to serve as a grading rubric for weekly programming assignments for 350+ students',
      'Led weekly recitation sessions of 30+ students, graded exams, and helped students consider tradeoffs between different solutions and become more independent in debugging their code',
    ],
  },
  {
    role: 'IT System Support Technician',
    company: 'Iowa State University',
    period: 'June 2017 – December 2017',
    highlights: [
      'Assisted customers with software and hardware issues across a range of devices in person, via phone and email',
      'Collaborated on a team of 5 to maintain and troubleshoot computer systems, LAN/WAN and TCP/IP networks',
    ],
  },
]

export const education = {
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
