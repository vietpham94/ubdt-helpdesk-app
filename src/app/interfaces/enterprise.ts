export interface Enterprise {
  id?: number;
  ID?: number;
  post_title?: string;
  title?: {
    rendered?: string;
  };
  acf?: {
    enterprise_phone?: string;
    enterprise_hotline?: string;
    enterprise_email?: string;
    enterprise_website?: string;
    address?: string;
  };
  position?: {
    ID: number;
    post_title: string;
  }
  logo?: string;
}
