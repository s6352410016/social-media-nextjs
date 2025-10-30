"use client";

import { ICommonResponse, INotify, IUser } from "@/utils/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { formatToastMessages } from "@/utils/helpers/format-toast-messages";
import { refreshInstance } from "@/utils/axios-instance";
import { isAxiosError } from "axios";
import { navigate } from "@/utils/helpers/router";

interface SocketIoProviderProps {
  children: React.ReactNode;
}

interface SocketIoCoxtentType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
}

const SocketIoContext = createContext<SocketIoCoxtentType | undefined>(
  undefined
);

interface ServerToClientEvents {
  [event: `notification:${string}`]: (notifications: INotify) => void;
  usersActive: (users: (IUser & { active: boolean })[]) => void;
  exception: (error: { success: boolean; message: string }) => void;
}

interface ClientToServerEvents {
  connected: (activeUser: IUser) => void;
}

export function SocketIoProvider({ children }: SocketIoProviderProps) {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance: Socket<ServerToClientEvents, ClientToServerEvents> =
      io(process.env.NEXT_PUBLIC_WS_URL!, {
        withCredentials: true,
      });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      toast.error(formatToastMessages(error.message));
    });

    socketInstance.on("exception", async (errorException) => {
      if (!errorException.success) {
        try {
          await refreshInstance.post<ICommonResponse>("auth/refresh-token");
        } catch (error: unknown) {
          if (isAxiosError<ICommonResponse>(error)) {
            if (error.response?.data.status === 401) {
              navigate("/");
              toast.error(formatToastMessages(errorException.message));
              return;
            }
          }
        }
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketIoContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketIoContext.Provider>
  );
}

export function useSocketIo() {
  const socket = useContext(SocketIoContext);
  if (!socket) {
    throw new Error(`useSocketIo must be used within SocketIoProvider`);
  }

  return socket;
}
