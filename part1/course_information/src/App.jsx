const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.content[0].part} exercises={props.content[0].exercises}/>
      <Part part={props.content[1].part} exercises={props.content[1].exercises}/>
      <Part part={props.content[2].part} exercises={props.content[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const content = [
    { part:'Fundamentals of React', exercises: 10 },
    { part:'Using props to pass data', exercises: 7 },
    { part:'State of a component', exercises: 14 },
    ]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total sum={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App