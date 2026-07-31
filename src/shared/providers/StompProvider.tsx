"use client";

import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type MessageHandler = (message: IMessage) => void;

interface StompContextValue {
  connected: boolean;
  subscribe(destination: string, handler: MessageHandler): () => void;
}

const StompContext = createContext<StompContextValue | null>(null);

// Uma única conexão STOMP para toda a área autenticada, multiplexada por destino. Qualquer
// feature futura (ex: exportação de PDF) só precisa de useStompSubscription("/user/queue/algo",
// callback) — não precisa conhecer nada sobre conexão, autenticação ou reconexão.
export function StompProvider({ children }: React.PropsWithChildren) {
  const clientRef = useRef<Client | null>(null);
  const handlersRef = useRef(new Map<string, Set<MessageHandler>>());
  const activeSubscriptionsRef = useRef(new Map<string, StompSubscription>());
  const [connected, setConnected] = useState(false);

  const subscribeAllPending = useCallback(() => {
    const client = clientRef.current;

    if (!client?.connected) {
      return;
    }

    handlersRef.current.forEach((_handlers, destination) => {
      if (activeSubscriptionsRef.current.has(destination)) {
        return;
      }

      const subscription = client.subscribe(destination, (message) => {
        handlersRef.current.get(destination)?.forEach((handler) => handler(message));
      });

      activeSubscriptionsRef.current.set(destination, subscription);
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/ws-token")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { ticket?: string } | null) => {
        if (cancelled || !data?.ticket) {
          return;
        }

        const client = new Client({
          brokerURL: process.env.NEXT_PUBLIC_WS_URL,
          connectHeaders: { Authorization: `Bearer ${data.ticket}` },
          reconnectDelay: 5000,
          onConnect: () => {
            setConnected(true);
            subscribeAllPending();
          },
          onWebSocketClose: () => setConnected(false),
        });

        client.activate();
        clientRef.current = client;
      });

    return () => {
      cancelled = true;
      clientRef.current?.deactivate();
      clientRef.current = null;
      activeSubscriptionsRef.current.clear();
    };
  }, [subscribeAllPending]);

  const subscribe = useCallback(
    (destination: string, handler: MessageHandler) => {
      if (!handlersRef.current.has(destination)) {
        handlersRef.current.set(destination, new Set());
      }

      handlersRef.current.get(destination)!.add(handler);
      subscribeAllPending();

      return () => {
        const handlers = handlersRef.current.get(destination);

        handlers?.delete(handler);

        if (handlers && handlers.size === 0) {
          handlersRef.current.delete(destination);
          activeSubscriptionsRef.current.get(destination)?.unsubscribe();
          activeSubscriptionsRef.current.delete(destination);
        }
      };
    },
    [subscribeAllPending],
  );

  return <StompContext.Provider value={{ connected, subscribe }}>{children}</StompContext.Provider>;
}

export function useStompContext() {
  const context = useContext(StompContext);

  if (!context) {
    throw new Error("useStompContext deve ser usado dentro de um StompProvider");
  }

  return context;
}
