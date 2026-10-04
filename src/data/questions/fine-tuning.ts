import { PhilosophyQuestion } from "../types";

export const fineTuning: PhilosophyQuestion = {
  id: "fine-tuning",
  order: 3,
  epoch: "cosmos",
  title: "宇宙的规律是被设计的，还是偶然的？",
  subtitle: "为什么基本常数恰好允许生命的存在？",
  originStory:
    "20 世纪物理学逐步发现：若引力与电磁力之比稍有不同，恒星要么无法点燃、要么寿命太短；若宇宙学常数稍大，星系根本无法凝结——理论预期值与实际值相差高达 120 个数量级（Weinberg 1987）。马丁·里斯在《只需六个数字》（2000）中总结了六个决定宇宙命运的基本常数。宇宙为何如此'恰好'，成为科学哲学中最激烈的争论之一。",
  positions: [
    {
      id: "design-theory",
      name: "设计论",
      tradition: "自然神学 · 宗教哲学",
      summary: "生命友好的常数组合极不可能偶然出现，最合理的解释是宇宙出自有意图的设计者。",
      keyFigures: [
        { name: "R. 斯温伯恩", period: "1934–" },
        { name: "J. 莱斯利", period: "1940–" },
      ],
      arguments: [
        {
          id: "bayesian-fine-tuning",
          label: "贝叶斯概率论证",
          premises: [
            "若无设计者，生命友好的常数组合概率极低：P(微调|偶然) ≈ 0",
            "若有有意图的设计者，生命友好条件很可能出现：P(微调|设计) 接近 1",
            "两个假说的先验概率不至于悬殊到抵消这种似然差",
          ],
          conclusion: "微调证据显著提升了设计者假说的后验概率。",
          source: "Swinburne《The Existence of God》第 5 章，2004；Leslie《Universes》，1989",
        },
        {
          id: "firing-squad",
          label: "行刑队论证",
          premises: [
            "死刑犯面对全体枪手齐射后竟然生还",
            "尽管'生还者必然无法观察自己被击毙'，他仍可合理怀疑枪手故意打偏",
            "同理，仅凭观察选择效应不能消解微调的惊讶",
          ],
          conclusion: "'我们只能存在于宜居宇宙'不足以解释微调，设计仍是候选解释。",
          source: "J. Leslie《Universes》，1989",
        },
      ],
      objections: [
        {
          id: "designer-inscrutable",
          label: "设计者动机不可知反驳",
          premises: [
            "我们对'无形体的超级创造者'会如何行事毫无经验依据",
            "无法独立地为 P(微调|设计) 赋值，论证的似然前提是特设的",
            "神学家在微调处诉诸神的意图、在恶问题处诉诸神的不可测度，立场不一致",
          ],
          conclusion: "设计论证的概率表述在认识论上不成立。",
          source: "E. Sober，2003/2009",
        },
      ],
    },
    {
      id: "multiverse",
      name: "多重宇宙论",
      tradition: "理论物理 · 宇宙学",
      summary: "存在极大量（乃至无穷多）个宇宙，各自常数不同；生命必然在某个宇宙中出现，而我们只能在此。",
      keyFigures: [
        { name: "L. 萨斯坎德", period: "1940–" },
        { name: "N. 博斯特罗姆", period: "1973–" },
      ],
      arguments: [
        {
          id: "anthropic-selection",
          label: "人择选择论证",
          premises: [
            "永恒暴胀与弦论景观预言了大量'岛屿宇宙'，常数在各宇宙中取不同值",
            "宇宙足够多时，任何小概率的宜居组合都会在某处实现",
            "观察者只能存在于宜居宇宙中",
          ],
          conclusion: "微调无需设计，是选择效应在大样本上的平凡结果。",
          source: "Susskind《The Cosmic Landscape》，2005；Bostrom《Anthropic Bias》，2002",
        },
      ],
      objections: [
        {
          id: "inverse-gambler",
          label: "逆赌徒谬误反驳",
          premises: [
            "从一次掷骰的罕见结果推断'此前必有许多次投掷'，是赌徒谬误的镜像",
            "其他宇宙的存在并不提高'这个宇宙'宜居的概率",
            "多重宇宙解释依赖未经辩护的'平庸性'参考类假设",
          ],
          conclusion: "多重宇宙论证的推理结构存在谬误嫌疑。",
          source: "I. Hacking，1987；Peter White，2000",
        },
        {
          id: "unfalsifiable",
          label: "不可检验反驳",
          premises: [
            "其他宇宙原则上无法被观测，多重宇宙缺乏可检验的预测",
            "宇宙测度与观察者参考类的选取有任意性，易受确认偏误影响",
          ],
          conclusion: "多重宇宙的科学地位存疑，可能不是真正的经验解释。",
          source: "G. F. R. Ellis，2011；S. Friederich《Multiverse Theories》，2021",
        },
      ],
    },
    {
      id: "anthropic-principle",
      name: "人择原理",
      tradition: "宇宙学 · 科学哲学",
      summary:
        "我们的观测位置必然是允许观察者存在的位置——这句'弱人择原理'本身即是对许多微调惊讶的消解。",
      keyFigures: [
        { name: "B. 卡特", period: "1942–" },
        { name: "J. 巴罗", period: "1952–2020" },
      ],
      arguments: [
        {
          id: "weak-anthropic",
          label: "观察位置论证",
          premises: [
            "观察者存在这一事实，蕴含其所在环境必然满足观察者存在的条件",
            "宇宙学常数过大处无法形成星系，也就无人观测到巨大的常数",
            "因此观测到小常数并不意外，正如冬季游客发现旅店满员",
          ],
          conclusion: "许多微调'惊讶'是忽视了观察选择效应的错觉。",
          source: "B. Carter，1974；Barrow & Tipler《The Anthropic Cosmological Principle》，1986",
        },
      ],
      objections: [
        {
          id: "selection-except-design",
          label: "选择效应不排斥解释反驳",
          premises: [
            "行刑队案例表明：观察选择效应存在时，仍可合理寻求进一步解释",
            "存在合理候选解释（设计、多宇宙）时，把微调当作'事情碰巧如此'并不理性",
          ],
          conclusion: "人择原理是必要提醒，但不足以终结微调之争。",
          source: "J. Leslie《Universes》，1989",
        },
      ],
    },
    {
      id: "necessity",
      name: "必然论",
      tradition: "形而上学 · 斯宾诺莎主义",
      summary: "宇宙规律不是偶然也不是设计，而是必然的；最终的物理理论或许只允许一组常数。",
      keyFigures: [{ name: "斯宾诺莎", period: "1632–1677" }],
      arguments: [
        {
          id: "single-law",
          label: "唯一定律论证",
          premises: [
            "可能存在唯一自洽的'万有理论'，它不允许任何自由参数",
            "所有常数都是这一必然定律的推论",
          ],
          conclusion: "宇宙规律是必然的，'恰好如此'的偶然性终将消失。",
        },
      ],
      objections: [
        {
          id: "no-proof-of-necessity",
          label: "无必然性证据反驳",
          premises: [
            "目前没有物理学证据表明常数只能取当前值",
            "弦论景观反而预言了海量可能的真空态",
          ],
          conclusion: "必然论缺乏经验支持，更像形而上学的期望。",
          source: "S. Weinberg《宇宙学常数问题》，1989",
        },
      ],
    },
    {
      id: "coincidence-skepticism",
      name: "巧合论",
      tradition: "科学怀疑论",
      summary: "微调是无需回应的原始巧合，或被夸大的统计直觉；把它当作'问题'本身就可疑。",
      keyFigures: [
        { name: "S. J. 古尔德", period: "1941–2002" },
        { name: "V. 斯滕格", period: "1935–2014" },
      ],
      arguments: [
        {
          id: "no-measure",
          label: "无测度反驳",
          premises: [
            "常数'可以取其他值'缺乏独立证据，无法定义合理的概率分布",
            "若替代常数在物理上不可能，谈'微调概率'就没有意义",
            "微调论证往往一次只变一个参数，忽略参数间的联动补偿",
          ],
          conclusion: "'微调惊讶'建立在未经辩护的概率直觉之上。",
          source: "V. Stenger《The Fallacy of Fine-Tuning》，2011",
        },
      ],
      objections: [
        {
          id: "joint-analysis",
          label: "联合分析反驳",
          premises: [
            "多参数联合研究表明生命允许区域依然极小",
            "希格斯质量与宇宙学常数的'自然性'危机独立地支持了微调的定量内容",
          ],
          conclusion: "微调并非统计幻觉，仍有待解释。",
          source: "L. Barnes，2012/2020；Rees《Just Six Numbers》，2000",
        },
      ],
    },
  ],
  relatedQuestionIds: ["why-existence", "origin-of-life", "nature-of-time"],
  entryFromEra: "earth",
};
