import { PhilosophyQuestion } from "../types";

export const universeKnowingSelf: PhilosophyQuestion = {
  id: "universe-knowing-self",
  order: 8,
  epoch: "meaning",
  title: "人是宇宙认识自己的方式吗？",
  subtitle: "我们是星尘，却在凝视星辰。",
  originStory:
    "1980 年，卡尔·萨根在《宇宙》第一集'宇宙海洋之滨'中说出那句名言：'宇宙也在我们之内。我们由星辰物质构成——我们是宇宙认识自己的方式。'它的科学根据朴素而深刻：身体的碳、氮、钙、铁都锻造于恒星核心。诗意的外衣下，这个问题连着最硬核的宇宙学与最古老的'人是什么'之问。",
  positions: [
    {
      id: "poetic-naturalism",
      name: "诗意自然主义",
      tradition: "科学人文主义",
      summary:
        "宇宙通过我们睁开眼睛：这是一个事实性的诗意陈述——137 亿年的演化产生了能理解这段历史的物质组织。",
      keyFigures: [
        { name: "卡尔·萨根", period: "1934–1996" },
        { name: "P. 克鲁岑（人类世）", period: "1933–2021" },
      ],
      arguments: [
        {
          id: "stardust-argument",
          label: "星尘论证",
          premises: [
            "宇宙演化的事实链条完整可考：粒子→恒星→重元素→行星→生命→大脑",
            "这个链条的末端（科学认知）能够重建并理解整个链条本身",
            "'物质理解物质自身'是这条链上真实发生的事",
          ],
          conclusion: "人类认知是宇宙自我认识的真实环节——这不是隐喻，是历史事实的诗意表述。",
          source: "Carl Sagan《Cosmos》第 1 章，1980",
        },
      ],
      objections: [
        {
          id: "metaphor-overreach",
          label: "隐喻越界反驳",
          premises: [
            "'宇宙认识自己'里只有部分物质（人脑）在做认知，不是宇宙整体",
            "把局部活动归于整体是范畴错误，如同说'体育场在进球'",
          ],
          conclusion: "诗意陈述不应冒充形而上学结论。",
        },
      ],
    },
    {
      id: "cosmic-consciousness",
      name: "宇宙意识论",
      tradition: "泛心论 · 整体论",
      summary:
        "若意识是物质的基本属性，宇宙本身就可能有极微弱的'体验'——人类意识是它最清晰的部分。",
      keyFigures: [
        { name: "A. 怀特海", period: "1861–1947" },
        { name: "T. 托诺尼（IIT）", period: "当代" },
      ],
      arguments: [
        {
          id: "phi-argument",
          label: "整合信息论证",
          premises: [
            "意识对应于信息整合的量（φ）：任何系统只要整合信息就有相应的体验",
            "宇宙作为整体是高度互联的信息系统，其 φ 值不为零",
          ],
          conclusion: "宇宙具有原型意识，人脑是它在局部的高峰。",
          source: "G. Tononi & C. Koch《Consciousness as Integrated Information》，2015",
        },
      ],
      objections: [
        {
          id: "combination-problem",
          label: "组合难题反驳",
          premises: [
            "即便万物有微体验，'宇宙整体的体验'如何从分布的微体验组合而成",
            "整合信息理论的 φ 在无穷系统上甚至无法良定义",
          ],
          conclusion: "'宇宙意识'在概念与数学上都悬而未决。",
        },
      ],
    },
    {
      id: "teleological-view",
      name: "目的论视角",
      tradition: "古典形而上学 · 宗教哲学",
      summary:
        "宇宙朝向意识与自我认识的演化不是偶然——存在某种指向心智的内在方向或意图。",
      keyFigures: [
        { name: "黑格尔", period: "1770–1831" },
        { name: "德日进", period: "1881–1955" },
      ],
      arguments: [
        {
          id: "axiological-direction",
          label: "复杂性上升论证",
          premises: [
            "宇宙历史呈现复杂性递增的单向序列：粒子→物质→生命→心智",
            "意识的出现带来价值、真理与美——宇宙从'无意义'走向'有意义'",
            "这种方向性暗示内在的目的或倾向",
          ],
          conclusion: "宇宙的故事有指向：它朝向自我意识的觉醒。",
          source: "德日进《人的现象》，1955；黑格尔《精神现象学》，1807",
        },
      ],
      objections: [
        {
          id: "anthropic-selection",
          label: "人择选择反驳",
          premises: [
            "复杂性上升只是幸存者视角的抽样偏差——绝大多数时空仍是死寂的",
            "演化没有方向，只有适应；'趋势'是回顾性叙事",
          ],
          conclusion: "宇宙演化无目的，方向感是人类叙事的投影。",
        },
      ],
    },
    {
      id: "narrative-constructivism",
      name: "叙事建构论",
      tradition: "存在主义 · 自然主义人文",
      summary:
        "'宇宙自我认识'是人类为自己写下的意义脚本：宇宙不认识自己，但这个故事让我们承担起认识者的责任。",
      keyFigures: [
        { name: "R. 道金斯（祛魅）", period: "1941–" },
        { name: "U. 古多尔（希望）", period: "1934–2020" },
      ],
      arguments: [
        {
          id: "meaning-making",
          label: "意义制造论证",
          premises: [
            "宇宙本身无所谓意义，意义是意识存在物之间的现实",
            "人类恰是已知唯一的含义制造者——'为什么活着'由我们书写",
            "把认知使命揽到自己身上，是最清醒也最有尊严的姿态",
          ],
          conclusion: "宇宙不认识自己；但通过我们，它有了被认识与被讲述的可能。",
          source: "R. Dawkins《Unweaving the Rainbow》，1998",
        },
      ],
      objections: [
        {
          id: "why-this-story",
          label: "为何选此故事反驳",
          premises: [
            "'我们是宇宙的眼睛'与其他自我叙事（如'上帝的子民'）一样缺乏外部裁决",
            "选择的随意性让意义重新悬空",
          ],
          conclusion: "叙事建构论自身也是一种不可证实的叙事。",
        },
      ],
    },
  ],
  relatedQuestionIds: ["hard-problem", "meaning-of-life", "why-existence"],
  entryFromEra: "earth",
};
