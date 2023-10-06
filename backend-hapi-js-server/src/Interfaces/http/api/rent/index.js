const RentHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'rent',
  register: async (server, { container }) => {
    const rentHandler = new RentHandler(container);
    server.route(routes(rentHandler));
  },
};
