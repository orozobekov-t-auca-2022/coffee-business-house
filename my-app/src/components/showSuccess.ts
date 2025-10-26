export function showSuccess(message: string, duration = 3000) {
    const existing = document.querySelector('.top-notification');
    if (existing) existing.remove();

    const n = document.createElement('div');
    n.className = 'thanks-notification';
    n.setAttribute('role', 'alert');
    n.innerHTML = `
      <div class="thanks-notification">
        <span class="thanks-notification-msg">${message}</span>
        <button class="thanks-notification-close" aria-label="Close">&times;</button>
      </div>
    `;
    document.body.prepend(n);

    const close = n.querySelector('.thanks-notification-close') as HTMLButtonElement | null;
    close?.addEventListener('click', () => n.remove());

    if (duration > 0) {
        setTimeout(() => n.remove(), duration);
    }
}