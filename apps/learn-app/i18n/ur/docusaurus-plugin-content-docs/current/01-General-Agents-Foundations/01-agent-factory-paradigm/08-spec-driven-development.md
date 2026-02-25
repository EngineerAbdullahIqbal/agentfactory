---
sidebar_position: 8
title: "اسپیک سے چلنے والی ڈویلپمنٹ"
chapter: 1
lesson: 8
duration_minutes: 30

# HIDDEN SKILLS METADATA
skills:
  - name: "Writing Clear Specifications"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "طالب علم ارادے، کامیابی کے معیار، پابندیوں، اور قبولیت کے معیار کے ساتھ مکمل تفصیلات لکھ سکتا ہے"

  - name: "Evaluating Specification Quality"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Analyze"
    digcomp_area: "Critical Thinking"
    measurable_at_this_level: "طالب علم یہ جانچ سکتا ہے کہ آیا تفصیلات میں AI نفاذ کے لیے کافی تفصیل موجود ہے اور غائب عناصر کی نشاندہی کر سکتا ہے"

  - name: "Applying SDD Workflow"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Project Management"
    measurable_at_this_level: "طالب علم کسی فیچر کے لیے چھ مراحل کے SDD ورک فلو (تفصیل، وضاحت، منصوبہ، کام، نفاذ، تصدیق) کو انجام دے سکتا ہے"

learning_objectives:
  - objective: "Write a complete specification with intent, success criteria, constraints, and acceptance criteria"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Specification document includes all required elements and passes quality checklist"

  - objective: "Evaluate when to use Spec-Driven Development vs traditional coding approaches"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Decision framework applied to 3 project scenarios with justification"

  - objective: "Execute the six-phase SDD workflow from specification to validation"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Complete workflow executed for a feature with artifacts from each phase"

# Cognitive load tracking
cognitive_load:
  new_concepts: 6
  assessment: "6 تصورات (تفصیلات کی معیار، SDD بمقابلہ Vibe Coding، چھ مرحلے کا ورک فلو، تصدیقی طریقے، فیصلہ سازی کا فریم ورک، کوالٹی گیٹس) A2-B1 حد 7-9 کے اندر ✓"

# Differentiation guidance
differentiation:
  extension_for_advanced: "تحقیق کریں کہ SDD ٹیم ماحول میں کیسے پھیلتا ہے؛ پیچیدہ سسٹمز کے لیے تفصیلاتی ٹیمپلیٹس دریافت کریں (مائیکرو سروسز، ایونٹ ڈریون آرکیٹیکچر)"
  remedial_for_struggling: "تفصیلات کی معیار کی چیک لسٹ پر توجہ دیں؛ پیچیدہ ورک فلوز کو آزمانے سے پہلے سادہ فیچرز کے لیے تفصیلات لکھنے کی مشق کریں"

teaching_guide:
  lesson_type: "بنیادی"
  session_group: 4
  session_title: "SDD، Synthesis، اور Enterprise Sales"
  key_points:
    - "The Core Equation is the lesson's thesis: 'Vague Idea + AI = 5+ iterations' vs 'Clear Specification + AI = 1-2 iterations' — this single insight justifies the entire SDD methodology"
    - "The six-phase workflow (Specify→Clarify→Plan→Tasks→Implement→Validate) is the exact process students will use throughout the rest of the book"
    - "SDD vs Vibe Coding is NOT 'SDD always wins' — the decision framework shows when each approach is appropriate (exploration vs production)"
    - "The four qualities of good specifications (clarity, completeness, constraints, testability) serve as a checklist students should internalize"
  misconceptions:
    - "Students think SDD means 'write a long document before coding' — SDD specs are precise and concise, not verbose PRDs"
    - "Students assume SDD eliminates all iteration — 1-2 refinement cycles are still expected, but they're refinement within bounds, not discovery from scratch"
    - "Students think Non-Goals are negative — Non-Goals prevent scope creep and are as important as goals for keeping AI focused"
    - "Students confuse the Clarify phase with asking the AI questions — Clarify is about YOU identifying what's ambiguous before the AI starts implementing"
  discussion_prompts:
    - "Think of a recent project where you discovered a requirement late — what would the specification have looked like if you'd written it upfront?"
    - "The lesson says 'Your primary skill is no longer writing code — it's writing specifications.' Do you agree or disagree, and why?"
    - "When is Vibe Coding actually the RIGHT approach — and how do you know when to switch to SDD?"
  teaching_tips:
    - "Start with the Developer A vs Developer B comparison — it's the most compelling argument for SDD because both developers are skilled, the difference is process"
    - "Walk through the User Registration specification example in full — it's concrete enough that students can see exactly what a good spec looks like"
    - "The 'Without SDD vs With SDD' code conversation comparison is a live demo opportunity — show both approaches with the same AI tool"
    - "Spend time on the four Common Mistakes — students will make all of them, so calling them out explicitly now saves time later"
  assessment_quick_check:
    - "Ask students to name the six phases of SDD in order"
    - "Have students evaluate this success criterion: 'Make it fast' — what's wrong with it and how would they fix it?"
    - "Ask: 'When should you skip SDD entirely?' — tests understanding of the decision framework (learning experiments, trivial changes)"

