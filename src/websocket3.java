  public void onMessage(String message) {
    try {
      if ("list".equals(message)) {
        String res = Registration.allParticipantsAsJSON();
        this.connection.sendMessage(res);
      } else {
        Participant participant =
          Registration.addParticipant(message);
        for (DemoWebSocket client : clients)
          client.connection.sendMessage(
            "[" + participant.asJSON() + "]");
      }
    } catch (IOException e) { }
  }
}
