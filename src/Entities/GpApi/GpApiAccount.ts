export class GpApiAccount {
  public id: string;
  public name: string;
  public permissions: string;

  constructor(id: string, name: string, permissions: string = "") {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}
