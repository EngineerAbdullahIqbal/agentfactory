---
title: "پانچ طاقتیں اور جدید AI اسٹیک"
chapter: 1
lesson: 4
duration_minutes: 30
sidebar_position: 4

# HIDDEN SKILLS METADATA
skills:
  - name: "Understanding the UX→Intent Paradigm Shift"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Digital Literacy"
    measurable_at_this_level: "طالب علم نیویگیشن پر مبنی انٹرفیس سے گفتگو پر مبنی ارادے میں منتقلی کی وضاحت کرسکتا ہے اور ان ورک فلو کی نشاندہی کرسکتا ہے جو ایجنٹک AI سے فائدہ اٹھاتے ہیں۔"

  - name: "Identifying the Five Powers of AI Agents"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Analyze"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "طالب علم حقیقی نظاموں میں ایجنٹ کی صلاحیتوں (دیکھیں، سنیں، استدلال کریں، عمل کریں، یاد رکھیں) کو پہچان اور درجہ بندی کرسکتا ہے اور وضاحت کرسکتا ہے کہ وہ خود مختار آرکیسٹریشن کو فعال کرنے کے لیے کیسے یکجا ہوتے ہیں۔"

  - name: "Understanding the Three-Layer AI Development Architecture"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "طالب علم جدید AI اسٹیک کی تین پرتوں کی نشاندہی اور وضاحت کرسکتا ہے: فرنٹیئر ماڈلز، AI-فرسٹ IDEs، اور ترقیاتی ایجنٹس، نیز باہمی تعاون کے معیار کے طور پر MCP کا کردار۔"

learning_objectives:
  - objective: "Understand the paradigm shift from User Interface (navigation-based) to User Intent (conversation-based) interaction"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Explanation comparing traditional UX workflows versus agentic intent-driven workflows with concrete examples"

  - objective: "Identify the Five Powers (See, Hear, Reason, Act, Remember) and explain how they combine to enable autonomous orchestration"
    proficiency_level: "A2"
    bloom_level: "Analyze"
    assessment_method: "Analysis of real agentic systems to categorize capabilities by the Five Powers framework"

  - objective: "Recognize the three layers of the modern AI stack and describe what each layer provides"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Classification of AI tools (models, IDEs, agents) into appropriate stack layers with explanation of their roles"

  - objective: "Understand how Model Context Protocol enables tool interoperability and prevents vendor lock-in"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Explanation of MCP as universal standard connecting agents to data/services, analogous to USB for computing"

# Cognitive load tracking
cognitive_load:
  new_concepts: 9
  assessment: "9 تصورات (UX→ارادے کی تبدیلی، پانچ طاقتیں، پیش گوئی→جنریٹو→ایجنٹک ارتقاء، 3-پرت اسٹیک، MCP) 10 تصورات کی A2 حد کے اندر۔ فریم ورک-بھاری لیکن منطقی طور پر منسلک۔ ✓"

# Differentiation guidance
differentiation:
  extension_for_advanced: "ایک پیچیدہ ایجنٹک نظام (جیسے کلاڈ کوڈ یا کسٹمر سروس AI) کا تجزیہ کریں تاکہ تمام پانچ طاقتوں کا نقشہ بنایا جاسکے اور یہ شناخت کی جاسکے کہ اس کے استعمال کے معاملے کے لیے کون سی طاقتیں سب سے اہم ہیں؛ پھر تحقیق کریں کہ MCP اس نظام کے لیے کسٹم انضمام کو کیسے فعال کرتا ہے۔"
  remedial_for_struggling: "ایک ٹھوس موازنہ پر توجہ دیں: روایتی ویب سائٹ کے ذریعے ہوٹل کی بکنگ (14 اقدامات) بمقابلہ ایجنٹک AI (3 تبادلے)، پھر ایجنٹک ورژن میں ہر عمل کو پانچ طاقتوں پر نقشہ بنائیں۔"

