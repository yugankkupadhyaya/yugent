import { ArrowLeft, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';

import './ResumePreview.css';

function compact(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeUrlLabel(value, type) {
  const cleaned = compact(value)
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/g, '');

  if (!cleaned) return '';

  if (type === 'linkedin' && !cleaned.includes('linkedin.com')) {
    return `linkedin.com/in/${cleaned.replace(/^@/, '')}`;
  }

  if (type === 'github' && !cleaned.includes('github.com')) {
    return `github.com/${cleaned.replace(/^@/, '')}`;
  }

  return cleaned;
}

function splitLines(value) {
  return compact(value)
    .split('\n')
    .map((line) => line.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean);
}

function splitSkills(value) {
  return compact(value)
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function hasEntry(entry, fields) {
  return fields.some((field) => compact(entry[field]));
}

function Section({ title, children }) {
  if (!children) return null;

  return (
    <section className="mb-[13px] break-inside-avoid">
      <h2 className="mb-[9px] border-b-[1.5px] border-black pb-[3px] text-[10.5px] font-bold uppercase tracking-[0.14em] text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ text }) {
  const lines = splitLines(text);
  if (lines.length === 0) return null;

  return (
    <ul className="mt-1 list-disc pl-4 text-black">
      {lines.map((line, index) => (
        <li key={`${line}-${index}`} className="mb-px text-[11px] leading-[1.6]">
          {line}
        </li>
      ))}
    </ul>
  );
}

function ExperienceItem({ item, index }) {
  return (
    <div key={`${item.company}-${item.role}-${index}`} className="mb-[11px] break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[12px] font-bold text-black">
          {compact(item.role) || 'Role'}
        </span>
        {compact(item.duration) && (
          <span className="shrink-0 whitespace-nowrap text-[10.5px] text-black">
            {compact(item.duration)}
          </span>
        )}
      </div>
      {compact(item.company) && (
        <div className="mb-[2px] text-[11px] italic text-black">{compact(item.company)}</div>
      )}
      <BulletList text={item.description} />
    </div>
  );
}

function ProjectItem({ item, index }) {
  return (
    <div key={`${item.name}-${index}`} className="mb-[11px] break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[12px] font-bold text-black">
          {compact(item.name) || 'Project'}
        </span>
        {compact(item.link) && (
          <span className="shrink-0 whitespace-nowrap text-[10.5px] text-black">
            {normalizeUrlLabel(item.link)}
          </span>
        )}
      </div>
      {compact(item.techStack) && (
        <div className="mb-[2px] text-[11px] italic text-black">
          <span className="font-bold">Tech Stack: </span>
          {compact(item.techStack)}
        </div>
      )}
      <BulletList text={item.description} />
    </div>
  );
}

function EducationItem({ item, index }) {
  const degree = [item.degree, item.branch ? `in ${compact(item.branch)}` : '']
    .map(compact)
    .filter(Boolean)
    .join(' ');

  return (
    <div key={`${item.college}-${index}`} className="mb-[11px] break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[12px] font-bold text-black">
          {degree || 'Degree'}
        </span>
        {compact(item.year) && (
          <span className="shrink-0 whitespace-nowrap text-[10.5px] text-black">
            {compact(item.year)}
          </span>
        )}
      </div>
      <div className="mb-[2px] text-[11px] italic text-black">
        {compact(item.college) || 'College / University'}
        {compact(item.cgpa) && (
          <span className="ml-[6px]">
            | CGPA: <strong>{compact(item.cgpa)}</strong>
          </span>
        )}
      </div>
    </div>
  );
}

export function ResumePreview({ data, onBack }) {
  const skills = splitSkills(data.skills);
  const halfList = Math.ceil(skills.length / 2);
  const skillColumns = [skills.slice(0, halfList), skills.slice(halfList)];
  const experience = (Array.isArray(data.experience) ? data.experience : []).filter((item) =>
    hasEntry(item, ['company', 'role', 'duration', 'description']),
  );
  const projects = (Array.isArray(data.projects) ? data.projects : []).filter((item) =>
    hasEntry(item, ['name', 'techStack', 'link', 'description']),
  );
  const education = (Array.isArray(data.education) ? data.education : []).filter((item) =>
    hasEntry(item, ['college', 'degree', 'branch', 'cgpa', 'year']),
  );

  const contact = [
    data.email,
    data.phone,
    data.location,
    normalizeUrlLabel(data.linkedin, 'linkedin'),
    normalizeUrlLabel(data.github, 'github'),
    normalizeUrlLabel(data.portfolio),
  ].map(compact).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="resume-print-actions flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            Preview
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Resume PDF
          </h1>
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="size-4" />
            Edit
          </Button>
          <Button type="button" onClick={() => window.print()}>
            <Download className="size-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <article className="resume-print-root mx-auto min-h-[297mm] w-[210mm] max-w-full bg-white px-[18mm] py-[15mm] text-black shadow-[0_24px_70px_rgba(15,23,42,0.18)] ring-1 ring-border">
        <header className="mb-[10px] border-b-2 border-black pb-[10px] text-center">
          <h1 className="m-0 mb-[7px] text-[28px] font-bold uppercase tracking-[0.08em] text-black">
            {compact(data.name) || 'Your Name'}
          </h1>

          {contact.length > 0 && (
            <p className="m-0 flex flex-wrap justify-center text-[10.5px] leading-5 text-black">
              {contact.map((item, index) => (
                <span key={item} className="whitespace-nowrap">
                  {item}
                  {index < contact.length - 1 && (
                    <span className="mx-[7px] text-black">|</span>
                  )}
                </span>
              ))}
            </p>
          )}
        </header>

        <div>
          <Section title="Professional Summary">
            {compact(data.summary) ? (
              <p className="m-0 text-[11px] leading-[1.65] text-black">{compact(data.summary)}</p>
            ) : null}
          </Section>

          <Section title="Technical Skills">
            {skills.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-[20px] gap-y-[2px]">
                {skillColumns.map((column, columnIndex) => (
                  <ul key={columnIndex} className="m-0 list-disc pl-4">
                    {column.map((skill, index) => (
                      <li key={`${skill}-${index}`} className="text-[11px] capitalize leading-[1.7] text-black">
                        {skill}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ) : null}
          </Section>

          <Section title="Work Experience">
            {experience.length > 0 ? (
              <>{experience.map((item, index) => <ExperienceItem key={index} item={item} index={index} />)}</>
            ) : null}
          </Section>

          <Section title="Projects">
            {projects.length > 0 ? (
              <>{projects.map((item, index) => <ProjectItem key={index} item={item} index={index} />)}</>
            ) : null}
          </Section>

          <Section title="Education">
            {education.length > 0 ? (
              <>{education.map((item, index) => <EducationItem key={index} item={item} index={index} />)}</>
            ) : null}
          </Section>
        </div>
      </article>
    </div>
  );
}

export default ResumePreview;
