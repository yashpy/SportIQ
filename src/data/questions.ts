export type Sport = 'football' | 'baseball'

export interface Question {
  id: number
  sport: Sport
  scenario: string
  question: string
  options: string[]
  correct: number
  explanation: string
  emoji: string
}

export const questions: Question[] = [
  // FOOTBALL
  {
    id: 1,
    sport: 'football',
    scenario: '3rd down, 8 yards to go. The quarterback throws incomplete.',
    question: 'What happens next?',
    options: ['First down', '4th down', 'Turnover', 'Penalty'],
    correct: 1,
    explanation: 'An incomplete pass still counts as a down. After 3rd down the offense faces 4th down — they must punt, kick a field goal, or go for it.',
    emoji: '🏈',
  },
  {
    id: 2,
    sport: 'football',
    scenario: 'The offense is on the opponent\'s 22-yard line.',
    question: 'If they kick a field goal, how many points do they score?',
    options: ['1 point', '2 points', '3 points', '6 points'],
    correct: 2,
    explanation: 'A successful field goal is always worth 3 points, regardless of distance.',
    emoji: '🏈',
  },
  {
    id: 3,
    sport: 'football',
    scenario: 'A receiver catches the ball in the end zone.',
    question: 'How many points is a touchdown worth?',
    options: ['3 points', '6 points', '7 points', '8 points'],
    correct: 1,
    explanation: 'A touchdown is worth 6 points. The team then gets a chance for an extra point (kick) or 2-point conversion.',
    emoji: '🏈',
  },
  {
    id: 4,
    sport: 'football',
    scenario: 'The defense tackles the quarterback in his own end zone.',
    question: 'What is this called and how many points?',
    options: ['Fumble — 0 pts', 'Safety — 2 pts', 'Touchdown — 6 pts', 'Penalty — 0 pts'],
    correct: 1,
    explanation: 'A safety occurs when the ball carrier is tackled in their own end zone. The defense scores 2 points and gets the ball back via a free kick.',
    emoji: '🏈',
  },
  {
    id: 5,
    sport: 'football',
    scenario: 'It\'s 4th and 1 at midfield. The coach decides to punt.',
    question: 'Why would a team punt instead of going for it?',
    options: [
      'Punting scores 3 points',
      'To give the ball to the other team in bad field position',
      'Rules require a punt on 4th down',
      'The quarterback is tired',
    ],
    correct: 1,
    explanation: 'Teams punt to flip field position. If you fail on 4th down, the opponent gets the ball wherever you are. Punting pushes them back near their own end zone.',
    emoji: '🏈',
  },
  // BASEBALL
  {
    id: 6,
    sport: 'baseball',
    scenario: 'The pitcher throws 3 pitches outside the strike zone and the batter doesn\'t swing.',
    question: 'What happens?',
    options: ['The batter is out', 'The batter walks to first base', 'The inning ends', 'The pitch count resets'],
    correct: 1,
    explanation: 'Four balls (not three!) result in a walk — the batter advances to first base automatically. Three strikes = out.',
    emoji: '⚾',
  },
  {
    id: 7,
    sport: 'baseball',
    scenario: 'A batter hits a ball that bounces over the outfield fence.',
    question: 'What is this called?',
    options: ['Home run', 'Ground rule double', 'Triple', 'Foul ball'],
    correct: 1,
    explanation: 'A ball that bounces over the fence is a ground rule double — the batter and any runners advance exactly two bases.',
    emoji: '⚾',
  },
  {
    id: 8,
    sport: 'baseball',
    scenario: 'Runners are on 1st and 2nd, nobody out. The batter hits a soft line drive.',
    question: 'If the fielder catches it, what can he do to get a double play?',
    options: [
      'Tag home plate',
      'Throw to any base',
      'The runners must tag up before advancing — throw to their original base',
      'There is no double play possible',
    ],
    correct: 2,
    explanation: 'On a caught fly ball, runners must tag their original base before advancing. If they left early, a throw to that base gets them out — a double play!',
    emoji: '⚾',
  },
  {
    id: 9,
    sport: 'baseball',
    scenario: 'A pitcher has thrown 2 strikes and 1 ball. He throws a pitch the batter swings at and misses.',
    question: 'What just happened?',
    options: ['Walk', 'Strikeout', 'Foul ball', 'Hit by pitch'],
    correct: 1,
    explanation: 'Strike 3! A batter is out after 3 strikes. The count was 1-2 (1 ball, 2 strikes), and the swing-and-miss made it 3 strikes = strikeout.',
    emoji: '⚾',
  },
  {
    id: 10,
    sport: 'baseball',
    scenario: 'A batter hits a fair ball that clears the outfield fence on the fly with two runners on base.',
    question: 'How many runs score?',
    options: ['1 run', '2 runs', '3 runs', '4 runs'],
    correct: 2,
    explanation: 'A home run scores the batter PLUS all runners on base. Two runners on base + the batter = 3 runs. This is called a 3-run homer!',
    emoji: '⚾',
  },
]
