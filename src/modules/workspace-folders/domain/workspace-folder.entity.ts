/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

export class WorkspaceFolderEntity {
  public id: string;
  public name: string;
  public description: string;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
