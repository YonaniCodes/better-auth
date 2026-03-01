# Software Maintenance Plan for Better Auth (TypeScript Authentication Library)

## 1. Introduction and System Overview

Software maintenance is the set of activities carried out after a software product is delivered, with the aim of keeping it useful, correct, secure, and compatible in a changing environment. In practice, most real systems spend far more time in maintenance than in initial development, which is why a structured maintenance plan matters for both quality and cost control (Pressman & Maxim, 2019; Sommerville, 2020). This document presents a comprehensive maintenance plan for **Better Auth**, an authentication library designed for TypeScript-based applications. Better Auth is used by web systems to manage user identity, session handling, and access control. Because authentication is a security-sensitive function, maintenance must be planned more carefully than in many other software domains (IEEE Computer Society, 2014).

Better Auth can be treated as a maintained software product that sits in the “critical dependency” layer of many applications. When a library like this is updated, a large number of downstream systems can be affected, including production deployments that handle real user accounts and sensitive personal data. The library has gained substantial adoption in the developer community and has been publicly reported as created by **Bereket Engida**; its growth and visibility increase the need for disciplined maintenance practices because defects or vulnerabilities can propagate widely (TechCrunch, 2025). The Better Auth documentation is also a key product artifact, since many user decisions about configuration and safe usage depend on it (Better Auth, 2024).

From a maintenance perspective, Better Auth’s main responsibilities can be summarized as (a) secure authentication flows (credential-based and federated), (b) session management and token handling, (c) authorization support (roles/permissions patterns), (d) integration compatibility across application environments, and (e) extension mechanisms that allow additional features. Each of these areas creates distinct maintenance pressures. For example, federated sign-in tends to be impacted by changes in external identity provider behavior, session management is sensitive to browser and platform changes (e.g., cookie restrictions), and authorization logic can be affected by changes in how applications structure resources and policies (Sommerville, 2020).

This plan is designed to support ongoing corrective, adaptive, preventive, and perfective maintenance. The emphasis is on managing security updates, dependency changes, bug fixes, and compatibility issues, while keeping the library stable for its users (IEEE Computer Society, 2014; Pressman & Maxim, 2019).

## 2. Goals, Scope, and Possible Deviations

### Goals

The primary goal of Better Auth maintenance is to preserve **security** and **correctness** in real-world deployments. Since authentication failures can lead to account compromise or denial of service, the plan prioritizes rapid response to security vulnerabilities, clear communication to users, and safe default behavior where possible (IEEE Computer Society, 2014). A second goal is to protect **compatibility** across supported environments, including TypeScript versions, runtime changes, and common deployment contexts (Sommerville, 2020). A third goal is **reliability and maintainability**, meaning that bug fixes should reduce the chance of regressions, and internal changes should reduce long-term maintenance cost (Pressman & Maxim, 2019).

In addition, the plan aims to maintain a stable public interface and predictable release behavior. For a widely used library, breaking changes are not just an engineering decision; they affect many downstream projects and can lead to fragmented versions in the ecosystem. Therefore, changes that require migration should be controlled, communicated, and supported with clear documentation (IEEE Computer Society, 2014).

### Scope

The scope of maintenance activities includes:

Corrective maintenance covers defect fixes, security vulnerabilities, incorrect behavior, and failures in supported environments (IEEE Computer Society, 2014). In Better Auth, this includes issues like login failures, session invalidation bugs, incorrect permission checks, and mishandling of provider callbacks.

Adaptive maintenance covers updates required due to external changes. For Better Auth, external changes often include dependency security advisories, changes in TypeScript and runtime behavior, browser privacy changes that affect cookies or redirects, and updates in identity provider requirements (Sommerville, 2020; TechCrunch, 2025).

Preventive maintenance focuses on reducing future risk and cost. This includes refactoring risky parts of the codebase, strengthening tests for core authentication flows, improving diagnostics, and reviewing cryptographic and security assumptions periodically (Pressman & Maxim, 2019).

Perfective maintenance includes performance improvements, usability improvements, and documentation improvements that reduce integration effort for users. For authentication libraries, “usability” often means clearer configuration behavior, predictable error handling, and better guidance around safe deployment (Sommerville, 2020).

The scope explicitly excludes major feature expansion that would be classified as new product development. However, small enhancements may still be accepted when they reduce maintenance burden or resolve recurring user issues. Also, this plan does not replace the need for secure coding practices; it focuses specifically on maintenance planning decisions and processes (IEEE Computer Society, 2014).

### Possible Deviations

