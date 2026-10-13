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
  'company-pilot': '企业项目',
  'independent-mvp': '独立产品',
  'open-source': '公开开源',
};

export type CaseStudy = {
  slug: string;
  name: string;
  nameCn: string;
  category: string;
  year: string;
  featured: boolean;
  more?: boolean;
  compact?: boolean;
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
  id: 'product-01' | 'agent-eval' | 'ai-coding-open-source' | 'seo-validation' | 'product-communication';
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
  headline: '让 Agent 进入业务流程，让 AI 产品产生持续价值。',
  intro:
    '主导企业 Agent 与 AI 内容平台从需求定义到业务落地，围绕流程重构、效果评测与能力复用持续迭代；同时通过独立产品、开源贡献和内容分享，探索 Agent 的能力边界与协作体验。',
};

export const cases: CaseStudy[] = [
  {
    "slug": "lumaflow",
    "name": "LumaFlow",
    "nameCn": "AI 内容运营中台",
    "category": "GEO & CONTENT PLATFORM",
    "year": "2025.07–2026.09",
    "featured": true,
    "projectType": "company-pilot",
    "stage": "内部运行 · 规模化内容生产",
    "validationScope": "4 周完成 GEO POC，覆盖 30+ 核心产品、120+ 关键词与 150+ 篇内容；验证后推进平台化建设与 SEO 扩展。",
    "metricNotes": "",
    "summary": "从 GEO 渠道验证切入，将企业知识、内容策略、多 Agent 生产、审核评测与询盘反馈连成闭环，为出口型 B2B 制造企业沉淀可复用的内容运营能力。",
    "audience": "出口型 B2B 制造企业的海外营销与内容运营团队",
    "role": "AI 产品经理：渠道判断、POC 验证、0→1 中台规划、多 Agent 工作流、评测与能力复用",
    "context": "企业希望通过新渠道获得有效询盘，但产品知识分散、内容生产依赖个人经验，GEO / SEO 规则割裂，发布结果也难以回流到下一轮生产。",
    "problem": [
      "产品资料、历史内容和品牌知识分散，内容策略缺少统一依据。",
      "渠道规则不同，运营经验难以复用到新的内容场景。",
      "生成质量波动与人工返工限制交付规模，流量和询盘反馈未进入生产流程。"
    ],
    "whyAi": "用 Agent 承接资料检索、选题规划、内容生成与素材处理；通过统一知识、渠道规则和审核标准控制交付质量，再用实际询盘反馈调整策略。",
    "decisions": [
      "先梳理曝光—访问—询盘—订单漏斗，结合渠道潜力、验证周期与研发成本，优先以 GEO POC 验证商业价值。",
      "规划业务资产、内容策略、Agent 生产、审核评测、效果反馈五层架构，沉淀 GEO / SEO 共用能力。",
      "基于 CrewAI 编排标准任务，明确上下文交接、异常回退与人工介入机制。",
      "把资料 Schema、Content Brief、Workflow、Prompt 与评测基线沉淀为模板，新渠道仅配置策略、内容结构与质量标准。"
    ],
    "workflow": [
      "企业知识与历史内容接入",
      "GEO / SEO 关键词与内容策略",
      "资料检索与选题规划",
      "Agent 内容生成与素材处理",
      "质量评测与人工修改",
      "发布与内容资产沉淀",
      "收录、引用和询盘反馈"
    ],
    "guardrails": [
      "用企业产品资料和品牌知识作为内容生成与事实审核依据。",
      "为任务交接、异常回退和人工介入定义清晰节点。",
      "将渠道规则与通用生产能力分开配置，保持复用过程中的质量口径一致。"
    ],
    "evaluation": [
      "建立覆盖事实准确性、指令遵循等指标的 Evaluation 体系，构建 60+ Golden Case 与 8 类 Bad Case。",
      "通过 4 轮 Prompt、模型及 Workflow 迭代，一次审核通过率从 58% 提升至 82%，人工修改率从 42% 降至 18%。",
      "结合 AI 搜索收录、引用与实际询盘评估渠道价值，持续回流内容策略。"
    ],
    "metrics": [
      {
        "value": "3 倍",
        "label": "团队内容交付能力",
        "detail": "单篇生产周期从 2.5 小时缩短至 50 分钟"
      },
      {
        "value": "58% → 82%",
        "label": "一次审核通过率",
        "detail": "4 轮 Prompt、模型与 Workflow 迭代"
      },
      {
        "value": "70%",
        "label": "有效询盘占比",
        "detail": "渠道获客成本下降 40%"
      },
      {
        "value": "1 周 → 2–3 天",
        "label": "新增场景配置周期",
        "detail": "复用知识、Workflow 与评测基线"
      }
    ],
    "reflection": "先验证渠道能否带来实际询盘，再决定哪些能力值得平台化。将运营经验沉淀为知识、策略与评测标准后，内容效率和跨渠道扩展才有了共同基础。",
    "workSamples": [],
    "capabilities": [
      "0→1 中台规划",
      "GEO / SEO",
      "多 Agent 工作流",
      "Evaluation",
      "内容能力复用"
    ],
    "publicLinks": []
  },
  {
    "slug": "lumiagent",
    "name": "LumiAgent",
    "nameCn": "企业订单协同 Agent",
    "category": "ENTERPRISE AGENT",
    "year": "2025.09–2026.08",
    "featured": true,
    "projectType": "company-pilot",
    "stage": "业务落地 · 覆盖 3 个部门",
    "validationScope": "覆盖销售、仓储、采购 3 个部门及 80% 高频订单协同需求，累计支撑约 1,000 万元订单金额。",
    "metricNotes": "约 1,000 万元为累计支撑的订单金额。",
    "summary": "重构从订单接收到采购缺口判断的核心流程，让 Agent 理解任务、检索知识、调用跨系统工具，并在异常与关键节点交由业务人员确认。",
    "audience": "销售、仓储与采购团队",
    "role": "AI 产品经理：流程调研、Agent 架构、SFT 与评测体系、灰度落地及业务迭代",
    "context": "订单协同需要反复确认产品规格、拆解物料、核对库存和判断采购缺口。信息分散在不同系统与角色之间，订单卡点平均需要 2 小时响应。",
    "problem": [
      "5 条核心流程包含重复查询与跨部门确认，拖慢订单内部确认。",
      "请求常混合知识查询、信息核对与结果生成，并存在型号别名和信息缺失。",
      "工具调用失败、输出格式不稳定和异常任务需要统一的恢复与人工确认路径。"
    ],
    "whyAi": "Agent 将自然语言请求转为任务链路，通过 RAG、结构化查询与 Tool Calling 组合完成业务处理；多轮澄清与人工确认承接不完整信息和异常情况。",
    "decisions": [
      "还原产品查询、订单拆解、库存核对等 5 条核心流程，确定 3 个 MVP 场景。",
      "设计意图识别—任务路由—RAG / 结构化查询—Tool Calling—结果汇总的执行链路。",
      "把多轮澄清、上下文补全、异常兜底与 Human-in-the-loop 纳入常规任务流程。",
      "针对意图识别、型号别名和结构化输出，建立 SFT、Prompt Engineering 与 Evaluation 优化闭环。"
    ],
    "workflow": [
      "接收订单与自然语言任务",
      "意图识别与信息补全",
      "任务拆解与路由",
      "知识检索与跨系统工具调用",
      "汇总核对结果与采购缺口",
      "异常流转与关键节点人工确认",
      "业务反馈与评测回归"
    ],
    "guardrails": [
      "信息缺失时通过多轮澄清补全上下文。",
      "工具调用失败时进入异常处理与人工确认流程。",
      "关键业务节点保留人工决策，结合业务反馈持续优化任务边界。"
    ],
    "evaluation": [
      "构建 1,000+ SFT 样本与 100 条核心评测集，覆盖意图识别、型号别名和结构化输出。",
      "结合 Few-shot、Bad Case 与回归测试，格式遵循率从 78% 提升至 96%，核心任务通过率达到 90%。",
      "在灰度业务流程中观察核对差错、人工介入、订单确认周期和卡点响应时效。"
    ],
    "metrics": [
      {
        "value": "-50%",
        "label": "订单内部确认周期",
        "detail": "覆盖 80% 高频订单协同需求"
      },
      {
        "value": "+40%",
        "label": "销售人均月有效维护客户数",
        "detail": "减少订单协同中的重复操作"
      },
      {
        "value": "-45%",
        "label": "常规订单人工介入率",
        "detail": "规格与库存核对差错下降 38%"
      },
      {
        "value": "2 h → 15 min 内",
        "label": "订单卡点响应时效",
        "detail": "核对与缺口判断人工操作时长下降 42%"
      }
    ],
    "reflection": "企业 Agent 的落地需要同时重构任务和协作方式。将查询、工具执行、异常流转与人工决策连成闭环，才能把模型表现转化为订单效率和客户维护能力。",
    "workSamples": [],
    "capabilities": [
      "业务流程重构",
      "Agent 架构",
      "RAG / Tool Calling",
      "SFT 优化",
      "业务评测"
    ],
    "publicLinks": []
  },
  {
    "slug": "taotian-ai-designer",
    "name": "淘天 AI 设计师平台",
    "nameCn": "电商 AIGC 工作流与设计 Agent",
    "category": "AIGC & DESIGN AGENT",
    "year": "2024.09–2025.04",
    "featured": true,
    "projectType": "company-pilot",
    "stage": "平台上线 · 15 条业务线",
    "validationScope": "面向单日万张级营销素材需求，平台覆盖 15 条业务线、约 50 名运营，AI 月均完成 11,000+ 计件设计需求。",
    "metricNotes": "商品一致性为本人独立负责模块；AI 覆盖率与预算为平台整体成果。",
    "summary": "围绕商品图文替换重构 AIGC 生产流程，独立优化商品一致性模块，并配套对话式设计 Agent，让运营用自然语言调用平台 11 类设计能力。",
    "audience": "电商内部运营与设计师",
    "role": "AI 产品经理（实习）：路线评估、商品一致性优化、模块评测、设计 Agent 配套建设",
    "context": "月均 2 万+ 计件设计需求中存在大量重复提需与低价值制图工作。运营需要自助完成常规营销素材生产，同时保持商品结构、文字与导出规格准确。",
    "problem": [
      "设计需求非标准、重复沟通多，需要先划定可被 AI 稳定承接的场景。",
      "商品替换容易出现主体变形和结构丢失，生成结果难以直接采用。",
      "不同环节缺少一致的评测口径，运营难以快速找到并使用合适的平台能力。"
    ],
    "whyAi": "将图文替换拆成生成、替换和校对环节，并用设计 Agent 理解运营需求、检索功能文档和调用工具，减少人工制图与跨角色沟通成本。",
    "decisions": [
      "将需求归为 11 类标准场景，结合需求规模、标准化程度、生成可控性与人工成本确定优先级。",
      "设计 3 套 AIGC 技术路线与 PS 脚本方案的对比验证，覆盖 50+ 组模板与商品样本，选择多模型协同方案。",
      "独立负责商品一致性优化，按商品类型拆解失败模式，把完整性与结构保持固化为生成约束和处理规则。",
      "将 11 类设计能力封装为工具，结合意图识别、Function Calling、多轮路由及功能文档 RAG，支持运营自助制图。"
    ],
    "workflow": [
      "运营通过自然语言提出需求",
      "Agent 识别意图并匹配设计能力",
      "检索平台功能与任务信息",
      "调用模板生成与商品替换工具",
      "文字修正与结果校对",
      "按导出规格交付素材"
    ],
    "guardrails": [
      "将商品完整性与结构保持要求固化为生成约束。",
      "与设计师统一各环节采用率和结果验收标准。",
      "使用同批代表性样本回归，持续处理商品、文案、版式与规格问题。"
    ],
    "evaluation": [
      "建立商品完整性、文案准确性、版式适配、导出规格 4 类评测维度。",
      "整理代表性业务素材和典型失败案例，构建模块评测集并协同研发回归验证。",
      "分环节评估采用率，商品替换从 25% 提升至 50%，文字修正达到 70%。"
    ],
    "metrics": [
      {
        "value": "25% → 50%",
        "label": "商品替换环节采用率",
        "detail": "独立负责商品一致性模块优化"
      },
      {
        "value": "70%",
        "label": "文字修正环节采用率",
        "detail": "跑通模板生成—商品替换—文字修正"
      },
      {
        "value": "53%",
        "label": "平台计件设计 AI 覆盖率",
        "detail": "AI 月均完成 11,000+ 计件设计需求"
      },
      {
        "value": "524 万元",
        "label": "平台累计减少设计预算",
        "detail": "上线 8 个月后，预算降幅 19.5%"
      }
    ],
    "reflection": "将 AIGC 按业务环节拆开评测，才能找到真正限制采用率的部分。商品一致性优化与运营自助入口共同推动了常规设计需求向平台化生产迁移。",
    "workSamples": [],
    "capabilities": [
      "AIGC 工作流",
      "商品一致性",
      "分环节评测",
      "设计 Agent",
      "平台复用"
    ],
    "publicLinks": []
  },
  {
    "slug": "ludoready",
    "name": "LudoReady",
    "nameCn": "长链路 Agent 能力评测平台",
    "category": "AGENT EVALUATION",
    "year": "2026",
    "featured": false,
    "projectType": "independent-mvp",
    "stage": "独立开发 · 30+ 次对照实验",
    "validationScope": "接入 10+ 前沿模型，完成 30+ 次游戏生成 Agent 对照实验，沉淀 5 类 Bad Case 与可复用评测流程。",
    "metricNotes": "",
    "summary": "将“一句话生成完整游戏”设计为综合任务，同时观察规划、编码、多模态、工具调用和 Debug，评估新模型在复杂长链路任务中的实际能力边界。",
    "audience": "需要比较模型与 Coding Agent 长链路执行能力的开发者和产品团队",
    "role": "独立设计与开发：综合任务设计、Agent 执行流程、模型对照实验与失败归因",
    "context": "单一 Benchmark 难以反映 Agent 连续完成复杂任务的能力。一个完整游戏需要模型跨越需求理解、代码、素材、工具与运行验证，能够暴露环节之间的协同问题。",
    "problem": [
      "单项指标难以判断模型能否独立交付可运行成果。",
      "同一失败可能来自模型能力，也可能来自上下文组织或工具反馈。",
      "不同开发范式对完成率、返工、稳定性和成本的影响需要在相同条件下观察。"
    ],
    "whyAi": "通过可重复的游戏生成任务，把模型放入真实的多步骤执行环境，观察它如何规划、使用工具、处理素材与修复报错。",
    "decisions": [
      "基于 Codex Harness 搭建端到端执行流程，串联任务拆解、多文件代码、素材处理、运行与 Debug。",
      "保持任务、工具权限和运行环境一致，对不同模型开展重复对照实验。",
      "比较 Direct Coding、Spec-Driven Development 与 Test / Eval-Driven Development，观察完整交付表现。"
    ],
    "workflow": [
      "输入游戏需求与任务条件",
      "Agent 规划并拆解任务",
      "生成多文件代码与处理素材",
      "调用文件和运行工具",
      "自动测试与运行验证",
      "依据报错自主修复",
      "记录结果并分类复盘"
    ],
    "guardrails": [
      "对照实验使用相同任务、工具权限与运行环境。",
      "将模型失效与流程设计问题分别归因。",
      "同时观察任务结果、返工次数和 Token 成本。"
    ],
    "evaluation": [
      "从需求理解、任务规划、代码生成、多模态处理、工具调用和自主纠错环节观察表现。",
      "复盘需求偏离、功能缺失、代码报错、素材理解错误、重复修改及 Debug 失败等现象，沉淀 5 类 Bad Case。",
      "围绕完成率、稳定性与单次成功成本评估模型，并调整任务描述、上下文组织和工具反馈。"
    ],
    "metrics": [
      {
        "value": "10+",
        "label": "接入前沿模型",
        "detail": "在一致条件下开展重复对照"
      },
      {
        "value": "30+",
        "label": "游戏生成对照实验",
        "detail": "覆盖长链路自主任务执行"
      },
      {
        "value": "5 类",
        "label": "Bad Case 沉淀",
        "detail": "结合典型案例归因与复盘"
      }
    ],
    "reflection": "长链路评测需要同时观察最终交付和中间失效环节。把任务条件、过程记录和错误归因固定下来，才能判断能力差异来自模型，还是来自 Agent 的执行方式。",
    "workSamples": [],
    "capabilities": [
      "模型能力评测",
      "Coding Agent",
      "长链路执行",
      "失败归因",
      "AI Coding 范式"
    ],
    "publicLinks": []
  },
  {
    "slug": "grokoo",
    "name": "Grokoo",
    "nameCn": "多 Agent 桌面协作伙伴",
    "category": "AGENT COMPANION",
    "year": "2026",
    "featured": false,
    "projectType": "independent-mvp",
    "stage": "macOS 桌面应用 · 线下分享",
    "validationScope": "独立设计并开发 macOS 桌面应用，项目受邀在 Grok Bot 线下分享会进行分享。",
    "metricNotes": "",
    "summary": "围绕多 Agent 向长期协作伙伴演进的形态展开探索，以角色身份、人格行为与真实任务状态建立持续协作感。",
    "audience": "希望与多个 Agent 持续协作的桌面用户",
    "role": "独立产品设计与开发",
    "context": "当 Agent 持续参与真实任务，用户需要感知协作对象的身份、行为和工作状态。Grokoo 将这些信息带入 macOS 桌面体验。",
    "problem": [
      "如何让多 Agent 的角色身份、人格行为与真实任务状态形成一致的协作体验。"
    ],
    "whyAi": "将 Agent 的真实任务状态与角色表现结合，让长期协作关系能够被看见和感知。",
    "decisions": [
      "以角色身份、人格行为与真实任务状态组织桌面协作体验。"
    ],
    "workflow": [
      "建立角色身份",
      "呈现人格行为",
      "关联真实任务状态",
      "持续参与桌面协作"
    ],
    "guardrails": [],
    "evaluation": [],
    "metrics": [],
    "reflection": "这项探索聚焦 Agent 作为长期协作伙伴时的产品形态，并通过线下分享交流产品实践。",
    "workSamples": [],
    "capabilities": [
      "多 Agent 体验",
      "macOS 应用",
      "角色与状态设计",
      "产品分享"
    ],
    "publicLinks": [],
    "compact": true
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
      '通过 Issue、源码与 E2E Prompt 交叉核验 Agent 调用 Azure 服务的实际能力边界，向 Microsoft 官方仓库提交 3 项改进，推动关闭 2 个公开问题。',
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
      '通过校准文档、参数语义与示例，改善 AI 阅读和调用工具的上下文，减少 Agent 生成无效指令。',
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
      '依据源码与 E2E Prompt 核对 Azure 服务的实际能力边界。',
      '修复错误场景时保留仍然适用的默认路径。',
      '通过 Issue、源码和 E2E Prompt 交叉核验修改结果。',
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
  },  {
    slug: 'agentdock',
    name: 'AgentDock',
    nameCn: '多 Agent 任务可观测工作台',
    category: 'AGENT UX',
    year: '2026',
    featured: false,
    more: true,
    projectType: 'independent-mvp',
    stage: '可运行个人 MVP',
    validationScope: '累计记录 200+ 条 Agent 任务，覆盖 60+ 个待确认、异常与人工介入节点。',
    metricNotes: '任务记录包含日常使用与验证运行，覆盖运行状态和人工介入节点。',
    summary:
      '把分散在不同 AI 会话中的运行状态、待确认事项、生成结果与模型成本聚合到统一工作台。',
    audience: '同时运行多个 Agent 与 AI 对话的重度用户',
    role: '独立产品设计与实现：需求调研、状态模型、信息架构、原型、AI Coding 交付与验收',
    context:
      '同时使用多个 Agent 时，任务状态分散、人工介入时机难判断，用户也难以掌握整体模型费用。',
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
      '区分模型成本估算与实际账单，帮助用户判断任务开销。',
      '通过任务记录复盘遗漏、异常和人工介入过程。',
    ],
    evaluation: [
      '以待介入任务发现时间、漏处理率、确认后恢复成功率和巡检次数为主要验收方向。',
      '用真实与测试任务覆盖运行中、待确认、失败、完成和成本异常状态。',
      '通过 PRD、接口约束和验收清单推进 AI Coding，并逐项验证任务处理流程。',
    ],
    metrics: [
      { value: '200+', label: 'Agent 任务记录', detail: '用于验证数据模型与信息架构' },
      { value: '60+', label: '待确认 / 异常节点', detail: '用于检验人工介入界面' },
      { value: '1 week', label: 'MVP 交付', detail: '通过受控 AI Coding 快速验证' },
    ],
    reflection:
      '多 Agent 协作的关键在于及时发现需要人介入的任务。统一队列应持续围绕减少漏处理、缩短发现时间和恢复任务优化。',
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
    featured: false,
    more: true,
    projectType: 'independent-mvp',
    stage: '种子用户 MVP · 3 轮迭代',
    validationScope: '面向 50+ 目标用户，累计处理 300+ 聊天片段并生成 200+ 关系事项。',
    metricNotes: '采纳率按用户确认保存的建议统计；完成率按产品内提醒标记统计。',
    summary:
      '把聊天片段转成经用户确认的关系事项，并在提醒时恢复人物、原话与未结束的关系语境。',
    audience: '容易因忙碌而遗漏亲友后续的职场人',
    role: '独立产品项目：用户需求、定位收敛、AI 闭环、隐私设计、MVP 与种子用户迭代',
    context:
      '忙碌时，用户容易忘记聊天中答应过的事，以及需要继续关心的后续；重新翻找聊天又需要恢复当时的语境。',
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
      '分别观察模型建议采纳、提醒标记完成与实际跟进反馈。',
      '持续观察第二条事项创建、到期查看和 D7 / D30 留存，验证日常使用价值。',
    ],
    metrics: [
      { value: '50+', label: '目标种子用户', detail: '参与早期需求与使用验证' },
      { value: '300+', label: '处理聊天片段', detail: '用于验证输入到提醒闭环' },
      { value: '82%', label: 'AI 建议采纳率', detail: '用户确认保存的有效建议' },
      { value: '68%', label: '提醒标记完成率', detail: '按产品内提醒标记统计' },
    ],
    reflection:
      '从一次准确提取到持续使用，还需要降低提交私人语境的成本，并在提醒时恢复足够的背景，帮助用户自然地继续关心与跟进。',
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
        disclosure: '区分产品内行为与用户跟进反馈',
        summary: '串联建议采纳、提醒查看、标记完成、实际跟进反馈和长期留存，观察完整使用链路。',
        items: ['建议采纳', '到期查看', 'D7 / D30'],
      },
    ],
    capabilities: ['用户洞察', 'JTBD', 'Human-in-the-loop', '隐私设计', '种子用户验证'],
    publicLinks: [{ label: 'GitHub', href: 'https://github.com/bleakbelladonnals/bondmemo', kind: 'github' }],
  },
  {
    slug: 'zaowutai',
    name: 'Zaowutai',
    nameCn: '造物台 · AI 产品共创台',
    category: 'AI PRODUCT BUILDER',
    year: '2026',
    featured: false,
    more: true,
    projectType: 'independent-mvp',
    stage: '可运行个人 MVP',
    validationScope: '以限定任务集验证需求收敛、构建交接和验收闭环，30+ 工具出现重复使用。',
    metricNotes: '首轮可用率与耗时按限定任务集及对应验收清单统计。',
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
      '明确展示需求确认、方案生成与构建验收的当前进度。',
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
      '需求和规格文档要帮助用户做出关键决定，并把成功标准传递到后续构建与验收中，才能支持持续可控的产品共创。',
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
        summary: '以验收清单、接口约束和回归结果持续改进 AI Coding 的交付质量。',
        items: ['验收清单', '失败分类', '版本回退'],
      },
    ],
    capabilities: ['需求共创', '多 Agent 方法', 'AI Coding', '产品交付', '效果评估'],
    publicLinks: [{ label: 'GitHub', href: 'https://github.com/bleakbelladonnals/zaowutai', kind: 'github' }],
  },
];

