## About

REST API with Express.js and MongoDB.

Run databases in the cloud: https://railway.app/

## Endpoints

GET: http://localhost:3000/trips

```
"trips": [
{
"_id": "60b93ec2dbf8a23480812b6b",
"trip_name": "JavaScript Land"
},
{
"_id": "60be6344c021d229384e88cd",
"trip_name": "Turtles Island"
}]}
```

POST: http://localhost:3000/expense

```
{
    "trip": "60b93ec2dbf8a23480812b6b",
    "date": "2018-07-22T20:22:13",
    "amount": 100,
    "category": "food",
    "description": "A restuarant dinner."
}
```

GET: http://localhost:3000/expenses
Without parameter get all expenses.

```
//Request with parameter
{
    "trip": "60b93ec2dbf8a23480812b6b"
}
```

```
//Response with parameter
{
    "expenses": [
        {
            "_id": "60be790161037c48e4fbdcc6",
            "trip": "60b93ec2dbf8a23480812b6b",
            "date": "2018-07-22T20:22:13",
            "amount": 100,
            "category": "food",
            "description": "A restuarant dinner."
        }
    ]
}

```
