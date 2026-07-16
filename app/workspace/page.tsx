'use client';

import { useEffect, useMemo, useState } from 'react';

type Candidate = {
  firstName?: string;
  lastName?: string;
  email?: string;
  careerInterest?: string;
  registeredAt?: string;
};

type Answers = Record<string, string>;

const lifecycle = [
  'Registered',
  'Assessment in progress',
  'Assessment submitted',
  'Consultant review',
  'Quality review',
  'Consultation',
  'Learning plan',
  'Enrolment'
];

export default function WorkspacePage() {
  const [candidate, setCandidate] = useState<Candidate>({});
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    const registration = window.localStorage.getItem('swa-candidate-registration-v1');
    const assessment = window.localStorage.getItem('swa-career-assessment-v1');
    if (registration) setCandidate(JSON.parse(registration));
    if (assessment) setAnswers(JSON.parse(assessment));
  }, []);

  const answerCount = Object.values(answers).filter(Boolean).length;
  const progress = Math.min(100, Math.round((answerCount / 38) * 100));
  const stage = progress >= 100 ? 2 : progress > 0 ? 1 : 0;

  const candidateName = useMemo(() => {
    const name = `${candidate.firstName ?? ''} ${candidate.lastName ?? ''}`.trim();
    return name || 'Candidate';
  }, [candidate]);

  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="/">
          <span className="brandMark">S</span>
          <span>Skunkworks Academy Careers</span>
        </a>
        <a className="signIn" href="/assessment/">Resume assessment</a>
      </header>

      <section className="workspaceShell">
        <div className="workspaceHero">
          <div>
            <p className="eyebrow">Candidate workspace</p>
            <h1>Welcome, {candidateName}.</h1>
            <p className="lead">Track your assessment, consultation and personalised learning-path journey from one place.</p>
          </div>
          <div className="statusCard">
            <span>Current stage</span>
            <strong>{lifecycle[stage]}</strong>
            <div className="progressTrack"><span style={{ width: `${progress}%` }} /></div>
            <small>{progress}% assessment completion</small>
          </div>
        </div>

        <section className="workspaceGrid">
          <article className="panel">
            <p className="step">Next action</p>
            <h2>{progress >= 100 ? 'Submit for review' : 'Complete your assessment'}</h2>
            <p className="muted">{progress >= 100 ? 'Review your responses and submit the completed assessment for consultant analysis.' : `${answerCount} of 38 assessment responses have been captured.`}</p>
            <a className="primaryLink" href="/assessment/">{progress >= 100 ? 'Review assessment' : 'Continue assessment'}</a>
          </article>

          <article className="panel">
            <p className="step">Candidate profile</p>
            <h2>{candidate.careerInterest || 'Career interest pending'}</h2>
            <p className="muted">{candidate.email || 'Register your profile to link assessment and consultation records.'}</p>
            <a className="secondaryLink" href="/#registration-heading">Update profile</a>
          </article>

          <article className="panel">
            <p className="step">Consultation</p>
            <h2>Pending assessment review</h2>
            <p className="muted">Consultation scheduling becomes available after assessment submission, consultant review and internal quality approval.</p>
            <button className="secondary" type="button" disabled>Booking not yet available</button>
          </article>
        </section>

        <section className="panel lifecyclePanel">
          <p className="step">Your career-development lifecycle</p>
          <div className="lifecycleList">
            {lifecycle.map((item, index) => (
              <div className={index <= stage ? 'lifecycleItem active' : 'lifecycleItem'} key={item}>
                <span>{index + 1}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="workspaceGrid compact">
          <article className="panel"><strong>Human review</strong><p className="muted">AI-supported findings are validated by a Skunkworks Academy career consultant.</p></article>
          <article className="panel"><strong>Quality control</strong><p className="muted">Learning plans are checked before they are released to candidates.</p></article>
          <article className="panel"><strong>Evidence ownership</strong><p className="muted">Export your assessment evidence while the MVP uses browser-based storage.</p></article>
        </section>
      </section>
    </main>
  );
}
