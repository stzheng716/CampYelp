const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

//node -i -e "$(< index.js)" how to launch node/mongoose in terminal
mongoose.set("strictQuery", true);
mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '63fd79080373ca17705240e8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolorum quisquam corrupti culpa ratione reprehenderit exercitationem optio quae, aperiam quidem minus accusamus iure, eaque inventore soluta repellendus maxime. Atque, suscipit.',
            price,
            geometry: { type: 'Point', coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude,
             ] },
            images: [
                {
                  url: 'https://res.cloudinary.com/duhu1maui/image/upload/v1677639653/YelpCamp/ljelzqri98tbearyq0fj.jpg',
                  filename: 'YelpCamp/fxyhnsa0i32rsv0fmv51',
                },
                {
                  url: 'https://res.cloudinary.com/duhu1maui/image/upload/v1677639656/YelpCamp/zlazvaptomxipz4zzo99.jpg',
                  filename: 'YelpCamp/sxuvyxzjuka9kd2bjpns',
                },
                {
                  url: 'https://res.cloudinary.com/duhu1maui/image/upload/v1677639658/YelpCamp/nsjrwzpe1booyi3dlmj6.avif',
                  filename: 'YelpCamp/o6bakph3jscf33kma72t',
                }
            ]
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close()
})