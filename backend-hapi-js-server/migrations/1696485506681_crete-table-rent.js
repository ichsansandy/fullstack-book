/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('rent', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    member_code: {
      type: 'TEXT',
      notNull: true,
    },
    book_code: {
      type: 'TEXT',
      notNull: true,
    },
    rented_at: {
      type: 'DATE',
      notNull: true,
    },
  });

  pgm.addConstraint('rent', 'unique_member_book', {
    unique: ['member_code', 'book_code'],
});

  pgm.addConstraint(
    'rent',
    'fk_rent.member_code_users.code',
    'FOREIGN KEY(member_code) REFERENCES users(code) ON DELETE CASCADE',
  );

  pgm.addConstraint(
    'rent',
    'fk_rent.book_code_books.code',
    'FOREIGN KEY(book_code) REFERENCES books(code) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('rent', 'unique_member_book');
  pgm.dropConstraint('rent', 'fk_rent.member_code_users.code');
  pgm.dropConstraint('rent', 'fk_rent.book_code_books.code');

  pgm.dropTable('rent');
};