# Generation metadata
generated_by: "content-implementer v3.0.0 (Part 1 consolidation)"
source_spec: "Part 1 consolidation - Ch1-L07"
created: "2025-01-22"
version: "1.0.0"

# Legacy compatibility (Docusaurus)
prerequisites:
  - "Understanding of basic software development concepts"
  - "Familiarity with AI coding assistants (helpful but not required)"
---

# اسپیک سے چلنے والی ڈویلپمنٹ

دو ڈویلپرز کا تصور کریں جو اسی دن ایک ہی پروجیکٹ شروع کر رہے ہیں۔

**ڈویلپر A** اپنا IDE کھولتا ہے اور کوڈنگ شروع کرتا ہے۔ وہ صارف کی تصدیق کا نظام بناتے ہیں، جیسے جیسے فیچرز کا خیال آتا ہے انہیں شامل کرتے ہیں۔ دو ہفتے بعد، انہیں احساس ہوتا ہے کہ وہ پاس ورڈ ری سیٹ کی فعالیت بھول گئے۔ وہ refactor کرتے ہیں۔ پھر انہیں معلوم ہوتا ہے کہ session handling موبائل پر کام نہیں کرتی۔ وہ دوبارہ refactor کرتے ہیں۔ ہر دریافت کا مطلب کوڈ کو دوبارہ لکھنا ہے۔ تین مہینے بعد، وہ ابھی تک edge cases کو debug کر رہے ہیں۔

**ڈویلپر B** پہلے دن تفصیلات لکھنے میں گزارتے ہیں۔ وہ بالکل واضح کرتے ہیں کہ ان کے سیاق و سباق میں authentication کا کیا مطلب ہے: کون سی security requirements اہم ہیں، کون سے edge cases موجود ہیں، کامیابی کیسی دکھتی ہے۔ وہ ایک لائن کوڈ لکھنے سے پہلے ambiguities کو واضح کرتے ہیں۔ پھر وہ وہ تفصیلات AI agent کو سونپ دیتے ہیں۔ دو ہفتے بعد، ان کے پاس مکمل، ٹیسٹ شدہ نفاذ موجود ہے۔ وہ دوسرے اور تیسرے مہینے فیچرز بنانے میں گزارتے ہیں، bugs ٹھیک کرنے میں نہیں۔

دونوں ڈویلپرز ہنر مند ہیں۔ دونوں نے محنت کی۔ لیکن ڈویلپر B نے **Spec-Driven Development (SDD)** کی مشق کی—یہ ایک طریقہ کار ہے جو نفاذ سے پہلے واضح سوچ کو ترجیح دیتا ہے۔

فرق کوڈنگ کی صلاحیت نہیں ہے۔ یہ عمل ہے۔

## Spec-Driven Development کیا ہے؟

**Spec-Driven Development (SDD)** ایک طریقہ کار ہے جہاں آپ کوڈ لکھنے سے پہلے مکمل تفصیلات لکھتے ہیں۔ AI agents پھر ان تفصیلات کے مطابق نفاذ کرتے ہیں جبکہ آپ design، architecture، اور validation پر توجہ مرکوز کرتے ہیں۔

یہ حقیقت کے بعد لکھی گئی دستاویز نہیں ہے۔ یہ مبہم product requirements document نہیں ہے۔ یہ ایک درست تفصیلات ہے جو نفاذ کے لیے سچائی کا ماخذ کے طور پر کام کرتی ہے۔

### بنیادی مساوات

```
Vague Idea + AI = 5+ iterations of misalignment
Clear Specification + AI = 1-2 iterations of refinement
```

جب آپ AI کو واضح تفصیلات فراہم کرتے ہیں، آپ اندازے کو ختم کر دیتے ہیں۔ آپ اسے بالکل بتاتے ہیں کہ کیا بنانا ہے، یہ کیوں اہم ہے، کون سی پابندیاں موجود ہیں، اور کامیابی کیسی دکھتی ہے۔ AI پھر درست طریقے سے عمل درآمد کر سکتا ہے۔

