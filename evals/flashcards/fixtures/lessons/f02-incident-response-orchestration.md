# Incident Response Orchestration for Agents

An incident response agent should separate detection, triage, containment, and recovery.

- **Detection** asks: did something abnormal happen?
- **Triage** asks: how severe is it and who is affected?
- **Containment** asks: how do we stop blast radius now?
- **Recovery** asks: how do we restore service safely?

A common mistake is skipping triage and jumping directly to containment. That can hide the root cause and trigger repeated incidents.

Another mistake is choosing only one metric for severity. Good triage uses three dimensions:

1. User impact (how many users blocked)
2. Data risk (integrity or confidentiality risk)
3. Time sensitivity (how long before harm escalates)

Containment should prefer reversible actions first, such as feature flag rollback, traffic shift, or read-only mode. Irreversible actions, such as data deletion, require explicit human approval.

Recovery is not complete when dashboards look green. Recovery is complete when guardrail tests pass and a post-incident timeline explains cause, trigger, and prevention changes.
