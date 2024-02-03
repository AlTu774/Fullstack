const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  const course_list = props.course.parts
  const initialsum = 0
  const sum_exercises = course_list.reduce(
    (accumulator, value) => accumulator + value.exercises,
    initialsum
  )
  return (
    <p><b>total of {sum_exercises} exercises</b></p>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

export default Course