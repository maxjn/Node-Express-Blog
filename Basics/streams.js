const fs = require('fs')

const textStream = fs.createReadStream('./docs/doc3.txt',{encoding:'utf8'})
const writeStream = fs.createWriteStream('./docs/doc4.txt')

textStream.on('data',(chunk)=>{
    console.log('-------------- New Chunk --------------')
    console.log(chunk)

    writeStream.write('\n ---------------------- New Chunk -------------------- \n')
    writeStream.write(chunk)
})

// Pipe
fs.ReadStream.pipeline(writeStream)