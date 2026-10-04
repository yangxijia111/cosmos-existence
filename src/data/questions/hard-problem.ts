import { PhilosophyQuestion } from "../types";

export const hardProblem: PhilosophyQuestion = {
  id: "hard-problem",
  order: 5,
  epoch: "mind",
  title: "意识是什么？物质如何产生体验？",
  subtitle: "为什么大脑的活动伴随着主观的'感受质'？",
  originStory:
    "1995 年，查默斯在一篇著名论文中把意识研究划分为'容易问题'（分辨、报告、注意、行为控制——原则上可由计算机制解释）与'难问题'（为什么这些过程伴随着主观体验——为什么'成为蝙蝠'有某种感觉）。'解释空缺'一词则由勒万在 1983 年提出：即便掌握全部神经事实，我们依然看不出它们为何产生体验。",
  positions: [
    {
      id: "naturalistic-dualism",
      name: "自然主义二元论",
      tradition: "心灵哲学 · 属性二元论",
      summary:
        "意识是自然界的基本属性之一，不能还原为物理事实；物理主义的世界图景不完整。",
      keyFigures: [{ name: "D. 查默斯", period: "1966–" }],
      arguments: [
        {
          id: "zombie-argument",
          label: "哲学僵尸可设想性论证",
          premises: [
            "可以设想一个分子层面与我完全相同、却没有主观体验的'僵尸世界'",
            "可设想（在理想反思下无矛盾）蕴含形而上学可能",
            "若僵尸世界可能，则物理事实并不必然蕴含意识事实",
          ],
          conclusion: "意识不是物理事实的附带产物，物理主义为假。",
          source: "D. Chalmers《The Conscious Mind》，1996",
        },
        {
          id: "knowledge-argument",
          label: "知识论证（玛丽的房间）",
          premises: [
            "神经科学家玛丽掌握关于颜色的一切物理知识，但一生生活在黑白房间",
            "她第一次走出房间看见红色时，学到了新东西——'看见红色是什么感觉'",
            "这个新知识不是任何物理知识",
          ],
          conclusion: "存在关于意识体验的非物理事实，物理知识不完备。",
          source: "F. Jackson《Epiphenomenal Qualia》，1982",
        },
      ],
      objections: [
        {
          id: "conceivability-challenge",
          label: "可设想性质疑",
          premises: [
            "从'我们看不出矛盾'推不出'确实无矛盾'——空缺可能只是认知局限",
            "同一性无需解释：'水=H₂O'也不先天地可设想，却是真的",
          ],
          conclusion: "僵尸论证至多揭示了概念上的空缺，而非世界的二元结构。",
          source: "D. Papineau《Thinking about Consciousness》，2002",
        },
      ],
    },
    {
      id: "reductive-physicalism",
      name: "还原物理主义",
      tradition: "心灵哲学 · 同一论",
      summary: "意识状态就是大脑状态——不是'产生'，而是同一；解释空缺终将被科学填平。",
      keyFigures: [
        { name: "D. 帕皮诺", period: "1950–" },
        { name: "J. J. C. 斯马特", period: "1920–2012" },
      ],
      arguments: [
        {
          id: "causal-closure",
          label: "因果闭合论证",
          premises: [
            "物理世界因果闭合：每个物理事件都有充分的物理原因",
            "意识显然对行为有因果作用（我们因疼痛而缩手）",
            "若意识不是物理的，就要么多余、要么违反物理闭合",
          ],
          conclusion: "意识事件就是物理事件，二元论不可行。",
          source: "D. Papineau《Thinking about Consciousness》，2002",
        },
      ],
      objections: [
        {
          id: "explanatory-gap",
          label: "解释空缺反驳",
          premises: [
            "水=分子动能之所以可接受，是因为我们能解释两种描述为何收敛",
            "对'神经活动=体验'，我们没有任何此类解释",
            "空缺不是暂时的无知，而是现有概念框架的结构性缺口",
          ],
          conclusion: "同一论宣称的同一缺乏解释支撑。",
          source: "J. Levine《Materialism and Qualia: The Explanatory Gap》，1983",
        },
      ],
    },
    {
      id: "illusionism",
      name: "幻觉论 / 消解论",
      tradition: "认知科学 · 强物理主义",
      summary:
        "'难问题'是概念混乱的产物：并不存在哲学家意义上的'感受质'，只有大脑对自己信息状态的不完美自我模型。",
      keyFigures: [
        { name: "D. 丹尼特", period: "1942–2024" },
        { name: "K. 弗兰克什", period: "当代" },
      ],
      arguments: [
        {
          id: "no-cartesian-theater",
          label: "多草稿论证",
          premises: [
            "大脑中没有观看'意识屏幕'的内部观众（笛卡尔剧场并不存在）",
            "内容在大脑中平行地被编辑、修正与发布，没有统一的'呈现时刻'",
            "'感受质'是对这种平行过程的错误内省描述",
          ],
          conclusion: "所谓难问题是对认知过程的直觉误读，应予消解而非解答。",
          source: "D. Dennett《Consciousness Explained》，1991；K. Frankish《Illusionism as a Theory of Qualia》，2016",
        },
      ],
      objections: [
        {
          id: "illusion-of-illusion",
          label: "幻觉仍是体验反驳",
          premises: [
            "说感受质是'幻觉'，幻觉本身也是被体验到的——解释对象依然存在",
            "把体验解释掉，等于宣称'疼痛其实不疼'",
          ],
          conclusion: "幻觉论无法回避体验的存在性，难问题依然坚挺。",
        },
      ],
    },
    {
      id: "panpsychism",
      name: "泛心论",
      tradition: "心灵哲学 · 自然主义形而上学",
      summary:
        "意识是物质的最基本属性：从电子到神经元都有极微弱的体验，复杂心灵由这些'微体验'组合而成。",
      keyFigures: [
        { name: "A. 怀特海", period: "1861–1947" },
        { name: "P. 戈夫", period: "当代" },
      ],
      arguments: [
        {
          id: "panpsychist-continuity",
          label: "连续性论证",
          premises: [
            "意识在自然界真实存在，且大概率从简单系统中逐步涌现",
            "'从纯物质中突然涌现'是奇迹式跳跃，无论在哪里划线都武断",
            "最平滑的图景是：微观物理就自带最简单的体验形式",
          ],
          conclusion: "意识是宇宙的基本属性，复杂意识是微体验的组合。",
          source: "P. Goff《Galileo's Error》，2019；A. Whitehead《Process and Reality》，1929",
        },
      ],
      objections: [
        {
          id: "combination-problem",
          label: "组合难题反驳",
          premises: [
            "若电子有微体验，无数微体验如何组合成'一个'统一的主体验？",
            "若微体验没有现象性，它们并不比物理属性更能解释意识",
          ],
          conclusion: "泛心论用组合难题换掉了涌现难题，问题并未减少。",
        },
      ],
    },
    {
      id: "mysterianism",
      name: "神秘论",
      tradition: "心灵哲学 · 认知限度论",
      summary:
        "难问题是真实的问题——但人类认知结构上无法解答它，如同犰狳无法理解平方根。",
      keyFigures: [{ name: "C. 麦金", period: "1950–" }],
      arguments: [
        {
          id: "cognitive-closure",
          label: "认知封闭论证",
          premises: [
            "每种认知系统只能形成特定概念类型（狗无法理解微积分）",
            "我们关于意识的概念生成机制，可能恰好无法把握'物理如何产生体验'",
            "科学史上的难题都靠新概念解决，而我们没有理由期待必然如此",
          ],
          conclusion: "意识-物质关系对人类认知永久封闭，这不是无知而是限度。",
          source: "C. McGinn《The Problem of Consciousness》，1991",
        },
      ],
      objections: [
        {
          id: "premature-resignation",
          label: "过早放弃反驳",
          premises: [
            "'我们永远不能理解'的预言在科学史上屡屡失败",
            "宣告不可知无助于研究，反而放弃了解释的希望",
          ],
          conclusion: "神秘论是悲观的赌博，不是论证的终点。",
        },
      ],
    },
  ],
  relatedQuestionIds: ["origin-of-life", "free-will", "can-we-know", "universe-knowing-self"],
  entryFromEra: "earth",
};
