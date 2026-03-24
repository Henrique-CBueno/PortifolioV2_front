import post from "../ACTIONS/POST/POST";
import type { ChangeImgDTO } from "../ACTIONS/POST/POST";
import type { ContactEmailDTO } from "../ACTIONS/POST/POST";

export interface HeaderSection {
    name: string;
    href: string;
}

export interface AboutCard {
    emphasis: string;
    helperText: string;
}

export interface JourneyJob {
    startTime: string;
    endTime: string | null;
    whiteTitle: string;
    enterprise: string;
    description: string;
}

export interface Stack {
    name: string;
    icon: string;
    iconColor: string;
    helperText: string;
}

export interface ProjectItem {
    imageAlt: string;
    imageSrc: string;
    tags: string[];
    title: string;
    description: string;
    href: string;
}

export interface CertificationItem {
    icon: string;
    iconClassName: string;
    iconWrapperClassName: string;
    title: string;
    issuer: string;
    description: string;
}

export interface SocialLink {
    icon: string;
    href: string;
    ariaLabel: string;
}

export interface Project {
    id?: string | number;
    name?: string;
    description?: string;
    header: {
        whiteTitle: string;
        sections: HeaderSection[];
    };
    hero: {
        blueHelperText: string;
        title: {
            whiteTitle: string;
            rotatingWords: string[];
        };
        subtitle: string;
        buttons: {
            blueButton: { text: string; href: string };
            transparentButton: { text: string; href: string };
        };
        code: {
            archiveName: string;
            snippet: {
                serviceAnnotation: string;
                classKeyword: string;
                className: string;
                infrastructureComment: string;
                autowiredAnnotation: string;
                awsField: string;
                deploySignature: string;
                deployCallPrefix: string;
                region: string;
                deployCallSuffix: string;
                uptimeComment: string;
            };
            icon: string;
            iconColor: string;
        };
    };
    about: {
        id: string;
        img: string;
        title: string;
        description: string[];
        cards: AboutCard[];
    };
    journey: {
        title: string;
        jobs: JourneyJob[];
    };
    stacks: {
        title: string;
        showLessText: string;
        showMoreText: string;
        items: Stack[];
    };
    projects: {
        title: string;
        subtitle: string;
        githubButtonText: string;
        githubButtonHref: string;
        caseStudyButtonText: string;
        showLessText: string;
        showMoreText: string;
        items: ProjectItem[];
    };
    certifications: {
        title: string;
        items: CertificationItem[];
    };
    contact: {
        title: string;
        subtitle: string;
        form: {
            nameLabel: string;
            namePlaceholder: string;
            emailLabel: string;
            emailPlaceholder: string;
            detailsLabel: string;
            detailsPlaceholder: string;
            submitButtonText: string;
        };
    };
    footer: {
        portfolioName: string;
        rightsText: string;
        socialLinks: SocialLink[];
    };
}