جب آپ ایک مبہم خیال فراہم کرتے ہیں، AI کو اندازہ لگانا پڑتا ہے۔ ہر اندازہ غلط فہمی کا موقع ہے۔ پانچ iterations کے بعد، آپ نے گھنٹوں ضائع کر دیے ہیں ان چیزوں کو ٹھیک کرنے میں جو آپ پہلے سے تفصیل میں بیان کر سکتے تھے۔

### اب SDD کیوں اہم ہے

بیس سال پہلے SDD عملی نہیں تھا۔ تفصیلات لکھنے میں اتنا ہی وقت لگتا تھا جتنا کوڈ لکھنے میں۔ لیکن AI مساوات کو بدل دیتا ہے:

- **AI کوڈ انسانوں کے لکھنے سے تیزی سے تیار کرتا ہے**—اگر requirements واضح ہوں
- **AI نفاذ کی تفصیلات کو سنبھالتا ہے**—syntax، libraries، frameworks
- **آپ ان چیزوں پر توجہ مرکوز کرتے ہیں جو انسان بہترین کرتے ہیں**—design، architecture، business logic

رکاوٹ نفاذ سے تفصیلات کی طرف منتقل ہو گئی ہے۔ آپ کی بنیادی مہارت اب کوڈ لکھنا نہیں ہے—یہ AI نفاذ کی رہنمائی کرنے والی تفصیلات لکھنا ہے۔

## SDD ورک فلو: چھ مراحل

SDD خیال سے لے کر تصدیق شدہ نفاذ تک ایک منظم ورک فلو فراہم کرتا ہے۔ ہر مرحلہ اگلے مرحلے کے شروع ہونے سے پہلے ambiguity کو ختم کرتا ہے۔

### مرحلہ 1: تفصیل (کیا ہے اس کی تعریف)

**سوال**: ہم کیا بنا رہے ہیں اور یہ کیوں اہم ہے؟

**آؤٹ پٹ**: چار عناصر کے ساتھ تفصیلاتی دستاویز:

1. **ارادہ**: یہ فیچر کیوں موجود ہے؟ یہ کون سا صارف کا مسئلہ حل کرتا ہے؟
2. **کامیابی کا معیار**: درست نفاذ کیسا دکھتا ہے؟ ہم کامیابی کی پیمائش کیسے کرتے ہیں؟
3. **پابندیاں**: کون سی حدیں موجود ہیں؟ Performance، security، compliance، scale، technical پابندیاں
4. **Non-Goals**: ہم واضح طور پر کیا نہیں بنا رہے؟ (scope creep کو روکتا ہے)

**مثال کی تفصیلات**:
```markdown
## User Registration System

**Intent**: Enable new users to create accounts securely while preventing fraud and abuse

**Success Criteria**:
- Accepts email (valid format) and password (8+ chars, 1 uppercase, 1 number)
- Prevents duplicate emails with clear error message
- Returns user-friendly errors, never technical details
- Limits registration attempts: 5 per hour per IP
- Hashes passwords with bcrypt (cost factor 12)
- Sends verification email within 30 seconds

**Constraints**:
- Response time < 200ms (excluding email delivery)
- Support 10,000 simultaneous registrations
- GDPR compliant (no unnecessary data retention)
- Must work offline for 30 days (PWA support)

**Non-Goals**:
- Social login (Google, GitHub)—Phase 2
- Phone number verification—out of scope
- Profile completion wizard—separate feature
```

### مرحلہ 2: وضاحت (Ambiguity کو ختم کریں)

**سوال**: کیا کم تفصیل یا مبہم ہے؟

**آؤٹ پٹ**: وضاحتی سوالات کی فہرست جن کے جوابات واپس تفصیلات میں شامل کیے گئے ہیں۔

منصوبہ بندی سے پہلے، آپ کو یہ معلوم کرنا ہوگا کہ آپ کیا نہیں جانتے۔ عام ambiguities:

- **Edge cases**: جب email service بند ہو تو کیا ہوتا ہے؟ جب صارف پاس ورڈ میں emoji درج کرتا ہے؟
- **Integration points**: کیا یہ موجودہ user database سے جڑتا ہے؟ نیا بنائیں؟
- **Error handling**: "email already registered" بمقابلہ "invalid email format" کے لیے کیا error message؟
- **Business logic**: کیا صارفین ایک ہی email سے متعدد اکاؤنٹس رجسٹر کر سکتے ہیں؟ Trial period؟

**مثال کی وضاحت**:
```markdown
## Clarification Questions

Q: What happens when email service is slow or down?
A: Queue verification emails locally, retry with exponential backoff. Allow user to proceed with limited functionality (read-only) until verified.

Q: Can users register with +alias email addresses (user+alias@gmail.com)?
A: Yes—treat as unique email. Don't strip aliases before storage.

Q: What happens if user tries to register with existing email?
A: Return error: "An account with this email already exists. Did you mean to sign in?" with link to login page.
```

