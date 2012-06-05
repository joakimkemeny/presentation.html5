package se.joakimkemeny.websockets;

import java.util.ArrayList;
import java.util.List;

public class Registration {

    private static final List<Participant> participants = new ArrayList<Participant>();

    public static Participant addParticipant(String name) {
        Participant participant = new Participant(name);
        participants.add(participant);
        return participant;
    }

    public static String allParticipantsAsJSON() {
        if (participants.size() == 0) {
            return "[]";
        } else {
            StringBuffer json = new StringBuffer();
            for (Participant participant : participants) {
                json.append(",").append(participant.asJSON());
            }
            return "[" + json.toString().substring(1) + "]";
        }
    }
}
