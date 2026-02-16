export const ACADEMIC_YEAR = "2025-2026";
export const LAST_UPDATED = "February 2026";
export const BASE_URL = "https://thegpacalculator.net";

export const GPA_TYPE_INFO = [
  {
    title: "Unweighted GPA (4.0 Scale)",
    description:
      "The most common GPA scale. Every class is worth the same — an A is 4.0 whether it's a regular class or AP. Most colleges use this as a baseline.",
    icon: "scale" as const,
    href: "/gpa-calculator",
  },
  {
    title: "Weighted GPA (5.0 Scale)",
    description:
      "Rewards you for taking harder classes. Honors courses get +0.5 and AP/IB courses get +1.0 added to your grade points, so an A in AP is 5.0.",
    icon: "trophy" as const,
    href: "/weighted-gpa-calculator",
  },
  {
    title: "UC GPA (Capped Weighted)",
    description:
      "Used by University of California schools. Adds +1.0 for honors courses but limits you to 8 semesters of extra points. Only a-g courses count.",
    icon: "graduation" as const,
    href: "/uc-gpa-calculator",
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

// Page-specific FAQ arrays
export const UC_FAQS = [
  {
    question: "What is a good UC GPA?",
    answer:
      "A UC capped weighted GPA of 3.5 or above is competitive for most UC campuses. For UC Berkeley and UCLA, you typically need a 4.0+ capped weighted GPA. The UC system average for admitted students is around 3.7 capped weighted.",
  },
  {
    question: "Does UC use weighted or unweighted GPA?",
    answer:
      "UC calculates three GPAs: UC Capped Weighted (primary for eligibility), UC Uncapped Weighted, and UC Unweighted. The capped weighted GPA is most commonly cited, which adds up to 8 semesters of +1.0 honors boosts on a 4.0 base scale.",
  },
  {
    question: "Which grades does UC look at?",
    answer:
      "UC only uses grades from 10th and 11th grade in a-g approved courses. 9th grade and 12th grade courses are not included in the UC GPA calculation, though 12th grade courses are reviewed for eligibility.",
  },
  {
    question: "Do UC schools look at plus/minus grades?",
    answer:
      "No. The UC system does not distinguish between plus and minus grades. An A+, A, and A- are all worth 4.0 points. A B+, B, and B- are all worth 3.0 points.",
  },
  {
    question: "What is the difference between UC capped and uncapped GPA?",
    answer:
      "UC Capped Weighted GPA limits honors course boosts to 8 semesters (max 4 from 10th grade). UC Uncapped Weighted GPA applies the +1.0 boost to all eligible honors courses with no limit. Both only count a-g courses from 10th and 11th grade.",
  },
];

export const WEIGHTED_FAQS = [
  {
    question: "What is a good weighted GPA?",
    answer:
      "A weighted GPA of 4.0 or higher is considered good on a 5.0 scale. For competitive colleges, aim for 4.3+. The national average weighted GPA is approximately 3.38. A 4.5+ weighted GPA puts you in the top 5% nationally.",
  },
  {
    question: "How is weighted GPA calculated?",
    answer:
      "Weighted GPA starts with the standard 4.0 grade points and adds boost values based on course difficulty. Typically: Honors courses get +0.5, AP and IB Higher Level get +1.0, and Dual Enrollment/IB Standard Level get +0.5. The result is divided by total credits.",
  },
  {
    question: "Do all colleges use weighted GPA?",
    answer:
      "No. Many selective colleges recalculate your GPA using their own system, often unweighted. However, weighted GPA is still valuable because it shows course rigor. Admissions officers consider both your GPA and the difficulty of your course load.",
  },
  {
    question: "Can my weighted GPA be higher than 5.0?",
    answer:
      "On the standard 5.0 weighted scale, 5.0 is the maximum (an A in an AP/IB HL course). However, some schools use different boost values that could technically push above 5.0, or some schools use a 6.0 scale.",
  },
  {
    question: "Does weighted GPA include all classes?",
    answer:
      "Yes, weighted GPA typically includes all classes on your transcript. Both regular and advanced courses are counted. Regular courses use the standard 4.0 scale, while advanced courses get the additional boost points.",
  },
];

export const AP_FAQS = [
  {
    question: "How much do AP classes boost your GPA?",
    answer:
      "AP classes typically receive a +1.0 boost on the weighted GPA scale. This means an A in an AP class is worth 5.0 points (instead of 4.0), and a B is worth 4.0 points (instead of 3.0). This is the highest boost of any standard course type.",
  },
  {
    question: "Is it better to get an A in regular or B in AP for GPA?",
    answer:
      "For weighted GPA, a B in AP (4.0 weighted) equals an A in regular (4.0 weighted). However, your unweighted GPA would be lower with the B. Colleges generally prefer seeing AP courses because they demonstrate academic rigor.",
  },
  {
    question: "How many AP classes should I take?",
    answer:
      "There is no magic number. Competitive colleges like to see 5-10 AP courses over high school, but quality matters more than quantity. Take AP courses in subjects you are strong in and genuinely interested in. A B+ in AP is better than avoiding the challenge.",
  },
  {
    question: "Do AP exam scores affect my GPA?",
    answer:
      "No. AP exam scores (1-5) are separate from your course grade and do not affect your high school GPA. Your GPA is calculated from the letter grade you earn in the class. However, AP exam scores of 3+ can earn college credit.",
  },
  {
    question: "Do all high schools weight AP classes the same?",
    answer:
      "No. While +1.0 is the most common AP boost, some schools use +0.5, and others use even higher values. Some schools do not weight any courses at all. You can customize the boost values in our calculator to match your school.",
  },
];

export const HOW_IT_WORKS_FAQS = [
  {
    question: "How do you calculate GPA?",
    answer:
      "To calculate GPA: (1) Convert each letter grade to grade points (A=4.0, B=3.0, etc.), (2) For weighted GPA, add boost points for advanced courses, (3) Multiply each course's points by its credits, (4) Add all quality points and divide by total credits.",
  },
  {
    question: "What is the difference between semester and cumulative GPA?",
    answer:
      "Semester GPA only includes courses from a single semester. Cumulative GPA includes all courses across all semesters. Colleges primarily look at cumulative GPA, but semester GPA can show grade trends over time.",
  },
  {
    question: "What GPA scale do most colleges use?",
    answer:
      "Most US colleges primarily use the unweighted 4.0 GPA scale for admissions decisions. However, they also consider weighted GPA and course rigor. UC schools use their own capped weighted system. Some colleges recalculate your GPA entirely.",
  },
  {
    question: "Do colleges see my weighted or unweighted GPA?",
    answer:
      "Colleges see both. Your transcript typically shows your school's reported GPA (often weighted), and many colleges recalculate your GPA using their own system. Selective colleges often focus on unweighted GPA plus course rigor.",
  },
  {
    question: "How do credits affect GPA calculation?",
    answer:
      "Credits weight each course's contribution to your GPA. A 1-credit course contributes twice as much as a 0.5-credit course. Most semester-long high school courses are 1 credit, but some (like PE or study hall) may be 0.5 credits.",
  },
];

export const GOOD_GPA_FAQS = [
  {
    question: "What is a good GPA for college?",
    answer:
      "A GPA of 3.5 or higher (on a 4.0 unweighted scale) is considered good for most colleges. For highly selective schools like Ivy League, you typically need 3.8+. For state universities, 3.0-3.5 is often competitive. A weighted GPA of 4.0+ is generally considered strong.",
  },
  {
    question: "What is the average high school GPA?",
    answer:
      "The national average high school GPA is approximately 3.0 on an unweighted 4.0 scale (a B average). The average weighted GPA is approximately 3.38. These averages have been trending upward due to grade inflation.",
  },
  {
    question: "Can I get into college with a 2.5 GPA?",
    answer:
      "Yes. Many colleges accept students with a 2.5 GPA, including many state universities and community colleges. Open-admission institutions accept all applicants. However, a 2.5 GPA will limit your options at more selective schools.",
  },
  {
    question: "How can I raise my GPA quickly?",
    answer:
      "Focus on: (1) Getting A's in current classes, (2) Taking weighted courses where you can earn a B or better, (3) Retaking courses if your school allows grade replacement, (4) Using summer school to add high grades. Each semester is a fresh opportunity.",
  },
];

export const GPA_SCALE_FAQS = [
  {
    question: "What is the 4.0 GPA scale?",
    answer:
      "The 4.0 GPA scale is the standard unweighted grading system used in the US. An A = 4.0, B = 3.0, C = 2.0, D = 1.0, and F = 0.0. Most schools also use plus/minus grades (A- = 3.7, B+ = 3.3, etc.).",
  },
  {
    question: "How do you convert percentage grades to GPA?",
    answer:
      "Common conversion: 93-100% = A (4.0), 90-92% = A- (3.7), 87-89% = B+ (3.3), 83-86% = B (3.0), 80-82% = B- (2.7), 77-79% = C+ (2.3), 73-76% = C (2.0), 70-72% = C- (1.7), 67-69% = D+ (1.3), 60-66% = D (1.0), below 60% = F (0.0).",
  },
  {
    question: "What is the difference between 4.0 and 5.0 GPA scales?",
    answer:
      "The 4.0 scale is unweighted — all courses are equal. The 5.0 scale is weighted — advanced courses (AP, IB, Honors) get extra points above 4.0. A student with all A's in AP classes would have a 4.0 unweighted but 5.0 weighted GPA.",
  },
  {
    question: "How does the UC GPA scale differ?",
    answer:
      "The UC GPA scale ignores plus/minus grades (A- = A = 4.0), only counts a-g courses from 10th-11th grade, and caps honors boosts at 8 semesters. This is different from both the standard 4.0 and 5.0 scales used by most high schools.",
  },
];

export const COLLEGE_REQUIREMENTS_FAQS = [
  {
    question: "What GPA do I need for Ivy League schools?",
    answer:
      "Most Ivy League admitted students have an unweighted GPA of 3.8 or higher, with many having 3.9+. However, GPA is just one factor — these schools also heavily weigh course rigor, test scores, extracurriculars, and essays.",
  },
  {
    question: "Do colleges have minimum GPA requirements?",
    answer:
      "Many public universities have published minimum GPA requirements (e.g., UC system requires a 3.0 for California residents). Most private colleges do not publish minimums but have effective thresholds based on their applicant pool.",
  },
  {
    question: "Does my GPA matter more than test scores?",
    answer:
      "GPA is generally considered the most important academic factor in college admissions because it reflects four years of performance. Many colleges have gone test-optional, further increasing GPA importance. However, a strong SAT/ACT score can complement a lower GPA.",
  },
  {
    question: "What is a competitive GPA for state universities?",
    answer:
      "For most state universities, a 3.0-3.5 unweighted GPA is competitive. Flagship state schools (like UC Berkeley, UMich, UVA) are more selective, typically wanting 3.5+. Less selective state schools may accept students with GPAs below 3.0.",
  },
];