export const featuredCases = cases.filter((item) => item.featured);

export const strengths: Strength[] = [
  {
    "id": "product-01",
    "name": "企业 Agent 0→1 落地",
    "code": "ENTERPRISE AGENT",
    "description": "从订单协同与海外增长中识别 AI 改造机会，完成需求定义、方案设计与客户落地，并沉淀可复用的企业解决方案。",
    "evidence": [
      {
        "project": "LumiAgent",
        "slug": "lumiagent",
        "note": "订单确认周期缩短 50%，销售人均月有效维护客户数提升 40%"
      },
      {
        "project": "LumaFlow",
        "slug": "lumaflow",
        "note": "GEO POC 验证后推进中台建设与跨渠道复用"
      }
    ]
  },
  {
    "id": "agent-eval",
    "name": "Agent 架构与效果评测",
    "code": "AGENT & EVALUATION",
    "description": "围绕任务拆解、角色协作、状态管理、人工决策与错误恢复设计运行机制，用 Golden Case 和 Bad Case 驱动模型、Prompt 与 Workflow 迭代。",
    "evidence": [
      {
        "project": "LumiAgent",
        "slug": "lumiagent",
        "note": "1,000+ SFT 样本、100 条核心评测集，任务通过率达 90%"
      },
      {
        "project": "淘天 AI 设计师平台",
        "slug": "taotian-ai-designer",
        "note": "统一 4 类评测维度，商品替换采用率从 25% 提升至 50%"
      }
    ]
  },
  {
    "id": "ai-coding-open-source",
    "name": "前沿 Agent 与开源探索",
    "code": "AI CODING & OPEN SOURCE",
    "description": "通过复杂长链路任务比较模型能力与 AI Coding 开发范式，并参与开源协作，验证工具协议与模型调用边界。",
    "evidence": [
      {
        "project": "LudoReady",
        "slug": "ludoready",
        "note": "10+ 模型、30+ 对照实验与 5 类 Bad Case"
      },
      {
        "project": "Microsoft MCP",
        "slug": "microsoft-mcp",
        "note": "3 项改进，2 项已合并、1 项评审中，推动关闭 2 个公开问题"
      }
    ]
  },
  {
    "id": "seo-validation",
    "name": "GEO 增长与能力复用",
    "code": "GEO & BUSINESS GROWTH",
    "description": "用收录、引用和实际询盘验证渠道价值，将业务资产、内容策略、生产评测和效果反馈组织为可复用的产品能力。",
    "evidence": [
      {
        "project": "LumaFlow",
        "slug": "lumaflow",
        "note": "有效询盘占比提升至 70%，渠道获客成本下降 40%"
      }
    ]
  },
  {
    "id": "product-communication",
    "name": "产品传播与社区分享",
    "code": "PRODUCT & COMMUNITY",
    "description": "受邀在北京 Grokbot 线下分享会交流 AI 产品实践，持续运营小红书与人人都是产品经理账号，输出 30+ 篇产品实践与科普内容。",
    "evidence": [
      {
        "project": "Grokoo",
        "slug": "grokoo",
        "note": "将多 Agent 桌面产品探索转化为线下分享与交流"
      }
    ]
  }
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
    approach: '围绕会话建立产物索引、预览与下载入口，让交付物保留任务语境，支持继续查看、修改与使用。',
    validationScope: '公开仓库提供插件实现、产物预览与会话来源追溯说明。',
    guardrails: ['限制可读取的产物范围', '保持来源与会话关系可追溯', '保留插件安装与使用边界说明'],
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
    validationScope: '公开仓库包含安装、架构、安全模型与自动化测试记录。',
    guardrails: ['写操作默认隔离', '记录落盘前进行敏感信息脱敏', '未录制调用默认 fail-closed'],
    capabilities: ['MCP', 'Record / Replay', '契约测试', '安全与可观测'],
    publicLinks: [{ label: 'GitHub', href: 'https://github.com/bleakbelladonnals/dsh-echo', kind: 'github' }],
  },
];

