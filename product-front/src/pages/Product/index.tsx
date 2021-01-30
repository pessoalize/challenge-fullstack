import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import api from '../../service/api'
import { useHistory, useParams } from 'react-router-dom'

import './index.css'

interface IProduct {
    _id: number
    amount: number
    name: string
    description: string
    imageURL: string
    price: number
}

const Products: React.FC = () => {

    const [products, setProducts] = useState<IProduct[]>([])
    const { id } = useParams<{ id: string }>()
    const history = useHistory()

    useEffect(() => {
        loadProducts()
    }, [])

    async function loadProducts() {
        const token = localStorage.getItem('token')
        if (token == null) {
            history.push('/login')
        }
        const response = await api.get('/product', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response)
        setProducts(response.data)
    }

    async function deleteProduct(id: number) {
        await api.delete(`product/delete/?productID=${id}`)
        loadProducts()
    }

    function newProduct() {
        history.push('/produtos_cadastro')
    }

    async function editProduct(id: number) {
        await history.push(`/produtos_cadastro/${id}`)
    }


    // function editProduct(id: number) {
    //     history.push(`product/update/?productID=${id}`)
    // }

    function viewProduct(id: number) {
        history.push(`/produtos/${id}`)
    }

    return (
        <div className="container">
            <br />
            <div className="product-header">
                <h1>Produtos</h1>
                <Button variant="dark" size="sm" onClick={newProduct}>Cadastrar +</Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quantidade</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Imagem</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.amount}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.imageURL}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Button size="sm" onClick={() => editProduct(product._id)}>Editar</Button> {' '}
                                    <Button size="sm" variant="danger" onClick={() => deleteProduct(product._id)}>Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </Table>
        </div>
    )

}

export default Products