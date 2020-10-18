export class Client {
  constructor(id,name) {
    this.id = id;
    this.name = name;
  }
  get name() {                //getter and setters : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    return this.carname;
  }
  set name(x) {
    this.carname = x;
  }

    static  get name() {  
    return c=>c.carname;
  }
}
