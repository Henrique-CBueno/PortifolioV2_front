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
    hero: {
        blueHelperText: "System Architect & Cloud Expert",
        title: {
            whiteTitle: "Java Fullstack",
            rotatingWords: ["Infrastructure.", "Cloud.", "Backends.", "Scalability."]
        },
        subtitle: "Designing resilient distributed systems and scalable enterprise backends with Java, Spring Boot, and AWS. Bridging the gap between complex logic and cloud performance.",
        buttons: {
            blueButton: {
                text: "View Case Studies",
                href: "#projects"
            },
            transparentButton: {
                text: "Initiate Project",
                href: "#contact"
            }
        },
        code: {
            archiveName: "CloudArchitecture.java",
            snippet: {
                serviceAnnotation: "@Service",
                classKeyword: "public class",
                className: "Deployment",
                infrastructureComment: "// AWS Infrastructure",
                autowiredAnnotation: "@Autowired",
                awsField: "private CloudService aws;",
                deploySignature: "public void deploy()",
                deployCallPrefix: "aws.scale(",
                region: "us-east-1",
                deployCallSuffix: ");",
                uptimeComment: "// 99.9% uptime"
            },
            icon: "fa-brands fa-aws",
            iconColor: "text-orange-400"
        }
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
    },
    journey: {
        title: "Professional Journey",
        jobs: [
            {
                startTime: "2021",
                endTime: null,
                whiteTitle: "Senior Cloud Architect",
                enterprise: "Tech Solutions Inc.",
                description: "Leading the migration of legacy monolithic architectures to AWS microservices using Spring Boot and Kubernetes. Reduced operational costs by 35%."
            },
            {
                startTime: "2019",
                endTime: "2021",
                whiteTitle: "Fullstack Developer",
                enterprise: "Fintech Innovators",
                description: "Developed real-time payment processing gateways with Java 11. Implemented responsive React frontends integrated with RESTful APIs."
            },
            {
                startTime: "2017",
                endTime: "2019",
                whiteTitle: "Junior Backend Engineer",
                enterprise: "CodeBase Labs",
                description: "Assisted in building scalable database schemas using PostgreSQL and optimized JVM performance for high-traffic data ingestion services."
            }
        ]
    }
}


export type Project = typeof project;
export default project;