---
slug: human-in-the-loop-design
title: "Human-in-the-loop 不是兜底：Agent 产品的人工介入设计"
shortTitle: "Human-in-the-loop 不是兜底"
summary: "从风险分级、确认节点、中断恢复、交接上下文与审计记录出发，把人工介入设计成 Agent 主流程的一部分。"
thesis: "真正有效的人工介入不是模型失败后把责任丢给用户，而是在正确时机提供足够上下文和可执行选择。"
kind: learning
status: working
publishedAt: "2026-09-02"
updatedAt: "2026-09-02"
tags:
  - Human-in-the-loop
  - Agent UX
  - 风险设计
  - 责任边界
featured: true
relatedCaseSlugs:
  - lumiagent
  - bondmemo
visuals:
  - title: "风险决定介入强度"
    caption: "不是所有步骤都需要确认；介入成本应与错误影响和可逆性匹配。"
    items:
      - 只读与可撤销
      - 外部写入
      - 资金与权限
      - 不可逆影响
  - title: "一次可用的人工交接"
    caption: "用户需要知道发生了什么、为什么停下，以及下一步会造成什么结果。"
    items:
      - 当前目标
      - 已完成步骤
      - 阻塞原因
      - 风险与证据
      - 可选动作
sources:
  - label: "Agent approvals & security"
    href: "https://learn.chatgpt.com/docs/agent-approvals-security"
    publisher: "OpenAI Docs"
  - label: "AI RMF: Human-AI Interaction"
    href: "https://airc.nist.gov/airmf-resources/airmf/appendices/app-c-ai-risk-management-and-human-ai-interaction/"
    publisher: "NIST AIRC"
  - label: "AI Risk Management Framework 1.0"
    href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10"
    publisher: "NIST"
---

> Working Note：当前先定义介入框架和待验证问题，不宣称它适用于所有 Agent 或所有风险等级。

## 01 为什么“失败就转人工”仍然是失败设计

如果系统只在无法继续时抛出一句“请人工处理”，用户还需要重新理解目标、检查已经执行的步骤、寻找错误并判断下一步。模型把计算交给了人，却没有完成上下文交接。人工介入的体验质量，应当与自动执行路径一起设计和验收。

## 02 风险分级：决定哪里必须停下来

介入强度至少取决于影响范围、可逆性、事实确定性和用户授权。只读查询与可撤销草稿可以更自动；外部写入、资金、权限和不可逆动作则需要更明确的确认。风险分级的目的不是让用户确认一切，而是把注意力留给真正需要判断的节点。

## 03 确认节点：用户要确认的是后果，不是按钮

一个有效确认应说明即将执行的动作、作用对象、使用的数据、可能后果和撤销方式。只有“允许 / 拒绝”而缺少语境，会把责任形式化地转移给用户，却没有提高判断质量。

- 低风险：提示并允许撤销。
- 中风险：展示关键参数后确认。
- 高风险：展示证据、影响范围和替代方案，必要时要求二次确认。

## 04 中断与恢复：不要让一次暂停变成重新开始

用户补充信息、拒绝动作或修改参数后，Agent 应知道哪些步骤仍然有效、哪些结果已经过期、从哪里安全恢复。这里需要同时设计任务状态、幂等性、检查点和用户可见的恢复说明。

## 05 交接上下文：让人能在几十秒内接管

最小交接包应包含当前目标、已完成步骤、使用过的事实来源、阻塞原因、风险判断和可选动作。LumiAgent 的异常订单转人工与 BondMemo 的候选事项确认，会分别用于说明企业流程与个人敏感信息场景中的不同要求。

## 06 审计与责任：记录谁在什么依据下做了决定

审计不是只保存模型输出。需要记录当时的输入、工具结果、系统建议、用户看到的解释、最终选择和执行结果，才能支持复盘、争议处理和后续评测。同时应避免为了追溯而无限保存私人内容。

## 07 如何评测人工介入体验

除自动任务成功率外，还应观察介入发现时间、用户理解阻塞原因的比例、确认后的恢复成功率、重复确认次数、错误批准率和转人工后的实际完成率。指标必须区分“用户点了确认”和“用户理解并作出了正确判断”。

## 08 待补证据

- 为四档风险分别补充一条实际交互示例。
- 比较“确认动作”与“确认后果”两种文案的信息差异。
- 用一次拒绝后的恢复路径验证状态和幂等性要求。
- 补充隐私数据在交接与审计中的最小保留原则。
