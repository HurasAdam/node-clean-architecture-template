/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

export class WorkspaceFolderEntity {
  public id: string;
  public name: string;
  public description: string;
  public color: string;

  constructor(id: string, name: string, description: string, color: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.color = color;
  }
}
