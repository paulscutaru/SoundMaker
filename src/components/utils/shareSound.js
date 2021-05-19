import axios from 'axios'

export default function shareSound(sound_id) {
    axios.put(
        `http://localhost:3001/sounds/share/${sound_id}`,
        null,
        {
            headers: {
                token: localStorage.getItem("token"),
            },
        }
    )
        .then((response) => {
            if (response.data.error) {
                console.log('Error sharing sound:', response.data.error);
                alert('Error sharing sound!')
            } else {
                console.log('Sound shared:', response.data);
                alert('Sound shared!')
            }
        });

}
