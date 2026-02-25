---
sidebar_position: 5
title: "AIFF معیارات - بنیاد"
description: "ایجنٹک AI فاؤنڈیشن کے معیارات (MCP, AGENTS.md, goose, Skills, MCP Apps) کو سمجھنا جو پورٹیبل، قابل فروخت ڈیجیٹل FTEs کو فعال کرتے ہیں۔"
keywords: [AAIF, Agentic AI Foundation, MCP, AGENTS.md, goose, Agent Skills, MCP Apps, Linux Foundation, open standards]
chapter: 1
lesson: 5
duration_minutes: 40

# HIDDEN SKILLS METADATA
skills:
  - name: "Understanding Open Standards Economics"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "طالب علم وضاحت کرسکتا ہے کہ کھلے معیارات (جیسے USB، HTTP) نیٹ ورک اثرات کے ذریعے ملکیتی متبادلات سے زیادہ قدر کیوں پیدا کرتے ہیں۔"

  - name: "Mapping Standards to Digital FTE Architecture"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "طالب علم مخصوص ڈیجیٹل FTE ڈیزائن کے مسائل پر MCP (کنیکٹیویٹی)، AGENTS.md (موافقت)، اسکلز (مہارت)، اور گوز (فن تعمیر) کو صحیح طریقے سے لاگو کرسکتا ہے۔"

  - name: "Evaluating Distribution and Monetization Strategies"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Evaluate"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "طالب علم رسائی اور آمدنی کو بہتر بنانے کے لیے ایپس SDK کی تقسیم، MCP ایپس کی کراس پلیٹ فارم پورٹیبلٹی، اور کسٹم انٹرفیس کا موازنہ کرسکتا ہے۔"

learning_objectives:
  - objective: "Explain why AAIF standards matter for building portable Digital FTEs that work across AI platforms"
    proficiency_level: "A1"
    bloom_level: "Understand"
    assessment_method: "Articulation of portability benefits using USB Implementers Forum analogy"

  - objective: "Distinguish MCP, AGENTS.md, goose, and Skills by their purposes and correctly apply them to Digital FTE architecture"
    proficiency_level: "A2"
    bloom_level: "Analyze"
    assessment_method: "Classification of capabilities into connectivity (MCP), adaptability (AGENTS.md), expertise (Skills), architecture patterns (goose)"

  - objective: "Design an AGENTS.md and SKILL.md for a specific domain, applying progressive disclosure and proper structure"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Creation of valid AGENTS.md and SKILL.md files with proper frontmatter, activation conditions, and execution steps"

cognitive_load:
  new_concepts: 7
  assessment: "7 تصورات (AAIF گورننس، MCP پرائمیٹوز، AGENTS.md درجہ بندی، گوز آرکیٹیکچر، اسکلز پروگریسو ڈسکلوژر، MCP ایپس UI، ڈسٹری بیوشن اکنامکس) A2 کی حد (7-9 تصورات) کے اندر ✓"

differentiation:
  extension_for_advanced: "AAIF گورننس دستاویزات پڑھیں؛ modelcontextprotocol.io پر MCP تفصیلات کا مطالعہ کریں؛ MCP ایپس ایکسٹینشن کا OpenAI ایپس SDK سے موازنہ کریں؛ پیداواری نمونوں کا تجزیہ کرنے کے لیے گوز ریپوزٹری کو کلون کریں۔"
  remedial_for_struggling: "USB تشبیہ پر توجہ دیں؛ AGENTS.md (موافقت) اور اسکلز (مہارت) کو شامل کرنے سے پہلے MCP (کنیکٹیویٹی) کو گہرائی سے سمجھیں؛ جسمانی استعارے (ہاتھ بمقابلہ تربیت) استعمال کریں۔"

teaching_guide:
  lesson_type: "بنیادی"
  session_group: 2
  session_title: "ایجنٹ کی صلاحیتیں اور معیارات"
  key_points:
    - "AAIF is the governance body (like USB Implementers Forum), NOT a technology — students must distinguish the organization from the five standards it governs"
    - "MCP solves the M×N integration problem — without MCP, 3 AI platforms × 5 tools = 15 custom integrations; with MCP, each tool writes one server"
    - "The three MCP primitives (Resources=eyes, Tools=hands, Prompts=playbooks) are the building blocks students will use when building Digital FTEs in Parts 5-7"
    - "Progressive disclosure in Skills (L1: metadata → L2: full instructions → L3: scripts) reduces token usage by 80-98% — this connects directly to Lesson 2's context window constraint"
  misconceptions:
    - "Students confuse AAIF (the foundation/governance body) with MCP (the protocol) — AAIF governs MCP, AGENTS.md, goose, Skills, and MCP Apps as separate standards"
    - "Students think AGENTS.md is the same as README.md — README answers 'What is this project?' while AGENTS.md answers 'How should I behave in this project?'"
    - "Students think goose competes with Claude Code — both are General Agents, but goose is open source so you can study its architecture to build your own Custom Agents"
    - "Students mix up MCP Tools and Skills — MCP Tools are actions (send email), Skills are expertise (how to handle payment scenarios)"
  discussion_prompts:
    - "Why did competitors like OpenAI, Anthropic, and Block agree to share their technologies under one foundation — what do they each gain?"
    - "If you were building a Digital SDR that needed to work across multiple client CRMs, which AAIF standards would matter most and why?"
  teaching_tips:
    - "Open with the 'Does it work with ChatGPT?' sales scenario — this immediately makes portability feel like a real business problem, not abstract standards talk"
    - "The USB analogy is the anchor for this entire lesson — draw the parallel: proprietary chargers (pre-USB) = custom AI integrations (pre-MCP)"
    - "Walk through the MCP Architecture diagram (Host→Client→Server) carefully — students will implement this pattern in Part 6, so invest time here"
    - "The AGENTS.md hierarchy rule (nearest file wins) is practical knowledge — show a monorepo example where frontend and backend have different conventions"
  assessment_quick_check:
    - "Ask students to match each standard to its purpose: MCP=connectivity, AGENTS.md=adaptability, Skills=expertise, goose=architecture"
    - "Ask: 'What is the difference between an MCP Resource and an MCP Tool?' — Resources are read-only (eyes), Tools change state (hands)"
    - "Have students explain progressive disclosure in Skills and why it matters for context windows"
