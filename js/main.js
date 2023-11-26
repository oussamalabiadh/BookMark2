// ----------------- Start Global
var documentHtml = document ,
siteName = documentHtml.getElementById('siteName'),
siteUrl = documentHtml.getElementById('siteUrl'),
btnAdd = documentHtml.getElementById('btnAdd'),
tableBody = documentHtml.getElementById('tableBody'),
btnUpdate= documentHtml.getElementById('btnUpdate'),
searchBook = documentHtml.getElementById('searchBook'),
alertName = documentHtml.getElementById('alertName'),
alertUrl = documentHtml.getElementById('alertUrl'),
alertExite = documentHtml.getElementById('alertExite');
bookMarks = [];
indexGlobal = 0;

// ----------------- When  Start
if(getlocale() !== null)
{ bookMarks = getlocale();
display();
}
// ----------------- Start Events
btnAdd.onclick = function () {
    addBook()
}
btnUpdate.onclick = function(){
   updateBook();
}
searchBook.oninput= function(){
   search();
}
// ----------------- Start Function
function search(){
   display();
   }
  

function updateBook(){
   if (nameValidation() & UrlValidation()) {
      var book ={
         Name :siteName.value , 
         url  :siteUrl.value
       }
       bookMarks.splice(indexGlobal,1,book);
       console.log(bookMarks);
       display();
       setlocale();
      resetForm();
      btnAdd.classList.remove("d-none");
      btnUpdate.classList.add("d-none");
   }
 }
function addBook(){
 if(nameValidation()& UrlValidation()){
   var book ={
      Name :siteName.value , 
      url  :siteUrl.value
    }
    bookMarks.push(book)
    console.log(bookMarks);
    display();
    setlocale();
   resetForm()
 }
}
function display() {
   var term = searchBook.value.toLowerCase();
    var tableBook ="" ;
 for( var i = 0 ; i< bookMarks.length; i++ ){
   if( bookMarks[i].Name.toLowerCase().includes(term))
   {
      tableBook +=`
      <tr>
      <td/>${bookMarks[i].Name.toLowerCase().replaceAll(term , `<span style=background-color:red;>${term}</span>`)}</td>
  <td>
         <p class="small text-truncate" style="max-width: 300px">
         ${bookMarks[i].url}
         </p>
      </td>
      <td>
         <div class="hstack justify-content-center gap-2">
            <a href="${bookMarks[i].url}" target="_blank" class="btn btn-outline-dark">
               <i class="fa-regular fa-eye"></i>
            </a>
  
            <button class="btn btn-outline-warning">
               <i class="fa-regular fa-pen-to-square" onclick ="update(${i})"></i>
            </button>
  
            <button class="btn btn-outline-danger" onclick ="deleteItem(${i})">
               <i class="fa-solid fa-trash"></i>
            </button>
         </div>
      </td>
   </tr>
      `
   }
 }

 tableBody.innerHTML=tableBook ; 
}
function deleteItem(index){
bookMarks.splice(index,1);
display();
setlocale();
}
function resetForm(){
    siteName.value = "";
    siteUrl.value ="";
}
function setlocale(){
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
}
function getlocale(){
   return JSON.parse(localStorage.getItem("bookMarks"));
}
function update(index){
   indexGlobal = index;
    btnAdd.classList.add("d-none");
    btnUpdate.classList.remove("d-none");
    siteName.value= bookMarks[index].Name;
    siteUrl.value= bookMarks[index].url;
}
// ----------------- Start Validation
function nameValidation() {
   if(siteName.value!==""){
      alertName.classList.add("d-none");
      return true ;
   }
   else{
      alertName.classList.remove("d-none");
      return false
   }
}
function UrlValidation(){
   var exite = false;
   for (var i = 0; i < bookMarks.length; i++) {
      if (bookMarks[i].url === siteUrl.value) {
         exite = true;
         break;
      }
   }
   if(siteUrl.value!==""){
        if(exite){
         alertExite.classList.remove("d-none");
         alertUrl.classList.add("d-none");

         return false ;
        }
        else{
         alertExite.classList.add("d-none");
         alertUrl.classList.add("d-none");
         return true;
        }
     
   }
   else{
      alertUrl.classList.remove("d-none");
      return false
   }
}

