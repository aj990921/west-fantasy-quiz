import { useState } from 'react';

// 定义题目与跳转规则
const questions = {
  root: {
    text: "你更喜欢热闹的聚会，还是安静的独处？",
    options: [
      { label: "热闹的聚会", next: "q1" },
      { label: "安静的独处", next: "q5" }
    ]
  },
  q1: {
    text: "你重视家族传统和社群联结吗？",
    options: [
      { label: "是", next: "q2" },
      { label: "否", next: "q3" }
    ]
  },
  q2: {
    text: "你在队伍里更常扮演什么角色？",
    options: [
      { label: "把事情「做成」的那个人", next: "q2a" },
      { label: "让大家「更好」的那个人", next: "q2b" }
    ]
  },
  q2a: {
    text: "当你选择承诺一件事，你更愿意：",
    options: [
      { label: "A: 终身打磨一件传世之作", next: "result:dwarf" },
      { label: "B: 披甲立誓捍卫氏族荣耀", next: "result:dragonborn" }
    ]
  },
  q2b: {
    text: "你心里最舒服的据点更像哪一种？",
    options: [
      { label: "C: 壁炉与餐桌", next: "result:halfling" },
      { label: "D: 工坊与试验台", next: "result:gnome" }
    ]
  },
  q3: {
    text: "你觉得自己身负特殊血统或使命吗？",
    options: [
      { label: "是", next: "q3a" },
      { label: "否", next: "result:human" }
    ]
  },
  q3a: {
    text: "你的血统让你感到自豪还是渴望融入人类？",
    options: [
      { label: "自豪", next: "q3a1" },
      { label: "渴望融入人类", next: "result:human" }
    ]
  },
  q3a1: {
    text: "你的血统让你感到自豪还是被诅咒？",
    options: [
      { label: "自豪", next: "result:tiefling" },
      { label: "诅咒", next: "result:dragonborn_cursed" }
    ]
  },
  q5: {
    text: "你更习惯在人类社会还是远离文明？",
    options: [
      { label: "人类社会", next: "q6" },
      { label: "远离文明", next: "q9" }
    ]
  },
  q6: {
    text: "你身上流淌着非人类的血脉吗？",
    options: [
      { label: "是", next: "q7" },
      { label: "否", next: "q8" }
    ]
  },
  q7: {
    text: "你的血脉来自地狱、妖精荒野，还是天界？",
    options: [
      { label: "地狱", next: "result:tiefling" },
      { label: "妖精荒野", next: "result:fey" },
      { label: "天界", next: "result:asimar" }
    ]
  },
  q8: {
    text: "你更相信秩序与规则，还是力量与本能？",
    options: [
      { label: "秩序与规则", next: "result:human" },
      { label: "力量与本能", next: "result:barbarian" }
    ]
  },
  q9: {
    text: "你能感受到自然的呼唤和韵律吗？",
    options: [
      { label: "是", next: "q10" },
      { label: "否", next: "result:hermit" }
    ]
  },
  q10: {
    text: "你能感受到森林还是高山？",
    options: [
      { label: "森林", next: "result:elf_wood" },
      { label: "高山", next: "result:elf_mountain" }
    ]
  }
};

// 种族结果
const results = {
  dwarf: { name: "矮人", desc: "擅长锻造与坚守，是山脉与工坊的主人。" },
  dragonborn: { name: "龙裔", desc: "血脉中流淌着巨龙的力量，以荣耀与誓言为生命。" },
  halfling: { name: "半身人", desc: "热爱美食与家庭，在平凡生活中找到最大的幸福。" },
  gnome: { name: "侏儒", desc: "痴迷于发明与探索，用智慧点亮世界的角落。" },
  tiefling: { name: "提夫林", desc: "背负着地狱的烙印，在挣扎中寻找自我的道路。" },
  human: { name: "人类", desc: "适应性极强，在多元的世界中创造无限可能。" },
  fey: { name: "妖精", desc: "来自荒野的灵动生灵，与自然和梦境共生。" },
  asimar: { name: "阿西玛", desc: "天界的使者，带着神圣的使命行走人间。" },
  barbarian: { name: "蛮人", desc: "遵从野性的本能，在战斗中释放原始的力量。" },
  elf_wood: { name: "木精灵", desc: "森林的守护者，与树木和飞鸟低语。" },
  elf_mountain: { name: "山精灵", desc: "高山的守望者，在风雪中保持着千年的孤寂。" },
  hermit: { name: "隐者", desc: "远离尘世喧嚣，在孤独中追寻宇宙的真理。" }
};

export default function RaceQuiz() {
  const [currentQuestionId, setCurrentQuestionId] = useState("root");
  const [result, setResult] = useState<null | {name: string, desc: string}>(null);

  const handleAnswer = (nextId: string) => {
    if (nextId.startsWith("result:")) {
      const resultId = nextId.split(":")[1];
      setResult(results[resultId as keyof typeof results]);
    } else {
      setCurrentQuestionId(nextId);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-amber-800 mb-6">你的西幻种族是：</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-3xl font-bold text-amber-700 mb-4">{result.name}</h2>
          <p className="text-lg text-amber-600">{result.desc}</p>
          <button 
            onClick={() => {
              setCurrentQuestionId("root");
              setResult(null);
            }}
            className="mt-6 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            重新测试
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionId as keyof typeof questions];

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-amber-800 mb-10">西幻世界 OC 种族速选</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <p className="text-xl text-amber-700 mb-6">{currentQ.text}</p>
        <div className="space-y-4">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.next)}
              className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-left"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
