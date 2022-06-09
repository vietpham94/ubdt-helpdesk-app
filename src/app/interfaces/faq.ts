export interface Faq {
  ID?: string;
  post_title?: string;
  post_content?: string;
  acf?: {
    project_id?: string;
    action_id?:string;

    attached?: {
      title?: string;
      url?: string;
    },
  }
}
