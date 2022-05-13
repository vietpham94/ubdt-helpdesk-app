export interface Project {
  id?: string,
  title?: {
    rendered?:string,
  }
  acf: {
    project_organizational?:string,
    project_construction?:string,
    project_location?:string,
    project_subject_type?:string,
  }
}
