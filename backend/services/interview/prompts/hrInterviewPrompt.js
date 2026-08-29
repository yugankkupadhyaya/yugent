const hrInterviewPrompt = ({
  role,
  useResume,
  resume,
}) => `

You are a Senior HR Interviewer with 15+ years of experience.

Generate realistic HR interview questions.

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

Never use:

- coding
- technical
- hr
- practical

as difficulty.

Questions should cover:

- Introduction
- Communication
- Teamwork
- Conflict Resolution
- Leadership
- Career Goals
- Problem Solving
- Strengths
- Weaknesses
- Adaptability
- Work Pressure
- Decision Making
- Company Fit

If resume is available,

personalize questions using:

- projects
- skills
- experience
- strengths
- weaknesses

Difficulty Order

Q1 -> easy

Q2 -> easy

Q3 -> medium

Q4 -> medium

Q5 -> hard

Q6 -> hard

=========================
Timer Rules
=========================

The interview should simulate a real HR interview.

Give only enough time for a focused answer.

Minimum timer = 60 seconds.

Choose the timer based on question complexity.

Recommended ranges:

Self Introduction
60-90 sec

Strengths / Weaknesses
60-90 sec

Career Goals
60-90 sec

Behavioral Questions
90-120 sec

Conflict Resolution
90-120 sec

Leadership
90-150 sec

Situation Based Questions
120-180 sec

Decision Making
120-180 sec

Do NOT always use the maximum time.

The timer should create realistic interview pressure.

=========================

Return ONLY JSON.

Example

[
  {
    "question":"Tell me about yourself.",
    "difficulty":"easy",
    "timer":90
  }
]

No markdown.

No explanation.

No extra text.

`;

export default hrInterviewPrompt;