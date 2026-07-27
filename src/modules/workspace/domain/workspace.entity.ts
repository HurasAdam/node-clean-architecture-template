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
  public description: string;
  public inviteCode: string;

  constructor(
    id: string,
    name: string,
    labelColor: string,
    iconKey: string,
    owner: string,
    description: string,
    inviteCode: string,
  ) {
    this.id = id;
    this.name = name;
    this.labelColor = labelColor;
    this.iconKey = iconKey;
    this.owner = owner;
    this.description = description;
    this.inviteCode = inviteCode;
  }

  public isOwner(userId: string): boolean {
    return this.owner.toString() === userId;
  }
}
