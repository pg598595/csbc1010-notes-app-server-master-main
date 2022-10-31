const express = require('express')
const router = express.Router()
const { validateNote } = require('../utils/validators')

/* ------------------------ TODO-4 - Create New Note ------------------------ */
router.post('/', async (req, res) => {
  console.log(`[POST] http://localhost:${global.port}/note - Storing a new note`)

  /*
    TODO-4:
      Given node content
      Create a new node and store the node to the database,
      Return the newly created note object

      Note content is stored in variable newText

      Your return object should be something similar to this:
        { id, text, dateCreated, lastModified }
  */
  const newText = req.body.text;

  let query = "INSERT INTO notes5 (text) VALUES ('" +
    newText + "')";

  let queryNewNote = "SELECT * FROM notes5 ORDER BY id desc LIMIT 1";

  var newNote = {} // this is the response object, make sure to replace with actual value



  // execute query
  await db.query(query, (err, result) => {

    console.log(result);


    if (err) {
      return res.redirect('/');
    }


  });
  await db.query(queryNewNote, (err, result) => {

    console.log(result[0]);


    if (err) {
      return res.redirect('/');
    }
    newNote = result[0];
    if (!validateNote(newNote)) {
      return res.status(500).send('Invalid data type')
    }

    return res.status(201).send({ newNote })
  });
  // Upon succ, run the following lines to validate the response object and respond to client
  console.log(newNote);

})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put('/', async (req, res) => {
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`)
  console.log(`body for note is == ${req.body}`);
  console.log(`id for note is == ${req.body.id}`);

  /*
    TODO-5:
      Given note id and content
      Update the note's content with the given id in the database
      Return the updated note object

      Note id is stored in variable noteId
      Note content is stored in variable newText

      Your return object should be something similar to this:
        { id, text, dateCreated, lastModified }
  */
  const noteId = req.body.id
  const newText = req.body.text



  // You code here...

  var updatedNote = {} // this is the response object, make sure to replace with actual value

  let queryUpdateNote = `update notes5 SET text = "${newText}" Where id=${noteId}`;

  let queryGetUpdatedNote = `select * from notes5 Where id=${noteId}`;

   // execute query
   await db.query(queryUpdateNote, (err, result) => {

    console.log(result);
    
    if (err) {
      return res.status(500).send('Fail to update')
    }
    

  });

  await db.query(queryGetUpdatedNote, (err, result) => {

    console.log(result);
    if(err){
      return res.status(500).send('Fail to update')
    }
    updatedNote = result[0];
    if (!validateNote(updatedNote)) {
      return res.status(500).send('Invalid data type')
    }
    return res.send({ updatedNote })

  });


})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete('/', async (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`)

  /*
    TODO-6:
      Given a note id
      Delete note with the given id from the database

      Note id is stored in variable noteId 
  */
  const noteId = req.body.id



    // Your code here...


  let queryDeleteNoteNote = `delete from notes5 Where id=${noteId}`;


   // execute query
   await db.query(queryDeleteNoteNote, (err, result) => {



    if (err) {
      return res.status(500).send('Fail to delete');
    }
    return res.send()

  });

})
/* -------------------------------------------------------------------------- */

module.exports = router