### مرحلہ 3: منصوبہ (کیسے کی design)

**سوال**: ہم اسے بنانے کا کیہ طریقہ اپنائیں گے؟

**آؤٹ پٹ**: ایک منصوبہ جو architecture، dependencies، testing strategy، اور tradeoffs کو ظاہر کرتا ہے۔

**مثال کا منصوبہ**:
```markdown
## Implementation Plan

**Architecture**:
- API endpoint: POST /api/auth/register
- Validation layer: express-validator
- Password hashing: bcrypt
- Email service: AWS SES (with fallback queue)
- Database: PostgreSQL (users table)

**Dependency Sequence**:
1. Database schema (users table with indexes)
2. Validation layer (email format, password strength)
3. Password hashing utility
4. Email service integration
5. API endpoint controller
6. Error handling middleware

**Testing Strategy**:
- Unit tests: validation logic, password hashing
- Integration tests: API endpoint responses
- Edge case tests: duplicate email, invalid format, rate limiting
- Load tests: 10,000 concurrent registrations

**Tradeoffs**:
- Chose PostgreSQL over MongoDB: relational data, ACID requirements for user accounts
- Chose bcrypt over Argon2: wider library support, sufficient security for cost factor 12
- Chose AWS SES over SendGrid: existing AWS contract, cost-effective at scale
```

### مرحلہ 4: کام (کام کو تقسیم کریں)

**سوال**: ٹھوس کام کے آئٹمز کیا ہیں؟

**آؤٹ پٹ**: dependencies اور acceptance criteria کے ساتھ ٹاسک کی فہرست۔

**مثال کے کام**:
```markdown
## Task Breakdown

1. [ ] Create users table migration
   - Columns: id, email (unique), password_hash, created_at, verified_at
   - Indexes: email (unique), created_at
   - Acceptance: Migration runs successfully, schema validated

2. [ ] Implement email validation utility
   - Regex validation for format
   - International domain support
   - Acceptance: Test suite passes 20+ test cases

3. [ ] Implement password hashing utility
   - bcrypt with cost factor 12
   - Error handling for invalid inputs
   - Acceptance: Hashes verify correctly, timing > 100ms (prevents fast attacks)

4. [ ] Create registration API endpoint
   - Validate input, hash password, create user record
   - Acceptance: Integration tests pass, returns 201 on success

5. [ ] Integrate email verification
   - Generate verification token, send via AWS SES
   - Acceptance: Email sent within 30s, token verifies correctly

6. [ ] Add rate limiting middleware
   - 5 registrations per hour per IP
   - Acceptance: Rate limit enforced, returns 429 status
```

### مرحلہ 5: نفاذ (AI عمل درآمد کرتا ہے)

**سوال**: ہم منصوبے کو کیسے انجام دیتے ہیں؟

**آؤٹ پٹ**: کام کرنے والا کوڈ جو تفصیلات سے مطابقت رکھتا ہے اور acceptance criteria پاس کرتا ہے۔

**نفاذ کی حکمت عملی**:
- AI کو تفصیلات، منصوبہ، اور کام فراہم کریں
- commit کرنے سے پہلے کوڈ کا جائزہ لیں (human-in-the-loop)
- ٹیسٹ چلائیں اور کامیابی کے معیار کے خلاف تصدیق کریں
- صرف تب iterate کریں جب نفاذ spec سے مطابقت نہ رکھتا ہو

**مثال کا Prompt**:
```
Implement the user registration system according to this specification:

[PASTE SPEC]

Follow this implementation plan:

[PASTE PLAN]

Execute these tasks in order:

[PASTE TASKS]

After each task, show me the code and ask for approval before proceeding.
```

### مرحلہ 6: تصدیق (کوالٹی کی توثیق)

**سوال**: کیا ہم نے وہی بنایا جو ہم نے تفصیل میں بیان کیا؟

**آؤٹ پٹ**: تصدیقی رپورٹ جو تصدیق کرتی ہے کہ نفاذ تفصیلات سے مطابقت رکھتا ہے۔

**تصدیقی چیک لسٹ**:
- [ ] تمام کامیابی کے معیار پورے ہوئے
- [ ] تمام پابندیاں پوری ہوئیں (performance، security)
- [ ] تمام edge cases ٹیسٹ ہوئے
- [ ] کوڈ پروجیکٹ کے patterns کی پیروی کرتا ہے
- [ ] ٹیسٹ پاس ہوئے (unit، integration، edge cases)
- [ ] دستاویزات اپ ڈیٹ ہوئیں

