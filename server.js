const express = require("express");
const { apagar } = require("./mock/banco");
const app = express();
const banco = require("./mock/banco")

app.use(express.json());

// GET /api/colecoes - Esse endpoint deverá listar todas as coleções do sistema.
// app.get( "/api/colecoes", function( req, res){
//     res.json( banco.todasColecoes() );
// } );

//GET /api/colecoes/:id - Esse endpoint deverá retornar os dados da coleção selecionada pelo parâmetro id.
// app.get( "/api/colecoes/:id", function( req, res){
//     const { id } = req.params;
//     const colecao = banco.selecionaColecao( id );

//     if( !colecao ) res.status(204).json();

//     res.json( colecao );
// } );

// GET /api/colecoes/flashcards/:id- Esse endpoint deverá listar todos os flashcards da coleção passada pelo endereço, 
// identificado pela parâmetro id.
// app.get( "/api/colecoes/flashcards/:id", function( req, res){
//     const { id } = req.params;
//     const flashcard = banco.selecionaFlashCardsDaColecao( id );

//     if( !flashcard ) res.status(204).json();

//     res.json( flashcard );
// } );

// GET /api/flashcards/:id- Esse endpoint deverá exibir os dados somente do flashcard selecionado, identificado pela variável id.
// app.get( "/api/flashcards/:id", function( req, res){
//     const { id } = req.params;
//     const flashcard = banco.selecionaFlashCard( id );

//     if( !flashcard ) res.status(204).json();

//     res.json( flashcard );
// } );

// POST /api/colecoes - Esse endpoint deverá criar uma nova coleção com os dados enviada pelo client, por meio do body.
// app.post( "/api/colecoes", function( req, res ){
//     const { descricao, publico } = req.body;
//     banco.criarColecao({ descricao, publico });

//     res.json( { descricao, publico } );
// } );

// PUT /api/colecoes/:id - Esse endpoint deverá selecionar uma coleção, por meio do parâmetro id, atualizar a 
// mesma com os dados enviados por meio do body e salvar a coleção.
// app.put( "/api/colecoes/:id", function( req, res ){
//     const { id } = req.params;
//     const { descricao, publico } = req.body;
//     const colecao = banco.selecionaColecao( id );

//     colecao.descricao = descricao;
//     colecao.publico = publico;

//     banco.salvar( colecao );

//     res.json( colecao )
// } );

// DELETE /api/colecoes/:id - Esse endpoint deverá selecionar uma coleção, por meio do parâmetro id, e 
// apagar o registro na base de dados.
// app.delete( "/api/colecoes/:id", function( req, res ){
//     const { id } = req.params;
//     const colecao = banco.selecionaColecao( id );

//     banco.apagar(colecao);
//     res.json( { "mensagem": "coleção apagada!" } );

// } );



// GET /api/colecoes - Esse endpoint deverá listar todas as coleções do sistema.
// app.get( "/api/colecoes", ( req, res)=>{
//     return res.json( banco.todasColecoes() );
// } );


app.get('/api/flashcards', (req, res)=>{
    return res.json(banco.TodosFlashCard())
})


// GET /api/colecoes/:id - Esse endpoint deverá retornar os dados da coleção selecionada pelo parâmetro id.
app.get( '/api/colecoes', ( req, res)=>{
    return res.json(banco.todasColecoes())
} );


// GET /api/colecoes/flashcards/:id- Esse endpoint deverá listar todos os flashcards da coleção passada pelo endereço, identificado pela parâmetro id.
app.get( '/api/colecoes/:id', function( req, res){
    const { id } = req.params;
    const colecao = banco.selecionaColecao( id );

    return res.json(colecao)
})


// POST /api/colecoes - Esse endpoint deverá criar uma nova coleção com os dados enviada pelo client, por meio do body.
app.post('/api/colecoes', (req, res)=>{
    const {descricao, publico}=req.body
    banco.criarColecao({descricao, publico});
    return res.json({descricao, publico})
})
// app.post( "/api/colecoes", function( req, res ){
//     const { descricao, publico } = req.body;
//     banco.criarColecao({ descricao, publico });

//     res.json( { descricao, publico } );
// });


// PUT /api/colecoes/:id - Esse endpoint deverá selecionar uma coleção, por meio do parâmetro id, e atualizar a mesma com os dados enviados pelo valores enviados por meio do body.
app.put( "/api/colecoes/:id", function( req, res ){
    const { id } = req.params;
    const { descricao, publico } = req.body;
    const colecao = banco.selecionaColecao( id );

    colecao.descricao = descricao;
    colecao.publico = publico;

    banco.salvar( colecao );

    res.json( colecao );
} );


// DELETE /api/colecoes/:id - Esse endpoint deverá selecionar uma coleção, por meio do parâmetro id, e excluir o registro na base de dados.
app.delete( "/api/colecoes/:id", function( req, res ){
    const { id } = req.params;
    const colecao = banco.selecionaColecao( id );

    banco.apagar(colecao);
    res.json( { "mensagem": "coleção apagada!" } );

} );


// GET /api/flashcards/:id- Esse endpoint deverá exibir os dados somente do flashcard selecionado, identificado pela variável id.
app.get( "/api/flashcards/:id", function( req, res){
    const { id } = req.params;
    const flashcard = banco.selecionaFlashCard( id );

    if( !flashcard ) res.status(204).json();

    res.json( flashcard );
} );


// POST /api/flashcards - Esse endpoint deverá criar um novo flashcard com os dados enviados pelo client, por meio do body.
app.post('/api/flashcards', (req, res)=>{
    const {frente, verso, score}=req.body
    banco.criarFlashcard({frente,verso,score});
    return res.json({frente,verso,score})
});


// PUT /api/flashcards/:id - Esse endpoint deverá selecionar um flashcard, por meio do parâmetro id, e atualizar a mesma com os dados enviados pelo valores enviados por meio do body.
app.put( '/api/flashcards/:id', ( req, res )=>{
    const {id} = req.params;
    const {frente,verso,score} = req.body;
    const flashcard = banco.selecionaFlashCard( id );

    flashcard.frente = frente;
    flashcard.verso = verso;
    flashcard.score  = score;

    banco.salvar(flashcards);

    return res.json(flashcards);
} );

// DELETE /api/flashcards/:id - Esse endpoint deverá selecionar um flashcard, por meio do parâmetro id, e excluir o registro na base de dados.
app.delete('/api/flashcards/:id', (req,res)=>{
    const {id} = req.params;
    const flashcard = banco.selecionaFlashCard(id);

    banco.apagar(flashcard);
    return res.json({"mensagem": "coleção apagada!"});
})



app.listen( 3000, function(){
    console.log(`Express started at http://localhost:3000`);
} );