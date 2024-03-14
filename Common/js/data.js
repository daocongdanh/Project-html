const products = [
  {
    id: 1,
    name: "ASOS DESIGN oversized t-shirt in",
    price: 123,
    sale: 12,
    color: "blue",
    thumbnail:[
      "203355576-1-midblue.jpg",
      "203355576-2.jpg",
      "203355576-3.jpg",
      "203355576-4.jpg"
    ],
    category: "T-shirts",
    season: "Summer",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 2,
    name: "ASOS DESIGN oversized t-shirt",
    price: 122,
    sale: 11,
    color: "green",
    thumbnail:[
      "204396091-1-scarab.jpg",
      "204396091-2.jpg",
      "204396091-3.jpg",
      "204396091-4.jpg"
    ],
    category: "T-shirts",
    season: "Summer",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 3,
    name: "ASOS DESIGN t-shirt with crew",
    price: 67,
    sale: 12,
    color: "black",
    thumbnail:[
      "205495942-1-black.jpg",
      "205495942-2.jpg",
      "205495942-3.jpg",
      "205495942-4.jpg"
    ],
    category: "T-shirts",
    season: "Summer",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 4,
    name: "ASOS DESIGN t-shirt with crew",
    price: 45,
    sale: 13,
    color: "white",
    thumbnail:[
      "205495879-1-white.jpg",
      "205495879-2.jpg",
      "205495879-3.jpg",
      "205495879-4.jpg"
    ],
    category: "T-shirts",
    season: "Summer",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 5,
    name: "COLLUSION t-shirt in black",
    price: 55,
    sale: 0,
    color: "black",
    thumbnail:[
      "203225616-1-black.jpg",
      "203225616-2jpg",
      "203225616-3.jpg",
      "203225616-4.jpg"
    ],
    category: "T-shirts",
    season: "Summer",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 11,
    name: "Weekday oversized shiny shirt",
    price: 77,
    sale: 0,
    color: "grey",
    thumbnail:[
      "205579431-1-darkgrey.jpg",
      "205579431-2.jpg",
      "205579431-3.jpg",
      "205579431-4.jpg"
    ],
    category: "Shirts",
    season: "Summer",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 12,
    name: "Selected Homme twill overshirt",
    price: 65,
    sale: 11,
    color: "grey",
    thumbnail:[
      "204764411-1-asphalt.jpg",
      "204764411-2.jpg",
      "204764411-3.jpg",
      "204764411-4.jpg"
    ],
    category: "Shirts",
    season: "Summer",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 13,
    name: "AllSaints Castleforst denim",
    price: 34,
    sale: 11,
    color: "black",
    thumbnail:[
      "205719100-1-galaxygrey.jpg",
      "205719100-2.jpg",
      "205719100-3.jpg",
      "205719100-4.jpg"
    ],
    category: "Shirts",
    season: "Summer",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 14,
    name: "ASOS DESIGN relaxed deep revere",
    price: 123,
    sale: 0,
    color: "green",
    thumbnail:[
      "205474048-1-green.jpg",
      "205474048-2.jpg",
      "205474048-3.jpg",
      "205474048-4.jpg"
    ],
    category: "Shirts",
    season: "Summer",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 15,
    name: "New Look long sleeve grandad",
    price: 111,
    sale: 12,
    color: "black",
    thumbnail:[
      "201351725-1-black.jpg",
      "201351725-2.jpg",
      "201351725-3.jpg",
      "201351725-4.jpg"
    ],
    category: "Shirts",
    season: "Summer",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 21,
    name: "Karl Kani OG loose fit jeans over",
    price: 123,
    sale: 0,
    color: "purple",
    thumbnail:[
      "205006940-1-multi.jpg",
      "205006940-2.jpg",
      "205006940-3.jpg",
      "205006940-4.jpg"
    ],
    category: "Jeans",
    season: "Winter",
    sizeList: ["31", "32", "33", "34", "35", "36", "37", "38"],
  },
  {
    id: 22,
    name: "ASOS DESIGN baggy jeans in vintage",
    price: 123,
    sale: 0,
    color: "blue",
    thumbnail:[
      "205124926-1-midwashblue.jpg",
      "205124926-2.jpg",
      "205124926-3.jpg",
      "205124926-4.jpg",
      "205124926-5.jpg"
    ],
    category: "Jeans",
    season: "Winter",
    sizeList: ["31", "32", "33", "34", "35", "36", "37", "38"],
  },
  {
    id: 23,
    name: "Weekday Galaxy loose fit straight",
    price: 33,
    sale: 0,
    color: "green",
    thumbnail:[
      "205579299-1-greenwash.jpg",
      "205579299-2.jpg",
      "205579299-3.jpg",
      "205579299-4.jpg",
      "205579299-5.jpg"
    ],
    category: "Jeans",
    season: "Winter",
    sizeList: ["31", "32", "33", "34", "35", "36", "37", "38"],
  },
  {
    id: 24,
    name: "Jack & Jones Intelligence Liam",
    price: 123,
    sale: 0,
    color: "blue",
    thumbnail:[
      "202083762-1-bluedenim.jpg",
      "202083762-2.jpg",
      "202083762-3.jpg",
      "202083762-4.jpg"
    ],
    category: "Jeans",
    season: "Winter",
    sizeList: ["31", "32", "33", "34", "35", "36", "37", "38"],
  },
  {
    id: 25,
    name: "Topman stretch slim jeans",
    price: 432,
    sale: 11,
    color: "blue",
    thumbnail:[
      "200603634-1-midwashblue.jpg",
      "200603634-2.jpg",
      "200603634-3.jpg",
      "200603634-4.jpg"
    ],
    category: "Jeans",
    season: "Winter",
    sizeList: ["31", "32", "33", "34", "35", "36", "37", "38"],
  },
  {
    id: 31,
    name: "Topman oversized denim jacket",
    price: 754,
    sale: 0,
    color: "blue",
    thumbnail:[
      "201741377-1-midwash.jpg",
      "201741377-2.jpg",
      "201741377-3.jpg",
      "201741377-4.jpg"
    ],
    category: "Jackets",
    season: "Winter",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 32,
    name: "ASOS DESIGN cotton shacket",
    price: 345,
    sale: 12,
    color: "yellow",
    thumbnail:[
      "202820984-1-stone.jpg",
      "202820984-2.jpg",
      "202820984-3.jpg",
      "202820984-4.jpg"
    ],
    category: "Jackets",
    season: "Winter",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 33,
    name: "The North Face '96 Retro",
    price: 342,
    sale: 12,
    color: "pink",
    thumbnail:[
      "205418286-1-pink.jpg",
      "205418286-2.jpg",
      "205418286-3.jpg",
      "205418286-4.jpg"
    ],
    category: "Jackets",
    season: "Winter",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 34,
    name: "Napapijri Hornelen hooded",
    price: 213,
    sale: 0,
    color: "yellow",
    thumbnail:[
      "205130940-1-beige.jpg",
      "205130940-2.jpg",
      "205130940-3.jpg",
      "205130940-4.jpg"
    ],
    category: "Jackets",
    season: "Winter",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 35,
    name: "The North Face 1996 Retro",
    price: 435,
    sale: 0,
    color: "black",
    thumbnail:[
      "204489764-1-black.jpg",
      "204489764-2.jpg",
      "204489764-3.jpg",
      "204489764-4.jpg"
    ],
    category: "Jackets",
    season: "Winter",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 41,
    name: "AllSaints Radiance Oth",
    price: 111,
    sale: 0,
    color: "black",
    thumbnail:[
      "205719173-1-jetblack.jpg",
      "205719173-2.jpg",
      "205719173-3.jpg",
      "205719173-4.jpg"
    ],
    category: "Hoodies",
    season: "Winter",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 42,
    name: "AllSaints Underground Oth",
    price: 324,
    sale: 0,
    color: "grey",
    thumbnail:[
      "205719844-1-cratergrey.jpg",
      "205719844-2.jpg",
      "205719844-3.jpg",
      "205719844-4.jpg"
    ],
    category: "Hoodies",
    season: "Winter",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 43,
    name: "ASOS DESIGN heavyweight",
    price: 233,
    sale: 0,
    color: "brown",
    thumbnail:[
      "204932606-1-peppercorn.jpg",
      "204932606-2.jpg",
      "204932606-3.jpg",
      "204932606-4.jpg"
    ],
    category: "Hoodies",
    season: "Winter",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 44,
    name: "ASOS DESIGN unisex license",
    price: 123,
    sale: 34,
    color: "black",
    thumbnail:[
      "205194097-1-unexplored.jpg",
      "205194097-2.jpg",
      "205194097-3.jpg",
      "205194097-4.jpg"
    ],
    category: "Hoodies",
    season: "Winter",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 45,
    name: "HUGO Diobes oversized",
    price: 98,
    sale: 21,
    color: "black",
    thumbnail:[
      "205032476-1-black.jpg",
      "205032476-2.jpg",
      "205032476-3.jpg",
      "205032476-4.jpg"
    ],
    category: "Hoodies",
    season: "Winter",
    sizeList: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: 51,
    name: "ASOS DESIGN parachute",
    price: 123,
    sale: 0,
    color: "green",
    thumbnail:[
      "204749020-1-khaki.jpg",
      "204749020-2.jpg",
      "204749020-3.jpg",
      "204749020-4.jpg"
    ],
    category: "Cargo Trousers",
    season: "Summer",
    sizeList: ["31", "32", "33", "34", "35", "36", "37", "38"],
  },
  {
    id: 52,
    name: "Jack & Jones tapered cuffed",
    price: 342,
    sale: 12,
    color: "white",
    thumbnail:[
      "205502297-1-moonbeam.jpg",
      "205502297-2.jpg",
      "205502297-3.jpg",
      "205502297-4.jpg",
      "205502297-5.jpg"
    ],
    category: "Cargo Trousers",
    season: "Summer",
    sizeList: ["31", "32", "33", "34", "35", "36", "37", "38"],
  },
  {
    id: 53,
    name: "Jack & Jones tapered smart",
    price: 432,
    sale: 33,
    color: "green",
    thumbnail:[
      "205502432-1-olivenight.jpg",
      "205502432-2.jpg",
      "205502432-3.jpg",
      "205502432-4.jpg",
      "205502432-5.jpg"
    ],
    category: "Cargo Trousers",
    season: "Summer",
    sizeList: ["31", "32", "33", "34", "35", "36", "37", "38"],
  },
  {
    id: 54,
    name: "ADPT parachute cargo pants",
    price: 533,
    sale: 0,
    color: "grey",
    thumbnail:[
      "205256052-1-asphalt.jpg",
      "205256052-2.jpg",
      "205256052-3.jpg",
      "205256052-4.jpg",
      "205256052-5.jpg"
    ],
    category: "Cargo Trousers",
    season: "Summer",
    sizeList: ["31", "32", "33", "34", "35", "36", "37", "38"],
  },
  {
    id: 55,
    name: "ASOS DESIGN baggy cargo",
    price: 453,
    sale: 23,
    color: "green",
    thumbnail:[
      "205314358-1-khaki.jpg",
      "205314358-2.jpg",
      "205314358-3.jpg",
      "205314358-4.jpg",
      "205314358-5.jpg"
    ],
    category: "Cargo Trousers",
    season: "Summer",
    sizeList: ["31", "32", "33", "34", "35", "36", "37", "38"],
  },
];

