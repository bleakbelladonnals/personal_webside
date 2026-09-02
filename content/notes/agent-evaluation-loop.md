---
slug: agent-evaluation-loop
title: "从 Demo 到可回归：Agent 评测体系的最小闭环"
shortTitle: "Agent 评测的最小闭环"
summary: "把一次成功演示拆成任务集、通过标准、分层诊断、bad case 分类和回归机制，建立能指导版本决策的最小评测闭环。"
thesis: "评测不是上线前的一次考试，而是把产品目标翻译成可重复任务，并让失败能够进入下一轮决策的基础设施。"
kind: learning
status: working
publishedAt: "2026-09-02"
updatedAt: "2026-09-02"
tags:
  - Agent Eval
  - 产品指标
  - 回归测试
  - Bad Case
featured: true
relatedCaseSlugs:
  - lumiagent
  - agentdock
visuals:
  - title: "最小评测闭环"
    caption: "评测结果必须回到失败分类与版本决策，而不是停在一个总分。"
    items:
      - 定义任务
      - 固定基线
      - 执行评测
      - 分类失败
      - 回归验证
  - title: "从结果到诊断层"
    caption: "同一个失败结果，可能来自完全不同的产品层。"
    items:
      - 意图与槽位
      - 检索与上下文
      - 工具调用
      - 事实与计算
      - 交互与恢复
sources:
  - label: "Create eval"
    href: "https://developers.openai.com/api/reference/java/resources/evals/methods/create"
    publisher: "OpenAI API"
  - label: "Model guidance"
    href: "https://developers.openai.com/api/docs/guides/latest-model"
    publisher: "OpenAI Docs"
  - label: "AI Risk Management Framework"
    href: "https://www.nist.gov/itl/ai-risk-management-framework"
    publisher: "NIST"
---

> Working Note：这是方法提纲，不把单一准确率包装成完整产品效果。后续会补充任务样例和评审表。

## 01 为什么 Demo 不能回答“产品是否可用”

一次成功演示只说明某个输入在某个时刻得到过可接受结果。它没有覆盖输入变化、工具异常、知识更新、用户纠正和版本回归，也不能说明失败发生在哪一层。完整稿会先区分模型能力演示、功能验收、任务成功和真实业务价值。

## 02 任务集：从真实工作抽取代表性样本

任务集不应只收集标准问法。最小集合需要同时覆盖高频主路径、重要长尾、信息不足、工具失败和高风险边界，并记录每条任务为何被纳入。LumiAgent 的 100 条核心回归集将作为案例，解释如何从部门流程转成可重复任务。

- 每条任务保留输入、必要上下文、期望行为和不可接受行为。
- 任务按业务频率、失败影响和产品阶段分层，而不是平均抽样。
- 数据集版本与产品版本绑定，避免结果失去可比性。

## 03 通过标准：先定义行为，再选择评分方式

“答案看起来不错”无法支持稳定评审。需要为每类任务明确必须满足的事实、允许变化的表达、工具调用约束、人工确认要求和失败时的正确行为。确定性结果优先用规则或程序判断，需要语义判断的部分才进入人工或模型评审。

## 04 分层诊断：总分不能指导修复

计划使用五层最小诊断框架：意图与字段、检索与上下文、工具调用、事实与计算、交互与恢复。总任务失败后必须落到可行动的分类，才能判断应该修改 Prompt、知识、工具、规则、界面还是流程边界。

## 05 Bad case 与回归：让失败进入下一轮版本

bad case 不是错误截图合集。每条记录需要包含复现条件、失败层、影响、根因假设、修复方式和应加入的回归任务。修复后的版本必须重新运行相同基线，同时观察是否引入新的副作用。

## 06 线上指标：离线通过不等于真实价值

离线任务通过率用于控制版本质量，线上还要观察人工介入发现时间、任务恢复率、用户纠正率、失败逃逸率和实际完成情况。AgentDock 的任务状态数据将用来说明：运行记录数量不是价值，减少漏处理与缩短介入时间才更接近产品结果。

## 07 待补证据

- 补充一张可复用的 Agent 任务评审表。
- 用 LumiAgent 的三类真实 bad case 演示分层诊断。
- 对比规则评分、人工评分和模型评分各自适合的边界。
- 增加一次“指标上升但用户体验变差”的反例。