---

# AIFF معیارات - بنیاد

آپ نے ایک ڈیجیٹل سیلز ڈویلپمنٹ نمائندہ (SDR) بنایا ہے جو 24/7 لیڈز کو کوالیفائی کرتا ہے۔ یہ کلاڈ کے ساتھ شاندار طریقے سے کام کرتا ہے۔ اب ایک کلائنٹ پوچھتا ہے: "کیا یہ چیٹ جی پی ٹی کے ساتھ کام کرتا ہے؟ ہم OpenAI پر معیاری بنا رہے ہیں۔"

آپ کیا کہتے ہیں؟

9 دسمبر 2025 سے پہلے، آپ کو ایک غیر آرام دہ انتخاب کا سامنا کرنا پڑتا: ان کے پلیٹ فارم کے لیے دوبارہ تعمیر کریں، یا سودا کھو دیں۔ آپ کی مہارت—اہلیت کی منطق، CRM انضمام، فالو اپ ورک فلو—ایک وینڈر تک محدود تھی۔

**AAIF اس مساوات کو مکمل طور پر بدل دیتا ہے۔**

ایجنٹک AI فاؤنڈیشن 9 دسمبر 2025 کو اعلان کردہ ایک لینکس فاؤنڈیشن اقدام ہے۔ یہ AI ایجنٹوں کو طاقت دینے والے کھلے معیارات کے لیے غیر جانبدارانہ گورننس فراہم کرتا ہے—اس بات کو یقینی بناتا ہے کہ آپ کے ڈیجیٹل FTEs پورٹیبل سرمایہ کاری ہیں، پلیٹ فارم قیدی نہیں۔

اس تاریخ کو، کچھ غیر معمولی ہوا: OpenAI، Anthropic، اور Block — کمپنیاں جو AI مارکیٹ شیئر کے لیے سخت مقابلہ کرتی ہیں — نے لینکس فاؤنڈیشن کے تحت اکٹھے ہوکر اپنی بنیادی ٹیکنالوجیز کو غیر جانبدارانہ گورننس کے لیے عطیہ کیا۔ ان کے ساتھ ایمیزون ویب سروسز، گوگل، مائیکروسافٹ، بلومبرگ، اور کلاؤڈ فلیئر پلاٹینم ممبرز کے طور پر شامل ہوئے۔

جیسا کہ لینکس فاؤنڈیشن کے ایگزیکٹو ڈائریکٹر جم زیملن نے کہا:

> "ہم دیکھ رہے ہیں کہ AI ایک نئے مرحلے میں داخل ہو رہا ہے، کیونکہ بات چیت کے نظام خود مختار ایجنٹوں کی طرف منتقل ہو رہے ہیں جو مل کر کام کرسکتے ہیں۔ صرف ایک سال کے اندر، MCP، AGENTS.md اور گوز اس نئی کلاس کی ایجنٹک ٹیکنالوجیز بنانے والے ڈویلپرز کے لیے ضروری اوزار بن گئے ہیں۔"

**بصیرت: بنیادی ڈھانچہ جس کی ہر کسی کو ضرورت ہے وہ سب کا ہونا چاہئے۔ مشترکہ بنیادوں پر بنی مصنوعات پر مقابلہ کریں، نہ کہ خود بنیادوں پر۔**

---

## USB سبق: معیارات کیوں جیتتے ہیں۔

USB کے معیار بننے سے پہلے، ہر ڈیوائس میں ملکیتی کنیکٹر ہوتے تھے۔ آپ کا فون چارجر آپ کے کیمرے کے ساتھ کام نہیں کرے گا۔ آپ کے پرنٹر کو ایک خاص کیبل کی ضرورت تھی۔ ڈیوائسز کو تبدیل کرنے کا مطلب نئی کیبلز خریدنا اور پرانی کو پھینک دینا تھا۔

پھر USB نے ڈیوائس کنکشن کو معیاری بنایا:
- کوئی بھی USB ڈیوائس کسی بھی USB پورٹ کے ساتھ کام کرتی ہے۔
- مینوفیکچررز ڈیوائس کے معیار پر مقابلہ کرتے ہیں، نہ کہ کنیکٹر لاک ان پر۔
- صارفین اعتماد کے ساتھ خریدتے ہیں—ان کی سرمایہ کاری پورٹیبل ہے۔

**AAIF AI ایجنٹوں کے لیے USB امپلیمینٹرز فورم ہے۔**

جس طرح USB کو ایک غیر جانبدار معیاری ادارے (USB امپلیمینٹرز فورم) کی ضرورت تھی تاکہ یہ یقینی بنایا جاسکے کہ کوئی بھی ڈیوائس کسی بھی پورٹ کے ساتھ کام کرتی ہے، اسی طرح AI ایجنٹوں کو AAIF کی ضرورت ہے تاکہ یہ یقینی بنایا جاسکے کہ آپ کے ڈیجیٹل FTEs کسی بھی پلیٹ فارم پر کام کرتے ہیں۔ AAIF معیارات کو کنٹرول کرتا ہے؛ خود معیارات اصل پورٹیبلٹی بناتے ہیں۔

