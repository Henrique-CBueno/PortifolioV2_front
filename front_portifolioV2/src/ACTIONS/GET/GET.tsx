import axios from "axios"

class Get {
    async fetchProject(id: string) {
        const response = await axios.get(`${import.meta.env.VITE_ROOT_URL}/portifolio?id=${id}`)
        return response.data
    }
}

export default new Get()