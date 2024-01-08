import { useState } from 'react'

const Statistics = (props) => {
  if (props.total == 0) {
    return (
      <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </div>
    )
  }
  return (
  <div>
    <h1>statistics</h1>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    <p>all {props.total}</p>
    <p>average {(props.good-props.bad)/props.total}</p>
    <p>positive {props.good/props.total}%</p>
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  const Good = () => {
      setGood(good + 1)
      setTotal(total + 1)
    }
  const Neutral = () => {
      setNeutral(neutral + 1)
      setTotal(total + 1)
    }
  const Bad = () => {
      setBad(bad + 1)
      setTotal(total + 1)
    }

  const Button = (props) => {
      return (
      <button onClick={props.onClick}>
        {props.feedback}
      </button>
      )
    }

  return (
    <div>
      <h1>give feedback</h1>
      <Button
      onClick = {Good}
      feedback="good"/>
      <Button
      onClick = {Neutral}
      feedback="neutral"/>
      <Button
      onClick = {Bad}
      feedback="bad"/>
      <Statistics
      good = {good}
      neutral = {neutral}
      bad = {bad}
      total = {total} />
    </div>
  )
}

export default App