const blogPosts = [
    {
      id: 1,
      name: "Interview with Photographer & UX Designer, Viola LeBlanc",
      date: "18 March 2025",
      photo_id: "photo_001",
      author: "Viola LeBlanc",
      description:
        "An in-depth discussion with Viola LeBlanc about her journey in photography and UX design. She shares insights into her creative process and the tools she uses.",
    },
    {
      id: 2,
      name: "Exploring the Future of AI in Design",
      date: "25 April 2025",
      photo_id: "photo_002",
      author: "Daniel Thompson",
      description:
        "How artificial intelligence is reshaping the design industry, automating tasks, and enhancing creativity for designers worldwide.",
    },
    {
      id: 3,
      name: "The Impact of Minimalist Design on User Experience",
      date: "10 May 2025",
      photo_id: "photo_003",
      author: "Emily Carter",
      description:
        "A look at how minimalist design influences user interaction and product usability, backed by real-world case studies.",
    },
    {
      id: 4,
      name: "Understanding Color Psychology in UI/UX",
      date: "30 June 2025",
      photo_id: "photo_004",
      author: "Sophia Kim",
      description:
        "Colors have a profound impact on user behavior. This blog explores how designers can use color psychology effectively.",
    },
    {
      id: 5,
      name: "Typography Trends for 2025: What’s Next?",
      date: "15 July 2025",
      photo_id: "photo_005",
      author: "Michael Ross",
      description:
        "An analysis of upcoming typography trends in 2025 and their role in improving readability, engagement, and aesthetics.",
    },
    {
      id: 6,
      name: "Designing for Accessibility: A Guide",
      date: "20 August 2025",
      photo_id: "photo_006",
      author: "James Anderson",
      description:
        "A comprehensive guide to making web and app designs more accessible for people with disabilities, ensuring inclusivity.",
    },
    {
      id: 7,
      name: "The Role of Animation in Modern UI Design",
      date: "5 September 2025",
      photo_id: "photo_007",
      author: "Laura Perez",
      description:
        "How motion design and animations enhance user experience and create more engaging interfaces.",
    },
    {
      id: 8,
      name: "Building a Portfolio as a UX Designer",
      date: "18 September 2025",
      photo_id: "photo_008",
      author: "Nathan Collins",
      description:
        "Tips for crafting a strong UX design portfolio that stands out to recruiters and clients.",
    },
    {
      id: 9,
      name: "The Psychology Behind Microinteractions",
      date: "10 October 2025",
      photo_id: "photo_009",
      author: "Megan Scott",
      description:
        "An exploration of how microinteractions improve usability and user delight in digital products.",
    },
    {
      id: 10,
      name: "Dark Mode vs. Light Mode: What Users Prefer",
      date: "25 October 2025",
      photo_id: "photo_010",
      author: "Robert White",
      description:
        "A deep dive into the benefits and drawbacks of dark mode and light mode in UI design.",
    },
    {
      id: 11,
      name: "Future-Proofing Your Website with Adaptive Design",
      date: "5 November 2025",
      photo_id: "photo_011",
      author: "Ethan Carter",
      description:
        "Strategies to ensure your website adapts to future technological changes and remains user-friendly.",
    },
    {
      id: 12,
      name: "How Augmented Reality is Changing UI/UX",
      date: "18 November 2025",
      photo_id: "photo_012",
      author: "Olivia Martinez",
      description:
        "The rise of AR in UX/UI design and its impact on how users interact with digital content.",
    },
    {
      id: 13,
      name: "Neumorphism: A Design Trend or a Passing Fad?",
      date: "5 December 2025",
      photo_id: "photo_013",
      author: "Chris Bennett",
      description:
        "A closer look at neumorphism in UI design and whether it has long-term viability.",
    },
    {
      id: 14,
      name: "Ethical Considerations in UX Design",
      date: "20 December 2025",
      photo_id: "photo_014",
      author: "Emma Johnson",
      description:
        "Examining the responsibilities of designers to create ethical and unbiased user experiences.",
    },
    {
      id: 15,
      name: "The Science of Eye Tracking in UI Design",
      date: "10 January 2026",
      photo_id: "photo_015",
      author: "David Foster",
      description:
        "How eye-tracking studies help designers understand user behavior and improve interface layouts.",
    },
    {
      id: 16,
      name: "Skeuomorphism vs. Flat Design: Which is Better?",
      date: "25 January 2026",
      photo_id: "photo_016",
      author: "Sophia Lee",
      description:
        "Comparing the pros and cons of skeuomorphic and flat design principles in modern UI.",
    },
    {
      id: 17,
      name: "Why UX Writing Matters for Better Engagement",
      date: "5 February 2026",
      photo_id: "photo_017",
      author: "Alex Green",
      description:
        "The role of UX writing in creating intuitive and user-friendly digital experiences.",
    },
    {
      id: 18,
      name: "How to Improve Mobile App Usability",
      date: "20 February 2026",
      photo_id: "photo_018",
      author: "Rachel Adams",
      description:
        "Best practices for enhancing usability and user satisfaction in mobile apps.",
    },
    {
      id: 19,
      name: "Leveraging User Feedback for UX Improvements",
      date: "10 March 2026",
      photo_id: "photo_019",
      author: "William Roberts",
      description:
        "How gathering and analyzing user feedback helps refine and improve user experiences.",
    },
    {
      id: 20,
      name: "The Future of No-Code and Low-Code Design Tools",
      date: "25 March 2026",
      photo_id: "photo_020",
      author: "Linda Brown",
      description:
        "Exploring how no-code and low-code platforms are transforming the UX/UI landscape for designers and developers.",
    },
    {
      id: 21,
      name: "The Power of Personalization in UX Design",
      date: "10 April 2026",
      photo_id: "photo_021",
      author: "Daniel Wilson",
      description:
        "How personalized experiences improve user engagement and satisfaction in digital products.",
    },
    {
      id: 22,
      name: "The Rise of Voice User Interfaces (VUI)",
      date: "25 April 2026",
      photo_id: "photo_022",
      author: "Sarah Mitchell",
      description:
        "How voice technology is changing the way users interact with digital devices and services.",
    },
    {
      id: 23,
      name: "Bringing Emotional Design to UX",
      date: "5 May 2026",
      photo_id: "photo_023",
      author: "Brandon Hughes",
      description:
        "Why emotional design matters in creating meaningful and impactful user experiences.",
    },
    {
      id: 24,
      name: "The Impact of Loading Speed on UX",
      date: "20 May 2026",
      photo_id: "photo_024",
      author: "Jennifer Harris",
      description:
        "The role of website and app performance in enhancing or degrading user experience.",
    },
    {
      id: 25,
      name: "Balancing Aesthetics and Functionality in UX",
      date: "5 June 2026",
      photo_id: "photo_025",
      author: "Samuel King",
      description:
        "How to create visually stunning designs without sacrificing usability and functionality.",
    },
  ];
  
  export default blogPosts;
  