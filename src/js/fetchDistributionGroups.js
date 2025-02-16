import axios from "axios";

export async function fetchDistributionGroups() {
    var result = null;
   // var error = null;
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
            'api/distributions/group/list',
            {
                headers: {
                    jwt_token: token,
                },
            }
        );

        if (response.status === 200 && response.data.success) {
            if (response.data.data) {
                result = response.data.data;
            }
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