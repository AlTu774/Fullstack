import { useState } from 'react'

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
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good-bad)/total}</p>
      <p>positive {good/total}%</p>
    </div>
  )
}

export default App