// const project = {
//     id: "br",
//     name: "Portfólio Henrique Bueno",
//     description: "Portfólio profissional de arquitetura de software, cloud e desenvolvimento fullstack.",
//     header: {
//         whiteTitle: "HENRIQUE BUENO",
//         sections: [
//             { 
//                 name: "Inicio",
//                 href: "#home"
//              },
//              { 
//                 name: "Sobre",
//                 href: "#about"
//              },
//              { 
//                 name: "Jornada",
//                 href: "#journey"
//              },
//              { 
//                 name: "Habilidades",
//                 href: "#stack"
//              },
//              { 
//                 name: "Projetos",
//                 href: "#projects"
//              },
//              { 
//                 name: "Contato",
//                 href: "#contact"
//             }
//         ]
//     },
//     hero: {
//         blueHelperText: "Arquiteto de Sistemas e Especialista em Cloud",
//         title: {
//             whiteTitle: "Fullstack Java",
//             rotatingWords: ["Infraestrutura.", "Cloud.", "Backend.", "Escalabilidade.", "AI."]
//         },
//         subtitle: "Desenvolvendo sistemas distribuídos resilientes e backends corporativos escaláveis com Java, Spring Boot e AWS. Conectando lógica complexa com performance em nuvem.",
//         buttons: {
//             blueButton: {
//                 text: "Ver estudos de caso",
//                 href: "#projects"
//             },
//             transparentButton: {
//                 text: "Iniciar projeto",
//                 href: "#contact"
//             }
//         },
//         code: {
//             archiveName: "ArquiteturaCloud.java",
//             snippet: {
//                 serviceAnnotation: "@Service",
//                 classKeyword: "public class",
//                 className: "Deployment",
//                 infrastructureComment: "// Infraestrutura AWS",
//                 autowiredAnnotation: "@Autowired",
//                 awsField: "private CloudService aws;",
//                 deploySignature: "public void deploy()",
//                 deployCallPrefix: "aws.scale(",
//                 region: "us-east-1",
//                 deployCallSuffix: ");",
//                 uptimeComment: "// 99,9% de disponibilidade"
//             },
//             icon: "fa-brands fa-aws",
//             iconColor: "text-orange-400"
//         }
//     },
//     about: {
//         id: "about",
//         img: fotoHenrique,
//         title: "Construindo o backend do amanhã.",
//         description: [
//             "Sou engenheiro de software com mais de 1 anos de experiência no desenvolvimento de sistemas distribuídos e aplicações cloud-native. Minha paixão está em resolver desafios arquiteturais complexos e otimizar performance em ambientes de alto tráfego.",
//             "Com forte atuação em cloud, utilizo serviços AWS para garantir alta disponibilidade e escalabilidade em cada projeto, do conceito inicial até a produção."
//         ],
//         cards: [
//             {
//                 emphasis: "1+",
//                 helperText: "Anos de exp."
//             },
//             {
//                 emphasis: "20+",
//                 helperText: "Projetos entregues"
//             }
//         ]
//     },
//     journey: {
//         title: "Jornada Profissional",
//         jobs: [
//             {
//                 startTime: "Fev 2026",
//                 endTime: null,
//                 whiteTitle: "Analista de Implementação Júnior",
//                 enterprise: "BMP - Banco Money Plus • São Paulo - SP, Brasil",
//                 description: "Atuação na implantação, configuração e manutenção de soluções financeiras e infraestrutura em nuvem com foco no ecossistema AWS, incluindo EC2, S3, RDS, VPC e CloudWatch. Responsável por integrações financeiras baseadas em CaaS e BaaS, suporte técnico B2B, alinhamento de requisitos técnicos, resolução de incidentes e apoio na estruturação de arquiteturas cloud com otimização de custos e recursos."
//             },
//             {
//                 startTime: "Ago 2025",
//                 endTime: "Fev 2026",
//                 whiteTitle: "Desenvolvedor de Software",
//                 enterprise: "SEA Tecnologia • São Paulo - SP, Brasil",
//                 description: "Atuação no desenvolvimento, sustentação e evolução do sistema NegociaDF, com foco em estabilidade, segurança e alta disponibilidade. Desenvolvimento backend com Java e Spring Boot, refatorações com SOLID, Clean Code e Design Patterns, implementação de segurança com Spring Security, replicação de bancos relacionais, automações com Python e fluxos automatizados de geração e envio de e-mails e PDFs integrados ao backend."
//             },
//             {
//                 startTime: "Abr 2025",
//                 endTime: "Ago 2025",
//                 whiteTitle: "Desenvolvedor Full Stack",
//                 enterprise: "Freelancer • Remoto",
//                 description: "Desenvolvimento de uma plataforma SaaS do zero com foco em confiabilidade, segurança e escalabilidade. Arquitetura baseada em microsserviços com Java e Spring Boot, processamento assíncrono, autenticação e autorização com Keycloak e Spring Security incluindo 2FA via OTP, mensageria com RabbitMQ e infraestrutura AWS com S3, Docker, PostgreSQL com replicação e Terraform."
//             }
//         ]
//     },
//     stacks: {
//         title: "Stack Principal",
//         showLessText: "Ver menos",
//         showMoreText: "Ver mais",
//         items: [
//             {
//                 name: "Java",
//                 icon: "fa-brands fa-java",
//                 iconColor: "text-brand-accent",
//                 helperText: "Lógica corporativa"
//             },
//             {
//                 name: "AWS",
//                 icon: "fa-brands fa-aws",
//                 iconColor: "text-orange-400",
//                 helperText: "Infraestrutura cloud"
//             },
//             {
//                 name: "Spring Boot",
//                 icon: "fa-solid fa-leaf",
//                 iconColor: "text-green-500",
//                 helperText: "Microsserviços"
//             },
//             {
//                 name: "Docker",
//                 icon: "fa-brands fa-docker",
//                 iconColor: "text-blue-400",
//                 helperText: "Conteinerização"
//             },
//             {
//                 name: "React",
//                 icon: "fa-brands fa-react",
//                 iconColor: "text-cyan-400",
//                 helperText: "Frontend moderno"
//             },
//             {
//                 name: "PostgreSQL",
//                 icon: "fa-solid fa-database",
//                 iconColor: "text-blue-500",
//                 helperText: "Banco relacional"
//             },
//             {
//                 name: "Redis",
//                 icon: "fa-solid fa-bolt",
//                 iconColor: "text-red-500",
//                 helperText: "Camada de cache"
//             },
//             {
//                 name: "Kubernetes",
//                 icon: "fa-solid fa-dharmachakra",
//                 iconColor: "text-blue-600",
//                 helperText: "Orquestração"
//             },
//             {
//                 name: "Jenkins",
//                 icon: "fa-brands fa-github-alt",
//                 iconColor: "text-white",
//                 helperText: "Automação CI/CD"
//             },
//             {
//                 name: "Terraform",
//                 icon: "fa-solid fa-layer-group",
//                 iconColor: "text-purple-500",
//                 helperText: "Gestão de IaC"
//             },
//             {
//                 name: "Hibernate",
//                 icon: "fa-solid fa-server",
//                 iconColor: "text-orange-600",
//                 helperText: "Framework ORM"
//             },
//             {
//                 name: "SQL",
//                 icon: "fa-solid fa-terminal",
//                 iconColor: "text-gray-400",
//                 helperText: "Consulta de dados"
//             }
//         ]
//     },
//     projects: {
//         title: "Projetos em Destaque",
//         subtitle: "Uma seleção de soluções corporativas cloud-native.",
//         githubButtonText: "Ver todo o GitHub",
//         githubButtonHref: "#",
//         caseStudyButtonText: "Estudo de caso",
//         showLessText: "Ver menos",
//         showMoreText: "Ver mais projetos",
//         items: [
//             {
//                 imageAlt: "Gioia Investimentos",
//                 imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8Dud-Q5vv6DW_a8NdIasLu1t-wJ13v__sjdRy7y1kK3yEohnfpt7zL8aFG0ZLXK2YzY2QwFFZJwCkULbffQG4qknAz7QO4e9SISOfbVAQFl_T9NsE_GynHkrsQzS57dDSgFb4qYKkTMBvyeT-4V6GLkxfdDUtw41NOsqZwN7Tk5scl1CjhXyX_gXqHjz3gPbxR9Di8q_e_Gd-qVbj2ouLp3DucSqWXL8J7EyZYEdrPN3Kc64KKtUq0PwSlARbjrEASszmV061Hq8",
//                 tags: ["Java", "Spring Boot", "AWS"],
//                 title: "Gioia Investimentos",
//                 description: "Plataforma completa de consultoria macroeconômica, estruturada para oferecer confiabilidade, escalabilidade e uma experiência sólida na entrega de análises e serviços financeiros.",
//                 href: "#"
//             },
//             {
//                 imageAlt: "NegociaDF",
//                 imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9_r_nwDRSDiFIILb4YDvFBy0WmiOO1CcufpfjIklB6oewR9S17e0NyofEZa0wduE8mms_WvkUuWE23beBXct0ICA9C9VIKpx3NlPv3a-quK4Nd7IYx_EVrxfktxb_-BnW7nhTDKb42ENgDzRBJEz6QKq7ZyvHF9K3feJ57H2S8e1DfnxPfHjM7VoYiSJ6M1s8fqhCNZ4mCf9UfndWtTvO6LxFO-9v-qJ83Fjv6PQZv1DmkGNUI3-AsoeeWy0QoKPV2r_5uxcApKM",
//                 tags: ["Java", "Liferay", "React"],
//                 title: "NegociaDF",
//                 description: "Participação no desenvolvimento do NegociaDF, sistema de grande escala com foco em estabilidade e evolução contínua, atuando em funcionalidades e melhorias com Java, Liferay e React em fluxos sensíveis ao negócio.",
//                 href: "#"
//             },
//             {
//                 imageAlt: "Projeto 3",
//                 imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn-K3qV_8Q5J0K8_H8X-l5V5zX8O5TzQ7B8I0Y5L9P-M9N9K8J7I6H5G4F3E2D1C0B9A8-X-Z-Y-W-V-U-T-S-R-Q-P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A",
//                 tags: ["AWS Glue", "React"],
//                 title: "Dashboard Analítico Cloud-Native",
//                 description: "Motor analítico completo processando grandes volumes de dados com AWS Glue e um dashboard dinâmico em React.",
//                 href: "#"
//             },
//             {
//                 imageAlt: "Projeto 4",
//                 imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7-H9G8F7E6D5C4B3A2Z1Y0X9W8V7U6T5S4R3Q2P1O0N9M8L7K6J5I4H3G2F1E0D9C8B7A6-X-Z-Y-W-V-U-T-S-R-Q-P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A",
//                 tags: ["GitHub Actions", "Terraform"],
//                 title: "Pipeline CI/CD Automatizado",
//                 description: "Padronização da infraestrutura DevOps em mais de 15 microsserviços, reduzindo o tempo de deploy em 60%.",
//                 href: "#"
//             }
//         ]
//     },
//     certifications: {
//         title: "Certificações e Reconhecimentos",
//         items: [
//             {
//                 icon: "fa-award",
//                 iconClassName: "text-brand-accent",
//                 iconWrapperClassName: "bg-brand-accent/10",
//                 title: "AWS Certified Solutions Architect",
//                 issuer: "Amazon Web Services",
//                 description: "Certificação profissional para o desenho de sistemas distribuídos na plataforma AWS."
//             },
//             {
//                 icon: "fa-trophy",
//                 iconClassName: "text-orange-400",
//                 iconWrapperClassName: "bg-orange-400/10",
//                 title: "Prêmio de Performance de Destaque",
//                 issuer: "Tech Solutions Inc.",
//                 description: "Reconhecimento pela liderança do projeto de migração legada com zero downtime e economia de 35% nos custos."
//             },
//             {
//                 icon: "fa-shield-halved",
//                 iconClassName: "text-green-500",
//                 iconWrapperClassName: "bg-green-500/10",
//                 title: "Oracle Certified Professional",
//                 issuer: "Oracle University",
//                 description: "Certificação Java SE 11 Developer que demonstra domínio aprofundado da linguagem."
//             },
//             {
//                 icon: "fa-medal",
//                 iconClassName: "text-purple-500",
//                 iconWrapperClassName: "bg-purple-500/10",
//                 title: "Terraform Associate",
//                 issuer: "HashiCorp",
//                 description: "Certificação voltada à gestão de Infrastructure as Code e boas práticas de provisionamento em cloud."
//             },
//             {
//                 icon: "fa-medal",
//                 iconClassName: "text-purple-500",
//                 iconWrapperClassName: "bg-purple-500/10",
//                 title: "Terraform Associate 2",
//                 issuer: "HashiCorp",
//                 description: "Certificação voltada à gestão de Infrastructure as Code e boas práticas de provisionamento em cloud."
//             },
//             {
//                 icon: "fa-medal",
//                 iconClassName: "text-purple-500",
//                 iconWrapperClassName: "bg-purple-500/10",
//                 title: "Terraform Associate 3",
//                 issuer: "HashiCorp",
//                 description: "Certificação voltada à gestão de Infrastructure as Code e boas práticas de provisionamento em cloud."
//             }
//         ]
//     },
//     contact: {
//         title: "Vamos iniciar um projeto.",
//         subtitle: "Tem interesse em trabalharmos juntos? Vamos conversar sobre sua próxima arquitetura cloud-native ou projeto backend em Java.",
//         form: {
//             nameLabel: "Seu nome",
//             namePlaceholder: "João da Silva",
//             emailLabel: "Endereço de e-mail",
//             emailPlaceholder: "joao@exemplo.com",
//             detailsLabel: "Detalhes do projeto",
//             detailsPlaceholder: "Conte mais sobre o seu projeto...",
//             submitButtonText: "Enviar mensagem"
//         }
//     },
//     footer: {
//         portfolioName: "Portfólio Henrique Bueno",
//         rightsText: "Todos os direitos reservados.",
//         socialLinks: [
//             {
//                 icon: "fa-brands fa-github",
//                 href: "#",
//                 ariaLabel: "GitHub"
//             },
//             {
//                 icon: "fa-brands fa-linkedin",
//                 href: "#",
//                 ariaLabel: "LinkedIn"
//             },
//             {
//                 icon: "fa-brands fa-twitter",
//                 href: "#",
//                 ariaLabel: "Twitter"
//             }
//         ]
//     }
// }

export const post_portifolio = async (portifolio: Project) => {
    await post.postPortifolio(portifolio)
}

export const post_portifolio_imgs = async (id: string, imgs: ChangeImgDTO[]) => {
    await post.postPortifolioImages(id, imgs)
}

export const post_contact_email = async (payload: ContactEmailDTO) => {
    await post.sendContactEmail(payload)
}

export { project as default } from "../projectStore";