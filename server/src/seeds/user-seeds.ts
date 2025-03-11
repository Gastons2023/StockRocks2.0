import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', password: 'password', email: 'jollyguru@aol.com'},
    { username: 'SunnyScribe', password: 'password', email: 'sunnyscribe@aol.com' },
    { username: 'RadiantComet', password: 'password',email: 'radiantcomet@aol.com'},
  ], { individualHooks: true });
};
