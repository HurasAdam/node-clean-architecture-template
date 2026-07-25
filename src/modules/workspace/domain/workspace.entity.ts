/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

export class WorkspaceEntity {
  public id: string;
  public name: string;
  public labelColor: string;
  public iconKey: string;
  public owner: string;

  constructor(
    id: string,
    name: string,
    labelColor: string,
    iconKey: string,
    owner: string,
  ) {
    this.id = id;
    this.name = name;
    this.labelColor = labelColor;
    this.iconKey = iconKey;
    this.owner = owner;
  }
}
