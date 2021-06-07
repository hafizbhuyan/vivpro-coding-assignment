const app = require('express')();
const PORT = 8080;

function printFile(file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      console.log(evt.target.result);
    };
    reader.readAsText(file);
}

printFile('/output.xlsx')

// app.get('/tshirt', (req, res) => {
//     res.status(200).send({
//         tshirt: 'shirt',
//         size: 'large'
//     })
// })

// app.listen(
//     PORT,
//     () => console.log(`Server link: http://localhost:${PORT}/tshirt`)
// )