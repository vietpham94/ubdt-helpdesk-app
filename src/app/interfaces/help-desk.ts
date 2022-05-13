export interface HelpDesk {
  id?: string;
  post_title?: string;
  post_content?: string;
  acf?: {
    helpdesk_project?: {
      ID?: number;
      post_content?: string;
      post_title?: string;
    },
    helpdesk_action?: {
      ID?: number;
      post_content?: string;
      post_title?: string;
    },
    helpdesk_phase?: {
      ID?: number;
      post_content?: string;
      post_title?: string;
    },
    helpdesk_subject?: {
      ID?: number;
      post_content?: string;
      post_title?: string;
    },
    helpdesk_subject_type?: {
      ID?: number;
      post_title?: string;
    },
    helpdesk_location: Array<{
      ID?: number;
      post_title?: string;
    }>,
    file_dinh_kem: Array<{
      ID?: number;
      url?: string;
      filename?: string;
    }>,
    helpdesk_documents: Array<{
      ID?: number;
      post_title?: string;
    }>,
  }
}
