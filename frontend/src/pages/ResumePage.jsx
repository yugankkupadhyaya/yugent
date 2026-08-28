import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Lightbulb,
  LoaderCircle,
  Plus,
  Sparkles,
  Target,
  Upload,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

import { clearAnalysis, uploadResume } from '@/store/resumeSlice';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const MAX_FILE_SIZE = 20 * 1024 * 1024;

function asList(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === 'string' && Boolean(item.trim()))
    : [];
}

function getScoreLabel(score) {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Strong';
  if (score >= 55) return 'Good';
  if (score >= 40) return 'Needs work';
  return 'Needs improvement';
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ResumeUpload({
  file,
  analyzing,
  onFileChange,
  onRemove,
  onAnalyze,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const selectFile = (selectedFile) => {
    if (!selectedFile) return;
    onFileChange(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    if (analyzing) return;

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      selectFile(droppedFile);
    }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              inputRef.current?.click();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
            if (!analyzing) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={[
            'group cursor-pointer rounded-2xl border border-dashed p-8 transition-all duration-200 sm:p-10',
            dragging
              ? 'border-primary bg-primary/[0.04]'
              : 'border-border bg-background hover:border-primary/40 hover:bg-muted/30',
          ].join(' ')}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            disabled={analyzing}
            onChange={(event) => {
              selectFile(event.target.files?.[0] ?? null);
              event.target.value = '';
            }}
          />

          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-[var(--shadow-xs)]">
              <Upload className="size-5" />
            </div>

            <h3 className="text-base font-semibold tracking-tight">
              Upload your resume
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Drag and drop your PDF here, or{' '}
              <span className="font-medium text-primary">browse your files</span>.
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              PDF only · Maximum 20 MB
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-xs)]">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <FileText className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>

            {!analyzing && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onRemove}
                aria-label="Remove selected resume"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      <Button
        type="button"
        className="w-full sm:w-auto"
        onClick={onAnalyze}
        disabled={!file || analyzing}
      >
        {analyzing ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Sparkles />
        )}

        {analyzing ? 'Analyzing resume…' : 'Analyze Resume'}
      </Button>
    </div>
  );
}