export const experience: Array<{
  kind: 'work' | 'education';
  period: string;
  company: string;
  role: string;
  summary: string;
  details?: Array<{ heading: string; body: string }>;
}> = [
  {
    "kind": "work",
    "period": "2025.05 — 2026.09",
    "company": "杭州知径人工智能",
    "role": "AI 产品经理",
    "summary": "负责外贸企业 AI 业务线，主导 LumiAgent 企业订单协同 Agent 与 LumaFlow AI 内容运营中台从需求定义、方案设计到客户落地，将项目经验沉淀为可复用的企业 AI 解决方案。",
    "details": [
      {
        "heading": "双产品规划",
        "body": "梳理订单协同、内容生产与海外获客链路，以 LumiAgent 承接业务流程重构，以 LumaFlow 承接知识资产复用与海外增长。"
      },
      {
        "heading": "Agent 业务交付",
        "body": "整合 5 类高频任务，覆盖销售、仓储、采购 3 类角色及 80% 高频订单协同场景；订单内部确认周期缩短 50%，销售人均月有效维护客户数提升 40%。"
      },
      {
        "heading": "内容中台与增长",
        "body": "将企业知识接入、SEO / GEO 策略、多渠道生产、质量审核与资产复用形成标准流程；内容交付能力提升 3 倍，有效询盘占比达 70%，独立站自然搜索流量提升 30%。"
      },
      {
        "heading": "组织复用",
        "body": "通过项目复盘与培训推动方法进入解决方案库，覆盖部门 20+ 人持续复用，支持 10+ 后续售前方案，POC 准备周期从 8 天缩短至 2 天。"
      }
    ]
  },
  {
    "kind": "work",
    "period": "2024.09 — 2025.04",
    "company": "阿里巴巴",
    "role": "AI 产品经理（实习）",
    "summary": "参与淘天 AI 设计师平台建设，聚焦搜推批量内容生成与设计 Agent，覆盖计件、驻场两类设计场景，推动常规营销素材向运营自助生产转移。",
    "details": [
      {
        "heading": "场景规划与需求治理",
        "body": "基于月均 2 万+ 计件设计需求，收敛 11 类标准场景，结合需求规模、标准化程度、生成可控性与人工成本评估 AI 改造优先级。"
      },
      {
        "heading": "生产流程与评测",
        "body": "参与 AI 工作流与功能从方案、PRD、交互到上线，优化 42% 标准生产流程；独立负责商品一致性模块优化，将商品替换环节采用率从 25% 提升至 50%。"
      },
      {
        "heading": "平台业务成果",
        "body": "平台覆盖 15 条业务线、约 50 名运营，AI 月均完成 11,000+ 计件设计需求，AI 覆盖率达 53%，人均产能提升 25%；上线 8 个月后累计减少预算 524 万元，降幅 19.5%。"
      },
      {
        "heading": "模板与组织复用",
        "body": "沉淀 10+ 标准模板、案例库、模型能力文档、Workflow SOP 与版本更新机制；通过平台入口、案例传播与内部分享覆盖 50+ 运营及设计人员，相关能力累计生成 3,000+ 次。"
      }
    ]
  },
  {
    "kind": "work",
    "period": "2023.12 — 2024.06",
    "company": "深圳手回科技集团",
    "role": "产品经理（实习）",
    "summary": "围绕旅行险用户决策与投保转化，负责 AI 智能选购助手的需求分析、产品设计与迭代，通过用户反馈和转化数据优化 AI 能力与投保体验。",
    "details": [
      {
        "heading": "智能选购与 RAG 问答",
        "body": "根据出行场景与保障需求推荐适配产品，通过 RAG 检索保障责任、免责条款和理赔条件，提供可追溯的产品解读，降低理解条款与比较产品的成本。"
      },
      {
        "heading": "评测与持续迭代",
        "body": "建立覆盖回答准确率、推荐采纳率、转人工率和投保转化率的评测体系，持续优化知识库、检索策略与 Prompt，推动智能选购及投保流程上线迭代。"
      }
    ]
  },
  {
    "kind": "education",
    "period": "2021 — 2025",
    "company": "广州软件学院",
    "role": "风景园林 · 本科",
    "summary": "设计训练形成了对使用场景、复杂系统和人与环境关系的持续关注。"
  }
];

export function getCase(slug: string) {
  return cases.find((item) => item.slug === slug);
}
