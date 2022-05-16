import {HelpDeskCategory} from './help-desk-category';

export interface HelpDesk {
  id?: string;
  ID?: string;
  post_title?: string;
  title?: {
    rendered: string;
  },
  post_content?: string;
  content?: {
    rendered: string;
  };
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
      title?: string;
    }>,
    helpdesk_documents: Array<{
      ID?: number;
      post_title?: string;
    }>,
  }
  terms?: Array<HelpDeskCategory>;
}
