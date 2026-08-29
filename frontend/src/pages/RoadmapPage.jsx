import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FileText, Rocket, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import api from '@/utils/axios';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RoadmapResult } from '@/components/roadmap/RoadmapResult';

const PACKAGE_OPTIONS = ['10 LPA', '15 LPA', '20 LPA', '30 LPA', '40 LPA'];

export function RoadmapPage() {
  const resume = useSelector((state) => state.resume.analysis);

  const [role, setRole] = useState('');
  const [targetPackage, setTargetPackage] = useState(PACKAGE_OPTIONS[2]);
  const [useResume, setUseResume] = useState(false);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    api
      .get('/api/roadmap/all')
      .then(({ data }) => {
        if (active) setHistory(data?.success ? data.data || [] : []);
      })
      .catch(() => {
        if (active) setHistory([]);
      })
      .finally(() => {
        if (active) setHistoryLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleGenerate = async () => {
    if (!role.trim()) {
      toast.error('Enter a target role to begin.');
      return;
    }
    if (useResume && !resume) {
      toast.error('Analyze your resume first, or turn off resume mode.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/api/roadmap/generate', {
        role: role.trim(),
        targetPackage,
        useResume,
        resume: useResume ? resume : {},
      });

      if (!data?.success) {
        toast.error(data?.message || 'Could not generate the roadmap.');
        setLoading(false);
        return;
      }

      const newRoadmap = data.data;
      setHistory((prev) => [newRoadmap, ...prev.filter((item) => item._id !== newRoadmap._id)]);
      setRoadmap(newRoadmap);
      toast.success('Roadmap generated successfully.');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to generate roadmap. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const openRoadmap = (item) => setRoadmap(item);
  const backToList = () => setRoadmap(null);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            Roadmap
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Career Roadmap
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[0.9375rem]">
            Generate a personalized learning path for your target role and package, then track your
            progress module by module.
          </p>
        </div>

        {roadmap ? (
          <RoadmapResult roadmap={roadmap} onBack={backToList} />
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Generate a roadmap</CardTitle>
                <CardDescription>
                  Pick a target role and package. Optionally ground it in your resume analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <label
                    className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"
                    htmlFor="roadmap-role"
                  >
                    Target role
                  </label>
                  <Input
                    id="roadmap-role"
                    placeholder="e.g. Backend Developer"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    Target package
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PACKAGE_OPTIONS.map((pkg) => (
                      <button
                        key={pkg}
                        type="button"
                        onClick={() => setTargetPackage(pkg)}
                        className={
                          'rounded-full border px-3.5 py-1.5 text-sm transition-colors ' +
                          (pkg === targetPackage
                            ? 'border-primary/30 bg-primary/10 text-primary'
                            : 'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground')
                        }
                      >
                        {pkg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant={useResume ? 'default' : 'outline'}
                    onClick={() => setUseResume((value) => !value)}
                    disabled={!resume && !useResume}
                  >
                    <FileText className="size-4" />
                    {useResume ? 'Resume added' : 'Use my resume'}
                  </Button>

                  <Button type="button" onClick={handleGenerate} disabled={loading || !role.trim()}>
                    {loading ? (
                      <>
                        <Rocket className="size-4 animate-pulse" /> Generating…
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-4" /> Generate roadmap
                      </>
                    )}
                  </Button>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}
                {!resume && (
                  <p className="text-xs text-muted-foreground">
                    Analyze your resume first to enable resume-based roadmaps.
                  </p>
                )}
              </CardContent>
            </Card>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  Your previous roadmaps
                </h2>
                {history.length > 0 && <Badge variant="outline">{history.length}</Badge>}
              </div>

              {historyLoading ? (
                <p className="text-sm text-muted-foreground">Loading your roadmaps…</p>
              ) : history.length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-sm text-muted-foreground">
                      No roadmaps yet. Generate your first learning path above.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {history.map((item) => (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => openRoadmap(item)}
                      className="surface-card rounded-[var(--radius-xl)] p-4 text-left transition-colors hover:bg-accent/60"
                    >
                      <p className="truncate text-sm font-semibold text-foreground">{item.title}</p>
                      <div className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span className="text-primary">{item.targetPackage}</span>
                        <span className="flex items-center gap-1">
                          <Rocket className="size-3.5" /> {item.duration}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {Array.isArray(item.modules) ? `${item.modules.length} modules` : ''} ·{' '}
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default RoadmapPage;