teaching_guide:
  lesson_type: "بنیادی"
  session_group: 2
  session_title: "ایجنٹ کی صلاحیتیں اور معیارات"
  key_points:
    - "The Five Powers (See, Hear, Reason, Act, Remember) become a reusable analysis tool — students should be able to decompose any agentic system into these five capabilities"
    - "The hotel booking comparison (14 manual steps vs 3 exchanges) is the most concrete demonstration of UX→Intent — use it as the lesson's anchor example"
    - "MCP is the 'USB cable' and Skills are the 'App' — this analogy is critical for Lesson 5 where AAIF standards are covered in depth"
    - "The three-layer stack (Frontier Models → AI-First IDEs → Agent Skills) explains how the entire agentic ecosystem is composed"
  misconceptions:
    - "Students think Five Powers means the agent must have ALL five to be useful — many effective agents only use 2-3 powers (e.g., Claude Code primarily uses Reason + Act)"
    - "Students confuse 'Remember' with LLM memory — Remember is an application-level capability (stored preferences, history), not model memory (which is stateless per Lesson 2)"
    - "Students think MCP is a product — MCP is a protocol/standard (like HTTP), not a tool you download and install"
  discussion_prompts:
    - "Which of the Five Powers do you think is hardest to implement well — and which creates the most value when done right?"
    - "If you removed the 'Remember' power from the hotel booking agent, how would the experience change for a returning customer?"
    - "Why did the industry converge on MCP as a standard rather than letting each AI company build their own connector system?"
  teaching_tips:
    - "Start with the 14-step hotel booking — have students count the steps in a workflow they do regularly, then reimagine it as 2-3 intent exchanges"
    - "When teaching the Five Powers, map them onto Claude Code as a familiar reference: See (reads screenshots), Reason (OODA from Lesson 3), Act (writes files, runs tests), Remember (AGENTS.md)"
    - "The Predictive→Generative→Agentic evolution in Part 4 is a three-sentence summary worth repeating: Netflix predicts, ChatGPT generates, Claude Code acts"
    - "Emphasize that the 2024 vs 2026 comparison table (Tool Silos vs Modular Stack) shows how fast the industry moved — students are learning current-state, not history"
  assessment_quick_check:
    - "Have students name all Five Powers from memory and give one example for each"
    - "Ask: 'What is the difference between MCP and Agent Skills?' — expects the hands vs training analogy"
    - "Ask students to identify which layer of the AI stack their current tools belong to"

# Generation metadata
generated_by: "مواد-نافذ کرنے والا v2.0.0 (حصہ 1 کا استحکام)"
source_spec: "حصہ 1 کا استحکام: 4 ابواب (32 اسباق) → 1 باب (8 اسباق)"
created: "2025-01-22"
git_author: "کلاڈ کوڈ"
workflow: "سبق کا استحکام (اسباق 07 + 08 → 03)"
version: "1.0.0"

# Legacy compatibility (Docusaurus)
prerequisites:
  - "Understanding of basic AI concepts (from Lesson 1-2)"
  - "Familiarity with traditional software interfaces"
---

# پانچ طاقتیں اور جدید AI اسٹیک

انسان سافٹ ویئر کے ساتھ کیسے تعامل کرتے ہیں اس میں کچھ بنیادی تبدیل ہو رہا ہے۔ دہائیوں تک، ہم نے انٹرفیس — بٹن، مینو، فارم — بنائے اور صارفین کو ان کو نیویگیٹ کرنے کی تربیت دی۔ کامیابی کا مطلب انٹرفیس کو "بدیہی" بنانا تھا۔ لیکن کیا ہوگا اگر انٹرفیس مکمل طور پر غائب ہوجائے؟ کیا ہوگا اگر صارفین صرف یہ بتائیں کہ وہ کیا چاہتے ہیں، اور سافٹ ویئر یہ معلوم کرے کہ اسے کیسے کرنا ہے؟

یہ تبدیلی ممکن ہے کیونکہ AI تین مراحل سے گزرا ہے: **پیش گوئی کرنے والا AI** (ڈیٹا سے پیشن گوئی)، **جنریٹو AI** (مواد تخلیق کرنا)، اور اب **ایجنٹک AI** (خود مختار عمل)۔ ایجنٹک دور پانچ صلاحیتوں — **پانچ طاقتیں** — کو ایک ماڈیولر **تین پرتوں والے اسٹیک** کے ساتھ جوڑتا ہے جو ساخت کو ممکن بناتا ہے۔ موثر AI نظام بنانے کے لیے صلاحیتوں (ایجنٹ کیا کرسکتے ہیں) اور فن تعمیر (وہ کیسے بنائے جاتے ہیں) دونوں کو سمجھنا ضروری ہے۔

یہ سبق دو بنیادی فریم ورک کو متحد کرتا ہے: **پانچ طاقتیں** جو خود مختار آرکیسٹریشن کو فعال کرتی ہیں، اور **جدید AI اسٹیک** جو تکنیکی بنیاد فراہم کرتا ہے۔ مل کر، وہ دونوں کی وضاحت کرتے ہیں کہ *کیوں* UX→ارادے کی تبدیلی اب ہو رہی ہے اور *کیسے* ایسے نظام بنائے جائیں جو اس کا فائدہ اٹھائیں۔

---

## حصہ 1: صارف انٹرفیس سے صارف کے ارادے تک

روایتی سافٹ ویئر کا تعامل اس ماڈل کی پیروی کرتا ہے:

