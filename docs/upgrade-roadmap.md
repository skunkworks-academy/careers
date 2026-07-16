# Careers Portal Upgrade Roadmap

## Release 0.2 — Candidate Workspace

- Candidate dashboard with lifecycle status, next actions and progress indicators
- Resume assessment and export candidate evidence
- Consultation preparation and recommended next-step placeholders
- Local adapter boundary for later Azure SQL and Dataverse persistence
- Improved operational status model and audit event contract

## Release 0.3 — Identity and Persistence

- Microsoft Entra External ID authentication
- Authenticated candidate records in Azure SQL
- Consent versioning, duplicate detection and lifecycle audit events
- Secure assessment draft and submission APIs
- Azure Service Bus event publication

## Release 0.4 — Analysis and Consultation

- Azure OpenAI structured analysis through a secured backend API
- Consultant review queue and quality approval
- Microsoft Bookings integration
- Versioned career-growth reports and learning programmes

## Release 0.5 — Enrolment and Learning

- Proposal acceptance and enrolment handoff
- LMS, labs, badge hub and jobs integration
- Learner progress, mentoring, certification and next-path workflows

## Production constraints

- No secrets in browser code or GitHub
- Candidate identities remain separate from workforce identities
- Azure SQL is the application system of record
- Dataverse supports operational case management
- Every AI recommendation requires human review before candidate release
- POPIA-aligned consent, retention, correction and deletion controls
