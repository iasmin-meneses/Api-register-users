const express = require('express')
const uuid = require('uuid')
let cors = require('cors')

const port = process.env.PORT || 3001;
const app = express()
app.use(express.json()) // para usar json
app.use(cors())

const users = []

const checkuserID = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }
    request.userIndex = index //estou criando um dado na requisição e dizendo que é = ao index
    request.userId = id
    
    next()

}

app.get('/users', (request, response) => {

    return response.json( users )
})

    /
    app.post('/users/', (request, response) => {

        const { name, age } = request.body
        const user = { id: uuid.v4(), name, age }

        users.push(user)

        return response.status(201).json(user)

    })

app.put('/users/:id', checkuserID, (request, response) => {
    const { name, age } = request.body // corpo da requisiçao
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json({ updateUser })
})

app.delete('/users/:id', checkuserID, (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})



app.listen(port, () => {
    console.log(`❤ server started on port ${port}`)
}) //mensagem que criei para que assim que a porta abrir mostrar essa msgm no terminal