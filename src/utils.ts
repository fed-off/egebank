const convertPrimaryToSecondaryScore = (primaryScore: number) => {
  const scoreMap: { [key: number]: number } = {
    1: 6,
    2: 11,
    3: 17,
    4: 22,
    5: 27,
    6: 34,
    7: 40,
    8: 46,
    9: 52,
    10: 58,
    11: 64,
    12: 70,
    13: 72,
    14: 74,
    15: 76,
    16: 78,
    17: 80,
    18: 82,
    19: 84,
    20: 86,
    21: 88,
    22: 90,
    23: 92,
    24: 94,
    25: 95,
    26: 96,
    27: 97,
    28: 98,
    29: 99,
    30: 100,
    31: 100,
    32: 100,
  };
  return scoreMap[primaryScore] || 0;
};

const randomPraise = () => {
  const praises = [
    '🌟 Отличная работа!🎉',
    '💪 Твоя настойчивость принесла результат! 🏆',
    '🚀 Супер! С такими результатами скоро все задачи будут позади! 🔥',
    '👏 Кажется, ты настоящий профессионал в этом деле! 💼',
    '🎊 Фантастика! Ты точно знаешь, как добиваться цели! 🌠',
    '👍 Великолепная работа, продолжай в том же духе! 💫',
    '🔝 Так держать! Ты показываешь отличные результаты! 🥇',
    '🌞 Умничка! Каждое твое действие приближает тебя к успеху! 💖',
  ];

  const randomIndex = Math.floor(Math.random() * praises.length);
  return praises[randomIndex];
};

export { convertPrimaryToSecondaryScore, randomPraise };
