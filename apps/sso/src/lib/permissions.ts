/**
 * Organization Access Control & Custom Roles
 *
 * Defines 10 roles with a hierarchy for the organization plugin.
 * Client-safe — no server secrets, importable from both auth.ts and auth-client.ts.
 *
 * Hierarchy:
 *   owner (10) > admin (9) > manager (8) > supervisor (7) > examiner (6) >
 *   teacher (5) > coordinator (4) > proctor (3) > editor (2) > member (1)
 */

import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
  memberAc,
  ownerAc,
} from "better-auth/plugins/organization/access";

// ── Statements ──────────────────────────────────────────────────────────
// Extend Better Auth's default org/member/invitation statements with
// domain-specific resources.

const statement = {
  ...defaultStatements,
  content: ["read", "create", "update", "delete"],
  assessment: ["read", "create", "update", "grade"],
} as const;

export const ac = createAccessControl(statement);

// ── Roles ───────────────────────────────────────────────────────────────

export const owner = ac.newRole({
  ...ownerAc.statements,
  content: ["read", "create", "update", "delete"],
  assessment: ["read", "create", "update", "grade"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
  content: ["read", "create", "update", "delete"],
  assessment: ["read", "create", "update", "grade"],
});

export const manager = ac.newRole({
  ...adminAc.statements,
  content: ["read"],
  assessment: ["read"],
});

export const supervisor = ac.newRole({
  ...adminAc.statements,
  content: ["read", "create", "update"],
  assessment: ["read", "create", "update", "grade"],
});

export const examiner = ac.newRole({
  content: ["read"],
  assessment: ["read", "create", "update", "grade"],
});

export const teacher = ac.newRole({
  content: ["read"],
  assessment: ["read"],
});

export const coordinator = ac.newRole({
  ...memberAc.statements,
  content: ["read"],
  assessment: ["read", "create", "update"],
});

export const proctor = ac.newRole({
  content: ["read"],
  assessment: ["read", "create", "update", "grade"],
});

export const editor = ac.newRole({
  content: ["read", "create", "update", "delete"],
  assessment: ["read"],
});

export const member = ac.newRole({
  ...memberAc.statements,
  content: ["read"],
  assessment: ["read"],
});
