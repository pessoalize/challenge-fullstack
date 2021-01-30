import React, { useState, useEffect, ChangeEvent } from 'react'
import { Form, Button } from 'react-bootstrap'
import api from '../../../service/api'
import { useHistory, useParams } from 'react-router-dom'

import './index.css'


interface IProduct {
    amount: string
    name: string
    description: string
    imageURL: string
    price: string
}

const Products: React.FC = () => {
    const history = useHistory()
    const { id } = useParams<{ id: string }>();
    const [model, setModel] = useState<IProduct>({
        name: '',
        description: '',
        amount: '',
        imageURL: '',
        price: '',
    })

    useEffect(() => {
        if (id != undefined) {
            findProduct(id)
        }
    }, [id])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            const response = await api.put(`product/update/?productID=${id}`, model)
        } else {
            const response = await api.post('/product/create', model)
        }
        back()

    }

    async function findProduct(id: string) {
        const response = await api.get(`product/${id}`)
        setModel({
            name: response.data.name,
            amount: response.data.amount,
            imageURL: response.data.imageURL,
            description: response.data.description,
            price: response.data.price
        })
    }

    function back() {
        history.goBack()
    }


    return (
        <div className="container">
            <br />
            <div className="product-header">
                <h3>Novo Produto</h3>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" name="name" value={model.name} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control type="text" name="amount" value={model.amount} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control type="text" name="imageURL" value={model.imageURL} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control type="text" name="price" value={model.price} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={model.description} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Submit
                </Button>
                </Form>

            </div>
        </div>
    )

}

export default Products