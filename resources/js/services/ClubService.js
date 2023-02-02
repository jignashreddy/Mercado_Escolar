import http from "../http/http-common";

class ClubService {
    all_clubs() {
        return http.get("clubs");
    }
    my_clubs() {
        return http.get("my_clubs");
    }
    delete_club(id) {
        return http.delete("clubs/"+id);
    }
    club_details(id) {
        return http.get("clubs/"+id);
    }
    add_club(data) {
        return http.post("clubs",data);
    }
    update_club(data, id) {
        return http.post('clubs/'+id, data);
    }
    join_club(id) {
        return http.post("join-club/"+id);
    }
    joined_clubs() {
        return http.get("my-joined-clubs");
    }
    leave_club(id) {
        return http.post("leave-club/"+id);
    }
}

export default new ClubService();
