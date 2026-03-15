const project = {
    id: 1,
    name: "Project Name",
    description: "Project Description",
    header: {
        whiteTitle: "HENRIQUE BUENO",
        sections: [
            { 
                name: "Inicio",
                href: "#home"
             },
             { 
                name: "Sobre",
                href: "#about"
             },
             { 
                name: "Jornada",
                href: "#journey"
             },
             { 
                name: "Habilidades",
                href: "#stack"
             },
             { 
                name: "Projetos",
                href: "#projects"
             },
             { 
                name: "Contact",
                href: "#contact"
            }
        ]
    }
}


export type Project = typeof project;
export default project;