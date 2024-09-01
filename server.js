const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { qrCodeURL: null });
});

app.post('/generate', (req, res) => {
    const qrText = req.body.qrText;

    QRCode.toDataURL(qrText, (err, url) => {
        if (err) {
            return res.send('Error occurred');
        }
        res.render('index', { qrCodeURL: url });
    });
});

app.listen(port, () => {
    console.log(`QR Code generator app listening at http://localhost:${port}`);
});
