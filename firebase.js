const list1= document.querySelector('ul');
const form2 = document.querySelector('.add');


const addTodo = (todo,id)=>{
    let time = (todo.date.toDate());
    let html = `
    <li data-id='${id}' class="list-group-item d-flex justify-content-between align-items-center">
          <span>${todo.todo}</span>
         <!--- <span>${time}</span>--->
          <i class="far fa-trash-alt delete"></i>
          
        </li>
    `;
    list1.innerHTML += html;
    
}
//delete docs from ui

const deleteTodo = (id) => {
  const todos = document.querySelectorAll("li");
  todos.forEach((todo) => {
    if (todo.getAttribute("data-id") === id) {
      todo.remove();
    }
  });
};


//get docs
db.collection("todos").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const doc = change.doc;
    if (change.type === "added") {
      addTodo(doc.data(), doc.id);
    } else if (change.type === "removed") {
      deleteTodo(doc.id);
    }
  });
});

// db.collection('todos').get().then((snapshot)=>{    
//    snapshot.docs.forEach(doc =>{
//     // console.log(doc.id);   
//     addTodo(doc.data(),doc.id);}
//     )
// }).catch(err => {console.log(err)});

// add docs
form2.addEventListener('submit',e =>{
    e.preventDefault();
    const now = new Date();
    const addtodos = {
      todo: form2.add.value,
      date: firebase.firestore.Timestamp.fromDate(now)
    };
    console.log(addtodos);
    db.collection('todos').add(addtodos).then(()=>{
        console.log('todos added');
    }).catch(err => {console.log(err);
    });
    form2.reset();
});

//delete docs
list1.addEventListener('click', e=>{
    // console.log(e);
    if((e.target.classList.contains("delete"))){
        const id = e.target.parentElement.getAttribute('data-id');
        // console.log(id);
        db.collection('todos').doc(id).delete().then(()=>{
            console.log('todo deleted');
        });
    }
});
