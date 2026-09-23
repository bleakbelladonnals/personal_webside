export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type PublicLink = {
  label: string;
  href: string;
  kind: 'github' | 'website' | 'source';
};

export type ProjectType = 'company-pilot' | 'independent-mvp' | 'open-source';

export type WorkSample = {
  id: string;
  type: 'decision' | 'evaluation' | 'workflow' | 'research' | 'open-source';
  title: string;
  format: string;
  disclosure: string;
  summary: string;
  items: string[];
};

export const projectTypeLabels: Record<ProjectType, string> = {
  'company-pilot': '公司内部试点',
  'independent-mvp': '个人 MVP',
  'open-source': '公开开源',
};

export type CaseStudy = {
  slug: string;
  name: string;
  nameCn: string;
  category: string;
  year: string;
  featured: boolean;
  projectType: ProjectType;
  stage: string;
  validationScope: string;
  metricNotes: string;
  summary: string;
  audience: string;
  role: string;
  context: string;
  problem: string[];
  whyAi: string;
  decisions: string[];
  workflow: string[];
  guardrails: string[];
  evaluation: string[];
  metrics: Metric[];
  reflection: string;
  workSamples: WorkSample[];
  capabilities: string[];
  publicLinks: PublicLink[];
};

export type Strength = {
  id: 'product-01' | 'agent-eval' | 'ai-coding-open-source' | 'seo-validation';
  name: string;
  code: string;
  description: string;
  evidence: Array<{ project: string; slug: string; note: string }>;
};

export type LabProject = {
  slug: string;
  name: string;
  nameCn: string;
  category: string;
  year: string;
  stage: string;
  summary: string;
  problem: string;
  approach: string;
  validationScope: string;
  guardrails: string[];
  capabilities: string[];
  publicLinks: PublicLink[];
};

export const profile = {
  nameCn: '甘淑琪',
  nameEn: 'Donna Gan',
  role: 'AI 产品经理',
  location: '北京',
  status: 'OPEN TO WORK',
  email: 'bleakbelladonnals@gmail.com',
  github: 'https://github.com/bleakbelladonnals',
  headline: '从真实业务问题出发，把 Agent 做到可用、可评测、可迭代。',
  intro:
    '主导企业 AI 产品从 0 到 1，把复杂业务拆为知识、数据、工具与人工确认流程，并用评测闭环推进内部试点。同时持续用 AI Coding、开源协作和 SEO 增长验证产品判断。',
};

