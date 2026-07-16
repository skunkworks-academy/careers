export default function SignInPage() {
  const configured = Boolean(
    process.env.NEXT_PUBLIC_ENTRA_CLIENT_ID &&
    process.env.NEXT_PUBLIC_ENTRA_TENANT_SUBDOMAIN
  );

  return (
    <main className="authPage">
      <section className="panel authPanel">
        <p className="step">Microsoft Entra External ID</p>
        <h1>Candidate sign in</h1>
        <p className="leadSmall">
          Candidate authentication will use the Skunkworks Academy external tenant. Workforce accounts will remain separate.
        </p>
        {configured ? (
          <a className="primary authAction" href="/api/auth/login">Continue with Microsoft</a>
        ) : (
          <div className="configurationNotice" role="status">
            <strong>Identity configuration is pending.</strong>
            <p>Add the Entra External ID application settings defined in <code>.env.example</code> before enabling sign-in.</p>
          </div>
        )}
        <a className="backLink" href="/">Return to registration</a>
      </section>
    </main>
  );
}
