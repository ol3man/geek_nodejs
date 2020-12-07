// YCloud Settings
const IAM_TOKEN = 't1.9euelZqeiomOxo_LkJiJjJ6djs2die3rnpWaz5zOnJDLzZiYx8nJk42Ki43l9PdLZkgB-u9nInjV3fT3CxVGAfrvZyJ41Q.1PyN7Iv6h1qTDHqwgT-o6ryFIxL2--ChnBvoPlkVfFrX0_Q2yyhEB83H2g5IU-2SMu3HjzzUstwfYGKH3M00CA';
const FOLDER = 'b1gucio3uq10upkgg8fu'

const axios = require('axios');
const express = require('express')
var path = require('path');
const app = express()

getTranslate = function (data, callback) {
    axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
        "folder_id": FOLDER,
        "texts": data,
        "targetLanguageCode": "en"
    }, {
        headers: {
            'Content-Type': 'aaplication/json',
            'Authorization': 'Bearer ' + IAM_TOKEN
        }
    })
        .then(resp => {
            callback(resp.data);
            console.log(resp.data);
        }).catch(err => {
        console.log(err);
    })
}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/:wrd', function (req, res) {
    // перевод слова при передаче в адресной строке после слэша
    getTranslate(req.params.wrd, function (response) {
        console.log(response.translations[0].text);
        res.send(response.translations[0].text);
    });

})


app.listen(3000, () => {
    console.log('listening on 8080');
})


/*
 Вопросы:
 1. Как получать данные с сервера по нажатию кнопки во вьюхе?
 */