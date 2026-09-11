const express = require('express');
const app = express();
const port = 3030;

const dealerships = [
  {"id": 1, "city": "El Paso", "state": "Texas", "address": "334 Cross Junction", "zip": "79902", "full_name": "Holden Dealership"},
  {"id": 2, "city": "Minneapolis", "state": "Minnesota", "address": "4 Gateway Circle", "zip": "55403", "full_name": "Ford Dealership"},
  {"id": 3, "city": "Topeka", "state": "Kansas", "address": "102 Morris Crossing", "zip": "66605", "full_name": "Toyota Dealership"}
];

let reviews = [
  {"id": 1, "name": "John", "dealership": 1, "review": "Great service and smooth process!", "purchase": true, "sentiment": "positive"}
];

app.use(express.json());

app.get('/fetchDealers', (req, res) => res.json(dealerships));
app.get('/fetchDealers/:state', (req, res) => {
  const state = req.params.state.toLowerCase();
  res.json(dealerships.filter(d => d.state.toLowerCase() === state));
});
app.get('/fetchDealer/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.json(dealerships.find(d => d.id === id) || {});
});
app.get('/fetchReviews/dealer/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.json(reviews.filter(r => r.dealership === id));
});

app.post('/insert_review', (req, res) => {
  const newReview = {
    id: reviews.length + 1,
    name: req.body.name || "Anonymous",
    dealership: req.body.dealership,
    review: req.body.review,
    purchase: true,
    sentiment: "positive"
  };
  reviews.push(newReview);
  res.json({ status: 200, message: "Review added successfully" });
});

app.listen(port, () => console.log(`Express running on port ${port}`));
