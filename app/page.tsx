'use client';

import { FormEvent, useState } from 'react';

type Registration = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  careerInterest: string;
  consent: boolean;
};

const initialForm: Registration = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  careerInterest: '',
  consent: false,
};

export default function HomePage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem('swa-candidate-registration-v1', JSON.stringify({ ...form, registeredAt: new Date().toISOString() }));
    setSubmitted(true);
  }

  return (
    <main>
      <header className="academyHeader">
        <a className="academyBrand" href="https://www.skunkworksacademy.com/" aria-label="Skunkworks Academy home">
          <img className="academyLogo academyLogoLight" src="https://raw.githubusercontent.com/skunkworks-academy/www/refs/heads/main/images/favicon-black.png" alt="" width="40" height="40" />
          <img className="academyLogo academyLogoDark" src="https://raw.githubusercontent.com/skunkworks-academy/www/refs/heads/main/images/favicon-white.png" alt="" width="40" height="40" />
          <span><strong>Skunkworks Academy</strong><small>Careers</small></span>
        </a>
        <button className="academyMenuButton" type="button" aria-label="Toggle Academy navigation" aria-expanded={navigationOpen} aria-controls="academy-navigation" onClick={() => setNavigationOpen((open) => !open)}>
          <span aria-hidden="true">☰</span><span>Menu</span>
        </button>
        <nav id="academy-navigation" className={`academyNav ${navigationOpen ? 'academyNavOpen' : ''}`} aria-label="Skunkworks Academy navigation">
          <a href="https://www.skunkworksacademy.com/">Home</a>
          <a href="https://www.skunkworksacademy.com/catalogue/">Self-Paced Catalogue</a>
          <a href="https://portal.skunkworksacademy.com/">Portal</a>
          <a href="https://labs.skunkworksacademy.com/">Labs</a>
          <a href="https://badging.skunkworksacademy.com/">Badging</a>
          <a href="https://www.skunkworksacademy.com/plans-and-purchases/">Plans &amp; Purchases</a>
          <a href="https://www.skunkworksacademy.com/forms/">Forms</a>
          <a aria-current="page" href="/">Careers</a>
          <a href="https://portal.skunkworksacademy.com/reports/">Reports</a>
          <a href="https://ibm.skunkworksacademy.com/">IBM</a>
          <a href="https://www.skunkworksacademy.com/microsoft/">Microsoft</a>
          <a href="https://www.skunkworksacademy.com/google/">Google</a>
          <a href="https://www.skunkworksacademy.com/redhat/">Red Hat</a>
          <a href="https://docs.skunkworksacademy.com/">Docs</a>
          <a href="https://publish.skunkworksacademy.com/">Publish</a>
          <a href="https://github.com/skunkworks-academy" target="_blank" rel="noreferrer">GitHub</a>
          <a className="academySignIn" href="/auth/sign-in/">Sign in</a>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Career intelligence · Learning pathways · Human guidance</p>
          <h1>Build a career plan grounded in your skills, goals and opportunities.</h1>
          <p className="lead">
            Register, complete a structured career assessment and receive a consultant-reviewed growth and learning programme.
          </p>
          <div className="journey" aria-label="Candidate journey">
            <span>Register</span><span>Assess</span><span>Analyse</span><span>Consult</span><span>Learn</span><span>Certify</span>
          </div>
          <div className="heroActions">
            <a className="primaryLink" href="/assessment/">Start career assessment</a>
            <a className="secondaryLink" href="/workspace/">Open candidate workspace</a>
          </div>
        </div>

        <section className="panel" aria-labelledby="registration-heading">
          <p className="step">Step 1 of your career journey</p>
          <h2 id="registration-heading">Candidate registration</h2>
          {submitted ? (
            <div className="success" role="status">
              <strong>Candidate profile prepared.</strong>
              <p>Your registration has been saved in this browser for the MVP. Continue to the full Career Growth and Learning Assessment.</p>
              <div className="heroActions">
                <a className="primaryLink" href="/assessment/">Continue to assessment</a>
                <a className="secondaryLink" href="/workspace/">View workspace</a>
              </div>
              <button type="button" className="textButton" onClick={() => { setSubmitted(false); setForm(initialForm); }}>Register another candidate</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="twoCols">
                <label>First name<input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></label>
                <label>Last name<input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></label>
              </div>
              <label>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
              <label>Mobile number<input required type="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} /></label>
              <label>Primary career interest
                <select required value={form.careerInterest} onChange={(e) => setForm({ ...form, careerInterest: e.target.value })}>
                  <option value="">Select an area</option>
                  <option>Artificial intelligence</option>
                  <option>Cloud and infrastructure</option>
                  <option>Cybersecurity</option>
                  <option>Data and analytics</option>
                  <option>Software development</option>
                  <option>IT support and networking</option>
                  <option>Business and digital transformation</option>
                </select>
              </label>
              <label className="consent"><input required type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
                <span>I consent to Skunkworks Academy processing my information for career assessment and learning-path recommendations.</span>
              </label>
              <button className="primary" type="submit">Create candidate profile</button>
              <p className="finePrint">The production identity layer will use Microsoft Entra External ID. This deployed MVP stores drafts only in the candidate&apos;s browser.</p>
            </form>
          )}
        </section>
      </section>

      <section className="trust">
        <article><strong>Human-reviewed recommendations</strong><p>AI supports analysis; a career consultant validates every released learning programme.</p></article>
        <article><strong>Secure external identity</strong><p>Candidate accounts are separated from Skunkworks workforce identities through Entra External ID.</p></article>
        <article><strong>End-to-end progression</strong><p>Assessment, consultation, enrolment, certification and career support use one candidate lifecycle.</p></article>
      </section>
    </main>
  );
}
