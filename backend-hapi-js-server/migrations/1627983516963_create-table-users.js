/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('users', {
    code: {
      type: 'VARCHAR(4)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    is_penalty: {
      type: 'boolean',
      notNull: true,
      default: false
    },
    penalty_end_date: {
      type: 'date',
      notNull: false
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
