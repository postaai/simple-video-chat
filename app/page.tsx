"use client";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <div>
      <VideoChat />
    </div>
  );
}

const VideoChat = () => {
  const localVideoRef = useRef<any>(null);
  const remoteVideoRef = useRef<any>(null);
  const peer = useRef<any>(null);
  const [remoteId, setRemoteId] = useState("");

  useEffect(() => {
    const startStream = (stream: any) => {
      localVideoRef.current.srcObject = stream;

      peer.current = new Peer({
        // Inicialização do Peer
        // Preencha com a configuração do seu PeerJS Server (opcional)
      });

      peer.current.on("open", (id: string) => {
        console.log("My peer ID is: " + id);
        // Aqui você pode exibir o ID do Peer para compartilhamento com outros pares
      });

      peer.current.on("call", (call: any) => {
        call.answer(stream); // Responder à chamada com o próprio stream
        call.on("stream", (remoteStream: any) => {
          remoteVideoRef.current.srcObject = remoteStream; // Exibir o stream do peer remoto
        });
      });
    };

    if (!!navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(startStream)
        .catch((error) =>
          console.error("Error accessing media devices:", error)
        );
    }
  }, []);

  const callPeer = (e: any) => {
    e.preventDefault();
    console.log(remoteId);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;

        const call = peer.current.call(remoteId, stream); // Substitua 'peerIDOfRemoteUser' pelo ID do peer remoto
        call.on("stream", (remoteStream: any) => {
          remoteVideoRef.current.srcObject = remoteStream; // Exibir o stream do peer remoto
        });
      })
      .catch((error) => console.error("Error accessing media devices:", error));
  };

  return (
    <div>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        style={{ width: "400px" }}
      ></video>
      <video ref={remoteVideoRef} autoPlay style={{ width: "400px" }}></video>
      <label htmlFor="remoteid">
        Remote Id:
        <input
          type="text"
          name="remoteid"
          placeholder="remoteid here"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
        />
      </label>
      <button onClick={callPeer}>Call Peer</button>
    </div>
  );
};
