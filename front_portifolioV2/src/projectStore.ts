import type { Project } from "./types/project";

export let project: Project = {} as Project;

export const setProject = (p: Project) => {
    project = p;
}
