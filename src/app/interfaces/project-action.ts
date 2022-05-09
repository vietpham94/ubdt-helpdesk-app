export interface ProjectAction {
  id?: string;
  slug?: string;
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
