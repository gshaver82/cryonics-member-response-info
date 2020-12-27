//change package json to the below code to go back to the seedDB.js
// "seed": "node scripts/seedDB.js"

let mongoose = require("mongoose");
let recipesModel = require("../models/recipesModel");
let ingredientsModel = require("../models/ingredientsModel");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recipes_hybrid_DB", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

let recipesSeed = [
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2",
        name: "Chicken Adobo",
        comments: [
            {
                text: "This dish could benefit from a little more soy next time.",
            },
            {
                text:" It came out perfectly with soy addition! ", 
            }
        ],
        description:"This classic adobo recipe is simple to make and famous with all who have tasted it. It is delicious served over rice.",
        imageUrls:["https://i.imgur.com/fn2PqjZ.jpg"],
        category: "entree",  
        tags: [
            "chicken", "dinner", "easy",
        ],
        ingredients: [
            {
                name: "chicken thigh or drumsticks",
                details: " ",
                quantity: 2,
                units: "lb",
            },
            {
                name: "soy sauce",
                details: " ",
                quantity: 0.5,
                units: "cup",
            },
            {
                name: "apple cider vinegar",
                details: " ",
                quantity: .66,
                units: "cup",
            },
            {
                name: "garlic",
                details: " ",
                quantity: 2,
                units: "cloves",
            },
            {
                name: "bay leaves",
                details: " ",
                quantity: 2,
                units: "", 
            },
            {
                name: "onion",
                details: " ",
                quantity: 1,
                units: "",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title: "Step 1", 
                text: "Put all ingredients in a pot and cover. Bring pot to boil.",
                timer: 0, 
            },
            {
                title: "Step 2",  
                text: "Cover with lid and simmer for 40 minutes, turning have way through.",
                timer: 2400,
            }
        ]
    }, 
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2", 
        name: "Egg Salad Sandwich",
        comments: [
            {
                text:"Add an extra egg and .5 tbspn of mayo for extra calories.",
            },
            {
                text:"4 eggs is a bit much for 1 person to eat! Go back to 3 eggs.", 
            }
        ],
        description:"This sandwich is so easy to make, you'd wish you've made it earlier.",
        imageUrls:["https://i.imgur.com/akBLfNV.jpg"],
        category:"entree", 
        tags: [
            "egg", "lunch", "easy", "sandwich",
        ],
        ingredients: [
            {
                name: "eggs",
                quantity: 3,
                details: " ",
                units: "",  
            },
            {
                name: "mayo",
                quantity: 1,
                details: " ",
                units: "tbspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text:"Boil eggs for 7-9 minutes. Remove from stove, drain water and fill pan with cold water.",
                timer: 420,
            },
            {
                title: "Step 2", 
                text: "Let sit and then peel eggs and crushed. Mix the mayo and eggs. Add salt and pepper to taste.",
                timer: 0,
            }
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2", 
        name: "Emma's Mom's Soup",
        comments: [
            {
                text: "Amazing dish. No need to change anything",
            }
        ],
        description:"Easy to make soup. Brings back memories of home!",
        imageUrls:["https://i.imgur.com/njfZ76Z.jpg"],
        category:"soup", 
        tags: [
            "soup", "chicken", "potato", "slow-cook",
        ],
        ingredients: [
            {
                name: "chicken broth",
                details: " ",
                quantity: 40,
                units: "oz",  
            },
            {
                name: "cream of chicken soup",
                details: " ",
                quantity: 1,
                units: "can",
            },
            {
                name: "potatoes",
                details: "cubed, Yukon ",
                quantity: 6,
                units: "", 
            },
            {
                name: "cream cheese",
                details: " ",
                quantity: 1,
                units: "package",
            },
            {
                name: "bacon",
                details: "bits",
                quantity: 1,
                units: "to taste", 
            },
            {
                name: "black pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text: "Melt cream cheese in a pot.",
            },
            {
                title: "Step 2", 
                text: "Stir in cream of chicken, add broth, potatoes, bacon, pepper, and stir.",
            },
            {
                title: "Step 3",
                text: "Cover with lid and simmer for 3 hours or until potatoes are soft.",
                timer: 10800,
            }
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2", 
        name: "Sugar Cookie",
        comments: [
            {
                text: "These cookies are great! To reduce the amount of sugar, do 3/4 cup instead!",
            },
            {
                text:"Reducing sugar is perfect for those who prefer less sugar!", 
            }
        ],
        description:"The best cookies to enjoy anytime of the year!",
        imageUrls:["https://i.imgur.com/rrgSgF7.jpg"],
        category:"dessert", 
        tags: [
            "Aunt Betty's", "cookies", "sweets", "holiday", "treats"
        ],
        ingredients: [
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",  
            },
            {
                name: "brown sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "butter",
                details: " ",
                quantity: 2,
                units: "cup",
            },
            {
                name: "eggs",
                details: " ",
                quantity: 2,
                units: "",
            },
            {
                name: "vanilla extract",
                details: " ",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "flour",
                details: " ",
                quantity: 4,
                units: "cup",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "baking soda",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "cream of tartar",
                details: " ",
                quantity: 2,
                units: "tspn",
            }
        ],
        actions: [
            {
                title: "Prep", 
                text: "Preheat oven to 360F.",
                timer: 0,
            },
            {
                title: "Mix",
                text: "Cream butter, sugars. Beat in eggs and vanilla.",
                timer: 0,
            },
            {
                title: "Stir", 
                text: "Stir in dry ingredients. Coat in sugar.",
                timer: 0,
            },
            {
                title: "Bake", 
                text: "Bake for 10 minutes.",
                timer: 600,
            },
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2", 
        name: "Buttermilk Pancakes",
        comments: [
            {
                text: "This dish is barely enough for 2 people.  Double the amount next time!",
            },
            {
                text:" Doubling the amount will yield leftover. Maybe try adding fruits on top next time.", 
            }
        ],
        description:"A decadent weekend breakfast for when you want to treat yourself.",
        imageUrls:["https://i.imgur.com/zHcCB7k.jpg"],
        category:"entree", 
        tags: [
            "breakfast", "treat", "weekend", "pancake",
        ],
        ingredients: [
            {
                name: "flour",
                details: " ",
                quantity: 1,
                units: "cup",  
            },
            {
                name: "baking powder",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "baking soda",
                details: " ",
                quantity: .5,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: .25,
                units: "tspn",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1.5, 
                units: "tbspn",
            },
            {
                name: "eggs",
                details: "lightly beaten",
                quantity: 1,
                units: "",
            },
            {
                name: "buttermilk",
                details: " ",
                quantity: 1.5,
                units: "cup",
            },
            {
                name: "butter",
                details: "unsalted",
                quantity: 2,
                units: "tbspn",
            }
        ],
        actions: [
            {
                title:"Dry", 
                text: "Whisk flour, baking soda, baking powder, salt, sugar.",
                timer: 0,
            },
            {
                title: "Wet",
                text: "Add eggs, buttermilk, butter and whisk to combine. Batter should be lummpy.",
                timer: 0,
            },
            {
                title: "Fry",
                text: "Heat a lightly oiled frying pan over medium high heat. Pour the batter onto pan, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.",
                timer: 0,
            }
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2", 
        name: "Pork Ribs",
        comments: [
            {
                text: "This BBQ sauce is too spicy. Cut it with something pickled next time?",
            },
            {
                text:"This dish goes really well with pickled red onions!", 
            }
        ],
        description:"A versatile dish to be enjoyed with salad, on a sandwich, or with vegetables and potatoes or rice.",
        imageUrls:["https://i.imgur.com/fzfBdcT.jpg"],
        category:"entree", 
        tags: [
            "pork", "ribs", "BBQ", 
        ],
        ingredients: [
            {
                name: "smoky pork seasoning",
                details: " ",
                quantity: 1,
                units: "package",  
            },
            {
                name: "BBQ sauce",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pork ribs",
                details: " ",
                quantity: 1,
                units: "rack", 
            }
        ],
        actions: [
            {
                title:"Prep", 
                text:"Preheat oven to 250F.",
            },
            {
                title: "Rub",
                text: "Rub ribs with seasoning.",
            },
            {
                title: "Wrap",
                text:"Put wire rack on baking sheet. Wrap ribs in foil pack, meat side up on rack.",
            },
            {
                title: "Bake",
                text: "Bake for 2 hours.",
                timer: 7200,
            },
            {   title: "Unwrap/Bake",
                text: "Unwrap and bake for another 1-1.5 hours.",
                timer: 3600,
            },
            {
                title: "Baste",
                text: "Turn oven heat to 500F. Baste with sauce on both sides.",
                timer: 0,
            },
            {
                title: "Finish",
                text: "Bake for 10 minutes and let rest.",
                timer: 600,
            }
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2",
        name: "Tortellini Soup",
        comments: [
            {
                text: "I wonder if the recipe comes out okay without the sausuage?",
            },
            {
                text:"Yes, vegetarian works well with it!", 
            }
        ],
        description:"A cheese, meaty, Italian pasta dish that is sure to remind you of your trip to Italy!",
        imageUrls:["https://i.imgur.com/AJBIySd.jpg"],
        category:"entree", 
        tags: [
            "pasta", "italian", "sausage", "cheese",
        ],
        ingredients: [
            {
                name: "Italian sausage",
                details: "casing removed",
                quantity: 1,
                units: "lb",  
            },
            {
                name: "garlic",
                details: "minced",
                quantity: 3,
                units: "cloves",
            },
            {
                name: "onion",
                details: "diced",
                quantity: 1,
                units: "",
            },
            {
                name: "chicken stock",
                details: " ",
                quantity: 2,
                units: "cups",
            },
            {
                name: "tomato",
                details: "crushed",
                quantity: 28,
                units: "oz",
            },
            {
                name: "basil",
                details: "dried",
                quantity: .5,
                units: "tspn",
            },
            {
                name: "oregano",
                details: "dried",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "red pepper flakes",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "tortellini",
                details: "cheese",
                quantity: 9,
                units: "oz",
            },
            {
                name: "half and half",
                details: " ",
                quantity: .33,
                units: "cup",
            },
            {
                name: "parmesan",
                details: "grated",
                quantity: 0.25,
                units: "cup",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text:"Heat olive oil in big pot and brown sausage. Crumble sausage as it cooks, remove excess fat. Add garlic and onion until brown.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Add stock, tomatoes, spices and 1 cup water. Season with salt and pepper.",
                timer: 0,
            },
            {
                title: "Step 3",
                text: "Bring to boil and stir in tortellini, reduce heat and simmer for 5-6 minutes.",
                timer: 300,
            },
            {
                title: "Step 4",
                text: "Add cream and parmesan.  Simmer for 4 minutes.",
                timer: 240,
            }
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2", 
        name: "Peach Cobbler",
        comments: [
            {
                text: "Yummy! But a little extra sugar might go best with this dish, especially if there is no ice cream!",
            },
            {
                text:"Adding 1/2 cup sugar for the recipe is great, if you're eating with coffee only!", 
            }
        ],
        description:"A summer delight, pairs perfectly with ice cream!",
        imageUrls:["https://i.imgur.com/hQuHlwu.jpg"],
        category:"dessert", 
        tags: [
            "peach", "dessert", "treat",
        ],
        ingredients: [
            {
                name: "butter",
                details: "melted",
                quantity: 0.5,
                units: "cup",  
            },
            {
                name: "flour",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "baking powder",
                details: " ",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "milk",
                details: "room temp",
                quantity: 0.66,
                units: "cup",
            },
            {
                name: "egg, room",
                details: "room temp",
                quantity: 1,
                units: "", 
            },
            {
                name: "peaches",
                details: "sliced",
                quantity: 28,
                units: "oz",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "cinnamon",
                details: "ground",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "nutmeg",
                details: "ground",
                quantity: 0.5,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Prep", 
                text: "Preheat oven to 350F.",
                timer: 0,
            },
            {
                title: "Melt",
                text: "Melt butter in pan.",
                timer: 0,
            },
            {
                title: "Mix",
                text: "Mix dry ingredients. Stir in milk and egg. Pour over melted butter.",
                timer: 0,
            },
            {
                title: "Combine",
                text: "Combine filling and spread over batter - don't stir.",
                timer: 0,
            },
            {
                title: "Bake",
                text: "Bake for 35-45 minutes.",
                timer: 2100,
            },
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2", 
        name: "Homemade Italian Turkey Sausage",
        comments: [
            {
                text: "I wonder if onions would make this sausage more moist?",
            },
            {
                text:"Nope. Onions didn't do much! Skip the onion.", 
            }
        ],
        description:"Easy homemade suasage that you can customize with any type of meats.",
        imageUrls:["https://i.imgur.com/I1fKNn0.jpg"],
        category:"entree", 
        tags: [
            "Italian", "sausage",
        ],
        ingredients: [
            {
                name: "oregano",
                details: "dried",
                quantity: 1,
                units: "tspn",  
            },
            {
                name: "fennel seed",
                details: "crushed",
                quantity: 1.5,
                units: "tspn",
            },
            {
                name: "garlic",
                details: "powder",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "turkey",
                details: "lean ground",
                quantity: 1,
                units: "lb",
            },
            {
                name: "black pepper",
                details: " ",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1.5,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "In a bowl, combine the turkey, garlic powder, fennel seed, sugar, salt, oregano and pepper.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Cover and refrigerate for at least 8 hours or overnight.",
                timer: 28800,
            },
            {
                title: "Step 3",
                text: "Shape into eight patties.",
                timer: 0,
            },
            {
                title: "Step 4",
                text:  "Coat nonstick pan with cooking spray and cook for 3 minutes on each side or until meat thermometer reads 165F.",
                timer: 180,
            },
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2", 
        name: "Country Potato Pancake",
        comments: [
            {
                text: "Had some sour cream and smoked salmon lying around.  Definitely a great addition!",
            }
        ],
        description:"A great savory pancake dish that you can swap in for a change of scene.",
        imageUrls:["https://i.imgur.com/UNTyMxi.jpg"],
        category:"entree", 
        tags: [
            "pancake", "potato", "breakfast", "savory",
        ],
        ingredients: [
            {
                name: "baking powder",
                details: " ",
                quantity: 1,
                units: "tspn",  
            },
            {
                name: "eggs",
                details: "lightly beaten ",
                quantity: 2,
                units: "",
            },
            {
                name: "flour",
                details: "all-purpose", 
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "onion",
                details: "grated", 
                quantity: 1,
                units: "tbspn",
            },
            {
                name: "potatoes",
                details: "large, peeled",
                quantity: 3,
                units: "",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "vegetable oil",
                details: " ",
                quantity: 1,
                units: "tspn"
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Finely grate potatoes. Drain any liquid. Add eggs, onion, flour, salt and baking powder.",
                timer: 0,
            },
            {
                title: "Step 2",
                text:"In a frying pan, add oil to the depth of 1/8 in. Heat over medium-high (375F).",
                timer: 0,
            },
            {
                title: "Step 3",
                text: "Drop batter by heaping tablespoonfuls in hot oil. Flatten to form patties.",
                timer: 0,
            },
            {
                title: "Step 4",
                text:  "Fry until golden brown then turn and cook the other side.",
                timer: 0,
            },
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2",
        name: "Chicken Tacos - the Tahiti Way",
        comments: [
            {
                text: "Lacking text, maybe try pickled red onion and shredded cabbage next time!",
            },
            {
                text:"Yes, texture definitely adds to this dish!", 
            }
        ],
        description:"This recipe is from my favorite taco truck on last trip to Portland.",
        imageUrls:["https://i.imgur.com/4ZyegVF.jpg"],
        category:"entree", 
        tags: [
            "tacos", "chicken", "Tahiti", "slow-cook",
        ],
        ingredients: [
            {
                name: "black pepper",
                details: " ",
                quantity: 0,
                units: "to taste",  
            },
            {
                name: "chicken breast",
                details: "boneless",
                quantity: 6,
                units: "",
            },
            {
                name: "cilantro",
                details: "chopped",
                quantity: 1,
                units: "tbspn",
            },
            {
                name: "tortillas",
                details: "corn",
                quantity: 10,
                units: "",
            },
            {
                name: "garlic",
                details: "diced",
                quantity: 2,
                units: "cloves",
            },
            {
                name: "onion",
                details: "large, sliced",
                quantity: 0.5,
                units: "",
            },
            {
                name: "pepperoncini pepper",
                details: " ",
                quantity: 16,
                units: "oz",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Combine everything including the ENTIRE jar of peppers, juice and all, but the tortillas into a slow cooker.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Cook on low 5 hours.",
                timer: 18000,
            },
            {
                title: "Step 3",
                text:  "Shred chicken with 2 forks. Mix well with everything in the pot.",
                timer: 0,
            },
            {
                title: "Step 4",
                text: "Heat tortillas till soft. Served the chicken on the tortilla. Enjoy!",
                timer: 0,
            }
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2", 
        name: "Tomato-Mint Quinoa Salad",
        comments: [
            {
                text: "It looks so pretty!",
            }
        ],
        description:"A delicious summer delight using fresh ingredients from the farmer's markets.",
        imageUrls:["https://i.imgur.com/Rk2iBIh.jpg"],
        category:"entree", 
        tags: [
            "salad", "tomato", "quinoa",
        ],
        ingredients: [
            {
                name: "water",
                details: " ",
                quantity: 2.5,
                units: "cups",  
            },
            {
                name: "quinoa",
                details: " ",
                quantity: 1.25,
                units: "cups",
            },
            {
                name: "raisins",
                details: " ",
                quantity: .75,
                units: "cups",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "pinch",
            },
            {
                name: "medium tomato",
                details: "diced",
                quantity: 2,
                units: "",
            },
            {
                name: "medium onion",
                details: "minced",
                quantity: 1,
                units: "",
            },
            {
                name: "radish",
                details: "quartered",
                quantity: 10,
                units: "",
            },
            {
                name: "cucumber",
                details: "diced",
                quantity: .5,
                units: "",
            },
            {
                name: "almonds",
                details: "sliced, toasted",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "parsley",
                details: "fresh, chopped",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "cumin",
                details: "ground",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "lime",
                details: "juice",
                quantity: .25,
                units: "cup",
            },
            {
                name: "sesame oil",
                details: " ",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: .25,
                units: "tspn to taste",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Bring water to boil in a small saucepan. Pour in quinoa, raisins, and a pinch of salt. Cover, and let simmer for 12 to 15 minutes, then remove from heat, and allow to cool to room temperature.",
                timer: 780,
            },
            {
                title: "Step 2",
                text: "Toss together the tomatoes, onion, radish, cucumber, and almonds in a large bowl. Stir in the cooled quinoa, then season with mint, parsley, cumin, lime juice, sesame oil, and salt. Chill 1 to 2 hours before serving.",
                timer: 3600,
            }
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2",
        name: "Mapo Tofu",
        comments: [
            {
                text: "This dish needs a little sauce! Maybe add 2-3 tablespoon of water?",
            },
            {
                text:"Yep, water helps and coats the rice better!", 
            }
        ],
        description:"A go-to staple for the days when when you don't have anything in the fridge except for tofu and green onions. Goes well with rice!",
        imageUrls:["https://i.imgur.com/FUVkBZm.jpg"],
        category:"entree", 
        tags: [
            "tofu", "vegetarian", "sichuan", "easy",
        ],
        ingredients: [
            {
                name: "tofu",
                details: "medium firm, cubed",
                quantity: 16,
                units: "oz",  
            },
            {
                name:  "mapo bean curd seasoning",
                details: "sichuan style",
                quantity: 1,
                units: "pack of 150gm",
            },
            {
                name: "green onion",
                details: "chopped",
                quantity: 2,
                units: "",
            },
            {
                name: "vegetable oil",
                details: " ",
                quantity: 1,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text: "Heat vegetable oil in medium heat pan. Add seasoning, tofu, and green onions to the pan.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Mix all ingredients and when throughly heated, served with rice.",
                timer: 0,
            }
        ]
    },
    {
        userID:"QHJEh978YHaqyrJyOSrprc34TYV2",
        name: "Peach crostata",
        comments: [
            {
                text: "It came out delicious, next time, follow the direction to the T.",
            },
            {
                text:"Amazing! Goes well with ice cream!", 
            }
        ],
        description:"Free-form tarts (sometimes called crostatas) are an easy, quick-to-prepare way to use up seasonal fruit.",
        imageUrls:["https://i.imgur.com/dhHOHPm.jpg"],
        category:"dessert", 
        tags: [
            "peach", "crostata", "tart", "fruit", "summer", "pie"
        ],
        ingredients: [
            {
                name: "flour",
                details: "all-purpose",
                quantity: 1.5,
                units: "cups",  
            },
            {
                name:  "sugar",
                details: "granulated",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "salt",
                details: "",
                quantity: 0,
                units: "pinch",
            },
            {
                name: "butter",
                details: "cold unsalted,  cut into 1/2 inch",
                quantity: 6,
                units: "tbspn",
            },
            {
                name: "water",
                details: "ice",
                quantity: 1/4,
                units: "cup",
            },
            {
                name: "peaches",
                details: "halved, pitted and sliced 1/2 inch thick",
                quantity: 5,
                units: "",
            },
            {
                name: "brown sugar",
                details: "",
                quantity: 1/4,
                units: "cups",
            },
            {
                name: "vanilla extract",
                details: "",
                quantity: 1/2,
                units: "tspn",
            },
            {
                name: "cinnamon",
                details: "ground",
                quantity: 0,
                units: "pinch",
            },
            {
                name: "heavy cream",
                details: "",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "turbinado",
                details: "or other coarse sugar",
                quantity: 2,
                units: "tbspn",
            },
        ],
        actions: [
            {
                title:"Step 1",
                text: "In a food processor, pulse 1 1/2 cups of the flour with the granulated sugar and 1/2 teaspoon of salt until blended. Add the butter and pulse until it is the size of peas. Add the water and pulse until the dough is evenly moistened. Transfer the dough to a lightly floured work surface and pat it into a disk. Cover the disk with plastic wrap and refrigerate until chilled, about 30 minutes.",
                timer: 1800,
            },
            {
                title: "Step 2",
                text: "Preheat the oven to 425°. In a medium bowl, toss the peaches with the brown sugar, vanilla, cinnamon, a pinch of salt and the remaining 2 tablespoons of flour.",
                timer: 0,
            } ,
            {
                title: "Step 3",
                text: "On a lightly floured work surface, roll out the dough to a 12-inch round. Transfer the dough to a parchment-lined rimmed baking sheet. Mound the peaches with their juices in the center of the dough, leaving a 2-inch border all around. Fold the edge of the dough up and over the peaches. Refrigerate the tart until chilled, about 30 minutes.",
                timer: 1800,
            },
            {
                title: "Step 4",
                text: "Brush the dough with the cream and sprinkle with the turbinado sugar. Bake for about 50 minutes, until the crust is golden and the peaches are bubbling.",
                timer: 3600,
            },
            {
                title: "Step 4",
                text: "Let cool for 15 minutes before serving.",
                timer: 900,
            }
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1",
        name: "Chicken Adobo",
        comments: [
            {
                text: "This dish could benefit from a little more soy next time.",
            },
            {
                text:" It came out perfectly with soy addition! ", 
            }
        ],
        description:"This classic adobo recipe is simple to make and famous with all who have tasted it. It is delicious served over rice.",
        imageUrls:["https://i.imgur.com/fn2PqjZ.jpg"],
        category: "entree",  
        tags: [
            "chicken", "dinner", "easy",
        ],
        ingredients: [
            {
                name: "chicken thigh or drumsticks",
                details: " ",
                quantity: 2,
                units: "lb",
            },
            {
                name: "soy sauce",
                details: " ",
                quantity: 0.5,
                units: "cup",
            },
            {
                name: "apple cider vinegar",
                details: " ",
                quantity: .66,
                units: "cup",
            },
            {
                name: "garlic",
                details: " ",
                quantity: 2,
                units: "cloves",
            },
            {
                name: "bay leaves",
                details: " ",
                quantity: 2,
                units: "", 
            },
            {
                name: "onion",
                details: " ",
                quantity: 1,
                units: "",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title: "Step 1", 
                text: "Put all ingredients in a pot and cover. Bring pot to boil.",
                timer: 0, 
            },
            {
                title: "Step 2",  
                text: "Cover with lid and simmer for 40 minutes, turning have way through.",
                timer: 2400,
            }
        ]
    }, 
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1", 
        name: "Egg Salad Sandwich",
        comments: [
            {
                text:"Add an extra egg and .5 tbspn of mayo for extra calories.",
            },
            {
                text:"4 eggs is a bit much for 1 person to eat! Go back to 3 eggs.", 
            }
        ],
        description:"This sandwich is so easy to make, you'd wish you've made it earlier.",
        imageUrls:["https://i.imgur.com/akBLfNV.jpg"],
        category:"entree", 
        tags: [
            "egg", "lunch", "easy", "sandwich",
        ],
        ingredients: [
            {
                name: "eggs",
                quantity: 3,
                details: " ",
                units: "",  
            },
            {
                name: "mayo",
                quantity: 1,
                details: " ",
                units: "tbspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text:"Boil eggs for 7-9 minutes. Remove from stove, drain water and fill pan with cold water.",
                timer: 420,
            },
            {
                title: "Step 2", 
                text: "Let sit and then peel eggs and crushed. Mix the mayo and eggs. Add salt and pepper to taste.",
                timer: 0,
            }
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1", 
        name: "Emma's Mom's Soup",
        comments: [
            {
                text: "Amazing dish. No need to change anything",
            }
        ],
        description:"Easy to make soup. Brings back memories of home!",
        imageUrls:["https://i.imgur.com/njfZ76Z.jpg"],
        category:"soup", 
        tags: [
            "soup", "chicken", "potato", "slow-cook",
        ],
        ingredients: [
            {
                name: "chicken broth",
                details: " ",
                quantity: 40,
                units: "oz",  
            },
            {
                name: "cream of chicken soup",
                details: " ",
                quantity: 1,
                units: "can",
            },
            {
                name: "potatoes",
                details: "cubed, Yukon ",
                quantity: 6,
                units: "", 
            },
            {
                name: "cream cheese",
                details: " ",
                quantity: 1,
                units: "package",
            },
            {
                name: "bacon",
                details: "bits",
                quantity: 1,
                units: "to taste", 
            },
            {
                name: "black pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text: "Melt cream cheese in a pot.",
            },
            {
                title: "Step 2", 
                text: "Stir in cream of chicken, add broth, potatoes, bacon, pepper, and stir.",
            },
            {
                title: "Step 3",
                text: "Cover with lid and simmer for 3 hours or until potatoes are soft.",
                timer: 10800,
            }
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1", 
        name: "Sugar Cookie",
        comments: [
            {
                text: "These cookies are great! To reduce the amount of sugar, do 3/4 cup instead!",
            },
            {
                text:"Reducing sugar is perfect for those who prefer less sugar!", 
            }
        ],
        description:"The best cookies to enjoy anytime of the year!",
        imageUrls:["https://i.imgur.com/rrgSgF7.jpg"],
        category:"dessert", 
        tags: [
            "Aunt Betty's", "cookies", "sweets", "holiday", "treats"
        ],
        ingredients: [
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",  
            },
            {
                name: "brown sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "butter",
                details: " ",
                quantity: 2,
                units: "cup",
            },
            {
                name: "eggs",
                details: " ",
                quantity: 2,
                units: "",
            },
            {
                name: "vanilla extract",
                details: " ",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "flour",
                details: " ",
                quantity: 4,
                units: "cup",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "baking soda",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "cream of tartar",
                details: " ",
                quantity: 2,
                units: "tspn",
            }
        ],
        actions: [
            {
                title: "Prep", 
                text: "Preheat oven to 360F.",
                timer: 0,
            },
            {
                title: "Mix",
                text: "Cream butter, sugars. Beat in eggs and vanilla.",
                timer: 0,
            },
            {
                title: "Stir", 
                text: "Stir in dry ingredients. Coat in sugar.",
                timer: 0,
            },
            {
                title: "Bake", 
                text: "Bake for 10 minutes.",
                timer: 600,
            },
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1", 
        name: "Buttermilk Pancakes",
        comments: [
            {
                text: "This dish is barely enough for 2 people.  Double the amount next time!",
            },
            {
                text:" Doubling the amount will yield leftover. Maybe try adding fruits on top next time.", 
            }
        ],
        description:"A decadent weekend breakfast for when you want to treat yourself.",
        imageUrls:["https://i.imgur.com/zHcCB7k.jpg"],
        category:"entree", 
        tags: [
            "breakfast", "treat", "weekend", "pancake",
        ],
        ingredients: [
            {
                name: "flour",
                details: " ",
                quantity: 1,
                units: "cup",  
            },
            {
                name: "baking powder",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "baking soda",
                details: " ",
                quantity: .5,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: .25,
                units: "tspn",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1.5, 
                units: "tbspn",
            },
            {
                name: "eggs",
                details: "lightly beaten",
                quantity: 1,
                units: "",
            },
            {
                name: "buttermilk",
                details: " ",
                quantity: 1.5,
                units: "cup",
            },
            {
                name: "butter",
                details: "unsalted",
                quantity: 2,
                units: "tbspn",
            }
        ],
        actions: [
            {
                title:"Dry", 
                text: "Whisk flour, baking soda, baking powder, salt, sugar.",
                timer: 0,
            },
            {
                title: "Wet",
                text: "Add eggs, buttermilk, butter and whisk to combine. Batter should be lummpy.",
                timer: 0,
            },
            {
                title: "Fry",
                text: "Heat a lightly oiled frying pan over medium high heat. Pour the batter onto pan, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.",
                timer: 0,
            }
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1", 
        name: "Pork Ribs",
        comments: [
            {
                text: "This BBQ sauce is too spicy. Cut it with something pickled next time?",
            },
            {
                text:"This dish goes really well with pickled red onions!", 
            }
        ],
        description:"A versatile dish to be enjoyed with salad, on a sandwich, or with vegetables and potatoes or rice.",
        imageUrls:["https://i.imgur.com/fzfBdcT.jpg"],
        category:"entree", 
        tags: [
            "pork", "ribs", "BBQ", 
        ],
        ingredients: [
            {
                name: "smoky pork seasoning",
                details: " ",
                quantity: 1,
                units: "package",  
            },
            {
                name: "BBQ sauce",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pork ribs",
                details: " ",
                quantity: 1,
                units: "rack", 
            }
        ],
        actions: [
            {
                title:"Prep", 
                text:"Preheat oven to 250F.",
            },
            {
                title: "Rub",
                text: "Rub ribs with seasoning.",
            },
            {
                title: "Wrap",
                text:"Put wire rack on baking sheet. Wrap ribs in foil pack, meat side up on rack.",
            },
            {
                title: "Bake",
                text: "Bake for 2 hours.",
                timer: 7200,
            },
            {   title: "Unwrap/Bake",
                text: "Unwrap and bake for another 1-1.5 hours.",
                timer: 3600,
            },
            {
                title: "Baste",
                text: "Turn oven heat to 500F. Baste with sauce on both sides.",
                timer: 0,
            },
            {
                title: "Finish",
                text: "Bake for 10 minutes and let rest.",
                timer: 600,
            }
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1",
        name: "Tortellini Soup",
        comments: [
            {
                text: "I wonder if the recipe comes out okay without the sausuage?",
            },
            {
                text:"Yes, vegetarian works well with it!", 
            }
        ],
        description:"A cheese, meaty, Italian pasta dish that is sure to remind you of your trip to Italy!",
        imageUrls:["https://i.imgur.com/AJBIySd.jpg"],
        category:"entree", 
        tags: [
            "pasta", "italian", "sausage", "cheese",
        ],
        ingredients: [
            {
                name: "Italian sausage",
                details: "casing removed",
                quantity: 1,
                units: "lb",  
            },
            {
                name: "garlic",
                details: "minced",
                quantity: 3,
                units: "cloves",
            },
            {
                name: "onion",
                details: "diced",
                quantity: 1,
                units: "",
            },
            {
                name: "chicken stock",
                details: " ",
                quantity: 2,
                units: "cups",
            },
            {
                name: "tomato",
                details: "crushed",
                quantity: 28,
                units: "oz",
            },
            {
                name: "basil",
                details: "dried",
                quantity: .5,
                units: "tspn",
            },
            {
                name: "oregano",
                details: "dried",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "red pepper flakes",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "tortellini",
                details: "cheese",
                quantity: 9,
                units: "oz",
            },
            {
                name: "half and half",
                details: " ",
                quantity: .33,
                units: "cup",
            },
            {
                name: "parmesan",
                details: "grated",
                quantity: 0.25,
                units: "cup",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text:"Heat olive oil in big pot and brown sausage. Crumble sausage as it cooks, remove excess fat. Add garlic and onion until brown.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Add stock, tomatoes, spices and 1 cup water. Season with salt and pepper.",
                timer: 0,
            },
            {
                title: "Step 3",
                text: "Bring to boil and stir in tortellini, reduce heat and simmer for 5-6 minutes.",
                timer: 300,
            },
            {
                title: "Step 4",
                text: "Add cream and parmesan.  Simmer for 4 minutes.",
                timer: 240,
            }
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1", 
        name: "Peach Cobbler",
        comments: [
            {
                text: "Yummy! But a little extra sugar might go best with this dish, especially if there is no ice cream!",
            },
            {
                text:"Adding 1/2 cup sugar for the recipe is great, if you're eating with coffee only!", 
            }
        ],
        description:"A summer delight, pairs perfectly with ice cream!",
        imageUrls:["https://i.imgur.com/hQuHlwu.jpg"],
        category:"dessert", 
        tags: [
            "peach", "dessert", "treat",
        ],
        ingredients: [
            {
                name: "butter",
                details: "melted",
                quantity: 0.5,
                units: "cup",  
            },
            {
                name: "flour",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "baking powder",
                details: " ",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "milk",
                details: "room temp",
                quantity: 0.66,
                units: "cup",
            },
            {
                name: "egg, room",
                details: "room temp",
                quantity: 1,
                units: "", 
            },
            {
                name: "peaches",
                details: "sliced",
                quantity: 28,
                units: "oz",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "cinnamon",
                details: "ground",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "nutmeg",
                details: "ground",
                quantity: 0.5,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Prep", 
                text: "Preheat oven to 350F.",
                timer: 0,
            },
            {
                title: "Melt",
                text: "Melt butter in pan.",
                timer: 0,
            },
            {
                title: "Mix",
                text: "Mix dry ingredients. Stir in milk and egg. Pour over melted butter.",
                timer: 0,
            },
            {
                title: "Combine",
                text: "Combine filling and spread over batter - don't stir.",
                timer: 0,
            },
            {
                title: "Bake",
                text: "Bake for 35-45 minutes.",
                timer: 2100,
            },
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1", 
        name: "Homemade Italian Turkey Sausage",
        comments: [
            {
                text: "I wonder if onions would make this sausage more moist?",
            },
            {
                text:"Nope. Onions didn't do much! Skip the onion.", 
            }
        ],
        description:"Easy homemade suasage that you can customize with any type of meats.",
        imageUrls:["https://i.imgur.com/I1fKNn0.jpg"],
        category:"entree", 
        tags: [
            "Italian", "sausage",
        ],
        ingredients: [
            {
                name: "oregano",
                details: "dried",
                quantity: 1,
                units: "tspn",  
            },
            {
                name: "fennel seed",
                details: "crushed",
                quantity: 1.5,
                units: "tspn",
            },
            {
                name: "garlic",
                details: "powder",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "turkey",
                details: "lean ground",
                quantity: 1,
                units: "lb",
            },
            {
                name: "black pepper",
                details: " ",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1.5,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "In a bowl, combine the turkey, garlic powder, fennel seed, sugar, salt, oregano and pepper.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Cover and refrigerate for at least 8 hours or overnight.",
                timer: 28800,
            },
            {
                title: "Step 3",
                text: "Shape into eight patties.",
                timer: 0,
            },
            {
                title: "Step 4",
                text:  "Coat nonstick pan with cooking spray and cook for 3 minutes on each side or until meat thermometer reads 165F.",
                timer: 180,
            },
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1", 
        name: "Country Potato Pancake",
        comments: [
            {
                text: "Had some sour cream and smoked salmon lying around.  Definitely a great addition!",
            }
        ],
        description:"A great savory pancake dish that you can swap in for a change of scene.",
        imageUrls:["https://i.imgur.com/UNTyMxi.jpg"],
        category:"entree", 
        tags: [
            "pancake", "potato", "breakfast", "savory",
        ],
        ingredients: [
            {
                name: "baking powder",
                details: " ",
                quantity: 1,
                units: "tspn",  
            },
            {
                name: "eggs",
                details: "lightly beaten ",
                quantity: 2,
                units: "",
            },
            {
                name: "flour",
                details: "all-purpose", 
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "onion",
                details: "grated", 
                quantity: 1,
                units: "tbspn",
            },
            {
                name: "potatoes",
                details: "large, peeled",
                quantity: 3,
                units: "",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "vegetable oil",
                details: " ",
                quantity: 1,
                units: "tspn"
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Finely grate potatoes. Drain any liquid. Add eggs, onion, flour, salt and baking powder.",
                timer: 0,
            },
            {
                title: "Step 2",
                text:"In a frying pan, add oil to the depth of 1/8 in. Heat over medium-high (375F).",
                timer: 0,
            },
            {
                title: "Step 3",
                text: "Drop batter by heaping tablespoonfuls in hot oil. Flatten to form patties.",
                timer: 0,
            },
            {
                title: "Step 4",
                text:  "Fry until golden brown then turn and cook the other side.",
                timer: 0,
            },
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1",
        name: "Chicken Tacos - the Tahiti Way",
        comments: [
            {
                text: "Lacking text, maybe try pickled red onion and shredded cabbage next time!",
            },
            {
                text:"Yes, texture definitely adds to this dish!", 
            }
        ],
        description:"This recipe is from my favorite taco truck on last trip to Portland.",
        imageUrls:["https://i.imgur.com/4ZyegVF.jpg"],
        category:"entree", 
        tags: [
            "tacos", "chicken", "Tahiti", "slow-cook",
        ],
        ingredients: [
            {
                name: "black pepper",
                details: " ",
                quantity: 0,
                units: "to taste",  
            },
            {
                name: "chicken breast",
                details: "boneless",
                quantity: 6,
                units: "",
            },
            {
                name: "cilantro",
                details: "chopped",
                quantity: 1,
                units: "tbspn",
            },
            {
                name: "tortillas",
                details: "corn",
                quantity: 10,
                units: "",
            },
            {
                name: "garlic",
                details: "diced",
                quantity: 2,
                units: "cloves",
            },
            {
                name: "onion",
                details: "large, sliced",
                quantity: 0.5,
                units: "",
            },
            {
                name: "pepperoncini pepper",
                details: " ",
                quantity: 16,
                units: "oz",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Combine everything including the ENTIRE jar of peppers, juice and all, but the tortillas into a slow cooker.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Cook on low 5 hours.",
                timer: 18000,
            },
            {
                title: "Step 3",
                text:  "Shred chicken with 2 forks. Mix well with everything in the pot.",
                timer: 0,
            },
            {
                title: "Step 4",
                text: "Heat tortillas till soft. Served the chicken on the tortilla. Enjoy!",
                timer: 0,
            }
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1", 
        name: "Tomato-Mint Quinoa Salad",
        comments: [
            {
                text: "It looks so pretty!",
            }
        ],
        description:"A delicious summer delight using fresh ingredients from the farmer's markets.",
        imageUrls:["https://i.imgur.com/Rk2iBIh.jpg"],
        category:"entree", 
        tags: [
            "salad", "tomato", "quinoa",
        ],
        ingredients: [
            {
                name: "water",
                details: " ",
                quantity: 2.5,
                units: "cups",  
            },
            {
                name: "quinoa",
                details: " ",
                quantity: 1.25,
                units: "cups",
            },
            {
                name: "raisins",
                details: " ",
                quantity: .75,
                units: "cups",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "pinch",
            },
            {
                name: "medium tomato",
                details: "diced",
                quantity: 2,
                units: "",
            },
            {
                name: "medium onion",
                details: "minced",
                quantity: 1,
                units: "",
            },
            {
                name: "radish",
                details: "quartered",
                quantity: 10,
                units: "",
            },
            {
                name: "cucumber",
                details: "diced",
                quantity: .5,
                units: "",
            },
            {
                name: "almonds",
                details: "sliced, toasted",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "parsley",
                details: "fresh, chopped",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "cumin",
                details: "ground",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "lime",
                details: "juice",
                quantity: .25,
                units: "cup",
            },
            {
                name: "sesame oil",
                details: " ",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: .25,
                units: "tspn to taste",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Bring water to boil in a small saucepan. Pour in quinoa, raisins, and a pinch of salt. Cover, and let simmer for 12 to 15 minutes, then remove from heat, and allow to cool to room temperature.",
                timer: 780,
            },
            {
                title: "Step 2",
                text: "Toss together the tomatoes, onion, radish, cucumber, and almonds in a large bowl. Stir in the cooled quinoa, then season with mint, parsley, cumin, lime juice, sesame oil, and salt. Chill 1 to 2 hours before serving.",
                timer: 3600,
            }
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1",
        name: "Mapo Tofu",
        comments: [
            {
                text: "This dish needs a little sauce! Maybe add 2-3 tablespoon of water?",
            },
            {
                text:"Yep, water helps and coats the rice better!", 
            }
        ],
        description:"A go-to staple for the days when when you don't have anything in the fridge except for tofu and green onions. Goes well with rice!",
        imageUrls:["https://i.imgur.com/FUVkBZm.jpg"],
        category:"entree", 
        tags: [
            "tofu", "vegetarian", "sichuan", "easy",
        ],
        ingredients: [
            {
                name: "tofu",
                details: "medium firm, cubed",
                quantity: 16,
                units: "oz",  
            },
            {
                name:  "mapo bean curd seasoning",
                details: "sichuan style",
                quantity: 1,
                units: "pack of 150gm",
            },
            {
                name: "green onion",
                details: "chopped",
                quantity: 2,
                units: "",
            },
            {
                name: "vegetable oil",
                details: " ",
                quantity: 1,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text: "Heat vegetable oil in medium heat pan. Add seasoning, tofu, and green onions to the pan.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Mix all ingredients and when throughly heated, served with rice.",
                timer: 0,
            }
        ]
    },
    {
        userID:"3X77tE00c9TQk8QqlGdc51IrfXu1",
        name: "Peach crostata",
        comments: [
            {
                text: "It came out delicious, next time, follow the direction to the T.",
            },
            {
                text:"Amazing! Goes well with ice cream!", 
            }
        ],
        description:"Free-form tarts (sometimes called crostatas) are an easy, quick-to-prepare way to use up seasonal fruit.",
        imageUrls:["https://i.imgur.com/dhHOHPm.jpg"],
        category:"dessert", 
        tags: [
            "peach", "crostata", "tart", "fruit", "summer", "pie"
        ],
        ingredients: [
            {
                name: "flour",
                details: "all-purpose",
                quantity: 1.5,
                units: "cups",  
            },
            {
                name:  "sugar",
                details: "granulated",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "salt",
                details: "",
                quantity: 0,
                units: "pinch",
            },
            {
                name: "butter",
                details: "cold unsalted,  cut into 1/2 inch",
                quantity: 6,
                units: "tbspn",
            },
            {
                name: "water",
                details: "ice",
                quantity: 1/4,
                units: "cup",
            },
            {
                name: "peaches",
                details: "halved, pitted and sliced 1/2 inch thick",
                quantity: 5,
                units: "",
            },
            {
                name: "brown sugar",
                details: "",
                quantity: 1/4,
                units: "cups",
            },
            {
                name: "vanilla extract",
                details: "",
                quantity: 1/2,
                units: "tspn",
            },
            {
                name: "cinnamon",
                details: "ground",
                quantity: 0,
                units: "pinch",
            },
            {
                name: "heavy cream",
                details: "",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "turbinado",
                details: "or other coarse sugar",
                quantity: 2,
                units: "tbspn",
            },
        ],
        actions: [
            {
                title:"Step 1",
                text: "In a food processor, pulse 1 1/2 cups of the flour with the granulated sugar and 1/2 teaspoon of salt until blended. Add the butter and pulse until it is the size of peas. Add the water and pulse until the dough is evenly moistened. Transfer the dough to a lightly floured work surface and pat it into a disk. Cover the disk with plastic wrap and refrigerate until chilled, about 30 minutes.",
                timer: 1800,
            },
            {
                title: "Step 2",
                text: "Preheat the oven to 425°. In a medium bowl, toss the peaches with the brown sugar, vanilla, cinnamon, a pinch of salt and the remaining 2 tablespoons of flour.",
                timer: 0,
            } ,
            {
                title: "Step 3",
                text: "On a lightly floured work surface, roll out the dough to a 12-inch round. Transfer the dough to a parchment-lined rimmed baking sheet. Mound the peaches with their juices in the center of the dough, leaving a 2-inch border all around. Fold the edge of the dough up and over the peaches. Refrigerate the tart until chilled, about 30 minutes.",
                timer: 1800,
            },
            {
                title: "Step 4",
                text: "Brush the dough with the cream and sprinkle with the turbinado sugar. Bake for about 50 minutes, until the crust is golden and the peaches are bubbling.",
                timer: 3600,
            },
            {
                title: "Step 4",
                text: "Let cool for 15 minutes before serving.",
                timer: 900,
            }
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2",
        name: "Chicken Adobo",
        comments: [
            {
                text: "This dish could benefit from a little more soy next time.",
            },
            {
                text:" It came out perfectly with soy addition! ", 
            }
        ],
        description:"This classic adobo recipe is simple to make and famous with all who have tasted it. It is delicious served over rice.",
        imageUrls:["https://i.imgur.com/fn2PqjZ.jpg"],
        category: "entree",  
        tags: [
            "chicken", "dinner", "easy",
        ],
        ingredients: [
            {
                name: "chicken thigh or drumsticks",
                details: " ",
                quantity: 2,
                units: "lb",
            },
            {
                name: "soy sauce",
                details: " ",
                quantity: 0.5,
                units: "cup",
            },
            {
                name: "apple cider vinegar",
                details: " ",
                quantity: .66,
                units: "cup",
            },
            {
                name: "garlic",
                details: " ",
                quantity: 2,
                units: "cloves",
            },
            {
                name: "bay leaves",
                details: " ",
                quantity: 2,
                units: "", 
            },
            {
                name: "onion",
                details: " ",
                quantity: 1,
                units: "",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title: "Step 1", 
                text: "Put all ingredients in a pot and cover. Bring pot to boil.",
                timer: 0, 
            },
            {
                title: "Step 2",  
                text: "Cover with lid and simmer for 40 minutes, turning have way through.",
                timer: 2400,
            }
        ]
    }, 
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2", 
        name: "Egg Salad Sandwich",
        comments: [
            {
                text:"Add an extra egg and .5 tbspn of mayo for extra calories.",
            },
            {
                text:"4 eggs is a bit much for 1 person to eat! Go back to 3 eggs.", 
            }
        ],
        description:"This sandwich is so easy to make, you'd wish you've made it earlier.",
        imageUrls:["https://i.imgur.com/akBLfNV.jpg"],
        category:"entree", 
        tags: [
            "egg", "lunch", "easy", "sandwich",
        ],
        ingredients: [
            {
                name: "eggs",
                quantity: 3,
                details: " ",
                units: "",  
            },
            {
                name: "mayo",
                quantity: 1,
                details: " ",
                units: "tbspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text:"Boil eggs for 7-9 minutes. Remove from stove, drain water and fill pan with cold water.",
                timer: 420,
            },
            {
                title: "Step 2", 
                text: "Let sit and then peel eggs and crushed. Mix the mayo and eggs. Add salt and pepper to taste.",
                timer: 0,
            }
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2", 
        name: "Emma's Mom's Soup",
        comments: [
            {
                text: "Amazing dish. No need to change anything",
            }
        ],
        description:"Easy to make soup. Brings back memories of home!",
        imageUrls:["https://i.imgur.com/njfZ76Z.jpg"],
        category:"soup", 
        tags: [
            "soup", "chicken", "potato", "slow-cook",
        ],
        ingredients: [
            {
                name: "chicken broth",
                details: " ",
                quantity: 40,
                units: "oz",  
            },
            {
                name: "cream of chicken soup",
                details: " ",
                quantity: 1,
                units: "can",
            },
            {
                name: "potatoes",
                details: "cubed, Yukon ",
                quantity: 6,
                units: "", 
            },
            {
                name: "cream cheese",
                details: " ",
                quantity: 1,
                units: "package",
            },
            {
                name: "bacon",
                details: "bits",
                quantity: 1,
                units: "to taste", 
            },
            {
                name: "black pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text: "Melt cream cheese in a pot.",
            },
            {
                title: "Step 2", 
                text: "Stir in cream of chicken, add broth, potatoes, bacon, pepper, and stir.",
            },
            {
                title: "Step 3",
                text: "Cover with lid and simmer for 3 hours or until potatoes are soft.",
                timer: 10800,
            }
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2", 
        name: "Sugar Cookie",
        comments: [
            {
                text: "These cookies are great! To reduce the amount of sugar, do 3/4 cup instead!",
            },
            {
                text:"Reducing sugar is perfect for those who prefer less sugar!", 
            }
        ],
        description:"The best cookies to enjoy anytime of the year!",
        imageUrls:["https://i.imgur.com/rrgSgF7.jpg"],
        category:"dessert", 
        tags: [
            "Aunt Betty's", "cookies", "sweets", "holiday", "treats"
        ],
        ingredients: [
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",  
            },
            {
                name: "brown sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "butter",
                details: " ",
                quantity: 2,
                units: "cup",
            },
            {
                name: "eggs",
                details: " ",
                quantity: 2,
                units: "",
            },
            {
                name: "vanilla extract",
                details: " ",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "flour",
                details: " ",
                quantity: 4,
                units: "cup",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "baking soda",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "cream of tartar",
                details: " ",
                quantity: 2,
                units: "tspn",
            }
        ],
        actions: [
            {
                title: "Prep", 
                text: "Preheat oven to 360F.",
                timer: 0,
            },
            {
                title: "Mix",
                text: "Cream butter, sugars. Beat in eggs and vanilla.",
                timer: 0,
            },
            {
                title: "Stir", 
                text: "Stir in dry ingredients. Coat in sugar.",
                timer: 0,
            },
            {
                title: "Bake", 
                text: "Bake for 10 minutes.",
                timer: 600,
            },
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2", 
        name: "Buttermilk Pancakes",
        comments: [
            {
                text: "This dish is barely enough for 2 people.  Double the amount next time!",
            },
            {
                text:" Doubling the amount will yield leftover. Maybe try adding fruits on top next time.", 
            }
        ],
        description:"A decadent weekend breakfast for when you want to treat yourself.",
        imageUrls:["https://i.imgur.com/zHcCB7k.jpg"],
        category:"entree", 
        tags: [
            "breakfast", "treat", "weekend", "pancake",
        ],
        ingredients: [
            {
                name: "flour",
                details: " ",
                quantity: 1,
                units: "cup",  
            },
            {
                name: "baking powder",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "baking soda",
                details: " ",
                quantity: .5,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: .25,
                units: "tspn",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1.5, 
                units: "tbspn",
            },
            {
                name: "eggs",
                details: "lightly beaten",
                quantity: 1,
                units: "",
            },
            {
                name: "buttermilk",
                details: " ",
                quantity: 1.5,
                units: "cup",
            },
            {
                name: "butter",
                details: "unsalted",
                quantity: 2,
                units: "tbspn",
            }
        ],
        actions: [
            {
                title:"Dry", 
                text: "Whisk flour, baking soda, baking powder, salt, sugar.",
                timer: 0,
            },
            {
                title: "Wet",
                text: "Add eggs, buttermilk, butter and whisk to combine. Batter should be lummpy.",
                timer: 0,
            },
            {
                title: "Fry",
                text: "Heat a lightly oiled frying pan over medium high heat. Pour the batter onto pan, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.",
                timer: 0,
            }
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2", 
        name: "Pork Ribs",
        comments: [
            {
                text: "This BBQ sauce is too spicy. Cut it with something pickled next time?",
            },
            {
                text:"This dish goes really well with pickled red onions!", 
            }
        ],
        description:"A versatile dish to be enjoyed with salad, on a sandwich, or with vegetables and potatoes or rice.",
        imageUrls:["https://i.imgur.com/fzfBdcT.jpg"],
        category:"entree", 
        tags: [
            "pork", "ribs", "BBQ", 
        ],
        ingredients: [
            {
                name: "smoky pork seasoning",
                details: " ",
                quantity: 1,
                units: "package",  
            },
            {
                name: "BBQ sauce",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pork ribs",
                details: " ",
                quantity: 1,
                units: "rack", 
            }
        ],
        actions: [
            {
                title:"Prep", 
                text:"Preheat oven to 250F.",
            },
            {
                title: "Rub",
                text: "Rub ribs with seasoning.",
            },
            {
                title: "Wrap",
                text:"Put wire rack on baking sheet. Wrap ribs in foil pack, meat side up on rack.",
            },
            {
                title: "Bake",
                text: "Bake for 2 hours.",
                timer: 7200,
            },
            {   title: "Unwrap/Bake",
                text: "Unwrap and bake for another 1-1.5 hours.",
                timer: 3600,
            },
            {
                title: "Baste",
                text: "Turn oven heat to 500F. Baste with sauce on both sides.",
                timer: 0,
            },
            {
                title: "Finish",
                text: "Bake for 10 minutes and let rest.",
                timer: 600,
            }
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2",
        name: "Tortellini Soup",
        comments: [
            {
                text: "I wonder if the recipe comes out okay without the sausuage?",
            },
            {
                text:"Yes, vegetarian works well with it!", 
            }
        ],
        description:"A cheese, meaty, Italian pasta dish that is sure to remind you of your trip to Italy!",
        imageUrls:["https://i.imgur.com/AJBIySd.jpg"],
        category:"entree", 
        tags: [
            "pasta", "italian", "sausage", "cheese",
        ],
        ingredients: [
            {
                name: "Italian sausage",
                details: "casing removed",
                quantity: 1,
                units: "lb",  
            },
            {
                name: "garlic",
                details: "minced",
                quantity: 3,
                units: "cloves",
            },
            {
                name: "onion",
                details: "diced",
                quantity: 1,
                units: "",
            },
            {
                name: "chicken stock",
                details: " ",
                quantity: 2,
                units: "cups",
            },
            {
                name: "tomato",
                details: "crushed",
                quantity: 28,
                units: "oz",
            },
            {
                name: "basil",
                details: "dried",
                quantity: .5,
                units: "tspn",
            },
            {
                name: "oregano",
                details: "dried",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "red pepper flakes",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "tortellini",
                details: "cheese",
                quantity: 9,
                units: "oz",
            },
            {
                name: "half and half",
                details: " ",
                quantity: .33,
                units: "cup",
            },
            {
                name: "parmesan",
                details: "grated",
                quantity: 0.25,
                units: "cup",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text:"Heat olive oil in big pot and brown sausage. Crumble sausage as it cooks, remove excess fat. Add garlic and onion until brown.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Add stock, tomatoes, spices and 1 cup water. Season with salt and pepper.",
                timer: 0,
            },
            {
                title: "Step 3",
                text: "Bring to boil and stir in tortellini, reduce heat and simmer for 5-6 minutes.",
                timer: 300,
            },
            {
                title: "Step 4",
                text: "Add cream and parmesan.  Simmer for 4 minutes.",
                timer: 240,
            }
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2", 
        name: "Peach Cobbler",
        comments: [
            {
                text: "Yummy! But a little extra sugar might go best with this dish, especially if there is no ice cream!",
            },
            {
                text:"Adding 1/2 cup sugar for the recipe is great, if you're eating with coffee only!", 
            }
        ],
        description:"A summer delight, pairs perfectly with ice cream!",
        imageUrls:["https://i.imgur.com/hQuHlwu.jpg"],
        category:"dessert", 
        tags: [
            "peach", "dessert", "treat",
        ],
        ingredients: [
            {
                name: "butter",
                details: "melted",
                quantity: 0.5,
                units: "cup",  
            },
            {
                name: "flour",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "baking powder",
                details: " ",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "milk",
                details: "room temp",
                quantity: 0.66,
                units: "cup",
            },
            {
                name: "egg, room",
                details: "room temp",
                quantity: 1,
                units: "", 
            },
            {
                name: "peaches",
                details: "sliced",
                quantity: 28,
                units: "oz",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "cinnamon",
                details: "ground",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "nutmeg",
                details: "ground",
                quantity: 0.5,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Prep", 
                text: "Preheat oven to 350F.",
                timer: 0,
            },
            {
                title: "Melt",
                text: "Melt butter in pan.",
                timer: 0,
            },
            {
                title: "Mix",
                text: "Mix dry ingredients. Stir in milk and egg. Pour over melted butter.",
                timer: 0,
            },
            {
                title: "Combine",
                text: "Combine filling and spread over batter - don't stir.",
                timer: 0,
            },
            {
                title: "Bake",
                text: "Bake for 35-45 minutes.",
                timer: 2100,
            },
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2", 
        name: "Homemade Italian Turkey Sausage",
        comments: [
            {
                text: "I wonder if onions would make this sausage more moist?",
            },
            {
                text:"Nope. Onions didn't do much! Skip the onion.", 
            }
        ],
        description:"Easy homemade suasage that you can customize with any type of meats.",
        imageUrls:["https://i.imgur.com/I1fKNn0.jpg"],
        category:"entree", 
        tags: [
            "Italian", "sausage",
        ],
        ingredients: [
            {
                name: "oregano",
                details: "dried",
                quantity: 1,
                units: "tspn",  
            },
            {
                name: "fennel seed",
                details: "crushed",
                quantity: 1.5,
                units: "tspn",
            },
            {
                name: "garlic",
                details: "powder",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "turkey",
                details: "lean ground",
                quantity: 1,
                units: "lb",
            },
            {
                name: "black pepper",
                details: " ",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1.5,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "In a bowl, combine the turkey, garlic powder, fennel seed, sugar, salt, oregano and pepper.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Cover and refrigerate for at least 8 hours or overnight.",
                timer: 28800,
            },
            {
                title: "Step 3",
                text: "Shape into eight patties.",
                timer: 0,
            },
            {
                title: "Step 4",
                text:  "Coat nonstick pan with cooking spray and cook for 3 minutes on each side or until meat thermometer reads 165F.",
                timer: 180,
            },
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2", 
        name: "Country Potato Pancake",
        comments: [
            {
                text: "Had some sour cream and smoked salmon lying around.  Definitely a great addition!",
            }
        ],
        description:"A great savory pancake dish that you can swap in for a change of scene.",
        imageUrls:["https://i.imgur.com/UNTyMxi.jpg"],
        category:"entree", 
        tags: [
            "pancake", "potato", "breakfast", "savory",
        ],
        ingredients: [
            {
                name: "baking powder",
                details: " ",
                quantity: 1,
                units: "tspn",  
            },
            {
                name: "eggs",
                details: "lightly beaten ",
                quantity: 2,
                units: "",
            },
            {
                name: "flour",
                details: "all-purpose", 
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "onion",
                details: "grated", 
                quantity: 1,
                units: "tbspn",
            },
            {
                name: "potatoes",
                details: "large, peeled",
                quantity: 3,
                units: "",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "vegetable oil",
                details: " ",
                quantity: 1,
                units: "tspn"
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Finely grate potatoes. Drain any liquid. Add eggs, onion, flour, salt and baking powder.",
                timer: 0,
            },
            {
                title: "Step 2",
                text:"In a frying pan, add oil to the depth of 1/8 in. Heat over medium-high (375F).",
                timer: 0,
            },
            {
                title: "Step 3",
                text: "Drop batter by heaping tablespoonfuls in hot oil. Flatten to form patties.",
                timer: 0,
            },
            {
                title: "Step 4",
                text:  "Fry until golden brown then turn and cook the other side.",
                timer: 0,
            },
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2",
        name: "Chicken Tacos - the Tahiti Way",
        comments: [
            {
                text: "Lacking text, maybe try pickled red onion and shredded cabbage next time!",
            },
            {
                text:"Yes, texture definitely adds to this dish!", 
            }
        ],
        description:"This recipe is from my favorite taco truck on last trip to Portland.",
        imageUrls:["https://i.imgur.com/4ZyegVF.jpg"],
        category:"entree", 
        tags: [
            "tacos", "chicken", "Tahiti", "slow-cook",
        ],
        ingredients: [
            {
                name: "black pepper",
                details: " ",
                quantity: 0,
                units: "to taste",  
            },
            {
                name: "chicken breast",
                details: "boneless",
                quantity: 6,
                units: "",
            },
            {
                name: "cilantro",
                details: "chopped",
                quantity: 1,
                units: "tbspn",
            },
            {
                name: "tortillas",
                details: "corn",
                quantity: 10,
                units: "",
            },
            {
                name: "garlic",
                details: "diced",
                quantity: 2,
                units: "cloves",
            },
            {
                name: "onion",
                details: "large, sliced",
                quantity: 0.5,
                units: "",
            },
            {
                name: "pepperoncini pepper",
                details: " ",
                quantity: 16,
                units: "oz",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Combine everything including the ENTIRE jar of peppers, juice and all, but the tortillas into a slow cooker.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Cook on low 5 hours.",
                timer: 18000,
            },
            {
                title: "Step 3",
                text:  "Shred chicken with 2 forks. Mix well with everything in the pot.",
                timer: 0,
            },
            {
                title: "Step 4",
                text: "Heat tortillas till soft. Served the chicken on the tortilla. Enjoy!",
                timer: 0,
            }
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2", 
        name: "Tomato-Mint Quinoa Salad",
        comments: [
            {
                text: "It looks so pretty!",
            }
        ],
        description:"A delicious summer delight using fresh ingredients from the farmer's markets.",
        imageUrls:["https://i.imgur.com/Rk2iBIh.jpg"],
        category:"entree", 
        tags: [
            "salad", "tomato", "quinoa",
        ],
        ingredients: [
            {
                name: "water",
                details: " ",
                quantity: 2.5,
                units: "cups",  
            },
            {
                name: "quinoa",
                details: " ",
                quantity: 1.25,
                units: "cups",
            },
            {
                name: "raisins",
                details: " ",
                quantity: .75,
                units: "cups",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "pinch",
            },
            {
                name: "medium tomato",
                details: "diced",
                quantity: 2,
                units: "",
            },
            {
                name: "medium onion",
                details: "minced",
                quantity: 1,
                units: "",
            },
            {
                name: "radish",
                details: "quartered",
                quantity: 10,
                units: "",
            },
            {
                name: "cucumber",
                details: "diced",
                quantity: .5,
                units: "",
            },
            {
                name: "almonds",
                details: "sliced, toasted",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "parsley",
                details: "fresh, chopped",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "cumin",
                details: "ground",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "lime",
                details: "juice",
                quantity: .25,
                units: "cup",
            },
            {
                name: "sesame oil",
                details: " ",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: .25,
                units: "tspn to taste",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Bring water to boil in a small saucepan. Pour in quinoa, raisins, and a pinch of salt. Cover, and let simmer for 12 to 15 minutes, then remove from heat, and allow to cool to room temperature.",
                timer: 780,
            },
            {
                title: "Step 2",
                text: "Toss together the tomatoes, onion, radish, cucumber, and almonds in a large bowl. Stir in the cooled quinoa, then season with mint, parsley, cumin, lime juice, sesame oil, and salt. Chill 1 to 2 hours before serving.",
                timer: 3600,
            }
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2",
        name: "Mapo Tofu",
        comments: [
            {
                text: "This dish needs a little sauce! Maybe add 2-3 tablespoon of water?",
            },
            {
                text:"Yep, water helps and coats the rice better!", 
            }
        ],
        description:"A go-to staple for the days when when you don't have anything in the fridge except for tofu and green onions. Goes well with rice!",
        imageUrls:["https://i.imgur.com/FUVkBZm.jpg"],
        category:"entree", 
        tags: [
            "tofu", "vegetarian", "sichuan", "easy",
        ],
        ingredients: [
            {
                name: "tofu",
                details: "medium firm, cubed",
                quantity: 16,
                units: "oz",  
            },
            {
                name:  "mapo bean curd seasoning",
                details: "sichuan style",
                quantity: 1,
                units: "pack of 150gm",
            },
            {
                name: "green onion",
                details: "chopped",
                quantity: 2,
                units: "",
            },
            {
                name: "vegetable oil",
                details: " ",
                quantity: 1,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text: "Heat vegetable oil in medium heat pan. Add seasoning, tofu, and green onions to the pan.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Mix all ingredients and when throughly heated, served with rice.",
                timer: 0,
            }
        ]
    },
    {
        userID:"4PMB8SDfq9T2Z5iqMhKQeQOIGZW2",
        name: "Peach crostata",
        comments: [
            {
                text: "It came out delicious, next time, follow the direction to the T.",
            },
            {
                text:"Amazing! Goes well with ice cream!", 
            }
        ],
        description:"Free-form tarts (sometimes called crostatas) are an easy, quick-to-prepare way to use up seasonal fruit.",
        imageUrls:["https://i.imgur.com/dhHOHPm.jpg"],
        category:"dessert", 
        tags: [
            "peach", "crostata", "tart", "fruit", "summer", "pie"
        ],
        ingredients: [
            {
                name: "flour",
                details: "all-purpose",
                quantity: 1.5,
                units: "cups",  
            },
            {
                name:  "sugar",
                details: "granulated",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "salt",
                details: "",
                quantity: 0,
                units: "pinch",
            },
            {
                name: "butter",
                details: "cold unsalted,  cut into 1/2 inch",
                quantity: 6,
                units: "tbspn",
            },
            {
                name: "water",
                details: "ice",
                quantity: 1/4,
                units: "cup",
            },
            {
                name: "peaches",
                details: "halved, pitted and sliced 1/2 inch thick",
                quantity: 5,
                units: "",
            },
            {
                name: "brown sugar",
                details: "",
                quantity: 1/4,
                units: "cups",
            },
            {
                name: "vanilla extract",
                details: "",
                quantity: 1/2,
                units: "tspn",
            },
            {
                name: "cinnamon",
                details: "ground",
                quantity: 0,
                units: "pinch",
            },
            {
                name: "heavy cream",
                details: "",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "turbinado",
                details: "or other coarse sugar",
                quantity: 2,
                units: "tbspn",
            },
        ],
        actions: [
            {
                title:"Step 1",
                text: "In a food processor, pulse 1 1/2 cups of the flour with the granulated sugar and 1/2 teaspoon of salt until blended. Add the butter and pulse until it is the size of peas. Add the water and pulse until the dough is evenly moistened. Transfer the dough to a lightly floured work surface and pat it into a disk. Cover the disk with plastic wrap and refrigerate until chilled, about 30 minutes.",
                timer: 1800,
            },
            {
                title: "Step 2",
                text: "Preheat the oven to 425°. In a medium bowl, toss the peaches with the brown sugar, vanilla, cinnamon, a pinch of salt and the remaining 2 tablespoons of flour.",
                timer: 0,
            } ,
            {
                title: "Step 3",
                text: "On a lightly floured work surface, roll out the dough to a 12-inch round. Transfer the dough to a parchment-lined rimmed baking sheet. Mound the peaches with their juices in the center of the dough, leaving a 2-inch border all around. Fold the edge of the dough up and over the peaches. Refrigerate the tart until chilled, about 30 minutes.",
                timer: 1800,
            },
            {
                title: "Step 4",
                text: "Brush the dough with the cream and sprinkle with the turbinado sugar. Bake for about 50 minutes, until the crust is golden and the peaches are bubbling.",
                timer: 3600,
            },
            {
                title: "Step 4",
                text: "Let cool for 15 minutes before serving.",
                timer: 900,
            }
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2",
        name: "Chicken Adobo",
        comments: [
            {
                text: "This dish could benefit from a little more soy next time.",
            },
            {
                text:" It came out perfectly with soy addition! ", 
            }
        ],
        description:"This classic adobo recipe is simple to make and famous with all who have tasted it. It is delicious served over rice.",
        imageUrls:["https://i.imgur.com/fn2PqjZ.jpg"],
        category: "entree",  
        tags: [
            "chicken", "dinner", "easy",
        ],
        ingredients: [
            {
                name: "chicken thigh or drumsticks",
                details: " ",
                quantity: 2,
                units: "lb",
            },
            {
                name: "soy sauce",
                details: " ",
                quantity: 0.5,
                units: "cup",
            },
            {
                name: "apple cider vinegar",
                details: " ",
                quantity: .66,
                units: "cup",
            },
            {
                name: "garlic",
                details: " ",
                quantity: 2,
                units: "cloves",
            },
            {
                name: "bay leaves",
                details: " ",
                quantity: 2,
                units: "", 
            },
            {
                name: "onion",
                details: " ",
                quantity: 1,
                units: "",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title: "Step 1", 
                text: "Put all ingredients in a pot and cover. Bring pot to boil.",
                timer: 0, 
            },
            {
                title: "Step 2",  
                text: "Cover with lid and simmer for 40 minutes, turning have way through.",
                timer: 2400,
            }
        ]
    }, 
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2", 
        name: "Egg Salad Sandwich",
        comments: [
            {
                text:"Add an extra egg and .5 tbspn of mayo for extra calories.",
            },
            {
                text:"4 eggs is a bit much for 1 person to eat! Go back to 3 eggs.", 
            }
        ],
        description:"This sandwich is so easy to make, you'd wish you've made it earlier.",
        imageUrls:["https://i.imgur.com/akBLfNV.jpg"],
        category:"entree", 
        tags: [
            "egg", "lunch", "easy", "sandwich",
        ],
        ingredients: [
            {
                name: "eggs",
                quantity: 3,
                details: " ",
                units: "",  
            },
            {
                name: "mayo",
                quantity: 1,
                details: " ",
                units: "tbspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text:"Boil eggs for 7-9 minutes. Remove from stove, drain water and fill pan with cold water.",
                timer: 420,
            },
            {
                title: "Step 2", 
                text: "Let sit and then peel eggs and crushed. Mix the mayo and eggs. Add salt and pepper to taste.",
                timer: 0,
            }
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2", 
        name: "Emma's Mom's Soup",
        comments: [
            {
                text: "Amazing dish. No need to change anything",
            }
        ],
        description:"Easy to make soup. Brings back memories of home!",
        imageUrls:["https://i.imgur.com/njfZ76Z.jpg"],
        category:"soup", 
        tags: [
            "soup", "chicken", "potato", "slow-cook",
        ],
        ingredients: [
            {
                name: "chicken broth",
                details: " ",
                quantity: 40,
                units: "oz",  
            },
            {
                name: "cream of chicken soup",
                details: " ",
                quantity: 1,
                units: "can",
            },
            {
                name: "potatoes",
                details: "cubed, Yukon ",
                quantity: 6,
                units: "", 
            },
            {
                name: "cream cheese",
                details: " ",
                quantity: 1,
                units: "package",
            },
            {
                name: "bacon",
                details: "bits",
                quantity: 1,
                units: "to taste", 
            },
            {
                name: "black pepper",
                details: " ",
                quantity: 0,
                units: "to taste",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text: "Melt cream cheese in a pot.",
            },
            {
                title: "Step 2", 
                text: "Stir in cream of chicken, add broth, potatoes, bacon, pepper, and stir.",
            },
            {
                title: "Step 3",
                text: "Cover with lid and simmer for 3 hours or until potatoes are soft.",
                timer: 10800,
            }
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2", 
        name: "Sugar Cookie",
        comments: [
            {
                text: "These cookies are great! To reduce the amount of sugar, do 3/4 cup instead!",
            },
            {
                text:"Reducing sugar is perfect for those who prefer less sugar!", 
            }
        ],
        description:"The best cookies to enjoy anytime of the year!",
        imageUrls:["https://i.imgur.com/rrgSgF7.jpg"],
        category:"dessert", 
        tags: [
            "Aunt Betty's", "cookies", "sweets", "holiday", "treats"
        ],
        ingredients: [
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",  
            },
            {
                name: "brown sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "butter",
                details: " ",
                quantity: 2,
                units: "cup",
            },
            {
                name: "eggs",
                details: " ",
                quantity: 2,
                units: "",
            },
            {
                name: "vanilla extract",
                details: " ",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "flour",
                details: " ",
                quantity: 4,
                units: "cup",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "baking soda",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "cream of tartar",
                details: " ",
                quantity: 2,
                units: "tspn",
            }
        ],
        actions: [
            {
                title: "Prep", 
                text: "Preheat oven to 360F.",
                timer: 0,
            },
            {
                title: "Mix",
                text: "Cream butter, sugars. Beat in eggs and vanilla.",
                timer: 0,
            },
            {
                title: "Stir", 
                text: "Stir in dry ingredients. Coat in sugar.",
                timer: 0,
            },
            {
                title: "Bake", 
                text: "Bake for 10 minutes.",
                timer: 600,
            },
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2", 
        name: "Buttermilk Pancakes",
        comments: [
            {
                text: "This dish is barely enough for 2 people.  Double the amount next time!",
            },
            {
                text:" Doubling the amount will yield leftover. Maybe try adding fruits on top next time.", 
            }
        ],
        description:"A decadent weekend breakfast for when you want to treat yourself.",
        imageUrls:["https://i.imgur.com/zHcCB7k.jpg"],
        category:"entree", 
        tags: [
            "breakfast", "treat", "weekend", "pancake",
        ],
        ingredients: [
            {
                name: "flour",
                details: " ",
                quantity: 1,
                units: "cup",  
            },
            {
                name: "baking powder",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "baking soda",
                details: " ",
                quantity: .5,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: .25,
                units: "tspn",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1.5, 
                units: "tbspn",
            },
            {
                name: "eggs",
                details: "lightly beaten",
                quantity: 1,
                units: "",
            },
            {
                name: "buttermilk",
                details: " ",
                quantity: 1.5,
                units: "cup",
            },
            {
                name: "butter",
                details: "unsalted",
                quantity: 2,
                units: "tbspn",
            }
        ],
        actions: [
            {
                title:"Dry", 
                text: "Whisk flour, baking soda, baking powder, salt, sugar.",
                timer: 0,
            },
            {
                title: "Wet",
                text: "Add eggs, buttermilk, butter and whisk to combine. Batter should be lummpy.",
                timer: 0,
            },
            {
                title: "Fry",
                text: "Heat a lightly oiled frying pan over medium high heat. Pour the batter onto pan, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.",
                timer: 0,
            }
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2", 
        name: "Pork Ribs",
        comments: [
            {
                text: "This BBQ sauce is too spicy. Cut it with something pickled next time?",
            },
            {
                text:"This dish goes really well with pickled red onions!", 
            }
        ],
        description:"A versatile dish to be enjoyed with salad, on a sandwich, or with vegetables and potatoes or rice.",
        imageUrls:["https://i.imgur.com/fzfBdcT.jpg"],
        category:"entree", 
        tags: [
            "pork", "ribs", "BBQ", 
        ],
        ingredients: [
            {
                name: "smoky pork seasoning",
                details: " ",
                quantity: 1,
                units: "package",  
            },
            {
                name: "BBQ sauce",
                details: " ",
                quantity: 0,
                units: "to taste",
            },
            {
                name: "pork ribs",
                details: " ",
                quantity: 1,
                units: "rack", 
            }
        ],
        actions: [
            {
                title:"Prep", 
                text:"Preheat oven to 250F.",
            },
            {
                title: "Rub",
                text: "Rub ribs with seasoning.",
            },
            {
                title: "Wrap",
                text:"Put wire rack on baking sheet. Wrap ribs in foil pack, meat side up on rack.",
            },
            {
                title: "Bake",
                text: "Bake for 2 hours.",
                timer: 7200,
            },
            {   title: "Unwrap/Bake",
                text: "Unwrap and bake for another 1-1.5 hours.",
                timer: 3600,
            },
            {
                title: "Baste",
                text: "Turn oven heat to 500F. Baste with sauce on both sides.",
                timer: 0,
            },
            {
                title: "Finish",
                text: "Bake for 10 minutes and let rest.",
                timer: 600,
            }
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2",
        name: "Tortellini Soup",
        comments: [
            {
                text: "I wonder if the recipe comes out okay without the sausuage?",
            },
            {
                text:"Yes, vegetarian works well with it!", 
            }
        ],
        description:"A cheese, meaty, Italian pasta dish that is sure to remind you of your trip to Italy!",
        imageUrls:["https://i.imgur.com/AJBIySd.jpg"],
        category:"entree", 
        tags: [
            "pasta", "italian", "sausage", "cheese",
        ],
        ingredients: [
            {
                name: "Italian sausage",
                details: "casing removed",
                quantity: 1,
                units: "lb",  
            },
            {
                name: "garlic",
                details: "minced",
                quantity: 3,
                units: "cloves",
            },
            {
                name: "onion",
                details: "diced",
                quantity: 1,
                units: "",
            },
            {
                name: "chicken stock",
                details: " ",
                quantity: 2,
                units: "cups",
            },
            {
                name: "tomato",
                details: "crushed",
                quantity: 28,
                units: "oz",
            },
            {
                name: "basil",
                details: "dried",
                quantity: .5,
                units: "tspn",
            },
            {
                name: "oregano",
                details: "dried",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "red pepper flakes",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "tortellini",
                details: "cheese",
                quantity: 9,
                units: "oz",
            },
            {
                name: "half and half",
                details: " ",
                quantity: .33,
                units: "cup",
            },
            {
                name: "parmesan",
                details: "grated",
                quantity: 0.25,
                units: "cup",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text:"Heat olive oil in big pot and brown sausage. Crumble sausage as it cooks, remove excess fat. Add garlic and onion until brown.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Add stock, tomatoes, spices and 1 cup water. Season with salt and pepper.",
                timer: 0,
            },
            {
                title: "Step 3",
                text: "Bring to boil and stir in tortellini, reduce heat and simmer for 5-6 minutes.",
                timer: 300,
            },
            {
                title: "Step 4",
                text: "Add cream and parmesan.  Simmer for 4 minutes.",
                timer: 240,
            }
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2", 
        name: "Peach Cobbler",
        comments: [
            {
                text: "Yummy! But a little extra sugar might go best with this dish, especially if there is no ice cream!",
            },
            {
                text:"Adding 1/2 cup sugar for the recipe is great, if you're eating with coffee only!", 
            }
        ],
        description:"A summer delight, pairs perfectly with ice cream!",
        imageUrls:["https://i.imgur.com/hQuHlwu.jpg"],
        category:"dessert", 
        tags: [
            "peach", "dessert", "treat",
        ],
        ingredients: [
            {
                name: "butter",
                details: "melted",
                quantity: 0.5,
                units: "cup",  
            },
            {
                name: "flour",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "baking powder",
                details: " ",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "milk",
                details: "room temp",
                quantity: 0.66,
                units: "cup",
            },
            {
                name: "egg, room",
                details: "room temp",
                quantity: 1,
                units: "", 
            },
            {
                name: "peaches",
                details: "sliced",
                quantity: 28,
                units: "oz",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1,
                units: "cup",
            },
            {
                name: "cinnamon",
                details: "ground",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "nutmeg",
                details: "ground",
                quantity: 0.5,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Prep", 
                text: "Preheat oven to 350F.",
                timer: 0,
            },
            {
                title: "Melt",
                text: "Melt butter in pan.",
                timer: 0,
            },
            {
                title: "Mix",
                text: "Mix dry ingredients. Stir in milk and egg. Pour over melted butter.",
                timer: 0,
            },
            {
                title: "Combine",
                text: "Combine filling and spread over batter - don't stir.",
                timer: 0,
            },
            {
                title: "Bake",
                text: "Bake for 35-45 minutes.",
                timer: 2100,
            },
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2", 
        name: "Homemade Italian Turkey Sausage",
        comments: [
            {
                text: "I wonder if onions would make this sausage more moist?",
            },
            {
                text:"Nope. Onions didn't do much! Skip the onion.", 
            }
        ],
        description:"Easy homemade suasage that you can customize with any type of meats.",
        imageUrls:["https://i.imgur.com/I1fKNn0.jpg"],
        category:"entree", 
        tags: [
            "Italian", "sausage",
        ],
        ingredients: [
            {
                name: "oregano",
                details: "dried",
                quantity: 1,
                units: "tspn",  
            },
            {
                name: "fennel seed",
                details: "crushed",
                quantity: 1.5,
                units: "tspn",
            },
            {
                name: "garlic",
                details: "powder",
                quantity: 2,
                units: "tspn",
            },
            {
                name: "turkey",
                details: "lean ground",
                quantity: 1,
                units: "lb",
            },
            {
                name: "black pepper",
                details: " ",
                quantity: 0.5,
                units: "tspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "sugar",
                details: " ",
                quantity: 1.5,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "In a bowl, combine the turkey, garlic powder, fennel seed, sugar, salt, oregano and pepper.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Cover and refrigerate for at least 8 hours or overnight.",
                timer: 28800,
            },
            {
                title: "Step 3",
                text: "Shape into eight patties.",
                timer: 0,
            },
            {
                title: "Step 4",
                text:  "Coat nonstick pan with cooking spray and cook for 3 minutes on each side or until meat thermometer reads 165F.",
                timer: 180,
            },
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2", 
        name: "Country Potato Pancake",
        comments: [
            {
                text: "Had some sour cream and smoked salmon lying around.  Definitely a great addition!",
            }
        ],
        description:"A great savory pancake dish that you can swap in for a change of scene.",
        imageUrls:["https://i.imgur.com/UNTyMxi.jpg"],
        category:"entree", 
        tags: [
            "pancake", "potato", "breakfast", "savory",
        ],
        ingredients: [
            {
                name: "baking powder",
                details: " ",
                quantity: 1,
                units: "tspn",  
            },
            {
                name: "eggs",
                details: "lightly beaten ",
                quantity: 2,
                units: "",
            },
            {
                name: "flour",
                details: "all-purpose", 
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "onion",
                details: "grated", 
                quantity: 1,
                units: "tbspn",
            },
            {
                name: "potatoes",
                details: "large, peeled",
                quantity: 3,
                units: "",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "vegetable oil",
                details: " ",
                quantity: 1,
                units: "tspn"
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Finely grate potatoes. Drain any liquid. Add eggs, onion, flour, salt and baking powder.",
                timer: 0,
            },
            {
                title: "Step 2",
                text:"In a frying pan, add oil to the depth of 1/8 in. Heat over medium-high (375F).",
                timer: 0,
            },
            {
                title: "Step 3",
                text: "Drop batter by heaping tablespoonfuls in hot oil. Flatten to form patties.",
                timer: 0,
            },
            {
                title: "Step 4",
                text:  "Fry until golden brown then turn and cook the other side.",
                timer: 0,
            },
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2",
        name: "Chicken Tacos - the Tahiti Way",
        comments: [
            {
                text: "Lacking text, maybe try pickled red onion and shredded cabbage next time!",
            },
            {
                text:"Yes, texture definitely adds to this dish!", 
            }
        ],
        description:"This recipe is from my favorite taco truck on last trip to Portland.",
        imageUrls:["https://i.imgur.com/4ZyegVF.jpg"],
        category:"entree", 
        tags: [
            "tacos", "chicken", "Tahiti", "slow-cook",
        ],
        ingredients: [
            {
                name: "black pepper",
                details: " ",
                quantity: 0,
                units: "to taste",  
            },
            {
                name: "chicken breast",
                details: "boneless",
                quantity: 6,
                units: "",
            },
            {
                name: "cilantro",
                details: "chopped",
                quantity: 1,
                units: "tbspn",
            },
            {
                name: "tortillas",
                details: "corn",
                quantity: 10,
                units: "",
            },
            {
                name: "garlic",
                details: "diced",
                quantity: 2,
                units: "cloves",
            },
            {
                name: "onion",
                details: "large, sliced",
                quantity: 0.5,
                units: "",
            },
            {
                name: "pepperoncini pepper",
                details: " ",
                quantity: 16,
                units: "oz",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Combine everything including the ENTIRE jar of peppers, juice and all, but the tortillas into a slow cooker.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Cook on low 5 hours.",
                timer: 18000,
            },
            {
                title: "Step 3",
                text:  "Shred chicken with 2 forks. Mix well with everything in the pot.",
                timer: 0,
            },
            {
                title: "Step 4",
                text: "Heat tortillas till soft. Served the chicken on the tortilla. Enjoy!",
                timer: 0,
            }
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2", 
        name: "Tomato-Mint Quinoa Salad",
        comments: [
            {
                text: "It looks so pretty!",
            }
        ],
        description:"A delicious summer delight using fresh ingredients from the farmer's markets.",
        imageUrls:["https://i.imgur.com/Rk2iBIh.jpg"],
        category:"entree", 
        tags: [
            "salad", "tomato", "quinoa",
        ],
        ingredients: [
            {
                name: "water",
                details: " ",
                quantity: 2.5,
                units: "cups",  
            },
            {
                name: "quinoa",
                details: " ",
                quantity: 1.25,
                units: "cups",
            },
            {
                name: "raisins",
                details: " ",
                quantity: .75,
                units: "cups",
            },
            {
                name: "salt",
                details: " ",
                quantity: 1,
                units: "pinch",
            },
            {
                name: "medium tomato",
                details: "diced",
                quantity: 2,
                units: "",
            },
            {
                name: "medium onion",
                details: "minced",
                quantity: 1,
                units: "",
            },
            {
                name: "radish",
                details: "quartered",
                quantity: 10,
                units: "",
            },
            {
                name: "cucumber",
                details: "diced",
                quantity: .5,
                units: "",
            },
            {
                name: "almonds",
                details: "sliced, toasted",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "parsley",
                details: "fresh, chopped",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "cumin",
                details: "ground",
                quantity: 1,
                units: "tspn",
            },
            {
                name: "lime",
                details: "juice",
                quantity: .25,
                units: "cup",
            },
            {
                name: "sesame oil",
                details: " ",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "salt",
                details: " ",
                quantity: .25,
                units: "tspn to taste",
            }
        ],
        actions: [
            {
                title:"Step 1", 
                text: "Bring water to boil in a small saucepan. Pour in quinoa, raisins, and a pinch of salt. Cover, and let simmer for 12 to 15 minutes, then remove from heat, and allow to cool to room temperature.",
                timer: 780,
            },
            {
                title: "Step 2",
                text: "Toss together the tomatoes, onion, radish, cucumber, and almonds in a large bowl. Stir in the cooled quinoa, then season with mint, parsley, cumin, lime juice, sesame oil, and salt. Chill 1 to 2 hours before serving.",
                timer: 3600,
            }
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2",
        name: "Mapo Tofu",
        comments: [
            {
                text: "This dish needs a little sauce! Maybe add 2-3 tablespoon of water?",
            },
            {
                text:"Yep, water helps and coats the rice better!", 
            }
        ],
        description:"A go-to staple for the days when when you don't have anything in the fridge except for tofu and green onions. Goes well with rice!",
        imageUrls:["https://i.imgur.com/FUVkBZm.jpg"],
        category:"entree", 
        tags: [
            "tofu", "vegetarian", "sichuan", "easy",
        ],
        ingredients: [
            {
                name: "tofu",
                details: "medium firm, cubed",
                quantity: 16,
                units: "oz",  
            },
            {
                name:  "mapo bean curd seasoning",
                details: "sichuan style",
                quantity: 1,
                units: "pack of 150gm",
            },
            {
                name: "green onion",
                details: "chopped",
                quantity: 2,
                units: "",
            },
            {
                name: "vegetable oil",
                details: " ",
                quantity: 1,
                units: "tspn",
            }
        ],
        actions: [
            {
                title:"Step 1",
                text: "Heat vegetable oil in medium heat pan. Add seasoning, tofu, and green onions to the pan.",
                timer: 0,
            },
            {
                title: "Step 2",
                text: "Mix all ingredients and when throughly heated, served with rice.",
                timer: 0,
            }
        ]
    },
    {
        userID:"bvpraXbPB5R7EBaZTaiC1W9ipFg2",
        name: "Peach crostata",
        comments: [
            {
                text: "It came out delicious, next time, follow the direction to the T.",
            },
            {
                text:"Amazing! Goes well with ice cream!", 
            }
        ],
        description:"Free-form tarts (sometimes called crostatas) are an easy, quick-to-prepare way to use up seasonal fruit.",
        imageUrls:["https://i.imgur.com/dhHOHPm.jpg"],
        category:"dessert", 
        tags: [
            "peach", "crostata", "tart", "fruit", "summer", "pie"
        ],
        ingredients: [
            {
                name: "flour",
                details: "all-purpose",
                quantity: 1.5,
                units: "cups",  
            },
            {
                name:  "sugar",
                details: "granulated",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "salt",
                details: "",
                quantity: 0,
                units: "pinch",
            },
            {
                name: "butter",
                details: "cold unsalted,  cut into 1/2 inch",
                quantity: 6,
                units: "tbspn",
            },
            {
                name: "water",
                details: "ice",
                quantity: 1/4,
                units: "cup",
            },
            {
                name: "peaches",
                details: "halved, pitted and sliced 1/2 inch thick",
                quantity: 5,
                units: "",
            },
            {
                name: "brown sugar",
                details: "",
                quantity: 1/4,
                units: "cups",
            },
            {
                name: "vanilla extract",
                details: "",
                quantity: 1/2,
                units: "tspn",
            },
            {
                name: "cinnamon",
                details: "ground",
                quantity: 0,
                units: "pinch",
            },
            {
                name: "heavy cream",
                details: "",
                quantity: 2,
                units: "tbspn",
            },
            {
                name: "turbinado",
                details: "or other coarse sugar",
                quantity: 2,
                units: "tbspn",
            },
        ],
        actions: [
            {
                title:"Step 1",
                text: "In a food processor, pulse 1 1/2 cups of the flour with the granulated sugar and 1/2 teaspoon of salt until blended. Add the butter and pulse until it is the size of peas. Add the water and pulse until the dough is evenly moistened. Transfer the dough to a lightly floured work surface and pat it into a disk. Cover the disk with plastic wrap and refrigerate until chilled, about 30 minutes.",
                timer: 1800,
            },
            {
                title: "Step 2",
                text: "Preheat the oven to 425°. In a medium bowl, toss the peaches with the brown sugar, vanilla, cinnamon, a pinch of salt and the remaining 2 tablespoons of flour.",
                timer: 0,
            } ,
            {
                title: "Step 3",
                text: "On a lightly floured work surface, roll out the dough to a 12-inch round. Transfer the dough to a parchment-lined rimmed baking sheet. Mound the peaches with their juices in the center of the dough, leaving a 2-inch border all around. Fold the edge of the dough up and over the peaches. Refrigerate the tart until chilled, about 30 minutes.",
                timer: 1800,
            },
            {
                title: "Step 4",
                text: "Brush the dough with the cream and sprinkle with the turbinado sugar. Bake for about 50 minutes, until the crust is golden and the peaches are bubbling.",
                timer: 3600,
            },
            {
                title: "Step 4",
                text: "Let cool for 15 minutes before serving.",
                timer: 900,
            }
        ]
    }

];

//Is there anything we need to do for the following below?
//Only thing that I see different is the totalUseCount...?
//ingredients seed
let ingredientsSeed = [
    {
        name:"apple",
        ingredientIconLink: "apple icon link example here",
        ingredientCategory: "apple ingredient category here",
        ingredientCategoryIconLink:"ingredient category icon link here",
        usedCount:15,
    },
    {
        name: "bacon",
        usedCount: 91,
        ingredientCategory: "baked goods"
    },
    {
        name: "bellpepper",
        usedCount: 1,
    },
    {
        name: "butter",
        usedCount: 92,
    },
    {
        name: "cheese",
        usedCount: 93,
    },
    {
        name: "egg",
        usedCount: 94,
    },
    {
        name: "garlic",
        usedCount: 2,
    },
    {
        name: "lemon",
        usedCount: 3,
    },
    {
        name: "lime",
        usedCount: 4,
    },
    {
        name: "milk",
        usedCount: 97,
    },
    {
        name: "pepper",
        usedCount: 30,
    },
    {
        name: "potato",
        usedCount: 98,
    },
    {
        name: "salt",
        usedCount: 99,
    },
    {
        name: "tomato",
        usedCount: 87,
    },
    {
        name: "radish",
        usedCount: 88,
    },
    {
        name: "sausages",
        usedCount: 89,
    },
];


async function seedAsyncFunction() {
    try {
        await recipesModel.deleteMany();
        await ingredientsModel.deleteMany();
        await recipesModel.insertMany(recipesSeed);
        await ingredientsModel.insertMany(ingredientsSeed);
        process.exit(0);
    } catch (err) {
        console.log(err);
    }
}
seedAsyncFunction();
