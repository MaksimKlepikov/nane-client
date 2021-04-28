
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

export default async ({ app, router, Vue }) => {
  Sentry.init({
    Vue,
    dsn: 'https://ad0a7984e8644253b2e9f0b2b4e56b55@o280305.ingest.sentry.io/5739600',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    logError: true
  })
}
