const houses = require('./db.json'); 
let globalID = 4; 

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses)
  }, 
  deleteHouse: (req, res) => {
    let index = houses.findIndex(house => house.id===+req.params.id); 
    houses.splice(index, 1); 
    res.status(200).send(houses); 
  }, 
  createHouse: (req, res) => {
    const {address, price, imageURL} = req.body; 
    let newHouse = {
      id: globalID,
      address,
      price: +price,
      imageURL
    }
    houses.push(newHouse); 
    globalID++
    res.status(200).send(houses); 
  },
  updateHouse: (req, res) => {
    let index = houses.findIndex(house => house.id===+req.params.id); 
    // console.log(req.body)
    const {type} = req.body; 
    if(type === 'minus' && houses[index].price > 10000) {
      houses[index].price -= 10000; 
      res.status(200).send(houses); 
    }
    else if(type === 'plus' && houses[index].price < 1000000) {
      houses[index].price += 10000; 
      res.status(200).send(houses); 
    }
    else if(houses[index].price > 1000000) {
      res.status(400).send('Price cannot go higher!')
    }
    else {
      res.status(400).send('Price cannot go lower!')
    }
  }
}