**صارف → انٹرفیس → عمل**

- **صارفین واضح انٹرفیس (مینو، بٹن، فارم) کے ذریعے نیویگیٹ کرتے ہیں۔**
- **ہر عمل کے لیے دستی آغاز کی ضرورت ہوتی ہے** (کلک، ٹائپ، جمع کروائیں)
- **ورک فلو تجویز کیے گئے ہیں** (مرحلہ 1 → مرحلہ 2 → مرحلہ 3)
- **صارفین کو معلوم ہونا چاہئے کہ کہاں جانا ہے اور کیا کلک کرنا ہے۔**
- **انٹرفیس ارادے اور عمل درآمد کے درمیان رکاوٹ ہے۔**

### مثال: ہوٹل کی بکنگ (روایتی UX)

آئیے دیکھتے ہیں کہ یہ عملی طور پر کیسا لگتا ہے:

1. ٹریول ویب سائٹ کھولیں۔
2. نیویگیشن مینو میں "ہوٹلز" پر کلک کریں۔
3. تلاش کے خانے میں منزل کا شہر درج کریں۔
4. کیلنڈر چنندہ سے چیک ان کی تاریخ منتخب کریں۔
5. کیلنڈر چنندہ سے چیک آؤٹ کی تاریخ منتخب کریں۔
6. "تلاش" بٹن پر کلک کریں۔
7. 50+ ہوٹلوں کی فہرست کا جائزہ لیں۔
8. ترجیحی ہوٹل پر کلک کریں۔
9. ڈراپ ڈاؤن سے کمرے کی قسم منتخب کریں۔
10. "ابھی بک کریں" پر کلک کریں۔
11. مہمانوں کی معلومات کا فارم بھریں (8 فیلڈز)
12. ادائیگی کا فارم بھریں (16 فیلڈز)
13. "بکنگ کی تصدیق کریں" پر کلک کریں۔
14. ای میل کی تصدیق کا انتظار کریں۔

**کل: 14 دستی اقدامات**، ہر ایک کے لیے صارف کو یہ جاننے کی ضرورت ہوتی ہے کہ آگے کیا کرنا ہے۔

**ڈیزائن کا چیلنج**: ان 14 اقدامات کو ہموار محسوس کریں۔ رگڑ کو کم کریں۔ بٹن کی جگہ کو بہتر بنائیں۔ فارم فیلڈز کو کم سے کم کریں۔ A/B ٹیسٹ چیک آؤٹ فلو۔

**یہ "صارف انٹرفیس کی سوچ" ہے**: صارف کو ڈویلپرز کے ڈیزائن کردہ انٹرفیس کو نیویگیٹ کرنا ہوگا۔

### نیا پیراڈائم: صارف کا ارادہ

اب ایک بنیادی طور پر مختلف ماڈل پر غور کریں:

**صارف کا ارادہ → ایجنٹ → آرکیسٹریٹڈ اعمال**

- **صارفین بات چیت میں ارادہ بیان کرتے ہیں** ("مجھے منگل کی رات شکاگو میں ایک ہوٹل کی ضرورت ہے")
- **AI ایجنٹ خود مختار طور پر کام کرتے ہیں** (تلاش، موازنہ، کتاب، تصدیق)
- **ورک فلو انکولی ہیں** (ایجنٹ ترجیحات کو یاد رکھتا ہے، ضروریات کا اندازہ لگاتا ہے)
- **صارفین بیان کرتے ہیں کہ وہ کیا چاہتے ہیں؛ ایجنٹ معلوم کرتے ہیں کہ کیسے۔**
- **گفتگو نیویگیشن کی جگہ لیتی ہے۔**

### مثال: ہوٹل کی بکنگ (ایجنٹک UX)

ایک ہی مقصد، مختلف طریقے سے حاصل کیا گیا:

**صارف**: "مجھے اگلے منگل کی رات شکاگو میں ایک کلائنٹ میٹنگ کے لیے شہر کے مرکز میں ایک ہوٹل کی ضرورت ہے۔"

**ایجنٹ**: "شہر کے مرکز کے قریب 3 اختیارات ملے۔ آپ کی ترجیحات کی بنیاد پر، میں ہلٹن گارڈن ان کی سفارش کرتا ہوں — پرسکون منزل دستیاب ہے، $189/رات، مفت ناشتہ۔ آپ کا معمول کا کنگ بیڈ غیر تمباکو نوشی کا کمرہ؟"

**صارف**: "ہاں، اسے بک کرو۔"

**ایجنٹ**: "ہو گیا۔ آپ کے ای میل پر تصدیق بھیج دی گئی۔ کیلنڈر میں شامل کردیا گیا۔ منگل صبح 8 بجے اوہیر کے لیے اوبر شیڈول ہے۔ اور کچھ چاہیے؟"

