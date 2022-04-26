export interface Province {
  id?: string;
  title?: {
    rendered?: string;
  };
  acf?: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    province_code?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    province_type?: string;
  };
}
