import { PhilosophyQuestion } from "../types";

export const meaningOfLife: PhilosophyQuestion = {
  id: "meaning-of-life",
  order: 9,
  epoch: "meaning",
  title: "人生有意义吗？意义从何而来？",
  subtitle: "在一个冷漠的宇宙中，意义是被发现的，还是被创造的？",
  originStory:
    "加缪在《西西弗神话》开篇写道：'真正严肃的哲学问题只有一个：自杀。'即判断人生是否值得过。分析哲学传统则把问题拆解得更细：意义是否必须来自上帝（超自然主义）？还是物理世界足以产生意义（自然主义）？意义取决于你的态度（主观论），还是取决于客观的价值（客观论）？",
  positions: [
    {
      id: "supernaturalism",
      name: "温和超自然主义",
      tradition: "宗教哲学 · 有神论",
      summary:
        "与永恒和无限相联系，人生才获得充分的意义——上帝的存在会大幅增益，虽然不是每一分意义的必要条件。",
      keyFigures: [
        { name: "R. 斯温伯恩", period: "1934–" },
        { name: "R. 诺齐克", period: "1938–2002" },
      ],
      arguments: [
        {
          id: "meaning-regress",
          label: "意义回溯论证",
          premises: [
            "有限事物的意义来自它与其他有意义事物的关联",
            "这个回溯不能无穷进行，需要某个'无需外求的意义源泉'",
            "这样的源泉必须是无限的——即上帝",
          ],
          conclusion: "没有无限者作锚点，有限人生的意义终将悬空。",
          source: "R. Nozick《Philosophical Explanations》，1981",
        },
      ],
      objections: [
        {
          id: "finite-meaning",
          label: "有限意义反驳",
          premises: [
            "为受苦者做的善事，即便人皆必死、无神存在，依然有价值",
            "意义链可以在有限但客观有价值的环节止步，不必通向无穷",
          ],
          conclusion: "有限自身即可承载意义，回溯论证失败。",
        },
      ],
    },
    {
      id: "subjectivism",
      name: "主观主义",
      tradition: "存在主义 · 分析的行动理论",
      summary: "意义来自投入与关爱：你全心热爱并投身之事，就构成你生命的意义。",
      keyFigures: [
        { name: "H. 法兰克福", period: "1929–2023" },
        { name: "R. 泰勒", period: "1919–2003" },
      ],
      arguments: [
        {
          id: "sisyphus-happy",
          label: "幸福的西西弗斯论证",
          premises: [
            "设想诸神赐给西西弗斯对推石的强烈欲望——推石成为他生命的热望",
            "他的一生将因此'充满意义'，尽管客观上徒劳",
            "可见意义的关键是投入与认同，不是客观成就",
          ],
          conclusion: "意义由主观态度构成：热爱即意义。",
          source: "R. Taylor《Good and Evil》，1970；H. Frankfurt《The Reasons of Love》，2004",
        },
      ],
      objections: [
        {
          id: "hair-counting",
          label: "数头发反例",
          premises: [
            "若有人毕生的热望是'维持头上恰好 3732 根头发'，直觉上他的人生依然空洞",
            "练吐口水、收集线团等同理——投入本身不等于意义",
          ],
          conclusion: "纯主观的标准把任何痴迷都认证为意义，抹掉了有价与无价之分。",
          source: "S. Wolf《Meaning in Life and Why It Matters》，2010",
        },
      ],
    },
    {
      id: "hybrid-objectivism",
      name: "混合论 / 客观主义",
      tradition: "分析伦理学 · 当代主流",
      summary:
        "意义产生于'主观的热爱遇上客观的价值'：爱之所爱且行之所当行，二者缺一不可。",
      keyFigures: [
        { name: "S. 沃尔夫", period: "1952–" },
        { name: "T. 梅茨", period: "1970–" },
      ],
      arguments: [
        {
          id: "wolf-hybrid",
          label: "双条件论证",
          premises: [
            "只有主观投入而无客观价值→数头发式空洞",
            "只有客观价值而无主观认同→被迫读经典式折磨",
            "直觉上'有意义'的人生（爱、创造、求知、成就）两者兼备",
          ],
          conclusion: "意义 = 主观吸引 × 客观吸引力，两者共同必要。",
          source: "S. Wolf《Meaning in Life and Why It Matters》，2010",
        },
        {
          id: "metz-rational-nature",
          label: "理性本性论证",
          premises: [
            "人是唯一能以卓越方式运用理性本性的存在（求知、审美、道德、幽默）",
            "对意义范例的比较分析显示它们都指向这一共同结构",
          ],
          conclusion: "人生意义在于以卓越的方式运用理性本性，与宇宙中的善相联。",
          source: "T. Metz《Meaning in Life: An Analytic Study》，2013",
        },
      ],
      objections: [
        {
          id: "objective-list-arbitrariness",
          label: "清单任意性反驳",
          premises: [
            "'客观有价值'的活动清单（知识、爱、创造……）由谁裁决？",
            "不同传统开出的清单相互冲突，且无中立检验方法",
          ],
          conclusion: "客观价值本身面临标准缺失的困难，混合论继承之。",
        },
      ],
    },
    {
      id: "absurdism",
      name: "荒诞与反抗",
      tradition: "存在主义 · 文学哲学",
      summary:
        "人生确无宇宙层面的意义，但正因如此，清醒的反抗与全力地生活本身就是对荒诞的回答。",
      keyFigures: [
        { name: "加缪", period: "1913–1960" },
        { name: "托尔斯泰（危机期）", period: "1828–1910" },
      ],
      arguments: [
        {
          id: "absurd-confrontation",
          label: "荒诞论证",
          premises: [
            "人渴望意义与统一，宇宙却报以沉默——这种错位就是'荒诞'",
            "面对荒诞有三条路：自杀（投降）、信仰（跳过证据）、反抗（清醒地活）",
            "唯有反抗保持诚实：不指望彼岸，也不放弃此岸",
          ],
          conclusion: "应当想象西西弗斯是幸福的——攀登本身足以充实人心。",
          source: "加缪《西西弗神话》，1942；Nagel《The Absurd》，1971",
        },
      ],
      objections: [
        {
          id: "why-not-suicide",
          label: "逻辑断裂反驳",
          premises: [
            "若意义确实缺席，'应该反抗'的规范性从何而来？",
            "在无意义的世界里选择充实地活与选择躺平同样无理可据",
          ],
          conclusion: "荒诞哲学的'应当'是一个未经辩护的跳跃。",
        },
      ],
    },
    {
      id: "nihilism",
      name: "虚无主义",
      tradition: "元伦理学 · 悲观主义",
      summary: "从宇宙的尺度看，任何人生都谈不上意义——诚实要求我们承认这一点。",
      keyFigures: [
        { name: "T. 内格尔", period: "1937–" },
        { name: "D. 贝纳塔", period: "1966–" },
      ],
      arguments: [
        {
          id: "cosmic-perspective",
          label: "宇宙视角论证",
          premises: [
            "从'宇宙的立场'（Sidgwick）看，一个人 75 年的悲欢与尘埃无异",
            "任何意义辩护最终都诉诸人的视角，无法跳出视角获得裁决",
          ],
          conclusion: "所谓意义只是视角内部的错觉，没有宇宙级的意义。",
          source: "D. Benatar《The Human Predicament》，2017；Nagel《The View from Nowhere》，1986",
        },
      ],
      objections: [
        {
          id: "perspective-fallacy",
          label: "视角谬误反驳",
          premises: [
            "'没有宇宙级意义'与'对人没有意义'是两个命题——意义本来就内在于视角",
            "要求'跳出视角的意义'本身是概念混乱，如同要求'不是数字的偶数'",
          ],
          conclusion: "虚无主义把视角问题误当成本体论问题。",
          source: "S. Wolf，2010；T. Metz，2013",
        },
      ],
    },
  ],
  relatedQuestionIds: ["free-will", "facing-death", "universe-knowing-self"],
  entryFromEra: "earth",
};