| کھلے معیارات کے بغیر | AAIF معیارات کے ساتھ |
|------------------------|---------------------|
| ہر AI پلیٹ فارم کے لیے انضمام کو دوبارہ بنائیں۔ | ایک بار لکھیں، ہر جگہ تعینات کریں۔ |
| مہارتیں کلاڈ یا چیٹ جی پی ٹی تک محدود ہیں۔ | مہارتیں تمام بڑے ایجنٹوں میں کام کرتی ہیں۔ |
| ہر کلائنٹ کے ٹولز کے لیے کسٹم کوڈ۔ | ٹول کنیکٹیویٹی کے لیے یونیورسل پروٹوکول۔ |
| پلیٹ فارم وینڈر لاک ان۔ | دوبارہ تعمیر کیے بغیر فراہم کنندگان کو تبدیل کریں۔ |

اقتصادی منطق یکساں ہے: معیارات بڑی منڈیاں بناتے ہیں، جو بکھرے ہوئے ملکیتی ماحولیاتی نظاموں سے زیادہ سب کو فائدہ پہنچاتے ہیں۔

---

## پانچ معیارات کی بنیاد

AAIF نے پانچ منصوبوں کے ساتھ آغاز کیا جو مل کر پورٹیبل AI ایجنٹوں کے لیے ایک مکمل بنیاد بناتے ہیں:

### 1. ماڈل سیاق و سباق پروٹوکول (MCP) — اینتھروپک سے

**یہ جو مسئلہ حل کرتا ہے:** آپ کے ڈیجیٹل SDR کو CRM تک رسائی کی ضرورت ہے۔ آپ کے ڈیجیٹل اکاؤنٹنٹ کو ڈیٹا بیس کنکشن کی ضرورت ہے۔ آپ کے ڈیجیٹل قانونی اسسٹنٹ کو دستاویزات کی ریپوزٹریز کی ضرورت ہے۔ MCP سے پہلے، آپ ایجنٹ اور ٹول کے ہر امتزاج کے لیے کسٹم انضمام کوڈ لکھتے۔

```
Claude → Salesforce:  Custom integration code
ChatGPT → Salesforce: Different custom code
Gemini → Salesforce:  Yet another custom code

Claude → HubSpot:     Another custom integration
ChatGPT → HubSpot:    Another different custom code
```

تین AI پلیٹ فارمز × دو CRMs = چھ کسٹم انضمام۔ پائپ ڈرائیو، زوہو، فریش سیلز، کیلنڈر، ای میل، ڈیٹا بیس شامل کریں؟ امتزاج پھٹ جاتے ہیں۔ یہ **M×N مسئلہ** ہے: M مختلف AI ماڈلز کو N مختلف ٹولز سے جوڑنے کے لیے M×N کسٹم انضمام کی ضرورت ہوتی ہے۔

**MCP کیا قابل بناتا ہے:** تمام ایجنٹ سے ٹول کنکشنز کے لیے ایک معیاری پروٹوکول۔ ایک بار MCP سرور لکھیں، اور کوئی بھی MCP-مطابقت رکھنے والا ایجنٹ اسے استعمال کرسکتا ہے—کلاڈ، چیٹ جی پی ٹی، جیمنی، گوز، یا آپ کے کسٹم ایجنٹس۔

**MCP "عمل" کی طاقت کو قابل بناتا ہے۔** MCP کے بغیر، آپ کا ڈیجیٹل FTE شاندار طریقے سے استدلال کرسکتا ہے کہ کیا کرنا ہے—لیکن یہ اصل میں ایسا نہیں کرسکتا۔ یہ بہترین فالو اپ ای میل کی منصوبہ بندی کرسکتا ہے، لیکن یہ اسے بھیج نہیں سکتا۔ MCP کے ساتھ، آپ کا ڈیجیٹل سیلز ایجنٹ CRM سسٹمز، ای میل پلیٹ فارمز، کیلنڈرز، اور ڈیٹا بیس سے جڑتا ہے۔

**تین یونیورسل پرائمیٹوز:**

| قدیم | مقصد | جسمانی استعارہ | ڈیجیٹل SDR مثال |
|-----------|---------|-------------------|---------------------|
| **وسائل** | صرف پڑھنے کے لیے ڈیٹا | آنکھیں (دیکھیں، چھوئیں نہیں) | CRM سے لیڈ ڈیٹا، ای میل کی تاریخ |
| **اوزار** | وہ اعمال جو حالت بدلتے ہیں۔ | ہاتھ (چیزیں کرواتے ہیں) | ای میل بھیجیں، ڈیل کا مرحلہ اپ ڈیٹ کریں، میٹنگ شیڈول کریں۔ |
| **پرامپٹس** | دوبارہ قابل استعمال ٹیمپلیٹس | پلے بکس (معیاری طریقے) | لیڈ کوالیفیکیشن چیک لسٹ، فالو اپ ای میل کی ساخت |

اسے غلط سمجھنے سے آپ کا ڈیجیٹل FTE ٹوٹ جاتا ہے۔ "ای میل بھیجیں" کو ایک وسیلہ کے طور پر بے نقاب کرنے کا مطلب ہے کہ آپ کا ایجنٹ آپشن دیکھ سکتا ہے لیکن اصل میں بھیج نہیں سکتا۔ یونیورسل معیارات یونیورسل الجھن کو روکتے ہیں۔

**فن تعمیر:** میزبان → کلائنٹ → سرور

```
┌──────────────────────────────────────┐
│             HOST                      │
│  (Claude Desktop, ChatGPT, your app)  │
│   ┌─────────────────────────────┐    │
│   │          CLIENT             │    │
│   │  (Manages MCP connections)   │    │
│   └─────────────┬───────────────┘    │
└─────────────────┼────────────────────┘
                  │ MCP Protocol (JSON-RPC)
┌─────────────────▼────────────────────┐
│             SERVER                    │
│  (Your CRM connector, database, API)  │
│   Resources │ Tools │ Prompts         │
└──────────────────────────────────────┘
```

