import axios from "axios";

export async function runSpam(groupId) {
    const token = localStorage.getItem('token');

    return await axios.post(
        'api/distributions/run',
        new URLSearchParams({
            'group_id': groupId
        }),
        {
            headers: {
                jwt_token: token,
            },
        }
    );
}