**مثال کی تصدیق**:
```markdown
## Validation Report

✓ Success Criteria Met:
- Email validation: 25 test cases pass
- Password requirements enforced (8+ chars, uppercase, number)
- Duplicate emails rejected with clear error
- User-friendly error messages (no stack traces)
- Rate limiting: 5 attempts/hour per IP enforced
- Password hashing: bcrypt cost factor 12 verified
- Email delivery: < 30s in 99% of cases

✓ Constraints Satisfied:
- Response time: 150ms average (within 200ms limit)
- Load test: 10,000 concurrent registrations handled
- GDPR: No unnecessary data stored, retention policy defined
- Offline support: PWA caches credentials for 30 days

✓ Edge Cases Covered:
- Email service down: Queued and retried successfully
- Emoji in password: Accepted correctly
- +alias email addresses: Treated as unique
- SQL injection attempts: Sanitized by ORM
- Concurrent duplicate registration: Race condition handled

✓ Quality Gates Passed:
- Code review approved
- Test coverage: 94%
- Security audit: No critical issues
- Performance benchmarks met
```

## اچھی تفصیلات کو کیا بناتا ہے؟

اچھی تفصیلات میں چار خصوصیات ہوتی ہیں: clarity، completeness، constraints، اور testability۔

### 1. Clarity: کوئی Ambiguity نہیں

خراب: "ایک رجسٹریشن سسٹم بنائیں"
اچھا: "ایک صارف رجسٹریشن سسٹم بنائیں جس میں email verification، password requirements، اور rate limiting ہو... [مختصر]

خراب: "اسے تیز بنائیں"
اچھا: "درخواستوں کے 95th percentile کے لیے response time < 200ms"

خراب: "errors کو اچھی طرح ہینڈل کریں"
اچھا: "صارف دوست error messages واپس کریں، کبھی stack traces نہیں۔ debugging کے لیے errors کو log کریں۔"

### 2. Completeness: تمام منظرناموں کا احاطہ کریں

completeness کو یقینی بنانے کے لیے اس چیک لسٹ کا استعمال کریں:

**Functional Requirements**:
- [ ] تمام inputs کیا ہیں؟ (data types، formats، validation)
- [ ] تمام outputs کیا ہیں؟ (success responses، error cases)
- [ ] تمام edge cases کیا ہیں؟ (null، empty، invalid، unexpected)
- [ ] تمام states کیا ہیں؟ (initial، processing، success، failure)

**Non-Functional Requirements**:
- [ ] Performance: Response time، throughput، concurrent users
- [ ] Security: Authentication، authorization، encryption، rate limiting
- [ ] Compliance: GDPR، HIPAA، SOC2، industry regulations
- [ ] Scalability: متوقع load، growth projections، caching strategy

**Integration Requirements**:
- [ ] یہ کون سی external services سے جڑتا ہے؟ (databases، APIs، third-party services)
- [ ] جب وہ services سست یا دستیاب نہ ہوں تو کیا ہوتا ہے؟
- [ ] ہم کون سے data formats استعمال کرتے ہیں؟ (JSON، protobuf، CSV)
- [ ] ہمیں کون سی authentication کی ضرورت ہے؟ (API keys، OAuth، tokens)

### 3. Constraints: حدود کی تعریف کریں

Constraints "بس یہ فیچر شامل کریں" scope creep کو روکتے ہیں۔ واضح طور پر بیان کریں:

**Technical Constraints**:
- Python 3.11+ استعمال کرنا ہوگا (company standard)
- PostgreSQL اور MySQL کو سپورٹ کرنا ہوگا (customer requirement)
- 30 دنوں تک offline کام کرنا ہوگا (PWA requirement)

**Business Constraints**:
- Q2 تک launch ہونا چاہیے (marketing deadline)
- بجٹ: cloud services کے لیے $500/مہینہ
- منظور شدہ فہرست سے باہر کوئی external dependencies نہیں

**Design Constraints**:
- موجودہ design system کی پیروی کرنی ہوگی
- accessible ہونا چاہیے (WCAG 2.1 AA)
- mobile اور desktop کو سپورٹ کرنا ہوگا

### 4. Testability: کیا ہم کامیابی کی تصدیق کر سکتے ہیں؟

ہر کامیابی کا معیار قابل پیمائش ہونا چاہیے:

خراب: "صارف دوست انٹرفیس"
اچھا: "نئے صارفین دستاویزات کے بغیر < 60 سیکنڈ میں رجسٹریشن مکمل کر سکتے ہیں"

خراب: "اچھی performance"
اچھا: "1,000 concurrent users کے تحت 95th percentile response time < 200ms"

