import axios from "axios";
import type { Project } from "../../types/project";

class Post {

    async postPortifolio(project: Project) {
        await axios.post(`${import.meta.env.VITE_ROOT_URL}/portifolio`, project)
    }
}

export default new Post()