declare module 'virtual:pwa-register' {
    type RegisterSWOptions = {
        immediate?: boolean;
        onNeedRefresh?: () => void;
        onOfflineReady?: () => void;
    };

    export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => void;

    export default registerSW;
}
