const express = require('express');
const http = require('http');
const pg = require('pg');
const { Client } = pg
const PORT = 3000;

const app = express();
const server = http.createServer(app); 
const client = new Client({
    user: 'postgres',
    password:'postgres', 
    host:'localhost', 
    database:'car_rental',
    port:5432
})


client.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to database');
    }
});

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/about', (req, res) => {
  res.status(200).send('Page about');
});

app.post('/register', (req, res) => {
    console.log(req.body);
    res.status(200).send('Register Success');
});


app.get('/cars',async (req, res) => {
    const data = await client.query('SELECT * from cars')
    console.log(data);
    res.status(200).json(data.rows);
  });

  app.post('/cars2', async (req, res) => {
    const {
        manufactur, type, licenseNumber, seat, baggage, transmission, year, name,
        description, isDriver, img, price, createdBy, updatedBy
    } = req.body;

    try {
        const result = await client.query(
            `INSERT INTO cars (
                "manufactur", "type", "licenseNumber", "seat", "baggage", "transmission", "year",
                "name", "description", "isDriver", "img", "price", "createdBy", "updatedBy"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING *`,
            [manufactur, type, licenseNumber, seat, baggage, transmission, year, name,
            description, isDriver, img, price, createdBy, updatedBy]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.put('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const {
        manufactur, type, licenseNumber, seat, baggage, transmission, year, name,
        description, isDriver, isAvailable, img, price, updatedBy
    } = req.body;

    try {
        const result = await client.query(
            `UPDATE cars SET
                "manufactur" = $1, "type" = $2, "licenseNumber" = $3, "seat" = $4, 
                "baggage" = $5, "transmission" = $6, "year" = $7, "name" = $8, 
                "description" = $9, "isDriver" = $10, "isAvailable" = $11, "img" = $12, 
                "price" = $13, "updatedDt" = now(), "updatedBy" = $14
            WHERE "id" = $15 RETURNING *`,
            [manufactur, type, licenseNumber, seat, baggage, transmission, year, name,
            description, isDriver, isAvailable, img, price, updatedBy, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});


app.delete('/cars/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await client.query('DELETE FROM cars WHERE "id" = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted successfully', car: result.rows[0] });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

server.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});



  //await bisa digunakan didalam async nya saja
// const express = require('express');
// const http = express('http');
// const PORT = 3000;

// const app = express();
// const server = http.createServer(app);

// app.get('/', (req, res) => {
//   res.status(200).send('Hello World!');
// });

// app.get('/about', (req, res) => {
//     res.status(200).send('page about');
//   });


// server.listen(PORT, () => {
//     console.log(`Server berjalan di port ${PORT}`);
// })


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


// app.put('/cars/:id', async (req, res) => {
//     const { id } = req.params;
//     const {
//         manufactur, type, licenseNumber, seat, baggage, transmission, year, name,
//         description, isDriver, img, price, updatedBy
//     } = req.body;

//     try {
//         const result = await client.query(
//             `UPDATE cars SET manufactur = $1, type = $2, licenseNumber = $3, seat = $4, baggage = $5, 
//             transmission = $6, year = $7, name = $8, description = $9, isDriver = $10, img = $11, 
//             price = $12, updatedBy = $13, updatedDt = now() WHERE id = $14 RETURNING *`,
//             [manufactur, type, licenseNumber, seat, baggage, transmission, year, name, description, 
//             isDriver, img, price, updatedBy, id]
//         );
        
//         if (result.rowCount === 0) {
//             return res.status(404).json({ error: 'Car not found' });
//         }
//         res.status(200).json(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database error' });
//     }
// });