export class DocumentCategoryTransformer {
  create(payload: any) {
    return {
      ...payload,
      document_category_id: payload?.document_category?.id,
      status: 'active',
    };
  }

  update(payload: any) {
    return {
      ...payload,
      document_category_id: payload?.document_category?.id,
    };
  }
}

export const documentCategoryTransformer = new DocumentCategoryTransformer();
