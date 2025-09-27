"use client";

import { INotify } from "@/utils/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketIoProviderProps {
  children: React.ReactNode;
}

interface SocketIoCoxtentType {
  socket: Socket<ServerToClientEvents, any> | null;
  isConnected: boolean;
}

const SocketIoContext = createContext<SocketIoCoxtentType | undefined>(undefined);

interface ServerToClientEvents {
  [event: `notification:${string}`]: (notifications: INotify) => void;
}

export function SocketIoProvider({ children }: SocketIoProviderProps) {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, any> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance: Socket<ServerToClientEvents, any> = io(process.env.NEXT_PUBLIC_WS_URL!);

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect();
    }
  }, []);

  return (
    <SocketIoContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketIoContext.Provider>
  );
}

export function useSocketIo() {
  const socket = useContext(SocketIoContext);
  if(!socket){
    throw new Error(`useSocketIo must be used within SocketIoProvider`);
  }
  
  return socket;
}