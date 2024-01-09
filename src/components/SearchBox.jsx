import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams, useLocation} from 'react-router-dom'


function SearchBox() {

    const location = useLocation() 
    const navigate = useNavigate()

    const {keyword:urlKeyword} = useParams()

    const [keyword, setKeyword] = useState(urlKeyword || '')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/search/${keyword}`)
            setKeyword('')
        }else{
            navigate(location.pathname)
        }
    } 
    return (
        // <div>SearchBox</div>
        <Form className='mp-auto' onSubmit={submitHandler} inline >
            <Row>
                <Col>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword}
                        placeholder='Search products...'
                        className='mr-sm-2 ml-sm-5'
                    >
                    </Form.Control>
                </Col>
                <Col>
                    <Button
                        type='submit'
                        variant='outline-success'
                        className='p-2'
                    >
                        Submit
                    </Button>
                </Col>

            </Row>
        </Form>
    )
}

export default SearchBox