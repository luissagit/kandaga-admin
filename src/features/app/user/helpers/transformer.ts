export class UserTransformer {
  create(payload: any) {
    return {
      ...payload,
      user_category_id: payload?.user_category?.id,
      is_verified: payload?.is_verified ?? false,
      status: 'active',
    };
  }

  update(payload: any) {
    return {
      ...payload,
      user_category_id: payload?.user_category?.id,
      is_verified: payload?.is_verified ?? false,
    };
  }
}

export const userTransformer = new UserTransformer();
