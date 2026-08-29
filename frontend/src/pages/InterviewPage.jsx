import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '@clerk/react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Lightbulb,
  LoaderCircle,
  MessageSquareText,
  RotateCcw,
  Sparkles,
  Target,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';

import api from '@/utils/axios';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

import maleVideo from '@/assets/male-ai.mp4';

function asList(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === 'string' && Boolean(item.trim()))
    : [];
}

function getScoreLabel(score) {
  if (score >= 85) return 'Outstanding';
  if (score >= 70) return 'Strong';
  if (score >= 55) return 'Good';
  if (score >= 40) return 'Developing';
  return 'Needs work';
}

function buildResumePayload(resume) {
  if (!resume) return {};

  return {
    summary: resume.summary || '',
    skills: asList(resume.skills),
    projects: asList(resume.projects),
    strengths: asList(resume.strengths),
    weaknesses: asList(resume.weaknesses),
    missingSkills: asList(resume.missingSkills),
    recommendations: asList(resume.recommendations),
  };
}

const INTERVIEW_SESSION_KEY = 'yugent_interview_session';

export function InterviewPage() {
  const { user: clerkUser } = useUser();
  const resume = useSelector((state) => state.resume.analysis);

  const [phase, setPhase] = useState('setup');
  const [role, setRole] = useState('');
  const [type, setType] = useState('technical');
  const [useResume, setUseResume] = useState(() => Boolean(resume));

  const [interviewId, setInterviewId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const [report, setReport] = useState(null);

  const answerRef = useRef('');

  const updateAnswer = (value) => {
    setAnswer(value);
    answerRef.current = value;
  };

  const startInterview = async () => {
    if (!role.trim()) {
      toast.error('Enter a target role to begin.');
      return;
    }

    if (useResume && !resume) {
      toast.error('Analyze your resume first, or turn off resume mode.');
      return;
    }

    setPhase('starting');

    try {
      const { data } = await api.post('/api/interview/start', {
        type,
        role: role.trim(),
        useResume,
        resume: useResume ? buildResumePayload(resume) : {},
      });

      if (!data?.success) {
        toast.error(data?.message || 'Could not start the interview.');
        setPhase('setup');
        return;
      }

      setInterviewId(data.interviewId);
      setCurrentIndex(data.currentQuestion);
      setTotal(data.totalQuestions);
      setQuestion(data.question);
      updateAnswer('');
      setFeedback(null);
      setTimeLeft(data.question?.timer || 60);
      setPhase('active');
      localStorage.setItem(
        INTERVIEW_SESSION_KEY,
        JSON.stringify({ interviewId: data.interviewId })
      );
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to start the interview.');
      setPhase('setup');
    }
  };

  const submitAnswer = async (text) => {
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await api.post('/api/interview/answer', {
        interviewId,
        answer: text,
      });

      if (!data?.success) {
        toast.error(data?.message || 'Could not submit your answer.');
        setLoading(false);
        return;
      }

      if (data.completed) {
        setReport(data.interview);
        setFeedback(data.feedback);
        setLoading(false);
        setPhase('completed');
        localStorage.setItem(
          INTERVIEW_SESSION_KEY,
          JSON.stringify({ interviewId, completed: true })
        );
        return;
      }

      setFeedback(data.feedback);
      setQuestion(data.question);
      setCurrentIndex(data.currentQuestion);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit your answer.');
      setLoading(false);
    }
  };

  const continueToNext = () => {
    updateAnswer('');
    setFeedback(null);
    setTimeLeft(question?.timer || 60);
  };

  const resetInterview = () => {
    setPhase('setup');
    setInterviewId(null);
    setCurrentIndex(0);
    setTotal(0);
    setQuestion(null);
    updateAnswer('');
    setFeedback(null);
    setLoading(false);
    setReport(null);
    setTimeLeft(60);
    localStorage.removeItem(INTERVIEW_SESSION_KEY);
  };

  useEffect(() => {
    if (phase !== 'active' || loading || feedback || timeLeft <= 0) return;

    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);

    return () => clearInterval(interval);
  }, [phase, loading, feedback, timeLeft]);

  useEffect(() => {
    if (phase === 'active' && !loading && !feedback && timeLeft === 0) {
      submitAnswer(answerRef.current.trim() || 'No answer provided.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase, loading, feedback]);

  const restoredRef = useRef(false);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;

    let session;
    try {
      session = JSON.parse(localStorage.getItem(INTERVIEW_SESSION_KEY) || 'null');
    } catch {
      localStorage.removeItem(INTERVIEW_SESSION_KEY);
      return;
    }

    if (!session?.interviewId) return;

    (async () => {
      try {
        const { data } = await api.get(`/api/interview/${session.interviewId}`);
        const interview = data?.interview;

        if (!interview) {
          localStorage.removeItem(INTERVIEW_SESSION_KEY);
          return;
        }

        if (interview.status === 'completed') {
          setInterviewId(interview._id);
          setReport(interview);
          setFeedback(null);
          setPhase('completed');
          return;
        }

        const idx = interview.currentQuestion || 0;
        const nextQuestion = interview.questions?.[idx];

        if (!nextQuestion) {
          localStorage.removeItem(INTERVIEW_SESSION_KEY);
          return;
        }

        setInterviewId(interview._id);
        setCurrentIndex(idx);
        setTotal(interview.questions.length);
        setQuestion(nextQuestion);
        updateAnswer('');
        setFeedback(null);
        setTimeLeft(nextQuestion.timer || 60);
        setPhase('active');
      } catch {
        localStorage.removeItem(INTERVIEW_SESSION_KEY);
      }
    })();
  }, []);

  const headerName = clerkUser?.fullName || clerkUser?.firstName || 'there';

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {phase === 'setup' && (
          <SetupView
            role={role}
            setRole={setRole}
            type={type}
            setType={setType}
            useResume={useResume}
            setUseResume={setUseResume}
            resume={resume}
            onStart={startInterview}
            starting={phase === 'starting'}
          />
        )}

        {phase === 'starting' && <StartingView />}

        {phase === 'active' && question && (
          <ActiveView
            headerName={headerName}
            type={type}
            question={question}
            currentIndex={currentIndex}
            total={total}
            answer={answer}
            setAnswer={updateAnswer}
            feedback={feedback}
            loading={loading}
            timeLeft={timeLeft}
            onSubmit={submitAnswer}
            onContinue={continueToNext}
          />
        )}

        {phase === 'completed' && report && (
          <ReportView report={report} feedback={feedback} onRestart={resetInterview} />
        )}
      </div>
    </DashboardLayout>
  );
}

