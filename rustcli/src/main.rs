use std::env;
use tungstenite::{connect, Message};
use url::Url;

fn main() {
    env_logger::init();
    let args: Vec<String> = env::args().collect();

    if args.len() != 2 {
        eprintln!("Usage: streamdeckws <message>");
        std::process::exit(1);
    }
    let message = args.get(1).cloned().unwrap_or_else(|| "1".to_string());

    let (mut socket, _) =
        connect(Url::parse("ws://localhost:8080").unwrap()).expect("Can't connect");

    socket.send(Message::Text(message.into())).unwrap();
    let _ = socket.close(None);
}
