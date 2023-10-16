const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const Campground = require('../models/campground');

mongoose.set('strictQuery', false);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dlkxmxjxr/image/upload/v1675442281/Grounds/wrlryyptrx5n2ixvpnk1.jpg',
          filename: 'Grounds/wrlryyptrx5n2ixvpnk1',
        },
        {
          url: 'https://res.cloudinary.com/dlkxmxjxr/image/upload/v1675442282/Grounds/gjljssb9vgw3lqnujiov.jpg',
          filename: 'Grounds/gjljssb9vgw3lqnujiov',
        },
        {
          url: 'https://res.cloudinary.com/dlkxmxjxr/image/upload/v1675442287/Grounds/ghzvhof471ob9b87vnwk.jpg',
          filename: 'Grounds/ghzvhof471ob9b87vnwk',
        },
      ],
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      author: '63dacfe183523d22fb6f6c55',
      price,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, reiciendis adipisci perspiciatis, numquam libero ipsam enim eveniet ullam similique minima sint unde necessitatibus aspernatur quibusdam nesciunt ipsa laudantium laborum repudiandae!',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