**اپنانے کی ٹائم لائن:**

| تاریخ | سنگ میل |
|------|-----------|
| نومبر 2024 | اینتھروپک نے MCP کو اوپن سورس کے طور پر جاری کیا۔ |
| 2025 کے اوائل | بلاک، اپولو، ریپلٹ، زیڈ، سورس گراف اپناتے ہیں۔ |
| مارچ 2025 | اوپن اے آئی نے سرکاری طور پر مصنوعات میں MCP کو اپنایا۔ |
| اپریل 2025 | گوگل ڈیپ مائنڈ نے جیمنی کے لیے MCP سپورٹ کی تصدیق کی۔ |
| نومبر 2025 | OAuth 2.1، اسٹریم ایبل HTTP کے ساتھ MCP تفصیلات 2025-11-25 |
| دسمبر 2025 | MCP نے لینکس فاؤنڈیشن کی حکمرانی کے تحت AAIF کو عطیہ کیا۔ |

جیسا کہ اینتھروپک کے چیف پروڈکٹ آفیسر مائیک کریگر نے کہا:

> "جب ہم نے اسے نومبر 2024 میں اوپن سورس کیا، تو ہمیں امید تھی کہ دوسرے ڈویلپرز بھی اسے اتنا ہی مفید پائیں گے جتنا ہم نے پایا۔ ایک سال بعد، یہ AI سسٹمز کو ڈیٹا اور ٹولز سے جوڑنے کے لیے صنعتی معیار بن گیا ہے۔"

---

### 2. AGENTS.md — OpenAI سے

**یہ جو مسئلہ حل کرتا ہے:** آپ اپنے ڈیجیٹل SDR کو 100 کلائنٹس کے لیے تعینات کر رہے ہیں۔ ہر ایک کے پاس مختلف کوڈنگ کنونشنز، مختلف بلڈ سسٹمز، مختلف حفاظتی ضروریات ہیں۔ کیا ہر تعیناتی کے لیے کسٹم کنفیگریشن کی ضرورت ہے؟

**AGENTS.md کیا قابل بناتا ہے:** ایک معیاری مارک ڈاؤن فائل جو AI ایجنٹوں کو مقامی اصول سکھاتی ہے۔ آپ کا ڈیجیٹل FTE ہر کلائنٹ کا AGENTS.md پڑھتا ہے اور فوری طور پر ان کے ماحول کو سمجھتا ہے—صفر حسب ضرورت کی ضرورت ہے۔

**AGENTS.md کیوں موجود ہے: انسان ≠ ایجنٹس**

ہر ڈویلپر README.md جانتا ہے۔ یہ انسانوں کو بتاتا ہے کہ پروجیکٹ کیا کرتا ہے، اسے کیسے انسٹال کرنا ہے، کیسے حصہ ڈالنا ہے۔ لیکن AI ایجنٹوں کو مختلف معلومات کی ضرورت ہوتی ہے:

| انسانوں کی ضرورت ہے۔ | ایجنٹوں کی ضرورت ہے۔ |
|-------------|-------------|
| پروجیکٹ کی حوصلہ افزائی اور اہداف | بنائیں اور ٹیسٹ کمانڈز |
| شروع کرنے کا ٹیوٹوریل | کوڈ اسٹائل کے اصول |
| شراکت کے رہنما خطوط | حفاظتی رکاوٹیں |
| اسکرین شاٹس اور ڈیمو | فائل تنظیم کے نمونے |

README.md جواب دیتا ہے "یہ پروجیکٹ کیا ہے؟" AGENTS.md جواب دیتا ہے "مجھے اس پروجیکٹ میں کیسا برتاؤ کرنا چاہئے؟"

**AGENTS.md میں کیا جاتا ہے:**

```markdown
## Build Commands
- `pnpm install` - Install dependencies
- `pnpm run build` - Production build
- `pnpm test` - Run all tests

## Code Style
- Use TypeScript strict mode for all new code
- Maximum function length: 50 lines
- File names: kebab-case (e.g., `user-profile.tsx`)

## Security
- Never hardcode API keys, tokens, or secrets
- Use environment variables for all credentials
- No `eval()` or `Function()` constructors

## Architecture
- All API routes go in `/src/api/`
- Database queries only through `/src/db/` layer
```

**درجہ بندی کا اصول:** قریب ترین AGENTS.md فائل کو ترجیح دی جاتی ہے۔ یہ مونوریپو سپورٹ کو قابل بناتا ہے جہاں مختلف ذیلی منصوبوں کے مختلف کنونشن ہوتے ہیں:

```
company/
├── AGENTS.md                    ← Root: company-wide rules
├── packages/
│   ├── frontend/
│   │   ├── AGENTS.md            ← Frontend-specific rules (React, hooks)
│   │   └── src/components/Button.tsx
│   └── backend/
│       ├── AGENTS.md            ← Backend-specific rules (Express, Prisma)
│       └── src/routes/users.ts
```

**اپنانے:** چونکہ OpenAI نے اگست 2025 میں AGENTS.md متعارف کرایا تھا، اس لیے اسے **60,000+ اوپن سورس پروجیکٹس** اور ہر بڑے AI کوڈنگ ایجنٹ نے اپنایا ہے: کلاڈ کوڈ، کرسر، گٹ ہب کوپائلٹ، جیمنی سی ایل آئی، ڈیون، گوز، اور مزید۔ OpenAI کی اپنی ریپوزٹری میں 88 AGENTS.md فائلیں ہیں۔

---

### 3. گوز — بلاک سے

