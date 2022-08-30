class Person {
  constructor(name, email) {
    this._name = name;
    this._email = email;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }
}

let persons = new Person("jas", "jbha0006@student.monash.edu");
console.log(persons);