function SetupView({
  role,
  setRole,
  type,
  setType,
  useResume,
  setUseResume,
  resume,
  onStart,
  starting,
}) {
  const canStart = Boolean(role.trim()) && (!useResume || Boolean(resume));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-10"
    >
      <header className="max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
          Career tool
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Interview Practice
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Practice realistic AI interviews, get instant feedback on every answer,
          and walk away with a clear performance report.
        </p>
      </header>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/[0.18] px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <Sparkles className="size-4" />
            </div>

            <div>
              <CardTitle className="text-base">Configure your interview</CardTitle>
              <CardDescription className="mt-1">
                Pick a role and interview type. We'll generate six tailored questions.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="space-y-2">
            <label
              htmlFor="interview-role"
              className="text-xs font-medium text-muted-foreground"
            >
              Target role
            </label>

            <input
              id="interview-role"
              type="text"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="Backend Developer"
              className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground">
              Interview type
            </span>

            <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-muted/30 p-1.5">
              {['technical', 'hr'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setType(item)}
                  className={[
                    'h-10 rounded-lg text-sm font-medium capitalize transition-colors',
                    type === item
                      ? 'bg-primary text-primary-foreground shadow-[var(--shadow-xs)]'
                      : 'text-muted-foreground hover:text-foreground',
                  ].join(' ')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">Use resume</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Personalize questions using your analyzed resume.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setUseResume(!useResume)}
                disabled={!resume}
                aria-pressed={useResume}
                className={[
                  'relative h-7 w-12 shrink-0 rounded-full transition-colors',
                  useResume ? 'bg-primary' : 'bg-muted-foreground/30',
                  !resume ? 'cursor-not-allowed opacity-50' : '',
                ].join(' ')}
              >
                <span
                  className={[
                    'absolute top-0.5 size-6 rounded-full bg-background transition-all',
                    useResume ? 'left-[22px]' : 'left-0.5',
                  ].join(' ')}
                />
              </button>
            </div>

            {resume ? (
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/[0.04] p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CheckCircle2 className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    Resume ready
                    {resume.suggestedRole ? (
                      <span className="text-muted-foreground">
                        {' '}
                        · {resume.suggestedRole}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {useResume
                      ? 'Questions will be tailored to your resume.'
                      : 'Turn on to tailor questions to your resume.'}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-xs text-muted-foreground">
                No resume found. Visit the Resume Scorer to analyze one, or run a
                general interview.
              </p>
            )}
          </div>

          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={onStart}
            disabled={!canStart || starting}
          >
            {starting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {starting ? 'Starting interview…' : 'Start interview'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StartingView() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <LoaderCircle className="size-8 animate-spin text-primary" />
      <p className="text-sm font-medium text-foreground">Preparing your interview…</p>
      <p className="text-sm text-muted-foreground">
        Our interviewer is generating your questions.
      </p>
    </div>
  );
}

function ActiveView({
  headerName,
  type,
  question,
  currentIndex,
  total,
  answer,
  setAnswer,
  feedback,
  loading,
  timeLeft,
  onSubmit,
  onContinue,
}) {
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;
  const waitingForContinue = Boolean(feedback);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="grid gap-6 lg:grid-cols-[360px_1fr]"
    >
      <div className="space-y-4">
        <Card className="overflow-hidden">
          <div className="relative aspect-video bg-black">
            <video
              src={maleVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="size-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
              <span className="text-xs font-medium text-white">AI Interviewer</span>
              <Badge variant="secondary" className="bg-white/10 text-white">
                {type === 'hr' ? 'HR' : 'Technical'}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <p className="text-sm leading-6 text-muted-foreground">
              Hi {headerName.split(' ')[0]}! I'll ask {total} questions. Take your
              time and answer clearly.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Live Interview</h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              <span className="capitalize">{question.difficulty} difficulty</span>
            </div>
          </div>

          <div className="min-w-[140px] text-right">
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Time</span>
              <span className="tabular-nums">{Math.max(0, timeLeft)}s</span>
            </div>
            <Progress value={(timeLeft / (question.timer || 60)) * 100} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-primary">
                <MessageSquareText className="size-4" />
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Question {currentIndex + 1} of {total}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-base leading-7 text-foreground">{question.question}</p>

            <div>
              <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Progress</span>
                <span className="tabular-nums">
                  {currentIndex + 1}/{total}
                </span>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 p-6">
            <label
              htmlFor="interview-answer"
              className="text-xs font-medium text-muted-foreground"
            >
              Your answer
            </label>

            <textarea
              id="interview-answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              rows={6}
              disabled={loading || waitingForContinue}
              placeholder="Type your answer here…"
              className="w-full rounded-lg border border-input bg-transparent p-4 text-sm leading-7 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60"
            />

            {waitingForContinue ? (
              <Button type="button" className="w-full sm:w-auto" onClick={onContinue}>
                Continue
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() => onSubmit(answer.trim())}
                disabled={loading || !answer.trim()}
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <ArrowRight className="size-4" />
                )}
                {loading ? 'Evaluating…' : 'Submit answer'}
              </Button>
            )}
          </CardContent>
        </Card>

        {feedback && (
          <FeedbackCard feedback={feedback} />
        )}
      </div>
    </motion.div>
  );
}

function FeedbackCard({ feedback }) {
  const scores = [
    { label: 'Score', value: feedback?.score },
    { label: 'Clarity', value: feedback?.clarity },
    { label: 'Relevance', value: feedback?.relevance },
    { label: 'Communication', value: feedback?.communication },
    { label: 'Problem solving', value: feedback?.problemSolving },
    { label: 'Creativity', value: feedback?.creativity },
  ];

  const improvements = asList(feedback?.improvements);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-primary/20 bg-primary/[0.03]">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              AI Feedback
            </p>

            {typeof feedback?.score === 'number' && (
              <Badge variant="default">{getScoreLabel(feedback.score)}</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm leading-7 text-foreground">
            {feedback?.feedback || 'No feedback was provided.'}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {scores.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border bg-card p-3"
              >
                <p className="text-[11px] text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                  {typeof item.value === 'number' ? item.value : 0}
                </p>
              </div>
            ))}
          </div>

          {improvements.length > 0 && (
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Lightbulb className="size-3.5" />
                Suggested improvements
              </p>
              <ul className="space-y-2">
                {improvements.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ReportView({ report, feedback, onRestart }) {
  const questions = Array.isArray(report?.questions) ? report.questions : [];
  const score = typeof report?.overallScore === 'number' ? report.overallScore : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-10"
    >
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            Career tool
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Interview Report
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            AI-generated performance analysis for your {report?.type || 'interview'}{' '}
            interview.
          </p>
        </div>

        <Button type="button" variant="outline" onClick={onRestart}>
          <RotateCcw className="size-4" />
          Start new interview
        </Button>
      </header>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-primary">
              <Target className="size-5" />
            </div>
            <p className="mt-5 text-xs text-muted-foreground">Overall score</p>
            <h2 className="mt-2 text-4xl font-semibold tabular-nums tracking-tight">
              {score}
              <span className="text-lg text-muted-foreground">/100</span>
            </h2>
            <Badge variant="secondary" className="mt-3">
              {getScoreLabel(score)}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-primary">
              <MessageSquareText className="size-5" />
            </div>
            <p className="mt-5 text-xs text-muted-foreground">Questions</p>
            <h2 className="mt-2 text-4xl font-semibold tabular-nums tracking-tight">
              {questions.length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-primary">
              <CheckCircle2 className="size-5" />
            </div>
            <p className="mt-5 text-xs text-muted-foreground">Status</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Completed</h2>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Interview summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-7 text-muted-foreground">
            {report?.summary || 'No summary was provided.'}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnalysisList
          title="Strengths"
          icon={CheckCircle2}
          items={report?.strengths}
          accent="primary"
        />
        <AnalysisList
          title="Areas to improve"
          icon={XCircle}
          items={report?.weaknesses}
          accent="destructive"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <Lightbulb className="size-4" />
            </div>
            <div>
              <CardTitle className="text-base">Recommendations</CardTitle>
              <CardDescription className="mt-1">
                Actionable steps to strengthen your next interview.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {asList(report?.recommendations).length > 0 ? (
            <ol className="space-y-3">
              {asList(report?.recommendations).map((item, index) => (
                <li key={index} className="flex gap-3 text-sm leading-6">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">
              No recommendations were provided.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-5">
        <h3 className="text-xl font-semibold tracking-tight">Question-wise analysis</h3>

        {questions.map((item, index) => (
          <QuestionReport key={index} index={index} item={item} />
        ))}
      </div>

      {feedback && (
        <FeedbackCard feedback={feedback} />
      )}

      <div className="flex justify-center pt-2">
        <Button type="button" onClick={onRestart} size="lg">
          <RotateCcw className="size-4" />
          Start new interview
        </Button>
      </div>
    </motion.div>
  );
}

function AnalysisList({ title, icon: Icon, items, accent }) {
  const values = asList(items);

  const accentClasses =
    accent === 'destructive'
      ? 'border-destructive/20 bg-destructive/[0.04]'
      : 'border-primary/20 bg-primary/[0.04]';

  const iconClasses =
    accent === 'destructive'
      ? 'border-destructive/20 bg-destructive/10 text-destructive'
      : 'border-primary/20 bg-primary/10 text-primary';

  return (
    <Card className={accentClasses}>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className={`flex size-9 items-center justify-center rounded-lg ${iconClasses}`}>
            <Icon className="size-4" />
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {values.length > 0 ? (
          <ul className="space-y-3">
            {values.map((item, index) => (
              <li key={index} className="flex gap-3 text-sm leading-6">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-current opacity-50" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Nothing reported.</p>
        )}
      </CardContent>
    </Card>
  );
}

function QuestionReport({ index, item }) {
  const qFeedback = item?.feedback || {};
  const score = typeof qFeedback?.score === 'number' ? qFeedback.score : 0;
  const improvements = asList(qFeedback?.improvements);

  const metrics = [
    { label: 'Clarity', value: qFeedback?.clarity },
    { label: 'Relevance', value: qFeedback?.relevance },
    { label: 'Communication', value: qFeedback?.communication },
    { label: 'Problem solving', value: qFeedback?.problemSolving },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Question {index + 1}
            </p>
            <h4 className="mt-2 text-base font-semibold leading-7 text-foreground">
              {item?.question || 'Question unavailable'}
            </h4>
          </div>
          {item?.difficulty && (
            <Badge variant="outline" className="capitalize">
              {item.difficulty}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Your answer
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {item?.userAnswer?.trim() || 'No answer submitted.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">Score</p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
              {score}
            </p>
          </div>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-border bg-card p-3"
            >
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
                {typeof metric.value === 'number' ? metric.value : 0}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/[0.04] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            AI feedback
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground">
            {qFeedback?.feedback || 'No feedback available.'}
          </p>
        </div>

        {improvements.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Suggested improvements
            </p>
            <ul className="space-y-2">
              {improvements.map((improvement, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground"
                >
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default InterviewPage;
