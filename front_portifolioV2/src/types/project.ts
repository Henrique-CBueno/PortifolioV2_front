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
    },
    stacks: {
        title: "Core Technology Stack",
        showLessText: "Ver menos",
        showMoreText: "Ver mais",
        items: [
            {
                name: "Java",
                icon: "fa-brands fa-java",
                iconColor: "text-brand-accent",
                helperText: "Enterprise Logic"
            },
            {
                name: "AWS",
                icon: "fa-brands fa-aws",
                iconColor: "text-orange-400",
                helperText: "Cloud Infrastructure"
            },
            {
                name: "Spring Boot",
                icon: "fa-solid fa-leaf",
                iconColor: "text-green-500",
                helperText: "Microservices"
            },
            {
                name: "Docker",
                icon: "fa-brands fa-docker",
                iconColor: "text-blue-400",
                helperText: "Containerization"
            },
            {
                name: "React",
                icon: "fa-brands fa-react",
                iconColor: "text-cyan-400",
                helperText: "Modern Frontend"
            },
            {
                name: "PostgreSQL",
                icon: "fa-solid fa-database",
                iconColor: "text-blue-500",
                helperText: "Relational DB"
            },
            {
                name: "Redis",
                icon: "fa-solid fa-bolt",
                iconColor: "text-red-500",
                helperText: "Caching Layer"
            },
            {
                name: "Kubernetes",
                icon: "fa-solid fa-dharmachakra",
                iconColor: "text-blue-600",
                helperText: "Orchestration"
            },
            {
                name: "Jenkins",
                icon: "fa-brands fa-github-alt",
                iconColor: "text-white",
                helperText: "Automation CI/CD"
            },
            {
                name: "Terraform",
                icon: "fa-solid fa-layer-group",
                iconColor: "text-purple-500",
                helperText: "IaC Management"
            },
            {
                name: "Hibernate",
                icon: "fa-solid fa-server",
                iconColor: "text-orange-600",
                helperText: "ORM Framework"
            },
            {
                name: "SQL",
                icon: "fa-solid fa-terminal",
                iconColor: "text-gray-400",
                helperText: "Data Querying"
            }
        ]
    },
    projects: {
        title: "Selected Works",
        subtitle: "A collection of cloud-native enterprise solutions.",
        githubButtonText: "View All Github",
        githubButtonHref: "#",
        caseStudyButtonText: "Case Study",
        showLessText: "Ver menos",
        showMoreText: "Ver mais projetos",
        items: [
            {
                imageAlt: "Project 1",
                imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8Dud-Q5vv6DW_a8NdIasLu1t-wJ13v__sjdRy7y1kK3yEohnfpt7zL8aFG0ZLXK2YzY2QwFFZJwCkULbffQG4qknAz7QO4e9SISOfbVAQFl_T9NsE_GynHkrsQzS57dDSgFb4qYKkTMBvyeT-4V6GLkxfdDUtw41NOsqZwN7Tk5scl1CjhXyX_gXqHjz3gPbxR9Di8q_e_Gd-qVbj2ouLp3DucSqWXL8J7EyZYEdrPN3Kc64KKtUq0PwSlARbjrEASszmV061Hq8",
                tags: ["Java", "AWS Lambda"],
                title: "Serverless E-Commerce API",
                description: "A high-performance backend processing millions of transactions daily using AWS Lambda and DynamoDB.",
                href: "#"
            },
            {
                imageAlt: "Project 2",
                imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9_r_nwDRSDiFIILb4YDvFBy0WmiOO1CcufpfjIklB6oewR9S17e0NyofEZa0wduE8mms_WvkUuWE23beBXct0ICA9C9VIKpx3NlPv3a-quK4Nd7IYx_EVrxfktxb_-BnW7nhTDKb42ENgDzRBJEz6QKq7ZyvHF9K3feJ57H2S8e1DfnxPfHjM7VoYiSJ6M1s8fqhCNZ4mCf9UfndWtTvO6LxFO-9v-qJ83Fjv6PQZv1DmkGNUI3-AsoeeWy0QoKPV2r_5uxcApKM",
                tags: ["Spring Boot", "Docker"],
                title: "Real-time Data Pipeline",
                description: "Real-time data visualization tool for monitoring Kubernetes cluster health and resource allocation.",
                href: "#"
            },
            {
                imageAlt: "Project 3",
                imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn-K3qV_8Q5J0K8_H8X-l5V5zX8O5TzQ7B8I0Y5L9P-M9N9K8J7I6H5G4F3E2D1C0B9A8-X-Z-Y-W-V-U-T-S-R-Q-P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A",
                tags: ["AWS Glue", "React"],
                title: "Cloud-Native Analytics Dashboard",
                description: "A comprehensive analytics engine processing large datasets via AWS Glue with a dynamic React dashboard.",
                href: "#"
            },
            {
                imageAlt: "Project 4",
                imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7-H9G8F7E6D5C4B3A2Z1Y0X9W8V7U6T5S4R3Q2P1O0N9M8L7K6J5I4H3G2F1E0D9C8B7A6-X-Z-Y-W-V-U-T-S-R-Q-P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A",
                tags: ["GitHub Actions", "Terraform"],
                title: "Automated CI/CD Pipeline",
                description: "Standardized DevOps infrastructure across 15+ microservices, reducing deployment time by 60%.",
                href: "#"
            }
        ]
    },
    certifications: {
        title: "Certifications & Awards",
        items: [
            {
                icon: "fa-award",
                iconClassName: "text-brand-accent",
                iconWrapperClassName: "bg-brand-accent/10",
                title: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                description: "Professional certification for designing distributed systems on the AWS platform."
            },
            {
                icon: "fa-trophy",
                iconClassName: "text-orange-400",
                iconWrapperClassName: "bg-orange-400/10",
                title: "Outstanding Performance Award",
                issuer: "Tech Solutions Inc.",
                description: "Recognized for leading the legacy migration project with zero downtime and 35% cost savings."
            },
            {
                icon: "fa-shield-halved",
                iconClassName: "text-green-500",
                iconWrapperClassName: "bg-green-500/10",
                title: "Oracle Certified Professional",
                issuer: "Oracle University",
                description: "Java SE 11 Developer certification demonstrating deep understanding of the language."
            },
            {
                icon: "fa-medal",
                iconClassName: "text-purple-500",
                iconWrapperClassName: "bg-purple-500/10",
                title: "Terraform Associate",
                issuer: "HashiCorp",
                description: "Certification for Infrastructure as Code management and cloud provisioning best practices."
            },
            {
                icon: "fa-medal",
                iconClassName: "text-purple-500",
                iconWrapperClassName: "bg-purple-500/10",
                title: "Terraform Associate 2",
                issuer: "HashiCorp",
                description: "Certification for Infrastructure as Code management and cloud provisioning best practices."
            },
            {
                icon: "fa-medal",
                iconClassName: "text-purple-500",
                iconWrapperClassName: "bg-purple-500/10",
                title: "Terraform Associate 3",
                issuer: "HashiCorp",
                description: "Certification for Infrastructure as Code management and cloud provisioning best practices."
            }
        ]
    },
    contact: {
        title: "Start a project.",
        subtitle: "Interested in working together? Let's discuss your next cloud-native architecture or Java backend project.",
        form: {
            nameLabel: "Your Name",
            namePlaceholder: "John Doe",
            emailLabel: "Email Address",
            emailPlaceholder: "john@example.com",
            detailsLabel: "Project Details",
            detailsPlaceholder: "Tell me about your project...",
            submitButtonText: "Send Message"
        }
    }
}


export type Project = typeof project;
export default project;