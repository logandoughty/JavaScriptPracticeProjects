const addMovieBtn = document.querySelector("header").lastElementChild; //DOM Traversal to last element of the header which is the "add movie" button
const addMovieModal = document.getElementById("add-modal"); //access movie Modal via ID
const modalCancelBtn = addMovieModal.lastElementChild.firstElementChild; //get cancel button in modal
const modalAddBtn = modalCancelBtn.nextElementSibling; //get the add button located next to the cancel one
const modalBackdrop = document.getElementById("backdrop"); //get the backdrop element
const emptyPlaceholder = document.getElementById("entry-text"); //get the entry text element
const movieList = document.getElementById("movie-list"); //get the underordered list of movies
const dialog = document.getElementById("delete-modal"); //get the dialog box element
const dialogBtns = dialog.lastElementChild; //get dialog button container div

let movieDB = []; //array of movies added
let counter = 0; //counter used for movie ID's

/**
 * deleteHandler() - searches for the MovieID of the selected list item in the saved movieDB array
 *                   and retrieves its index. Removes the item from that index in both the document and
 *                   the movieDB array
 * 
 * @param {*} movieId - takes the movie objects ID as a parameter
 */
const deleteHandler = movieId => {
  let index = 0;
  for (const movie of movieDB) { //search for the movieId's index
    if (movie.id === movieId) {
      break;
    }
    index++;
  }
  movieDB.splice(index, 1); //remove it from the array
  const element = document.getElementById(`${movieId}`);
  element.remove();

  toggleDialog(); //toggle dialog box
  hideEmptyCard(); //check that if the removal caused the list to now be empty
};


/**
 * MovieDeleteSelectionHandler() - Toggles Dialog Box, adds event listeners to the cancel and accept buttons
 *                                 cancel button toggles off dialog, accept (YES) button triggers the deletion of the
 *                                  movie entry.
 * 
 * @param {*} movieId - Take movieID of the item selected for deletion
 */
const MovieDeleteSelectionHandler = movieId => {
  toggleDialog();

  const dialogCancel = dialogBtns.firstElementChild; //get dialog cancel button
  let dialogAccept = dialogBtns.lastElementChild; //get dialog addition button

  dialogAccept.replaceWith(dialogAccept.cloneNode(true)); //creates a clone to remove previous listeners
  dialogAccept = dialogBtns.lastElementChild; //reset Accept Button with a new DOM object

  dialogCancel.removeEventListener('click', toggleDialog); //remove the cencel button event listener
  dialogCancel.addEventListener('click', toggleDialog); //toggles Dialog Box on cancel
  dialogAccept.addEventListener(
    'click',
    deleteHandler.bind(null, movieId)
  ); //event listener to accept - takes the movieId to be deleted as an argument
};

/**
 * toggleDialog() - Toggle the dialog box visibility
 */
const toggleDialog = () => {
  dialog.classList.toggle("visible");
  modalBackdrop.classList.toggle("visible"); //toggle backdrop visibility
};


/**
 * clearInputs removes all text entered within the modal
 */
const clearInputs = () => {
  document.getElementById("title").value = "";
  document.getElementById("image-url").value = "";
  document.getElementById("rating").value = "";
};


/**
 * accessModalHandler() - clears all inputs upon load and then displays or hides the modal and backdrop when called
 */
const accessModalHandler = () => {
  clearInputs(); //clear inputs
  addMovieModal.classList.toggle("visible"); //show and hide modal via class Name & CSS
  modalBackdrop.classList.toggle("visible"); //toggle backdrop visibility
};

/**
 * toggleBackdrop() - toggles backdrop on and off
 */
const toggleBackdrop = () => {
  if(addMovieModal.classList.contains("visible")) { //show and hide modal via class Name & CSS) {
    console.log("Modal");
    accessModalHandler();
  } else {
    toggleDialog();
    console.log("Dialog");
  }
};


/**
 * hideEmptyCard() - Hides or shows the default card when the movieDB is empty or not
 */
const hideEmptyCard = () => {
  if(movieDB.length > 0) {
    emptyPlaceholder.style.display = "none";
  } else {
    emptyPlaceholder.style.display = "block";
  }
};


/**
 * createCard(obj) - Create a new Card list element within the unordered movie list
 * 
 * @param {*} obj - receives a movie object
 * 
 */
const createCard = (movie) => {
  let li = document.createElement("li"); //create list item
  li.className = "movie-element"; //set its class
  li.setAttribute('id', movie.id); //give it an id
  li.innerHTML = `
        <div class="movie-element__image">
          <img src="${movie.imageUrl}" alt="${movie.title}">
        </div>
        <div class="movie-element__info">
          <h2>${movie.title}</h2>
          <p>${movie.rating}</p>
        </div>`; //adds HTML into li element
  li.addEventListener(
    'click',
    MovieDeleteSelectionHandler.bind(null, movie.id)
  ); //event listener on each list item added
  movieList.appendChild(li); //append the list element to the movie list
};


/**
 * displayEntries(movie) - checks if the Database is empty to hide the empty card
 *                         then passes the movie object to the createCard() function to
 *                         add and display the new movie to the list
 * 
 * @param {*} movie - receives a movie object
 */
const displayEntries = movie => {
  hideEmptyCard();
  createCard(movie);
};


/**
 * addNewMovieHandler() - Gets the input data from the modal and stores it in an object 'newMovie'
 *                        The movie objects is then pushed to the movieDB array. Then the Modal is cleared, hidden
 *                        and then calls displayEntries() to display the new entries. counter is increased for the ID
 */
const addNewMovieHandler = () => {
  let newTitle = document.getElementById("title").value; //title modal input
  let newUrl = document.getElementById("image-url").value; //imageUrl modal input
  let newRating = document.getElementById("rating").value; //rating modal input

  const newMovie = { //Movie Object
    id: "Entry-" + counter, //Movie object ID
    title: newTitle, //movie title
    imageUrl: newUrl, //movie image URL
    rating: newRating //movie rating
  };

  movieDB.push(newMovie); //push movie to movieDB array

  accessModalHandler(); //toggle Modal
  displayEntries(newMovie); //display entry in HTML
  ++counter; //increase counter after movie added to movieDB
};



/*EVENT LISTENERS*/
addMovieBtn.addEventListener('click', accessModalHandler); //Event listener for the Add Movie header button
modalCancelBtn.addEventListener('click', accessModalHandler); //Event listener for the modals cancel button
modalAddBtn.addEventListener('click', addNewMovieHandler); //Event listener for the modal add button
modalBackdrop.addEventListener('click', toggleBackdrop); //Event listener for the backdrop 

