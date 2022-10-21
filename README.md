# Basic Blockchain

A very simplistic blockchain developed with JavaScript, ExpressJS and Fetch





## Run Locally

Clone the project

```bash
  git clone https://github.com/mbdev0/basic-blockchain
```

Go to the project directory

```bash
  cd basic-blockchain
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node app.js
```


## API Reference

#### Register a node

```http
  POST /node/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| body | `array` | **Required**. the node you are registering |

#### Add a transaction

```http
  POST /transactions
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `from`      | `string` | **Required**. Person who is sending the money |
| `to`      | `string` | **Required**. Person who is recieving the money |
| `amount`      | `int` | **Required**. The amount |



#### Mine a block
```http
  GET /mine
```

#### Get Blockchain on the node
```http
  GET /blockchain
```

#### Resolve Blockchain conflict

```http
  GET /resolve
```



