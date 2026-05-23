import { useState } from 'react'
import { questions, type Sport, type Question } from './data/questions'
import './App.css'

type Screen = 'home' | 'quiz' | 'result'

interface GameState {
  sport: Sport
  queue: Question[]
  current: number
  selected: number | null
  score: number
  answers: { question: Question; selected: number; correct: boolean }[]
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [game, setGame] = useState<GameState | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  function startGame(sport: Sport) {
    const pool = questions.filter(q => q.sport === sport).sort(() => Math.random() - 0.5)
    setGame({ sport, queue: pool, current: 0, selected: null, score: 0, answers: [] })
    setShowExplanation(false)
    setScreen('quiz')
  }

  function selectAnswer(idx: number) {
    if (!game || game.selected !== null) return
    setGame(g => g ? { ...g, selected: idx } : g)
    setShowExplanation(true)
  }

  function nextQuestion() {
    if (!game) return
    const q = game.queue[game.current]
    const correct = game.selected === q.correct
    const newAnswers = [...game.answers, { question: q, selected: game.selected!, correct }]
    const newScore = correct ? game.score + 1 : game.score

    if (game.current + 1 >= game.queue.length) {
      setGame(g => g ? { ...g, score: newScore, answers: newAnswers } : g)
      setScreen('result')
    } else {
      setGame(g => g ? { ...g, current: g.current + 1, selected: null, score: newScore, answers: newAnswers } : g)
      setShowExplanation(false)
    }
  }

  function goHome() {
    setScreen('home')
    setGame(null)
    setShowExplanation(false)
  }

  if (screen === 'home') return <HomeScreen onStart={startGame} />
  if (screen === 'quiz' && game) return (
    <QuizScreen
      game={game}
      showExplanation={showExplanation}
      onSelect={selectAnswer}
      onNext={nextQuestion}
      onQuit={goHome}
    />
  )
  if (screen === 'result' && game) return <ResultScreen game={game} onHome={goHome} onRetry={() => startGame(game.sport)} />
  return null
}

/* ─── HOME ─── */
function HomeScreen({ onStart }: { onStart: (s: Sport) => void }) {
  return (
    <div className="home">
      <div className="home-inner">
        <div className="logo-wrap">
          <span className="logo-icon">🏟</span>
          <h1 className="logo-text">SportIQ</h1>
          <p className="logo-sub">Learn the rules. Master the game.</p>
        </div>

        <div className="sport-cards">
          <button className="sport-card football" onClick={() => onStart('football')}>
            <span className="card-emoji">🏈</span>
            <span className="card-title">Football</span>
            <span className="card-desc">Downs, scoring, penalties & more</span>
            <span className="card-cta">Play →</span>
          </button>
          <button className="sport-card baseball" onClick={() => onStart('baseball')}>
            <span className="card-emoji">⚾</span>
            <span className="card-title">Baseball</span>
            <span className="card-desc">Strikes, innings, plays & scoring</span>
            <span className="card-cta">Play →</span>
          </button>
        </div>

        <p className="home-note">5 scenario-based questions per sport</p>
      </div>
    </div>
  )
}

/* ─── QUIZ ─── */
function QuizScreen({
  game, showExplanation, onSelect, onNext, onQuit
}: {
  game: GameState
  showExplanation: boolean
  onSelect: (i: number) => void
  onNext: () => void
  onQuit: () => void
}) {
  const q = game.queue[game.current]
  const total = game.queue.length
  const progress = ((game.current) / total) * 100
  const accent = game.sport === 'football' ? 'var(--football)' : 'var(--baseball)'

  return (
    <div className="quiz">
      {/* Top bar */}
      <div className="quiz-topbar">
        <button className="quit-btn" onClick={onQuit}>← Quit</button>
        <div className="quiz-meta">
          <span className="sport-badge" style={{ background: accent }}>
            {game.sport === 'football' ? '🏈 Football' : '⚾ Baseball'}
          </span>
          <span className="score-live">Score: {game.score}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%`, background: accent }} />
      </div>
      <p className="progress-label">{game.current + 1} / {total}</p>

      {/* Card */}
      <div className="quiz-card">
        <div className="scenario-box">
          <span className="scenario-label">SCENARIO</span>
          <p className="scenario-text">{q.scenario}</p>
        </div>

        <h2 className="question-text">{q.question}</h2>

        <div className="options-grid">
          {q.options.map((opt, i) => {
            let cls = 'option-btn'
            if (game.selected !== null) {
              if (i === q.correct) cls += ' correct'
              else if (i === game.selected && game.selected !== q.correct) cls += ' wrong'
              else cls += ' dimmed'
            }
            return (
              <button key={i} className={cls} onClick={() => onSelect(i)}
                style={game.selected !== null && i === q.correct ? { borderColor: 'var(--correct)' } :
                  game.selected !== null && i === game.selected && game.selected !== q.correct ? { borderColor: 'var(--wrong)' } : {}}>
                <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                <span className="opt-text">{opt}</span>
                {game.selected !== null && i === q.correct && <span className="opt-icon">✓</span>}
                {game.selected !== null && i === game.selected && game.selected !== q.correct && <span className="opt-icon">✗</span>}
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className={`explanation ${game.selected === q.correct ? 'expl-correct' : 'expl-wrong'}`}>
            <strong>{game.selected === q.correct ? '🎉 Correct!' : '❌ Not quite.'}</strong>
            <p>{q.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <button className="next-btn" style={{ background: accent }} onClick={onNext}>
            {game.current + 1 < game.queue.length ? 'Next Question →' : 'See Results →'}
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── RESULT ─── */
function ResultScreen({ game, onHome, onRetry }: { game: GameState; onHome: () => void; onRetry: () => void }) {
  const pct = Math.round((game.score / game.queue.length) * 100)
  const accent = game.sport === 'football' ? 'var(--football)' : 'var(--baseball)'

  const grade =
    pct === 100 ? { label: 'PERFECT!', emoji: '🏆' } :
    pct >= 80   ? { label: 'GREAT!',   emoji: '🌟' } :
    pct >= 60   ? { label: 'GOOD',     emoji: '👍' } :
                  { label: 'KEEP GOING', emoji: '💪' }

  return (
    <div className="result">
      <div className="result-inner">
        <div className="result-header">
          <span className="result-emoji">{grade.emoji}</span>
          <h1 className="result-grade" style={{ color: accent }}>{grade.label}</h1>
          <p className="result-score">{game.score} / {game.queue.length} correct</p>
          <div className="result-pct-bar">
            <div className="result-pct-fill" style={{ width: `${pct}%`, background: accent }} />
          </div>
          <p className="result-pct-label">{pct}%</p>
        </div>

        <div className="answers-review">
          <h3>Review</h3>
          {game.answers.map((a, i) => (
            <div key={i} className={`review-item ${a.correct ? 'rev-correct' : 'rev-wrong'}`}>
              <div className="rev-top">
                <span className="rev-num">Q{i + 1}</span>
                <span className="rev-q">{a.question.question}</span>
                <span className="rev-icon">{a.correct ? '✓' : '✗'}</span>
              </div>
              {!a.correct && (
                <p className="rev-answer">
                  Correct: <strong>{a.question.options[a.question.correct]}</strong>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="result-actions">
          <button className="retry-btn" style={{ background: accent }} onClick={onRetry}>Play Again</button>
          <button className="home-btn" onClick={onHome}>← Home</button>
        </div>
      </div>
    </div>
  )
}

export default App
