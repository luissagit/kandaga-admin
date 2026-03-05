import _ from 'lodash';

export const DocumentType = {
  EXTERNAL: 'external',
  INTERNAL: 'internal',
} as const;

export const FileType = {
  PDF: 'pdf',
  IMAGE: 'image',
} as const;

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];
export type FileType = (typeof FileType)[keyof typeof FileType];

export const documentTypeOptions = _.map(DocumentType, (value, key) => ({
  label: _.startCase(_.lowerCase(key)),
  value: value,
}));

export const fileTypeOptions = _.map(FileType, (value, key) => ({
  label: _.startCase(_.lowerCase(key)),
  value: value,
}));
