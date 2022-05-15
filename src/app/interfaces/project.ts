export interface Project {
  id?: number;
  date?: string;
  slug?: string;
  title?: {
    rendered?: string
  };
  content?: {
    rendered?: string
    protected?: boolean
  };
  parent?: number;
  acf?: {
    project_target?: string;
    project_subject?: string;
    project_assign?: string;
    project_source_of_capital?: string;
    project_organizational?: Array<{ ID?: number; post_title?: string }>;
    project_construction?: Array<{ ID?: number; post_title?: string }>;
    project_location?: Array<{ ID?: number; post_title?: string }>;
    project_subject_type?: { ID?: number; post_title?: string; };
    color?: string;
    logo_image?: string;
    project_number?: string;
  }
}
