export type AppType =
  | 'editor'
  | 'explorer'
  | 'timeline'
  | 'visualGrid'
  | 'gallery'
  | 'listView'
  | 'folder'
  | 'download';

export interface DesktopFile {
  id: string;
  name: string;
  icon: string;
  appType: AppType;
  downloadUrl?: string;
}

export const desktopFiles: DesktopFile[] = [
  {
    id: 'about',
    name: 'about_me.md',
    icon: '📄',
    appType: 'editor',
  },
  {
    id: 'experience',
    name: 'experience',
    icon: '💼',
    appType: 'timeline',
  },
  {
    id: 'projects',
    name: 'projects',
    icon: '🚀',
    appType: 'explorer',
  },
  {
    id: 'resume',
    name: 'resume.pdf',
    icon: '🎓',
    appType: 'download',
    downloadUrl: '/resume.pdf',
  },
  {
    id: 'trips',
    name: 'trips',
    icon: '✈️',
    appType: 'gallery',
  },
  {
    id: 'techstack',
    name: 'tech_stack',
    icon: '🛠️',
    appType: 'visualGrid',
  },
  {
    id: 'interests',
    name: 'interests.txt',
    icon: '🎮',
    appType: 'editor',
  },
  {
    id: 'testimonials',
    name: 'testimonials',
    icon: '💬',
    appType: 'listView',
  },
  {
    id: 'certs',
    name: 'certs',
    icon: '📜',
    appType: 'listView',
  },
  {
    id: 'contact',
    name: 'contact.md',
    icon: '📬',
    appType: 'editor',
  },
  {
    id: 'trash',
    name: 'Trash',
    icon: '🗑️',
    appType: 'folder',
  },
];
