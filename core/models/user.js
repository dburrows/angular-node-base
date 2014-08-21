module.exports = User;

function User(args) {
  this._attributes = {};
  this._attributes.firstName = args.firstName;
  this._attributes.lastName = args.lastName;
  this._attributes.email = args.email;
}

User.prototype = {
  constructor: User,

  get name() {
    return this._attributes.firstName +
      " " + this._attributes.lastName;
  },
  get firstName() {
    return this._attributes.firstName;
  },
  get lastName() {
    return this._attributes.lastName;
  },
  get email() {
    return this._attributes.email;
  },

  toString: function() {
    return this._attributes.firstName +
      " " + this._attributes.lastName +
      " <" + this._attributes.email + ">";
  },

  toJSON: function() {
    return JSON.stringify(this._attributes);
  }

};
