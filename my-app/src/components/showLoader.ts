export function showLoader(show: boolean, containerSelector?: string) {
    const loaderKey = containerSelector ?? 'global';
    const existing = document.querySelector(`[data-loader-for="${loaderKey}"]`) as HTMLElement | null;

    let container: HTMLElement | null = document.body;
    if (containerSelector) {
        const found = document.querySelector(containerSelector) as HTMLElement | null;
        if (found) container = found;
    }

    const createOverlay = () => {
        const overlay = document.createElement('div');
        overlay.className = 'loader-overlay';
        overlay.setAttribute('data-loader-for', loaderKey);
        overlay.innerHTML = `<div class="loader"></div>`;

        if (container === document.body) {
            overlay.style.position = 'fixed';
            overlay.style.inset = '0';
        } else {
            const computed = getComputedStyle(container!);
            if (!['relative', 'absolute', 'fixed', 'sticky'].includes(computed.position)) {
                container!.style.position = 'relative';
            }
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
        }

        overlay.style.display = 'none';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.background = 'rgba(64, 63, 61, 0.8)';
        overlay.style.zIndex = '2000';
        overlay.style.pointerEvents = 'auto';

        container!.appendChild(overlay);
        return overlay;
    };

    const overlayEl = existing ?? createOverlay();

    overlayEl.style.display = show ? 'flex' : 'none';
}