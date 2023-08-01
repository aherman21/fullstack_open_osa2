const Header = (props) => {
  console.log(props)

  const name = props.props

  console.log(name)
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const parts = props.props
  
  var totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <p>Number of exercises {totalAmount}</p>
    </div>
  )
}

const Content = (props) => {
  const parts  = props.props
  console.log(parts)

  return (
    <div>
      {parts.map(part => <Part key={part.id} props={part} />)}
    </div>
  )
}

const Part = (props) => {
  const name = props.props.name
  const exercises = props.props.exercises

  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Course = (course) => {
  const parts = course.course.parts
  const name = course.course.name

  console.log(parts)
  


  return (
    <div>
      <Header props={name}></Header>
      <Content
       props={parts}
       >
      </Content>
      <Total props={parts}></Total>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 12,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}



export default App