/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';
import i18nConfig from './next-i18next.config.js';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
  i18n: i18nConfig.i18n,
};

export default withNextIntl(config);
