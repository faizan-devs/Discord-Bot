const cooldowns = new Map();

export function checkCooldown(userId, cooldownTime = 10000) {
    const now = Date.now();
    const lastUsed = cooldowns.get(userId);

    if (lastUsed) {
        const diff = now - lastUsed;
        if (diff < cooldownTime) {
            const remaining = ((cooldownTime - diff) / 1000).toFixed(1);
            return `Please wait ${remaining}s before using this again.`;
        }
    }

    cooldowns.set(userId, now);
    return null;
}
