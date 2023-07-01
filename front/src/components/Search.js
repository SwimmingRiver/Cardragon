import { Button, Form } from "react-bootstrap";
import {useDispatch} from "react-redux";
import SearchSlice from "../reducer/search";
import { useInput } from "../hooks/UseInput";
import { Search } from "react-bootstrap-icons";


function SearchForm(){
    const dispatch= useDispatch();
    const [keyword,onChangeKeyword,setKeyword]=useInput('');

    const onSubmit =(e)=>{
        e.preventDefault();
        dispatch(SearchSlice.actions.input(keyword));
        setKeyword("");
    }
    return(
        <>
        <form onSubmit={onSubmit}>
        <Form.Group >
        <Form.Control type="text" placeholder="search..." onChange={onChangeKeyword} value={keyword}/>
        <Button><Search/></Button>
        </Form.Group>
        </form>
        </>
    )
}
export default SearchForm;