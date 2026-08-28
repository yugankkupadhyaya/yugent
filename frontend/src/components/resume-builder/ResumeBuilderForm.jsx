import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 bg-background text-sm"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    </label>
  );
}

function EmptyState({ children }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/20 px-4 py-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function EntryCard({ children, onRemove, className }) {
  return (
    <Card className={cn('relative rounded-xl', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        aria-label="Remove entry"
        className="absolute right-2 top-2 size-8 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="size-4" />
      </Button>
      <CardContent className="space-y-3 p-4 pr-12">{children}</CardContent>
    </Card>
  );
}

function updateArrayItem(items, index, field, value) {
  return items.map((item, itemIndex) => (
    itemIndex === index ? { ...item, [field]: value } : item
  ));
}

export function ResumeBuilderForm({ step, data, setData }) {
  if (step === 1) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" placeholder="Yug Upadhaya" value={data.name} onChange={(name) => setData({ ...data, name })} />
        <Field label="Email" type="email" placeholder="upadhyaya@email.com" value={data.email} onChange={(email) => setData({ ...data, email })} />
        <Field label="Phone" placeholder="+91 98765 43210" value={data.phone} onChange={(phone) => setData({ ...data, phone })} />
        <Field label="Location" placeholder="Chandigarh, India" value={data.location} onChange={(location) => setData({ ...data, location })} />
        <Field label="LinkedIn" placeholder="linkedin.com/in/yug" value={data.linkedin} onChange={(linkedin) => setData({ ...data, linkedin })} />
        <Field label="GitHub" placeholder="github.com/yug" value={data.github} onChange={(github) => setData({ ...data, github })} />
        <div className="sm:col-span-2">
          <Field label="Portfolio" placeholder="yug.dev" value={data.portfolio} onChange={(portfolio) => setData({ ...data, portfolio })} />
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-3">
        <TextArea
          label="Professional summary"
          placeholder="Frontend engineer focused on building fast, accessible React applications with clean product experiences."
          rows={6}
          value={data.summary}
          onChange={(summary) => setData({ ...data, summary })}
        />
        <p className="text-xs text-muted-foreground">Leave this empty if you prefer not to include a summary.</p>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="space-y-3">
        <TextArea
          label="Skills"
          placeholder="JavaScript, React, Node.js, Express, MongoDB, Redis, Docker, AWS"
          rows={5}
          value={data.skills}
          onChange={(skills) => setData({ ...data, skills })}
        />
        <p className="text-xs text-muted-foreground">Separate each skill with a comma.</p>
      </div>
    );
  }

  if (step === 4) {
    const experience = Array.isArray(data.experience) ? data.experience : [];

    return (
      <div className="space-y-4">
        {experience.length === 0 && <EmptyState>No experience added yet.</EmptyState>}

        {experience.map((item, index) => (
          <EntryCard
            key={index}
            onRemove={() => setData({ ...data, experience: experience.filter((_, itemIndex) => itemIndex !== index) })}
          >
            <Field label="Company" placeholder="ABC Technologies" value={item.company} onChange={(value) => setData({ ...data, experience: updateArrayItem(experience, index, 'company', value) })} />
            <Field label="Role" placeholder="Frontend Developer" value={item.role} onChange={(value) => setData({ ...data, experience: updateArrayItem(experience, index, 'role', value) })} />
            <Field label="Duration" placeholder="Jan 2023 - Dec 2024" value={item.duration} onChange={(value) => setData({ ...data, experience: updateArrayItem(experience, index, 'duration', value) })} />
            <TextArea label="Description" placeholder={'Built reusable React components\nImproved page load time by 35%'} value={item.description} onChange={(value) => setData({ ...data, experience: updateArrayItem(experience, index, 'description', value) })} />
          </EntryCard>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed"
          onClick={() => setData({ ...data, experience: [...experience, { company: '', role: '', duration: '', description: '' }] })}
        >
          <Plus className="size-4" />
          Add experience
        </Button>
      </div>
    );
  }

  if (step === 5) {
    const projects = Array.isArray(data.projects) ? data.projects : [];

    return (
      <div className="space-y-4">
        {projects.length === 0 && <EmptyState>No projects added yet.</EmptyState>}

        {projects.map((item, index) => (
          <EntryCard
            key={index}
            onRemove={() => setData({ ...data, projects: projects.filter((_, itemIndex) => itemIndex !== index) })}
          >
            <Field label="Project name" placeholder="InterviewIQ" value={item.name} onChange={(value) => setData({ ...data, projects: updateArrayItem(projects, index, 'name', value) })} />
            <Field label="Tech stack" placeholder="React, Node.js, MongoDB" value={item.techStack} onChange={(value) => setData({ ...data, projects: updateArrayItem(projects, index, 'techStack', value) })} />
            <Field label="Link" placeholder="github.com/rahul/interviewiq" value={item.link} onChange={(value) => setData({ ...data, projects: updateArrayItem(projects, index, 'link', value) })} />
            <TextArea label="Description" placeholder="AI-powered interview preparation platform with mock interviews and resume scoring." value={item.description} onChange={(value) => setData({ ...data, projects: updateArrayItem(projects, index, 'description', value) })} />
          </EntryCard>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed"
          onClick={() => setData({ ...data, projects: [...projects, { name: '', techStack: '', link: '', description: '' }] })}
        >
          <Plus className="size-4" />
          Add project
        </Button>
      </div>
    );
  }

  if (step === 6) {
    const education = Array.isArray(data.education) ? data.education : [];

    return (
      <div className="space-y-4">
        {education.length === 0 && <EmptyState>No education added yet.</EmptyState>}

        {education.map((item, index) => (
          <EntryCard
            key={index}
            onRemove={() => setData({ ...data, education: education.filter((_, itemIndex) => itemIndex !== index) })}
          >
            <Field label="College / University" placeholder="SR Group of Institutions" value={item.college} onChange={(value) => setData({ ...data, education: updateArrayItem(education, index, 'college', value) })} />
            <Field label="Degree" placeholder="B.Tech" value={item.degree} onChange={(value) => setData({ ...data, education: updateArrayItem(education, index, 'degree', value) })} />
            <Field label="Branch" placeholder="Computer Science" value={item.branch} onChange={(value) => setData({ ...data, education: updateArrayItem(education, index, 'branch', value) })} />
            <Field label="CGPA" placeholder="8.5" value={item.cgpa} onChange={(value) => setData({ ...data, education: updateArrayItem(education, index, 'cgpa', value) })} />
            <Field label="Year" placeholder="2021 - 2025" value={item.year} onChange={(value) => setData({ ...data, education: updateArrayItem(education, index, 'year', value) })} />
          </EntryCard>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed"
          onClick={() => setData({ ...data, education: [...education, { college: '', degree: '', branch: '', cgpa: '', year: '' }] })}
        >
          <Plus className="size-4" />
          Add education
        </Button>
      </div>
    );
  }

  return null;
}

export default ResumeBuilderForm;