**کل: 3 بات چیت کے تبادلے** 14 دستی اقدامات کی جگہ۔

**ایجنٹ نے خود مختار طور پر کیا کیا:**
- ✅ صارف کی ترجیحات کو یاد رکھا (پرسکون کمرے، کنگ بیڈ، غیر تمباکو نوشی)
- ✅ نقل و حمل کی ضرورت کا اندازہ لگایا (بغیر پوچھے اوبر شیڈول کیا)
- ✅ خود بخود کیلنڈر کے ساتھ مربوط
- ✅ سیاق و سباق کو سمجھا (کلائنٹ میٹنگ = کاروباری ضلع کا مقام)

**یہ "صارف کے ارادے کی سوچ" ہے**: صارف اہداف کا اظہار کرتا ہے؛ ایجنٹ عمل درآمد کو ترتیب دیتا ہے۔

---

## حصہ 2: AI ایجنٹوں کی پانچ طاقتیں

ایجنٹک AI اس تبدیلی کو پورا کرسکتا ہے کیونکہ اس کے پاس پانچ بنیادی صلاحیتیں ہیں جو، جب مل جاتی ہیں، تو خود مختار آرکیسٹریشن کو فعال کرتی ہیں:

### 1. 👁️ دیکھیں — بصری تفہیم

**اس کا کیا مطلب ہے:**
- تصاویر، اسکرین شاٹس، دستاویزات، ویڈیوز پر کارروائی کریں۔
- بصری سیاق و سباق سے معنی نکالیں۔
- انٹرفیس کو "دیکھ کر" نیویگیٹ کریں۔
- خاکوں اور بصری ڈیٹا کو سمجھیں۔

**مثال:**
- مسائل کو ڈیبگ کرنے کے لیے کلاڈ کوڈ کی غلطی کے اسکرین شاٹس کو پڑھنا۔
- AI انوائسز اور رسیدوں سے ڈیٹا نکال رہا ہے۔
- ایجنٹ اسکرین پر بصری طور پر ان کا پتہ لگا کر بٹن پر کلک کر رہے ہیں۔

### 2. 👂 سنیں — آڈیو پروسیسنگ

**اس کا کیا مطلب ہے:**
- بولی جانے والی درخواستوں کو سمجھیں (وائس انٹرفیس)
- گفتگو کو نقل اور تجزیہ کریں۔
- جذبات اور لہجے کا پتہ لگائیں۔
- آڈیو کو حقیقی وقت میں پروسیس کریں۔

**مثال:**
- وائس اسسٹنٹس قدرتی تقریر کو سمجھتے ہیں۔
- میٹنگ کی نقل اور خلاصہ
- کسٹمر سروس AI لہجے میں مایوسی کا پتہ لگا رہی ہے۔

### 3. 🧠 استدلال — پیچیدہ فیصلہ سازی

**اس کا کیا مطلب ہے:**
- تجارت اور رکاوٹوں کا تجزیہ کریں۔
- سیاق و سباق سے آگاہ فیصلے کریں۔
- کثیر مرحلہ استدلال کی زنجیر (اگر X، تو Y، تو Z)
- نتائج سے سیکھیں۔

**مثال:**
- ایجنٹ قیمت، مقام اور ترجیحات کی بنیاد پر بہترین ہوٹل کا انتخاب کرتا ہے۔
- AI غلطی کی وجوہات کے ذریعے استدلال کرکے کوڈ کو ڈیبگ کرتا ہے۔
- مالیاتی ایجنٹ سرمایہ کاری کے مواقع کا جائزہ لے رہے ہیں۔

### 4. ⚡ عمل — عمل درآمد اور ترتیب

**اس کا کیا مطلب ہے:**
- APIs کو کال کریں اور خود مختار طور پر ٹولز استعمال کریں۔
- متعدد نظاموں میں اعمال انجام دیں۔
- پیچیدہ ورک فلو کو مربوط کریں۔
- جب چیزیں ناکام ہوجائیں تو دوبارہ کوشش کریں اور ڈھالیں۔

**مثال:**
- کلاڈ کوڈ فائلیں لکھنا، ٹیسٹ چلانا، گٹ سے وابستہ ہونا۔
- ٹریول ایجنٹ پروازیں اور ہوٹل بک کر رہے ہیں۔
- ای کامرس ایجنٹ آرڈرز پر کارروائی کر رہے ہیں اور ترسیل کو ٹریک کر رہے ہیں۔

### 5. 💾 یاد رکھیں — سیاق و سباق کو برقرار رکھیں اور سیکھیں۔

