import axios from "axios";

export async function getProgress(groupId) {
    var result = null;
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(
            'api/distributions/run-progress',
            new URLSearchParams({
                'group_id': groupId
            }),
            {
                headers: {
                    jwt_token: token,
                },
            }
        );

        if (response.status === 200 && response.data.success) {
            result = response.data.data;
        } else {
           // error = 'Failed to fetch distribution groups';
        }
    } catch (err) {
       // error = err.message;
    } finally {
        //isLoading.value = false;
    }

    return result
}