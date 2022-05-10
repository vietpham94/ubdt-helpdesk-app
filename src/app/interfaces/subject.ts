export interface Subject {
  id?: string;
  date?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  date_gmt?: string;
  slug?: string;
  status?: string;
  type?: string;
  link?: string;
  title?: {
    rendered?: string;
  };
  acf?: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    subject_code?: string;
  };
}
