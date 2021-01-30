const app = require('./index');
const dbModel = require('./models/index');
const faker = require('faker');
const bcrypt = require('bcrypt');

const { User, Workspace, WorkspaceType, Service, WorkspaceService, Order, Blog, Attachment } = dbModel;
const role_enums = ['admin', 'member', 'partner']
const rdGender = ['male', 'female'];

const seedUsers = async ({ seedAdmin }) => {
  let pwd = await bcrypt.hash('12345678', 10);
  if (seedAdmin) {
    await User.create({
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      first_name: 'admin',
      last_name: 'workspace manager',
      email: 'admin@workspace.com',
      username: 'admin_workspace',
      gender: rdGender[faker.random.number(1)],
      password: pwd,
      role: 'admin',
    });
  }

  let n = 10;
  for (let i = 0; i < n; i++) {
    await User.create({
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email().toLowerCase(),
      gender: rdGender[faker.random.number(1)],
      username: faker.internet.userName(),
      password: pwd,
      role: role_enums[faker.random.number(2)],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

const seedWorkspaceType = async () => {
  await WorkspaceType.create({ id: 1, name: 'Restaurant', type: 'restaurant' })
  await WorkspaceType.create({ id: 2, name: 'Beer club', type: 'beer-club' })
  await WorkspaceType.create({ id: 3, name: 'Co workspace', type: 'co-workspace' })
  await WorkspaceType.create({ id: 4, name: 'Event', type: 'event' })
  await WorkspaceType.create({ id: 5, name: 'Office', type: 'Office' })
  await WorkspaceType.create({ id: 6, name: 'Studio', type: 'studio' })
  await WorkspaceType.create({ id: 7, name: 'Gaming house', type: 'gaming-house' })
}

const seedWorkspaceWithService = async () => {
  let pwd = await bcrypt.hash('12345678', 10);
  for (let i = 0; i < 5; i++) {
    let user = await User.create({
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email().toLowerCase(),
      gender: rdGender[faker.random.number(1)],
      username: faker.internet.userName(),
      password: pwd,
      role: 'partner',
    });

    for (let j = 0; j < 3; j++) {
      let rdNumber = faker.random.number(5, 15)
      let workspace = await Workspace.create({
        name: faker.name.findName(),
        workspace_type_id: faker.random.number(1, 7),
        address: faker.address.streetAddress(),
        country: faker.address.country(),
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
        price: faker.commerce.price(),
        description: faker.lorem.sentence(),
        max_capacity: rdNumber + 10,
        min_capacity: rdNumber,
        user_id: user.id
      })

      for (let z = 0; z < 5; z++) {
        let workspaceService = await WorkspaceService.create({
          name: faker.name.findName(),
          price: faker.commerce.price(),
          workspace_id: workspace.id
        })
      }

      for (let z = 0; z < 5; z++) {
        let workspaceAttachment = await Attachment.create({
          url: faker.image.imageUrl(),
          type: 'Workspace',
          type_id: workspace.id
        })
      }
    }
  }
}

(async function () {
  await User.destroy({ where: {} });
  await Workspace.destroy({ where: {} });
  await WorkspaceType.destroy({ where: {} });
  await WorkspaceService.destroy({ where: {} });
  await Order.destroy({ where: {} });
  await Blog.destroy({ where: {} });
  await Attachment.destroy({ where: {} });

  await seedWorkspaceType()
  await seedUsers({ seedAdmin: true });
  await seedWorkspaceWithService()

  process.exit()
})();
