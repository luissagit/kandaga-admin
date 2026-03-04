export class UserCategoryTransformer {
  create(payload: any) {
    return {
      ...payload,
      is_super_admin: payload?.is_super_admin ?? false,
      is_for_public: payload?.is_for_public ?? false,
      status: 'active',
    };
  }

  update(payload: any) {
    return {
      ...payload,
      is_super_admin: payload?.is_super_admin ?? false,
      is_for_public: payload?.is_for_public ?? false,
    };
  }
}

export const userCategoryTransformer = new UserCategoryTransformer();
