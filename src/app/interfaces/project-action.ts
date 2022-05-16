export interface ProjectAction {
  ID?: string;
  post_title?: string;
  title?: {
    rendered?: string;
  };
  acf?: {
    project?: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ID?: string;
    };
  };
}

