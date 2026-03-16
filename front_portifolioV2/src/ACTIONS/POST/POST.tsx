import axios from "axios";
import type { Project } from "../../types/project";

export interface ChangeImgDTO {
    section: string;
    file: File;
    name: string;
}

class Post {

    async postPortifolio(project: Project) {
        await axios.post(`${import.meta.env.VITE_ROOT_URL}/portifolio`, project)
    }

    async postPortifolioImages(id: string, imgs: ChangeImgDTO[]) {
        const formData = new FormData();

        imgs.forEach((img, index) => {
            formData.append(`imgs[${index}].section`, img.section);
            formData.append(`imgs[${index}].name`, img.name);
            formData.append(`imgs[${index}].file`, img.file);
        });

        await axios.post(`${import.meta.env.VITE_ROOT_URL}/portifolio/${id}/img`, formData);
    }
}

export default new Post()