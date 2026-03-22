import axios from "axios";
import type { Project } from "../../types/project";
import { getAuthorizationHeader } from "../../utils/auth";

export interface ChangeImgDTO {
    section: string;
    file: File;
    name: string;
}

export interface ContactEmailDTO {
    name: string;
    email: string;
    details: string;
}

class Post {

    async sendContactEmail(payload: ContactEmailDTO) {
        await axios.post(`${import.meta.env.VITE_ROOT_URL}/contact`, payload)
    }

    async postPortifolio(project: Project) {
        await axios.post(`${import.meta.env.VITE_ROOT_URL}/portifolio`, project, {
            headers: getAuthorizationHeader(),
        })
    }

    async postPortifolioImages(id: string, imgs: ChangeImgDTO[]) {
        const formData = new FormData();

        imgs.forEach((img, index) => {
            formData.append(`imgs[${index}].section`, img.section);
            formData.append(`imgs[${index}].name`, img.name);
            formData.append(`imgs[${index}].file`, img.file);
        });

        await axios.post(`${import.meta.env.VITE_ROOT_URL}/portifolio/${id}/img`, formData, {
            headers: getAuthorizationHeader(),
        });
    }
}

export default new Post()