import axios from "axios";

export async function createDistributionGroup(formState) {
    const token = localStorage.getItem('token');

    return await axios.post('api/distributions/group',
        new URLSearchParams({
            name: formState.name,
            description: formState.name,
            sex: formState.selectedSex,
            only_birthday_today: formState.onlyBirthdayToday,
            only_birthday_friends: formState.onlyBirthdayFriends,
        }),
        {
            headers: {
                'jwt-token': token,
            },
        });
}