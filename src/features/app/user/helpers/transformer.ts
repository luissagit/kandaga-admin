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

  filter(payload: any) {
    return {
      ...payload,
      user_categories: undefined,
      user_category_ids: payload?.user_categories?.map((item: any) => item?.id),
    };
  }
}

export const userTransformer = new UserTransformer();
