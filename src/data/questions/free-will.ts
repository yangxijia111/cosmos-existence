import { PhilosophyQuestion } from "../types";

export const freeWill: PhilosophyQuestion = {
  id: "free-will",
  order: 6,
  epoch: "mind",
  title: "我们拥有自由意志吗？",
  subtitle: "如果宇宙遵循物理定律，我们的选择是否早已注定？",
  originStory:
    "拉普拉斯妖的隐喻使问题变得尖锐：知道所有粒子的位置和动量，就能预测包括你此刻阅读这句话在内的一切。但另一种同样古老的直觉同样顽固：我在斟酌、我在选择、我要负责。1969 年法兰克福的一个思想实验（一位随时准备干预的神经外科医生）与 1983 年范因瓦根的'相辩论证'，把当代论战推向高潮。",
  positions: [
    {
      id: "compatibilism",
      name: "相容论",
      tradition: "分析哲学 · 行动理论",
      summary:
        "自由与决定论并不冲突：自由不在于'能另有选择'，而在于行动出自你自己经理由斟酌的意愿。",
      keyFigures: [
        { name: "H. 法兰克福", period: "1929–2023" },
        { name: "J. 费舍尔", period: "当代" },
      ],
      arguments: [
        {
          id: "frankfurt-case",
          label: "法兰克福案例论证",
          premises: [
            "设想神经外科医生布莱克在你大脑里装了装置：若你打算投给 A，他就强制你投 B",
            "结果你自己自愿投了 B，装置从未启动",
            "你毫无'另行选择'的可能，但直觉上你仍对投票负责",
          ],
          conclusion: "道德责任不依赖'能够另作选择'，而依赖行动的来源是你自己。",
          source: "H. Frankfurt《Alternate Possibilities and Moral Responsibility》，1969",
        },
        {
          id: "reasons-responsiveness",
          label: "理由回应性论证",
          premises: [
            "自由行动的机制是'理由回应的'：给足理由，它就会改变输出",
            "决定论与理由回应完全兼容——事实上理由因果链正是决定性的",
          ],
          conclusion: "在决定论世界里，理由回应的行动者依然拥有应有的自由。",
          source: "Fischer & Ravizza《Responsibility and Control》，1998",
        },
      ],
      objections: [
        {
          id: "manipulation-argument",
          label: "操纵论证反驳",
          premises: [
            "设想 Diana 在受精卵阶段就精确设计了 Ernie 的全部欲望，三十年后他'自愿'杀人",
            "Ernie 满足理由回应与层级认同的一切相容论条件",
            "但直觉上他不负责任——因为来源不是他",
          ],
          conclusion: "相容论条件不能区分自由与被操纵，来源性问题依然致命。",
          source: "D. Pereboom《Living Without Free Will》，2001；A. Mele 合子论证，2006",
        },
      ],
    },
    {
      id: "libertarian-free-will",
      name: "自由意志论",
      tradition: "形而上学 · 行动者因果论",
      summary:
        "自由意志真实存在且与决定论不相容：在某些选择中，行动者自己是最终的决定原因。",
      keyFigures: [
        { name: "R. 凯恩", period: "1938–" },
        { name: "T. 奥康纳", period: "当代" },
      ],
      arguments: [
        {
          id: "agent-causation",
          label: "行动者因果论证",
          premises: [
            "事件的因果链要么追溯到行动者的选择，要么追溯到先前的物理原因",
            "道德责任要求'我本可以不这样做'真实成立",
            "责任是道德生活的基石，不可放弃",
          ],
          conclusion: "必须在宇宙中为'行动者作为原因'保留位置。",
          source: "T. O'Connor《Persons and Causes》，2000",
        },
      ],
      objections: [
        {
          id: "luck-objection",
          label: "运气反驳",
          premises: [
            "若选择未被先前状态完全决定，它如何不是碰巧发生的随机事件？",
            "非决定论给不出'控制'，只有掷骰子",
          ],
          conclusion: "自由意志论用随机性换掉了决定性，两头不讨好。",
          source: "A. Mele《Free Will and Luck》，2006",
        },
      ],
    },
    {
      id: "hard-determinism",
      name: "硬决定论 / 自由意志怀疑论",
      tradition: "自然主义 · 不相容论",
      summary:
        "决定论（或足够强的因果闭合）为真，自由意志为假——我们应对这个事实重建道德与生活。",
      keyFigures: [
        { name: "P. 范因瓦根", period: "1942–2024" },
        { name: "G. 斯特劳森（Galen）", period: "1950–" },
      ],
      arguments: [
        {
          id: "consequence-argument",
          label: "相辩论证",
          premises: [
            "若决定论为真，我们的行为是自然律与遥远过去状态的必然后果",
            "过去不由我们控制，自然律也不由我们控制",
            "其后果（我们的行为）也不由我们控制",
          ],
          conclusion: "决定论之下无人能另有选择，自由意志不存在。",
          source: "P. van Inwagen《An Essay on Free Will》，1983",
        },
        {
          id: "infinite-regress",
          label: "无限回溯论证",
          premises: [
            "要为行为负责，须对塑造行为的心理状态负责",
            "为此又须对形成心理状态的更早选择负责……以至无穷",
            "无穷回溯没有起点，责任无处落脚",
          ],
          conclusion: "'终极责任'在概念上不可能，自因的自我不存在。",
          source: "Galen Strawson《Freedom and Belief》，1986",
        },
      ],
      objections: [
        {
          id: "strawson-reactive-attitudes",
          label: "反应态度回应",
          premises: [
            "怨恨、感激、愤慨等'反应态度'是人际生活的基本框架，无法整体放弃",
            "这些态度并不依赖形而上学的'终极责任'",
          ],
          conclusion: "即使怀疑论在理论上正确，责任实践的根基也不可动摇。",
          source: "P. F. Strawson《Freedom and Resentment》，1962（斯特劳森，1919–2006）",
        },
      ],
    },
    {
      id: "evolutionary-compatibilism",
      name: "演化自由论",
      tradition: "自然主义 · 认知科学",
      summary:
        "自由意志不是宇宙的形而上学特性，而是演化锻造的能力：预见、斟酌、自我改进——值得要的那种自由，在决定论世界里照样生长。",
      keyFigures: [{ name: "D. 丹尼特", period: "1942–2024" }],
      arguments: [
        {
          id: "freedom-evolves",
          label: "自由演化论证",
          premises: [
            "演化确实造就了越来越强的避害与选择能力（避热的水母→规划的人类）",
            "'本可以另作选择'的可避免性在博弈论意义上真实存在：理性体对威胁与理由作出策略回应",
            "道德责任实践本身就是塑造行为的因果工具，其存在不需形而上学地基",
          ],
          conclusion: "我们拥有的演化自由虽非'终极自因'，却正是值得称道的自由。",
          source: "D. Dennett《Freedom Evolves》，2003",
        },
      ],
      objections: [
        {
          id: "word-game-objection",
          label: "换词游戏反驳",
          premises: [
            "批评者（如 G. 斯特劳森）认为这只是把'自由'重新定义为决定论兼容的能力",
            "人们真正关心的是'我是否是行为的终极作者'，演化自由没有触及这一点",
          ],
          conclusion: "演化自由论回答了另一个问题，回避了原来的问题。",
          source: "Galen Strawson《The Impossibility of Moral Responsibility》，1994",
        },
      ],
    },
  ],
  relatedQuestionIds: ["hard-problem", "meaning-of-life", "facing-death"],
  entryFromEra: "earth",
};