export const cases: CaseStudy[] = [
  {
    slug: 'lumiagent',
    name: 'LumiAgent',
    nameCn: '企业知识问答 Agent',
    category: 'ENTERPRISE AI',
    year: '2025–2026',
    featured: true,
    projectType: 'company-pilot',
    stage: '内部试点 · 两周业务测试',
    validationScope: '覆盖销售、仓储、采购 3 个部门，围绕 100 条核心回归用例完成 3 轮迭代。',
    metricNotes: '内部试点口径；订单金额表示辅助覆盖规模，不代表 AI 新增收入。',
    summary:
      '面向销售、仓储和采购的订单协同 Agent，把产品知识查询、订单物料拆解、库存核对和采购缺口计算组合成可执行、可评测的业务流程。',
    audience: '销售、仓储和采购团队',
    role: '产品负责人：业务调研、MVP 排序、Agent 方案、评测体系、内部试点与版本闭环',
    context:
      '销售确认一笔订单时，需要在分散的产品资料、库存信息和采购口径之间往返查询，一次高频任务中位耗时约 12 分钟。',
    problem: [
      '同一型号和库存信息被跨部门重复确认。',
      '自然语言请求常同时包含知识、实时数据与确定性计算。',
      '库存和采购结果进入真实订单决策，不能依赖模型猜测。',
    ],
    whyAi:
      '用户会以自然语言提出混合请求，系统需要理解意图、补齐型号或订单字段，再在知识、库存和计算工具之间路由；数值事实仍交给结构化系统。',
    decisions: [
      '首期只做产品查询、库存核对和采购缺口三个高价值场景。',
      '模型负责意图、字段提取和澄清；产品知识走 RAG，库存走只读查询，缺口走规则工具。',
      '异常订单和高风险结果必须人工确认，保留来源与执行记录。',
    ],
    workflow: [
      '身份与请求上下文',
      '意图识别 / 实体与槽位抽取',
      '信息不足时澄清',
      'RAG / 结构化查询 / 规则工具路由',
      '结果聚合与业务校验',
      '高风险结果人工确认',
      '日志与 bad case 回流',
    ],
    guardrails: [
      '模型不作为实时库存与数值计算的事实源。',
      '只读查询可有限重试，参数不足回到澄清，未知错误转人工。',
      '输出保留产品知识来源和查询时间，支持业务追溯。',
    ],
    evaluation: [
      '将问题拆为意图与槽位、知识检索、工具调用、计算规则、结果事实和交互六层。',
      '建立 100 条核心回归用例，完成三轮 bad case 分类与版本迭代。',
      '构建 1,000+ 条覆盖标准问法、口语化表达、多意图请求与异常输入的 SFT 指令样本，格式遵循率由 78% 提升至 96%。',
    ],
    metrics: [
      { value: '12 → 2 min', label: '高频查询耗时', detail: '中位耗时降低约 83%' },
      { value: '-35%', label: '跨部门重复确认', detail: '试点业务流程' },
      { value: '90%', label: '核心任务通过率', detail: '100 条核心回归集' },
      { value: '1,000 万+', label: '辅助处理订单金额', detail: '表示覆盖规模，非 AI 新增收入' },
    ],
    reflection:
      '企业 Agent 的价值不在模型显得多聪明，而在知识、数据、工具、规则、人和责任边界被设计成可评测的闭环。',
    workSamples: [
      {
        id: 'lumiagent-mvp-matrix',
        type: 'decision',
        title: 'MVP 场景优先级矩阵',
        format: '决策记录 · 1 page',
        disclosure: '依据项目决策脱敏重绘',
        summary: '用业务频率、耗时、数据可得性与风险，把五条候选流程收敛为三个首期场景。',
        items: ['价值 × 可行性', '风险与责任边界', '首期 / 后续范围'],
      },
      {
        id: 'lumiagent-eval-set',
        type: 'evaluation',
        title: '100 条核心回归集结构',
        format: '评测表 · 6 layers',
        disclosure: '仅展示结构与口径，不含企业数据',
        summary: '把一次回答拆成意图、检索、工具、计算、事实与交互六层分别判定。',
        items: ['通过标准', 'Bad case 标签', '版本回归记录'],
      },
      {
        id: 'lumiagent-handoff-map',
        type: 'workflow',
        title: '风险节点与人工介入图',
        format: '流程图 · 7 states',
        disclosure: '依据试点流程脱敏重绘',
        summary: '明确参数不足、只读查询失败、高风险结果和未知异常分别如何中断与交接。',
        items: ['澄清', '有限重试', '人工确认 / 接管'],
      },
    ],
    capabilities: ['0→1 产品定义', 'Agent 路由', 'RAG', '效果评测', '跨部门落地'],
    publicLinks: [],
  },
  {
    slug: 'agentdock',
    name: 'AgentDock',
    nameCn: '多 Agent 任务可观测工作台',
    category: 'AGENT UX',
    year: '2026',
    featured: true,
    projectType: 'independent-mvp',
    stage: '可运行个人 MVP',
    validationScope: '累计记录 200+ 条 Agent 任务，覆盖 60+ 个待确认、异常与人工介入节点。',
    metricNotes: '任务记录包含真实使用与测试运行，用于验证状态模型，不代表外部用户规模或 PMF。',
    summary:
      '把分散在不同 AI 会话中的运行状态、待确认事项、生成结果与模型成本聚合到统一工作台。',
    audience: '同时运行多个 Agent 与 AI 对话的重度用户',
    role: '独立产品设计与实现：需求调研、状态模型、信息架构、原型、AI Coding 交付与验收',
    context:
      '多 Agent 使用的核心问题并非“缺少更多 Agent”，而是任务状态不可见、人工介入时机难判断、模型费用不可控。',
    problem: [
      '运行中、等待确认、失败和已完成状态散落在多个会话。',
      '用户反复巡检会话，仍可能遗漏需要人工确认的关键节点。',
      '模型、Token 和运行费用缺少统一视图。',
    ],
    whyAi:
      '产品本身不需要另一个自由规划 Agent；核心是对已有 Agent 事件进行规范化、解释和优先级呈现，让人类在正确时机介入。',
    decisions: [
      '首期不做 Agent 创建、Prompt 管理和自动编排，只聚焦状态、待处理事项和成本。',
      '建立统一任务状态模型，把工具调用、人工确认、结果和异常信息聚合到任务层。',
      '以统一待处理队列代替跨会话巡检，同时暴露优先级和成本风险。',
    ],
    workflow: [
      '接入 Agent 事件',
      '映射 task / run / step / tool',
      '规范化运行状态',
      '识别等待确认、异常和成本风险',
      '进入统一待处理队列',
      '用户确认或修正',
      '任务恢复并记录结果',
    ],
    guardrails: [
      '工作台不替用户批准高风险动作。',
      '成本为估算时明确标记，不冒充实际账单。',
      '任务记录数不作为用户价值或 PMF 证据。',
    ],
    evaluation: [
      '以待介入任务发现时间、漏处理率、确认后恢复成功率和巡检次数为主要验收方向。',
      '用真实与测试任务覆盖运行中、待确认、失败、完成和成本异常状态。',
      '以 PRD、接口约束和验收清单约束 AI Coding，而不用“一周完成”代替质量证明。',
    ],
    metrics: [
      { value: '200+', label: 'Agent 任务记录', detail: '用于验证数据模型与信息架构' },
      { value: '60+', label: '待确认 / 异常节点', detail: '用于检验人工介入界面' },
      { value: '1 week', label: 'MVP 交付', detail: '通过受控 AI Coding 快速验证' },
    ],
    reflection:
      '任务数量不是用户价值。产品真正需要验证的，是能否减少漏处理、缩短人工介入的发现时间，并让任务安全恢复。',
    workSamples: [
      {
        id: 'agentdock-state-model',
        type: 'workflow',
        title: 'Agent 任务状态模型',
        format: '状态图 · 5 states',
        disclosure: '公开 MVP 设计摘要',
        summary: '统一运行中、待确认、失败、完成和成本异常状态，并定义允许的状态迁移。',
        items: ['状态定义', '事件与迁移', '恢复条件'],
      },
      {
        id: 'agentdock-intervention-inbox',
        type: 'decision',
        title: '人工介入收件箱',
        format: '交互规格 · Quick Look',
        disclosure: '公开 MVP 设计摘要',
        summary: '将“需要人处理”从分散会话中提取为可排序、可解释、可恢复的任务队列。',
        items: ['风险原因', '待确认动作', '恢复上下文'],
      },
      {
        id: 'agentdock-acceptance',
        type: 'evaluation',
        title: '可观测工作台验收表',
        format: '验收清单 · 4 metrics',
        disclosure: '公开 MVP 评测摘要',
        summary: '用发现时间、漏处理率、恢复成功率和巡检次数验证工作台是否减少人工负担。',
        items: ['发现时间', '漏处理率', '恢复成功率'],
      },
    ],
    capabilities: ['Agent UX', '状态模型', '人机协同', '成本治理', 'AI Coding'],
    publicLinks: [{ label: 'GitHub', href: 'https://github.com/bleakbelladonnals/AgentDock', kind: 'github' }],
  },
  {
    slug: 'bondmemo',
    name: 'BondMemo',
    nameCn: '牵记 · 关系事项跟进助手',
    category: 'CONSUMER AI',
    year: '2026',
    featured: true,
    projectType: 'independent-mvp',
    stage: '种子用户 MVP · 3 轮迭代',
    validationScope: '面向 50+ 目标用户，累计处理 300+ 聊天片段并生成 200+ 关系事项。',
    metricNotes: '采纳率与提醒完成率来自产品内行为，不等同于长期留存、现实跟进完成或 PMF。',
    summary:
      '把聊天片段转成经用户确认的关系事项，并在提醒时恢复人物、原话与未结束的关系语境。',
    audience: '容易因忙碌而遗漏亲友后续的职场人',
    role: '独立产品项目：用户需求、定位收敛、AI 闭环、隐私设计、MVP 与种子用户迭代',
    context:
      '用户真正的问题不是不知道某个人是谁，而是忙碌时忘了聊天中答应过的事和需要继续关心的后续。',
    problem: [
      '普通 Todo 需要用户主动识别任务，并手动重写人物与背景。',
      '到期提醒只有一句任务文字，用户容易忘记原始语境。',
      '私人聊天数据敏感，过度授权和自动行动都会破坏信任。',
    ],
    whyAi:
      'AI 用于从自然对话中识别人物、承诺、时间和待跟进事项，降低记录成本；它只产生候选建议，不替用户维系关系。',
    decisions: [
      '从宽泛 Personal CRM 收敛到“不要遗漏一件与某个人尚未结束的事”。',
      '用户主动提交片段，AI 提取后必须编辑确认，不默认读取全部聊天。',
      '不做关系评分、排行榜或羞耻式提示；允许延后、删除和关闭通知。',
    ],
    workflow: [
      '用户主动提交聊天片段',
      'AI 提取人物、承诺、时间和置信度',
      '用户编辑与确认',
      '生成关系事项和提醒',
      '到期恢复原话与背景',
      '用户完成 / 延后 / 删除',
      '结果归档到人物历史',
    ],
    guardrails: [
      '最小范围上传，只处理用户主动选择的内容。',
      '模型不直接创建最终事项、不自动修改人物资料、不自动发送消息。',
      '原文、建议和最终确认结果可追溯，支持删除。',
    ],
    evaluation: [
      '评测错人物、错时间、漏提取、过度推断和敏感内容误分类。',
      '区分模型建议采纳率、提醒标记完成率和真实跟进，不将点击完成冒充线下行为。',
      '后续核心指标是第二条事项创建、到期查看和 D7 / D30，而不是单次提取准确率。',
    ],
    metrics: [
      { value: '50+', label: '目标种子用户', detail: '表示早期兴趣，不代表 PMF' },
      { value: '300+', label: '处理聊天片段', detail: '用于验证输入到提醒闭环' },
      { value: '82%', label: 'AI 建议采纳率', detail: '用户确认保存的有效建议' },
      { value: '68%', label: '提醒标记完成率', detail: '不等同于现实关系事项已完成' },
    ],
    reflection:
      '采纳率高只能说明 AI 候选有帮助，不能证明长期留存。最危险的假设是用户是否愿意持续提交私人语境，以及提醒是否真正减少遗漏。',
    workSamples: [
      {
        id: 'bondmemo-extraction-schema',
        type: 'workflow',
        title: '关系事项提取结构',
        format: 'Schema · 6 fields',
        disclosure: '依据 MVP 结构脱敏重绘',
        summary: '把人物、原话、承诺、时间、置信度与敏感级别拆开，避免一句模型总结覆盖原始语境。',
        items: ['原文与推断分离', '置信度', '敏感内容标记'],
      },
      {
        id: 'bondmemo-confirmation',
        type: 'decision',
        title: '确认前编辑路径',
        format: '交互流程 · 4 steps',
        disclosure: '依据种子用户流程脱敏重绘',
        summary: 'AI 只生成候选事项；用户可编辑人物、时间和原话后再决定保存。',
        items: ['候选建议', '编辑与删除', '明确保存'],
      },
      {
        id: 'bondmemo-metric-tree',
        type: 'evaluation',
        title: '关系提醒指标口径',
        format: '指标树 · MVP',
        disclosure: '不把点击完成等同于现实跟进',
        summary: '区分建议采纳、提醒查看、标记完成、真实跟进和长期留存，避免虚高结论。',
        items: ['建议采纳', '到期查看', 'D7 / D30'],
      },
    ],
    capabilities: ['用户洞察', 'JTBD', 'Human-in-the-loop', '隐私设计', '种子用户验证'],
    publicLinks: [{ label: 'GitHub', href: 'https://github.com/bleakbelladonnals/bondmemo', kind: 'github' }],
  },
  {
    slug: 'lumaflow',
    name: 'LumaFlow',
    nameCn: 'AI SEO 内容运营中台',
    category: 'AI WORKFLOW',
    year: '2025–2026',
    featured: false,
    projectType: 'company-pilot',
    stage: '内部试运行 · 3 轮原型测试',
    validationScope: '验证内容创建、问题修正、人工审批、版本管理与多格式交付等核心流程。',
    metricNotes: '指标来自内部试运行与年化交付口径，不代表外部 SaaS 客户规模。',
    summary:
      '面向出口型 B2B 制造企业，把产品知识、内容策划、生成、事实审核、人工审批与资产复用组织成可追溯流程。',
    audience: '出口型 B2B 制造企业的海外营销与 SEO 内容团队',
    role: '产品负责人：流程调研、中台规划、多 Agent 工作流、模型选型、评测与内部试运行',
    context:
      '内容团队的主要瓶颈不只是写得慢，还包括产品资料分散、参数口径不一致、审核依据不足与历史内容难复用。',
    problem: [
      '提高生成速度会同比放大事实错误与审核返工。',
      '不同人、不同渠道的产品参数和品牌表达缺少统一来源。',
      '历史内容没有版本、审核与复用记录，难以沉淀为资产。',
    ],
    whyAi:
      '模型用于资料理解、策略与长文生成；规则可检查的 SEO、格式和禁词由程序处理，关键参数对照可信知识源。',
    decisions: [
      '将产品划分为工作台、产品知识、内容生产、审核中心与内容资产五个模块。',
      '多 Agent 用于隔离上下文、工具和评价标准；顺序可预测的链路仍由 workflow 控制。',
      '严重事实问题阻断交付，其他问题进入人工修改与审批。',
    ],
    workflow: [
      '产品资料解析与标准化',
      '受众、关键词、渠道与品牌约束',
      'SEO / 内容策略',
      '大纲、正文与视觉 brief',
      '事实对照 + 规则检查 + 模型审核',
      '人工修改与审批',
      '发布、版本记录与资产复用',
    ],
    guardrails: [
      '关键参数必须对照知识来源，没有来源时不得当作事实发布。',
      '不让多个 Agent 自由讨论并决定交付，所有节点有明确输入输出。',
      '生成结果、审核结果与人工修改保留版本记录。',
    ],
    evaluation: [
      '统一任务集比较事实准确、指令遵循、英文表达、长文稳定性、时延和单篇成本。',
      '针对资料解析、内容策略、文章生成和质量审核分别建立 Prompt 与结构化输出规范。',
      '把一次审核通过率、严重事实漏检与审核时间作为核心质量指标。',
    ],
    metrics: [
      { value: '-80%', label: '初稿耗时', detail: '内部试运行' },
      { value: '64 → 85%', label: '一次审核通过率', detail: '事实、格式和品牌规则联合评审' },
      { value: '-50%', label: '平均审核时间', detail: '统一审核信息和修改入口' },
      { value: '1,500+ / year', label: '正式内容交付', detail: '年化规模口径' },
    ],
    reflection:
      '内容 AI 的壁垒不是生成，而是可信知识、审核规则、过程追溯和内容资产反馈。产能不是北极星，可发布与可复用才是。',
    workSamples: [
      {
        id: 'lumaflow-architecture',
        type: 'decision',
        title: '内容中台五模块架构',
        format: '信息架构 · 5 modules',
        disclosure: '依据内部规划脱敏重绘',
        summary: '把内容工作拆为工作台、产品知识、内容生产、审核中心与内容资产。',
        items: ['知识来源', '生产与审核', '资产复用'],
      },
      {
        id: 'lumaflow-quality-gates',
        type: 'workflow',
        title: '发布前质量门',
        format: '审批流程 · 6 checks',
        disclosure: '依据试运行流程脱敏重绘',
        summary: '事实、SEO、格式、品牌和人工审批分别有明确输入、阻断条件与版本记录。',
        items: ['事实阻断', '规则检查', '人工审批'],
      },
      {
        id: 'lumaflow-model-eval',
        type: 'evaluation',
        title: '模型与 Prompt 对比表',
        format: '评测矩阵 · 6 dimensions',
        disclosure: '仅展示维度与决策逻辑',
        summary: '统一比较事实准确、指令遵循、英文表达、长文稳定、时延和单篇成本。',
        items: ['质量维度', '成本与时延', '场景化结论'],
      },
    ],
    capabilities: ['多 Agent 工作流', '内容治理', '模型选型', 'SEO / GEO', '人工审批'],
    publicLinks: [],
  },
  {
    slug: 'zaowutai',
    name: 'Zaowutai',
    nameCn: '造物台 · AI 产品共创台',
    category: 'AI PRODUCT BUILDER',
    year: '2026',
    featured: false,
    projectType: 'independent-mvp',
    stage: '可运行个人 MVP',
    validationScope: '以限定任务集验证需求收敛、构建交接和验收闭环，30+ 工具出现重复使用。',
    metricNotes: '首轮可用率与耗时来自定义范围内的产品 benchmark，不代表规模化用户验证。',
    summary:
      '面向没有开发经验的普通人，由 AI 产品搭档带领幕后专业团队，将一个具体麻烦收敛为可执行、可验收的小产品。',
    audience: '有工作、生活、副业或创作问题，但不会写 PRD 或编程的用户',
    role: '独立 AI 产品设计：需求共创机制、Agent 方法、产品交付流程、AI Coding 实现与效果评测',
    context:
      '非技术用户往往能感觉到一个问题，却难以把它表达成产品需求；直接输入 Prompt 生成代码，容易在问题与范围未确认时就开始构建。',
    problem: [
      '用户不知道如何描述用户、场景、成功标准与功能边界。',
      '专业文档与 Agent 状态过早暴露，会让非专业用户迷失。',
      '直接构建会放大假设错误，也让用户丢失关键决策权。',
    ],
    whyAi:
      'AI 负责理解自由表达、发现最大信息缺口、动态追问并组织产品方案；固定流程、决策门和交付验收由系统控制。',
    decisions: [
      '只向用户呈现一位持续的 AI 产品搭档，幕后专业 Agent 按需展开。',
      '追问围绕当前最大信息缺口，信息足够时可零问题生成，最多五题。',
      '先锁定 Idea Brief、Build Spec 与验收清单，用户批准后才交给 Builder Agent。',
    ],
    workflow: [
      '输入具体麻烦或想法',
      'AI 识别信息缺口并动态追问',
      '生成产品雏形与 Idea Brief',
      '用户编辑、退回与批准',
      '定义机会、MVP 边界和使用流程',
      '生成 Build Spec 与验收清单',
      'Builder Agent 受控执行与效果评估',
    ],
    guardrails: [
      '事实、用户输入、推断、示例和待验证假设分别标记。',
      '用户是决策者，AI 不越过需求确认、范围批准和构建验收。',
      '第一版不伪造尚未接入的市场研究、用户研究或自动构建状态。',
    ],
    evaluation: [
      '以需求理解完整性、问题数、首轮方案可用率和从输入到可用工具的耗时验证产品流程。',
      '将专业能力封装为按需调用的 Skills，用 Evaluator–Optimizer 回路做质量收敛。',
      '以阶段上下文、接口约束、回归测试和可回退版本约束 AI Coding。',
    ],
    metrics: [
      { value: '82%', label: '首轮构建可用率', detail: '围绕验收清单评定' },
      { value: '< 15 min', label: '从问题到可用工具', detail: '平均耗时' },
      { value: '30+', label: '重复使用工具', detail: '用于观察交付后复用价值' },
    ],
    reflection:
      '产品文档不是最终价值，它们只是为了让用户在关键决策上有信息、有控制，并让后续构建可验收。',
    workSamples: [
      {
        id: 'zaowutai-idea-brief',
        type: 'research',
        title: 'Idea Brief 信息槽位',
        format: '需求模板 · 7 fields',
        disclosure: '公开 MVP 方法摘要',
        summary: '围绕用户、场景、问题、替代方案、成功标准、边界与假设收敛自由表达。',
        items: ['事实 / 推断分离', '最大信息缺口', '待验证假设'],
      },
      {
        id: 'zaowutai-decision-gates',
        type: 'decision',
        title: '共创建设决策门',
        format: '流程规格 · 3 gates',
        disclosure: '公开 MVP 方法摘要',
        summary: '需求确认、范围批准和构建验收三处必须由用户决定，AI 不越权推进。',
        items: ['Idea Brief', 'Build Spec', '验收结果'],
      },
      {
        id: 'zaowutai-evaluator',
        type: 'evaluation',
        title: '构建结果验收回路',
        format: 'Evaluator–Optimizer',
        disclosure: '公开 MVP 评测摘要',
        summary: '以验收清单、接口约束和回归结果收敛 AI Coding，而不是只展示生成速度。',
        items: ['验收清单', '失败分类', '版本回退'],
      },
    ],
    capabilities: ['需求共创', '多 Agent 方法', 'AI Coding', '产品交付', '效果评估'],
    publicLinks: [{ label: 'GitHub', href: 'https://github.com/bleakbelladonnals/zaowutai', kind: 'github' }],
  },
  {
    slug: 'microsoft-mcp',
    name: 'Microsoft MCP',
    nameCn: '开源体验优化贡献',
    category: 'OPEN SOURCE',
    year: '2026',
    featured: false,
    projectType: 'open-source',
    stage: '2 个 PR 已合并 · 1 个评审中',
    validationScope: '逐项核对 40+ Azure 服务场景，修复 7 个错误示例并推动关闭 2 个公开问题。',
    metricNotes: '合并状态与问题关闭状态以公开 GitHub 记录为准。',
    summary:
      '从用户和 AI 助手的实际使用流程出发，修正 Azure 云服务 MCP 文档中“产品功能、使用说明和示例不一致”的问题。',
    audience: '使用 MCP 连接 Azure 云服务的开发者与 AI 助手',
    role: '开源贡献者：问题分析、需求确认、方案整理、文档修改、评审跟进',
    context:
      '文档不只是说明，也是 AI 调用工具时的产品界面。错误或不完整的字段会让模型生成无效指令。',
    problem: [
      '产品能力、文档说明与示例参数不一致。',
      '订阅、租户等关键字段的默认规则不清楚。',
      '部分 Azure 场景的示例错误，影响人和 Agent 调用。',
    ],
    whyAi:
      '贡献直接优化了 AI 阅读和调用工具的上下文；不额外增加生成模型，而是降低已有 Agent 的误用率。',
    decisions: [
      '从真实调用路径逐项对照产品能力、说明和示例。',
      '重新梳理订阅、租户等关键信息的填写方式与默认规则。',
      '区分场景准确性修复与范围外重构，保证修改不影响正常路径。',
    ],
    workflow: [
      '复现人和 Agent 的调用路径',
      '对照产品能力、文档与代码示例',
      '归类不一致问题',
      '提交聚焦的修改方案',
      '通过项目自动检查',
      '根据维护者评审修正',
    ],
    guardrails: [
      '不利用文档修改暗中扩大产品能力范围。',
      '修复错误场景时保留仍然适用的默认路径。',
      '所有对外表述以公开 PR 与合并状态为准。',
    ],
    evaluation: [
      '逐项核对 40+ 服务场景的文档语义、参数和示例。',
      '以现有测试和自动检查确保文档修改不破坏项目。',
      '用维护者评审反馈持续收窄改动范围。',
    ],
    metrics: [
      { value: '3', label: '提交改进方案', detail: '2 个已合并，1 个评审中' },
      { value: '7', label: '修复错误示例', detail: '保留其他正常使用路径' },
      { value: '2', label: '关闭公开问题', detail: '相关修改通过自动检查' },
    ],
    reflection:
      '对 Agent 产品而言，文档、schema 和示例是产品交互的一部分。提高场景准确性，往往比再增加一层 Prompt 更有价值。',
    workSamples: [
      {
        id: 'mcp-reproduction-matrix',
        type: 'open-source',
        title: '40+ 场景复现矩阵',
        format: '公开记录摘要 · GitHub',
        disclosure: '以公开仓库与评审状态为准',
        summary: '逐项核对服务场景、参数语义、文档说明和示例输出，定位可复现的不一致。',
        items: ['场景与预期', '实际结果', '问题分类'],
      },
      {
        id: 'mcp-parameter-map',
        type: 'open-source',
        title: '关键参数语义映射',
        format: '文档 IA · before / after',
        disclosure: '公开修改逻辑摘要',
        summary: '重新组织订阅、租户和默认规则，降低人和 Agent 生成无效调用的概率。',
        items: ['字段含义', '默认规则', '有效示例'],
      },
      {
        id: 'mcp-review-log',
        type: 'open-source',
        title: '评审与合并记录',
        format: '公开协作 · 3 proposals',
        disclosure: '2 个已合并，1 个评审中',
        summary: '记录问题复现、方案收窄、自动检查与维护者反馈，展示真实开源协作过程。',
        items: ['修改范围', '自动检查', '评审反馈'],
      },
    ],
    capabilities: ['开源协作', 'Agent 开发者体验', '文档信息架构', '场景治理'],
    publicLinks: [{ label: 'GitHub', href: 'https://github.com/microsoft/mcp', kind: 'github' }],
  },
];

