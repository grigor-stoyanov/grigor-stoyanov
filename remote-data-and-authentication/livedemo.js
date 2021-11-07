// accessing remote data from a server is done trough making requests
// data can be sent with a post request
const data = {title: 'first Post',comment:'Hello Server'}
fetch('/articles',{
    method: 'post',
    headers:{'Content-type': 'application/json'},
    body: JSON.stringify(data),
})
// allows filtering collections
// permanent storage or sharing of data
// fetch api methods can be post put patch or delete, data usually comes as json string, headers include content-type,length(automatic),cookie(automatic) -for authentication
// custom authorisation headers(manual)
// DATABASE PRINCIPLES!
// 2 types relational and non-relational
// BaaS - backend as a service pre-built cloud systems hosted for developing backends
// relational are the older version of databases
// they keep data in tables every row has a field value like an object
// Structured Query Language is used to make queries/requests for data
// the main property is the use of link information between different tables trough foreign key(common with another table)
// it also guaranteeds all entries in the table are valid   
// downside is the need to validate data being sent
// No-SQL databases don't have as much rules!
// we dont configurate anything and we store unstructured data in a single document
// relational - ACID transactions allows us to reject queries if 1 fails, supports join,data integrity
// non-relational - scale horisontaly(sharding),semi-structured data(of diff type),schema optional
//NOsql databases have unique id for each records which is automatic, we can denormalise data nest within,copy information
// handling forms
// forms are a way to group all input fields to be easy to manipulate
// attribute method specifies which http to use and action the url addres to send the request
// FormData object can automatically serialise all input values without the need to select them manually
formElement.addEventListener('submit',event=>{
    event.preventDefault()
    const data = new FormData(formElement)
    const email = data.get('email') // read single value
    const entries = [...data.entries()] // read array of fvalues 
}) 
// Authentication with user credentials!
// verify identity Who are you? and Authorise What are you allowedd to do?
// basic authentication username and password in request header Authorisation: ...encoded
// can use atob() to decode btoa()
// using cookies upon login server returns authentication cookie which keeps info about client who is using the server
// tokan-based login server returns signed(cryptic) e.g. token in request header X-Authorisation:
