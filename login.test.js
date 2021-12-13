import {render,screen, cleanup} from "@testting-library/react"
import Login from "../Login"


test('should render Login component',=>{
render (<Login/>)
const loginElement = screen.getAllByTestId('login-1')
})
