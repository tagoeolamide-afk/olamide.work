import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/content/site";
import FrameSlot from "@/components/FrameSlot";
import Lightbox from "@/components/Lightbox";

const DIR = "/images/authentication-audit";

export const metadata: Metadata = {
  title: `Authentication System Audit — ${site.name}`,
  description:
    "An independent UX audit and redesign of a YC-backed fintech authentication experience for the Nigerian market.",
};

/* ---------- small building blocks (kept on-brand) ---------- */

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 sm:mt-20">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="t-meta">{n}</span>
        <h2 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.01em] text-[color:var(--ink)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="t-body max-w-[68ch] text-[color:var(--ink)]">{children}</p>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="t-body">{children}</p>;
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 text-[1.125rem] font-semibold text-[color:var(--ink)]">
      {children}
    </h3>
  );
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mt-6 text-[0.95rem] font-semibold text-[color:var(--ink)]">
      {children}
    </h4>
  );
}

/** Horizontal chip flow, wraps on small screens. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="my-6 flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span className="rounded-full border border-[color:var(--hairline)] px-4 py-2 text-[14px] font-medium text-[color:var(--ink)]">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden className="text-[color:var(--muted)]">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function CountTable({
  caption,
  rows,
  total,
}: {
  caption: string;
  rows: [string, number][];
  total: number;
}) {
  return (
    <div className="my-6 max-w-[42rem] overflow-hidden rounded-[var(--radius)] border border-[color:var(--hairline)]">
      <table className="w-full text-left text-[14px]">
        <caption className="t-meta px-4 pt-4 text-left">{caption}</caption>
        <tbody>
          {rows.map(([label, n]) => (
            <tr key={label} className="border-t border-[color:var(--hairline)] first:border-t-0">
              <th scope="row" className="px-4 py-2.5 font-normal text-[color:var(--muted)]">
                {label}
              </th>
              <td className="px-4 py-2.5 text-right font-medium tabular-nums text-[color:var(--ink)]">
                {n}
              </td>
            </tr>
          ))}
          <tr className="border-t border-[color:var(--ink)]">
            <th scope="row" className="px-4 py-2.5 font-semibold text-[color:var(--ink)]">
              Total
            </th>
            <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-[color:var(--ink)]">
              {total}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function StatCards({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="my-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-[color:var(--hairline)] bg-[color:var(--hairline)] sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="bg-[color:var(--bg)] p-5">
          <div className="text-[2.25rem] font-semibold leading-none tracking-[-0.02em] text-[color:var(--ink)]">
            {s.value}
          </div>
          <p className="mt-2 text-[13px] leading-snug text-[color:var(--muted)]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Two stacked-on-mobile image slots for a before/after comparison. */
function BeforeAfter({
  base,
  beforeAlt,
  afterAlt,
  ratio = "16 / 10",
}: {
  base: string;
  beforeAlt: string;
  afterAlt: string;
  ratio?: string;
}) {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      <FrameSlot src={`${DIR}/${base}-before.png`} alt={beforeAlt} ratio={ratio} label="Before" />
      <FrameSlot src={`${DIR}/${base}-after.png`} alt={afterAlt} ratio={ratio} label="After" />
    </div>
  );
}

function Changed({ items }: { items: string[] }) {
  return (
    <>
      <H4>What changed</H4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[color:var(--muted)]">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </>
  );
}

function Why({ children }: { children: React.ReactNode }) {
  return (
    <>
      <H4>Why it matters</H4>
      <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--muted)]">{children}</p>
    </>
  );
}

