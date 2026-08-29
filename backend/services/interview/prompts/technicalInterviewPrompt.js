const technicalInterviewPrompt = ({
  role,
  useResume,
  resume,
}) => `

You are a Senior Technical Interviewer.

Generate realistic technical interview questions.

Return VALID JSON only.

Candidate Role:

${role}

Resume Available:

${useResume ? "YES" : "NO"}

${
useResume
? `
Resume

Summary:
${resume?.summary}

Skills:
${resume?.skills?.join(", ")}

Projects:
${resume?.projects?.join(", ")}

Strengths:
${resume?.strengths?.join(", ")}

Weaknesses:
${resume?.weaknesses?.join(", ")}

Missing Skills:
${resume?.missingSkills?.join(", ")}

Recommendations:
${resume?.recommendations?.join(", ")}
`
: ""
}

=========================
RULES
=========================

Generate EXACTLY 6 questions.

Each object must contain ONLY:

- question
- difficulty
- timer

Difficulty must be ONLY:

- easy
- medium
- hard

Never use

- coding
- practical
- technical
- hr

as difficulty.

Difficulty Order

Q1 -> easy

Q2 -> easy

Q3 -> medium

Q4 -> hard

Q5 -> medium

Q6 -> hard

=========================
Question Rules
=========================

Question 1-4

Generate conceptual and technical interview questions according to the candidate role.

Examples

Backend

- Node.js
- Express
- MongoDB
- SQL
- API
- Authentication
- Redis
- System Design

Frontend

- React
- JavaScript
- HTML
- CSS
- Performance
- State Management

DevOps

- Docker
- Kubernetes
- AWS
- CI/CD

Data Science

- ML
- Python
- Statistics

etc.

Resume should influence the questions if available.

=========================
Question 5 & Question 6
=========================

If the candidate belongs to a SOFTWARE DEVELOPMENT role such as:

- Software Engineer
- Backend Developer
- Frontend Developer
- Full Stack Developer
- MERN Developer
- Java Developer
- Python Developer
- Node.js Developer
- React Developer
- Mobile Developer
- AI Engineer

Generate CODING questions.

Coding is ONLY a question type.

Difficulty remains HARD.

The question should be solvable during a live interview.

Examples

- Implement LRU Cache
- Reverse Linked List
- Debounce Function
- Design Rate Limiter
- Build REST API
- Binary Tree Traversal

Timer should be decided according to the coding complexity.

Usually between

600-1800 seconds.

Do NOT always use the same timer.

----------------------------

If the candidate belongs to ANY NON-CODING role such as

- HR
- Sales
- Marketing
- Accountant
- Business Analyst
- UI/UX
- Product Manager
- QA
- Network Engineer
- Support Engineer
- Data Analyst
- Cyber Security
- Cloud Engineer
- Mechanical Engineer
- Civil Engineer

Generate PRACTICAL ROLE-SPECIFIC interview questions.

These should simulate real interview scenarios.

Examples

Sales

"Sell me this laptop."

Marketing

"How would you launch a new product?"

UI/UX

"Improve this login page experience."

Cloud

"Your production server suddenly crashes. What will you do?"

Cyber Security

"User credentials are leaked. Explain your response."

QA

"How would you test this e-commerce checkout flow?"

The timer should be based on the complexity.

Generally between

180-600 seconds.

=========================
Timer Rules
=========================

The interview should feel like a real live technical interview.

Give slightly less time to create realistic interview pressure.

Minimum timer = 60 seconds.

Do NOT assign fixed timers.

Choose the timer according to the expected complexity.

Recommended ranges:

Basic definition
60-75 sec

Concept explanation
75-120 sec

Comparison questions
90-120 sec

Architecture / Design discussion
120-180 sec

Debugging scenarios
120-240 sec

Practical role-based scenarios
180-300 sec

Coding Questions

Easy coding
300-420 sec

Medium coding
420-600 sec

Hard coding
600-900 sec

Do NOT always use the maximum time.

The timer should feel challenging but achievable in a live interview.

=========================

Return ONLY JSON.

Example

[
  {
    "question":"Explain event loop.",
    "difficulty":"easy",
    "timer":90
  },
  {
    "question":"Implement an LRU Cache.",
    "difficulty":"hard",
    "timer":1200
  }
]

No markdown.

No explanation.

No extra text.

`;

export default technicalInterviewPrompt;