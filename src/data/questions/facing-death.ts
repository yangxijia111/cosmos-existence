import { PhilosophyQuestion } from "../types";

export const facingDeath: PhilosophyQuestion = {
  id: "facing-death",
  order: 10,
  epoch: "meaning",
  title: "面对必然的死亡，应当如何生活？",
  subtitle: "死亡是终点，还是赋予生命以形式的边界？",
  originStory:
    "伊壁鸠鲁在两千三百年前主张'死亡与我们无关'——我们存在时死亡尚不在，死亡来临时我们已不在。卢克莱修接着问：既然你不为出生前的永恒缺席而悲恸，为何恐惧死后的永恒？20 世纪的分析哲学把这场争论推得更细：内格尔与费尔德曼论证死亡是'剥夺'之恶，威廉姆斯则反过来论证永生才真正可怕。海德格尔给出第三个方向：向死而生。",
  positions: [
    {
      id: "epicureanism",
      name: "伊壁鸠鲁主义",
      tradition: "古希腊 · 快乐主义",
      summary: "死亡与我们无关：它是意识的终止，而一切善恶都以体验为前提。",
      keyFigures: [
        { name: "伊壁鸠鲁", period: "前 341–前 270" },
        { name: "卢克莱修", period: "约前 99–前 55" },
      ],
      arguments: [
        {
          id: "no-subject-argument",
          label: "无主体论证",
          premises: [
            "某事对我是好或坏，必须有人'承受'它",
            "死亡摧毁承受者：我们存在时死亡不在，死亡到来时我们已不在",
            "无主体即无受害，无受害即无恶",
          ],
          conclusion: "死亡不可能伤害死者，对它的恐惧是非理性的。",
          source: "伊壁鸠鲁《致美诺寇的信》；卢克莱修《物性论》第三卷",
        },
        {
          id: "symmetry-argument",
          label: "对称论证",
          premises: [
            "出生前的永恒虚无与死后的永恒虚无完全镜像对称",
            "我们不为'从未存在的过去亿万年'悲伤",
            "对'不再存在的未来亿万年'恐惧在理性上同样无据",
          ],
          conclusion: "对死亡的恐惧犯了不对称的双重标准。",
          source: "卢克莱修《物性论》第三卷，约前 50 年",
        },
      ],
      objections: [
        {
          id: "deprivation-reply",
          label: "剥夺论反驳",
          premises: [
            "伤害不必是体验：背叛在你不自知时也已伤害了你",
            "死亡剥夺了本可拥有的全部未来之善——这才是它坏之所在",
            "25 岁夭折比 90 岁寿终更坏，只有剥夺论能解释这个直觉",
          ],
          conclusion: "死亡是坏事的理由恰恰是：它使你不在了。",
          source: "T. Nagel《Death》，1970；F. Feldman《Confrontations with the Reaper》，1992",
        },
      ],
    },
    {
      id: "deprivationism",
      name: "剥夺论",
      tradition: "分析哲学 · 福利理论",
      summary: "死亡之所以是恶，在于它剥夺了受害者本可继续拥有的美好生活。",
      keyFigures: [
        { name: "T. 内格尔", period: "1937–2013" },
        { name: "F. 费尔德曼", period: "1941–" },
      ],
      arguments: [
        {
          id: "comparative-evil",
          label: "比较论证",
          premises: [
            "一个人的处境是好是坏，取决于与其原本可能的处境相比较",
            "死亡使'实际福利水平'低于'本可达到的水平'",
            "差额（被剥夺的善）就是死亡之恶",
          ],
          conclusion: "死亡是真实的恶，其大小等于被剥夺的未来之善。",
          source: "T. Nagel《Death》，1970",
        },
      ],
      objections: [
        {
          id: "timing-puzzle",
          label: "时间难题反驳",
          premises: [
            "死亡何时使你变坏？受害者在死后已不存在，'何时受害'没有答案",
            "所有方案（生前回溯/死后追认/无时性）都各生怪异",
          ],
          conclusion: "剥夺论在时间维度上尚未自洽。",
          source: "B. Bradley，2009；J. Johansson，2013",
        },
      ],
    },
    {
      id: "immortality-skepticism",
      name: "永生怀疑论",
      tradition: "分析哲学 · 文学哲学",
      summary:
        "真正可怕的或许不是死亡而是不死：无限的生命终将耗尽一切欲望，沦为无尽的厌倦。",
      keyFigures: [{ name: "B. 威廉姆斯", period: "1929–2003" }],
      arguments: [
        {
          id: "makropulos",
          label: "马克罗普洛斯案例论证",
          premises: [
            "永生必须还是'我'活着：人格连续性要求稳定的'绝对欲望'",
            "绝对欲望有限，而永恒无限——欲望终将全部满足或消亡",
            "随之而来的是无止境的冷漠与厌倦（耶路撒冷交响曲听第一百次）",
          ],
          conclusion: "任何无限的延续最终都是不可欲的，必死性未必是缺陷。",
          source: "B. Williams《The Makropulos Case: Reflections on the Tedium of Immortality》，1973",
        },
      ],
      objections: [
        {
          id: "desire-renewal",
          label: "欲望更新反驳",
          premises: [
            "绝对欲望可以渐进演化：像长篇小说的连载而非同一章的复读",
            "永不完结的生活仍可保有'开篇—发展'的叙事结构",
          ],
          conclusion: "永生的厌倦并非必然，威廉姆斯条件过强。",
          source: "J. Fischer《Near-Death Experiences》，2017；H.J. McCann，2012",
        },
      ],
    },
    {
      id: "being-toward-death",
      name: "向死而生",
      tradition: "存在主义 · 现象学",
      summary:
        "死亡不是生命尽头的外来事件，而是使'我的生命'成为整体的构成性边界——直面它，人才活得更本真。",
      keyFigures: [{ name: "海德格尔", period: "1889–1976" }],
      arguments: [
        {
          id: "ownness-argument",
          label: "本真性论证",
          premises: [
            "'我会死'是任何人都无法替我承担的最属己的可能性",
            "日常状态用'人总会死'的闲谈遮蔽这一属己性，让人活在'常人'的模板里",
            "先行到死中去，才能从沉沦中夺回'我要如何活'的选择权",
          ],
          conclusion: "正视死亡是本真生活的条件，而非它的敌人。",
          source: "海德格尔《存在与时间》§46–62，1927",
        },
      ],
      objections: [
        {
          id: "practical-panic",
          label: "实践代价反驳",
          premises: [
            "死亡反思对多数人引发焦虑而非澄明（恐惧管理理论的实验证据）",
            "'本真/沉沦'的区分难以操作化，沦为文学修辞",
          ],
          conclusion: "向死而生的治疗价值缺乏可靠的心理学支持。",
        },
      ],
    },
    {
      id: "stoic-practice",
      name: "斯多亚实践",
      tradition: "斯多亚学派 · 实践哲学",
      summary:
        "把死亡从恐惧的对象变为生活的教练：定期'预习死亡'，以此校准什么才真正重要。",
      keyFigures: [
        { name: "塞涅卡", period: "约前 4–65" },
        { name: "马可·奥勒留", period: "121–180" },
      ],
      arguments: [
        {
          id: "memento-mori",
          label: "死亡预习论证",
          premises: [
            "'在我们等待生活的时候，生活已经过去'——把时间当作无限是挥霍的根源",
            "每日提醒生命有限，能过滤琐事、聚焦所爱",
            "死亡是自然秩序的一部分，接受它即与自然一致",
          ],
          conclusion: "memento mori 不是悲观仪式，而是注意力的清点术。",
          source: "塞涅卡《论生命之短暂》；马可·奥勒留《沉思录》卷二",
        },
      ],
      objections: [
        {
          id: "suppression-worry",
          label: "压抑风险反驳",
          premises: [
            "对死亡的持续提示可能适得其反，强化而非化解焦虑",
            "斯多亚的'不动心'（apatheia）可能钝化正当的悲伤",
          ],
          conclusion: "死亡预习是双刃剑，需要个体化的谨慎使用。",
        },
      ],
    },
  ],
  relatedQuestionIds: ["meaning-of-life", "free-will"],
  entryFromEra: "earth",
};
