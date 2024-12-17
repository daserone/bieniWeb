/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_MTMP_CLIENT_ID: string;
  readonly VITE_MTMP_FLOW_ID_PANAMA: string;
  readonly VITE_MTMP_FLOW_ID_EXT_PANAMA: string;
  readonly VITE_MTMP_FLOW_ID_EXT: string;
  readonly VITE_MTMP_FLOW_ID_TEST: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
