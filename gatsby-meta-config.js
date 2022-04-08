module.exports = {
  title: `gyutato`,
  description: `하루 한 장 개발공부`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://gyutato.github.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `gyutato/gyutato.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `이규원`,
    bio: {
      role: `개발자`,
      description: ['혁신을 고민하는', '본질을 생각하는', '기술로 소통하는'],
      thumbnail: 'favicon.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/gyutato`, // `https://github.com/zoomKoding`,
      linkedIn: ``, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `gyuwonlee.olivia@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.12 ~',
        activity: '개인 블로그 운영',
        links: {
          post: ``, // '/gatsby-starter-zoomkoding-introduction',
          github: ``, // 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
          demo: ``, // 'https://www.zoomkoding.com',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '',
        description: '',
        techStack: ['gatsby', 'react'],
        thumbnailUrl: 'blog.png',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
    ],
  },
};
