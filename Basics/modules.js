const {people,ages} = require('./people') 

people.map((p,index)=>{
    console.log(p +' is ' + ages[index] + ' years old')
})