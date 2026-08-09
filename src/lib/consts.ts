import packageJson from '../../package.json' with { type: 'json' };

export const SITE_VERSION = packageJson.version;
export const HOME_FEATURED_PROJECTS_LIMIT = 7;
export const HOME_POSTS_LIMIT = 3;
export const READING_WPM = 200;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
