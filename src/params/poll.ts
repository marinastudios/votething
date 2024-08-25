import ids from "$lib/ids";

function matchesAlphabet(target: string, alphabet: string) {
    const escapedB = alphabet.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`^[${escapedB}]*$`);
    return regex.test(target);
}

export const match = (p: string) => p.startsWith('~') && matchesAlphabet(p, ids.poll_alphabet) && p.length === 21