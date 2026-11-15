/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { FaqStatus } from "../infrastructure/models/mongo";

export interface FaqListItemDto {
  id: string;
  title: string;
  status: FaqStatus;
  iconKey: string;
}