**اس کا کیا مطلب ہے:**
- صارف کی ترجیحات اور تاریخ کو ذخیرہ کریں۔
- پچھلی بات چیت کو یاد کریں۔
- وقت کے ساتھ ڈومین کا علم بنائیں۔
- تاثرات کی بنیاد پر رویے کو اپنائیں۔

**مثال:**
- ایجنٹ یاد رکھتا ہے کہ آپ پرسکون ہوٹل کے کمرے پسند کرتے ہیں۔
- AI اسسٹنٹس پچھلی گفتگو کا حوالہ دے رہے ہیں۔
- ذاتی AI آپ کے مواصلاتی انداز کو سیکھ رہا ہے۔

### پانچ طاقتیں کیسے یکجا ہوتی ہیں۔

**انفرادی طور پر**، ہر طاقت مفید لیکن محدود ہے۔

**مشترکہ**، وہ کچھ تبدیلی لانے والی چیز بناتے ہیں: **خود مختار آرکیسٹریشن**۔

**ہوٹل بکنگ کی مثال کا بریک ڈاؤن:**

1. **سنیں**: صارف درخواست بولتا ہے ("مجھے شکاگو میں ایک ہوٹل تلاش کریں")
2. **استدلال**: ضروریات کا تجزیہ کرتا ہے (مقام، وقت، سیاق و سباق)
3. **یاد رکھیں**: صارف کو پرسکون کمرے، کنگ بیڈ، شہر کے مرکز کی قربت پسند ہے۔
4. **عمل**: ہوٹل تلاش کرتا ہے، اختیارات کا موازنہ کرتا ہے، معیار کے لحاظ سے فلٹر کرتا ہے۔
5. **دیکھیں**: ہوٹل کی ویب سائٹس، جائزے، مقام کے نقشے پڑھتا ہے۔
6. **استدلال**: تمام عوامل پر غور کرتے ہوئے بہترین آپشن کا اندازہ لگاتا ہے۔
7. **عمل**: کمرہ بک کرتا ہے، نقل و حمل کا شیڈول بناتا ہے، کیلنڈر کو اپ ڈیٹ کرتا ہے۔
8. **یاد رکھیں**: مستقبل کی بکنگ کو بہتر بنانے کے لیے اس تعامل کو ذخیرہ کرتا ہے۔

**نتیجہ**: ایک کثیر مرحلہ ورک فلو جو خود مختار طور پر ترتیب دیا گیا ہے، سیاق و سباق اور صارف کی ضروریات کے مطابق ڈھال رہا ہے۔


---

## حصہ 3: جدید AI اسٹیک

پانچ طاقتیں وضاحت کرتی ہیں کہ ایجنٹ *کیا* کرسکتے ہیں۔ جدید AI اسٹیک وضاحت کرتا ہے کہ وہ *کیسے* بنائے جاتے ہیں۔ 2026 کے اوائل تک، ہم "اوزار کے ساتھ چیٹ بوٹس" سے **پروٹوکول سے چلنے والے خود مختار کارکنوں** کی طرف منتقل ہوچکے ہیں۔

### پرت 1: فرنٹیئر ماڈلز — استدلال کے انجن

* **کلاڈ 4.5 / GPT-5.2 / Gemini 3:** بنیاد۔ یہ ماڈل اب "مقامی ایجنٹک استدلال" کی خصوصیت رکھتے ہیں، جس سے وہ سادہ کاموں کے لیے الگ آرکیسٹریشن پرت کی ضرورت کے بغیر توقف، سوچنے اور اوزار کال کرنے کی اجازت دیتے ہیں۔

### پرت 2: AI-فرسٹ IDEs — سیاق و سباق کے آرکیسٹریٹرز

* **کرسر / ونڈ سرف / VS کوڈ:** یہ ٹولز اب صرف آپ کا کوڈ "دیکھتے" نہیں ہیں؛ وہ **اسکل ہوسٹ** کے طور پر کام کرتے ہیں۔ وہ وہ ماحول ہیں جہاں ماڈل، ٹولز، اور مقامی فائل سسٹم ملتے ہیں۔

### پرت 3: ایجنٹ کی مہارتیں — خود مختار کارکن

یہ سب سے اہم تبدیلی ہے۔ "کسٹم ایجنٹس" کے بجائے، اب ہم **ماڈیولر اسکلز** بناتے ہیں۔

**ایجنٹ اسکلز اسٹینڈرڈ (`agentskills.io`) کیا فراہم کرتا ہے:**