**یہ جو مسئلہ حل کرتا ہے:** MCP ایجنٹوں کو بتاتا ہے کہ کیسے جڑنا ہے۔ AGENTS.md انہیں بتاتا ہے کہ کیسا برتاؤ کرنا ہے۔ لیکن ایک پیداواری ایجنٹ جو دونوں کو نافذ کرتا ہے وہ اصل میں کیسا لگتا ہے؟

**گوز کیا قابل بناتا ہے:** پیداواری ایجنٹوں کی تعمیر کے لیے ایک حوالہ فن تعمیر۔ ڈیمو نہیں — وہی ٹیکنالوجی جہاں 75% بلاک انجینئرز ہر ہفتے 8-10+ گھنٹے بچاتے ہیں۔ اپاچی 2.0 لائسنس یافتہ، لہذا آپ سورس کوڈ کا مطالعہ کرسکتے ہیں۔

**حوالہ نفاذ کیوں اہمیت رکھتا ہے:** جب آپ کسٹم ایجنٹ بناتے ہیں (حصہ 6)، تو آپ کو سوالات کا سامنا کرنا پڑے گا: مجھے MCP کلائنٹ کنکشن کی ساخت کیسے بنانی چاہئے؟ میں اسٹریمنگ جوابات کو کیسے سنبھالوں؟ گفتگو کے سیاق و سباق کو منظم کرنے کا صحیح طریقہ کیا ہے؟ آپ ان کو پہلے اصولوں سے حل کرسکتے ہیں۔ یا آپ مطالعہ کرسکتے ہیں کہ گوز نے انہیں کیسے حل کیا — پھر ان نمونوں کو اپنی ضروریات کے مطابق ڈھالیں۔

**ایجنٹ میچورٹی ماڈل میں گوز:** کلاڈ کوڈ اور گوز جیسے جنرل ایجنٹ انکیوبیٹر مرحلے کے ٹولز کے طور پر کام کرتے ہیں جہاں آپ دریافت اور پروٹو ٹائپ کرتے ہیں۔ کسٹم ایجنٹس (SDKs کے ساتھ بنائے گئے) ماہر مرحلے میں ابھرتے ہیں جب پیداوار کے لیے ضروریات واضح ہوجاتی ہیں۔ گوز ایک انکیوبیٹر مرحلے کا ایجنٹ ہے، لیکن یہ **اوپن سورس** ہے، جو اسے ماہرین کی تعمیر کو سمجھنے کے لیے آپ کا بلیو پرنٹ بناتا ہے۔

| سیکھنے کا راستہ | آپ کو کیا ملتا ہے۔ |
|---------------|--------------|
| صرف تفصیلات سے | درست لیکن غیر آزمودہ نمونے |
| ٹیوٹوریلز سے | آسان نمونے جو پیمانے پر ٹوٹ جاتے ہیں۔ |
| گوز سے | انٹرپرائز استعمال سے جنگ آزمودہ نمونے |

**کلیدی فن تعمیر کے نمونے:**

1. **مقامی-پہلا عمل درآمد:** آپ کا کوڈ اور ڈیٹا مقامی رہتا ہے۔ حساس IP والے انٹرپرائز کلائنٹس کے لیے، یہ اختیاری نہیں ہے—یہ ضروری ہے۔

2. **MCP-آبائی ڈیزائن:** صلاحیتوں کو شامل کرنے کا مطلب MCP سرورز کو جوڑنا ہے۔ کوئی کسٹم انضمام کوڈ نہیں۔ ہر صلاحیت ایک ہی نمونے کی پیروی کرتی ہے۔

3. **ملٹی ماڈل سپورٹ:** کلاڈ، GPT-4، جیمنی، اولاما کے لیے سپورٹ۔ آپ مختلف کاموں کے لیے مختلف ماڈلز بھی ترتیب دے سکتے ہیں—سادہ آپریشنز کے لیے سستا ماڈل، پیچیدہ استدلال کے لیے پریمیم ماڈل۔

**گوز بمقابلہ کلاڈ کوڈ:** دونوں ایک ہی معیارات کی توثیق کرنے والے جنرل ایجنٹ ہیں۔

| پہلو | کلاڈ کوڈ | گوز |
|--------|-------------|-------|
| تخلیق کار | اینتھروپک | بلاک |
| لائسنس | ملکیتی | اوپن سورس (اپاچی 2.0) |
| MCP سپورٹ | ہاں | ہاں |
| AGENTS.md سپورٹ | ہاں | ہاں |
| سورس کوڈ | بند | کھلا |

**آج پیداواریت کے لیے کلاڈ کوڈ استعمال کریں۔ کل کسٹم ایجنٹ بنانے کے لیے گوز کا مطالعہ کریں۔**

---

### 4. ایجنٹ کی مہارتیں — پیکیجنگ کی مہارت

**یہ جو مسئلہ حل کرتا ہے:** آپ نے مالیاتی تجزیہ، یا قانونی دستاویزات کا جائزہ، یا سیلز کی اہلیت میں مہارت حاصل کرنے میں برسوں گزارے ہیں۔ یہ مہارت آپ کے سر میں رہتی ہے—خفیہ علم جو آپ کو قیمتی بناتا ہے لیکن پیمانہ نہیں کرسکتا۔ جب بھی کوئی کلائنٹ آپ سے وہ کرنے کو کہتا ہے جس میں آپ ماہر ہیں، تو آپ وقت کے بدلے پیسے کا سودا کرتے ہیں۔ آپ رکاوٹ ہیں۔

