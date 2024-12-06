/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BASE_URL: string;
  VITE_MTMP_CLIENT_ID: string;
  VITE_MTMP_FLOW_ID_PANAMA: string;
  VITE_MTMP_FLOW_ID_EXT_PANAMA: string;
  VITE_MTMP_FLOW_ID_EXT: string;
  VITE_MTMP_FLOW_ID_TEST: string;
}
interface ImportMeta {
  env: ImportMetaEnv;
}
