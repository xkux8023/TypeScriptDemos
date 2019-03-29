
class Student {
  fullName: string
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName
  }
}


function greeter(person: Student) {
  return person.fullName
}

let user = new Student("Jane", "M.", "user") 

document.body.innerHTML = greeter(user);