خراب: "محفوظ نفاذ"
اچھا: "OWASP Top 10 security checklist پاس کرتا ہے، کوئی critical vulnerabilities نہیں"

## SDD بمقابلہ Vibe Coding

"Vibe Coding" intuition کی بنیاد پر کوڈ لکھنا ہے—چیزوں کو آزمانا، دیکھنا کہ کیا کام کرتا ہے، reactively iterate کرنا۔ SDD منظم طریقے سے سوچنا ہے—پہلے تفصیل لکھنا، پھر نفاذ کرنا۔

| پہلو | Vibe Coding | Spec-Driven Development |
|--------|-------------|-------------------------|
| **شروع کا نقطہ** | IDE کھولیں، کوڈنگ شروع کریں | پہلے تفصیلات لکھیں |
| **فیصلہ سازی** | کوڈنگ کے دوران معلوم کریں | پہلے سے فیصلے کریں |
| **Iteration** | "میں نے کیا بھولا اسے ٹھیک کریں" کے 5-10 cycles | بہتری کے 1-2 cycles |
| **Edge Cases** | production میں دریافت ہوئے | پہلے سے منصوبہ بند |
| **AI Collaboration** | "میرے لیے ایک چیز بنائیں" (اندازے) | "اس spec کو نافذ کریں" (درستگی) |
| **وقت کی تقسیم** | 80% کوڈنگ، 20% ٹھیک کرنا | 20% تفصیل، 80% تعمیر |
| **Scalability** | 1,000 لائنوں سے آگے ٹوٹ جاتا ہے | پیچیدہ سسٹمز تک پھیلتا ہے |
| **ٹیم کوآرڈینیشن** | "کوڈ پڑھیں" | "spec پڑھیں" |

**جب Vibe Coding کام کرتا ہے**:
- نیا framework سیکھنا (exploration phase)
- Prototyping throwaway code (proof-of-concept)
- سادہ scripts جن میں کوئی edge cases نہیں (< 50 لائنیں)

**جب SDD ضروری ہے**:
- business impact کے ساتھ production فیچرز
- متعدد components یا integrations کے ساتھ سسٹمز
- وہ پروجیکٹس جہاں requirements اہم ہیں (security، compliance، performance)
- AI agents یا متعدد ڈویلپرز پر مشتمل کام

## SDD کب استعمال کریں

ہر پروجیکٹ کو مکمل SDD کی ضرورت نہیں ہے۔ اس فیصلہ سازی کے فریم ورک کا استعمال کریں:

### مکمل SDD استعمال کریں جب:

- **Production فیچرز**: صارف کی فعالیت جو business metrics کو متاثر کرتی ہے
- **پیچیدہ سسٹمز**: متعدد components، integrations، یا workflows
- **Security-critical**: Authentication، payments، data processing
- **ٹیم پروجیکٹس**: متعدد ڈویلپرز کو مشترکہ تفہیم کی ضرورت ہے
- **AI-assisted development**: آپ نفاذ کے لیے AI agents استعمال کر رہے ہیں

**مثال**: payment processing سسٹم بنانا—مکمل SDD استعمال کریں۔ Security اہم ہے، edge cases اہم ہیں، اور errors کی قیمت ہوتی ہے۔

### Lightweight SDD استعمال کریں جب:

- **سادہ utilities**: اندرونی tools، scripts، automation
- **Prototype code**: exploratory کام جسے ضائع کر دیا جائے گا
- **اچھی طرح سمجھے گئے patterns**: CRUD APIs، بنیادی web pages

**مثال**: ایک بار کی data migration کے لیے CSV parser بنانا—lightweight SDD استعمال کریں۔ input format، output format، اور error handling لکھیں، پھر نافذ کریں۔

### SDD چھوڑ دیں جب:

- **Learning experiments**: آپ نئی technology کو دریافت کر رہے ہیں
- **Throwaway prototypes**: وہ کوڈ جو production تک نہیں پہنچے گا
- **Trivial changes**: typo ٹھیک کرنا، color اپ ڈیٹ کرنا

**مثال**: بٹن کا رنگ نیلے سے سبز میں اپ ڈیٹ کرنا—بس تبدیلی کریں۔

## تصدیقی طریقے اور Quality Gates

SDD میں ہر مرحلے پر تصدیق شامل ہے۔ ہر مرحلے میں quality gates ہوتے ہیں جنہیں آگے بڑھنے سے پہلے پاس کرنا ہوتا ہے۔

### مرحلے کے Quality Gates

**Specify Phase Gate**:
- [ ] ارادہ واضح ہے (یہ کیوں موجود ہے)
- [ ] کامیابی کے معیار قابل پیمائش ہیں
- [ ] constraints واضح ہیں
- [ ] non-goals کی تعریف کی گئی ہے
- [ ] Stakeholders منظور کرتے ہیں (اگر ٹیم پروجیکٹ ہے)

