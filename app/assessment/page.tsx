'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type AnswerMap = Record<string, string>;

type Question = {
  id: string;
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'number' | 'email' | 'tel' | 'url';
  options?: string[];
  required?: boolean;
};

type Section = { title: string; description: string; questions: Question[] };

const sections: Section[] = [
  {
    title: 'Candidate profile',
    description: 'Basic information used to create and manage your candidate record.',
    questions: [
      { id: 'fullName', label: 'Full name', required: true },
      { id: 'age', label: 'Age', type: 'number' },
      { id: 'position', label: 'Current position or role', required: true },
      { id: 'department', label: 'Department or area of focus' },
      { id: 'email', label: 'Email address', type: 'email', required: true },
      { id: 'mobile', label: 'Mobile number', type: 'tel', required: true },
      { id: 'linkedin', label: 'LinkedIn profile', type: 'url' },
      { id: 'github', label: 'GitHub profile', type: 'url' },
      { id: 'credly', label: 'Credly profile', type: 'url' },
    ],
  },
  {
    title: 'Experience and interests',
    description: 'Your current capabilities, preferred technology domains and professional interests.',
    questions: [
      { id: 'domains', label: 'Which technology domains do you have the most experience or interest in?', type: 'textarea', required: true },
      { id: 'projects', label: 'Describe projects or technologies you are particularly passionate about.', type: 'textarea' },
      { id: 'technicalSkills', label: 'Describe your technical skills and proficiency levels.', type: 'textarea', required: true },
      { id: 'emergingTech', label: 'Which emerging technologies or trends interest you most?', type: 'textarea' },
      { id: 'partnerships', label: 'Which Skunkworks technology partnerships align with your goals, and why?', type: 'textarea' },
    ],
  },
  {
    title: 'Career direction',
    description: 'Define the outcomes your personalised development programme should target.',
    questions: [
      { id: 'shortTerm', label: 'Short-term career goals for the next 1–2 years', type: 'textarea', required: true },
      { id: 'mediumTerm', label: 'Medium-term career goals for the next 3–5 years', type: 'textarea', required: true },
      { id: 'longTerm', label: 'Long-term career goals beyond five years', type: 'textarea', required: true },
      { id: 'roleEvolution', label: 'How do you envision your role evolving as you gain more skills?', type: 'textarea' },
      { id: 'impact', label: 'What long-term impact do you hope to make in your field?', type: 'textarea' },
    ],
  },
  {
    title: 'Learning preferences',
    description: 'How, where and how quickly you prefer to develop new capabilities.',
    questions: [
      { id: 'currentHours', label: 'Current weekly time allocated to learning', type: 'select', options: ['None', '0–2 hours', '3–5 hours', '6–10 hours', '11–15 hours', 'More than 15 hours'], required: true },
      { id: 'additionalHours', label: 'Additional weekly time you can allocate', type: 'select', options: ['0–2 hours', '3–5 hours', '6–10 hours', '11–15 hours', 'More than 15 hours'], required: true },
      { id: 'learningStyle', label: 'Preferred learning methods', type: 'textarea', required: true },
      { id: 'workMode', label: 'Preferred work mode', type: 'select', options: ['Remote', 'Office-based', 'Hybrid', 'Flexible'], required: true },
      { id: 'collaboration', label: 'Preferred collaboration style', type: 'select', options: ['Independent', 'Team-oriented', 'Comfortable with both'], required: true },
      { id: 'teachingContent', label: 'Would you prefer teaching others or creating learning content?', type: 'select', options: ['Teaching', 'Creating course content', 'Both equally', 'Neither'] },
    ],
  },
  {
    title: 'Support and readiness',
    description: 'Identify blockers, mentoring needs and support requirements.',
    questions: [
      { id: 'leadership', label: 'Describe any leadership or project-management experience.', type: 'textarea' },
      { id: 'mentor', label: 'Would you like to be paired with a mentor or coach?', type: 'select', options: ['Yes', 'No', 'Maybe'], required: true },
      { id: 'mentorFocus', label: 'Which areas should a mentor focus on?', type: 'textarea' },
      { id: 'feedback', label: 'How do you prefer to receive feedback?', type: 'textarea', required: true },
      { id: 'challenges', label: 'What are the biggest challenges or obstacles in your current role?', type: 'textarea', required: true },
      { id: 'support', label: 'Which skills or areas require additional support?', type: 'textarea' },
      { id: 'resources', label: 'List useful books, courses or resources you have already used.', type: 'textarea' },
    ],
  },
  {
    title: 'Consent and final notes',
    description: 'Confirm that the information may be used for assessment and programme planning.',
    questions: [
      { id: 'additionalNotes', label: 'Anything else you would like the consultant to know?', type: 'textarea' },
      { id: 'consent', label: 'Consent', type: 'select', options: ['I acknowledge and consent to the use of this information.'], required: true },
    ],
  },
];

const allQuestions = sections.flatMap((section) => section.questions);
const storageKey = 'swa-career-assessment-v1';

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(answers));
  }, [answers]);

  const completed = useMemo(() => allQuestions.filter((q) => answers[q.id]?.trim()).length, [answers]);
  const percentage = Math.round((completed / allQuestions.length) * 100);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function download() {
    const payload = {
      assessmentVersion: '2026.1',
      submittedAt: new Date().toISOString(),
      status: submitted ? 'submitted' : 'draft',
      answers,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `career-assessment-${answers.fullName || 'candidate'}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="/"><span className="brandMark">S</span><span>Skunkworks Academy Careers</span></a>
        <a className="signIn" href="/">Return home</a>
      </header>

      <section className="assessmentShell">
        <div className="assessmentIntro">
          <p className="eyebrow">Career Growth and Learning Assessment</p>
          <h1>Build the evidence for your personalised development roadmap.</h1>
          <p className="lead">Your answers are saved in this browser while you work. A production release will submit securely to the Skunkworks candidate platform.</p>
          <div className="progressCard" aria-label={`${percentage}% complete`}>
            <div><strong>{percentage}%</strong><span>{completed} of {allQuestions.length} questions completed</span></div>
            <div className="progressTrack"><span style={{ width: `${percentage}%` }} /></div>
          </div>
          {submitted && <div className="success"><strong>Assessment completed locally.</strong><p>Download the assessment record for review. Secure server-side submission is the next implementation phase.</p><button type="button" onClick={download}>Download assessment record</button></div>}
        </div>

        <form className="assessmentForm" onSubmit={submit}>
          {sections.map((section, index) => (
            <section className="panel assessmentSection" key={section.title}>
              <p className="step">Section {index + 1} of {sections.length}</p>
              <h2>{section.title}</h2>
              <p className="sectionDescription">{section.description}</p>
              <div className="questionGrid">
                {section.questions.map((question) => (
                  <label key={question.id}>{question.label}
                    {question.type === 'textarea' ? (
                      <textarea required={question.required} value={answers[question.id] || ''} onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })} rows={4} />
                    ) : question.type === 'select' ? (
                      <select required={question.required} value={answers[question.id] || ''} onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}>
                        <option value="">Select an option</option>
                        {question.options?.map((option) => <option key={option}>{option}</option>)}
                      </select>
                    ) : (
                      <input required={question.required} type={question.type || 'text'} value={answers[question.id] || ''} onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })} />
                    )}
                  </label>
                ))}
              </div>
            </section>
          ))}
          <div className="assessmentActions">
            <button className="secondary" type="button" onClick={download}>Download draft</button>
            <button className="primary" type="submit">Complete assessment</button>
          </div>
        </form>
      </section>
    </main>
  );
}
