import { PhilosophyQuestion } from "../types";

export const canWeKnow: PhilosophyQuestion = {
  id: "can-we-know",
  order: 7,
  epoch: "mind",
  title: "我们能认识真实吗？",
  subtitle: "我们的认知是世界的镜子，还是一幅地图？",
  originStory:
    "柏拉图的洞穴寓言第一次系统质疑：我们看到的是真实本身，还是真实的影子？笛卡尔在 1641 年把怀疑推向极致：也许有一个恶魔在系统地欺骗我的全部感官。20 世纪的分析认识论把这些古老困惑改写为精确论证——缸中之脑、封闭原则、阿格里帕三难——而争论至今未决。",
  positions: [
    {
      id: "direct-realism",
      name: "直接实在论 / 常识辩护",
      tradition: "经验论 · 常识哲学",
      summary: "我们确实认识外部世界——证明它比怀疑它更简单：'这里是一只手'。",
      keyFigures: [
        { name: "G. E. 摩尔", period: "1873–1958" },
        { name: "T. 里德", period: "1710–1796" },
      ],
      arguments: [
        {
          id: "heres-a-hand",
          label: "摩尔式证明",
          premises: [
            "我可以举起我的手说：'这里是一只手'——这是我能给出的最确定的证明",
            "若前提确定而推理有效，结论就确定：外部世界存在",
            "怀疑论的前提（感觉可能系统性欺骗）远不如'这是一只手'确定",
          ],
          conclusion: "常识命题的认识论地位高于任何怀疑论前提。",
          source: "G. E. Moore《Proof of an External World》，1939",
        },
      ],
      objections: [
        {
          id: "begging-question",
          label: "循环质疑反驳",
          premises: [
            "'这是一只手'本身就是被怀疑的对象——用它证明外部世界是循环论证",
            "摩尔证明了我们相信外部世界的坚定性，没有证明其为真",
          ],
          conclusion: "摩尔的'证明'只是诊断，不是论证。",
          source: "B. Stroud《The Significance of Philosophical Scepticism》，1984",
        },
      ],
    },
    {
      id: "cartesian-skepticism",
      name: "笛卡尔式怀疑",
      tradition: "理性主义 · 古典怀疑论",
      summary:
        "我的感官可能被恶魔或缸中之脑系统欺骗；唯一不可怀疑的，是'正在被欺骗的我'存在。",
      keyFigures: [{ name: "笛卡尔", period: "1596–1650" }],
      arguments: [
        {
          id: "closed-principle",
          label: "封闭原则论证",
          premises: [
            "封闭原则：若我知道 p，且知道 p 蕴涵 q，则我知道 q",
            "'我有手'蕴涵'我不是缸中之脑'",
            "我不知道'我不是缸中之脑'（证据完全对称）",
          ],
          conclusion: "我不知道'我有手'。",
          source: "笛卡尔《第一哲学沉思集》，1641；现代缸中之脑版本：Putnam，1981",
        },
      ],
      objections: [
        {
          id: "semantic-externalism",
          label: "语义外在论反驳",
          premises: [
            "词的意义来自与环境的因果联系：'缸中之脑'一词也指向真实世界",
            "因此'我是缸中之脑'若为真，这句话反而必然为假——它自反驳",
          ],
          conclusion: "缸中之脑假说不能被连贯地设想为真。",
          source: "H. Putnam《Reason, Truth and History》，1981",
        },
        {
          id: "relevant-alternatives",
          label: "相关替代项反驳",
          premises: [
            "'知道'只需排除相关的替代可能性，不需排除一切逻辑可能的怀疑场景",
            "'是斑马'不需要同时排除'是巧妙涂装的骡子'这类不相关替代",
          ],
          conclusion: "封闭原则对'知道'过强，怀疑论证的推理不成立。",
          source: "F. Dretske《Epistemic Operators》，1970",
        },
      ],
    },
    {
      id: "humean-induction",
      name: "休谟归纳怀疑",
      tradition: "经验论 · 苏格兰启蒙",
      summary:
        "演绎不能保证未来像过去，归纳自身不能自辩——科学的地基（自然齐一性）悬在空中。",
      keyFigures: [{ name: "休谟", period: "1711–1776" }],
      arguments: [
        {
          id: "problem-of-induction",
          label: "归纳问题",
          premises: [
            "一切关于未来的经验推理都依赖'自然齐一性原则'（未来类似过去）",
            "它不能被演绎证明（其否定不矛盾），也不能被归纳证明（循环）",
          ],
          conclusion: "我们没有理性基础相信太阳明天照常升起——只有习惯。",
          source: "休谟《人性论》，1739",
        },
      ],
      objections: [
        {
          id: "kantian-reply",
          label: "康德先验回应",
          premises: [
            "因果性不是从经验读出的规律，而是经验可能性的先天形式",
            "任何可被经验的对象必然处于因果秩序之中",
          ],
          conclusion: "自然齐一性由认知结构本身担保，无需归纳证明。",
          source: "康德《纯粹理性批判》，1781",
        },
      ],
    },
    {
      id: "contextualism",
      name: "语境主义",
      tradition: "分析认识论 · 当代",
      summary:
        "'知道'的标准的严格度随语境变化：日常里我知道我有手；在怀疑论实验室里，我不知道。",
      keyFigures: [
        { name: "D. 德罗斯", period: "当代" },
        { name: "D. 刘易斯", period: "1941–2001" },
      ],
      arguments: [
        {
          id: "context-shift",
          label: "语境转换论证",
          premises: [
            "'知道 p'的真值条件对备择方案的排除程度敏感",
            "日常语境中'被恶魔欺骗'不在考虑之列；怀疑论证把它拉进语境",
            "怀疑论者说'你不知道'与他们自己提高的标准一致，日常归赋依然为真",
          ],
          conclusion: "怀疑论与日常知识可以同时为真——冲突只是语境错位。",
          source: "D. DeRose《Solving the Skeptical Problem》，1995；D. Lewis《Elusive Knowledge》，1996",
        },
      ],
      objections: [
        {
          id: "concessive-reply",
          label: "让步过多反驳",
          premises: [
            "语境主义承认：在怀疑语境中怀疑论者是对的",
            "但直觉上我们想说的是：即使在最严苛的标准下也知道",
          ],
          conclusion: "语境主义用稀释'知道'来化解怀疑，付出了过高代价。",
        },
      ],
    },
    {
      id: "pyrrhonism",
      name: "皮浪主义",
      tradition: "古希腊怀疑论",
      summary:
        "对一切判断悬而不决（epoché），由此获得心灵的平静——怀疑不是理论，是一种生活方式。",
      keyFigures: [
        { name: "皮浪", period: "约前 360–前 270" },
        { name: "塞克斯都·恩披里柯", period: "约 160–210" },
      ],
      arguments: [
        {
          id: "agrippa-trilemma",
          label: "阿格里帕三难",
          premises: [
            "任何辩护的辩护链只有三种可能：无穷倒退、循环、或止于武断假设",
            "三种情况都不能提供最终辩护",
          ],
          conclusion: "没有任何信念得到最终辩护，悬置判断是唯一诚实的态度。",
          source: "塞克斯都·恩披里柯《皮浪主义纲要》",
        },
      ],
      objections: [
        {
          id: "apraxia-objection",
          label: "无法行动反驳",
          premises: [
            "悬置一切信念的怀疑者连过马路都做不到",
            "实践本身要求接受大量未被'证明'的信念",
          ],
          conclusion: "皮浪主义作为生活方式不可行，怀疑必须有其边界。",
        },
      ],
    },
  ],
  relatedQuestionIds: ["hard-problem", "meaning-of-life"],
  entryFromEra: "earth",
};