**مہارتیں کیا قابل بناتی ہیں:** ایجنٹ کی مہارتیں آپ کو اس مہارت کو پیکیج کرنے دیتی ہیں۔ میٹرکس یاد ہے؟ تثلیث کو ہیلی کاپٹر اڑانے کی ضرورت ہے۔ وہ نہیں جانتی کہ کیسے۔ ٹینک مہارت کو لوڈ کرتا ہے۔ سیکنڈوں بعد: "چلو چلتے ہیں۔" یہی وہ چیز ہے جو آپ بنا رہے ہیں۔ آپ کی ڈومین کی مہارت—سالوں کی پیٹرن کی شناخت، فیصلے کے فریم ورک، ورک فلو کی اصلاح—پورٹیبل مہارتوں میں انکوڈ کی گئی ہے جسے کوئی بھی AI ایجنٹ ضرورت پڑنے پر لوڈ کرسکتا ہے۔

**SKILL.md فارمیٹ:**

```markdown
---
name: financial-analysis
description: Analyze financial statements and generate investment reports. Use when reviewing quarterly earnings, comparing company metrics, or preparing investor summaries.
---

# Financial Analysis Skill

## When to Use
- User asks for financial statement analysis
- Quarterly earnings data needs interpretation
- Investment comparison is requested

## How to Execute
1. Gather the relevant financial documents
2. Extract key metrics (revenue, margins, growth rates)
3. Compare against industry benchmarks
4. Generate structured report with recommendations

## Output Format
- Executive summary (3 sentences max)
- Key metrics table
- Year-over-year comparison
- Risk factors
- Recommendation
```

**ترقی پسند انکشاف: ٹوکن کی کارکردگی کا راز**

ہر چیز کو پہلے سے لوڈ کرنے سے ٹوکن ضائع ہوتے ہیں۔ اگر کوئی ایجنٹ اسٹارٹ اپ پر تمام 50 دستیاب مہارتیں لوڈ کرتا ہے—مکمل ہدایات، ٹیمپلیٹس، مثالیں—تو آپ اصل کام کرنے سے پہلے اپنی سیاق و سباق کی کھڑکی کو جلا دیں گے۔

حل **ترقی پسند انکشاف** ہے: صرف وہی لوڈ کرنا جس کی ضرورت ہو، جب اس کی ضرورت ہو۔

```
Level 1: Agent Startup (~100 tokens per skill)
├── Name: "financial-analysis"
└── Description: "Analyze financial statements..."

Level 2: When Skill Activated (< 5K tokens)
└── Full SKILL.md content (when-to-use, execution steps, output format)

Level 3: When Actually Needed
└── Supporting resources (templates, examples, scripts)
```

**80-98% ٹوکن میں کمی۔** اس کا مطلب ہے کہ آپ کا ڈیجیٹل FTE اپنی سیاق و سباق کی کھڑکی کو پھولائے بغیر درجنوں صلاحیتیں دستیاب رکھ سکتا ہے۔

**MCP + مہارتیں: تکمیلی معیارات**

| معیاری | مقصد | جسمانی استعارہ |
|----------|---------|-------------------|
| **MCP** | کنیکٹیویٹی — ایجنٹ ٹولز سے کیسے بات کرتے ہیں۔ | ایجنٹ کے **ہاتھ** |
| **مہارتیں** | مہارت — ایجنٹ کیا کرنا جانتے ہیں۔ | ایجنٹ کی **تربیت** |

**مثال: ڈیجیٹل SDR اسٹرائپ ادائیگیوں پر کارروائی کر رہا ہے۔**

- **MCP سرور (اسٹرائپ کنیکٹر):** اسٹرائپ API سے جڑتا ہے (چارجز بنائیں، رقم کی واپسی، لین دین کی فہرست)
- **مہارت (ادائیگی کی کارروائی):** ادائیگی کے منظرناموں کو *کیسے* سنبھالنا ہے (دوبارہ کوشش کی منطق، غلطی کی بازیابی، کسٹمر مواصلات) جانتا ہے۔

MCP سرور ایجنٹ کو اسٹرائپ تک *رسائی* دیتا ہے۔ مہارت ایجنٹ کو اسٹرائپ کو صحیح طریقے سے استعمال کرنے میں *مہارت* دیتی ہے۔ **MCP کے بغیر:** ایجنٹ اسٹرائپ تک نہیں پہنچ سکتا۔ **مہارت کے بغیر:** ایجنٹ اسٹرائپ تک پہنچ سکتا ہے لیکن ادائیگی کے بہترین طریقوں کو نہیں جانتا۔ **دونوں کے ساتھ:** ایجنٹ ایک تجربہ کار پیشہ ور کی طرح ادائیگیوں کو سنبھالتا ہے۔

**اپنانے کی ٹائم لائن:**

| تاریخ | سنگ میل |
|------|-----------|
| 16 اکتوبر 2025 | اینتھروپک نے کلاڈ کوڈ کے لیے ایجنٹ اسکلز کا آغاز کیا۔ |
| 18 دسمبر 2025 | اینتھروپک نے agentskills.io پر ایجنٹ اسکلز کو کھلے معیار کے طور پر جاری کیا۔ |
| دسمبر 2025 | اوپن اے آئی نے کوڈیکس سی ایل آئی اور چیٹ جی پی ٹی کے لیے ایک ہی SKILL.md فارمیٹ اپنایا۔ |

**ایجنٹ سپورٹ (دسمبر 2025):** کلاڈ کوڈ، چیٹ جی پی ٹی، کوڈیکس سی ایل آئی، وی ایس کوڈ، گٹ ہب کوپائلٹ، کرسر، گوز، اور بہت کچھ۔ **شراکت دار کی مہارتیں:** کینوا (ڈیزائن آٹومیشن)، اسٹرائپ (ادائیگی کی کارروائی)، نوشن، فگما، اٹلسین، کلاؤڈ فلیئر، ریمپ، سینٹری، زپیئر۔

---

### 5. MCP ایپس ایکسٹینشن — ایجنٹ انٹرفیس

