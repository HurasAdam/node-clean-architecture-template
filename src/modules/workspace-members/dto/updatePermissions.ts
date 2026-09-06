import { z } from "zod";

export const updateWorkspaceMemberPermissionsDto = z.object({
  permissions: z.object({
    addFolder: z.boolean(),
    editFolder: z.boolean(),
    deleteFolder: z.boolean(),

    addArticle: z.boolean(),
    editArticle: z.boolean(),
    deleteArticle: z.boolean(),

    addMember: z.boolean(),
    removeMember: z.boolean(),

    editWorkspace: z.boolean(),
  }),
});

export type UpdateWorkspaceMemberPermissionsDto = z.infer<
  typeof updateWorkspaceMemberPermissionsDto
>;
