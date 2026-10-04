import { PhilosophyQuestion } from "../types";

export const whyExistence: PhilosophyQuestion = {
  id: "why-existence",
  order: 1,
  epoch: "cosmos",
  title: "为什么会有存在，而不是一无所有？",
  subtitle: "这是最根本的形而上学问题，也是宇宙体验的终点与起点。",
  originStory:
    "莱布尼茨在 1714 年首次明确提出这个终极问题：即使我们解释了宇宙的一切规律，仍然无法回答——为什么存在规律，而不是什么都不存在？海德格尔称之为'形而上学的基本问题'，认为它追问的不是世界的起源，而是'有物存在'这件事本身。二十世纪的分析哲学家们（van Inwagen、Nozick、Parfit）让这个古老问题重新成为严肃的思辨领域。",
  positions: [
    {
      id: "leibnizian-answer",
      name: "充足理由的追问",
      tradition: "形而上学 · 理性主义",
      summary:
        "一切存在都有理由，而这个理由必须追溯到必然存在的终极实在——上帝或存在的根基。",
      keyFigures: [{ name: "莱布尼茨", period: "1646–1716" }],
      arguments: [
        {
          id: "principle-of-sufficient-reason",
          label: "充足理由律论证",
          premises: [
            "每一个偶然存在的事物，其存在都有理由（充足理由律）",
            "宇宙由无数偶然事物组成，其存在也需要理由",
            "这个理由不能在宇宙之内找到，否则仍是偶然链条的一环",
          ],
          conclusion: "宇宙存在的理由在于一个必然存在的终极实在。",
          source: "莱布尼茨《单子论》§36–38，1714",
        },
        {
          id: "simplicity-of-nothing",
          label: "虚无更简单论证",
          premises: [
            "最简单的可能世界是空无一物的世界——它无需任何解释",
            "存在越少，需要说明的东西越少",
            "因此'有物存在'比'一无所有'更需要理由",
          ],
          conclusion:
            "既然最无需解释的虚无没有实现，存在本身就需要一个超越性的解释。",
          source: "莱布尼茨《以自然为基础的神圣存在之证明》，1708",
        },
      ],
      objections: [
        {
          id: "brute-fact",
          label: "原始事实反驳",
          premises: [
            "宇宙可能就是一个不需要解释的原始事实",
            "把'必然存在者'当作解释，本身仍需解释它为何存在",
            "追问可能在某处合法地终止",
          ],
          conclusion: "充足理由律不能无限适用，存在本身可能就是终点。",
        },
        {
          id: "rowe-dilemma",
          label: "罗威二难反驳",
          premises: [
            "对'偶然存在之全体'的解释，要么诉诸另一个偶然事实（循环），要么诉诸必然真理",
            "必然真理只能蕴含必然结论，无法解释偶然的存在",
          ],
          conclusion: "原则上没有任何解释能够回答'为何有偶然存在'。",
          source: "William Rowe《宇宙论论证》，1975",
        },
      ],
    },
    {
      id: "brute-fact-answer",
      name: "原始事实论",
      tradition: "分析哲学 · 物理主义",
      summary: "宇宙的存在不需要超验理由，'存在'本身就是最基础的原始事实。",
      keyFigures: [
        { name: "罗素", period: "1872–1970" },
        { name: "D. Armstrong", period: "1926–2014" },
      ],
      arguments: [
        {
          id: "no-explanation-needed",
          label: "无需解释论证",
          premises: [
            "并非所有事实都可以或需要被解释——解释总要在某处止步",
            "'整体宇宙'之外没有立足点，对它发问可能是范畴错误",
          ],
          conclusion: "存在不需要理由，宇宙是事实，而非需要解释的现象。",
          source: "罗素与柯普莱斯顿 BBC 辩论，1948",
        },
        {
          id: "hume-domino",
          label: "休谟多米诺论证",
          premises: [
            "无穷序列中的每个成员都可以由前一个解释",
            "解释每个成员之后，'全体'并不额外需要解释",
          ],
          conclusion: "逐项解释宇宙内部事实之后，'为何有全体'的问题即消解。",
          source: "休谟《自然宗教对话录》第 IX 部分，1779",
        },
      ],
      objections: [
        {
          id: "why-this-fact",
          label: "为何是这个事实反驳",
          premises: [
            "即使接受原始事实，我们仍可追问：为何是这个宇宙而不是其他宇宙？",
            "拒绝解释并不等于给出了答案",
          ],
          conclusion: "原始事实论只是宣布问题无解，而非解决问题。",
          source: "Derek Parfit《The Puzzle of Reality》，1998",
        },
      ],
    },
    {
      id: "no-vacuum-possible",
      name: "虚无不可能论",
      tradition: "形而上学 · 必然主义",
      summary: "'一无所有'在形而上学上根本不可能：空世界是自相矛盾的。",
      keyFigures: [
        { name: "E. J. Lowe", period: "1950–2014" },
        { name: "维特根斯坦", period: "1889–1951" },
      ],
      arguments: [
        {
          id: "math-truthmaker",
          label: "数学真值制造者论证",
          premises: [
            "数学真理是必然的，且必须'为真'——必须有某种东西使其为真",
            "抽象数字本身无因果力，需要具体存在者作为真值制造者",
            "因此必然至少存在一个具体事物，空世界不可能",
          ],
          conclusion: "存在是必然的：数学真理的存在排除了绝对虚无。",
          source: "E. J. Lowe《Metaphysical Nihilism Revisited》，2013",
        },
      ],
      objections: [
        {
          id: "subtraction-argument",
          label: "减除论证反驳",
          premises: [
            "设想有限事物的世界里，任一事物都可能不存在",
            "逐一移除所有事物，得到的'空世界'在直觉上是可能的",
            "若空世界可能，虚无并非不可能",
          ],
          conclusion: "虚无在形而上学上是可能的，'必然有物'不成立。",
          source: "Tom Baldwin《There Might Be Nothing》，1996",
        },
      ],
    },
    {
      id: "probabilistic-argument",
      name: "概率压倒论",
      tradition: "分析哲学 · 模态形而上学",
      summary:
        "在所有可能世界中，'空世界'至多一个，而'有物世界'无穷无尽——存在几乎是必然抽中的彩票。",
      keyFigures: [{ name: "P. van Inwagen", period: "1942–2024" }],
      arguments: [
        {
          id: "infinite-lottery",
          label: "无限彩票论证",
          premises: [
            "可能世界中最多只有一个空世界（没有进一步的差别可言）",
            "'有物世界'有无穷多种：不同的物体、定律、初始条件",
            "从可能世界中随机选取，抽中空世界的概率几乎为零",
          ],
          conclusion: "有物存在在意料之中；真正令人惊讶的会是虚无。",
          source: "van Inwagen《Why Is There Anything at All?》，1996",
        },
      ],
      objections: [
        {
          id: "empty-world-plurality",
          label: "空世界多样性反驳",
          premises: [
            "空世界也可以由不同的自然律个体化，从而同样有无穷多个",
            "若空世界也是无穷多，概率优势即告消失",
            "现实世界按同样的论证也'最不可能'——概率在此无解释力",
          ],
          conclusion: "对可能世界计数依赖任意的个体化标准，论证不稳健。",
          source: "J. Carroll《The Big Bang, the Infinite, and the Void》，1994",
        },
      ],
    },
    {
      id: "physics-answer",
      name: "量子真空解答",
      tradition: "物理学 · 自然主义",
      summary:
        "量子场论表明'空无一物'不稳定：真空涨落天然倾向于产生粒子，存在或可从物理定律中免费获得。",
      keyFigures: [
        { name: "L. 克劳斯", period: "1954–" },
        { name: "S. 霍金", period: "1942–2018" },
      ],
      arguments: [
        {
          id: "vacuum-fluctuation",
          label: "真空涨落论证",
          premises: [
            "海森堡不确定性原理不允许绝对静止、绝对空的真空",
            "正反物质的微小不对称使量子真空偏向产生物质",
            "物理定律本身可能使'从无生有'成为必然",
          ],
          conclusion: "存在无需形而上学解释——它可能是物理定律的直接后果。",
          source: "L. Krauss《无中生有的宇宙》，2012；Hawking & Mlodinow《大设计》，2010",
        },
      ],
      objections: [
        {
          id: "not-really-nothing",
          label: "偷换'无'概念反驳",
          premises: [
            "量子真空是充满场与定律的物理结构，不是哲学意义上的'无'",
            "真正的无应是'连场和定律都不存在'",
            "用真空解释存在，只是把问题推给了'为何有真空与定律'",
          ],
          conclusion: "物理学解答偷换了概念，没有触及问题本身。",
          source: "David Albert《纽约时报》书评，2012",
        },
      ],
    },
  ],
  relatedQuestionIds: ["fine-tuning", "nature-of-time", "universe-knowing-self"],
  entryFromEra: "earth",
};