Maintenance planning for security-sensitive libraries must allow deviations. A critical vulnerability may require immediate patching and an out-of-cycle release. Similarly, an urgent ecosystem change (for example, a browser behavior change that breaks common login flows) may force reprioritization of scheduled work. This plan therefore allows “emergency maintenance mode,” where normal scheduling and scope limits temporarily change to protect users (IEEE Computer Society, 2014).

Another likely deviation is unplanned work caused by transitive dependency vulnerabilities. Even when the library’s own code is correct, an upstream dependency may introduce risk and require quick updates, temporary mitigation, or documentation advisories (Pressman & Maxim, 2019).

## 3. Resource Allocation and Maintenance Scheduling

### Roles and Responsibilities

Because Better Auth is used as a shared library, maintenance must combine engineering work with coordination and communication. The plan assumes the following roles (these may be filled by the same individuals in small teams):

Maintainer/Release Manager: responsible for triage decisions, acceptance of changes, coordination of releases, and communication of breaking changes or security advisories. It is also important to define ownership and accountability for security response; public reporting identifies the project’s origin and leadership, which supports governance clarity (TechCrunch, 2025).

Security Reviewer: responsible for reviewing security-sensitive changes, evaluating reported vulnerabilities, and ensuring that fixes follow secure design principles. For authentication libraries, security review is not optional; even small code changes can create serious risk (IEEE Computer Society, 2014).

Core Developers: implement fixes and updates, update tests, and support compatibility across environments.

Test/Quality Support: maintain test suites and validate changes in a representative environment matrix. For a library, strong regression testing is one of the most practical protections against breaking users’ applications (Pressman & Maxim, 2019).

Documentation Owner: ensures documentation and release notes accurately reflect behavior, especially for security and compatibility changes (Better Auth, 2024; Sommerville, 2020).

### Resource Allocation Model

Maintenance time should not be treated as leftover capacity. For a security-sensitive library, a realistic allocation might be:

Security monitoring and response: continuous, with readiness for urgent work (IEEE Computer Society, 2014).

Corrective maintenance: addressing bugs reported by users or found in internal testing (Pressman & Maxim, 2019).

Adaptive maintenance: dependency updates, environment compatibility updates, and alignment with ecosystem changes (Sommerville, 2020).

Preventive maintenance: refactoring and test improvements that reduce future risk (Pressman & Maxim, 2019).

Documentation and communication: release notes, migration notes, and security advisories (Better Auth, 2024).

The exact percentage varies, but a practical approach is to “reserve” time for security and urgent fixes while using a predictable cycle for other maintenance tasks. This aligns with standards that emphasize structured processes for request handling and planning, rather than purely reactive work (IEEE Computer Society, 2014).

### Maintenance Scheduling

The plan recommends two parallel schedules:

1. **Regular maintenance releases**: For example, monthly or every 4–6 weeks, where non-critical fixes, dependency updates, and compatibility improvements are bundled. Predictability helps downstream teams plan upgrades (Sommerville, 2020).

2. **Emergency patch releases**: Released as needed, primarily for critical security issues or severe production-breaking defects. Emergency releases should be smaller, well-documented, and should include a clear “what changed and why” summary to minimize adoption hesitation (IEEE Computer Society, 2014).

In addition to release cadence, a maintenance calendar should include scheduled activities such as dependency audits, periodic security review checkpoints, and test suite health reviews. This supports long-term sustainability and avoids “software aging,” where systems become harder to change safely over time (Parnas, 1994).

## 4. Problem Identification, Classification, and Prioritization

### Problem Identification Sources

Problems in Better Auth will typically be identified through:

User issue reports and bug reports, which often highlight integration failures across specific environments or unusual edge cases.

Security disclosures and advisories, including reports from users and public vulnerability databases.

Dependency alerts for vulnerabilities, deprecations, or major version changes (Pressman & Maxim, 2019).

Regression test failures and continuous integration results.

Operational feedback from maintainers and community discussions, which can surface repeated pain points (Better Auth, 2024).

### Classification

To avoid inconsistent triage, issues should be classified along two dimensions: type and severity.

Type categories suitable for authentication libraries include:

Security vulnerability: anything that could permit unauthorized access, data exposure, privilege escalation, token leakage, or bypass of authentication/authorization controls (IEEE Computer Society, 2014).

Correctness defect: behavior that contradicts documented or intended outcomes, such as incorrect session state or incorrect permission evaluation.

Compatibility defect: failures caused by environmental change, such as runtime changes, TypeScript changes, or browser changes affecting cookies and redirects (Sommerville, 2020).

Performance/reliability issue: unexpected resource use, concurrency issues, race conditions, or fragile behaviors that reduce system stability.

