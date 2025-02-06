// Utility functions for handling UI operations
export function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => showNotification('Copied to clipboard!'))
        .catch(err => showNotification('Failed to copy', 'error'));
}

export function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `fixed top-4 right-4 p-4 rounded-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 3000);
}