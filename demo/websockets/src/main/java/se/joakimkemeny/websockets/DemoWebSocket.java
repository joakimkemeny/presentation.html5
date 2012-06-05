package se.joakimkemeny.websockets;

import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

import java.io.IOException;
import java.util.Set;

public class DemoWebSocket implements OnTextMessage {

    private Connection connection;
    private Set<DemoWebSocket> clients;

    public DemoWebSocket(Set<DemoWebSocket> clients) {
        this.clients = clients;
    }

    @Override
    public void onOpen(Connection connection) {
        this.connection = connection;
        clients.add(this);
    }

    @Override
    public void onClose(int closeCode, String message) {
        clients.remove(this);
    }

    @Override
    public void onMessage(String message) {
        try {
            if ("list".equals(message)) {
                String res = Registration.allParticipantsAsJSON();
                this.connection.sendMessage(res);
            } else {
                Participant participant = Registration.addParticipant(message);
                for (DemoWebSocket client : clients) {
                    client.connection.sendMessage("[" + participant.asJSON() + "]");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
