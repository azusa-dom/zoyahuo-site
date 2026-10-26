// 个人信息与三语文案（中 / 英 / 日）集中放在这里，页面上所有文字都从这个文件来。
// 改文字：直接改下面对应语言的内容。改完运行 tools/make-font.py 更新字体子集，再推送到 main 发布（见 README）。
// links 里留空字符串的项不会显示。

export const PROFILE = {
  name: 'Zoya Huo',
  mega: 'Zoya',     // 首页背景的超大半透明字
  seal: '霍',
  location: 'Manchester / London, UK',
  pipeline: ['cine CMR', 'motion estimation', 'myocardial strain', 'clinical application'],
  links: {
    github: 'https://github.com/azusa-dom',
    email: 'ziying.huo@postgrad.manchester.ac.uk',
    scholar: '',   // Google Scholar 主页
    orcid: 'https://orcid.org/0009-0003-1090-8784',
  },
}

export const LANGS = [['zh', '中'], ['en', 'EN'], ['ja', '日']]
export const HTML_LANG = { zh: 'zh-CN', en: 'en', ja: 'ja' }

export const T = {
  // ───────────────────────────────────────── 中文
  zh: {
    title: 'Zoya Huo',
    desc: 'Zoya Huo：曼彻斯特大学博士生（AI4BioImaging），研究心脏 cine MRI 的心肌运动与区域应变；曾在伦敦担任全栈开发。',
    ui: {
      nav: { home: '首页', about: '关于', research: '研究', contact: '联系' },
      skip: '跳转到个人介绍',
      greeting: '你好，我是 Zoya Huo。',
      slogan: ['写代码，', '也读心脏'],
      lead: ['曼彻斯特大学博士生（AI4BioImaging），', '研究心脏 cine MRI 的运动与应变；', '曾在伦敦担任全栈开发。'],
      primary: '看我的研究', quiet: '关于我',
      role: '博士生 · AI4BioImaging',
      org: 'University of Manchester · Faculty of Biology, Medicine and Health',
      explore: '探索字环',
      caption: '十干十二支 · 循环而生',
      prev: '上一页', next: '下一页', nextHome: '下一页 关于',
      dialog: { title: '十干十二支', hint: '选择一个字，查看传统分类并聚焦字环。', gan: '十天干', zhi: '十二地支', idle: '甲乙丙丁戊己庚辛壬癸，与十二地支顺次配合，组成六十甲子。' },
      langLabel: '语言',
    },
    pages: {
      about: { glyph: '甲', eyebrow: 'About', title: '全栈开发，与医学影像研究。',
        timeline: '履 历', why: '为什么是天干地支', focus: '关键词' },
      research: { glyph: '乙', eyebrow: 'Research', title: '心脏运动与区域应变', projects: '在做的项目', details: '详细说明', q: '问题', how: '做法' },
      contact: { glyph: '丙', eyebrow: 'Contact', title: '联系', lead: '欢迎就心脏影像、应变测量、医学影像 AI 或全栈开发交流。', none: '联系方式待添加。', copy: '复制邮箱', copied: '已复制', copyFail: '请手动选中复制', gmail: 'Gmail 写信', outlook: 'Outlook 写信', mail: '用邮件 App 打开', hint: '点了没反应？多半是电脑上没配邮件 App。复制邮箱，或用网页版写信。', subject: '来自个人主页的留言' },
    },
    figure: { src: 'img/fig1-measurement-chain-20261025.webp', w: 2000, h: 2239, alt: '从常规 cine 图像到区域主张的测量链，以及各类验证目标对应的环节', caption: '图 1　从常规 cine 图像到区域主张，以及验证证据落在哪一环。(a) 测量链：cine 显示清晰的血池–心肌边界，但心肌内部对比很弱，壁内的点对应只能推断；轮廓完全相同（Dice 1、Hausdorff 距离 0）的两种映射可以给出不同的周向伸长，应变值再取决于所声明的定义。(b) 每类验证目标检验链上的哪些环节；在综述涉及的研究中，直接检验局灶属性的很少。示意图：标记位置表达的是综述的论证，不是研究数量或效应量；图中节号指综述正文。cine 帧取自 Stanford Cardiac Performance MRI 公开数据库中的一名健康志愿者（Open Database License v1.0），其余为解析或示意图形。综述 2026 年 10 月定稿，尚未发表。' },
    about: [
      '我在曼彻斯特大学读博士（AI4BioImaging），研究 cine 心脏磁共振的心肌运动估计与区域应变测量。目前在写一篇综述，梳理常规 cine 对区域应变究竟能支持哪些结论。',
      '本科读商业数据分析，在 UCL 读硕士时转向医学影像 AI，之后做过全栈开发。写软件让我习惯追问一个数字是怎么算出来的、换个条件还成立吗，现在我把这个问题问在应变测量上。',
    ],
    projects: [
      { status: '已定稿', title: '综述：从常规 cine 到区域心肌功能异常', en: 'From routine cine CMR to regional myocardial dysfunction', q: '区域异常的哪些属性（幅度、位置、范围、时序），已被证明能从常规 cine 测得足够准确，可用于特定用途？', how: '从影像输入、人群与异常、估计对象、应变定义与汇总、验证目标、报告的误差或关联六个维度比较研究，不做合并估计。2026 年 10 月定稿，尚未发表。' },
      { status: '探索中', title: '区域运动与应变的探索性工程', en: 'Single cases on reference and simulated data', q: '由 cine 推断的区域运动，能对照什么参考来检验？', how: '在公开的 DENSE 参考数据和受控模拟数据上，做单病例、小规模的处理与质控。目前只是工程探索，尚未得出准确性结论。' },
      { status: '待验证', title: '条件可恢复性', en: 'A framework, not yet validated', q: '在声明的条件下，能否对照参考和容差恢复区域应变的幅度、位置、范围与时序？', how: '我提出的验证框架，不是已确立的性质，目前尚未验证。' },
      { status: '候选方向', title: '区域应变的可重复性', en: 'Minimal detectable change in serial imaging', q: '连续随访中，区域应变变化多大才算真的变化？', how: '博士课题尚未确定，这是我在考虑的方向之一：把变异拆到运动估计、应变定义、扫描间差异等环节，估计最小可检出变化。' },
      { status: '候选方向', title: '风湿免疫疾病中的心脏影像', en: 'e.g. axial spondyloarthritis (axSpA)', q: '在中轴型脊柱关节炎（axSpA）等风湿免疫疾病中，常规 cine 能否可靠地反映区域心肌功能的变化？', how: '博士课题尚未确定，这是候选方向之一，和我硕士阶段的 axSpA 研究相连。目前还没有数据或结果。' },
      { status: '已完成', title: '早期骶髂关节炎的 AI 识别', en: 'MSc thesis, UCL', q: '能否用电子病历和 MRI 识别医生肉眼难以发现的早期骶髂关节炎？', how: '两条独立流水线，用 SHAP 与 Grad-CAM 给出依据。影像部分样本量有限，属于方法学验证。', link: { label: 'GitHub · FINAL_AS', href: 'https://github.com/azusa-dom/FINAL_AS' } },
    ],
    timeline: [
      { when: '2026 –', what: '曼彻斯特大学 · 博士生', where: 'Manchester',
        detail: 'Faculty of Biology, Medicine and Health，生物医学影像科学（AI4BioImaging 方向）。研究 cine 心脏磁共振的心肌运动估计与区域应变测量，从影像对应关系与测量定义，到重复性与临床解释；最终研究问题仍在确定，候选方向包括连续随访中区域应变的可重复性（最小可检出变化），以及中轴型脊柱关节炎（axSpA）等风湿免疫疾病中的心脏影像。' },
      { when: '2025 – 26', what: 'GoUni Ltd. · 全栈开发工程师', where: 'London · Hybrid',
        detail: '独立负责校园应用的整体架构与交付：React 18 网页端与 Swift/SwiftUI iOS 端采用 MVVM 与组件化设计，八个以上功能模块共享统一的 API 契约与服务层，保证双端功能一致。接入 Google Gemini（上下文角色与降级兜底），以 GitHub Actions 建立 CI/CD；三个月内交付可上线的跨国教育公司官网版本。' },
      { when: '2024 – 25', what: 'UCL · 硕士', where: 'London',
        detail: '构建了面向轴性脊柱关节炎的双模态 AI 诊断框架：分别在结构化电子病历与骶髂关节 MRI 上建立可解释模型（SHAP、Grad-CAM），并提供可概率融合的模块化代码。期间参加 RSNA 2024 腰椎退变分类竞赛。' },
      { when: '2021', what: '百度', where: 'Beijing',
        detail: '实习。用 Python 与 Selenium 编写自动化脚本。' },
      { when: '2019 – 24', what: '澳门科技大学 · 学士', where: 'Macau',
        detail: '商业数据分析。本科论文（区块链可追溯性对奢侈品购买意愿的影响，2×2 因子实验）位列商学院前 5%；获院长荣誉名单。' },
    ],
    chips: ['心脏磁共振', '心肌应变', '测量可重复性', '医学影像 AI', 'Python · PyTorch', 'React · SwiftUI', 'CI/CD'],
    whyItems: [
      { h: '心动周期是闭合的循环', p: 'cine MRI 记录一个心动周期，从舒张末期出发，又回到舒张末期；运动估计里，首尾能否闭合是一项质控。天干地支同样是循环的记号，六十个组合走完，回到甲子。' },
      { h: '环与扇区，就是心肌的坐标', p: '短轴切面上的心肌是一圈环：沿圆周是位置，由内到外是壁的层次。区域应变就是给环上的每一格标一个值，牛眼图把它摊开成同心环。字环上的每一格有位置、有内容，结构是同一种。' },
    ],
    whyNote: '这是我觉得成立的类比。字环本身不参与我的研究。',
    research: [
      { tag: '研究方向', title: '心脏运动与区域应变', en: 'From cine CMR to clinical interpretation', open: true,
        body: ['用深度学习从 cine 心脏磁共振估计心肌运动，由运动得到应变，并评估它的临床价值。'],
        flow: ['cine CMR', '运动估计', '心肌应变', '临床应用'],
        after: '这是方向，不是已经建成的系统。最终的疾病对象、算法和验证方案仍在确定；每一步需要怎样的质控和参考测量，正是我的综述在梳理的问题。' },
      { tag: '候选问题', title: '区域应变的可重复性', en: 'Minimal detectable change in serial imaging',
        body: ['全局纵向应变（GLS）的可重复性已经足以进入常规使用，区域应变则不然，跨次扫描时尤其明显。我考虑研究区域应变的最小可检出变化：变异来自哪些环节，又怎样降低。',
               '任何要靠连续随访判断局部功能有没有变化的临床场景，都要先知道这个界限。博士课题尚未最终确定，这是候选方向之一。'] },
      { tag: '方法视角', title: '测量与证据', en: 'What the number actually means',
        body: ['影像给出的是观测，点与点的对应是推断出来的。应变的数值取决于参考时相、张量和坐标约定，所以验证必须对准所要支持的具体主张。'] },
      { tag: '已定稿', title: '综述：从常规 cine 到区域心肌功能异常', en: 'From routine cine CMR to regional myocardial dysfunction',
        body: ['这是一篇批判性叙述综述，涵盖特征追踪、形变配准、生物力学与学习方法，问的是区域异常的幅度、位置、范围和时序，哪些已被证明能从常规 cine 测得足够准确。',
               '在配对比较中，最明确的支持是匹配定义下、心室中段整层的周向应变；一致性随分量、尺度和软件而变，径向应变最不一致。解剖重叠、估计器之间的一致性、与 tagging 或 DENSE 的比较、与 LGE 和临床结局的关联回答的是不同的问题，不能互相替代；直接检验局灶属性的研究很少。',
               '2026 年 10 月定稿，尚未发表。'] },
      { tag: '此前的工作', title: '早期骶髂关节炎的 AI 识别', en: 'MSc thesis, UCL',
        body: ['两条独立的流水线，一条基于结构化电子病历，一条基于骶髂关节 MRI，目标是识别轴性脊柱关节炎并给出可解释的依据（SHAP、Grad-CAM）。代码是模块化的，已在 GitHub 上公开。',
               '影像部分的样本量有限，定位为方法学验证，不是临床结论。'],
        links: [{ label: 'GitHub · FINAL_AS', href: 'https://github.com/azusa-dom/FINAL_AS' }] },
      { tag: '待验证', title: '条件可恢复性', en: 'A framework, not yet validated',
        body: ['在声明的采集、异常、估计器和测量条件下，对照某个参考和容差，能否恢复某一属性（幅度、位置、范围或时序）？这是针对具体属性和用途的论断。它是我提出的验证框架，不是已确立的生物标志物性质，目前尚未验证。'] },
    ],
  },

  // ───────────────────────────────────────── English
  en: {
    title: 'Zoya Huo',
    desc: 'Zoya Huo: PhD researcher (AI4BioImaging) at the University of Manchester working on myocardial motion and regional strain in cine cardiac MRI; formerly a full-stack developer in London.',
    ui: {
      nav: { home: 'Home', about: 'About', research: 'Research', contact: 'Contact' },
      skip: 'Skip to about',
      greeting: 'Hello, I’m Zoya Huo.',
      slogan: ['Writing code,', 'reading hearts'],
      lead: ['PhD researcher (AI4BioImaging) at the University of Manchester,', 'working on motion and strain in cardiac cine MRI;', 'formerly a full-stack developer in London.'],
      primary: 'See my research', quiet: 'About me',
      role: 'PhD Researcher · AI4BioImaging',
      org: 'University of Manchester · Faculty of Biology, Medicine and Health',
      explore: 'Explore the wheel',
      caption: 'Ten stems, twelve branches',
      prev: 'Previous', next: 'Next', nextHome: 'Next: About',
      dialog: { title: 'Heavenly Stems and Earthly Branches', hint: 'Pick a character to read its traditional classification and focus it on the wheel.', gan: 'Ten Stems (天干)', zhi: 'Twelve Branches (地支)', idle: 'The ten stems pair with the twelve branches in turn to form the sixty-year sexagenary cycle.' },
      langLabel: 'Language',
    },
    pages: {
      about: { glyph: '甲', eyebrow: 'About', title: 'Full-stack engineering and medical imaging research.',
        timeline: 'Background', why: 'Why stems and branches', focus: 'Keywords' },
      research: { glyph: '乙', eyebrow: 'Research', title: 'Cardiac motion and regional strain', projects: 'Projects', details: 'Details', q: 'Question', how: 'Approach' },
      contact: { glyph: '丙', eyebrow: 'Contact', title: 'Get in touch', lead: 'I am glad to talk about cardiac imaging, strain measurement, medical imaging AI or full-stack development.', none: 'Contact details to be added.', copy: 'Copy email', copied: 'Copied', copyFail: 'Select and copy manually', gmail: 'Write in Gmail', outlook: 'Write in Outlook', mail: 'Open mail app', hint: 'Nothing happens on click? You probably have no mail app set up. Copy the address, or write from webmail.', subject: 'Hello from your website' },
    },
    figure: { src: 'img/fig1-measurement-chain-20261025.webp', w: 2000, h: 2239, alt: 'The measurement chain from routine cine images to a regional claim, and the links each validation target tests', caption: 'Figure 1. From routine cine images to a regional claim, and where validation evidence attaches. (a) The measurement chain: cine shows sharp blood–myocardium edges but little contrast inside the wall, so correspondence inside the wall is inferred; two mappings with identical contours (Dice 1, Hausdorff distance 0) imply different circumferential stretch, and strain then follows under the stated definition. (b) The links of the chain that each validation target tests; among the studies reviewed, direct tests of the focal attribute were rarely reported. Schematic: marker positions encode the argument of the review, not study counts or effect sizes; section numbers refer to the review. Cine frames are from one healthy volunteer in the public Stanford Cardiac Performance MRI repository (Open Database License v1.0); the other graphics are analytic or illustrative. Final draft October 2026; not yet published.' },
    about: [
      'I am a PhD researcher at the University of Manchester (AI4BioImaging), working on myocardial motion estimation and regional strain from cine cardiac MRI. I am currently writing a review of what routine cine can and cannot support about regional strain.',
      'I studied business data analytics, moved into medical imaging AI during my MSc at UCL, and then worked as a full-stack developer. Writing software taught me to ask how a number was computed and whether it still holds under other conditions; I now ask that of strain measurement.',
    ],
    projects: [
      { status: 'Final draft', title: 'Critical narrative review', en: 'From routine cine CMR to regional myocardial dysfunction', q: 'Which attributes of a regional abnormality (magnitude, location, extent, timing) have been shown to be measured from routine cine accurately enough for an intended use?', how: 'Studies compared along six axes: image input, population and abnormality, estimated entity, strain definition and aggregation, validation target, and reported error or association; no pooled estimate. Final draft October 2026; unpublished.' },
      { status: 'Exploratory', title: 'Exploratory work on regional motion and strain', en: 'Single cases on reference and simulated data', q: 'Against what reference can regional motion inferred from cine be checked?', how: 'Single-case, small-scale processing and quality control on public DENSE reference data and controlled simulations. Engineering exploration only; no accuracy conclusion yet.' },
      { status: 'Unvalidated', title: 'Conditional recoverability', en: 'A framework, not yet validated', q: 'Under declared conditions, can regional strain magnitude, location, extent and timing be recovered against a reference and a tolerance?', how: 'A validation framework I propose; not an established property, and not yet validated.' },
      { status: 'Candidate', title: 'Repeatability of regional strain', en: 'Minimal detectable change in serial imaging', q: 'In follow-up scans, how large must a change in regional strain be to count as real?', how: 'My PhD question is not final; this is one candidate: break the variability down by motion estimation, strain definition and scan-to-scan differences, and estimate the minimal detectable change.' },
      { status: 'Candidate', title: 'Cardiac imaging in rheumatic disease', en: 'e.g. axial spondyloarthritis (axSpA)', q: 'In rheumatic diseases such as axSpA, can routine cine reliably show changes in regional myocardial function?', how: 'My PhD question is not final; this is one candidate, linked to my MSc work on axSpA. No data or results yet.' },
      { status: 'Completed', title: 'AI identification of early sacroiliitis', en: 'MSc thesis, UCL', q: 'Can health records and MRI identify early sacroiliitis that is hard to see by eye?', how: 'Two independent pipelines, explained with SHAP and Grad-CAM. The imaging sample is small, so this is a methods validation.', link: { label: 'GitHub · FINAL_AS', href: 'https://github.com/azusa-dom/FINAL_AS' } },
    ],
    timeline: [
      { when: '2026 –', what: 'University of Manchester · PhD', where: 'Manchester',
        detail: 'Faculty of Biology, Medicine and Health; Biomedical Imaging Sciences (AI4BioImaging). Myocardial motion estimation and regional strain measurement from cine cardiac MRI, from image correspondence and measurement definitions to repeatability and clinical interpretation. The final research question is still being decided; candidates include the repeatability of regional strain in serial follow-up (minimal detectable change) and cardiac imaging in rheumatic diseases such as axial spondyloarthritis (axSpA).' },
      { when: '2025 – 26', what: 'GoUni Ltd. · Full-stack Developer', where: 'London · Hybrid',
        detail: 'Sole owner of the architecture and delivery of a campus application: a React 18 web client and a Swift/SwiftUI iOS client built with MVVM and component-based design, sharing one API contract and service layer across eight-plus modules to keep the platforms at feature parity. Integrated Google Gemini with context-aware personas and fallback handling, set up CI/CD on GitHub Actions, and delivered a production-ready official website for a multinational education company within three months.' },
      { when: '2024 – 25', what: 'UCL · Master’s', where: 'London',
        detail: 'Built a dual-modality AI diagnostic framework for axial spondyloarthritis, with interpretable models on structured health records and on sacroiliac joint MRI (SHAP, Grad-CAM) and modular code for probabilistic fusion. Also took part in the RSNA 2024 lumbar spine degenerative classification challenge.' },
      { when: '2021', what: 'Baidu', where: 'Beijing',
        detail: 'Internship. Wrote automation scripts in Python and Selenium.' },
      { when: '2019 – 24', what: 'Macau University of Science and Technology · Bachelor’s', where: 'Macau',
        detail: 'Business Data Analytics. Thesis on how blockchain traceability affects purchase intent for luxury goods (2×2 factorial experiment), ranked in the top 5% of undergraduate theses at the Business School. Dean’s Honor List.' },
    ],
    chips: ['Cardiac MRI', 'Myocardial strain', 'Measurement repeatability', 'Medical imaging AI', 'Python · PyTorch', 'React · SwiftUI', 'CI/CD'],
    whyItems: [
      { h: 'The heartbeat is a closed cycle', p: 'Cine MRI records one cardiac cycle, from end-diastole back to end-diastole, and in motion estimation whether the loop closes is a quality check. The stems and branches are also a cyclic notation: sixty combinations, then back to Jia-Zi.' },
      { h: 'Rings and sectors are the myocardium’s coordinates', p: 'In a short-axis slice the myocardium is a ring: position runs around the circumference, wall depth runs from inside to out. Regional strain assigns a value to each cell of that ring, and the bull’s-eye plot unrolls it into concentric rings. Each cell on the wheel has a position and a content, the same structure.' },
    ],
    whyNote: 'This is an analogy that holds up for me. The wheel itself plays no part in my research.',
    research: [
      { tag: 'Focus', title: 'Cardiac motion and regional strain', en: 'From cine CMR to clinical interpretation', open: true,
        body: ['I use deep learning to estimate myocardial motion from cine cardiac MRI, derive strain from that motion, and assess whether it is clinically useful.'],
        flow: ['cine CMR', 'Motion estimation', 'Myocardial strain', 'Clinical application'],
        after: 'This is a direction, not a finished system. The disease focus, algorithm and validation plan are still being decided; what quality control and reference measurements each step needs is what my review is working through.' },
      { tag: 'Candidate question', title: 'Repeatability of regional strain', en: 'Minimal detectable change in serial imaging',
        body: ['Global longitudinal strain is now reproducible enough for routine use; regional strain is not, especially across repeated scans. I am considering its minimal detectable change: where the variability comes from, and how to reduce it.',
               'Any clinical use that relies on serial scans to tell whether local function has changed first needs to know this limit. My PhD question is not final yet; this is one candidate.'] },
      { tag: 'Perspective', title: 'Measurement and evidence', en: 'What the number actually means',
        body: ['An image gives observations; point correspondence is inferred. A strain value depends on the reference phase, tensor and coordinate conventions, so validation has to be matched to the specific claim it is meant to support.'] },
      { tag: 'Final draft', title: 'Critical narrative review', en: 'From routine cine CMR to regional myocardial dysfunction',
        body: ['A critical narrative review of feature-tracking, deformable-registration, biomechanical and learning-based approaches. It asks which attributes of a regional abnormality (magnitude, location, extent and timing) have been shown to be measured from routine cine accurately enough for an intended use.',
               'Among paired comparisons, the clearest support is for circumferential strain at mid-ventricular whole-slice scale under matched definitions; agreement varies with component, scale and software, and radial strain is the least consistent. Anatomical overlap, agreement between estimators, comparison with tagging or DENSE, and associations with LGE or outcomes answer different questions and are not interchangeable; direct tests of the focal attributes are rare.',
               'Final draft October 2026; not yet published.'] },
      { tag: 'Earlier work', title: 'AI for early sacroiliitis', en: 'MSc thesis, UCL',
        body: ['Two independent pipelines, one on structured electronic health records and one on sacroiliac joint MRI, aimed at identifying axial spondyloarthritis with interpretable evidence (SHAP, Grad-CAM). The code is modular and released on GitHub.',
               'The imaging cohort was small, so that part is a methodological validation rather than a clinical result.'],
        links: [{ label: 'GitHub · FINAL_AS', href: 'https://github.com/azusa-dom/FINAL_AS' }] },
      { tag: 'Open question', title: 'Conditional recoverability', en: 'A framework, not yet validated',
        body: ['Under declared acquisition, abnormality, estimator and measurement conditions, and against a stated reference and tolerance, can a given attribute (magnitude, location, extent or timing) be recovered? This is a claim about a specific attribute and use. It is a validation framework I am proposing, not an established property of a biomarker, and it has not yet been validated.'] },
    ],
  },

  // ───────────────────────────────────────── 日本語
  ja: {
    title: 'Zoya Huo',
    desc: 'Zoya Huo：マンチェスター大学 博士課程（AI4BioImaging）。シネ心臓MRIの心筋運動と局所ひずみを研究。以前はロンドンでフルスタック開発を担当。',
    ui: {
      nav: { home: 'ホーム', about: '概要', research: '研究', contact: '連絡' },
      skip: '自己紹介へ移動',
      greeting: 'こんにちは、Zoya Huo です。',
      slogan: ['コードを書き、', '心臓を読む'],
      lead: ['マンチェスター大学 博士課程（AI4BioImaging）。', 'シネ心臓MRIにおける心筋の運動とひずみを研究しています。', 'ロンドンではフルスタック開発を担当していました。'],
      primary: '研究を見る', quiet: '自己紹介',
      role: '博士課程 · AI4BioImaging',
      org: 'University of Manchester · Faculty of Biology, Medicine and Health',
      explore: '字環を探る',
      caption: '十干十二支',
      prev: '前へ', next: '次へ', nextHome: '次へ 概要',
      dialog: { title: '十干十二支', hint: '文字を選ぶと、伝統的な分類を表示し、字環で強調します。', gan: '十干', zhi: '十二支', idle: '十干と十二支が順に組み合わさり、六十干支になります。' },
      langLabel: '言語',
    },
    pages: {
      about: { glyph: '甲', eyebrow: 'About', title: 'フルスタック開発と、医用画像の研究。',
        timeline: '経歴', why: 'なぜ十干十二支なのか', focus: 'キーワード' },
      research: { glyph: '乙', eyebrow: 'Research', title: '心臓の運動と局所ひずみ', projects: 'プロジェクト', details: '詳細', q: '問い', how: '方法' },
      contact: { glyph: '丙', eyebrow: 'Contact', title: '連絡先', lead: '心臓画像、ひずみ計測、医用画像AI、フルスタック開発について、お気軽にご連絡ください。', none: '連絡先は準備中です。', copy: 'アドレスをコピー', copied: 'コピーしました', copyFail: '手動で選択してコピーしてください', gmail: 'Gmailで書く', outlook: 'Outlookで書く', mail: 'メールアプリで開く', hint: 'クリックしても反応しない場合は、メールアプリが未設定の可能性があります。アドレスをコピーするか、ウェブメールからご連絡ください。', subject: 'ウェブサイトからのご連絡' },
    },
    figure: { src: 'img/fig1-measurement-chain-20261025.webp', w: 2000, h: 2239, alt: '通常のシネ画像から局所の主張までの計測の連鎖と、各検証対象が確かめる段階', caption: '図 1　通常のシネ画像から局所の主張まで、そして検証の根拠がどこに結びつくか。(a) 計測の連鎖：シネは血液と心筋の境界を鮮明に示しますが、壁内のコントラストは乏しく、壁内の対応は推定になります。輪郭が完全に一致する（Dice 1、Hausdorff 距離 0）2つの写像でも円周方向の伸びは異なり、ひずみは宣言した定義に従って求まります。(b) 各検証対象が連鎖のどの段階を検証するか。レビューで扱った研究では、局所の属性を直接検証した報告はまれでした。模式図であり、マーカーの位置はレビューの論旨を表し、研究数や効果量ではありません。図中の節番号はレビュー本文を指します。シネ画像は公開データベース Stanford Cardiac Performance MRI の健常ボランティア1名のもの（Open Database License v1.0）で、その他は解析的または説明用の図形です。レビューは2026年10月に最終稿となり、未発表です。' },
    about: [
      'マンチェスター大学の博士課程（AI4BioImaging）で、シネ心臓MRIからの心筋運動推定と局所ひずみ計測を研究しています。いまは、通常のシネで局所ひずみについて何が言えるのかを整理するレビューを書いています。',
      '学部ではビジネスデータ分析を学び、UCLの修士課程で医用画像AIに移り、その後フルスタック開発に携わりました。ソフトウェアを書く中で、数字がどう計算され、条件を変えても成り立つのかを問う習慣がつき、いまはその問いをひずみ計測に向けています。',
    ],
    projects: [
      { status: '最終稿', title: '批判的ナラティブレビュー', en: 'From routine cine CMR to regional myocardial dysfunction', q: '局所異常のどの属性（大きさ・位置・範囲・時間経過）が、通常のシネから用途に足る精度で測れると示されているか。', how: '画像入力、対象集団と異常、推定対象、ひずみの定義と集約、検証の対象、報告された誤差や関連の6軸で研究を比較し、統合推定は行いません。2026年10月に最終稿となり、未発表です。' },
      { status: '探索中', title: '局所運動とひずみの探索的な取り組み', en: 'Single cases on reference and simulated data', q: 'シネから推定した局所運動は、どの基準と照らし合わせて検証できるか。', how: '公開されているDENSEの基準データと制御されたシミュレーションで、単一症例・小規模の処理と品質管理を行っています。工学的な探索の段階で、精度についての結論はまだありません。' },
      { status: '未検証', title: '条件付き回復可能性', en: 'A framework, not yet validated', q: '明示した条件のもとで、基準と許容範囲に照らして局所ひずみの大きさ・位置・範囲・時間経過を回復できるか。', how: '私が提案する検証の枠組みで、確立した性質ではなく、未検証です。' },
      { status: '候補', title: '局所ひずみの再現性', en: 'Minimal detectable change in serial imaging', q: '経過観察で、局所ひずみがどれだけ変化すれば本当の変化といえるのか。', how: '博士課題はまだ確定しておらず、候補の一つです。変動を運動推定、ひずみの定義、撮像間の差などに分けて、最小検出可能変化を見積もります。' },
      { status: '候補', title: 'リウマチ性疾患の心臓画像', en: 'e.g. axial spondyloarthritis (axSpA)', q: '体軸性脊椎関節炎（axSpA）などのリウマチ性疾患で、通常のシネは局所心筋機能の変化を確実に捉えられるか。', how: '博士課題はまだ確定しておらず、候補の一つです。修士課程での axSpA の研究とつながっています。データや結果はまだありません。' },
      { status: '完了', title: '早期仙腸関節炎のAI識別', en: 'MSc thesis, UCL', q: '電子カルテとMRIで、目視では見分けにくい早期の仙腸関節炎を識別できるか。', how: '独立した2つのパイプラインを SHAP と Grad-CAM で説明します。画像部分はサンプル数が限られ、方法の検証です。', link: { label: 'GitHub · FINAL_AS', href: 'https://github.com/azusa-dom/FINAL_AS' } },
    ],
    timeline: [
      { when: '2026 –', what: 'マンチェスター大学 · 博士課程', where: 'Manchester',
        detail: 'Faculty of Biology, Medicine and Health、生物医学イメージング科学（AI4BioImaging）。シネ心臓MRIによる心筋運動推定と局所ひずみ計測を、画像の対応関係や計測の定義から、再現性と臨床的解釈まで扱います。最終的な研究課題は検討中で、候補には局所ひずみの経時フォローアップにおける再現性（最小検出可能変化）と、体軸性脊椎関節炎（axSpA）などのリウマチ性疾患における心臓画像があります。' },
      { when: '2025 – 26', what: 'GoUni Ltd. · フルスタック開発エンジニア', where: 'London · ハイブリッド',
        detail: 'キャンパス向けアプリ全体の設計と納品を単独で担当。React 18 のWeb版とSwift/SwiftUIのiOS版をMVVMとコンポーネント設計で構築し、8つ以上の機能モジュールで共通のAPI契約とサービス層を共有して、両プラットフォームの機能を揃えました。Google Geminiをコンテキスト対応のペルソナとフォールバック付きで統合し、GitHub ActionsでCI/CDを構築。3か月で、多国籍教育企業向け公式サイトの本番稼働可能なバージョンを納品しました。' },
      { when: '2024 – 25', what: 'UCL · 修士課程', where: 'London',
        detail: '体軸性脊椎関節炎に対する二モダリティAI診断フレームワークを構築。構造化電子カルテと仙腸関節MRIそれぞれで説明可能なモデル（SHAP、Grad-CAM）を作成し、確率的に統合できるモジュール式コードを用意しました。期間中、RSNA 2024の腰椎変性分類コンペにも参加しました。' },
      { when: '2021', what: '百度（Baidu）', where: 'Beijing',
        detail: 'インターン。PythonとSeleniumで自動化スクリプトを作成しました。' },
      { when: '2019 – 24', what: 'マカオ科技大学 · 学士課程', where: 'Macau',
        detail: 'ビジネスデータ分析専攻。卒業論文（ブロックチェーンによるトレーサビリティが高級品の購買意向に与える影響、2×2 要因実験）は経営学部で上位5%に評価され、学部長表彰リスト（Dean’s Honor List）にも選ばれました。' },
    ],
    chips: ['心臓MRI', '心筋ひずみ', '計測の再現性', '医用画像AI', 'Python · PyTorch', 'React · SwiftUI', 'CI/CD'],
    whyItems: [
      { h: '心拍は閉じた周期', p: 'シネMRIは拡張末期から拡張末期へ戻る1心拍分を記録します。運動推定では、始点と終点が閉じるかどうかが品質管理の項目です。十干十二支も循環する記号で、六十通りを巡ると甲子に戻ります。' },
      { h: '環と扇形は、心筋の座標', p: '短軸断面の心筋は一つの環です。円周方向が位置、内から外へが壁の層に対応します。局所ひずみは、その環の各区画に値を割り当てたもので、ブルズアイ図は同心円状に展開して表します。字環の一つ一つの区画に位置と内容があるのも、同じ構造です。' },
    ],
    whyNote: 'これは私が成り立つと考えている類比です。字環そのものは、研究には関わりません。',
    research: [
      { tag: '研究テーマ', title: '心臓の運動と局所ひずみ', en: 'From cine CMR to clinical interpretation', open: true,
        body: ['深層学習でシネ心臓MRIから心筋運動を推定し、そこからひずみを求め、臨床的な価値を評価します。'],
        flow: ['cine CMR', '運動推定', '心筋ひずみ', '臨床応用'],
        after: 'これは方向性であり、完成したシステムではありません。対象疾患、アルゴリズム、検証計画はまだ検討中で、各段階にどのような品質管理と基準計測が必要かを、レビューで整理しています。' },
      { tag: '候補となる問い', title: '局所ひずみの再現性', en: 'Minimal detectable change in serial imaging',
        body: ['全体の縦方向ひずみ（GLS）は日常診療に使える再現性に達していますが、局所ひずみはそうではなく、とくに繰り返し撮像したときに顕著です。局所ひずみの最小検出可能変化を対象に、ばらつきの由来と低減方法を研究することを検討しています。',
               '連続撮像で局所機能の変化を判断する臨床の場面では、まずこの限界を知る必要があります。博士課題はまだ確定しておらず、これは候補の一つです。'] },
      { tag: '方法論', title: '計測と根拠', en: 'What the number actually means',
        body: ['画像が与えるのは観測であり、点と点の対応は推定です。ひずみの値は基準時相、テンソル、座標系の取り決めに左右されるため、検証は支えたい具体的な主張に合わせる必要があります。'] },
      { tag: '最終稿', title: '批判的ナラティブレビュー', en: 'From routine cine CMR to regional myocardial dysfunction',
        body: ['特徴追跡、変形レジストレーション、生体力学、学習ベースの手法を対象とした批判的ナラティブレビューです。局所異常の大きさ・位置・範囲・時間経過のうち、どれが通常のシネから用途に足る精度で測れると示されているかを問います。',
               '対になった比較研究では、定義を揃えた中部心室スライス全体の円周方向ひずみが最も明確に支持されます。一致度は成分、スケール、ソフトウェアによって変わり、径方向ひずみが最も不安定です。解剖学的な重なり、推定器間の一致、taggingやDENSEとの比較、LGEや臨床転帰との関連はそれぞれ別の問いに答えるもので、互いに代替できません。局所の属性を直接検証した研究はわずかです。',
               '2026年10月に最終稿となり、未発表です。'] },
      { tag: 'これまでの研究', title: '早期仙腸関節炎のAI識別', en: 'MSc thesis, UCL',
        body: ['構造化電子カルテと仙腸関節MRIという2つの独立したパイプラインで、体軸性脊椎関節炎を説明可能な根拠（SHAP、Grad-CAM）付きで識別します。コードはモジュール式で、GitHubに公開しています。',
               '画像部分のサンプル数は限られるため、臨床的な結論ではなく、方法の検証と位置づけています。'],
        links: [{ label: 'GitHub · FINAL_AS', href: 'https://github.com/azusa-dom/FINAL_AS' }] },
      { tag: '未検証', title: '条件付き回復可能性', en: 'A framework, not yet validated',
        body: ['取得条件、異常、推定器、計測条件を明示したうえで、定めた基準と許容範囲に照らして、ある属性（大きさ、位置、範囲、時間経過）が回復できるか。これは特定の属性と用途についての主張です。私が提案している検証の枠組みであり、確立されたバイオマーカーの性質ではなく、まだ検証されていません。'] },
    ],
  },
}

const GAN = '甲乙丙丁戊己庚辛壬癸'
const ZHI = '子丑寅卯辰巳午未申酉戌亥'
const mod = (a, n) => ((a % n) + n) % n

/** 某个日期的干支纪年与纪日。纪日以 1949-10-01（甲子日）为锚点推算；
 *  纪年以立春为界，这里取 2 月 4 日近似（立春实际在 2 月 3–5 日之间浮动）。 */
export function ganzhiOf(date = new Date()) {
  const y = date.getFullYear()
  const beforeLichun = date.getMonth() < 1 || (date.getMonth() === 1 && date.getDate() < 4)
  const ny = beforeLichun ? y - 1 : y
  const year = GAN[mod(ny - 4, 10)] + ZHI[mod(ny - 4, 12)]
  const days = Math.round(
    (Date.UTC(y, date.getMonth(), date.getDate()) - Date.UTC(1949, 9, 1)) / 86400000
  )
  const day = GAN[mod(days, 10)] + ZHI[mod(days, 12)]
  return { year, day }
}
