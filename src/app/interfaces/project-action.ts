export interface ProjectAction {
  id?: string;
  ID?: string;
  post_title?: string;
  title?: {
    rendered?: string;
  };
  content: {
    rendered: string
  },
  acf?: {
    project?: {
      ID?: string;
      post_title?: string;
      post_type?: string;
    };
    action_icon_image?: string;
    action_banner_image?: string;
    action_target?: string;
    action_subject?: string;
    action_source_of_capital?: string;
    action_organizational?: Array<{
      ID?: string;
      post_title?: string;
      post_type?: string;
    }>;
    action_construction?: Array<{
      ID?: string;
      post_title?: string;
      post_type?: string;
    }>;
    action_location?: Array<{
      ID?: string;
      post_title?: string;
      post_type?: string;
    }>;
    action_subject_type?: Array<{
      ID?: string;
      post_title?: string;
      post_type?: string;
    }>;
  };
}

