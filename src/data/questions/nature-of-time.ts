import { PhilosophyQuestion } from "../types";

export const natureOfTime: PhilosophyQuestion = {
  id: "nature-of-time",
  order: 2,
  epoch: "cosmos",
  title: "时间有开端吗？时间是什么？",
  subtitle: "时间是最熟悉的陌生之物。",
  originStory:
    "奥古斯丁在《忏悔录》中写道：'时间是什么？如果无人问我，我知道；如果有人问我，我却不知道。'1908 年，麦克塔加特以'时间非实在'的著名论证将时间哲学逼入死角：他区分了'过去—现在—未来'的 A 系列与'先于—后于'的 B 系列，并论证前者自相矛盾、后者不足以构成变化。此后一个多世纪，时间哲学都在回应他。",
  positions: [
    {
      id: "a-theory",
      name: "A 理论（时间流逝实在）",
      tradition: "形而上学 · 时态实在论",
      summary: "'现在'客观存在且不断移动，过去已消逝、未来尚未来；时间真实地流逝。",
      keyFigures: [
        { name: "A. 普赖尔", period: "1914–1969" },
        { name: "D. 齐默尔曼", period: "当代" },
      ],
      arguments: [
        {
          id: "flow-of-experience",
          label: "流逝体验论证",
          premises: [
            "时间流逝是最直接、最普遍的经验：未来成为现在、现在滑入过去",
            "若一切都同样真实，'现在是 2026 年'与'现在是 1900 年'无差别，这违背直觉",
            "我们关心坏事发生在过去还是未来，这种不对称需要客观的 A 属性来解释",
          ],
          conclusion: "时间流逝是实在的特征，不是幻觉。",
          source: "A. Prior《Past, Present and Future》，1967",
        },
      ],
      objections: [
        {
          id: "relativity-now",
          label: "相对论同时性反驳",
          premises: [
            "狭义相对论中，'异地事件是否同时'取决于参考系",
            "没有绝对的'现在'切面，何来客观流动的'现在'",
          ],
          conclusion: "A 理论与相对论时空观难以相容。",
          source: "H. Putnam《Time and Physical Geometry》，1967",
        },
      ],
    },
    {
      id: "b-theory",
      name: "B 理论（块宇宙永恒主义）",
      tradition: "分析哲学 · 物理主义",
      summary: "时间是四维块中的一个维度：过去、现在、未来同样真实，'流逝'只是意识产生的视角。",
      keyFigures: [
        { name: "D. H. 梅勒", period: "1938–2020" },
        { name: "D. 刘易斯", period: "1941–2001" },
      ],
      arguments: [
        {
          id: "relativity-block",
          label: "块宇宙论证",
          premises: [
            "相对论把时间与空间织入单一四维流形，事件间的先后关系不随参考系改变",
            "'现在的移动'既无速度也无方向可定义——'流逝'在物理上无处安放",
            "所有变化都可以用'事件 e1 先于事件 e2'的 B 关系完整描述",
          ],
          conclusion: "只有四维块与 B 关系是实在的，流逝是认知幻觉。",
          source: "D. H. Mellor《Real Time II》，1998；D. Williams《The Myth of Passage》，1951",
        },
      ],
      objections: [
        {
          id: "change-objection",
          label: "变化缺失反驳",
          premises: [
            "块宇宙中每个事件都永恒地'在那里'，没有任何东西真的改变",
            "没有真变化的时间还配叫时间吗？（麦克塔加特的原始挑战）",
            "它也难以解释时间体验为何如此鲜明",
          ],
          conclusion: "B 理论牺牲了时间最核心的现象特征。",
          source: "麦克塔加特《The Unreality of Time》，1908",
        },
      ],
    },
    {
      id: "presentism",
      name: "现在主义",
      tradition: "形而上学 · 本体论",
      summary: "只有当下存在：恐龙不存在，火星殖民地也不存在——存在的唯有此刻的万物。",
      keyFigures: [
        { name: "W. 洛克里", period: "当代" },
        { name: "T. 比格斯通（增长块）", period: "当代" },
      ],
      arguments: [
        {
          id: "common-sense-ontology",
          label: "本体论经济论证",
          premises: [
            "'凯撒存在'（现在时）显然为假——过去对象已不存在",
            "承认过去与未来对象存在，需要膨胀到无穷的四维动物园",
            "最节俭的本体论只承认当下存在之物",
          ],
          conclusion: "存在与当下同一，现在主义最符合常识与俭省原则。",
        },
      ],
      objections: [
        {
          id: "truthmaker-problem",
          label: "真值制造者难题",
          premises: [
            "'凯撒于公元前 44 年被刺'为真，其真值由什么事实支撑？",
            "若过去对象不存在，跨时陈述（'林肯比拿破仑高'）如何成立？",
            "现在主义缺乏对历史真理的解释资源",
          ],
          conclusion: "现在主义在本体论上的俭省以语义学的破产为代价。",
          source: "T. Sider《Four-Dimensionalism》，2001",
        },
      ],
    },
    {
      id: "unreality-of-time",
      name: "时间非实在论",
      tradition: "观念论 · 怀疑论",
      summary: "麦克塔加特的结论：时间并不存在——我们所称的时间只是对永恒实在的扭曲表象。",
      keyFigures: [{ name: "麦克塔加特", period: "1866–1925" }],
      arguments: [
        {
          id: "mctaggart-argument",
          label: "A 系列矛盾论证",
          premises: [
            "真正的变化需要 A 系列（事件从未来到现在再到过去）",
            "但每个事件必须同时具有'未来''现在''过去'三种互斥属性",
            "用'曾经是未来、现在是现在'来补救，只会引发无穷倒退",
          ],
          conclusion: "A 系列自相矛盾；没有 A 系列就没有真变化，故时间非实在。",
          source: "麦克塔加特《The Unreality of Time》，Mind，1908",
        },
      ],
      objections: [
        {
          id: "tense-semantics-reply",
          label: "时态语义回应",
          premises: [
            "'过去''现在''未来'是索引词，如'这里''我'——其指称随语境改变",
            "'e 曾是未来、现在是现在'并不要求 e 同时具有矛盾属性",
          ],
          conclusion: "A 系列的'矛盾'只是混淆了时态算子与属性，时间安然无恙。",
          source: "A. Prior《Past, Present and Future》，1967",
        },
      ],
    },
    {
      id: "cyclical-time",
      name: "时间循环论",
      tradition: "东方哲学 · 宇宙学",
      summary: "时间是循环的：宇宙轮转生灭，同样的事态在无穷时间里必然重现。",
      keyFigures: [
        { name: "尼采", period: "1844–1900" },
        { name: "斯多亚学派", period: "前 3 世纪" },
      ],
      arguments: [
        {
          id: "eternal-recurrence",
          label: "永恒轮回论证",
          premises: [
            "若时间无限而可能状态有限，状态组合终将穷尽",
            "无穷时间中每个组合都会无限次重现",
          ],
          conclusion: "时间不是单向直线，而是周期性的大循环。",
          source: "尼采《快乐的科学》§341，1882",
        },
      ],
      objections: [
        {
          id: "entropy-prevents-recurrence",
          label: "熵增反驳",
          premises: [
            "热力学第二定律使宇宙整体熵永不减少，无法回到低熵原点",
            "完全相同的历史重现在物理上不可能",
          ],
          conclusion: "循环时间与现代热力学冲突。",
        },
      ],
    },
  ],
  relatedQuestionIds: ["why-existence", "fine-tuning"],
  entryFromEra: "singularity",
};
