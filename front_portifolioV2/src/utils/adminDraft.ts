import type { Project } from "../types/project";

type ProjectSectionKey = keyof Project;

export interface AdminImageUpload {
    section: string;
    file: File;
    name: string;
}

const sectionDraft: Partial<Project> = {};
const initializedSections = new Set<ProjectSectionKey>();
const imageUploadDraft = new Map<string, AdminImageUpload>();
let dirty = false;

function emitDraftChange() {
    window.dispatchEvent(
        new CustomEvent("admin-draft-change", {
            detail: {
                dirty,
            },
        })
    );
}

export function setAdminSection<K extends ProjectSectionKey>(sectionKey: K, value: Project[K]) {
    const hasInitialized = initializedSections.has(sectionKey);

    sectionDraft[sectionKey] = value;
    initializedSections.add(sectionKey);

    if (hasInitialized) {
        dirty = true;
        emitDraftChange();
    }
}

export function patchAdminSection<K extends ProjectSectionKey>(
    sectionKey: K,
    value: Project[K] extends object ? Partial<Project[K]> : never
) {
    const previousValue = (sectionDraft[sectionKey] ?? {}) as Record<string, unknown>;

    const hasInitialized = initializedSections.has(sectionKey);

    sectionDraft[sectionKey] = {
        ...previousValue,
        ...(value as Record<string, unknown>),
    } as Project[K];
    initializedSections.add(sectionKey);

    if (hasInitialized) {
        dirty = true;
        emitDraftChange();
    }
}

export function getAdminDraftProject(baseProject: Project): Project {
    return {
        ...baseProject,
        ...sectionDraft,
    };
}

export function clearAdminDraftDirtyFlag() {
    dirty = false;
    imageUploadDraft.clear();
    emitDraftChange();
}

export function isAdminDraftDirty() {
    return dirty;
}

export function setAdminImageUpload(key: string, value: AdminImageUpload) {
    imageUploadDraft.set(key, value);
    dirty = true;
    emitDraftChange();
}

export function removeAdminImageUpload(key: string) {
    const hadValue = imageUploadDraft.delete(key);

    if (hadValue) {
        dirty = true;
        emitDraftChange();
    }
}

export function syncAdminImageUploadNames(section: string, orderedKeys: string[]) {
    orderedKeys.forEach((key, index) => {
        const existing = imageUploadDraft.get(key);

        if (!existing || existing.section !== section) return;

        const expectedName = String(index + 1);

        if (existing.name !== expectedName) {
            imageUploadDraft.set(key, {
                ...existing,
                name: expectedName,
            });
            dirty = true;
            emitDraftChange();
        }
    });
}

export function getAdminImageUploads(): AdminImageUpload[] {
    return Array.from(imageUploadDraft.values());
}
