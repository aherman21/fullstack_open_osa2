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
        <h3>Total of {totalAmount} exercises</h3>
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

  export default Course