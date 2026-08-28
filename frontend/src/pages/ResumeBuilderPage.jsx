import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, FileText, RotateCcw } from 'lucide-react';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import ResumeBuilderForm from '@/components/resume-builder/ResumeBuilderForm';
import ResumePreview from '@/components/resume-builder/ResumePreview';
import initialResumeBuilderData from '@/components/resume-builder/initialData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const STORAGE_KEY = 'yugent.resume.builder.draft';

const STEPS = [
  { step: 1, title: 'Personal Information', subtitle: 'Basic contact details and professional links.' },
  { step: 2, title: 'Professional Summary', subtitle: 'A short intro that frames your strongest value.' },
  { step: 3, title: 'Skills', subtitle: 'Technical and role-specific skills.' },
  { step: 4, title: 'Work Experience', subtitle: 'Jobs, internships and measurable impact.' },
  { step: 5, title: 'Projects', subtitle: 'Practical work that proves your ability.' },
  { step: 6, title: 'Education', subtitle: 'Academic background and credentials.' },
];

function loadDraft() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...initialResumeBuilderData, ...JSON.parse(stored) } : initialResumeBuilderData;
  } catch {
    return initialResumeBuilderData;
  }
}

export function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(loadDraft);
  const [showPreview, setShowPreview] = useState(false);

  const activeStep = useMemo(
    () => STEPS.find((item) => item.step === currentStep) ?? STEPS[0],
    [currentStep],
  );
  const progress = Math.round((currentStep / STEPS.length) * 100);
  const isLastStep = currentStep === STEPS.length;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Draft persistence is best effort.
    }
  }, [data]);

  const resetDraft = () => {
    setData(initialResumeBuilderData);
    setCurrentStep(1);
    setShowPreview(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <DashboardLayout>
      {showPreview ? (
        <ResumePreview data={data} onBack={() => setShowPreview(false)} />
      ) : (
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                Career tool
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Resume Builder
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Build a clean resume draft, preview it, and export it as a PDF.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={resetDraft}>
                <RotateCcw className="size-4" />
                Reset
              </Button>
              <Button type="button" onClick={() => setShowPreview(true)}>
                <Eye className="size-4" />
                Preview
              </Button>
            </div>
          </header>

          <Card>
            <CardHeader className="border-b border-border bg-muted/[0.18]">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                  <FileText className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Step {currentStep} of {STEPS.length}
                    </p>
                    <p className="text-xs font-medium tabular-nums text-muted-foreground">
                      {progress}% complete
                    </p>
                  </div>

                  <CardTitle className="mt-2 text-xl">{activeStep.title}</CardTitle>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{activeStep.subtitle}</p>
                  <Progress value={progress} className="mt-4" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-7 p-6 sm:p-8">
              <ResumeBuilderForm step={currentStep} data={data} setData={setData} />

              <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep((step) => Math.max(1, step - 1))}
                >
                  <ArrowLeft className="size-4" />
                  Previous
                </Button>

                <div className="flex items-center justify-center gap-1.5">
                  {STEPS.map((item) => (
                    <button
                      key={item.step}
                      type="button"
                      aria-label={`Go to step ${item.step}`}
                      onClick={() => setCurrentStep(item.step)}
                      className={[
                        'h-2 rounded-full transition-all',
                        item.step === currentStep
                          ? 'w-7 bg-primary'
                          : item.step < currentStep
                            ? 'w-2 bg-primary/45'
                            : 'w-2 bg-muted-foreground/20',
                      ].join(' ')}
                    />
                  ))}
                </div>

                {isLastStep ? (
                  <Button type="button" onClick={() => setShowPreview(true)}>
                    <Eye className="size-4" />
                    Preview resume
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep((step) => Math.min(STEPS.length, step + 1))}
                  >
                    Next
                    <ArrowRight className="size-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ResumeBuilderPage;
