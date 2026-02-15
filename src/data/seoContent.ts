export const GPA_TYPE_INFO = [
  {
    title: "Unweighted GPA (4.0 Scale)",
    description:
      "The most common GPA scale. Every class is worth the same — an A is 4.0 whether it's a regular class or AP. Most colleges use this as a baseline.",
    icon: "scale" as const,
  },
  {
    title: "Weighted GPA (5.0 Scale)",
    description:
      "Rewards you for taking harder classes. Honors courses get +0.5 and AP/IB courses get +1.0 added to your grade points, so an A in AP is 5.0.",
    icon: "trophy" as const,
  },
  {
    title: "UC GPA (Capped Weighted)",
    description:
      "Used by University of California schools. Adds +1.0 for honors courses but limits you to 8 semesters of extra points. Only a-g courses count.",
    icon: "graduation" as const,
  },
];

export const FEATURES = [
  {
    title: "Multiple GPA Systems",
    description:
      "Calculate your unweighted, weighted, and UC GPA all at once. See how your GPA looks under different systems.",
  },
  {
    title: "Target Any College",
    description:
      "Search from thousands of US colleges. We'll automatically use the right GPA formula for your target school.",
  },
  {
    title: "Customizable Boosts",
    description:
      "Every school weights courses differently. Adjust the boost values to match your school's exact system.",
  },
  {
    title: "Semester & Cumulative",
    description:
      "Track your GPA by semester or see your overall cumulative GPA. Add multiple semesters to plan ahead.",
  },
  {
    title: "Clear Explanations",
    description:
      "Understand exactly how your GPA is calculated with plain-English explanations and per-course breakdowns.",
  },
  {
    title: "Free & Private",
    description:
      "No sign-up required. Your data stays in your browser — we never store or share your grades.",
  },
];

export const FAQS = [
  {
    question: "What is the difference between weighted and unweighted GPA?",
    answer:
      "Unweighted GPA uses a standard 4.0 scale where all courses are equal. Weighted GPA (up to 5.0) gives extra points for harder courses like AP, IB, and Honors. For example, an A in a regular class = 4.0 unweighted, but an A in an AP class = 5.0 weighted.",
  },
  {
    question: "How do colleges calculate my GPA?",
    answer:
      "Most colleges recalculate your GPA using their own system. UC schools use a special capped weighted system that limits honors points. Many private colleges focus on unweighted GPA from core academic subjects only. Our calculator shows you how your GPA looks under different systems.",
  },
  {
    question: "What are a-g courses?",
    answer:
      'The UC system requires courses in specific subject areas: (a) History, (b) English, (c) Math, (d) Lab Science, (e) Language Other Than English, (f) Visual/Performing Arts, and (g) College-Prep Elective. Only these "a-g" approved courses count toward your UC GPA.',
  },
  {
    question: "How does the UC capped weighted GPA work?",
    answer:
      "UC adds +1.0 for honors-level courses (AP, IB, and UC-approved honors), but caps the total at 8 semesters of extra points, with no more than 4 from 10th grade. Plus/minus grades are not used — an A- counts the same as an A (4.0).",
  },
  {
    question: "What boost does my school use for Honors classes?",
    answer:
      "It varies by school. The most common system gives Honors +0.5 and AP/IB +1.0, but some schools use +0.3 for Honors or +1.5 for AP. You can customize the boost values in our calculator to match your school's system exactly.",
  },
  {
    question: "Is my data saved?",
    answer:
      "Your courses and settings are saved in your browser's local storage, so they'll be there when you come back. We never send your grades to any server — everything stays on your device.",
  },
];