**یہ جو مسئلہ حل کرتا ہے:** آپ کا ڈیجیٹل SDR لیڈز کو کوالیفائی کرسکتا ہے، CRM کو اپ ڈیٹ کرسکتا ہے، اور میٹنگز شیڈول کرسکتا ہے۔ لیکن صارفین اس کے ساتھ... چیٹ کے ذریعے تعامل کرتے ہیں؟ چیٹ طاقتور ہے، لیکن اس کی حدود ہیں: ڈیٹا ویژولائزیشنز متنی تفصیلات بن جاتی ہیں۔ فارمز ایک وقت میں ایک سوال کی گفتگو بن جاتے ہیں۔ پیچیدہ جدولیں فارمیٹنگ کی پہیلیاں بن جاتی ہیں۔ آپ کے مدمقابل کا SDR بٹن، چارٹ، اور حقیقی وقت کے پائپ لائن کے نظارے دکھاتا ہے۔ آپ کا ان کو پیراگراف میں بیان کرتا ہے۔

**MCP ایپس ایکسٹینشن کیا قابل بناتا ہے:** 21 نومبر 2025 کو، MCP کمیونٹی نے **MCP ایپس ایکسٹینشن (SEP-1865)** کا اعلان کیا—جس سے MCP سرورز کو میزبان ایپلی کیشنز کو براہ راست انٹرایکٹو صارف انٹرفیس فراہم کرنے کی اجازت ملتی ہے۔ بٹن، فارم، چارٹ، ڈیش بورڈز—صرف چیٹ نہیں۔

**ارتقاء:**

```
Text Only → Structured Output → Interactive Components
    ↓              ↓                    ↓
  Chat         Markdown/Code      Buttons, Forms,
              Formatting          Visualizations
```

**فن تعمیر:** سینڈ باکسڈ iframe سیکورٹی کے ساتھ پہلے سے اعلان کردہ UI ٹیمپلیٹس کے لیے `ui://` URI اسکیم کا استعمال کرتا ہے:

```
┌─────────────────────────────────────────────┐
│           MCP Host Application              │
│  ┌─────────────────┐  ┌──────────────────┐  │
│  │    AI Model     │◄─►│  Sandboxed UI   │  │
│  │                 │   │   (iframe)       │  │
│  └────────┬────────┘  └────────┬─────────┘  │
└───────────┼────────────────────┼────────────┘
            │   JSON-RPC over    │
            │   postMessage      │
            ▼                    ▼
      ┌──────────────────────────────┐
      │         MCP Server           │
      │  ┌────────┐  ┌────────────┐  │
      │  │ Tools  │  │ UI Templates│  │
      │  └────────┘  └────────────┘  │
      └──────────────────────────────┘
```

**تعاون:** MCP ایپس ایکسٹینشن ثابت شدہ نفاذات پر بناتا ہے: **MCP-UI** (اوپن سورس، مظاہرہ UI-as-MCP-وسائل پیٹرن، پوسٹ مین، شاپائف، ہگنگ فیس کے ذریعہ اپنایا گیا) اور **OpenAI ایپس SDK** (چیٹ جی پی ٹی میں بھرپور UI کی توثیق شدہ مانگ، 800M+ صارفین)۔ اینتھروپک، OpenAI، اور MCP-UI تخلیق کاروں نے ان نمونوں کو معیاری بنانے کے لیے تعاون کیا۔

**OpenAI ایپس SDK: آج کی تقسیم** جبکہ MCP ایپس ایکسٹینشن پروٹوکول کو معیاری بناتا ہے، OpenAI کا ایپس SDK 800+ ملین ChatGPT صارفین کو **فوری تقسیم** فراہم کرتا ہے۔

| پہلو | تفصیلات |
|--------|---------|
| **یہ کیا ہے** | MCP ٹولز + کسٹم UI + چیٹ جی پی ٹی انضمام |
| **کس کو رسائی ملتی ہے** | کاروبار، انٹرپرائز، ایجوکیشن ٹائرز |
| **پلیٹ فارم کیا سنبھالتا ہے** | بلنگ، دریافت، صارف کا حصول |

**مارکیٹ پلیس منیٹائزیشن:** چار آمدنی کے ماڈل یاد ہیں؟ ایپس SDK **مارکیٹ پلیس** کا راستہ کھولتا ہے: 800M+ ChatGPT صارفین، کم کسٹمر کے حصول کی لاگت، پلیٹ فارم بلنگ، حجم کا کھیل (چند بڑے معاہدوں کے مقابلے میں بہت سے چھوٹے صارفین)۔

**ابھی بنائیں بمقابلہ بعد میں بنائیں:**

| معیاری | حیثیت | سفارش |
|----------|--------|----------------|
| **ایپس SDK** | پیداوار کے لیے تیار | آج چیٹ جی پی ٹی کی تقسیم کے لیے استعمال کریں۔ |
| **MCP ایپس ایکسٹینشن** | مجوزہ (SEP-1865) | کراس پلیٹ فارم کے مستقبل کے لیے دیکھیں |

**حکمت عملی:** آج تقسیم کے لیے ایپس SDK پر بنائیں۔ کل پورٹیبلٹی کے لیے MCP ایپس ایکسٹینشن کی پیروی کریں۔ بنیاد (MCP) مستحکم ہے۔ انٹرفیس کی پرت معیاری ہو رہی ہے۔

---

## AAIF کے پیچھے کون ہے

پلاٹینم کی رکنیت ٹیکنالوجی کے بنیادی ڈھانچے کے کون کون کی طرح پڑھتی ہے:

