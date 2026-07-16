# Careers Portal Implementation Plan

## Objective

Deploy a secure candidate portal at `careers.skunkworksacademy.com` that supports registration, assessment, consultant review, learning-path generation, consultation scheduling, proposals, enrolment and career progression.

## Phase 1 — Portal foundation

- Next.js and TypeScript application
- Responsive Skunkworks Academy candidate experience
- Registration MVP and consent capture interface
- Entra External ID configuration contract
- GitHub Actions quality checks
- Azure App Service deployment design

## Phase 2 — Identity and candidate records

- Create Microsoft Entra External ID external tenant configuration
- Register SPA/web application and redirect URIs
- Implement MSAL authentication and protected candidate routes
- Add Azure SQL candidate, consent and lifecycle tables
- Implement registration API with validation, duplicate detection and audit logging
- Issue immutable candidate IDs

## Phase 3 — Assessment engine

- Versioned question banks
- Assessment sessions with resume support
- Scoring and dimension calculations
- Submission locking and audit timestamps
- Reminder and expiry workflows
- Accessibility and mobile validation

## Phase 4 — AI and consultant review

- Queue assessment submissions through Azure Service Bus
- Generate structured draft analysis through Azure OpenAI
- Store model, prompt and output versions
- Create consultant and quality-review tasks in Dataverse
- Prevent candidate release until human approval

## Phase 5 — Consultation and commercial workflow

- Microsoft Bookings integration
- Teams meeting creation and reminders
- Personalised report and learning-programme generation
- Proposal generation and decision tracking
- Follow-up and nurture sequences

## Phase 6 — Learning and career ecosystem

- LMS and course registration hand-off
- Labs access provisioning
- Progress and mentoring reviews
- Certification and badge tracking
- Jobs and career-support integration
- Next-learning-path recommendations

## Environments

- `careers-dev`
- `careers-uat`
- `careers-prod`

Each environment must have independent configuration, data stores, service identities and deployment approvals.

## Initial Azure resources

- Azure App Service and App Service Plan
- Azure SQL Database
- Azure Key Vault
- Application Insights
- Log Analytics workspace
- Azure Service Bus namespace
- Storage account
- Azure OpenAI resource when the review workflow is ready

## Definition of production readiness

- Entra External ID authentication operates end to end
- Registration persists securely and prevents duplicates
- POPIA consent is versioned and auditable
- Automated tests and dependency scanning pass
- UAT approval is recorded
- Monitoring, backup and recovery procedures are documented
- No secrets are stored in GitHub or client-side bundles