export const featuredCases = cases.filter((item) => item.featured);

export const strengths: Strength[] = [
  {
    id: 'product-01',
    name: '企业 AI 0→1',
    code: 'AI PRODUCT 0→1',
    description: '从真实业务流程中识别高价值问题，完成产品定义、MVP 取舍、跨团队推进与内部试点。',
    evidence: [
      { project: 'LumiAgent', slug: 'lumiagent', note: '从五条业务流程收敛到三个 MVP 场景' },
      { project: 'LumaFlow', slug: 'lumaflow', note: '把内容生产拆为五个产品模块并推进试运行' },
    ],
  },
  {
    id: 'agent-eval',
    name: 'Agent 方案与效果评测',
    code: 'AGENT & EVALUATION',
    description: '统筹模型、知识库、任务路由、确定性工具与人工确认，并用分层评测和 bad case 闭环持续优化。',
    evidence: [
      { project: 'LumiAgent', slug: 'lumiagent', note: '100 条核心评测集、1,000+ SFT 样本与三轮迭代' },
      { project: 'AgentDock', slug: 'agentdock', note: '围绕状态、人工介入和成本建立可观测模型' },
    ],
  },
  {
    id: 'ai-coding-open-source',
    name: 'AI Coding 与开源实践',
    code: 'AI CODING & OPEN SOURCE',
    description: '用 PRD、接口约束、验收清单与回归测试约束 AI Coding，并进入成熟开源项目按规范协作。',
    evidence: [
      { project: 'Microsoft MCP', slug: 'microsoft-mcp', note: '3 个改进方案，2 个已合并并关闭公开问题' },
      { project: '造物台', slug: 'zaowutai', note: '从需求定义、决策门到构建验收的完整闭环' },
    ],
  },
  {
    id: 'seo-validation',
    name: 'SEO 获客与需求验证',
    code: 'SEO & DEMAND VALIDATION',
    description: '用搜索词、页面转化、询盘与报价反馈验证需求优先级，再把洞察反哺产品与内容策略。',
    evidence: [
      { project: 'LumaFlow', slug: 'lumaflow', note: '把知识、生成、审核、审批和资产复用组织成产品闭环' },
    ],
  },
];

