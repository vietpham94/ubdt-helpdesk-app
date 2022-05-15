export interface District {
  id?: string;
  ID?: string;
  post_title?: string;
  title?: {
    rendered?: string;
  };
  acf?: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    province_id?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    district_code?: string;
  };
}
