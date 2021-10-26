import Caller from './caller';

export async function getChatRooms() {
    try {
        const response = await Caller.get();

        if (response.status !== 200) {
            throw Error(response.statusText);
        }
        var rooms = [{}]
        rooms = response.data;
        // console.log('Från rooms.js: ', response.data)
        return rooms;
    } 
    catch (error) {
        console.log(error);
        return error;
    }
}