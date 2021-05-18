import axios from 'axios'

export default function saveSound(file_name, instrument, data, effects) {
    axios.post(
        "http://localhost:3001/sounds/save",
        {
            instrument: instrument,
            data: data,
            effects: effects,
            name: file_name,
        },
        {
            headers: {
                token: localStorage.getItem("token"),
            },
        }
    )
        .then((response) => {
            if (response.data.error) {
                console.log('Error saving sound:', response.data.error);
                alert('Error saving sound!')
            } else {
                console.log('Sound saved to database:', response.data);
                alert('Sound saved!')
            }
        });
}