**Clarify Phase Gate**:
- [ ] تمام مبہم اصطلاحات کی تعریف کی گئی
- [ ] Edge cases کی نشاندہی ہوئی
- [ ] Integration points کی تفصیل
- [ ] Error handling کی تعریف

**Plan Phase Gate**:
- [ ] Architecture diagram موجود ہے
- [ ] Dependencies کی نشاندہی
- [ ] Testing strategy کی تعریف
- [ ] Tradeoffs دستاویزی

**Tasks Phase Gate**:
- [ ] ہر ٹاسک کے acceptance criteria ہیں
- [ ] ٹاسکس کے درمیان dependencies واضح
- [ ] کوئی ٹاسک 2 گھنٹے سے زیادہ نہیں
- [ ] ٹاسکس درست ترتیب میں

**Implement Phase Gate**:
- [ ] کوڈ تفصیلات کی پیروی کرتا ہے
- [ ] کوڈ پروجیکٹ کے patterns کی پیروی کرتا ہے
- [ ] ٹیسٹ پاس ہوئے (unit، integration)
- [ ] Code review منظور ہوا

**Validate Phase Gate**:
- [ ] تمام کامیابی کے معیار پورے ہوئے
- [ ] تمام constraints پورے ہوئے
- [ ] Edge cases ٹیسٹ ہوئے
- [ ] دستاویزات اپ ڈیٹ ہوئیں
- [ ] Stakeholder sign-off

### خودکار Quality Checks

جہاں ممکن ہو، quality gates کو خودکار کریں:

```yaml
# Example: Automated validation in CI/CD
quality_gates:
  - name: "Spec Completeness Check"
    run: npm run check-spec-completeness
    passes: "All required fields present"

  - name: "Success Criteria Validation"
    run: npm run validate-success-criteria
    passes: "All criteria measurable and testable"

  - name: "Test Coverage"
    run: npm run test:coverage
    passes: "Coverage > 80%"

  - name: "Performance Benchmarks"
    run: npm run bench
    passes: "Response time < 200ms (95th percentile)"
```

## SDD اور AI Collaboration

SDD AI کو chatbot سے implementation partner میں تبدیل کرتا ہے۔ ورک فلو مختلف دکھتا ہے:

### SDD کے بغیر

```
You: "Build me a user registration system"

AI: [Generizes code based on assumptions]

You: "Wait, I forgot password reset"

AI: "Okay, here's updated code"

You: "Oh, and rate limiting"

AI: "Okay, more updates"

[5 iterations later, you have what you wanted]
```

### SDD کے ساتھ

```
You: [Write complete specification]

AI: "I see you need email verification. Should I use AWS SES or SendGrid?"

You: "AWS SES, we have an existing contract"

AI: [Generates implementation matching spec]

You: [Review and approve]

[1 iteration later, you have exactly what you specified]
```

بنیادی فرق: **AI منصوبہ بندی کے دوران وضاحتی سوالات پوچھتا ہے، نفاذ کے دوران نہیں۔**

## عام SDD غلطیاں

### غلطی 1: کوڈ کے بعد Spec لکھنا

**Anti-pattern**: فیچر بنائیں، پھر دستاویز کریں کہ آپ نے کیا بنایا۔

**یہ کیوں ناکام ہوتا ہے**: آپ فیصلوں کو دستاویز کر رہے ہیں، انہیں نہیں بنا رہے۔ spec رہنما نہیں بلکہ retrospective بن جاتا ہے۔

**ٹھیک کریں**: پہلے spec لکھیں۔ اسے صرف تب نظر ثانی کریں جب آپ کو پہلے سے کچھ واقعی غیر معلوم دریافت ہو۔

### غلطی 2: مبہم کامیابی کے معیار

**Anti-pattern**: "صارف دوست انٹرفیس"، "اچھی performance"، "محفوظ نفاذ"

**یہ کیوں ناکام ہوتا ہے**: یہ testable نہیں ہیں۔ آپ تصدیق نہیں کر سکتے کہ آپ کامیاب ہوئے یا نہیں۔

**ٹھیک کریں**: ہر معیار کو قابل پیمائش بنائیں۔ "95th percentile response time < 200ms"، "OWASP Top 10 checklist پاس کرتا ہے"، "نئے صارفین دستاویزات کے بغیر < 60s میں رجسٹریشن مکمل کرتے ہیں"

### غلطی 3: Non-Goals کو چھوڑنا

**Anti-pattern**: آپ کیا نہیں بنا رہے اس کا کوئی واضح بیان نہیں۔

