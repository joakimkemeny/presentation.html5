public class DemoWebSocket implements OnTextMessage {

  private Connection connection;
  private Set<DemoWebSocket> clients;

  public DemoWebSocket(Set<DemoWebSocket> clients) {
    this.clients = clients;
  }

  public void onOpen(Connection connection) {
    this.connection = connection;
    clients.add(this);
  }

  public void onClose(int closeCode, String message) {
    clients.remove(this);
  }