export const labProjects: LabProject[] = [
  {
    slug: 'artifact-harbor',
    name: 'Artifact Harbor',
    nameCn: '会话原生产物中心',
    category: 'DEEPSEEK HARNESS PLUGIN',
    year: '2026',
    stage: '探索性插件 · 公开仓库',
    summary: '让 Agent 生成的报告、网页、图片与 PDF 自动沉淀在当前会话，并保留可追溯的生成上下文。',
    problem: '文件夹只能保存文件，却很难回答一个产物来自哪次任务、哪条消息、哪个版本，以及之后如何继续使用。',
    approach: '围绕会话建立产物索引、预览与下载入口，让交付物继续留在任务语境中，而不是脱离上下文成为孤立文件。',
    validationScope: '公开仓库已提供实现与安全边界；当前证明插件能力，不宣称外部用户验证或商业化。',
    guardrails: ['限制可读取的产物范围', '保持来源与会话关系可追溯', '不把探索性插件包装成成熟平台'],
    capabilities: ['Agent 产物管理', '会话上下文', '安全预览', '插件设计'],
    publicLinks: [
      { label: 'GitHub', href: 'https://github.com/bleakbelladonnals/dsh-artifact-harbor', kind: 'github' },
    ],
  },
  {
    slug: 'dsh-echo',
    name: 'DSH Echo',
    nameCn: 'MCP 调用录制回放插件',
    category: 'DEEPSEEK HARNESS PLUGIN',
    year: '2026',
    stage: '探索性插件 · v0.1 可从源码安装',
    summary: '录制 Agent 的真实 MCP 调用并按需安全回放，降低外部工具调用的复现、调试与回归成本。',
    problem: 'MCP 调用依赖真实 API、数据库和网络状态，失败时难以区分选错工具、参数错误、服务异常还是协议变化。',
    approach: '记录工具名、参数、响应、错误与时序，离线回放确定性结果，并用契约快照识别 schema 漂移。',
    validationScope: '公开仓库包含安装、架构、安全模型与自动化测试记录；仍按插件级验证呈现。',
    guardrails: ['写操作默认隔离', '记录落盘前进行敏感信息脱敏', '未录制调用默认 fail-closed'],
    capabilities: ['MCP', 'Record / Replay', '契约测试', '安全与可观测'],
    publicLinks: [{ label: 'GitHub', href: 'https://github.com/bleakbelladonnals/dsh-echo', kind: 'github' }],
  },
];

