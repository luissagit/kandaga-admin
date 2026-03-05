export class DocumentTransformer {
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

  filter(payload: any) {
    return {
      ...payload,
      document_categories: undefined,
      creators: undefined,
      editors: undefined,
      document_category_ids: payload?.document_categories?.map(
        (item: any) => item?.id,
      ),
      creator_ids: payload?.creators?.map((item: any) => item?.id),
      editor_ids: payload?.editors?.map((item: any) => item?.id),
    };
  }
}

export const documentTransformer = new DocumentTransformer();
