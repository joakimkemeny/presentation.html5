package se.joakimkemeny.websockets;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Participant {

    private static final SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");

    private final Date time;
    private final String name;

    public Participant(String name) {
        this.time = new Date();
        this.name = name;
    }

    public String asJSON() {
        String time = "\"time\":\"" + sdf.format(this.time) + "\"";
        String name = "\"name\":\"" + this.name + "\"";
        return "{" + name + "," + time + "}";
    }
}
