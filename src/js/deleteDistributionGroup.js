import axios from "axios";

export async function deleteDistributionGroup(id) {
    return await axios.delete(`api/distributions/group`,
        {
            params: {
                id: id,
            },
            headers: {
                'jwt-token': localStorage.getItem('token')
            }
        })
}