function Msg({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-4 max-w-[46rem] rounded-[var(--radius)] bg-[#f2f2f2] px-4 py-3">
      <span className="t-meta">{label}</span>
      <p className="mt-1 text-[14px] text-[color:var(--ink)]">{text}</p>
    </div>
  );
}

/* ------------------------------ page ------------------------------ */

export default function AuthenticationAuditPage() {
  return (
    <Lightbox>
    <main id="main" className="mx-auto w-full max-w-[900px] px-6 pb-24 pt-8">
      {/* header / back nav */}
      <header className="flex items-baseline justify-between">
        <Link href="/" className="t-name inline-block transition-opacity hover:opacity-60">
          {site.name}
        </Link>
        <Link href="/" className="t-meta transition-colors hover:text-[color:var(--ink)]">
          ← Back to home
        </Link>
      </header>

      {/* 1 · Hero */}
      <div className="mt-16">
        <span className="t-meta">Self-initiated</span>
        <h1 className="mt-3 max-w-[20ch] text-[clamp(1.9rem,4.5vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[color:var(--ink)]">
          Authentication System Audit
        </h1>
        <p className="t-lead mt-5 max-w-[54ch]">
          An independent UX audit and redesign of a YC-backed fintech authentication
          experience for the Nigerian market.
        </p>
      </div>

      <div className="mt-10">
        <FrameSlot
          src={`${DIR}/hero.png`}
          alt="Redesigned signup screen with a trust-signals panel and progress indicator"
          ratio="16 / 10"
        />
      </div>

      {/* privacy disclaimer for the screenshots */}
      <p className="mt-4 flex items-start gap-2 text-[13px] leading-snug text-[color:var(--muted)]">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          className="mt-[0.15em] shrink-0"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 11v5M12 8h.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span>
          Note: the company&rsquo;s logo has been blurred out in every screenshot on this page
          to protect its privacy.
        </span>
      </p>

      {/* metadata row */}
      <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[color:var(--hairline)] pt-8 sm:grid-cols-4">
        {[
          ["Role", "Product Designer"],
          ["Timeline", "2 weeks"],
          ["Tools", "Figma, Chrome DevTools, Claude"],
          ["Platforms", "Desktop and mobile"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="t-meta">{k}</dt>
            <dd className="mt-2 text-[14px] leading-snug text-[color:var(--muted)]">{v}</dd>
          </div>
        ))}
      </dl>

      {/* 2 · Overview */}
      <Section n="01" title="Overview">
        <div className="max-w-[68ch] space-y-4">
          <P>
            A YC-backed fintech payments platform in Lagos helps Nigerian businesses accept
            payments through WhatsApp and social media. The product sits in a high-trust
            category where users sign up, verify their identity, connect their business
            details, and manage payment activity.
          </P>
          <P>
            I independently audited the platform’s authentication experience across desktop
            and mobile. The review covered signup, login, email verification, password
            recovery, business setup, identity verification, and the first dashboard state
            after onboarding.
          </P>
          <P>
            The audit used four lenses: UI best practices, UX journey analysis, Nielsen’s
            usability heuristics, and WCAG 2.1 accessibility standards.
          </P>
          <P>
            The review uncovered 55 unique issues. These included an account enumeration
            risk, a rate limiter that warned users but did not block attempts, unclear error
            handling, missing progress guidance, and accessibility barriers that could stop
            some users from completing authentication.
          </P>
          <P>
            I redesigned 33 screens in Figma to show practical fixes while staying close to
            the existing visual language.
          </P>
        </div>
      </Section>

      {/* 3 · Background */}
      <Section n="02" title="Background">
        <Flow steps={["Social commerce", "Chat", "Payment"]} />
        <div className="max-w-[68ch] space-y-4">
          <P>
            The product operates at the intersection of social commerce and payments
            infrastructure. Instead of pushing customers away from a chat into a separate
            checkout journey, the platform helps businesses collect payments inside the
            channels where they already speak with customers.
          </P>
          <P>
            The target user is a Nigerian business owner. This user is often mobile-first,
            time-constrained, and working with unreliable network conditions. They may sign
            up while switching between customer chats, sales activity, and daily business
            operations.
          </P>
          <P>
            That makes authentication more than a security checkpoint. It is the first
            product experience. Before the user can receive payment, they must create an
            account, verify their email, add business details, and complete identity checks.
          </P>
          <P>
            If this flow feels unclear, risky, or difficult to recover from, the product
            loses trust before the user reaches value.
          </P>
        </div>
      </Section>

      {/* 4 · The Problem */}
      <Section n="03" title="The Problem">
        <div className="max-w-[68ch] space-y-4">
          <P>
            I walked through the full flow as a real user. I created an account, verified
            email, entered identity details, set up a business, logged in, logged out, reset
            my password, and tested common error states.
          </P>
          <P>Three problems stood out.</P>
        </div>

        <H3>The signup flow looked simple, but the journey became heavy.</H3>
        <div className="max-w-[68ch] space-y-4">
          <P>
            The first screen asked for only an email address. That made the process feel
            short. But the full journey later required phone number, business information,
            BVN, NIN, and date of birth.
          </P>
          <P>
            The interface did not tell users what they needed before they started. A user
            could begin signup on mobile, reach identity verification, and realize they did
            not have the required information available.
          </P>
        </div>

        <H3>Login errors exposed account status.</H3>
        <div className="max-w-[68ch] space-y-4">
          <P>
            The login flow used different messages for different failures. A wrong email
            showed one message. A correct email with a wrong password showed another.
          </P>
          <P>
            This helped a genuine user, but it also allowed someone else to test whether an
            email address existed on the platform. For a payments product, that creates an
            account enumeration risk.
          </P>
        </div>

        <H3>The dashboard did not guide the user after onboarding.</H3>
        <div className="max-w-[68ch] space-y-4">
          <P>
            After completing the longest part of the journey, the user landed on a dashboard
            with blank charts and no clear next step.
          </P>
          <P>
            There was no welcome message, no setup checklist, and no prompt to help the user
            move toward the first valuable action.
          </P>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <FrameSlot
            src={`${DIR}/problem-signup.png`}
            alt="Current signup page with a single email field and an empty decorative right panel"
            ratio="16 / 10"
          />
          <FrameSlot
            src={`${DIR}/problem-login-errors.png`}
            alt="Login screen showing two different error messages for wrong email versus wrong password"
            ratio="16 / 10"
          />
          <FrameSlot
            src={`${DIR}/problem-empty-dashboard.png`}
            alt="Empty post-signup dashboard with blank charts and no next step"
            ratio="16 / 10"
          />
        </div>
      </Section>

      {/* 5 · Goals */}
      <Section n="04" title="Goals">
        <div className="max-w-[68ch] space-y-4">
          <P>
            The goal was not to make the screens look different. The goal was to make the
            authentication journey clearer, safer, and easier to complete.
          </P>
          <P>The audit had six objectives:</P>
          <ol className="list-decimal space-y-1.5 pl-5 text-[15px] leading-relaxed text-[color:var(--muted)]">
            <li>Walk through every authentication screen as a real user.</li>
            <li>Test desktop and mobile states, including error and recovery paths.</li>
            <li>Evaluate the experience against UI, UX, heuristic, and accessibility standards.</li>
            <li>Document what worked well and what needed improvement.</li>
            <li>Redesign the screens that created the highest friction or risk.</li>
            <li>Produce recommendations a product team could act on quickly.</li>
          </ol>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <H4>Scope</H4>
            <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--muted)]">
              Signup, email verification, account creation, business setup, BVN and NIN
              identity verification, login, password recovery, and the first dashboard state
              after signup.
            </p>
          </div>
          <div>
            <H4>Out of scope</H4>
            <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--muted)]">
              The full merchant dashboard, payment flows, WhatsApp integration, API
              documentation, and marketing website.
            </p>
          </div>
        </div>
      </Section>

      {/* 6 · Process */}
      <Section n="05" title="Process">
        <Flow steps={["Test", "Document", "Evaluate", "Redesign", "Report"]} />

        <H3>1. Manual testing</H3>
        <P>
          I created a real account and walked through every screen on desktop and mobile. I
          tested normal paths and failure paths, including empty forms, invalid emails, wrong
          passwords, wrong OTP codes, mismatched passwords, and repeated failed login
          attempts.
        </P>

        <H3>2. Documentation</H3>
        <P>
          I captured 39 screenshots across the flow. Each screenshot documented screen state,
          error copy, visual feedback, input behavior, and user friction.
        </P>

        <H3>3. Multi-framework evaluation</H3>
        <P>I reviewed the experience through four lenses:</P>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[color:var(--muted)]">
          <li>
            UI audit across layout, typography, color, buttons, hierarchy, errors,
            consistency, and responsiveness.
          </li>
          <li>UX journey mapping with friction point analysis.</li>
          <li>Nielsen’s 10 usability heuristics.</li>
          <li>WCAG 2.1 accessibility review targeting Level AA.</li>
        </ul>

        <H3>4. Redesign</H3>
        <P>
          I redesigned 33 screens in Figma. The redesign kept the existing visual language
          while improving validation, guidance, feedback, security-adjacent UX, and mobile
          usability.
        </P>

        <H3>5. Report</H3>
        <P>
          I compiled the findings into a structured report with implications, priorities,
          recommendations, and before-and-after comparisons.
        </P>
      </Section>

      {/* 7 · Research and Findings */}
      <Section n="06" title="Research and Findings">
        <Lead>
          The audit found issues across interface design, user journey, usability heuristics,
          and accessibility.
        </Lead>

        {/* UI */}
        <H3>UI Audit</H3>
        <P>
          I reviewed the interface across eight visual categories: layout, typography, color,
          buttons, visual hierarchy, error states, consistency, and responsiveness.
        </P>
        <P>Three UI issues mattered most.</P>

        <H4>40% of the desktop viewport had no job.</H4>
        <div className="max-w-[68ch] space-y-3">
          <P>
            The authentication pages used a two-panel desktop layout. The right panel was a
            decorative gradient with no content, trust signal, product message, or support
            value.
          </P>
          <P>
            On a fintech signup screen, that space should reduce doubt. It should help users
            understand who they are signing up with and why they can trust the product.
          </P>
        </div>

        <H4>Password rules appeared too late.</H4>
        <div className="max-w-[68ch] space-y-3">
          <P>
            The password requirements appeared as one dense paragraph after failure. The user
            had to submit a wrong password first, then read a long sentence, then mentally
            break it into five rules.
          </P>
          <P>A real-time checklist gives faster feedback and reduces failed submissions.</P>
        </div>

        <H4>Email validation relied too much on color.</H4>
        <div className="max-w-[68ch] space-y-3">
          <P>
            The email field changed border color while the user typed. Red meant invalid.
            Blue meant valid.
          </P>
          <P>
            That created early error anxiety and relied on color alone. It also gave feedback
            before the user had finished typing.
          </P>
        </div>

        <CountTable
          caption="UI audit issue count"
          rows={[
            ["Layout and spacing", 3],
            ["Typography", 4],
            ["Color and contrast", 4],
            ["Buttons and form fields", 4],
            ["Visual hierarchy", 2],
            ["Error and success states", 4],
            ["Consistency", 6],
            ["Responsiveness", 4],
          ]}
          total={31}
        />

        {/* UX */}
        <H3>UX Evaluation</H3>
        <P>
          I mapped friction across signup, login, password reset, verification, and
          onboarding.
        </P>
        <P>Three UX issues mattered most.</P>

        <H4>Cognitive load increased without warning.</H4>
        <div className="max-w-[68ch] space-y-3">
          <P>
            The journey started with one email field, then expanded into OTP, personal
            details, business setup, BVN, NIN, and date of birth.
          </P>
          <P>The user did not get a progress indicator or preparation note before starting.</P>
        </div>

        <H4>OTP errors competed with each other.</H4>
        <div className="max-w-[68ch] space-y-3">
          <P>
            A failed OTP showed two messages at the same time. One appeared as a toast.
            Another appeared inline near the OTP input.
          </P>
          <P>
            The messages used different wording for the same problem. That made the user
            process two pieces of feedback instead of one clear instruction.
          </P>
        </div>

        <H4>Required steps could be closed by mistake.</H4>
        <div className="max-w-[68ch] space-y-3">
          <P>
            The business setup modal and identity verification modal were required, but the
            user could dismiss them by clicking outside or pressing close.
          </P>
          <P>
            If a step is required, the interface should not make it feel optional. If it is
            optional, the product should explain what the user loses by skipping it.
          </P>
        </div>

        <CountTable
          caption="Flow friction points"
          rows={[
            ["Signup", 17],
            ["Login", 5],
            ["Password reset", 4],
          ]}
          total={26}
        />

        {/* Heuristics */}
        <H3>Heuristic Evaluation</H3>
        <P>
          I applied Nielsen’s 10 usability heuristics to the flow. The review found 36 areas
          that worked well and 44 areas that needed improvement.
        </P>
        <P>The most repeated issues came from three heuristics.</P>

        <H4>Visibility of system status</H4>
        <P>
          The flow needed clearer progress indicators, OTP timers, loading states, and
          success feedback between steps.
        </P>

        <H4>Error prevention</H4>
        <P>
          The flow allowed bad input too early. Short names passed early forms. Government ID
          fields accepted weak input. Password checks appeared late. Some empty forms had
          active buttons.
        </P>

        <H4>Help users recover from errors</H4>
        <P>
          Several errors told the user what failed, but not how to fix it. Examples included
          vague identity mismatch feedback, expired or invalid OTP wording, and login errors
          that exposed account status.
        </P>

        {/* Accessibility */}
        <H3>Accessibility Review</H3>
        <P>
          I reviewed the flow against WCAG 2.1 Level AA using visual and behavioral
          inspection.
        </P>
        <P>The audit found 19 accessibility issues: 9 at Level A and 10 at Level AA.</P>
        <P>Five issues could block some users from completing authentication:</P>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[15px] leading-relaxed text-[color:var(--muted)]">
          <li>Toast errors may not be announced to screen readers.</li>
          <li>Custom OTP inputs may not have clear accessible labels.</li>
          <li>Page transitions may not be communicated in the single-page app.</li>
          <li>Modals may not trap keyboard focus correctly.</li>
          <li>Custom dropdowns may not expose roles and states.</li>
        </ol>
        <p className="mt-4 max-w-[68ch] text-[14px] italic leading-relaxed text-[color:var(--muted)]">
          Note: this was not a full accessibility audit. A complete review would require
          automated testing and screen reader testing with tools such as VoiceOver or NVDA.
        </p>

        <CountTable
          caption="WCAG issue count"
          rows={[
            ["Perceivable", 5],
            ["Operable", 4],
            ["Understandable", 6],
            ["Robust", 4],
          ]}
          total={19}
        />
      </Section>

      {/* 8 · Key Insights */}
      <Section n="07" title="Key Insights">
        <Lead>Four patterns shaped the redesign.</Lead>

        <div className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius)] border border-[color:var(--hairline)] bg-[color:var(--hairline)] sm:grid-cols-2">
          {[
            {
              t: "The flow assumed uninterrupted completion.",
              b: "The signup journey expected users to finish every step in one sitting. That does not match the Nigerian mobile context. A user may lose network, receive a phone call, switch to WhatsApp, or stop because they do not have their BVN or NIN nearby. The redesign needed to make progress visible and reduce surprise.",
            },
            {
              t: "Trust disappeared at the point of highest risk.",
              b: "The marketing experience had trust signals. The authentication flow did not. That matters because the user is asked to share identity information inside the auth flow. This is the moment where trust should increase, not disappear.",
            },
            {
              t: "Mobile needed more than a smaller desktop layout.",
              b: "Some mobile screens carried desktop assumptions: wrong keyboard type for email fields, desktop-style visuals inside mobile onboarding, and interactions that did not fit a mobile-first user. The redesign treated mobile as the main context, not a reduced version of desktop.",
            },
            {
              t: "Validation happened too late or too aggressively.",
              b: "Some inputs were checked after the user had already moved forward. Others showed error styling while the user was still typing. Both patterns create friction. Good validation prevents bad input early, but waits until the right moment to show error feedback.",
            },
          ].map((c, i) => (
            <div key={c.t} className="bg-[color:var(--bg)] p-6">
              <span className="t-meta">{`0${i + 1}`}</span>
              <h3 className="mt-3 text-[1.0625rem] font-semibold leading-snug text-[color:var(--ink)]">
                {c.t}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--muted)]">
                {c.b}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 9 · Design Solutions */}
      <Section n="08" title="Design Solutions">
        <Lead>
          The redesign kept the platform’s visual language and focused on clarity, guidance,
          feedback, and security-adjacent UX. Each change is shown before and after.
        </Lead>

        <H3>9.1 Signup Page</H3>
        <BeforeAfter
          base="signup"
          beforeAlt="Original signup screen with a single email field and an empty right panel"
          afterAlt="Redesigned signup screen with trust badges, a progress indicator, and a preparation card"
        />
        <P>The redesigned signup page gives the user more context before they start.</P>
        <Changed
          items={[
            "Added progress text and progress dots.",
            "Added Google sign-in.",
            "Replaced the empty right panel with trust signals.",
            "Added a preparation card listing the details needed to complete signup.",
            "Fixed heading capitalization.",
          ]}
        />
        <Why>
          The first screen now sets expectations. It tells the user the journey has multiple
          steps and helps them prepare for identity and business verification.
        </Why>

        <H3>9.2 Password Checklist</H3>
        <BeforeAfter
          base="password"
          beforeAlt="Original password field showing requirements as a dense paragraph after an error"
          afterAlt="Redesigned password field with a live five-item requirement checklist"
        />
        <P>The password field now teaches the requirement while the user types.</P>
        <Changed
          items={[
            "Replaced the dense error paragraph with five checklist items.",
            "Showed unmet rules in a neutral state.",
            "Showed completed rules with a check icon.",
            "Added live feedback before submission.",
          ]}
        />
        <Why>The user no longer has to fail before learning the password rules.</Why>

        <H3>9.3 Login Errors</H3>
        <BeforeAfter
          base="login"
          beforeAlt="Original login showing different error messages for wrong email and wrong password"
          afterAlt="Redesigned login using one generic error message for all credential failures"
        />
        <P>The redesigned login error uses one message for all credential failures.</P>
        <Changed
          items={[
            "Replaced separate wrong-email and wrong-password messages with one generic error.",
            "Added a clear forgot password path.",
            "Kept both failure states visually identical.",
          ]}
        />
        <Msg label="Error message" text="“The email or password you entered is incorrect.”" />
        <Why>
          The user gets useful feedback. An attacker does not learn whether an email address
          exists on the platform.
        </Why>

        <H3>9.4 Rate Limiter</H3>
        <BeforeAfter
          base="rate-limit"
          beforeAlt="Original rate-limit state warning the user while the sign-in button stays active"
          afterAlt="Redesigned rate-limit state with a disabled button and a countdown label"
        />
        <P>The redesigned rate limit state makes the warning match the behavior.</P>
        <Changed
          items={[
            "Disabled the sign-in button after too many attempts.",
            "Changed the button label to a countdown.",
            "Added a clear wait time in the message.",
          ]}
        />
        <Msg
          label="Message"
          text="“Too many login attempts. You can try again in 15 minutes.” · Button: “Try again in 15:00”"
        />
        <Why>
          A rate limit must do more than warn. It should clearly block further attempts until
          the waiting period ends.
        </Why>

        <H3>9.5 OTP Error States</H3>
        <BeforeAfter
          base="otp"
          beforeAlt="Original OTP error showing a toast and an inline message at the same time"
          afterAlt="Redesigned OTP flow with one inline error and a separate expired-code state"
        />
        <P>
          The redesigned OTP flow removes competing messages and separates wrong-code from
          expired-code states.
        </P>
        <Changed
          items={[
            "Removed the duplicate toast.",
            "Kept one inline error message near the OTP input.",
            "Added a separate expired-code state.",
            "Added a visible resend path.",
          ]}
        />
        <Msg
          label="Messages"
          text="Wrong code: “That code doesn’t match. Please check and try again.” · Expired: “This code has expired.”"
        />
        <Why>The user sees one error in one place and knows what action to take.</Why>

        <H3>9.6 Dashboard Empty State</H3>
        <BeforeAfter
          base="dashboard"
          beforeAlt="Original empty dashboard with blank charts and no guidance"
          afterAlt="Redesigned dashboard empty state with a setup checklist and a highlighted next action"
        />
        <P>The redesigned dashboard turns an empty state into a next-step guide.</P>
        <Changed
          items={[
            "Added a setup checklist.",
            "Marked completed onboarding steps.",
            "Highlighted the next action.",
            "Added useful text inside the empty chart area.",
          ]}
        />
        <Msg
          label="Chart empty state"
          text="“Your sales data will appear here once you start receiving payments.”"
        />
        <Why>
          The user should not finish onboarding and land in silence. The dashboard should
          guide them toward their first meaningful action.
        </Why>

        <H3>9.7 Identity Verification Error</H3>
        <BeforeAfter
          base="identity"
          beforeAlt="Original identity mismatch shown as a vague toast message"
          afterAlt="Redesigned identity mismatch as an inline amber warning card near the affected fields"
        />
        <P>The redesigned identity mismatch state gives the user a fix path.</P>
        <Changed
          items={[
            "Replaced a vague toast with an inline warning card.",
            "Positioned the message near the affected fields.",
            "Used amber styling instead of red.",
            "Kept the name-change link visible.",
          ]}
        />
        <Msg
          label="Warning message"
          text="“The name on your account doesn’t match the name linked to this BVN. Use the Change link above to update your name, or double-check your BVN number.”"
        />
        <Why>The user needs guidance, not a vague failure message.</Why>
      </Section>

      {/* 10 · Design System */}
      <Section n="09" title="Design System">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="max-w-[64ch] space-y-4">
              <P>
                I extracted a small design system from the existing interface to keep the
                redesign consistent across all 33 screens.
              </P>
              <P>
                The redesign uses the platform’s existing blue action color, neutral
                backgrounds, rounded form fields, soft cards, compact labels, and simple
                fintech layout language.
              </P>
            </div>

            <H4>Design tokens</H4>
            <dl className="mt-3 space-y-1.5 text-[14px] text-[color:var(--muted)]">
              {[
                ["Primary action", "#3581F3"],
                ["Error", "#E53935"],
                ["Toast error", "#FF4B6E"],
                ["Success", "#4CAF50"],
                ["Warning", "#FFA726"],
                ["Text primary", "#1A1A1A"],
                ["Text secondary", "#616161"],
                ["Input height", "48px"],
                ["Button height", "52px"],
                ["Border radius", "8px"],
                ["Spacing base unit", "8px"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 border-b border-[color:var(--hairline)] pb-1.5">
                  <dt>{k}</dt>
                  <dd className="font-[family-name:var(--font-mono)] text-[13px] text-[color:var(--ink)]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <H4>Typography</H4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-[color:var(--muted)]">
              <li>Font family: Inter</li>
              <li>Desktop heading: 32px bold</li>
              <li>Mobile and modal heading: 24px bold</li>
              <li>Body text: 16px</li>
              <li>Labels: 14px semibold</li>
              <li>Error text and checklist text: 13px</li>
              <li>Caption text: 12px</li>
            </ul>

            <H4>Component states included</H4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-[color:var(--muted)]">
              <li>Input default, active, valid, and error</li>
              <li>Button default, disabled, loading, and active</li>
              <li>Toast variants</li>
              <li>Info card and warning card</li>
              <li>Password checklist</li>
              <li>OTP input boxes</li>
              <li>Progress dots</li>
              <li>Trust badges</li>
            </ul>
          </div>

          <div className="lg:pt-1">
            <FrameSlot
              src={`${DIR}/design-system-strip.png`}
              alt="Design system component strip showing input states, buttons, toasts, cards, password checklist, OTP boxes, progress dots, and trust badges"
              ratio="1 / 1"
            />
          </div>
        </div>
      </Section>

      {/* 11 · Outcome */}
      <Section n="10" title="Outcome">
        <Lead>The audit produced a full redesign direction for the authentication experience.</Lead>

        <StatCards
          items={[
            { value: "55", label: "unique issues uncovered" },
            { value: "33", label: "screens redesigned" },
            { value: "4", label: "critical risks addressed" },
            { value: "19", label: "accessibility issues" },
          ]}
        />

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <H4>What the audit uncovered</H4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[color:var(--muted)]">
              <li>55 unique issues</li>
              <li>31 UI audit issues</li>
              <li>26 UX friction points</li>
              <li>44 heuristic findings</li>
              <li>19 accessibility issues</li>
            </ul>
          </div>
          <div>
            <H4>What the redesign delivered</H4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[color:var(--muted)]">
              <li>
                33 redesigned screens across signup, login, password recovery, identity
                verification, and dashboard onboarding.
              </li>
              <li>
                4 critical issues addressed: account enumeration, weak rate-limit behavior,
                backend error leakage, and color-only validation.
              </li>
              <li>
                12 major friction points addressed, including missing progress indicators,
                missing loading states, unclear success feedback, dismissible required steps,
                and an empty post-signup dashboard.
              </li>
              <li>5 accessibility blockers identified for screen reader and keyboard users.</li>
              <li>27 prioritized recommendations across implementation tiers.</li>
            </ul>
          </div>
        </div>

        <H4>Final deliverables</H4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[color:var(--muted)]">
          <li>Full audit report.</li>
          <li>Design system reference.</li>
          <li>Annotated Figma redesigns.</li>
          <li>Prioritized action plan.</li>
        </ul>
      </Section>

      {/* 12 · Reflections */}
      <Section n="11" title="Reflections">
        <div className="max-w-[68ch] space-y-4">
          <P>This project showed me why authentication design needs more than clean screens.</P>
          <P>
            A single review would have missed important issues. The account enumeration risk
            became clear because I looked at the same error messages from a security angle,
            not only a usability angle.
          </P>
          <P>
            Context shaped every recommendation. A mandatory OTP may make sense for a payments
            product, but it also adds friction for a merchant who checks a dashboard several
            times a day on a mobile network. The same feature can protect users and slow them
            down at the same time.
          </P>
          <P>
            I also learned that a strong critique should acknowledge what already works. The
            platform had fast OTP delivery, clear KYC intent, and a strong onboarding stepper.
            Noting those strengths made the recommendations more balanced and useful.
          </P>
        </div>

        <H4>What I would do differently</H4>
        <P>
          I would add screen reader testing with VoiceOver or NVDA. Some accessibility
          findings remain potential issues because I did not test with assistive technology.
        </P>

        <H4>What this project taught me</H4>
        <P>
          Good design is not only how a screen looks. It is how the system behaves, how it
          handles mistakes, how it protects users, and how it helps people recover when
          something goes wrong.
        </P>
      </Section>

      {/* footer: back + contact (no new CTA) */}
      <footer className="mt-20 flex flex-wrap items-baseline justify-between gap-4 border-t border-[color:var(--hairline)] pt-8">
        <Link href="/" className="t-meta transition-colors hover:text-[color:var(--ink)]">
          ← Back to home
        </Link>
        <a
          href={`mailto:${site.email}`}
          className="t-role underline decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
        >
          {site.email}
        </a>
      </footer>
    </main>
    </Lightbox>
  );
}