function ScoreCard({ resume }) {
  const rawScore = typeof resume.score === 'number' ? resume.score : 0;
  const score = Math.max(0, Math.min(100, rawScore));

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="flex size-28 flex-col items-center justify-center rounded-full border-8 border-primary/10 bg-primary/[0.03]">
            <span className="text-3xl font-semibold tracking-[-0.06em] tabular-nums">
              {score}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              / 100
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Resume score
              </p>

              <Badge variant="secondary">{getScoreLabel(score)}</Badge>
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {resume.suggestedRole
                ? `A strong foundation for ${resume.suggestedRole}`
                : 'Your resume has been analyzed'}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Your score reflects the overall quality of your resume and the
              areas that could improve your chances with employers.
            </p>
          </div>

          <div className="min-w-[180px]">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Overall score</span>
              <span className="font-medium tabular-nums">{score}%</span>
            </div>

            <Progress value={score} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AnalysisList({
  title,
  description,
  items,
  icon: Icon,
}) {
  const values = asList(items);

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
            <Icon className="size-4" />
          </div>

          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {values.length > 0 ? (
          <ul className="space-y-3">
            {values.map((item, index) => (
              <li
                key={`${title}-${index}`}
                className="flex gap-3 text-sm leading-6"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-border px-4 py-5 text-sm text-muted-foreground">
            No items reported.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SkillsSection({
  skills,
  missingSkills,
}) {
  const currentSkills = asList(skills);
  const missing = asList(missingSkills);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <Target className="size-4" />
            </div>

            <div>
              <CardTitle className="text-base">Skills detected</CardTitle>
              <CardDescription className="mt-1">
                Skills identified from your resume.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {currentSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {currentSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No skills were detected.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <ArrowUpRight className="size-4" />
            </div>

            <div>
              <CardTitle className="text-base">Skills to consider</CardTitle>
              <CardDescription className="mt-1">
                Skills that could strengthen your profile.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {missing.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missing.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No missing skills were identified.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Recommendations({ items }) {
  const values = asList(items);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-primary">
            <Lightbulb className="size-4" />
          </div>

          <div>
            <CardTitle className="text-base">Recommendations</CardTitle>
            <CardDescription className="mt-1">
              Practical changes you can make to strengthen your resume.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {values.length > 0 ? (
          <div className="divide-y divide-border">
            {values.map((item, index) => (
              <div
                key={`recommendation-${index}`}
                className="flex gap-4 py-4 first:pt-0 last:pb-0"
              >
                <span className="shrink-0 text-xs font-semibold tabular-nums text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <p className="text-sm leading-6 text-muted-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No recommendations were provided.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function ResumePage() {
  const [file, setFile] = useState(null);
  const status = useSelector((state) => state.resume.status);
  const resume = useSelector((state) => state.resume.analysis);
  const hasFetched = useSelector((state) => state.resume.hasFetched);
  const dispatch = useDispatch();
  const loading = !resume && !hasFetched && (status === 'idle' || status === 'loading');
  const analyzing = status === 'uploading';

  const validateFile = (selectedFile) => {
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please select a PDF file.');
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error('Resume must be smaller than 20 MB.');
      return false;
    }

    return true;
  };

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    if (!validateFile(selectedFile)) {
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const analyze = async () => {
    if (!file) {
      toast.error('Select a PDF resume first.');
      return;
    }

    if (!validateFile(file)) {
      return;
    }

    try {
      await dispatch(uploadResume(file)).unwrap();
      setFile(null);

      toast.success('Resume analyzed successfully.');
    } catch (message) {
      toast.error(message);
    }
  };

  const startAnotherAnalysis = () => {
    dispatch(clearAnalysis());
    setFile(null);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-9 w-56 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
          </div>

          <div className="grid gap-6">
            <div className="h-48 animate-pulse rounded-2xl border border-border bg-card" />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-48 animate-pulse rounded-2xl border border-border bg-card" />
              <div className="h-48 animate-pulse rounded-2xl border border-border bg-card" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!resume) {
    return (
      <DashboardLayout>
        <div className="space-y-10">
          <header className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
              Career tool
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Resume Scorer
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Get an AI-powered review of your resume and discover exactly
              what you can improve.
            </p>
          </header>

          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border bg-muted/[0.18] px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-primary">
                  <Sparkles className="size-4" />
                </div>

                <div>
                  <CardTitle className="text-base">
                    Analyze your resume
                  </CardTitle>
                  <CardDescription className="mt-1">
                    We'll identify strengths, gaps, skills and practical
                    improvements.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <ResumeUpload
                file={file}
                analyzing={analyzing}
                onFileChange={handleFileChange}
                onRemove={() => setFile(null)}
                onAnalyze={analyze}
              />
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                Career tool
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Resume Scorer
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Your resume has been analyzed. Review the feedback below and
                make your next improvements count.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={startAnotherAnalysis}
            >
              <Plus className="size-4" />
              Analyze another resume
            </Button>
          </div>
        </header>

        <ScoreCard resume={resume} />

        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-primary">
                <FileText className="size-4" />
              </div>

              <div className="min-w-0">
                <CardTitle className="text-base">
                  {resume.name || 'Resume overview'}
                </CardTitle>

                {resume.suggestedRole && (
                  <CardDescription className="mt-1">
                    Suggested role: {resume.suggestedRole}
                  </CardDescription>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
              {resume.summary || 'No summary was provided for this resume.'}
            </p>

            {asList(resume.skills).length > 0 && (
              <>
                <Separator className="my-6" />

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Detected skills
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {asList(resume.skills).map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <AnalysisList
            title="Strengths"
            description="What is already working well."
            items={resume.strengths}
            icon={CheckCircle2}
          />

          <AnalysisList
            title="Areas to improve"
            description="Where your resume can become stronger."
            items={resume.weaknesses}
            icon={AlertCircle}
          />
        </div>

        <SkillsSection
          skills={resume.skills}
          missingSkills={resume.missingSkills}
        />

        <Recommendations items={resume.recommendations} />
      </div>
    </DashboardLayout>
  );
}

export default ResumePage;
