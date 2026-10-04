import { PhilosophyQuestion } from "../types";

export const originOfLife: PhilosophyQuestion = {
  id: "origin-of-life",
  order: 4,
  epoch: "life",
  title: "生命是什么？无生命的物质为何组织成生命？",
  subtitle: "从化学到生物学的跃迁，是偶然还是必然？",
  originStory:
    "1924 年奥巴林与 1929 年霍尔丹各自提出：早期地球的还原性大气与海洋'原始汤'中，无机物可在能量驱动下逐步合成有机物。1953 年，米勒与尤里用放电实验在烧瓶中造出了氨基酸——生命的字母表竟然可以无中生有。此后的问题从'能否形成有机物'转向'如何形成能自我复制的系统'，RNA 世界假说自 1980 年代起成为主流框架。",
  positions: [
    {
      id: "abiogenesis",
      name: "化学起源说",
      tradition: "生物化学 · 达尔文主义",
      summary: "生命从无机物经一系列化学反应自然产生，不存在神秘的'生命力'。",
      keyFigures: [
        { name: "A. 奥巴林", period: "1894–1980" },
        { name: "J. B. S. 霍尔丹", period: "1892–1964" },
        { name: "S. 米勒", period: "1930–2007" },
        { name: "H. 尤里", period: "1893–1981" },
      ],
      arguments: [
        {
          id: "miller-urey",
          label: "原始汤论证",
          premises: [
            "早期地球的还原性大气含甲烷、氨、氢与水蒸气",
            "闪电与紫外辐射等能量源可以驱动合成反应",
            "米勒-尤里实验确实在模拟环境中生成了氨基酸等有机 building blocks",
          ],
          conclusion: "生命的化学前体可以从非生命物质自发形成。",
          source: "Miller《A Production of Amino Acids Under Possible Primitive Earth Conditions》，Science，1953",
        },
      ],
      objections: [
        {
          id: "complexity-gap",
          label: "复杂性鸿沟反驳",
          premises: [
            "氨基酸到自我复制系统之间隔着数量级的复杂性跃迁",
            "至今没有实验从简单有机物合成出可自我复制的完整体系",
          ],
          conclusion: "化学起源说尚未跨越从分子到生命的关键步骤。",
        },
      ],
    },
    {
      id: "rna-world",
      name: "RNA 世界假说",
      tradition: "分子生物学 · 主流框架",
      summary:
        "生命始于既能储存信息又能催化反应的 RNA——它同时扮演今日 DNA 与蛋白质的角色，是化学与生物之间的桥。",
      keyFigures: [
        { name: "W. 吉尔伯特", period: "1932–" },
        { name: "L. 奥格尔", period: "1927–2007" },
      ],
      arguments: [
        {
          id: "rna-catalysis",
          label: "双重功能论证",
          premises: [
            "'先有 DNA 还是先有蛋白质'构成鸡与蛋的循环依赖",
            "RNA 既能像 DNA 一样携带序列信息，又能像蛋白质酶一样催化反应（核酶已被实验证实）",
            "一个同时具备两种功能的分子可以打破循环",
          ],
          conclusion: "自我复制的 RNA 是生命起源最合理的过渡形态。",
          source: "W. Gilbert《The RNA World》，Nature，1986",
        },
      ],
      objections: [
        {
          id: "rna-instability",
          label: "RNA 不稳定性反驳",
          premises: [
            "RNA 在水中易水解，长链自发形成极为困难",
            "RNA 的前体（核苷酸）本身也不易自发合成",
          ],
          conclusion: "RNA 世界之前可能还需要更简单的化学阶段。",
        },
      ],
    },
    {
      id: "metabolism-first",
      name: "代谢先行论",
      tradition: "地球化学 · 自组织理论",
      summary:
        "生命始于热液喷口的化学循环：先有自我维持的反应网络（代谢），自我复制的分子是后来的发明。",
      keyFigures: [
        { name: "G. 瓦赫特斯豪泽", period: "1938–2014" },
        { name: "M. 罗素", period: "当代" },
      ],
      arguments: [
        {
          id: "iron-sulfur",
          label: "铁硫世界论证",
          premises: [
            "深海热液喷口提供持续的化学梯度与矿物催化表面",
            "黄铁矿表面的放热反应可驱动小分子碳固定循环，无需酶",
            "此类反应网络可先于基因出现，自组织地复杂化",
          ],
          conclusion: "生命的起点是代谢的自组织化学网络，复制机制是后来的产物。",
          source: "Wächtershäuser《Before Enzymes and Templates: A Theory of Surface Metabolism》，1988",
        },
      ],
      objections: [
        {
          id: "heredity-needed",
          label: "遗传缺失反驳",
          premises: [
            "没有遗传物质，代谢网络无法积累与传递改进",
            "自然选择需要可复制的变异载体才能启动",
          ],
          conclusion: "先有代谢的网络无法演化，复制必须更早或同时出现。",
        },
      ],
    },
    {
      id: "vitalism",
      name: "生机论",
      tradition: "传统形而上学 · 生物学",
      summary: "生命需要一种非物质的组织原则或'生命力'，纯化学无法解释生命的自主性与目的性。",
      keyFigures: [
        { name: "亚里士多德", period: "前 384–前 322" },
        { name: "H. 德里施", period: "1867–1941" },
      ],
      arguments: [
        {
          id: "entelechy",
          label: "隐德莱希论证",
          premises: [
            "海胆胚胎被切割后，每一块都发育为完整幼体——整体似乎'知道'自己应为完整的个体",
            "机器被分割只会损坏，唯有生命体表现出这种整体性自我调节",
          ],
          conclusion: "生命包含一种不可还原为物理化学的整体组织原则（隐德莱希）。",
          source: "H. Driesch《The Science and Philosophy of the Organism》，1908",
        },
      ],
      objections: [
        {
          id: "demise-of-vitalism",
          label: "生机论消亡反驳",
          premises: [
            "德里施观察到的发育调节已被基因调控网络与干细胞研究逐步解释",
            "所有曾归功于'生命力'的现象（发酵、呼吸、合成）均获化学解释",
          ],
          conclusion: "生机论没有留下任何不可还原的残余现象，只增添了神秘。",
        },
      ],
    },
    {
      id: "information-theory",
      name: "信息论视角",
      tradition: "系统科学 · 复杂性理论",
      summary: "生命的本质不在于物质组成，而在于信息：维持并复制自身的负熵组织。",
      keyFigures: [
        { name: "薛定谔", period: "1887–1961" },
        { name: "J. 冯·诺依曼", period: "1903–1957" },
      ],
      arguments: [
        {
          id: "negentropy-life",
          label: "负熵论证",
          premises: [
            "生命以'负熵为食'：通过消耗环境有序性维持自身的远离平衡态",
            "遗传物质是非周期性晶体——以物理形式储存信息的稳定结构",
          ],
          conclusion: "生命是能够保存、复制并改进自身信息的热力学机器。",
          source: "薛定谔《生命是什么》，1944",
        },
      ],
      objections: [
        {
          id: "defining-information",
          label: "信息定义反驳",
          premises: [
            "'信息'与'有序'的度量依赖于观察者的描述层次",
            "用信息定义生命可能陷入循环：只有先认出生命才能认出其信息",
          ],
          conclusion: "信息论视角提供了洞见，但尚不构成独立的起源解释。",
        },
      ],
    },
  ],
  relatedQuestionIds: ["fine-tuning", "hard-problem", "why-existence"],
  entryFromEra: "earth",
};
