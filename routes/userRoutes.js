const fs = require('fs')
const { join } = require('path')
const filePath = join(__dirname, 'users.json')

const getUsers = () => {
    //verifica se existe o arquivo
    const data = fs.existsSync(filePath)
        //le o arquivo
        ? fs.readFileSync(filePath)
        // se não existir retorna o arquivo vazio 
        : []
    try{
        //retorna com os dados
        return JSON.parse(data)
    }catch (error) {
        //se der erro retorna vazio 
        return []
    }
}

// paramettro dados dos usuarios 
const saveUser = (users) => 
// função para escrever oarquivo e transforma em json 
//adiciona o objeto 
// \t tabula os dados  
fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoutes = (app) => {
    // rota de todas requisições de usuarios CRUD

    app.route('/users/:id?')
    // id importante para o update e delete
        .get((req, res) => {
            // le os usuarios na função 
            const users = getUsers()
            res.send({users})
            // responde com os dados do usuario em um objeto 
        })
        .post((req, res) => {
            // primeiro requisita os usuarios para imitar o banco de dados
            const users = getUsers()
            //cadastra o usuarios com o body da requisição
            users.push (req.body)

            // salva o usuario cadasrado
            saveUser(users)
            // mensagem de sucesso 
            res.status(201).send('Usuário Cdastrado')
        })
        .put((req, res) => {
            // le os usuarios na função 
            const users = getUsers()

             // mesma função saveuser mas agora com parametros para mudar o usuario 
            saveUser(users.map(user => {
                if (user.id === req.params.id){
                    // retorna objeto com o usuario atual com a mescla do que foi alterado
                    return {
                        ...user,
                        ...req.body
                    }
                }
                // senao retorna so o usuario 
                return user
            }))
            // mensagem de sucesso 
            res.status(200).send('Usuário alterado')
        })
        .delete((req, res) => {
             // le os usuarios na função 
             const users = getUsers()


             // vai salvar todos os usuários menos o especificado no parametro
             saveUser(users.filter(user => user.id !== req.params.id))
              // mensagem de sucesso 
            res.status(200).send('Usuário deletado')
        })
}

module.exports = userRoutes
