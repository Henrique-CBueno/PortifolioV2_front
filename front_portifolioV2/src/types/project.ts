import fotoHenrique from "../../public/avatar-2-semBG.png";

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
    },
    about: {
        id: "about",
        img: fotoHenrique,
        title: "Building the backend of tomorrow.",
        description: [
            "I am a software engineer with over 5 years of experience in developing distributed systems and cloud-native applications. My passion lies in solving complex architectural challenges and optimizing performance in high-traffic environments.",
            "Based in the cloud, I leverage AWS services to ensure high availability and scalability for every project I touch, from initial concept to production deployment."
        ],
        cards: [
            {
                emphasis: "5+",
                helperText: "Years Exp."
            },
            {
                emphasis: "20+",
                helperText: "Projects Done"
            }
        ]
    }
}


export type Project = typeof project;
export default project;