const ABSOLUTE_PROTOCOL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;
const RELATIVE_PREFIXES = ["#", "/", "./", "../"];

export function normalizeHref(href: string): string {
    const trimmedHref = href.trim();

    if (!trimmedHref) {
        return "#";
    }

    if (RELATIVE_PREFIXES.some((prefix) => trimmedHref.startsWith(prefix))) {
        return trimmedHref;
    }

    if (trimmedHref.startsWith("//")) {
        return `https:${trimmedHref}`;
    }

    if (ABSOLUTE_PROTOCOL_REGEX.test(trimmedHref)) {
        return trimmedHref;
    }

    return `https://${trimmedHref}`;
}

export function shouldOpenInNewTab(href: string): boolean {
    const normalizedHref = normalizeHref(href);

    return !RELATIVE_PREFIXES.some((prefix) => normalizedHref.startsWith(prefix));
}