* **ترقی پسند انکشاف:** ایک ایجنٹ کو ایک ساتھ 1,000 صفحات کی دستاویزات پڑھنے کی ضرورت نہیں ہے۔ یہ پہلے "اسکل میٹا ڈیٹا" (نام اور تفصیل) پڑھتا ہے۔ یہ صرف اس وقت مکمل ہدایات اور اسکرپٹس "لوڈ" کرتا ہے جب کام خاص طور پر ان کی ضرورت ہو۔
* **مہارت کی پورٹیبلٹی:** ایک "SQL ماہر" مہارت جو آپ **کلاڈ کوڈ** کے لیے لکھتے ہیں وہ **جیمنی CLI** یا **OpenAI کوڈیکس** میں فوری طور پر کام کرتی ہے۔
* **طریقہ کار کا علم:** مہارتیں `SKILL.md` فائل پر مشتمل سادہ فولڈرز کے طور پر ذخیرہ کی جاتی ہیں۔ وہ ایجنٹ کو بتاتے ہیں کہ *کیسے* کام کرنا ہے (مثال کے طور پر، "گوگل اسٹائل گائیڈ کے بعد اس PR کا جائزہ لیں")۔

**2026 کی منطق:**

* **MCP** = "USB کیبل" (ایجنٹ کو آپ کے ڈیٹا بیس/سلیک/جیرا سے جوڑتا ہے)۔
* **ایجنٹ کی مہارتیں** = "ایپ" (ایجنٹ کو سکھاتا ہے کہ *کیسے* اس کنکشن کو ایک مقصد حاصل کرنے کے لیے استعمال کیا جائے)۔


---

### ماڈل سیاق و سباق پروٹوکول (MCP): یونیورسل کنیکٹر

اس اسٹیک میں ہر چیز **MCP** کے ذریعے ایک ساتھ رکھی گئی ہے۔ 2026 میں، ہم "پلگ ان" کے دور سے گزر کر "پروٹوکول" کے دور میں داخل ہوچکے ہیں۔

> **2026 کی پیش رفت: دو طرفہ نمونے لینا**
> 2025 کے آخر میں MCP میں ایک بڑی تازہ کاری نے **سیمپلنگ** متعارف کرایا۔ یہ ایک MCP سرور (جیسے آپ کا ڈیٹا بیس) کو اصل میں LLM سے ایک سوال "پوچھنے" کی اجازت دیتا ہے۔ مثال کے طور پر: ایک ڈیٹا بیس سرور اب ماڈل سے پوچھ سکتا ہے، *"میں یہ اسکیم دیکھ رہا ہوں؛ کیا مجھے موجودہ استفسار کے لیے اس مخصوص انڈیکس کو بہتر بنانا چاہئے؟"* نتائج واپس کرنے سے پہلے۔

| فیچر | 2024 (پری-MCP) | 2026 (جدید AI اسٹیک) |
| --- | --- | --- |
| **انضمام** | ہر ٹول کے لیے کسٹم API | معیاری MCP کنیکٹرز |
| **وینڈر لاک ان** | اعلی (ایک ماحولیاتی نظام کے ساتھ پھنس گیا) | صفر (فوری طور پر کلاڈ کے لیے GPT کو تبدیل کریں) |
| **ڈیٹا تک رسائی** | جامد RAG / دستی اپ لوڈز | حقیقی وقت، زیر انتظام نظام تک رسائی |
| **مواصلات** | یک طرفہ (ماڈل → ٹول) | **دو طرفہ** (ٹول ↔ ماڈل) |


---

## حصہ 4: ارتقاء — اب کیوں؟

یہ سمجھنا کہ ہم کہاں ہیں یہ وضاحت کرنے میں مدد کرتا ہے کہ UX→ارادے کی تبدیلی اب کیوں ہو رہی ہے۔

AI تین مراحل سے گزرا:

### مرحلہ 1: پیش گوئی کرنے والا AI

**اس نے کیا کیا**: نتائج کی پیش گوئی کے لیے تاریخی ڈیٹا کا تجزیہ کیا۔

**حد**: صرف پیش گوئی کرسکتا تھا، تخلیق یا عمل نہیں کرسکتا تھا۔

**مثال**: نیٹ فلکس دیکھنے کی تاریخ کی بنیاد پر فلموں کی سفارش کرتا ہے۔

### مرحلہ 2: جنریٹو AI

**یہ کیا کرتا ہے**: نمونوں سے نیا مواد تخلیق کرتا ہے۔

**حد**: اشارہ کرنے پر پیدا ہوتا ہے، لیکن کارروائی نہیں کرتا ہے۔

**مثال**: جب آپ پوچھتے ہیں تو چیٹ جی پی ٹی مضامین، کوڈ، یا تخلیقی مواد لکھتا ہے۔

### مرحلہ 3: ایجنٹک AI

