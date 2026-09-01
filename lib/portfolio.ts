export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  nameCn: string;
  category: string;
  year: string;
  featured: boolean;
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
  capabilities: string[];
  link?: string;
};

export type CapabilityEvidence = {
  name: string;
  code: string;
  description: string;
  evidence: Array<{ project: string; slug: string; note: string }>;
};

export const profile = {
  nameCn: '甘淑琪',
  nameEn: 'Donna Gan',
  role: 'AI 产品经理',
  location: '北京',
  status: 'OPEN TO WORK',
  email: 'bleakbelladonnals@gmail.com',
  github: 'https://github.com/bleakbelladonnals',
  headline: '把复杂 AI 能力，做成可落地、可评测、可持续迭代的产品。',
  intro:
    '具备企业级 AI 产品从 0 到 1 主导经验，关注 Agent 工作流、人机协作、效果评测与真实业务落地。',
};

export const cases: CaseStudy[] = [
  {
    slug: 'lumiagent',
    name: 'LumiAgent',
    nameCn: '企业知识问答 Agent',
    category: 'ENTERPRISE AI',
    year: '2025–2026',
    featured: true,
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
      '构建 220 条窄任务监督样本参与模型方案验证，格式遵循率由 78% 提升至 96%。',
    ],
    metrics: [
      { value: '12 → 2 min', label: '高频查询耗时', detail: '中位耗时降低约 83%' },
      { value: '-35%', label: '跨部门重复确认', detail: '试点业务流程' },
      { value: '90%', label: '核心任务通过率', detail: '100 条核心回归集' },
      { value: '1,000 万+', label: '辅助处理订单金额', detail: '表示覆盖规模，非 AI 新增收入' },
    ],
    reflection:
      '企业 Agent 的价值不在模型显得多聪明，而在知识、数据、工具、规则、人和责任边界被设计成可评测的闭环。',
    capabilities: ['0→1 产品定义', 'Agent 路由', 'RAG', '效果评测', '跨部门落地'],
  },
  {
    slug: 'agentdock',
    name: 'AgentDock',
    nameCn: '多 Agent 任务可观测工作台',
    category: 'AGENT UX',
    year: '2026',
    featured: true,
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
    capabilities: ['Agent UX', '状态模型', '人机协同', '成本治理', 'AI Coding'],
    link: 'https://github.com/bleakbelladonnals/AgentDock',
  },
  {
    slug: 'bondmemo',
    name: 'BondMemo',
    nameCn: '牵记 · 关系事项跟进助手',
    category: 'CONSUMER AI',
    year: '2026',
    featured: true,
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
    capabilities: ['用户洞察', 'JTBD', 'Human-in-the-loop', '隐私设计', '种子用户验证'],
    link: 'https://github.com/bleakbelladonnals/bondmemo',
  },
  {
    slug: 'lumaflow',
    name: 'LumaFlow',
    nameCn: 'AI SEO 内容运营中台',
    category: 'AI WORKFLOW',
    year: '2025–2026',
    featured: false,
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
    capabilities: ['多 Agent 工作流', '内容治理', '模型选型', 'SEO / GEO', '人工审批'],
  },
  {
    slug: 'zaowutai',
    name: 'Zaowutai',
    nameCn: '造物台 · AI 产品共创台',
    category: 'AI PRODUCT BUILDER',
    year: '2026',
    featured: false,
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
    capabilities: ['需求共创', '多 Agent 方法', 'AI Coding', '产品交付', '效果评估'],
    link: 'https://github.com/bleakbelladonnals/zaowutai',
  },
  {
    slug: 'microsoft-mcp',
    name: 'Microsoft MCP',
    nameCn: '开源体验优化贡献',
    category: 'OPEN SOURCE',
    year: '2026',
    featured: false,
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
    capabilities: ['开源协作', 'Agent 开发者体验', '文档信息架构', '场景治理'],
    link: 'https://github.com/microsoft/mcp',
  },
];

export const featuredCases = cases.filter((item) => item.featured);

export const capabilities: CapabilityEvidence[] = [
  {
    name: '0→1 产品定义',
    code: 'PRODUCT 0→1',
    description: '从复杂流程中识别高价值问题，明确 MVP 和被砍需求。',
    evidence: [
      { project: 'LumiAgent', slug: 'lumiagent', note: '从五条业务流程收敛到三个 MVP 场景' },
      { project: 'BondMemo', slug: 'bondmemo', note: '从 Personal CRM 收敛到关系事项跟进' },
    ],
  },
  {
    name: 'Agent 与 Workflow',
    code: 'AGENT SYSTEM',
    description: '区分模型理解、知识检索、确定性工具和人工决策。',
    evidence: [
      { project: 'LumiAgent', slug: 'lumiagent', note: 'RAG、结构化查询与规则工具路由' },
      { project: 'LumaFlow', slug: 'lumaflow', note: '多 Agent 隔离上下文，Workflow 控制顺序' },
    ],
  },
  {
    name: '效果评测',
    code: 'EVALUATION',
    description: '将端到端效果拆为可定位的评测层，持续管理 bad case。',
    evidence: [
      { project: 'LumiAgent', slug: 'lumiagent', note: '100 条回归用例与六层问题归因' },
      { project: 'LumaFlow', slug: 'lumaflow', note: '事实、指令、长文、时延和成本统一任务集' },
    ],
  },
  {
    name: '人机协作',
    code: 'HUMAN-IN-THE-LOOP',
    description: '让模型生成建议，把责任明确的高风险动作交还给人。',
    evidence: [
      { project: 'BondMemo', slug: 'bondmemo', note: '候选提取必须经用户编辑确认' },
      { project: 'AgentDock', slug: 'agentdock', note: '统一待处理队列与安全恢复' },
    ],
  },
  {
    name: 'AI Coding 交付',
    code: 'AI CODING',
    description: '用 PRD、状态模型、接口约束、验收清单和回归测试约束构建。',
    evidence: [
      { project: 'AgentDock', slug: 'agentdock', note: '一周完成窄范围 MVP 与可用性验证' },
      { project: '造物台', slug: 'zaowutai', note: '从需求定义到验收的 AI 原生交付流程' },
    ],
  },
  {
    name: '增长与内容治理',
    code: 'GROWTH & SEO',
    description: '把搜索需求、产品知识、生成、质量审核和资产复用连成闭环。',
    evidence: [
      { project: 'LumaFlow', slug: 'lumaflow', note: '年化 1,500+ 内容交付与审核效率提升' },
    ],
  },
];

export const experience = [
  {
    period: '2025.05 — 2026.08',
    company: '华源五金电镀有限公司',
    role: 'AI 产品经理',
    summary:
      '负责出海市场调研、海外独立站增长及企业 AI 产品从 0 到 1，推动 LumiAgent 与 LumaFlow 进入真实业务。',
  },
  {
    period: '2024.09 — 2025.02',
    company: '深圳乐园科技集团',
    role: '产品运营实习生',
    summary:
      '围绕镓风险产品做用户需求、信息架构、投保流程与 A/B 测试，单篇内容浏览量超 10 万。',
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