const categories = [
  {
    name: "T-shirts",
    image: "204396091-4.jpg",
  },
  {
    name: "Shirts",
    image: "201351725-4.jpg",
  },
  {
    name: "Jeans",
    image: "205124926-1-midwashblue.jpg",
  },
  {
    name: "Jackets",
    image: "204718402-2.jpg",
  },
  {
    name: "Hoodies",
    image: "205719173-4.jpg",
  },
  {
    name: "Cargo Trousers",
    image: "205314358-4.jpg",
  },
];

const users = [
  {
    id: 1,
    firstName: "Danh",
    lastName: "Đẹp",
    email: "daokhanhdu123zxc@gmail.com",
    password: "123",
    dayOfBirth: "2222-12-12",
    gender: 1
  },
  { 
    id: 2,
    firstName: "Đào Đức",
    lastName: "Danh",
    email: "daocongdanh48@gmail.com",
    password: "danh",
    dayOfBirth: "2003-02-02",
    gender: 0
  },
  { 
    id: 3,
    firstName: "Danh",
    lastName: "Đẹp",
    email: "daocongdanh47@gmail.com",
    password: "danh123",
    dayOfBirth: "2003-12-30",
    gender: 1
  },
  { 
    id: 4,
    firstName: "Đào",
    lastName: "Đức Danh",
    email: "danhlaptrinh@gmail.com",
    password: "danh",
    dayOfBirth: "2003-09-01",
    gender: 0
  }
]
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("categories",JSON.stringify(categories));
localStorage.setItem("user",JSON.stringify(users));
// console.log(JSON.parse(localStorage.getItem("products")));