**یہ کیا کرتا ہے**: اہداف کے حصول کے لیے خود مختار کارروائی کرتا ہے۔

**پیش رفت**: AI ٹول سے ساتھی کی طرف منتقل ہوتا ہے—جواب دینے سے لے کر ترتیب دینے تک۔

**مثال**: کلاڈ کوڈ فائلوں میں ترمیم کرنا، ٹیسٹ چلانا، تبدیلیاں کرنا *ہر قدم کے لیے پوچھے بغیر*۔

**کلیدی فرق**: پہلے AI کمانڈز کا انتظار کرتا تھا۔ ایجنٹک AI خود مختار طور پر ورک فلو شروع کرتا، مربوط کرتا، اور مکمل کرتا ہے۔

اس ارتقاء نے پانچ طاقتوں کو ایک ساتھ کام کرنے کے لیے کھول دیا، جس سے UX→ارادے کے پیراڈائم کی تبدیلی ممکن ہوئی۔

---

## حصہ 5: 2024 بمقابلہ 2026 کی تبدیلی — سائلوز سے ساخت تک

### 2024: ٹول سائلوز (یک سنگی)

* **بنڈل شدہ صلاحیتیں:** ہر ٹول کا اپنا "پلگ ان" نظام تھا۔ ایک "GPT ایکشن" کلاڈ میں کام نہیں کرتا تھا۔
* **بھاری سیاق و سباق:** آپ کو ہر بار اپنے پرامپٹ میں بڑی ہدایات پیسٹ کرنی پڑتی تھیں تاکہ AI ایک مخصوص ورک فلو کی پیروی کرے۔
* **وینڈر لاک ان:** ایک ایجنٹ سے دوسرے ایجنٹ میں منتقل ہونے کا مطلب اپنے تمام "کسٹم GPTs" کو دوبارہ لکھنا تھا۔

### 2026: ماڈیولر اسٹیک (مرکب)

* **اوپن اسٹینڈرڈز:** انڈسٹری **MCP** اور **agentskills.io** پر اکٹھی ہوگئی ہے۔
* **آن ڈیمانڈ مہارت:** ایجنٹ متحرک طور پر مہارتیں "انسٹال" کرتے ہیں۔ آپ کہہ سکتے ہیں، *"اسٹرائپ-سپورٹ کی مہارت انسٹال کریں،"* اور آپ کا ایجنٹ فوری طور پر کسی گاہک کو رقم کی واپسی کے لیے طریقہ کار کے اقدامات جانتا ہے بغیر آپ اسے سکھائے۔
* **کراس پلیٹ فارم ایجنسی:** آپ اپنی مہارتوں کے مالک ہیں۔ وہ آپ کی ریپو میں `.md` فائلوں کے طور پر رہتے ہیں، جو آپ کے ایجنٹوں کو کسی ایک ماڈل فراہم کنندہ سے آزاد بناتے ہیں۔

---

## حصہ 6: یہ تبدیلی کیوں اہمیت رکھتی ہے۔

ڈیزائن کا چیلنج **"ہم اسے کیسے اشارہ کریں؟"** سے **"ہم مہارت کو کیسے لکھیں؟"** میں منتقل ہوگیا ہے۔

### مہارت کی تبدیلی

| 2024 فوکس (پرامپٹنگ کا دور) | 2026 فوکس (مہارت کا دور) |
| --- | --- |
| **پرامپٹ انجینئرنگ:** لمبے، نازک "سسٹم پرامپٹس" لکھنا۔ | **مہارت کی تصنیف:** واضح YAML میٹا ڈیٹا کے ساتھ منظم `SKILL.md` فائلیں لکھنا۔ |
| **ٹول انٹیگریشن:** ہر پروجیکٹ کے لیے کسٹم API ریپرز لکھنا۔ | **مہارت کی دریافت:** اس بات کو یقینی بنانا کہ ایجنٹ کام کے لیے صحیح "مہارت" تلاش کرسکیں۔ |
| **دستی اصلاح:** AI کو بار بار "نہیں، اسے اس طرح کرو" کہنا۔ | **رکاوٹ انجینئرنگ:** ایک مہارت کے اندر سخت ورک فلو کی وضاحت کرنا جس کی AI *ضرور* پیروی کرے۔ |

**سب سے اہم مہارت: مہارت کا فن تعمیر۔**

2026 میں، اعلیٰ سطح کے ڈویلپرز صرف کوڈ نہیں لکھتے؛ وہ **مہارتیں** لکھتے ہیں جو ایجنٹوں کو کوڈ لکھنے کی اجازت دیتی ہیں۔

