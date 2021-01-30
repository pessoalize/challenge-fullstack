import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Home: React.FC = () => {
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token == null) {
            history.push('/login')
        }
    }, [])

    return (
        <div className="text-center" >
            <h1>Bem - vindo</h1>
        </div>
    )
}

export default Home