Documentation defect: misleading or missing documentation that causes misconfiguration or unsafe deployments (Better Auth, 2024).

Severity levels can follow a practical four-tier model:

Critical: active exploitation risk, authentication bypass, sensitive token leakage, or widespread breaking behavior with no reasonable workaround.

High: security weakness with plausible exploitation, major feature broken, or high-frequency user impact.

Medium: non-critical bug, limited scope, or a workaround exists.

Low: minor issues, clarity improvements, or enhancements that do not affect safety.

### Prioritization Approach (with realistic scenarios)

For an authentication library, prioritization should be conservative. A vulnerability that could enable unauthorized access must take precedence even if it affects only a subset of users, because the risk is severe (IEEE Computer Society, 2014).

Scenario A (critical security): A report indicates a path where a session token might be accepted without correct origin or integrity checks under certain configurations. Even if the bug is rare, it must be treated as urgent because the consequence is account takeover. This should trigger emergency maintenance mode: assign a security reviewer, reproduce the issue, implement a minimal safe fix, ship a patch release, and publish a security advisory with clear upgrade guidance (IEEE Computer Society, 2014).

Scenario B (compatibility break): A platform update changes cookie handling, causing silent sign-in failures for some users. This is not necessarily a “security vulnerability,” but it can cause widespread service disruption. In this case, the prioritization depends on impact: if many users are blocked, it may warrant an out-of-cycle release (Sommerville, 2020).

Scenario C (dependency vulnerability): A cryptographic or request-handling dependency reports a vulnerability. Even if Better Auth code is unchanged, users may still be exposed through transitive dependencies. The response is to assess exploitability in Better Auth usage, update dependencies, and document mitigation steps if immediate upgrade is not possible (Pressman & Maxim, 2019).

## 5. Maintenance Testing Strategies (Confirmation and Regression Testing)

Testing in maintenance is not just about correctness; it is a safety mechanism to prevent regressions and reduce risk for downstream users (Pressman & Maxim, 2019). For Better Auth, testing must focus on core authentication flows, session behavior, and security-related invariants.

### Confirmation Testing

For every accepted bug fix or security fix, confirmation testing should validate that the reported defect no longer occurs. The plan requires each fix to include:

1. A reproducible description of the defect conditions.
2. A confirmation test that fails before the fix and passes after it.
3. A brief note describing why the test is sufficient, especially for security fixes (IEEE Computer Society, 2014).

In authentication libraries, confirmation tests must address negative scenarios as well: invalid credentials, invalid tokens, expired sessions, tampered callbacks, and incorrect origins. These tests support assurance that the system fails safely rather than unpredictably (Sommerville, 2020).

### Regression Testing

Regression testing ensures that a fix does not break existing features. Better Auth’s maintenance plan requires a regression suite covering:

Authentication flows: sign-in, sign-up, sign-out, password reset, email verification.

Session management: session creation, refresh behavior, revocation behavior, multi-session handling, and logout behavior.

Authorization boundaries: access checks, role/permission logic, and denial cases.

Federated identity behavior: provider callback handling, token exchange, and profile mapping behavior.

Edge conditions: expired tokens, replay attempts, and misconfiguration detection.

Given the variety of supported environments, regression testing should run against a small matrix of representative configurations. Even if full environment coverage is difficult, a risk-based matrix is better than no matrix at all (Pressman & Maxim, 2019). The key idea is to test “what is most likely to break” and “what would be most damaging if it breaks” (IEEE Computer Society, 2014).

### Security-Oriented Testing and Review

Authentication libraries deserve additional security validation. This plan recommends periodic security-focused reviews that include:

Review of token and cookie handling assumptions, including changes in browser privacy behavior.

Review of cryptographic usage assumptions, ensuring algorithms and parameters remain appropriate.

Review of input validation boundaries for endpoints and callbacks.

These reviews are part of preventive maintenance and reduce the chance of “software aging” in security logic, where old assumptions become unsafe as the environment changes (Parnas, 1994).

## 6. Configuration and Version Management

### Configuration Management

Configuration management is essential for controlling change, enabling reliable releases, and supporting rollback when needed. A maintenance plan should define:

Change control practices: how changes are proposed, reviewed, and merged.

Baseline and release tagging: each release must correspond to a clear baseline state of code and documentation.

Dependency and build reproducibility: dependency updates must be tracked and auditable (IEEE Computer Society, 2014).

For Better Auth, configuration management must include documentation artifacts as well as code. Documentation updates are not optional because many integration errors are effectively configuration errors caused by misunderstanding; good documentation reduces support burden and reduces unsafe deployments (Better Auth, 2024; Sommerville, 2020).

