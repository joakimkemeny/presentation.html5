package se.joakimkemeny.websockets;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

public class DemoWebSocketServlet extends WebSocketServlet {

    private final Set<DemoWebSocket> clients = new CopyOnWriteArraySet<DemoWebSocket>();

    @Override
    public WebSocket doWebSocketConnect(HttpServletRequest request, String protocol) {
        return new DemoWebSocket(clients);
    }
}
