export interface Ward {
  id?: string;
  post_title?: string;
  title?: {
    rendered?: string;
  };
  acf?: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    province?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    district?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    wards_code?: string;
  };
}