| کمپنی | وہ کیا لاتے ہیں۔ |
|---------|-----------------|
| ایمیزون ویب سروسز | کلاؤڈ انفراسٹرکچر |
| اینتھروپک | کلاڈ AI، MCP |
| بلاک | گوز، اسکوائر |
| بلومبرگ | مالیاتی ڈیٹا |
| کلاؤڈ فلیئر | ایج کمپیوٹنگ |
| گوگل | جیمنی AI |
| مائیکروسافٹ | ایزور، گٹ ہب |
| اوپن اے آئی | چیٹ جی پی ٹی، AGENTS.md |

گولڈ ممبرز میں سیلز فورس، شاپائف، سنو فلیک، آئی بی ایم، اوریکل، جیٹ برینز، ڈوکر، اور 20+ دیگر شامل ہیں۔

مسابقتی کلاؤڈ فراہم کنندگان، AI لیبز، اور سافٹ ویئر کمپنیوں کی وسیع حمایت ایک اہم تبدیلی کا اشارہ دیتی ہے: صنعت اس بات پر متفق ہے کہ ملکیتی لاک ان اپنانے میں ایک رکاوٹ ہے۔ کھلے معیارات پورے ماحولیاتی نظام کو تیز کریں گے۔

---

## نتیجہ: پورٹیبلٹی کی طاقت

پانچ AAIF معیارات تکنیکی تفصیلات سے زیادہ ہیں۔ وہ ایک نئے کاروباری ماڈل کی بنیاد ہیں جہاں مہارت خود ایک پورٹیبل، قابل فروخت اثاثہ ہے۔

ایک بار بنائیں، کہیں بھی تعینات کریں۔

یہ وعدہ ہے۔ اس کتاب کا باقی حصہ آپ کو اسے پورا کرنے کا طریقہ سکھاتا ہے۔
|------------|---------------|---------------------|
| Tool integrations | MCP | Connect once, sell to any client |
| Domain expertise | Agent Skills | License to clients on any platform |
| Client adaptability | AGENTS.md | Deploy without per-client customization |
| Architecture confidence | goose | Production patterns from enterprise scale |
| Interface reach | MCP Apps + Apps SDK | Distribute to 800M+ ChatGPT users, cross-platform tomorrow |

**This is infrastructure that scales revenue.**

When you sell a Digital SDR subscription for $1,500/month, AAIF standards ensure:
- It connects to **any** CRM (not just Salesforce) via MCP
- It works with **any** AI platform (not just Claude) via portable standards
- It adapts to **any** client's workflow (not just yours) via AGENTS.md
- It shows **rich interfaces** (not just chat) via MCP Apps
- You can **distribute widely** (800M+ ChatGPT users) via Apps SDK

That's the difference between a demo you can show and a product you can sell.

---

## The Investment Case

Learning these standards isn't optional if you're serious about the Agent Factory vision:

**Without AAIF knowledge:**
- You build agents that work only with your preferred platform
- Each new client means potential rebuilding
- Your expertise is trapped, not portable
- Switching AI providers means starting over

**With AAIF knowledge:**
- Your integrations work across all major platforms
- Client diversity becomes a strength, not a burden
- Your expertise compounds across every agent you build
- Provider switches are configuration changes, not rewrites

The skills you develop in this lesson—understanding MCP, AGENTS.md, goose, Skills, and how they fit together—pay dividends across every Digital FTE you create.

---

## Try With AI

Use your AI companion (Claude, ChatGPT, Gemini, or similar) to deepen your understanding:

### Prompt 1: Standards Mapping Exercise

```
I'm building a Digital [your role] that needs to work across multiple AI platforms and client environments.

For each capability I need, tell me:
1. Which AAIF standard applies? (MCP / AGENTS.md / Skills / goose patterns / MCP Apps)
2. Why that standard?
3. What would happen if I tried to build it WITHOUT that standard?

My capabilities:
- Connect to [tool 1, e.g., Salesforce CRM]
- Connect to [tool 2, e.g., Gmail for email]
- Know the best practices for [domain expertise]
- Adapt to each client's coding conventions
- Show [specific UI, e.g., pipeline dashboard with charts]
- Handle payment processing via Stripe
```

**What you're learning:** Architectural decision-making. The ability to map requirements to the right standard prevents over-engineering and under-delivering. You're learning to think like a systems architect.

### Prompt 2: AGENTS.md Design

```
I'm setting up a project for [your domain] with these characteristics:
- [Tech stack 1, e.g., TypeScript with strict mode]
- [Testing framework, e.g., Jest not Mocha]
- [Build system, e.g., pnpm workspaces]
- [Specific conventions, e.g., conventional commits, no console.log]

Help me create an AGENTS.md that covers:
1. Build and test commands (the exact commands)
2. Code style guidelines (specific rules, not vague principles)
3. Security considerations (what to never do)
4. Architecture patterns (where code goes)

Make it specific enough that an AI agent could follow it precisely without asking clarifying questions.
```

**What you're learning:** Specification writing. Good AGENTS.md files are precise and actionable—skills that transfer to writing specs for Digital FTEs. You're learning to encode knowledge that scales.

### Prompt 3: Skills + MCP Integration Design

```
I have expertise in [your domain]. I want to build a Skill that an agent can load, but it needs to connect to external tools.

Help me think through:
1. What goes in the SKILL.md? (The expertise: when to use, how to execute, output format)
2. What MCP servers would the skill need? (The connectivity: what tools to call)
3. How do they work together? (The integration: skill orchestrates MCP tools)

Example: For a "payment processing" skill:
- SKILL.md: Knows retry logic, error recovery, when to refund
- MCP: Stripe connector (create charges, list transactions, refund)
- Together: Skill decides WHAT to do, MCP provides HOW to do it

Apply this pattern to my domain.
```

**What you're learning:** System integration. Understanding the distinction between expertise (Skills) and connectivity (MCP) is the key to architecting capable Digital FTEs. You're learning to design systems where separate components combine to create intelligence.