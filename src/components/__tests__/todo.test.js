import { render, screen, cleanup} from "@testing-library/react"
import Todo from '../Todo'
import '@testing-library/jest-dom/extend-expect';
// import Header from '../Header'

test('should render todo component', ()=> {
render(<Todo/>);
const todoElement = screen.getByTestId('todo-1');
expect(todoElement).toBeInTheDocument();
expect(todoElement).toHaveTextContent('Hello World')
})

// test('should render Header component',()=>{
//   render(<Header/>);
//   const headerElement = screen>getByTestId('header-1')
//   expect(headerElement).toHaveTextContent('HomePage')
// })