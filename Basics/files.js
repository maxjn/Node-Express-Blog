const fs = require('fs');

// Read Function
const readFunc = (path) => {
  const fileContent = fs.readFileSync(path, 'utf8');
  console.log(fileContent);
}

// Read Files
const filePath = './docs/doc1.txt';
readFunc(filePath);

// Write Files
fs.writeFile('./docs/doc2.txt', 'Hello again', (err) => {
  if (err) {
    console.error('Error writing the file:', err);
  } else {
    console.log('File was written');
  }
});

// Re-read the written file
readFunc('./docs/doc2.txt');


// Directions

if(!fs.existsSync('./assets')){
    fs.mkdir('./assets',(err)=>{
        if (err) {
            console.log(err)
        }else{
            console.log('Folder was created')
        }

    })
}else{
    fs.rmdir('./assets',(err)=>{
        if (err) {
            console.log(err)
        }else{
            console.log('Folder was deleted')
        }

    })
}

