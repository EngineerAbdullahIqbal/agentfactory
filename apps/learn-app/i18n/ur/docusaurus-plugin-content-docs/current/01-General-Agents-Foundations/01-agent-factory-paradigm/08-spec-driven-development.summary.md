### بنیادی تصور
Spec-Driven Development (SDD) ایک طریقہ کار ہے جہاں آپ کوڈ لکھنے سے پہلے مکمل specifications لکھتے ہیں، پھر AI agents ان specifications کے خلاف implement کرتے ہیں جبکہ آپ design, architecture, اور validation پر توجہ دیتے ہیں۔ بنیادی مساوات: مبہم آئیڈی + AI = 5+ iterations غلط ہم آہنگی کی؛ واضح specification + AI = 1-2 iterations بہتری کے۔ bottleneck implementation سے specification quality کی طرف منتقل ہو گیا ہے۔

### اہم ذہنی ماڈلز
- **SDD چھ مرحلے کا Workflow**: Specify (کیا/کیوں کی تعریف کریں) -> Clarify (مبہمیت دور کریں) -> Plan (کیسے ڈیزائن کریں) -> Tasks (کام کو تقسیم کریں) -> Implement (AI execute کرتا ہے) -> Validate (معیار کی تصدیق کریں)۔ ہر مرحلہ اگلے شروع ہونے سے پہلے مبہمیت دور کرتا ہے۔
- **چار Specification Qualities**: Clarity (کوئی مبہمیت نہیں -- قابل پیمائش، مبہم نہیں)، Completeness (تمام منظرنامے احاطہ شدہ -- functional, non-functional, integration)، Constraints (واضح حدود -- technical, business, design)، Testability (ہر معیار قابل تصدیق -- مقدار میں، ذاتی رائے نہیں)۔
- **SDD بمقابلہ Vibe Coding**: SDD 20% وقت specifying اور 80% building میں لگاتا ہے؛ Vibe Coding 80% coding اور 20% fixing میں گزارتا ہے۔ SDD پیچیدہ سسٹمز تک scale ہوتا ہے؛ Vibe Coding 1,000 لائنز سے آگے ٹوٹ جاتا ہے۔
- **AI Implementation کے دوران نہیں Planning کے دوران پوچھتا ہے**: SDD کے ساتھ، واضح کرنے والے سوالات Clarify مرحلے میں ہوتے ہیں۔ SDD کے بغیر، AI کو implementation کے دوران requirements کا اندازہ لگانا پڑتا ہے، جس سے misalignment iterations ہوتے ہیں۔
- **SDD Depth کے لیے Decision Framework**: Full SDD (production features, complex systems, security-critical)، Lightweight SDD (simple utilities, prototypes, اچھی طرح سمجھے گئے patterns)، Skip SDD (learning experiments, throwaway code, معمولی تبدیلیاں)۔

### اہم حقائق
- **Specification کے چار عناصر ہیں**: Intent (یہ کیوں موجود ہے)، Success Criteria (درست کیا لگتا ہے)، Constraints (موجودہ حدود)، Non-Goals (ہم کیا نہیں بنا رہے)
- **Quality gate phases**: چھ میں سے ہر مرحلے کے پاس اگلے مرحلے پر جانے سے پہلے واضح pass/fail criteria ہیں
- **ڈیولپر A بمقابلہ B موازنہ**: ڈیولپر A (code-first) 3 مہینے edge cases کو debug کرنے میں گزارتا ہے؛ ڈیولپر B (spec-first) کے پاس 2 ہفتوں میں مکمل tested implementation ہوتا ہے اور مہینے 2-3 میں features بناتا ہے
- **Vibe Coding کے لیے کام کرتا ہے**: نئے frameworks سیکھنا، throwaway code کا prototyping، 50 لائنز سے کم simple scripts
- **SDD کے لیے ضروری ہے**: Production features, multi-component systems, security/compliance requirements, AI-assisted development, team projects
- **Task sizing rule**: کوئی بھی ایک ٹاسک 2 گھنٹے کے کام سے زیادہ نہیں ہونا چاہیے

### اہم پیٹرنز
- Specification دستاویز کی ساخت: Intent (صارف کا مسئلہ حل شدہ) -> Success Criteria (قابل پیمائش نتائج) -> Constraints (performance, security, compliance, scale) -> Non-Goals (واضح scope boundaries جو creep کو روکتی ہیں)
- Clarify مرحلہ unknowns کو مہنگا ہونے سے پہلے پکڑتا ہے: edge cases, integration points, error handling کی تفصیلات، business logic مبہمیت
- Plan میں architecture, dependency sequence, testing strategy, اور rationale کے ساتھ documented tradeoffs شامل ہیں
- Validation تصدیق کرتا ہے کہ implementation تمام success criteria, constraints, edge cases, اور quality gates میں specification سے مطابقت رکھتا ہے

### عام غلطیاں
- کوڈ کے بعد spec لکھنا (specification کو retrospective documentation میں بدل دیتا ہے بجائے اس guide کے جو implementation quality کو چلاتا ہے)
- "user-friendly" یا "good performance" جیسے مبہم success criteria کا استعمال بجائے قابل پیمائش criteria کے جیسے "95th percentile response time < 200ms" یا "نئے صارفین < 60 سیکنڈ میں مکمل کریں"
- Non-Goals کو چھوڑنا (واضح scope boundaries کے بغیر، ہر بات چیت "کیا ہم X شامل کریں؟" بن جاتی ہے جو scope creep کی طرف لے جاتی ہے)
- specs کو static دستاویزات کے طور پر سلوک کرنا بجائے living artifacts کے جو requirements تبدیل ہونے پر اپ ڈیٹ ہوتے ہیں (spec-implementation drift دونوں کو غیر قابل بھروسہ بناتا ہے)

### کنکشنز
- **بنیاد**: orchestrator کردار (سبق 2) جہاں specification writing بنیادی مہارت ہے؛ Nine Pillars (سبق 6) جہاں SDD ستون 7 ہے جو سب کو orchestrate کرتا ہے؛ AIDD خصوصیات (سبق 6) بشمول Specification-Driven, Quality-Gated, اور Human-Verified
- **راستہ**: Synthesis سبق (سبق 8) جہاں SDD کو قابل بھروسہ Digital FTE delegation کو ممکن بنانے والے طریقہ کار کے طور پر رکھا گیا ہے؛ بعد کے ابواب میں عملی SDD workflows جہاں طلباء حقیقی features پر چھ مراحل execute کرتے ہیں