export const experience: Array<{
  period: string;
  company: string;
  role: string;
  summary: string;
  details?: Array<{ heading: string; body: string }>;
}> = [
  {
    period: '2025.05 — 2026.08',
    company: '华源科技',
    role: 'AI 产品经理',
    summary:
      '负责出海市场研究、海外独立站增长与企业 AI 产品从 0 到 1，推动 LumiAgent 进入内部业务应用，并规划 LumaFlow 内容中台。',
  },
  {
    period: '2024.09 — 2025.02',
    company: '深圳手回科技集团',
    role: 'AI 产品经理（实习）',
    summary:
      '围绕旅行险用户决策与投保转化，负责 AI 智能选购助手的需求分析、产品设计与迭代，覆盖用户意图识别、场景化推荐、保险知识问答及效果评测，通过用户反馈与转化数据持续优化 AI 能力和投保体验。',
    details: [
      {
        heading: 'AI 用户洞察',
        body: '基于大模型分析用户咨询、评论及客服记录，通过意图识别与主题聚类，自动归纳保障范围、理赔条件、免责条款和产品选择等高频需求及决策障碍，并将分析结果用于产品定位、知识库建设、FAQ 优化和内容选题。',
      },
      {
        heading: '智能选购与 RAG 问答',
        body: '建设旅行险智能选购助手，根据用户出行场景和保障需求推荐适配产品及保障方案；搭建保险产品知识库，通过 RAG 检索保障责任、免责条款和理赔条件，为用户提供可追溯的产品解读与选购依据，降低理解条款和比较产品的成本。',
      },
      {
        heading: '评测体系与持续迭代',
        body: '建立覆盖 AI 回答准确率、推荐采纳率、转人工率和投保转化率的评测体系，结合用户追问、低满意回答及客服纠错数据定位知识缺口与回答缺陷，持续优化知识库、检索策略和 Prompt，推动智能选购及投保流程迭代上线。',
      },
    ],
  },
  {
    period: '2021.09 — 2025.06',
    company: '广州软件学院',
    role: '风景园林设计',
    summary:
      '设计背景带来了多尺度观察、复杂系统拆解和人与环境关系的长期训练。',
  },
];

export function getCase(slug: string) {
  return cases.find((item) => item.slug === slug);
}