**یہ کیوں ناکام ہوتا ہے**: Scope creep ہوتا ہے۔ ہر بات چیت "کیا ہم X شامل کریں؟" بن جاتی ہے۔

**ٹھیک کریں**: non-goals کو واضح طور پر فہرست کریں۔ جب کوئی فیچر X کے لیے پوچھے، کہیں "وہ ہمارے Phase 1 کے non-goals فہرست میں ہے۔ ہم اسے Phase 2 کے لیے غور کریں گے۔"

### غلطی 4: Specs کو Static سمجھنا

**Anti-pattern**: spec لکھیں، کبھی اسے اپ ڈیٹ نہ کریں، چاہے requirements تبدیل ہو جائیں۔

**یہ کیوں ناکام ہوتا ہے**: spec پرانا ہو جاتا ہے۔ نفاذ spec سے ہٹ جاتا ہے۔

**ٹھیک کریں**: specs کو living documents سمجھیں۔ جب requirements تبدیل ہوں تو انہیں اپ ڈیٹ کریں۔ spec اور نفاذ کو sync میں رکھیں۔

## AI کے ساتھ آزمائیں

### Prompt 1: ایک تفصیلات لکھیں

```
I'm building a task management application. One feature is "users can create, edit, and delete tasks."

Help me write a complete specification for this feature. For each element (intent, success criteria, constraints, non-goals), ask me 2-3 questions to understand what I want, then help me write a clear, measurable specification.

Don't write code yet—just the spec.
```

**آپ کیا سیکھ رہے ہیں**: نفاذ سے پہلے requirements کے بارے میں منظم طریقے سے کیسے سوچنا ہے۔ آپ مبہم خیالات سے درست تفصیلات کی طرف جانے کی مشق کر رہے ہیں۔

### Prompt 2: اپنے موجودہ ورک فلو کا جائزہ لیں

```
I want to understand my current development workflow. Ask me these questions:

1. How do you typically start a new feature? (Do you spec first, code first, or something else?)
2. How many iterations does it typically take to get a feature "done"?
3. What's the most common reason you have to rewrite code?

Based on my answers, tell me:
- Am I using SDD, Vibe Coding, or a hybrid approach?
- What's the biggest inefficiency in my current process?
- What one change would give me the biggest improvement?
```

**آپ کیا سیکھ رہے ہیں**: اپنے ڈویلپمنٹ عمل کے بارے میں خود آگاہی۔ اپنے موجودہ ورک فلو کو سمجھنے سے آپ کو یہ معلوم کرنے میں مدد ملتی ہے کہ SDD کہاں سب سے زیادہ اثر انداز ہوگا۔

### Prompt 3: SDD بمقابلہ Vibe Coding منظرنامے

```
Give me 5 project scenarios ranging from simple to complex. For each one, tell me:

1. Should I use full SDD, lightweight SDD, or skip SDD?
2. Why? (What characteristics of this project make SDD valuable or unnecessary?)
3. What would go wrong if I used the wrong approach?

Make the scenarios realistic:
- A simple data migration script
- A user authentication system
- An internal dashboard for monitoring metrics
- A payment processing integration
- A real-time collaboration feature (like Google Docs)
```

**آپ کیا سیکھ رہے ہیں**: فیصلہ سازی کی مہارتیں۔ آپ یہ سیکھ رہے ہیں کہ کب SDD ضروری ہے بمقابلہ کب یہ ضرورت سے زیادہ ہے۔ یہ فیصلہ specs لکھنا جاننے جتنا ہی اہم ہے۔

---

## آگے کیا ہے

اب آپ SDD طریقہ کار کو سمجھتے ہیں۔ آنے والے اسباق میں، آپ حقیقی فیچرز کے لیے تفصیلات لکھنے کی مشق کریں گے اور انہیں نافذ کرنے کے لیے AI agents استعمال کرنا سیکھیں گے۔

بنیادی بصیرت: **agentic دور میں، کوڈنگ سے پہلے آپ کتنی واضح سوچتے ہیں یہ طے کرتا ہے کہ آپ کتنی جلدی ship کرتے ہیں۔**

SDD بیوروکریسی نہیں ہے۔ یہ تیزی ہے۔ پہلے سے منظم طریقے سے سوچ کر، آپ ان iterations کو ختم کر دیتے ہیں جو آپ کو سست کرتے ہیں۔ آپ تیزی سے ship کرتے ہیں، کم bugs کے ساتھ، اور زیادہ اعتماد کے ساتھ۔

آپ کا نیا کردار: specification engineer اور system architect۔ AI کا کردار: implementation partner۔ مل کر، آپ اہم چیزیں بناتے ہیں—پہلے سے کہیں زیادہ تیزی سے۔
