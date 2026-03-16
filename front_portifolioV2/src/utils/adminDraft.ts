import type { Project } from "../types/project";

type ProjectSectionKey = keyof Project;

const sectionDraft: Partial<Project> = {};
const initializedSections = new Set<ProjectSectionKey>();
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
    emitDraftChange();
}

export function isAdminDraftDirty() {
    return dirty;
}
