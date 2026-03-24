import type { Project } from "./types/project";

const defaultProject: Project = {
    id: "",
    name: "",
    description: "",
    header: {
        whiteTitle: "",
        sections: [],
    },
    hero: {
        blueHelperText: "",
        title: {
            whiteTitle: "",
            rotatingWords: [""],
        },
        subtitle: "",
        buttons: {
            blueButton: { text: "", href: "#" },
            transparentButton: { text: "", href: "#" },
        },
        code: {
            archiveName: "",
            snippet: {
                serviceAnnotation: "",
                classKeyword: "",
                className: "",
                infrastructureComment: "",
                autowiredAnnotation: "",
                awsField: "",
                deploySignature: "",
                deployCallPrefix: "",
                region: "",
                deployCallSuffix: "",
                uptimeComment: "",
            },
            icon: "",
            iconColor: "",
        },
    },
    about: {
        id: "about",
        img: "",
        title: "",
        description: [],
        cards: [],
    },
    journey: {
        title: "",
        jobs: [],
    },
    stacks: {
        title: "",
        showLessText: "",
        showMoreText: "",
        items: [],
    },
    projects: {
        title: "",
        subtitle: "",
        githubButtonText: "",
        githubButtonHref: "#",
        caseStudyButtonText: "",
        showLessText: "",
        showMoreText: "",
        items: [],
    },
    certifications: {
        title: "",
        items: [],
    },
    contact: {
        title: "",
        subtitle: "",
        form: {
            nameLabel: "",
            namePlaceholder: "",
            emailLabel: "",
            emailPlaceholder: "",
            detailsLabel: "",
            detailsPlaceholder: "",
            submitButtonText: "",
        },
    },
    footer: {
        portfolioName: "",
        rightsText: "",
        socialLinks: [],
    },
};

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function extractProjectPayload(payload: unknown): Partial<Project> {
    if (Array.isArray(payload)) {
        return isObject(payload[0]) ? (payload[0] as Partial<Project>) : {};
    }

    if (!isObject(payload)) {
        return {};
    }

    if (isObject(payload.portifolio)) {
        return payload.portifolio as Partial<Project>;
    }

    if (isObject(payload.project)) {
        return payload.project as Partial<Project>;
    }

    if (isObject(payload.data)) {
        return payload.data as Partial<Project>;
    }

    return payload as Partial<Project>;
}

function normalizeProject(payload: unknown): Project {
    const source = extractProjectPayload(payload);

    return {
        ...defaultProject,
        ...source,
        header: {
            ...defaultProject.header,
            ...source.header,
            sections: source.header?.sections ?? defaultProject.header.sections,
        },
        hero: {
            ...defaultProject.hero,
            ...source.hero,
            title: {
                ...defaultProject.hero.title,
                ...source.hero?.title,
                rotatingWords: source.hero?.title?.rotatingWords ?? defaultProject.hero.title.rotatingWords,
            },
            buttons: {
                ...defaultProject.hero.buttons,
                ...source.hero?.buttons,
                blueButton: {
                    ...defaultProject.hero.buttons.blueButton,
                    ...source.hero?.buttons?.blueButton,
                },
                transparentButton: {
                    ...defaultProject.hero.buttons.transparentButton,
                    ...source.hero?.buttons?.transparentButton,
                },
            },
            code: {
                ...defaultProject.hero.code,
                ...source.hero?.code,
                snippet: {
                    ...defaultProject.hero.code.snippet,
                    ...source.hero?.code?.snippet,
                },
            },
        },
        about: {
            ...defaultProject.about,
            ...source.about,
            description: source.about?.description ?? defaultProject.about.description,
            cards: source.about?.cards ?? defaultProject.about.cards,
        },
        journey: {
            ...defaultProject.journey,
            ...source.journey,
            jobs: source.journey?.jobs ?? defaultProject.journey.jobs,
        },
        stacks: {
            ...defaultProject.stacks,
            ...source.stacks,
            items: source.stacks?.items ?? defaultProject.stacks.items,
        },
        projects: {
            ...defaultProject.projects,
            ...source.projects,
            items: source.projects?.items ?? defaultProject.projects.items,
        },
        certifications: {
            ...defaultProject.certifications,
            ...source.certifications,
            items: source.certifications?.items ?? defaultProject.certifications.items,
        },
        contact: {
            ...defaultProject.contact,
            ...source.contact,
            form: {
                ...defaultProject.contact.form,
                ...source.contact?.form,
            },
        },
        footer: {
            ...defaultProject.footer,
            ...source.footer,
            socialLinks: source.footer?.socialLinks ?? defaultProject.footer.socialLinks,
        },
    };
}

export let project: Project = defaultProject;

export const setProject = (payload: unknown) => {
    project = normalizeProject(payload);
}
