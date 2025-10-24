export function showNotification(message: string, duration = 3000) {
    const existing = document.querySelector('.top-notification');
    if (existing) existing.remove();

    const n = document.createElement('div');
    n.className = 'top-notification error';
    n.setAttribute('role', 'alert');
    n.innerHTML = `
      <div class="top-notification-content">
        <span class="top-notification-msg">${message}</span>
        <button class="top-notification-close" aria-label="Close">&times;</button>
      </div>
    `;
    document.body.prepend(n);

    const close = n.querySelector('.top-notification-close') as HTMLButtonElement | null;
    close?.addEventListener('click', () => n.remove());

    if (duration > 0) {
        setTimeout(() => n.remove(), duration);
    }
}