* **پہلے:** آپ نے ایک پرامپٹ لکھا: *"براہ کرم غلطیوں کے لیے ڈیٹا بیس چیک کریں۔"*
* **اب:** آپ ایک **ڈیٹا بیس-SRE مہارت** لکھتے ہیں جس میں شامل ہیں:
1. **میٹا ڈیٹا:** "پوسٹگریس کی کارکردگی کی رکاوٹوں کی جانچ کرتے وقت اسے استعمال کریں۔"
2. **منطق:** ایک پائتھون اسکرپٹ جو MCP کنیکٹر کے ذریعے لاگز کھینچتا ہے۔
3. **طریقہ کار:** ان لاگز کی تشریح کرنے کے طریقے کے لیے ایک مرحلہ وار مارک ڈاؤن گائیڈ۔

**نتیجہ:** آپ صرف ایک ایجنٹ کو ایک کام نہیں دے رہے ہیں؛ آپ اسے ایک **مستقل صلاحیت** دے رہے ہیں۔

---

## AI کے ساتھ کوشش کریں۔

ان تصورات کو دریافت کرنے کے لیے اپنے AI ساتھی (کلاڈ کوڈ، چیٹ جی پی ٹی، جیمنی سی ایل آئی) کا استعمال کریں:

### مشق 1: ایک ورک فلو کو ایجنٹک کے طور پر دوبارہ تصور کریں۔

**پرامپٹ:**
```
I want to reimagine a manual workflow as agentic. Here's what I currently do [describe
a multi-step task you do regularly, like expense reporting, email management, project
planning, scheduling, research compilation, etc.].

Help me reimagine this as an agentic experience:
1. What would I say to an agent to express my intent?
2. What would the agent need to understand about my preferences?
3. What actions would it take autonomously?
4. Which of the Five Powers (See, Hear, Reason, Act, Remember) would it use for each action?
5. What would the agent need to remember for next time?

Let's discover together: What makes this agentic vs. just automated?
```

**آپ کیا سیکھ رہے ہیں:** ارادے کی ماڈلنگ — اقدامات اور کلکس کے بجائے اہداف اور سیاق و سباق میں سوچنا، نیز ایجنٹک صلاحیتوں کو پانچ طاقتوں کے فریم ورک پر نقشہ بنانا۔

### مشق 2: حقیقی نظاموں میں پانچ طاقتوں کی نشاندہی کریں۔

**پرامپٹ:**
```
Let's analyze a real agentic system (like Claude Code, a travel booking agent, or
customer service AI). For the system we choose, help me identify concrete examples of
each power:

1. SEE: How does it process visual information?
2. HEAR: How does it understand natural language input?
3. REASON: What decisions does it make autonomously?
4. ACT: What actions can it take across systems?
5. REMEMBER: What context does it maintain?

Then let's discover: How do these five powers COMBINE to enable orchestration? What
would break if one power was missing?

Now map this system to the three-layer AI stack:
- Which frontier model powers it (Layer 1)?
- What environment does it run in (Layer 2)?
- Is it a general agent or a custom agent (Layer 3)?
```

**آپ کیا سیکھ رہے ہیں:** نظام کا تجزیہ — یہ سمجھنا کہ صلاحیتیں ابھرتے ہوئے رویے کو کیسے تخلیق کرتی ہیں، اور صلاحیتوں کو تکنیکی انفراسٹرکچر سے جوڑنا جو انہیں فعال کرتا ہے۔

### مشق 3: اپنے موجودہ ٹولز کو اسٹیک پر نقشہ بنائیں۔

**پرامپٹ:**
```
I want to understand the modern AI stack better. Here's what I currently use:
- [IDE you use: VS Code, Cursor, etc.]
- [AI model: Claude, ChatGPT, Gemini, etc.]
- [Any agents or automation: GitHub Actions, custom scripts, etc.]

Help me map these to the three-layer stack:
- Layer 1: Which frontier models do I use?
- Layer 2: Which AI-first IDEs do I work in?
- Layer 3: Which development agents or automation tools do I use?

Then identify:
1. What gaps exist in my current stack?
2. Where could MCP help me connect tools that don't currently integrate?
3. If I wanted to switch models (e.g., Claude → GPT-5), what would I need to change?

Give me concrete recommendations for improving my stack composition.
```

**آپ کیا سیکھ رہے ہیں:** یہ پہچاننا کہ حقیقی ٹولز تین پرتوں والے فن تعمیر میں کیسے مرتب ہوتے ہیں، یہ شناخت کرنا کہ آپ پہلے سے کون سی پرتیں استعمال کرتے ہیں، اور یہ سمجھنا کہ ماڈیولریٹی لچک کو کیسے فعال کرتی ہے اور وینڈر لاک ان کو روکتی ہے۔
