public class DemoWebSocketServlet extends WebSocketServlet {

  private final Set<DemoWebSocket> clients =
    new CopyOnWriteArraySet<DemoWebSocket>();

  public WebSocket doWebSocketConnect(
      HttpServletRequest req, String protocol) {
    return new DemoWebSocket(clients);
  }
}
