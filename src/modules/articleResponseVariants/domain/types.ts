export type VariantChange = {
  eventType: "VARIANT_NAME_UPDATED" | "VARIANT_CONTENT_UPDATED";
  field: "variantName" | "variantContent";
  before: string;
  after: string;
};
