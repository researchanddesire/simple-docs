import { loader } from 'fumadocs-core/source';
import { docs } from 'collections/server';
import { docsRoute } from '@/lib/shared';

export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
});
