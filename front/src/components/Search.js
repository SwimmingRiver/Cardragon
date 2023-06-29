import { Button, Form } from "react-bootstrap";

function Search(){
    return(
        <>
        <form onSubmit={()=>{return alert("ads")}}>
        <Form.Group>
        <Form.Control type="text" placeholder="search..." />
        <Button onClick={()=>{return alert("ads")}}>search</Button>
        </Form.Group>
        </form>
        </>
    )
}
export default Search;