### Versioning Strategy

Semantic versioning is recommended to communicate change impact:

Patch releases: security patches and bug fixes that do not change public interfaces.

Minor releases: backward-compatible improvements, new options, or additional supported environment compatibility.

Major releases: breaking changes, deprecations that become removals, or major behavior changes that require migration steps (Pressman & Maxim, 2019).

For authentication libraries, conservative interpretation of “breaking change” is recommended. A behavior change that alters security defaults, cookie behavior, token handling, or callback behavior may break real systems even if the API looks similar. Such changes should be treated as major or, at minimum, clearly documented with migration guidance (IEEE Computer Society, 2014).

### Deprecation and Backward Compatibility

Deprecation should be treated as a maintenance tool. The plan recommends:

Announcing deprecations in release notes.

Supporting deprecated behavior for at least one minor release cycle (or longer if adoption is high).

Providing a migration path and examples in documentation (Better Auth, 2024).

This aligns with practical maintenance advice that emphasizes gradual evolution rather than disruptive rewrites, which are risky and often fail to deliver promised benefits (Sommerville, 2020; Lehman, 1980).

## 7. Reporting and Documentation Requirements

### Reporting Requirements

Maintenance work should be visible and accountable. The plan recommends:

Release notes for each release, summarizing changes, fixes, and any security updates.

Security advisories for security-related issues, describing severity, affected versions, mitigation steps, and patch versions.

Issue triage summaries (periodic), reporting the number and type of open issues and expected timelines for high-priority items.

These practices support systematic maintenance and reduce confusion among users who depend on the library’s stability (IEEE Computer Society, 2014; Pressman & Maxim, 2019).

### Documentation Requirements

Documentation is part of the product, especially for a security library. Documentation should be updated whenever maintenance changes behavior, defaults, or compatibility assumptions. Required documentation artifacts include:

User-facing docs describing safe configuration and typical deployment expectations, maintained in alignment with releases (Better Auth, 2024).

Changelog entries for every release, including breaking changes and deprecations.

Security guidance notes, including best practices for secret management, cookie behavior assumptions, and secure deployment considerations (IEEE Computer Society, 2014).

Migration notes for any changes that could break users, even if changes are “small” technically.

The plan also recommends an internal maintenance log recording rationale for important decisions, such as why a security default was changed or why certain compatibility behaviors were introduced. This improves maintainability and supports future reviewers, especially as the project grows (Sommerville, 2020).

## 8. Conclusion

Better Auth, as an authentication library in the TypeScript ecosystem, requires a strict and structured maintenance approach because it sits at the center of security and user identity in many applications. This plan defines maintenance goals, scope, scheduling, triage, testing strategies, configuration and version management, and documentation expectations. The overall principle is to treat maintenance as the dominant lifecycle activity for a widely used software product, where stability, security, and predictable evolution matter more than rapid change (Pressman & Maxim, 2019; Sommerville, 2020).

The plan also recognizes that software evolves continuously, and that maintenance must adapt to changing environments, dependency ecosystems, and new security expectations. By using systematic triage, conservative release management, confirmation and regression testing, and disciplined documentation, Better Auth can remain reliable and safe for downstream users over time (IEEE Computer Society, 2014; Lehman, 1980). Given the library’s adoption and visibility, maintenance quality is not only a technical concern but also a responsibility to the broader developer community that depends on it (TechCrunch, 2025).

## References

Bennett, K. H., & Rajlich, V. T. (2000). Software maintenance and evolution: A roadmap. In *Proceedings of the Conference on the Future of Software Engineering* (pp. 73–87). ACM.

Better Auth. (2024). *Better Auth documentation*. https://better-auth.com/docs

IEEE Computer Society. (2014). *IEEE Standard for Software Maintenance* (IEEE Std 14764-2014). IEEE.

Lehman, M. M. (1980). Programs, life cycles, and laws of software evolution. *Proceedings of the IEEE, 68*(9), 1060–1076.

Parnas, D. L. (1994). Software aging. In *Proceedings of the 16th International Conference on Software Engineering* (pp. 279–287). IEEE Computer Society Press.

Pressman, R. S., & Maxim, B. R. (2019). *Software engineering: A practitioner’s approach* (9th ed.). McGraw-Hill Education.

Sommerville, I. (2020). *Software engineering* (10th ed.). Pearson.

TechCrunch. (2025, June 25). *Better Auth, an authentication tool by a self-taught Ethiopian dev, raises $5M from Peak XV, YC*. TechCrunch. https://techcrunch.com/2025/06/25/this-self-taught-ethiopian-dev-built-an-authentication-tool-and-got-into-yc/


