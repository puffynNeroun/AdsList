const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = 3132;
const DB_FILE = 'users.json';
const ADS_FILE = 'ads.json';

const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    console.log('Headers:', req.headers);
    next();
});

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Регистрация нового пользователя
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const users = JSON.parse(data);

        if (users[username]) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            users[username] = { password: hashedPassword };

            fs.writeFile(DB_FILE, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
});

// Авторизация пользователя и получение токена
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const users = JSON.parse(data);

        if (!users[username]) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        bcrypt.compare(password, users[username].password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const user = { username };
            const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

            res.json({ token });
        });
    });
});

app.post('/ads/create', authenticateToken, upload.single('img'), (req, res) => {
    const { title, description } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!title || !description || !img) {
        return res.status(400).json({ message: 'Title, description, and img are required' });
    }

    fs.readFile(ADS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        let ads = [];
        try {
            ads = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const newAd = { id: Date.now().toString(), title, description, img };
        ads.push(newAd);

        fs.writeFile(ADS_FILE, JSON.stringify(ads, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Ad created successfully', ad: newAd }); // возвращаем объявление
        });
    });
});


// Получение списка объявлений с пагинацией

app.get('/ads', (req, res) => {
    const { page = 1, limit = 4 } = req.query;

    fs.readFile(ADS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const ads = JSON.parse(data);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedAds = ads.slice(startIndex, endIndex);

        res.json({
            ads: paginatedAds,
            currentPage: parseInt(page),
            totalPages: Math.ceil(ads.length / limit),
        });
    });
});



// Обновление объявления с загрузкой изображения
app.put('/ads/:id', authenticateToken, upload.single('img'), (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const img = req.file ? req.file.filename : req.body.img;

    if (!title || !description || !img) {
        return res.status(400).json({ message: 'Title, description, and img are required' });
    }

    fs.readFile(ADS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        let ads = JSON.parse(data);
        const index = ads.findIndex((ad) => ad.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        ads[index] = { id, title, description, img };

        fs.writeFile(ADS_FILE, JSON.stringify(ads, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.json(ads[index]);
        });
    });
});




// Удаление объявления
app.delete('/ads/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    fs.readFile(ADS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading ads file:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        let ads = JSON.parse(data);
        const index = ads.findIndex((ad) => ad.id === id);

        if (index === -1) {
            console.log(`Ad with id ${id} not found`);
            return res.status(404).json({ message: 'Ad not found' });
        }

        ads.splice(index, 1);

        fs.writeFile(ADS_FILE, JSON.stringify(ads, null, 2), (err) => {
            if (err) {
                console.error('Error writing ads file:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            console.log(`Ad with id ${id} deleted successfully`);
            res.json({ message: 'Ad deleted successfully' });
        });
    });
});

// Маршрут для поиска объявлений
app.get('/ads/search', (req, res) => {
    const { query } = req.query;

    fs.readFile(ADS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const ads = JSON.parse(data);
        const filteredAds = ads.filter(ad =>
            ad.title.toLowerCase().includes(query.toLowerCase()) ||
            ad.description.toLowerCase().includes(query.toLowerCase())
        );

        res.json(filteredAds);
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
