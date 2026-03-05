export class DocumentCategoryTransformer {
  create(payload: any) {
    return {
      ...payload,
      status: 'active',
    };
  }

  update(payload: any) {
    return {
      ...payload,
    };
  }
}

export const documentCategoryTransformer = new DocumentCategoryTransformer();
